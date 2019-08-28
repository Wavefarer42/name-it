import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Sortable from "sortablejs";
Vue.config.productionTip = false;

Vue.directive("sortable-list", {
    bind(el, binding, vnode) {
        const options = {
            handle: ".sortHandle",
            animation: 150,
            onUpdate: function (event) {
                vnode.child.$emit("sorted", event);
            },
        };
        Sortable.create(el, options);
    },
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
