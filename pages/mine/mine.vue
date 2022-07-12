<template>
	<view class="content">
		<view class="user-info">
			<view class="user">
				<image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode=""></image>
				<image v-else src="/static/image/user.png" mode=""></image>
			</view>
			
			<!-- <button v-if="!loaded" custom-class="wechat-btn" color="#07c160" open-type="getPhoneNumber"
				style="width: 100% ;" @click="getUserInfo">
				未登录
			</button> -->
			<text @click="getUserInfo()">{{userInfo.realName || '去登录'}}</text>
		</view>
		<view class="orders">
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
	import {
		baseURL
	} from 'api/axios'
	export default {
		data() {
			return {
				loaded: false,
				title: 'Hello',
				userInfo: {
					nickName: '',
					avatarUrl: ''
				},
				money: 0,
				orders: [
					{
						text: '我的钱包',
						bg: require('@/static/image/charge.png'),
						type: 'default',
						defaultPage: 'wallet'
					},
					{
						text: '提现账号',
						bg: require('@/static//image/order_serve.png'),
						url: '',
						defaultPage: ''
					},
					{
						text: '常见问题',
						bg: require('@/static/image/shop_order.png'),
						url: '',
						defaultPage: ''
					},
					{
						text: '系统设置',
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
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			getUserInfo() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				// uni.getUserInfo({
				// 	success: res => {
				// 		console.log(res)
				// 		this.userInfo = res.userInfo
				// 		uni.setStorage({
				// 			key: 'isLogin',
				// 			data: true
				// 		})
				// 	}
				// })
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

		.user {
			background: #fff;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			margin-left: 15px;
			margin-right: 10px;
			image {
				width: 35px;
				height: 35px;
				
			}
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
				justify-content: space-between;
				padding-right: 20rpx;
			}
		}
	}
</style>
