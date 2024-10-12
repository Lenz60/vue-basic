<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <input
      class="input input-bordered input-success w-full max-w-xs"
      type="text"
      v-model="account"
    />
    <h1>Account: {{ account }}</h1>
    <h1>Account: {{ accountName }}</h1>
    <h1>Account: {{ preAccountName }}</h1>
  </div>
</template>

<script>
import { onMounted, onUpdated, onUnmounted, ref, watch, computed } from "vue";

export default {
  setup() {
    console.log("this is setup");
    const preAccountName = ref("John Doe");
    const account = ref("");
    watch(account, (newValue, oldValue) => {
      console.log(`Account changed from ${oldValue} to ${newValue}`);
    });
    const accountName = computed(() => {
      return preAccountName.value.toUpperCase();
    });
    onMounted(() => {
      console.log("Component has been mounted");
    });
    onUpdated(() => {
      console.log("Component has been updated");
    });
    onUnmounted(() => {
      console.log("Component has been unmounted");
    });

    return {
      account,
      accountName,
      preAccountName,
    };
  },
};
</script>

<style lang="scss" scoped></style>
