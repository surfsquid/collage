<template>
  <div class="hello">
    <h1>Collage</h1>

    <h3>Friends:</h3>
    <ul
      v-for="(friend, i) in friends" :key="i"
      class="friends">
      <li class="friends__item">{{ friend }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import auth from 'solid-auth-client';


export default {
  name: 'Home',
  data() {
    return {
      fullName: '',
      friends: [],
      session: {},
    };
  },
  computed: mapState({
    friends: 'friends',
  }),
  mounted() {
    auth.trackSession(session => {
      this.loggedIn = !!session;
      
      // if (!this.loggedIn) {
      //   this.$router.push('home');
      //   return;
      // }

      this.session = session || {};

      const store = $rdf.graph();
      const fetcher = new $rdf.Fetcher(store);

      // Load the person's data into the store
      const person = this.session.webId;
      fetcher.load(person).then(() => {
        // Display their details
        this.fullName = store.any($rdf.sym(person), FOAF('name'));
        this.friends = store.any($rdf.sym(person), FOAF('knows'));
      });
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
