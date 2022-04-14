<template>
	<view class="content">
		<view class="title">筛选条件</view>
		<view class="item">
			<text>筛选网点：</text>
			<picker class="picker" @change="bindPickerChange" :value="index" :range="array" range-key="text">
				<view class="uni-input">{{array[index].text}}</view>
			</picker>
		</view>
		<view class="title">总收益金额</view>
		<view class="allMoney">{{allMoney}}元</view>
		<view class="list">
			<view class="one" v-for="(item, index) in list" :key="index" @click="goTo(item)">
				<view class="title">{{item.date.slice(0,4)}}</view>
				<view class="item">
					<text>{{item.date}}</text>
					<view class="right">
						<text>￥{{item.money}}</text>
						<uni-icons type="right" color="#666" size="14"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				allMoney: 0,
				list: [
					{
						date: '2022-03',
						money: 0
					},
					{
						date: '2022-02',
						money: 0
					},
					{
						date: '2022-01',
						money: 0
					},
					{
						date: '2021-12',
						money: 0
					},
				],
			}
		},
		onLoad() {},
		methods: {
			goTo(item) {
				uni.navigateTo({
					url: '/pages/data/accountDetail?date=' + item.date + '&where=' + this.array[this.index].text
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #eee;
		min-height: 100vh;
	}

	.title {
		font-size: 28rpx;
		color: #666;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 30rpx;
	}

	.item {
		background: #fff;
		border-radius: $uni-border-radius-base;
		height: 80rpx;
		display: flex;
		align-items: center;
		margin: 0 30rpx;
		font-size: 28rpx;
		padding: 0 16rpx;
	}
	
	.allMoney {
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 30rpx;
	}
	
	.list {
		.title {
			height: 60rpx;
		line-height: 60rpx;
		}
		
		.item {
			justify-content: space-between;
		}
	}
</style>
