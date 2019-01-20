<template>
  <div class="hello">
    <h1>Collage</h1>

    <button @click="logout()">Logout</button>

    <h3>Name:</h3>
    <p>{{ fullName }}</p>

    <h3>Friends:</h3>
    <ul class="friends">
      <li 
        v-for="(friend, i) in friends" :key="i"
        class="friends__item"
      >
        {{ friend }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import guard from '../mixins/guard';


export default {
  name: 'Home',
  mixins: [guard],
  computed: {
    ...mapState({
      session: 'session',
      friends: state => state.profile.friends,
      fullName: state => state.profile.fullName,
    }),
    ...mapGetters([
      'loggedIn',
    ]),
  },
  methods: {
    ...mapActions([
      'getFriends',
      'getFullName',
      'getSession',
      'logout',
    ]),
  },
  mounted() {
    this.getSession().then(() => {
      this.getFullName();
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
