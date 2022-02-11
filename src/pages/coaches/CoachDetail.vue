<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="`/coaches/${id}/contact`">
            Contact
          </base-button>
        </header>

        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge
          :key="area"
          v-for="area in areas"
          :title="area"
          :type="area"
          >{{ area }}</base-badge
        >
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      rate: null,
      areas: [],
      description: '',
    };
  },
  props: ['id'],
  created() {
    this.$store.dispatch('getCoaches').then(() => {
      const { firstName, lastName, hourlyRate, areas, description } =
        this.$store.getters.coaches.find((coach) => coach.id === this.id);

      this.fullName = `${firstName} ${lastName}`;
      this.rate = hourlyRate;
      this.areas = areas;
      this.description = description;
    });
  },
};
</script>