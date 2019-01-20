

export default {
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.getSession().then(() => {
                if (!vm.loggedIn) {
                    vm.$router.push({ name: 'login' });
                }
            });
        });
    },
};
