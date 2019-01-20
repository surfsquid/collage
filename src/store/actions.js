

export const actions = {
    setFriends({ commit }, friends) {
        commit('addFriend', friends);
    },
};

export default actions;
