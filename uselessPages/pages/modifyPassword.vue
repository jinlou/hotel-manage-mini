<template>
	<view class="content">
		<view class="item">
			<view class="one">
				<text>旧密码</text>
				<input v-model="title" type="password" placeholder="请输入旧密码" />
			</view>
			<view class="one">
				<text>新密码</text>
				<input v-model="title1" type="password" placeholder="请输入新密码" />
			</view>
			<view class="one">
				<text>确认密码</text>
				<input v-model="title1" type="password" placeholder="请输入确认密码" />
			</view>
		</view>
		
		<button type="primary" @click="submit" class="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				typeList: [{
						title: '企业单位',
						id: 0
					},
					{
						title: '个人/非企业',
						id: 1
					}
				],
				phone: '',
				title: '',
				title1: '',
				taxNumber: '',
				companyAddress: '',
				telephone: '',
				bankName: '',
				bankAccount: '',
				price: '',

				array: [{
						text: "工商银行",
						value: "1-0",
					},
					{
						text: "招商银行",
						value: "2-0"
					},
					{
						text: "农业银行",
						value: "3-0"
					}
				],
				index: 0,
				timer: 0,
			}
		},
		components: {
		},
		onLoad() {},
		mounted() {},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			getCode() {
				if(!this.timer) {
					let timer = setInterval(() => {
						if(this.timer == 60) {
							clearInterval(timer)
							this.timer = 0
						} else {
							this.timer++
						}
						console.log(this.timer)
					}, 1000)
				} else {
					return
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #eee;
		min-height: 100vh;
		color: #333;
	}

	.item {
		background: #fff;
		margin-bottom: 20rpx;
	}

	.one {
		padding: 0 20rpx;
		height: 76rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #ebedf2;
		font-size: 22rpx;

		text {
			width: 120rpx;
			margin-right: 28rpx;
			flex-grow: 0;
			flex-shrink: 0;
		}

		input,
		.picker {
			flex: 1;
			padding-right: 12rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
		}
	}

	.getTypeTxt {
		font-size: 28rpx;
		font-weight: bold;
		line-height: 50rpx;
	}

	.submit {
		position: fixed;
		bottom: 60rpx;
		width: calc(100% - 60rpx);
		margin: 10px 30rpx 30px;
		background: $uni-color-primary;
		font-size: 28rpx;
	}
</style>
