import Vue from "vue";
import EmbedShop from './EmbedShop.vue';
import store from "@/store";
import { Actions } from '@/storemutations';
import * as Filters from "@/filters/Filters";
import * as Features from "@/api/FeaturesProvider";
import defaultRouter from './defaultRouter';
import { configureApiRoute } from './subpageutils';

interface IData {
}

Vue.use(Filters);
Vue.use(Features);

new Vue({
    store,
    router: defaultRouter,
    render: h => h(EmbedShop),
    data(): IData {
        return {
        };
    },
    created() {
        this.$store.dispatch(Actions.Init);

        Features.init();

        configureApiRoute(this.$store.dispatch)(this.$route);
    },
    methods: {
    }
}).$mount('#app');
