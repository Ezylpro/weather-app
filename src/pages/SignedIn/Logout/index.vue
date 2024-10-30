<template>
  Logging you out
</template>
<script lang="ts">
import {defineComponent} from "vue";
import store from "@src/includes/store.ts";

export default defineComponent({
  name: "Logout",
  mounted() {
    this.logout();
  },
  methods: {
    async logout() {
      store.commit('logout', null);
      this.$router.replace("/login");
    }
  }
})
</script>