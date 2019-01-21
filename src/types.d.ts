import { Solid } from './services/Solid';
import Router from 'vue-router';


declare module 'vue/types/vue' {
    // Global properties can be declared
    // on the `VueConstructor` interface
    interface VueConstructor {
        $router: Router,
        $solid: Solid,
        beforeRouteEnter(to: Function, from: any, next: Function): void; 
    }
    interface Vue {
        prototype: {
            $solid: Solid,
        };
    }
}
