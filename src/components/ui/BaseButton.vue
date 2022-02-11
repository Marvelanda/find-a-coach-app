<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>

  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
    mode: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #07575B;
  border: 1px solid #07575B;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #003B46;
  border-color: #003B46;
}

.flat {
  background-color: transparent;
  color: #07575B;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #003B46;
  color: #003B46;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #C4DFE6;
}
</style>
