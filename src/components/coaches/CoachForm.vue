<template>
  <form @submit.prevent="submitForm">
    <div :class="{ invalid: !firstName && !formIsValid }" class="form-control">
      <label for="firstName">First name</label>
      <input type="text" id="firstName" v-model.trim="firstName" />
    </div>

    <div :class="{ invalid: !lastName && !formIsValid }" class="form-control">
      <label for="lastName">Last name</label>
      <input type="text" id="lastName" v-model.trim="lastName" />
    </div>

    <div
      :class="{ invalid: !description && !formIsValid }"
      class="form-control"
    >
      <label for="descr">Description</label>
      <textarea rows="5" id="descr" v-model.trim="description" />
    </div>

    <div :class="{ invalid: (!rate || rate <= 0) && !formIsValid }" class="form-control">
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate" v-model.number="rate" />
    </div>

    <div
      :class="{ invalid: !areas.length && !formIsValid }"
      class="form-control"
    >
      <h3>Areas of Expertise</h3>

      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas" />
        <label for="frontend">Frontend Development</label>
      </div>

      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas" />
        <label for="backend">Backend Development</label>
      </div>

      <div>
        <input type="checkbox" id="career" value="career" v-model="areas" />
        <label for="career">Career Advisory</label>
      </div>
    </div>

    <base-button>Register</base-button>
  </form>
</template>

<script>
import { validateForm } from '@/utils/utils.js';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      rate: null,
      areas: [],
      formIsValid: true,
    };
  },
  methods: {
    // validateForm(data) {
    //   let isValid = true;
    //
    //   Object.keys(data).forEach((key) => {
    //     if (Array.isArray(data[key]) && isValid) {
    //       if (!data[key].length) {
    //         isValid = false;
    //       }
    //     } else if (!data[key] && isValid) {
    //       isValid = false;
    //     }
    //   });
    //
    //   return isValid;
    // },
    submitForm() {
      const coach = {
        firstName: this.firstName,
        lastName: this.lastName,
        description: this.description,
        hourlyRate: this.rate,
        areas: this.areas,
      };

      const isValid = validateForm(coach);

      if (isValid) {
        this.$store.dispatch('saveCoach', { coach });
        this.$router.replace('/coaches');
      } else {
        this.formIsValid = false;
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: rgba(196, 223, 230, 0.1);
  outline: none;
  border-color: #003b46;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #003b46 solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
