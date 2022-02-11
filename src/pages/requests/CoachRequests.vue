<template>
  <section>
    <base-dialog :show="!!error" @close="closeModal">
      <template v-slot:header>
        <h2>Something went wrong</h2>
      </template>
      <div>{{ error }}</div>
    </base-dialog>

    <base-card>
      <header>
        <h2>Requests</h2>
      </header>

      <base-spinner v-if="isLoading"></base-spinner>

      <ul v-else-if="!!currentCoachRequests.length">
        <request-item
          :key="id"
          v-for="{ id, message, email } in currentCoachRequests"
          :message="message"
          :email="email"
        >
        </request-item>
      </ul>

      <h3 v-else>You haven't received any requests yet</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem';
export default {
  components: { RequestItem },
  computed: {
    currentCoachRequests() {
      return this.$store.getters['requests/requests']
    },
    isLoading() {
      return this.$store.getters['requests/isLoading']
    },
    error() {
      return this.$store.getters['requests/error'];
    },
  },
  mounted() {
    this.$store.dispatch('requests/getRequests');
    this.$store.dispatch('getCoaches');
  },
  methods: {
    closeModal() {
      this.$store.dispatch('requests/clearError');
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
