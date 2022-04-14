<template>
	<view class="page">
		<uni-forms ref="form" :modelValue="formData" class="form" :rules="rules">
			<uni-forms-item name="account" label="账号">
				<!-- uni-easyinput 的校验时机是数据发生变化， 即触发 input 时 -->
				<uni-easyinput v-model="formData.account" type="text" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item name="password" label="密码">
				<!-- input 的校验时机是触发 binddata 时， 即触发 blur 时 -->
				<uni-easyinput v-model="formData.password" type="password" placeholder="请输入密码" />
			</uni-forms-item>
			<button class="button" @click="submit">确认</button>
		</uni-forms>
	</view>
</template>
<script>
	let globalData = getApp().globalData
	export default {
		data() {
			return {
				formData: {
					account: 'admin',
					password: 'zkl123456kk'
				},
				rules: {
					account: {
						// name 字段的校验规则
						rules: [
							// 校验 name 不能为空
							{
								required: true,
								errorMessage: '请填写账号',
							},
							// 对name字段进行长度验证
							{
								minLength: 5,
								maxLength: 11,
								errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
							}
						],
						// 当前表单域的字段中文名，可不填写
						label: '账号',
						validateTrigger: 'submit'
					},
					password: {
						// name 字段的校验规则
						rules: [
							// 校验 name 不能为空
							{
								required: true,
								errorMessage: '请填写账号',
							},
						],
						validateTrigger: 'submit'
					},
				}
			}
		},
		onShow() {
			console.log(3)
			console.log(globalData)
			console.log(this.$api)
		},
		mounted() {
			console.log(1)
			// console.log(globalData)
		},
		methods: {
			submit() {
				this.$refs.form.validate().then(res => {
					console.log('success', res);
					this.$api.adminAuthLogin({
						account: this.formData.account,
						password: this.formData.password
					}).then(res => {
						console.log(res)
						uni.setStorage({
							key: 'userInfo',
							data: res
						})
						uni.setStorage({
							key: 'toekn',
							data: res.token
						})
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 300rpx 30rpx;

		.form {}
	}
</style>
