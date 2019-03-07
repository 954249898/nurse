import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Work from './views/systemadmin/work.vue'
import Incentive from './views/systemadmin/incentive.vue'
import Train from './views/systemadmin/train.vue'
import Order from './views/order/index.vue'
import Empployee from './views/employeeinfo/index.vue'
import Notification from './views/notification/index.vue'
import Statistics from './views/statistics/index.vue'
import Customer from './views/Customer.vue'

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
        path: '/error',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/customer',
        component: Customer,
        role: 3,
        name: '',
        hidden: true
    },
    
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        role: 1,
        children: [
            { path: '/order', component: Order, name: '订单管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        role: 1,
        children: [
            { path: '/nursing/info', component: Empployee, name: '护工信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        role: 1,
        children: [
            { path: '/notification', component: Notification, name: '公告通知' },
        ]
    },

    {
        path: '/admin/',
        role: 1,
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/admin/page4', component: Incentive, name: '奖惩管理' },
            { path: '/admin/work', component: Work, name: '排班管理' },
            { path: '/admin/train', component: Train, name: '培训管理' }
        ]
    },
    {
        path: '/information/',
        role: 1,
        component: Home,
        name: '信息统计',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/information/statistics', component: Statistics, name: '护工信息', role: 1 }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;