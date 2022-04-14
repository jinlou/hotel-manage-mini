<template>
	<view class="content">
		<view class="all">
			<view>￥{{all}}</view>
			<view>{{date}}账单</view>
		</view>
		<view class="lists">
			<view class="title">{{where}}</view>
			<view class="top">
				<text>日期</text>
				<text>分成收益(元)</text>
			</view>
			<view class="one" v-for="(item, index) in lists" :key="index">
				<text>{{item.date}}</text>
				<text>{{item.money}}元</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				all: 0,
				date: '2022-03',
				where: '全部网点',
				lists: []
			}
		},
		onLoad(options) {
			console.log(options)
			this.date = options.date
			this.where = options.where
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				for (let i = 1; i < 31; i++) {
					this.lists.push({
						date: this.date + '-' + (i > 9 ? i : ('0' + i)),
						money: 0
					}, )
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: $uni-color-primary;
		min-height: 100vh;
	}

	.all {
		height: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;

		view:first-child {
			font-size: 28rpx;
		}

		view:last-child {
			font-size: 26rpx;
		}
	}

	.lists {
		background: #fff;
		height: calc(100%-120rpx);
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
		padding: 10rpx 30rpx;

		.title {
			font-size: 28rpx;
			font-weight: bold;
			padding: 20rpx 0;
		}

		.top {
			color: #666;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26rpx;
		}

		.one {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26rpx;
			height: 64rpx;
			border-bottom: 1rpx solid #ebedf2;
			
			view:last-child {
				color: $uni-color-primary;
			}
		}
	}
</style>
