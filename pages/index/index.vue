<template>
	<view class="content">
		<view class="bg"></view>
		<view class="top">
			<view class="manageInfo">
				<view class="title">经营数据</view>
				<view class="info">
					<view class="one">
						<view>客房服务(次)</view>
						<view>{{manage.service}}</view>
					</view>
					<view class="one">
						<view>好评有礼(次)</view>
						<view>{{manage.service}}</view>
					</view>
					<view class="one">
						<view>客房购物(次)</view>
						<view>{{manage.service}}</view>
					</view>
					<view class="one">
						<view>活跃用户(人)</view>
						<view>{{manage.service}}</view>
					</view>
					<view class="one">
						<view>客房问询(次)</view>
						<view>{{manage.service}}</view>
					</view>
					<view class="one">
						<view>一键WIFI(次)</view>
						<view>{{manage.service}}</view>
					</view>
					<view class="one">
						<view>投诉建议(次)</view>
						<view>{{manage.service}}</view>
					</view>
					<view class="one">
						<view>预约发票(次)</view>
						<view>{{manage.service}}</view>
					</view>
					<view class="one">
						<view>广告曝光(次)</view>
						<view>{{manage.service}}</view>
					</view>
				</view>
			</view>
			
			<view class="manageList">
				<view class="mini" v-for="(item, index) in manageList" :key="index" @click="goTo(item)">
					<image :src="item.bg" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
			
			<view class="takeaway">
				<view class="left">
					<image class="logo" src="/static/image/take_out.png"></image>
					<view class="text">
						<view class="">
							<text class="fontRed">{{takeawayAll}}</text>
							<text>外卖红包</text>
						</view>
						<text>今日剩余{{takeawayMount}}个</text>
					</view>
				</view>
				<view class="right">
					立即领取
				</view>
			</view>
			<view class="minis">
				<view class="mini" v-for="(item, index) in minis" :key="index" @click="goTo(item)">
					<view class="out">
						<image :src="item.bg" mode=""></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
			<view class="minis1">
				<view class="mini" v-for="(item, index) in minis1" :key="index" @click="goTo(item)">
					<view class="out">
						<image :src="item.bg" mode=""></image>
					</view>
					<view>{{item.text}}</view>
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
				manage: {
					service: 0,
				},
				takeawayAll: 68,
				takeawayMount: 55,
				manageList: [
					{
						text: '网点管理',
						bg: require('@/static/image/manage/manage1.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '员工管理',
						bg: require('@/static/image/manage/manage2.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '服务管理',
						bg: require('@/static/image/manage/manage3.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '前台电话',
						bg: require('@/static/image/manage/manage4.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '公告设置',
						bg: require('@/static/image/manage/manage5.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: 'WIFI管理',
						bg: require('@/static/image/manage/manage6.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '点餐管理',
						bg: require('@/static/image/manage/manage7.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '打印机电话',
						bg: require('@/static/image/manage/manage8.png'),
						appID: '',
						defaultPage: ''
					},
				],
				
			}
		},
		onLoad() {
			console.log(baseURL)
		},
		methods: {
			scan() {
				console.log('扫描')
				uni.scanCode({
					scanType: ['qrCode'],
					success: res => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.navigateTo({
							url: '/pages/service/service'
						})
					},
					fail: err => {
						console.log(err)
						uni.showToast({
							icon: 'none',
							title: '扫码失败'
						})
					}
				})
			},
			goTo(item) {
				// if (to == 'meituan') {
				// 	uni.navigateToMiniProgram({
				// 		appId: 'wx2c348cf579062e56',
				// 		path: 'packages/restaurant/restaurant/restaurant?poi_id=1027434691792581&aas=1003&cat_id=0',
				// 		extraDta: {
				// 			'data1': 'test'
				// 		},
				// 		success(res) {
				// 			console.log('tiao')
				// 		}
				// 	})
				// }
				uni.navigateToMiniProgram({
					appId: item.appID,
					path: item.defaultPage,
					success(res) {
						console.log('tiao')
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		background: #eee;
		min-height: 100vh;
	}

	.bg {
		position: absolute;
		width: 100%;
		height: 120px;
		left: 0;
		top: 0;
		background: $uni-color-primary;
		z-index: 0;
	}

	.top {
		position: absolute;
		top: 0;
		width: 100%;

		>view {
			margin-left: 12px;
			margin-right: 12px;
			width: calc(100% - 24px);
		}
	}
	
	.manageInfo {
		border-radius: $uni-border-radius-base;
		background: #fff;
		padding: 10rpx 16rpx;
		
		.title {
			font-size: 28rpx;
			font-weight: bold;
			line-height: 50rpx;
			margin-bottom: 20rpx;
		}
		
		.info {
			display: flex;
			flex-wrap: wrap;
			
			.one {
				width: 33%;
				padding-left: 20rpx;
				
				view:first-child {
					color: #666;
					font-size: 26rpx;
					line-height: 32rpx;
				}
				
				view:last-child {
					color: #333;
					font-size: 26rpx;
					font-weight: bold;
					line-height: 50rpx;
				}
			}
		}
	}
	
	.manageList {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		color: #333;
		width: 100%;
		margin-top: 12px;
		border-radius: $uni-border-radius-base;
		background: #fff;
		padding: 30rpx 16rpx 10rpx;
	
		.mini {
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 20rpx;

			image {
				width: 70rpx;
				height: 70rpx;
			}
	
			text {
				line-height: 20px;
				font-size: 26rpx;
				text-align: center;
			}
		}
	}

	.takeaway {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100px;
		background: #fff;
		margin-top: 7px;
		border-radius: 15px;
		padding: 0 12px;
		box-sizing: border-box;

		.left {
			display: flex;

			image {
				width: 60px;
				height: 60px;
				border-radius: 50%;
			}

			.text {
				font-size: 17px;
				font-weight: bold;
				margin-left: 8px;

				.fontRed {
					color: red;
				}
			}
		}

		.right {
			width: 80px;
			text-align: center;
			height: 60rpx;
			line-height: 60rpx;
			background: #ea6571;
			border-radius: 30rpx;
			color: #fff;
			font-size: 24rpx;
		}
	}

	
</style>
