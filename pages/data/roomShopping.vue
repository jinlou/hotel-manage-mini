<template>
	<view class="content">
		<view class="date">
			<view class="title">
				<view class="line"></view>
				<text>筛选统计</text>
			</view>
			<view class="choose">
				<view class="one">
					<text>筛选网点：</text>
					<picker class="picker picker1" @change="bindPickerChange" :value="index" :range="array"
						range-key="text">
						<view class="uni-input">{{array[index].text}}</view>
					</picker>
				</view>
				<view class="one">
					<text>时间区间：</text>
					<view class="dates">
						<picker class="picker" mode="date" :value="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{startDate}}</view>
						</picker>
						<text style="width: auto;">至</text>
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
		<view class="echart">
			<view class="title">
				<view class="line"></view>
				<text>服务统计</text>
			</view>
			<view class="detail">
				<my-echarts class="uni-ec-canvas" id="pie-chart" canvas-id="multi-charts-pie" :ec="ec2">
				</my-echarts>
			</view>
		</view>
		<view class="num">
			<view class="title">
				<view class="line"></view>
				<text>服务统计</text>
			</view>
			<view class="detail">
				<view class="one" v-for="(item,index) in lists" :key="idnex">
					<text>{{item.name}}</text>
					<text>{{item.value}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myEcharts from '@/components/uni-echarts/uni-echarts';
	import {
		getEchartsOptionsLine
	} from '@/static/js/echarts'
	export default {
		data() {
			return {
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
				endDate: new Date(),
				startDate: new Date(),
				endDate: new Date(),
				fastList: [{
						text: '近七天',
						num: 7
					},
					{
						text: '一个月',
						num: 30
					},
					{
						text: '三个月',
						num: 90
					},
					{
						text: '一年',
						num: 365
					},
				],
				fast: 7,
				options: {},
				lists: [],
				ec2: {
					option: {}
				}
			}
		},
		onLoad() {},
		watch: {
			startDate(val) {
				// if(this.startDate)
			}
		},
		components: {
			myEcharts
		},
		mounted() {
			this.startDate = this.getDate(7)
			this.endDate = this.getDate()
			this.getData()
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
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
				this.lists = [{
						name: '总计金额',
						value: [1, 2, 3, 4, 5, 6, 7]
					},
					{
						name: '微信金额',
						value: [1, 2, 3, 4, 5, 6, 7]
					},
					{
						name: '现金金额',
						value: [1, 2, 3, 4, 5, 6, 7]
					},
					{
						name: '总计笔数',
						value: [1, 2, 3, 4, 5, 6, 7]
					},
					{
						name: '微信笔数',
						value: [1, 2, 3, 4, 5, 6, 7]
					},
					{
						name: '现金笔数',
						value: [1, 2, 3, 4, 5, 6, 7]
					},
				]
				// this.ec2.option.series[0].data = this.lists

				let series = [],dateList = []

				for (let i = 0; i < this.lists.length; i++) {
					series.push({
						name: this.lists[i].name,
						type: 'line',
						data: this.lists[i].value
					})
				}
				
				for(let i=0;i<this.fast;i++) {
					dateList.push(this.getDate(this.fast - i - 1).slice(5))
				}

				this.ec2 = {
					option: getEchartsOptionsLine(dateList, series, this.lists)
				}
			},
			reloadEchart(data) {
				const option = this.echart.option;

				option.series[0].data = data;

				if (this.$refs['canvas']) {
					this.$refs['canvas'].updateOption(option); //赋值option
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #eee;
		min-height: 100vh;
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

	.picker1 {
		justify-content: flex-end;
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

	.echart {
		background: #fff;
		margin-top: 20rpx;

		.detail {
			width: 100%;
			height: 450rpx;

			.ec-canvas {
				display: block;
			}
		}
	}

	.num {
		background: #fff;
		margin-top: 20rpx;
		padding-bottom: 40rpx;

		.one {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			height: 50rpx;
			align-items: center;
			padding: 0 30rpx;
		}
	}
</style>
