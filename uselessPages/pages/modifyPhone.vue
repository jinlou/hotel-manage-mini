<template>
	<view class="content">
		<view class="item">
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
				timer: 0
			}
		},
		components: {
		},
		onLoad() {},
		mounted() {},
		methods: {
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

	.submit {
		margin: 10px 30rpx 30px;
		background: $uni-color-primary;
		font-size: 28rpx;
	}
</style>
