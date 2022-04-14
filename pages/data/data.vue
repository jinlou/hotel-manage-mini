<template>
	<view class="content">
		<image class="bg" src="@/static/image/logo.png" mode=""></image>
		<view class="manageList">
			<view class="mini" v-for="(item, index) in manageList" :key="index" @click="goTo(item)">
				<image :src="item.bg" mode=""></image>
				<text>{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
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
						text: '收益统计',
						bg: require('@/static/image/manage/manage1.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '无交易设备',
						bg: require('@/static/image/manage/manage2.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '服务统计',
						bg: require('@/static/image/manage/manage3.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '送物统计',
						bg: require('@/static/image/manage/manage4.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '问讯统计',
						bg: require('@/static/image/manage/manage5.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '投诉统计',
						bg: require('@/static/image/manage/manage6.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '购物统计',
						bg: require('@/static/image/manage/manage7.png'),
						appID: '',
						defaultPage: ''
					},
					{
						text: '销售排行',
						bg: require('@/static/image/manage/manage8.png'),
						appID: '',
						defaultPage: ''
					},
				],
				
			}
		},
		onLoad() {
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
		background: #fff;
		height: 100vh;
	}

	.bg {
		width: 100%;
		height: 140rpx;
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
</style>
