import Router from 'vue-router';


export interface IPage {
    getSession: Function,
    loggedIn: boolean,
    $router: Router,
}

export default IPage;
