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
		<el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="time" label="时间" width="150">
			</el-table-column>
			<el-table-column prop="type" label="类型" width="150">
			</el-table-column>
			<el-table-column prop="sender" label="发送人" min-width="180">
			</el-table-column>
			<el-table-column prop="receiver" label="接受人" min-width="180">
			</el-table-column>
			<el-table-column prop="content" label="内容" min-width="120">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
									<el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				tableData: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [], //列表选中列
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
			//获取通知列表
			queryGroup() {
				let that = this
				this.listLoading = true;
				let url = this.$Host + '/notification'
				this.$axios.get(url)
					.then((res) => {
						that.listLoading = false
						if (res.data.success) {
							res.data.data.forEach(item => {
								item.time = this.$moment(item.time).format('MM-DD HH:mm:ss')
								that.tableData.push(item)
							})
						}
					})
					.catch(err => {
						console.error(err)
					});
			},
			//删除
			handleDel: function(index, row) {
				this.$confirm('确认删除该订单吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						id: row.id
					};
					this.$axios.delete(url, para)
						.then((res) => {
							that.listLoading = false
							if (res.data.success) {
								res.data.data.forEach(item => {
									item.time = this.$moment(item.time).format('MM-DD HH:mm:ss')
									that.tableData.push(item)
								})
							}
						})
						.catch(err => {
							console.error(err)
						});
				}).catch((err) => {
					console.log(err)
				});
			},
			//显示编辑界面
			handleEdit: function(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
		},
	}
</script>

<style scoped>

</style>