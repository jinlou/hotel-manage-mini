<template>
	<view class="content list">
		<uni-easyinput class="easyinput" prefixIcon="search" v-model="keyword" placeholder="请输入网点名称/代码"
			@iconClick="iconClick" @confirm="getData('mark')">
		</uni-easyinput>
		<!-- <view class="noData" v-if="!lists.length && status != 'loading'">
			<image class="logo" src="/static/logo.png"></image>
			<view>暂无数据</view>
		</view> -->
		<view class="lists">
			<view class="one" v-for="(item, index) in lists" :key="index" @click="goTo(item)">
				<view class="top">
					<view class="left">
						<image :src="baseUrl + '/' +item.storePhotos" mode=""></image>
						<view :class="[item.status ? 'active' : 'normal', 'circle']"></view>
					</view>
					<view class="right">
						<view class="hotel">{{item.hotelName || '维也纳酒店'}}</view>
						<view class="branch">{{item.name || '坂田街道龙华店'}}</view>
						<view class="address">{{item.address || '坂田街道龙华店'}}</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more v-if="list.length || status != 'more'" iconType="circle" :status="status" />
		<view style="margin-top: 290rpx;" v-if="!lists.length && status != loading">
			<Nothing></Nothing>
		</view>
	</view>
</template>

<script>
		import Nothing from '@/components/nothing.vue'
	export default {
		data() {
			return {
				keyword: '',
				lists: [],
				page: 1,
				perPage: 10,
				status: 'more',
				baseUrl: this.$baseUrl
			}
		},
		computed: {

		},
		components: {
			Nothing
		},
		onLoad(options) {
			console.log(options)
		},
		onShow() {
			uni.$on('updateBranchList', () => {
				this.getData('mark')
			})
		},
		mounted() {
			this.getData('mark')
		},
		filters: {
			typeFilter(type) {
				return type == 1 ? '已完成' : '待处理'
			}
		},
		onReachBottom() {
			console.log('onReachBottom')
			this.getData()
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			this.getData('mark')
		},
		methods: {
			getData(mark = '') {
				console.log(this.status)
				if (mark) {
					this.page = 1
					this.status = 'more'
				}
				if (this.status == 'more') {
					this.status = 'loading'
				}
				if (this.status == 'noMore') {
					return
				}
				this.$api.getHotelBranchList({
					name: this.keyword,
					code: this.keyword,
					page: this.page,
					per_page: this.perPage
				}).then(res => {
					console.log(res)
					if (mark) this.lists = []
					this.lists = [...this.lists, ...res.data.data]
					if(res.data.data.length < this.perPage) {
						this.status = 'noMore'
					} else {
						this.page++
					}
				}).catch(err => {
					this.status = 'more'
					console.log(err)
				})
			},
			goTo(item) {
				uni.navigateTo({
					url: '/uselessPages/pages/branchDetail?id=' + item.hotelBranchId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background: #eee;
	}

	.noData {
		height: 70%;
	}
	
	.lists {
		.one {
			margin-top: 26rpx;
			background: #fff;
			border-radius: 12rpx;
			padding: 20rpx 30rpx;
			
			.top {
				display: flex;
				
				
				.left {
					width: 180rpx;
					height: 180rpx;
					flex-shrink: 0;
					flex-grow: 0;
					margin-right: 16rpx;
					position: relative;
						
					image {
						width: 180rpx;
						height: 180rpx;
					}
					
					.circle {
						position: absolute;
						width: 20rpx;
						height: 20rpx;
						border-radius: 50%;
						top: 20rpx;
						right: 20rpx;
						
						&.normal {
							background: #f25022;
						}
						
						&.active {
							background: #7fbb00;
						}
					}
				}
				
				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 26rpx;
					
					.hotel {
						font-size: 32rpx;
					}
					
					.branch {
						font-size: 26rpx;
					}
					
					.address {
						font-size: 26rpx;
						color: #999;
					}
				}
			}
		}
	}
</style>
