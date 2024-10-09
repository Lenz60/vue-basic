<template>
  <div class="border-2 border-green-700 p-5">
    <p>
      On the other hand the established organisation structure contributes to
      the preparing and implementation of existing financial and administrative
      conditions.
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import DashboardModal from "../Dashboard/Modal.vue";
import { useRoute } from "vue-router";
export default {
  components: { DashboardModal },
  setup(props) {
    let stateShowModal = ref(false);
    return { stateShowModal };
  },
  methods: {
    showModal() {
      console.log(this.stateShowModal);
      this.stateShowModal = !this.stateShowModal;
    },
  },
};
</script>

<style lang="scss" scoped></style>
