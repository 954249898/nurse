import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/index',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        role:1,
        children: [
            { path: '/page6', component: Page6, name: '发送订单' }
        ]
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        role:1,
        component: Home,
        name: '护工信息',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },

    {
        path: '/',
        role:1,
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '奖惩管理' },
            { path: '/page5', component: Page5, name: '排班管理' },
            { path: '/page5', component: Page5, name: '培训管理' }
        ]
    },
    {
        path: '/',
        role:1,
        component: Home,
        name: '信息统计',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/statistics', component: echarts, name: '护工信息统计',role:1 }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;