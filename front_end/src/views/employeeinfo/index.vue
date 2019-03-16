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
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<!-- <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex">
							</el-table-column> -->
			<el-table-column prop="orderNumber" label="总订单" width="100">
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="120">
			</el-table-column>
			<el-table-column prop="salary" label="月薪" width="150">
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100">
			</el-table-column>
			<el-table-column prop="address" label="家庭地址" min-width="180">
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
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item> -->
				<el-form-item label="年龄" prop="age">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="手机号"  prop="phone">
					<el-input type="text" v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="月薪"  prop="salary">
					<el-input type="text" v-model="editForm.salary"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input type="textarea" v-model="editForm.address"></el-input>
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
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item> -->
				<el-form-item label="年龄" prop="age">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="手机号"  prop="phone">
					<el-input type="text" v-model="addForm.phone"></el-input>
				</el-form-item>
					<el-form-item label="月薪"  prop="salary">
					<el-input type="text" v-model="addForm.salary"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input type="textarea" v-model="addForm.address"></el-input>
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
				editFormVisible: false, //编辑界面是否显示
				editFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}]
				},
				//编辑界面数据
				editForm: {
					name: '',
					phone: '',
					age: 0,
					address: '',
					salary: '',
					memo: ''
				},
				addFormVisible: false, //新增界面是否显示
				addFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}]
				},
				//新增界面数据
				addForm: {
					name: '',
					age: 0,
					phone: '',
					address: '',
					salary: '',
					memo: ''
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
			},
			//获取员工列表
			queryGroup() {
				let that = this
				let url = this.$Host + '/employee'
				this.$axios.get(url)
					.then((res) => {
						that.tableData = []
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
				let that = this
				let url = this.$Host + '/employee?id=' + row._id
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					that.$axios.delete(url).then((res) => {
						this.listLoading = false;
						//NProgress.done();
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
					phone: "",
					age: 0,
					role: 2,
					memo: '',
					address: '',
					salary: ''
				};
			},
			//编辑
			editSubmit: function() {
				let that = this
				let url = this.$Host + '/employee'
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
				let url = this.$Host + '/employee'
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
										that.$message.warning(res.data.errMsg)
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

<style scoped>

</style>