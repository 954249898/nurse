<template>
    <div id="customer">
        <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align:center;">
                <span>我的订单</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="logout">退出登录</el-button>
            </div>
            <div>
                <el-table :data="orderList" style="width: 100%">
                    <el-table-column prop="time" label="时间" width="150">
                    </el-table-column>
                    <el-table-column prop="customerNm" label="客户姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="item" label="项目">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                orderList: []
            }
        },
        created: function() {
            let user = JSON.parse(sessionStorage.getItem('USER-INFO'))
            this.queryGroup(user.name)
        },
        methods: {
            logout() {
                sessionStorage.removeItem('USER-INFO')
                this.$router.push('/login')
            },
            queryGroup(name) {
                let that = this
                that.orderList = []
                let url = this.$Host + '/order?name=' + name
                this.listLoading = true;
                that.$axios.get(url)
                    .then((res) => {
                        if (res.data.success) {
                            res.data.data.forEach(item => {
                                item.time = this.$moment(item.time).format('MM-DD HH:mm:ss')
                                that.orderList.push(item)
                            })
                        }
                    })
                    .catch(err => {
                        console.error(err)
                    });
            },
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
        width: 800px;
    }
</style>
