<template>
  <div>
    <h1>{{ msg }}</h1>

    <button @click="login()">Login</button>
    <button @click="logout()">Logout</button>
    <button @click="loadProfile()">View</button>

    <div v-if="name">{{ name }}</div>
    <div v-else>No Name</div>

    <div>
      {{ session.webId }}
    </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import auth from 'solid-auth-client';
import $rdf from 'rdflib';


const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

export default {
  name: 'Login',
  props: {
    msg: String
  },
  data() {
    return {
      loggedIn: false,
      name: '',
      session: {},
    };
  },
  mounted() {
    auth.trackSession(session => {
      this.loggedIn = !!session;
      
      // if (!this.loggedIn) {
      //   this.$router.push('home');
      //   return;
      // }

      this.session = session || {};
    });
  },
  methods: {
    login() {
      const idp = 'https://inrupt.net/';
      auth.login(idp);
    },
    logout() {
      auth.logout();
    },
    async loadProfile() {
      // Set up a local data store and associated data fetcher
      const store = $rdf.graph();
      const fetcher = new $rdf.Fetcher(store);

      // Load the person's data into the store
      const person = this.session.webId;
      await fetcher.load(person);

      // Display their details
      const fullName = store.any($rdf.sym(person), FOAF('name'));
      const friends = store.any($rdf.sym(person), FOAF('knows'));

      this.name = fullName.value;
      debugger;
      this.setFriends(friends);
    },
    ...mapActions(['setFriends']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
