<template>
    <div id="customer">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>订单预约</span>
                <el-button style="float: right; padding: 3px 0" type="text"></el-button>
            </div>
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="项目名称">
                        <el-input v-model="form.item"></el-input>
                    </el-form-item>
                    <el-form-item label="服务地点">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="服务时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="服务人员">
                        <el-select v-model="form.name" placeholder="请选择服务人员" @change="handleSelect">
                            <el-option :label="item.name" :value="item" v-for="item in serverList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    name:'test2',
                    phone:'18851140111'
                },
                serverList: []
            }
        },
        created: function() {
            this.queryGroup()
        },
        methods: {
            handleSelect(value){
                this.form.name = value.name
                this.form.phone = value.phone
            },
            queryGroup() {
                let that = this
                that.orderList = []
                let url = this.$Host + '/user'
                this.listLoading = true;
                that.$axios.get(url)
                    .then((res) => {
                        if (res.data.success) {
                            res.data.data.forEach(item=>{
                                let obj = {
                                    name:item.name,
                                    phone:item.phone
                                }
                                that.serverList.push(obj)
                            })
                        }
                    })
                    .catch(err => {
                        console.error(err)
                    });
            },
            onSubmit: function() {
                let that = this
                let url = this.$Host + '/order'
                this.$confirm('确认创建订单吗?', '提示', {
                    type: 'warning'
                }).then((action) => {
                    this.listLoading = true;
                    if (action == 'confirm') {
                        let data = that.form
                        that.$axios.post(url, data)
                            .then((res) => {
                                if (res.data.success) {
                                    that.$message.info('订单创建成功!')
                                }
                            })
                            .catch(err => {
                                console.error(err)
                            });
                    }
                }).catch((err) => {
                    console.error(err)
                });
            },
            cancel: function() {
                this.form = {}
            }
        }
    }
</script>
<style>
    #customer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .box-card {
        width: 480px;
    }
</style>
