<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <input
        @change="changeFilter"
        type="checkbox"
        id="frontend"
        :checked="frontendFilter"
      />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input
        @change="changeFilter"
        type="checkbox"
        id="backend"
        :checked="backendFilter"
      />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input
        @change="changeFilter"
        type="checkbox"
        id="career"
        :checked="careerFilter"
      />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  computed: {
    filters() {
      return this.$store.getters.filters;
    },
    frontendFilter() {
      return this.filters.includes('frontend');
    },
    backendFilter() {
      return this.filters.includes('backend');
    },
    careerFilter() {
      return this.filters.includes('career');
    },
  },
  methods: {
    changeFilter(event) {
      this.$store.dispatch('changeFilters', { type: event.target.id });
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
