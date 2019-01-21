import Solid from '../services/Solid';


const solid = new Solid();

export const actions = {
    logout({ commit }) {
        solid.logout();
        commit('session', null);
        window.location.reload();
    },
    getSession({ commit, state }) {
        return new Promise((resolve) => {
            solid.getSession().then((session) => {
                commit('session', session);
                resolve(state.session);
            });
        });
    },
    getFullName({ commit }) {
        solid.getFullName().then((fullName) => {
            commit('fullName', fullName);
        });
    },
    getFriends({ commit, state }) {
        return new Promise((resolve) => {
            solid.getFriends().then((friends) => {
                commit('clearFriends');

                for (const friend of friends) {
                    commit('addFriend', friend);
                }

                resolve(state.friends);
            });
        });
    },
};

export default actions;
