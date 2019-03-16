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
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
											</el-table-column> -->
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="员工姓名" width="120">
			</el-table-column>
			<el-table-column prop="t" label="奖惩时间" width="120">
			</el-table-column>
			<el-table-column prop="type" label="奖惩类型" width="120">
			</el-table-column>
			<el-table-column prop="money" label="奖惩金额" width="150">
			</el-table-column>
			<el-table-column prop="reason" label="奖惩原因" width="150">
			</el-table-column>
			<el-table-column prop="memo" label="备注" min-width="100">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="员工姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="奖惩时间" prop="date">
					 <el-date-picker v-model="editForm.date"  type="date"  placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="奖惩类型"  prop="type">
					<el-input type="text" v-model="editForm.type"></el-input>
				</el-form-item>
				<el-form-item label="奖惩金额"  prop="money">
					<el-input-number v-model="editForm.money" :min="1" :max="10" label="描述文字"></el-input-number>
				</el-form-item>
				<el-form-item label="奖惩原因" prop="reason">
					<el-input type="textarea" v-model="editForm.reason"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input type="textarea" v-model="editForm.memo"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="员工姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="奖惩时间" prop="date">
					<el-date-picker v-model="addForm.date"  type="date"  placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="奖惩类型"  prop="type">
					<el-input type="text" v-model="addForm.type"></el-input>
				</el-form-item>
				<el-form-item label="奖惩金额"  prop="money">
					<el-input-number v-model="addForm.money" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="奖惩原因" prop="reason">
					<el-input type="textarea" v-model="addForm.reason"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input type="textarea" v-model="addForm.memo"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
		</el-dialog>
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
				editFormVisible: false, //编辑界面是否显示
				editFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				//编辑界面数据
				editForm: {
					name: '',
					money: '',
					date: '',
					type: '',
					reason: '',
					memo: '',
				},
				addFormVisible: false, //新增界面是否显示
				addFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				//新增界面数据
				addForm: {
					name: '',
					money: '',
					date: '',
					type: '',
					reason: '',
					memo: '',
				}
			}
		},
		created: function() {
			this.queryGroup()
		},
		methods: {
			//性别显示转换
			formatSex: function(row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.queryGroup();
			},
			//获取奖惩列表
			queryGroup() {
				let that = this
				this.listLoading = true;
				let url = this.$Host + '/incentive'
				this.$axios.get(url)
					.then((res) => {
						that.tableData = []
						that.listLoading = false
						if (res.data.success) {
							res.data.data.forEach(item => {
								item.t = this.$moment(item.time).format('MM-DD HH:mm:ss')
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
				let that = this
				let url = this.$Host + '/incentive?id=' + row._id
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					that.$axios.delete(url).then((res) => {
						this.$message({
							message: '员工删除成功',
							type: 'success'
						});
						this.queryGroup();
					});
				}).catch((error) => {
					console.log(error)
				});
			},
			//显示编辑界面
			handleEdit: function(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function() {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					money: '',
					date: '',
					type: '',
					reason: '',
					memo: '',
				};
			},
			//编辑
			editSubmit: function() {
				let that = this
				let url = this.$Host + '/incentive'
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							that.$axios.put(url, para)
								.then(res => {
									if (res.data.success) {
										that.editFormVisible = false
										that.$message.success('修改成功！')
										that.queryGroup()
									} else {
										that.$message.warning('修改失败！')
									}
								})
								.catch(err => {
									console.log(err)
								})
						});
					}
				});
			},
			//新增
			addSubmit: function() {
				let url = this.$Host + '/incentive'
				let that = this
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({}, this.addForm);
							that.$axios.post(url, para)
								.then(res => {
									console.log(res)
									if (res.data.success) {
										that.addFormVisible = false
										that.$message.success('新增成功！')
										that.queryGroup()
									} else {
										that.$message.warning('新增失败！')
									}
								})
								.catch(err => {
									console.log(err)
								})
						});
					}
				});
			},
			selsChange: function(sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function() {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						ids: ids
					};
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.queryGroup();
					});
				}).catch(() => {});
			}
		},
	}
</script>

<style scoped>

</style>