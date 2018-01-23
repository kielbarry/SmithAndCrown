import Vue from 'vue';
import Router from 'vue-router';
import CryptoCards from '@/components/CryptoCards';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CryptoCards',
      component: CryptoCards,
    },
  ],
});
