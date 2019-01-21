import { default as Vue, VueConstructor, PluginObject } from 'vue';
import auth from 'solid-auth-client';
import $rdf from 'rdflib';
import ISession from '../ISession';


const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const store = $rdf.graph();

export class Solid implements PluginObject<Solid> {
    fetcher = new $rdf.Fetcher(store);
    session = null;

    // Installable as a Vue plugin, exposing an 
    // instance to all vue components' scope.
    install(Vue: VueConstructor) {
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
            auth.currentSession().then((session: any) => {
                this.session = session;
                resolve(session);
            });
        });
    }

    getFullName() {
        return new Promise((resolve) => {
            if (!this.session) {
                resolve('');
            } else {
                const session = this.session || <ISession>{};
                const person = session.webId;

                return this.fetcher.load(person).then(() => {
                    this.fetcher.load(person).then(() => {
                        const fullName = store.any($rdf.sym(person), FOAF('name'));
                        resolve(fullName.value);
                    });
                });
            }
        });
    }

    // @TODO(Daniel Stuessy) Desperately need async await support to clean this mess up.
    getFriends() {
        return new Promise((resolve) => {
            if (!this.session) {
                resolve([]);
            } else {
                const session = this.session || <ISession>{};
                const person = session.webId;

                this.fetcher.load(person).then(() => {
                    const friend = store.any($rdf.sym(person), FOAF('knows'));

                    if (!Array.isArray(friend)) {
                        this.fetcher.load(friend).then(() => {
                            const fullName = store.any(friend, FOAF('name'));
                            this.fetcher.load(person).then(() => {
                                resolve([ fullName.value ]);
                            });
                        });
                    } else {
                        const names = new Array<string>();

                        friend.forEach((f) => {
                            return this.fetcher.load(f).then(() => {
                                const fullName = store.any(f, FOAF('name'));
                                names.push(fullName.value);
                            });
                        });

                        resolve(names);
                    }
                });
            }
        });
    }
}

export default Solid;
