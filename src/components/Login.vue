<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="login()">Login</button>
    <button @click="logout()">Logout</button>
    <div>
      {{ session.webId }}
    </div>
    </div>
</template>

<script>
import auth from 'solid-auth-client';

export default {
  name: 'Login',
  props: {
    msg: String
  },
  data() {
    return {
      loggedIn: false,
      session: {},
    };
  },
  mounted() {
    auth.trackSession(session => {
      this.loggedIn = !!session;
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
