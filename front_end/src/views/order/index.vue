<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="queryGroup">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="orderList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="120">
			</el-table-column>
			<el-table-column prop="time" label="时间" width="150">
			</el-table-column>
			<el-table-column prop="item" label="项目" width="150">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="100">
			</el-table-column>
			<el-table-column prop="address" label="地址" min-width="180">
			</el-table-column>
			<el-table-column prop="memo" label="备注" min-width="120">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
															<el-button size="small" @click="sendOrder(scope.$index, scope.row)">发送</el-button>
															<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	const statusList = ['', '待发送', '已发送']
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				orderList: [],
				total: 0,
				page: 1,
				listLoading: false,
			}
		},
		created: function() {
			this.queryGroup()
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.queryGroup();
			},
			//获取订单列表
			queryGroup() {
				let that = this
				this.listLoading = true;
				let url = this.$Host + '/order'
				this.$axios.get(url)
					.then((res) => {
						that.listLoading = false
						if (res.data.success) {
							res.data.data.forEach(item => {
								item.time = this.$moment(item.time).format('MM-DD HH:mm:ss')
								item.status = statusList[item.status]
								that.orderList.push(item)
							})
						}
					})
					.catch(err => {
						console.error(err)
					});
			},
			//删除
			handleDel: function(index, row) {
				let that = this
				let url = this.$Host + '/order'
				this.$confirm('确认删除该订单吗?', '提示', {
					type: 'warning'
				}).then((action) => {
					this.listLoading = true;
					if (action == 'confirm') {
						let data = {
							status: 2,
							id: row._id
						}
						that.$axios.delete(url, data)
							.then((res) => {
								if (res.data.success) {
									that.$message({
										type: 'info',
										message: `订单发送成功`
									});
									that.orderList = []
									that.queryGroup()
								}
							})
							.catch(err => {
								console.error(err)
							});
					}
				}).catch(() => {});
			},
			//发送订单
			sendOrder: function(index, row) {
				let that = this
				let url = this.$Host + '/order'
				this.$confirm('是否把当前订单发送给' + row.name + '?', '发送订单', {
					callback: action => {
						if (action == 'confirm') {
							let data = {
								status: 2,
								id: row._id
							}
							that.$axios.put(url, data)
								.then((res) => {
									if (res.data.success) {
										that.$message({
											type: 'info',
											message: `订单发送成功`
										});
										that.orderList = []
										that.queryGroup()
									}
								})
								.catch(err => {
									console.error(err)
								});
						}
					}
				});
			},
		}
	}
</script>

<style scoped>

</style>