import auth from 'solid-auth-client';
import $rdf from 'rdflib';


const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const store = $rdf.graph();

export class Solid {
    fetcher = new $rdf.Fetcher(store);

    // Installable as a Vue plugin, exposing an 
    // instance to all vue components' scope.
    static install(Vue) {
        Vue.prototype.$solid = new Solid();
    }

    login() {
        const idp = 'https://inrupt.net/';
        auth.login(idp);
    }

    logout() {
        auth.logout();
    }

    getSession() {
        return new Promise((resolve) => {
            auth.currentSession().then((session) => {
                resolve(session);
            });
        });
    }

    getFullName() {
        if (!this.session) {
            return '';
        } else {
            const person = this.session.webId;

            return this.fetcher.load(person).then(() => {
                return store.any($rdf.sym(person), FOAF('name'));
            });
        }
    }

    getFriends() {
        return new Promise((resolve) => {
            if (!this.session) {
                resolve([]);
            } else {
                const person = this.session.webId;

                this.fetcher.load(person).then(() => {
                    const friends = store.any($rdf.sym(person), FOAF('knows'));
                    resolve(friends);
                });
            }
        });
    }
}

export default Solid;
