import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import modules from './modules'
Vue.use(Vuex);

const store=new Vuex.Store({
    state:{

    },
    getters:{

    },
    mutations,
    actions,
    modules
})
export default store;