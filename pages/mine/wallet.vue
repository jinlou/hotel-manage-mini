<template>
	<view class="content">
		<view class="user-info">
			<view class="user">
				<text>可提现金额</text>
				<view class="money">
					<text>￥</text>
					<text>{{money}}</text>
				</view>
			</view>
			<view class="withdrawal">提现</view>
		</view>

		<view class="orders">
			<view class="moneyList">
				<view class="one">
					<text>{{moneyList.in}}</text>
					<text>累计收入</text>
				</view>
				<view class="one">
					<text>{{moneyList.out}}</text>
					<text>累计支出</text>
				</view>
				<view class="one">
					<text>{{moneyList.ing}}</text>
					<text>提现中</text>
				</view>
				<view class="one">
					<text>{{moneyList.ed}}</text>
					<text>已提现</text>
				</view>
			</view>
			<view class="interval"></view>
			<view class="order" v-for="(item, index) in orders" :key="index" @click="goTo(item)">
				<image :src="item.bg" mode=""></image>
				<view>
					<text>{{item.text}}</text>
					<uni-icons type="right" color="#666" size="14"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0.00,
				moneyList: {
					in: 0,
					out: 0,
					ing: 0,
					ed: 0
				},
				orders: [{
						text: '收入记录',
						bg: require('@/static/image/charge.png'),
						type: 'default',
						defaultPage: 'wallet'
					},
					{
						text: '支出记录',
						bg: require('@/static//image/order_serve.png'),
						url: '',
						defaultPage: ''
					},
					{
						text: '体现记录',
						bg: require('@/static/image/shop_order.png'),
						url: '',
						defaultPage: ''
					},
				],
			}
		},
		onLoad() {
			console.log(baseURL)
		},
		methods: {
			getUserInfo() {
				uni.getUserInfo({
					success: res => {
						console.log(res)
						this.userInfo = res.userInfo
						uni.setStorage({
							key: 'isLogin',
							data: true
						})
					}
				})
			},
			goTo(item) {
				console.log(item)
				if (item == 'login') {
					console.log(uni.getStorageSync('isLogin'))
					if (!uni.getStorageSync('isLogin')) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				} else {
					let page = item.type == 'default' ? '/pages' : '/uselessPages/pages/'
					uni.navigateTo({
						url: page + item.defaultPage
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #24303f;
		height: 100vh;
	}


	.user-info {
		height: 234rpx;
		display: flex;
		align-items: center;
		color: #fff;
		padding: 50rpx 30rpx;

		justify-content: space-between;

		.user {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			height: 100%;

			>text {
				font-size: 24rpx;
			}

			.money {
				font-weight: bold;

				text:last-child {
					font-size: 50rpx;
				}
			}
		}

		.withdrawal {
			padding: 10rpx 30rpx;
			border-radius: 20rpx;
			border: 1px solid #fff;
			font-size: 26rpx;
		}
	}

	.orders {
		display: flex;
		flex-direction: column;
		height: calc(100% - 234rpx);
		color: #333;
		align-items: center;
		background: #fff;
		box-sizing: border-box;
		border-top-left-radius: $uni-border-radius-lg;
		border-top-right-radius: $uni-border-radius-lg;

		.moneyList {
			display: flex;
			width: 100%;
			height: 120rpx;
			padding: 12rpx 0;

			.one {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 22rpx;
				border-right: 1rpx solid #ebedf2;
				
				&:last-child {
					border-right: none;
				}
			}
		}

		.interval {
			height: 20rpx;
			background: #eee;
			width: 100%;
		}

		.order {
			text-align: center;
			display: flex;
			align-items: center;
			height: 100rpx;
			width: 100%;

			image {
				width: 35px;
				height: 35px;
				border-radius: 50%;
				margin: 0 40rpx;
			}

			view {
				flex: 1;
				height: 100%;
				line-height: 100rpx;
				font-size: 14px;
				text-align: left;
				border-bottom: 1rpx solid #ebedf2;
				display: flex;
				justify-content: space-between;
				padding-right: 20rpx;
			}
		}
	}
</style>
