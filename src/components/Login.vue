<template>
  <div>
    <h1>{{ msg }}</h1>

    <button @click="login()">Login</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  props: {
    msg: String,
  },
  computed: {
    ...mapState({
      session: 'session',
    }),
    ...mapGetters([
      'loggedIn',
    ]),
  },
  methods: {
    ...mapActions([
      'getSession',
    ]),
    login() {
      this.$solid.login();
    },
    logout() {
      this.$solid.logout();
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getSession().then(() => {
        if (vm.loggedIn) {
          vm.$router.push({ name: 'home' });
        }
      });
    });
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
