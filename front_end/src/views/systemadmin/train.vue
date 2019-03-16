<template>
	<section id="train">
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
			<el-table-column prop="trainName" label="培训名称" width="120">
			</el-table-column>
			<el-table-column prop="sTime" label="培训开始时间" width="120">
			</el-table-column>
			<el-table-column prop="eTime" label="培训结束时间" width="120">
			</el-table-column>
			<el-table-column prop="type" label="培训类型" width="100">
			</el-table-column>
			<el-table-column prop="address" label="培训地点" width="150">
			</el-table-column>
			<el-table-column prop="trainer" label="培训人" width="100">
			</el-table-column>
			<el-table-column prop="unit" label="培训人所在单位" min-width="180">
			</el-table-column>
			<el-table-column prop="number" label="培训人数" min-width="180">
			</el-table-column>
			<el-table-column prop="content" label="培训内容" min-width="180">
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
			<el-pagination layout="prev, pager, next" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
         <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
				<el-form-item label="培训名称" prop="trainName">
					<el-input v-model="editForm.trainName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="培训开始时间" prop="startTime">
					 <el-date-picker v-model="editForm.startTime"  type="datetime"  placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="培训结束时间" prop="endTime">
					 <el-date-picker v-model="editForm.endTime"  type="datetime"  placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="培训类型"  prop="type">
					<el-input type="text" v-model="editForm.type"></el-input>
				</el-form-item>
				<el-form-item label="培训地点"  prop="address">
					<el-input type="text" v-model="editForm.address"></el-input>
				</el-form-item>
				<el-form-item label="培训人数" prop="number">
					<el-input type="text" v-model="editForm.number"></el-input>
				</el-form-item>
				<el-form-item label="培训人所在单位" prop="unit">
					<el-input type="text" v-model="editForm.unit"></el-input>
				</el-form-item>
				<el-form-item label="培训人" prop="trainer">
					<el-input type="text" v-model="editForm.trainer"></el-input>
				</el-form-item>
				<el-form-item label="培训内容" prop="content">
					<el-input type="text" v-model="editForm.content"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input type="text" v-model="editForm.memo"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="培训名称" prop="trainName">
					<el-input v-model="addForm.trainName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="培训开始时间" prop="startTime">
					 <el-date-picker v-model="addForm.startTime"  type="datetime"  placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="培训结束时间" prop="endTime">
					 <el-date-picker v-model="addForm.endTime"  type="datetime"  placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="培训类型"  prop="type">
					<el-input type="text" v-model="addForm.type"></el-input>
				</el-form-item>
				<el-form-item label="培训地点"  prop="address">
					<el-input v-model="addForm.address" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="培训人数" prop="number">
					<el-input-number v-model="addForm.number" :min="0"  label="描述文字"></el-input-number>
				</el-form-item>
				<el-form-item label="培训人所在单位" prop="unit">
					<el-input type="text" v-model="addForm.unit"></el-input>
				</el-form-item>
				<el-form-item label="培训人" prop="trainer">
					<el-input type="text" v-model="addForm.trainer"></el-input>
				</el-form-item>
				<el-form-item label="培训内容" prop="content">
					<el-input type="text" v-model="addForm.content"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="memo">
					<el-input type="text" v-model="addForm.memo"></el-input>
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
				editFormVisible: false, //编辑界面是否显示
				editFormRules: {
					startTime: [{
						required: true,
						message: '请输入培训开始时间',
						trigger: 'blur'
					}],
					endTime: [{
						required: true,
						message: '请输入培训结束时间',
						trigger: 'blur'
					}],
					trainName: [{
						required: true,
						message: '请输入培训名称',
						trigger: 'blur'
					}]
				},
				//编辑界面数据
				editForm: {
					trainName: '',
					type: '',
					address: '',
					startTime: '',
					endTime: '',
					trainer: '',
					unit: '',
					number: '',
					content: '',
					memo: ''
				},
				addFormVisible: false, //新增界面是否显示
				addFormRules: {
					trainName: [{
						required: true,
						message: '请输入培训名称',
						trigger: 'blur'
					}],
					startTime: [{
						required: true,
						message: '请输入培训开始时间',
						trigger: 'blur'
					}],
					endTime: [{
						required: true,
						message: '请输入培训结束时间',
						trigger: 'blur'
					}],
				},
				//新增界面数据
				addForm: {
					trainName: '',
					type: '',
					address: '',
					startTime: '',
					endTime: '',
					trainer: '',
					unit: '',
					number: '',
					content: '',
					memo: ''
				}
			}
		},
		created: function() {
			this.queryGroup()
		},
		methods: {
			//获取培训列表
			queryGroup() {
				let that = this
				this.listLoading = true;
				let url = this.$Host + '/train'
				this.$axios.get(url)
					.then((res) => {
						that.listLoading = false
						that.tableData = []
						if (res.data.success) {
							res.data.data.forEach(item => {
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
					let url = this.$Host + '/train?id=' + row._id
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
					trainName: '',
					type: '',
					address: '',
					startTime: '',
					endTime: '',
					trainer: '',
					unit: '',
					number: '',
					content: '',
					memo: ''
				};
			},
			//编辑
			editSubmit: function() {
				let that = this
				let url = this.$Host + '/train'
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
				let url = this.$Host + '/train'
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

<style>
	#train /deep/ .el-dialog__body {
		height: 400px !important;
		overflow: auto;
	}
</style>