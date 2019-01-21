

export const mutations = {
    session(state, session) {
        state.session = session;
    },
    fullName(state, fullName) {
        state.profile.fullName = fullName;
    },
    addFriend(state, friend) {
        state.profile.friends.push(friend);
    },
    clearFriends(state) {
        state.profile.friends = [];
    },
};

export default mutations;
