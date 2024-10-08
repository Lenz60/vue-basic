<template>
  <div>
    <input
      class="input input-bordered input-success w-full max-w-xs"
      type="text"
      v-model="account"
    />
    <h1>Account: {{ account }}</h1>
  </div>
</template>

<script>
import { onMounted, onUpdated, onUnmounted, ref, watch, computed } from "vue";

export default {
  setup() {
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
