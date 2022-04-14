import axios from "./axios.js"
export default {
	// 账号密码登录
	adminAuthLogin(params) {
		return axios.httpRequest({
			url: `/admin/auth/login`,
			method: 'post'
		}, params)
	},
	// 管理员列表per_page, page,
	// level: 0:平台管理员,1:酒店管理员,2:酒店网点管理员
	// state: 启用 1:是 0:否
	getSystemAdminList(params) {
		return axios.httpTokenRequest({
			url: '/admin/v1/setting/systemAdmin/list',
		}, params)
	},
	// 新增管理员 account password roles realName hotelId hotelBranchId password_confirm
	addSystemAdmin(params) {
		return axios.httpTokenRequest({
			url: '/admin/v1/setting/systemAdmin/save',
			method: 'post'
		}, params)
	},
	// 编辑管理员 adminId roles modifyPassword hotelBranchId password_confirm realName
	updateSystemAdmin(params) {
		return axios.httpTokenRequest({
			url: '/admin/v1/setting/systemAdmin/update',
			method: 'put'
		}, params)
	},
	// 删除用户信息
	deleteSystemAdmin(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemAdmin/delete/${params.adminId}`,
			method: 'put'
		})
	},
	// 批量删除用户信息
	deleteSystemAdminBatch(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemAdmin/batchDelete`,
			method: 'delete'
		}, params)
	},
	// 获取用户信息
	getSystemAdminInfo(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemAdmin/info/${params.adminId}`,
		}, params)
	},
	// 获取角色列表 per_oage page status hotelId hotelBranchId
	getSystemRoleList(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemRole/list`,
		}, params)
	},
	// 获取角色信息
	getSystemRoleInfo(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemRole/info/${params.roleId}`,
		}, params)
	},
	// 新增角色信息
	addSystemRole(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemRole/save`,
			method: 'post'
		}, params)
	},
	// 修改角色信息
	updateSystemRole(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemRole/update`,
			method: 'put'
		}, params)
	},
	// 获取菜单权限
	getSystemMenusList(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemMenus/index`,
		}, params)
	},
	// 新增菜单权限
	addSystemMenus(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemMenus/save`,
			method: 'post'
		}, params)
	},
	// 修改菜单权限
	updateSystemMenus(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemMenus/update`,
			method: 'put'
		}, params)
	},
	// 删除菜单权限
	deleteSystemMenus(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemMenus/delete/${params.menuId}`,
			method: 'delete'
		})
	},
	// 菜单权限详情
	getSystemMenusInfo(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/setting/systemMenus/info/${params.menuId}`,
		}, params)
	},
	// 获取酒店列表
	getHotelList(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/list`,
		}, params)
	},
	// 新增酒店
	addHotel(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/save`,
			method: 'post'
		}, params)
	},
	// 修改酒店
	updateHotel(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/update`,
			method: 'put'
		}, params)
	},
	// 酒店详情
	getHotelInfo(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/info/${params.hotelId}`,
		}, params)
	},
	// 获取酒店网点
	getHotelBranchList(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/branch/list`,
		}, params)
	},
	// 新增酒店网点列表
	addHotelBranch(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/branch/save`,
			method: 'post'
		}, params)
	},
	// 修改酒店网点
	updateHotelBranch(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/branch/update`,
			method: 'put'
		}, params)
	},
	// 酒店详情网点
	getHotelBranchInfo(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/branch/info/${params.hotelId}`,
		}, params)
	},
	// 获取房间列表
	getRoomList(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/branchRoom/list`,
		}, params)
	},
	// 新增房间
	addRoom(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/branchRoom/save`,
			method: 'post'
		}, params)
	},
	// 修改房间
	updateRoom(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/branchRoom/update`,
			method: 'put'
		}, params)
	},
	// 酒店房间
	getRoomInfo(params) {
		return axios.httpTokenRequest({
			url: `/admin/v1/hotel/branchRoom/info/${params.hotelId}`,
		}, params)
	},

}
