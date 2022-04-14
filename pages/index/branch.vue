<template>
	<view class="content list">
		<uni-easyinput class="easyinput" prefixIcon="search" v-model="keyword" placeholder="请输入关键词搜索"
			@iconClick="iconClick" @confirm="getData('mark')">
		</uni-easyinput>
		<view class="noData" v-if="!lists.length && status != 'loading'">
			<image class="logo" src="/static/logo.png"></image>
			<view>暂无数据</view>
		</view>
		<view class="lists">
			<view class="one" v-for="(item, index) in lists" :key="index">
				<view class="order-no">
					<view class="left">
						订单号：{{item.orderNo}}
					</view>
					<view class="right">
						<text>{{item.type | typeFilter}}</text>
						<uni-icons type="right" size="14"></uni-icons>
					</view>
				</view>
				<view class="order-info">
					<view class="room-num">
						当前客房：{{item.roomNo}}
					</view>
					<view class="room-num">
						服务类型：{{item.serviceType}}
					</view>
				</view>
				<view class="remark">
					<view class="ellipsis">
						备注：{{item.remark}}
					</view>
					<view class="ellipsis">
						创建时间：{{item.createTime}}
					</view>
				</view>
			</view>
		</view>
		<uni-load-more iconType="circle" :status="status" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				lists: [],
				page: 1,
				per_page: 10,
				status: 'more'
			}
		},
		computed: {

		},
		components: {},
		onLoad(options) {
			console.log(options)
		},
		mounted() {
			this.getData('mark')
		},
		filters: {
			typeFilter(type) {
				return type == 1 ? '已完成' : '待处理'
			}
		},
		methods: {
			getData(mark = '') {
				if (mark) {
					this.page = 1
					this.status = 'more'
				}
				if (this.status == 'more') {
					this.status = 'loading'
				} else {
					return
				}
				for (let i = 0; i < 10; i++) {
					this.lists.push({
						orderNo: Math.floor(Math.random() * 10000000),
						roomNo: Math.floor(Math.random() * 10000),
						serviceType: Math.floor(Math.random() * 1000000000),
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		min-height: 100vh;
		background: #eee;
	}

	.noData {
		height: 70%;
	}
</style>
