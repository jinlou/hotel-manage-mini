<template>
	<view class="content">
		<uni-forms ref="baseForm" :modelValue="baseFormData">
			<uni-forms-item label="所属酒店:">
				<picker class="picker" @change="bindPickerChange" :value="index" :range="hotelList" range-key="name">
					<view class="uni-input">{{hotelList[index].name || '请选择'}}</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item label="网点名称:">
				<uni-easyinput v-model="baseFormData.name" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item label="网点编码:">
				<uni-easyinput v-model="baseFormData.code" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item label="经度:">
				<uni-easyinput v-model="baseFormData.longitude" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item label="纬度:">
				<uni-easyinput v-model="baseFormData.latitude" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item label="地址详情:">
				<uni-easyinput type="textarea" v-model="baseFormData.address" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item label="门头照:">
				<view class="upload"  @click="chooseImage">
					<uni-icons v-if="!baseFormData.storePhotos && !imgList" @click="deleteOne(index)" class="delete" type="upload" color="#fff"></uni-icons>
					<view v-if="imgsList" class="bg" :style="{background: 'url('+ imgsList +') center/ 100% no-repeat border-box border-box'}"></view>
					<view v-else class="bg" :style="{background: 'url('+baseUrl + '/' + baseFormData.storePhotos+') center/ 100% no-repeat border-box border-box'}"></view>
				</view>
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="bathImage" class="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$baseUrl,
				hotelBranchId: '',
				hotelList: [
					// {
					// 	name: '请选择',
					// 	hotelId: '-1'
					// }
				],
				index: -1,
				baseFormData: {
					hotelId: '-1',
					name: '',
					code: 'csgfe',
					address: '龙华大道10050号',
					longitude: '36548.2134000',
					latitude: '253.2365400',
					storePhotos: '',
				},
				imgsList: '',
			}
		},
		components: {},
		onLoad(options) {
			console.log(options)
			this.hotelBranchId = options.id
			// if (this.hotelBranchId) {
			// 	this.getBranchInfo()
			// }
			this.getHotelList()
		},
		mounted() {
			console.log(111)
		},
		methods: {
			getHotelList() {
				this.$api.getHotelList({
					page: 1,
					per_page: 300
				}).then(res => {
					console.log(res)
					this.hotelList = [...this.hotelList, ...res.data.data]
					if (this.hotelBranchId) {
						this.getBranchInfo()
					}
				}).catch(err => {
					this.status = 'more'
					console.log(err)
				})
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
				this.baseFormData.hotelId = this.hotelList[this.index].hotelId
			},
			getBranchInfo() {
				this.$api.getHotelBranchInfo({
					id: this.hotelBranchId
				}).then(res => {
					console.log(res)
					this.baseFormData = {
						...this.baseFormData,
						...res.data
					}

					this.hotelList.forEach((v, i) => {
						if (v.hotelId == this.baseFormData.hotelId) {
							this.index = i
						}
					})
				}).catch(err => {
					console.log(err)
				})
			},
			chooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						this.imgsList = res.tempFilePaths[0]
						this.baseFormData.storePhotos = res.tempFilePaths[0]
					}
				});
			},
			submit(res) {
				let method = this.hotelBranchId ? 'updateHotelBranch' : 'addHotelBranch'
				let	params = {...this.baseFormData, storePhotos: res}
				if(this.hotelBranchId) {
					params.hotelBranchId = this.hotelBranchId
				}
				this.$api[method](params).then(res => {
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					})
					uni.$emit('updateBranchList')
				}).catch(err => {
					console.log(err)
				})
			},
			bathImage() {
				let title = ''
				if (!this.baseFormData.hotelId) {
					title = '请选择酒店'
				} else if (!this.baseFormData.name.trim()) {
					title = '请输入网点名称'
				} else if (!this.baseFormData.code.trim()) {
					title = '请输入网点编码'
				} else if (!this.baseFormData.longitude.trim()) {
					title = '请输入经度'
				} else if (!this.baseFormData.latitude.trim()) {
					title = '请输入纬度'
				} else if (!this.baseFormData.address.trim()) {
					title = '请输入地址详情'
				} else if(!this.baseFormData.storePhotos) {
					title = '请上传门头照'
				} else {
					title = ''
				}
				if (title) {
					uni.showToast({
						title: title,
						icon: 'none'
					})
					return
				}
				let _this = this
				console.log(this.baseFormData.storePhotos)
				if(this.imgList) {
					let promise = new Promise((resolve, reject) => {
						wx.uploadFile({
							url: 'https://dev.qyqycp.com/upload/file/image',
							filePath: _this.baseFormData.storePhotos,
							name: 'image',
							success(res) {
								console.log(res)
								resolve(JSON.parse(res.data).data.url)
							},
							fail(err) {
								console.log(err)
								reject(err)
							}
						})
					})
					promise.then(res => {
						console.log(res)
						this.submit(res)
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: err.msg || '网络错误'
						})
					})
				} else {
					this.submit(this.baseFormData.storePhotos)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		padding: 15px;
		font-size: 13px;
		background: #eee;
	}

	.uni-input {
		height: 36px;
		display: flex;
		align-items: center;
		padding-left: 10px;
	}

	.upload {
		width: 120rpx;
		height: 120rpx;
	
		.bg {
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			background: url('/static/logo.png') no-repeat 100% 100%;
			background-size: 100% 100%;
		}
	}

	.submit {
		margin: 10px 0 30px;
		background: $uni-color-primary;
	}
</style>
