<template>
	<view class="content">
		<view class="one" @click="goTo('modifyPhone')">
			<text>修改手机号</text>
			<uni-icons type="right" color="#666" size="14"></uni-icons>
		</view>
		<view class="one" @click="goTo('modifyPassword')">
			<text>修改密码</text>
			<uni-icons type="right" color="#666" size="14"></uni-icons>
		</view>
		<view class="one">
			<text>系统版本</text>
			<text>1.0.0</text>
		</view>
		<button type="primary" @click="loginOut" class="submit">退出登录</button>
	</view>
</template>

<script>
	import {
		baseURL
	} from 'api/axios'
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			console.log(baseURL)
		},
		methods: {
			goTo(item) {
				uni.navigateTo({
					url: '/uselessPages/pages/' + item
				})
			},
			loginOut() {
				uni.navigateTo({
					url: '/pages/login'
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

	.one {
		display: flex;
		height: 90rpx;
		justify-content: space-between;
		padding: 0 20rpx;
		border-bottom: 1px solid #ebedf2;
		align-items: center;
		font-size: 28rpx;
	}
	
	.submit {
		margin: 40px 30rpx 30px;
		background: $uni-color-primary;
		font-size: 28rpx;
	}
</style>
