<template>
  <div>
    <coach-filter></coach-filter>

    <base-dialog :show="!!error" @close="closeModal">
      <template v-slot:header>
        <h2>Something went wrong</h2>
      </template>
      <div>{{ error }}</div>
    </base-dialog>

    <base-spinner v-if="isLoading"></base-spinner>

    <section v-else>
      <ul v-if="hasCoaches">
        <coach-item
          :key="id"
          v-for="{
            id,
            firstName,
            lastName,
            hourlyRate,
            areas,
          } in filteredCoaches"
          :first-name="firstName"
          :last-name="lastName"
          :rate="hourlyRate"
          :areas="areas"
          :id="id"
        ></coach-item>
      </ul>

      <base-card v-else>
        <div>No coaches found</div>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem';
import CoachFilter from '@/components/coaches/CoachFilter';

export default {
  components: { CoachItem, CoachFilter },
  computed: {
    filteredCoaches() {
      return this.$store.getters.coaches.filter(({ areas }) => {
        return this.$store.getters.filters.some((filter) =>
          areas.includes(filter)
        );
      });
    },
    hasCoaches() {
      return this.$store.getters.hasCoaches;
    },
    isLoading() {
      return this.$store.getters.coachListIsLoading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  mounted() {
    this.$store.dispatch('getCoaches');
  },
  methods: {
    closeModal() {
      this.$store.dispatch('clearError');
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
