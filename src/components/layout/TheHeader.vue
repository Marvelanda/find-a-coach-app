<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a coach</router-link></h1>

      <ul v-if='!isLoading'>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if='isAuth'><router-link to="/requests">Requests</router-link></li>
        <li v-if="!isCoach && isAuth">
          <router-link to="/register">Register as a coach</router-link>
        </li>
        <li v-if='!isAuth'><router-link to="/auth">Login</router-link></li>
        <li v-else @click='logout'><base-button>Logout</base-button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isCoach() {
      return this.$store.getters.isCoach;
    },
    isLoading() {
      return this.$store.getters.coachListIsLoading || this.$store.getters.isAuthLoading;
    },
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #003b46;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #c4dfe6;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #c4dfe6;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
