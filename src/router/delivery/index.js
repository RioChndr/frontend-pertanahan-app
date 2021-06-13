const DeliveryLayout = () => import(/* webpackChunkName: "delivery" */ '@/pages/Delivery/DeliveryLayout.vue');
const DeliveryList = () => import(/* webpackChunkName: "delivery" */ '@/pages/Delivery/DeliveryList.vue');
const DeliveryForm = () => import(/* webpackChunkName: "delivery" */ '@/pages/Delivery/DeliveryCreate.vue');
const DeliveryDetail = () => import(/* webpackChunkName: "delivery" */ '@/pages/Delivery/DeliveryDetail.vue');

export default [
  {
    path: 'delivery',
    name: 'delivery',
    component: DeliveryLayout,
    children: [
      {
        path: '/',
        name: 'delivery.list',
        component: DeliveryList
      },
      {
        path: 'send/:document_id',
        name: 'delivery.send',
        component: DeliveryForm
      },
      {
        path: 'detail/:id',
        name: 'delivery.detail',
        component: DeliveryDetail
      }
    ]
  }
];