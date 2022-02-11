<template>
  <li>
    <base-card>
      <h3>{{ fullName }}</h3>
      <h4>${{ rate }}/hour</h4>
      <div>
        <base-badge :key="area" v-for="area in areas" :title='area' :type='area'>{{ area }}</base-badge>
      </div>
      <div class="actions">
        <base-button :to="`/coaches/${id}`" link mode='outline'>Go to details</base-button>
        <base-button :to="`/coaches/${id}/contact`" link>Contact</base-button>
      </div>
    </base-card>
  </li>
</template>

<script>
export default {
  props: ['firstName', 'lastName', 'rate', 'areas', 'id'],
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.badges {
  display: flex;
}
</style>
