<template>
  <div class="hello">
    <h1>Collage</h1>

    <button @click="logout()">Logout</button>

    <h3>Friends:</h3>
    <ul
      v-for="(friend, i) in friends" :key="i"
      class="friends">
      <li class="friends__item">{{ friend }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';


export default {
  name: 'Home',
  computed: {
    ...mapState({
      session: 'session',
      friends: 'profile.friends',
      fullName: 'profile.fullName',
    }),
    ...mapGetters([
      'loggedIn',
    ]),
  },
  methods: {
    ...mapActions([
      'getFriends',
      'getSession',
      'logout',
    ]),
  },
  mounted() {
    this.getSession().then(() => {
      if (!this.loggedIn) {
        this.$router.push({ name: 'login' });
        return;
      }

      this.getFriends();
    });
  },
}
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
