<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ffffff;
  color: #252525;
  border-radius: 30px;
  padding: 0.3rem 1.3rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #003B46;
  color: white;
}

.backend {
  background-color: #07575B;
  color: white;
}

.career {
  background-color: #66A5AD;
  color: white;
}
</style>
