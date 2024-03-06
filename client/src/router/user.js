import HomeView from '../views/user/HomeView.vue'
import ProductList from '../views/user/product/ProductListView.vue';
import ProductInfo from '../views/user/product/ProductInfoView.vue';
import CartView from '../views/user/product/CartView.vue'
import PaymentView from '../views/user/product/PaymentView.vue'
import loginView from '../views/user/login/loginView.vue'
import kakaoLoginView from '../views/user/login/kakaoLoginView.vue'
import userJoinView from '../views/user/login/userJoinView.vue'
import ProductReview from '../views/user/product/productReview.vue'

export default {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: 'cart',
                name: 'cart',
                component: CartView
            },
            {
                path: 'payment',
                name: 'payment',
                component: PaymentView
            },
            {
                path: 'login',
                name: 'login',
                component: loginView
            },
            {
                path: 'kakaoLogin',
                name: 'kakaoLogin',
                component: kakaoLoginView
            },
            {
                path: 'userJoin',
                name: 'userJoin',
                component: userJoinView
            },
            {
                path: 'product',
                name: 'productList',
                component: ProductList
            },
            {
                path: 'productInfo',
                name: 'productInfo',
                component: ProductInfo
            },
            {
                path: 'productReview',
                name: 'productReview',
                component: ProductReview
            }
        ]
}
