<template>
  <section>
    <base-dialog :show="!!error" @close="closeModal">
      <template v-slot:header>
        <h2>Something went wrong</h2>
      </template>
      <div>{{ error }}</div>
    </base-dialog>

    <base-card>
      <base-spinner v-if="isLoading"></base-spinner>

      <form v-else @submit.prevent="submitForm">
        <div :class="{ invalid: !email && !formIsValid }" class="form-control">
          <label for="email">E-Mail</label>
          <input v-model.trim="email" type="email" id="email" />
        </div>

        <div
          :class="{ invalid: !password && !formIsValid }"
          class="form-control"
        >
          <label for="password">Password</label>
          <input v-model.trim="password" type="password" id="password" />
        </div>

        <div class="actions">
          <base-button type="submit">{{ buttonName }}</base-button>
          <base-button @click="switchAuthMode" type="button" mode="flat">{{
            switchButtonName
          }}</base-button>
        </div>
      </form>
    </base-card>
  </section>
</template>

<script>
import { validateForm } from '@/utils/utils.js';
import { redirectTimeout } from '@/utils/constants.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
    };
  },
  computed: {
    buttonName() {
      return this.mode === 'login' ? 'Login' : 'Signup';
    },
    switchButtonName() {
      return this.mode === 'login' ? 'Signup instead' : 'Login instead';
    },
    error() {
      return this.$store.getters.authError;
    },
    isLoading() {
      return this.$store.getters.isAuthLoading;
    },
  },
  methods: {
    async submitForm() {
      const data = {
        email: this.email,
        password: this.password,
        type: this.mode === 'signup' ? 'signup' : 'login',
      };

      const isValid = validateForm(data);

      if (!isValid) {
        this.formIsValid = false;

        return;
      }

      const response = await this.$store.dispatch('auth', { data });

      if (response === 'OK' || response === 200) {
        this.email = '';
        this.password = '';

        setTimeout(() => this.$router.replace('/coaches'), redirectTimeout);
      }
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    closeModal() {
      this.$store.dispatch('clearAuthError');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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
  margin-top: 20px;
  text-align: end;
}
</style>
