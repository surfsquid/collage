<template>
  <div class="hello">
    <div class="picture-card">
      <div class="picture-card-picture">
        <img >
      </div>
      <div class="picture-card-caption">
      </div>
    </div>
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
