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
			<el-table-column prop="workName" label="排班表名称" width="120" >
			</el-table-column>
			<el-table-column prop="planName" label="方案名称" width="120">
			</el-table-column>
			<el-table-column prop="t" label="执行时间" width="150">
			</el-table-column>
			<el-table-column prop="sTime" label="开始时间" width="150">
			</el-table-column>
			<el-table-column prop="eTime" label="结束时间" width="150">
			</el-table-column>
			<el-table-column prop="registrant" label="登记人" width="100">
			</el-table-column>
			<el-table-column prop="memo" label="备注" min-width="180">
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
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
				<el-form-item label="排班表名称" prop="workName">
					<el-input v-model="editForm.workName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="方案名称" prop="planName">
					<el-input v-model="editForm.planName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="执行时间" prop="time">
					 <el-date-picker v-model="editForm.time"  type="datetime"  placeholder="选择时间"></el-date-picker>
				</el-form-item>
				<el-form-item label="开始时间" prop="startTime">
					 <el-date-picker v-model="editForm.startTime"  type="datetime"  placeholder="选择时间"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间" prop="endTime">
					 <el-date-picker v-model="editForm.endTime"  type="datetime"  placeholder="选择时间"></el-date-picker>
				</el-form-item>
				<el-form-item label="登记人" prop="registrant">
					<el-input type="textarea" v-model="editForm.registrant"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input type="textarea" v-model="editForm.memo"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="排班表名称" prop="workName">
					<el-input v-model="addForm.workName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="方案名称" prop="planName">
					<el-input v-model="addForm.planName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="执行时间" prop="time">
					 <el-date-picker v-model="addForm.time"  type="datetime"  placeholder="选择时间"></el-date-picker>
				</el-form-item>
				<el-form-item label="开始时间" prop="startTime">
					 <el-date-picker v-model="addForm.startTime"  type="datetime"  placeholder="选择时间"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间" prop="endTime">
					 <el-date-picker v-model="addForm.endTime"  type="datetime"  placeholder="选择时间"></el-date-picker>
				</el-form-item>
				<el-form-item label="登记人" prop="registrant">
					<el-input type="textarea" v-model="addForm.registrant"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input type="textarea" v-model="addForm.memo"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
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
				editLoading: false,
				editFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
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
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
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
			//获取排班列表
			queryGroup() {
				let that = this
				this.listLoading = true;
				let url = this.$Host + '/work'
				this.$axios.get(url)
					.then((res) => {
						that.tableData = []
						that.listLoading = false
						if (res.data.success) {
							res.data.data.forEach(item => {
								item.t = this.$moment(item.time).format('MM-DD HH:mm:ss')
								item.sTime = this.$moment(item.startTime).format('MM-DD HH:mm:ss')
								item.eTime = this.$moment(item.endTime).format('MM-DD HH:mm:ss')
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
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let url = this.$Host + '/work?id=' + row._id
					this.$axios.delete(url)
						.then((res) => {
							if (res.data.success) {
								that.$message.success('数据删除成功!')
								that.queryGroup()
							} else {
								that.$message.warning('数据删除失败!')
							}
						})
						.catch(err => {
							that.$message.warning('数据删除失败!')
							console.error(err)
						});
				}).catch(() => {});
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
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function() {
				let that = this
				let url = this.$Host + '/work'
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
				let that = this
				let url = this.$Host + '/work'
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({}, this.addForm);
							that.$axios.post(url, para)
								.then(res => {
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
		},
	}
</script>