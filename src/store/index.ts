import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';


Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});

if (module.hot) {
    module.hot.accept([
        './getters',
        './actions',
        './mutations',
    ], () => {
        store.hotUpdate({
            getters: require('./getters'), // eslint-disable-line
            actions: require('./actions'), // eslint-disable-line
            mutations: require('./mutations'), // eslint-disable-line
        });
    });
}

export default store;
