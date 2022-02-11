<template>
  <form @submit.prevent="submitForm">
    <div :class="{ invalid: !email && !formIsValid }" class="form-control">
      <label for="email">Your e-mail</label>

      <input v-model="email" type="email" id="email" />
    </div>

    <div :class="{ invalid: !message && !formIsValid }" class="form-control">
      <label for="message">Message</label>

      <textarea v-model="message" id="message" rows="5"></textarea>
    </div>

    <div class="actions">
      <base-button>Send message</base-button>
    </div>
  </form>
</template>

<script>
import { validateForm } from '@/utils/utils.js';

export default {
  props: ['id'],
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      const request = {
        coachId: this.id,
        email: this.email,
        message: this.message,
      };

      const isValid = validateForm(request);

      if (!isValid) {
        this.formIsValid = false;

        return;
      }

      this.$store.dispatch('requests/addRequest', { request })
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #003b46;
  background-color: rgba(196, 223, 230, 0.1);
  outline: none;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.actions {
  text-align: center;
}
</style>
