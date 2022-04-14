<template>
	<view class="content">
		<view class="item">
			<view class="title">
				<view class="line"></view>
				<text>提现支付宝账号信息</text>
			</view>
			<view class="one">
				<text>支付宝姓名</text>
				<input v-model="title" type="text" placeholder="请输入支付宝用户名" />
			</view>
			<view class="one">
				<text>支付宝账号</text>
				<input v-model="title1" type="text" placeholder="请输入支付宝账号" />
			</view>
		</view>
		<view class="item">
			<view class="title">
				<view class="line"></view>
				<text>提现银行卡信息</text>
			</view>
			<view class="one">
				<text>持卡人</text>
				<input v-model="title" type="text" placeholder="请输入持卡人姓名" />
			</view>
			<view class="one">
				<text>卡号</text>
				<input v-model="title1" type="text" placeholder="请输入持卡人卡号" />
			</view>
			<view class="one">
				<text>开户银行</text>
				<picker class="picker" @change="bindPickerChange" :value="index" :range="array" range-key="text">
					<view class="uni-input">{{array[index].text}}</view>
				</picker>
			</view>
		</view>
		<view class="item">
			<view class="title">
				<view class="line"></view>
				<text>提现手机号
					<text>（提现时将接收验证短信）</text>
				</text>
			</view>
			<view class="one">
				<text>提现人姓名</text>
				<input v-model="title" type="text" placeholder="请输入提现人姓名" />
			</view>
			<view class="one">
				<text>手机号码</text>
				<input v-model="title1" type="text" placeholder="请输入手机号码" />
			</view>
		</view>
		<view class="item">
			<view class="title">
				<view class="line"></view>
				<text>登录人手机号验
					<text>（验证是否本人操作）</text>
				</text>
			</view>
			<view class="one">
				<text>手机号</text>
				<input v-model="title" type="text" placeholder="请输入手机号" />
			</view>
			<view class="one">
				<text>验证码</text>
				<input v-model="title1" type="text" placeholder="请输入验证码" />
				<button :disabled="timer" class="button" type="default" @click="getCode()">{{timer ? ((60 - timer) + '秒') : '获取验证码'}}</button>
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
		padding: 20rpx 0;
		background: #eee;
		min-height: 100vh;
		color: #333;
	}

	.item {
		background: #fff;
		margin-bottom: 20rpx;

		.title {
			padding: 10rpx 20rpx;

			.line {
				width: 6rpx;
				height: 20rpx;
				border-radius: 3rpx;
				background: $uni-color-primary;
				display: inline-block;
				margin-right: 10rpx;
			}

			text {
				font-weight: bold;
				font-size: 28rpx;
				
				text {
					font-weight: 500;
					font-size: 22rpx;
				}
			}
		}
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

	.getType {
		background: #fff;
		border-radius: 8rpx;
		padding: 0 20rpx;
		height: 76rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #ebedf2;
		font-size: 24rpx;

		text {
			width: 96rpx;
			margin-right: 28rpx;
			flex-grow: 0;
			flex-shrink: 0;
		}

		input {
			flex: 1;
			padding-right: 12rpx;
		}
	}

	.more {
		margin-top: 16rpx;
		background: #fff;
		border-radius: 8rpx;
		padding: 0 20rpx 20rpx;
		font-size: 24rpx;

		text {
			line-height: 60rpx;
		}

		.info {
			height: 140rpx;
			background: #eee;
			padding: 8rpx 6rpx;
			width: 100%;
			border-radius: 10rpx;
			box-sizing: border-box;
		}
	}

	.submit {
		margin: 10px 30rpx 30px;
		background: $uni-color-primary;
		font-size: 28rpx;
	}

	.button {
		width: 160rpx;
		height: 48rpx;
		line-height: 36rpx;
		font-size: 20rpx;
		padding: 6rpx 30rpx;
		color: #fff;
		background: $uni-color-primary;
		flex-grow: 0;
		flex-shrink: 0;
	}
</style>
