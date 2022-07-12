<template>
	<view class="content">
		<uni-forms ref="baseForm" :modelValue="baseFormData">
			<uni-forms-item label="前台电话:">
				<uni-easyinput type="number" v-model="content" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item label="所属酒店:">
				<picker class="picker" @change="bindPickerChange" :value="index" :range="hotelList" range-key="name">
					<view class="uni-input">{{hotelList[index].name || '请选择'}}</view>
				</picker>
				<!-- <uni-data-picker placeholder="请选择酒店网点" 
					popup-title="请选择" 
					:preload="true"
					:localdata="hotelList"
					@change="onchange" 
					@nodeclick="onnodeclick">
				</uni-data-picker> -->
			</uni-forms-item>
			<uni-forms-item label="网点名称:">
				<picker class="picker" :disabled="!hotelId" @change="bindPickerChange1" :value="index1" :range="hotelBranchList" range-key="name">
					<view class="uni-input">{{hotelBranchList[index1].name || '请选择'}}</view>
				</picker>
				<!-- <uni-easyinput v-model="baseFormData.name" placeholder="请输入" /> -->
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submit" class="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$baseUrl,
				hotelId: '',
				hotelBranchId: '',
				hotelList: [],
				hotelBranchList: [],
				index: 0,
				index1: 0,
				content: '',
			}
		},
		components: {},
		onLoad() {
		},
		mounted() {
			this.getConfigInfo()
		},
		methods: {
			getConfigInfo() {
				this.$api.getConfigInfo({
					id: 3
				}).then(res => {
					console.log(res)
					this.hotelId = res.data.hotelId
					this.hotelBranchId = res.data.hotelBranchId
					this.content = res.data.content
					
					this.getHotelList()
				}).catch(err => {
					console.log(err)
				})
			},
			onchange(e) {
				const value = e.detail.value
			},
			onnodeclick(node) {
				console.log(node)
			},
			getHotelList() {
				this.$api.getHotelList({
					page: 1,
					per_page: 300
				}).then(res => {
					console.log(res)
					// this.hotelList = [....this.hotelList, ...res.data.data]
					this.hotelList = res.data.data
					for(let i =0;i<this.hotelList.length;i++){
						this.hotelList[i].text = this.hotelList[i].name
						this.hotelList[i].value = this.hotelList[i].hotelId
						this.hotelList[i].children = []
						
						if(this.hotelId == this.hotelList[i].hotelId) {
							this.index = i
						}
					}
					// console.log(this.hotelList)
					if(this.hotelList.length) {
						this.getHotelBranchList(this.hotelList[this.index].value)
					}
					
				}).catch(err => {
					this.status = 'more'
					console.log(err)
				})
			},
			getHotelBranchList() {
				this.$api.getHotelBranchList({
					hotelId: this.hotelId,
					page: 1,
					per_page: 300
				}).then(res => {
					console.log(res)
					this.hotelBranchList = res.data.data
					this.hotelBranchList.forEach((v,i) => {
						if(this.hotelBranchId == v.hotelBranchId) {
							this.index1 = i
						}
					})
					console.log(this.hotelBranchList)
				}).catch(err => {
					this.status = 'more'
					console.log(err)
				})
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
				this.hotelId = this.hotelList[this.index].hotelId
				this.getHotelBranchList()
				this.index1 = 0
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index1 = e.detail.value
				this.hotelBranchId = this.hotelBranchList[this.index1].hotelBranchId
			},
			submit() {
				this.$api.complaintPhoneSave({
					content: this.content,
					hotelId: this.hotelId,
					hotelBranchId: this.hotelBranchId,
				}).then(res => {
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					})
				}).catch(err => {
					console.log(err)
				})
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
