import { default as Vue, VueConstructor } from 'vue';
import { IPage } from '../IPage';


export default Vue.mixin(<VueConstructor>{
    beforeRouteEnter(to: Function, from: any, next: Function): void {
        next((vm: IPage) => {
            vm.getSession().then(() => {
                if (!vm.loggedIn) {
                    vm.$router.push({ name: 'login' });
                }
            });
        });
    },
});
