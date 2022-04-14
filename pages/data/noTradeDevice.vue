<template>
	<view class="content">
		<image class="bg" src="@/static/image/logo.png" mode=""></image>
		<view class="date">
			<view class="title">
				<view class="line"></view>
				<text>统计时间</text>
			</view>
			<view class="choose">
				<view class="one">
					<text>时间区间：</text>
					<view class="dates">
						<picker class="picker" mode="date" :value="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{startDate}}</view>
						</picker>
						<text>至</text>
						<picker class="picker" mode="date" :value="endDate" :end="endDate" @change="bindDateChange1">
							<view class="uni-input">{{endDate}}</view>
						</picker>
					</view>
				</view>
				<view class="one">
					<text>快捷选择：</text>
					<view class="dates">
						<view :class="['fastChoose', fast == item.num ? 'active' : '']" v-for="item in fastList"
							:key="item.num" @click="choose(item)">
							{{item.text}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="statistic">
			<view class="num">
				<text>{{statistic}}</text>
				<text>设备数</text>
			</view>

		</view>
		<view class="lists">
			<view class="title">
				<view class="line"></view>
				<text>设备无交易排行</text>
			</view>
			<view class="one" v-for="(item, index) in lists" :key="index">
				<image src="@/static/image/logo.png" mode=""></image>
				<view class="info">
					<text>设备号：{{item.deviceNum}}</text>
					<text>网点：{{item.branchName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				endDate: new Date(),
				startDate: new Date(),
				endDate: new Date(),
				fastList: [{
						text: '一天',
						num: 1
					},
					{
						text: '七天',
						num: 7
					},
					{
						text: '15天',
						num: 15
					},
					{
						text: '30天',
						num: 30
					},
				],
				fast: 0,
				statistic: 0,
				lists: [],
			}
		},
		onLoad() {},
		watch: {
			startDate(val) {
				// if(this.startDate)
			}
		},
		mounted() {
			this.startDate = this.getDate()
			this.endDate = this.getDate()
			this.getData()
		},
		methods: {
			bindDateChange(e) {
				console.log(e)
				this.startDate = e.detail.value
				this.fast = 0
			},
			bindDateChange1(e) {
				console.log(e)
				this.endDate = e.detail.value
				this.fast = 0
			},
			getDate(day = 0) {
				let today = new Date()
				let targetDay = today.getTime() - 1000 * 60 * 60 * 24 * day
				today.setTime(targetDay)
				let year = today.getFullYear()
				let month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)
				let date = today.getDate() > 9 ? today.getDate() : '0' + today.getDate()
				let dateTime = year + '-' + month + '-' + date
				console.log('日：' + dateTime)
				return dateTime
			},
			choose(item) {
				this.fast = item.num
				this.startDate = this.getDate(item.num)
				this.endDate = this.getDate()
			},
			getData() {
				for (let i = 0; i < 10; i++) {
					this.lists.push({
						deviceNum: '123456789',
						branchName: '深蓝网吧'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #eee;
		height: 100vh;
	}

	.bg {
		width: 100%;
		height: 140rpx;
	}

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

	.choose {
		margin-top: 12rpx;
		border-top: 1rpx solid #ebedf2;
		padding-top: 10rpx;

		.one {
			padding: 0 20rpx;
			height: 76rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
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
	}

	.date {
		background: #fff;
	}

	.dates {
		display: flex;
		align-items: center;

		text {
			width: auto;
			margin-left: 20rpx;
		}

		.picker {
			padding: 0 12rpx;
			border: 1px solid #00a4ef;
			border-radius: 16rpx;
		}
	}

	.fastChoose {
		width: 80rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;

		&.active {
			background: $uni-color-primary;
			color: #fff;
			border-radius: 6rpx;
		}
	}

	.statistic {
		margin-top: 20rpx;
		background: #fff;
		padding: 20rpx;

		.num {
			background: $uni-color-primary;
			border-radius: 20rpx;
			height: 140rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 30rpx;
			color: #fff;
			font-size: 28rpx;

			text {
				display: inline-block;
				width: 100rpx;
				text-align: center;
			}

			text:first-child {
				font-weight: bold;
				margin-bottom: 10rpx;
			}

			text:last-child {
				font-size: 26rpx;
			}
		}
	}

	.lists {
		background: #fff;
		margin-top: 20rpx;

		.one {
			height: 140rpx;
			padding: 10rpx 30rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #ebedf2; 
			font-size: 24rpx;

			image {
				width: 70rpx;
				height: 70rpx;
				margin-right: 30rpx;
			}
			
			.info {
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				
				text:first-child {
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
