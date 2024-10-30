<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-xl font-bold text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">

      <template v-if="error !== ''">
        <error-toast :error="error"/>
      </template>

      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input
              id="email"
              type="text"
              v-model="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
          >
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input
              id="password"
              type="password"
              v-model="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
          >
        </div>
      </div>

      <div>
        <button
            @click="login"
            :disabled="isDisabled"
            :class="[
                  'flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm',
                  { 'cursor-not-allowed opacity-50': isDisabled || loading },
                  { 'hover:bg-blue-500': !isDisabled && !loading },
              ]"
        >
          {{ loading ? 'Loading...' : 'Sign In' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import api from "@src/api";
import {mapGetters} from "vuex";
import store from "@src/includes/store.ts";
import ErrorToast from "@components/ErrorToast.vue";

type loginResponseType = {
  token?: string,
  error?: string
}

export default defineComponent({
  name: "Login",
  components: {ErrorToast},
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      error: ""
    }
  },
  computed: {
    ...mapGetters(["accessToken"]),
    isDisabled() {
      return this.email === "" || this.password === "";
    }
  },
  methods: {
    async login() {
      this.loading = true;

      // We could add the requests on the store as well
      const response = await api.login(this.email, this.password) as loginResponseType;

      if (response.error) {
        this.loading = false;
        this.handleError(response.error);
        return;
      }

      store.commit('setAccessToken', response.token);
      this.$router.push("/");

      this.loading = false;
    },
    handleError(error: string) {
      this.error = error;
    }
  },
  beforeMount() {
    if (this.accessToken) {
      this.$router.push("/");
    }
  }
})
</script>