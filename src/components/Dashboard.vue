<template>
  <div>
    <!-- <h1>Hello {{ email }}</h1> -->
    <p>
      On the other hand the established organisation structure contributes to
      the preparing and implementation of existing financial and administrative
      conditions.
    </p>
    <!-- <h1 class="text-lg text-black p-5"> -->
    <!-- Variable
      <p>
        {{ Mydata }}
      </p> -->
    <!-- ? Slot -->
    <!-- <div class="border-2 border-yellow-300">
        <slot></slot>
      </div> -->
    <!-- ? Onclick  -->
    <!-- <div class="border-2 border-blue-600">
        <button
          class="p-5 btn btn-outline"
          :class="
            stateShowModal
              ? 'loading loading-spinner text-error'
              : 'btn-primary'
          "
          @click="showModal()"
        >
          Click
        </button> -->

    <!-- ? Vif -->
    <!-- <div v-if="stateShowModal">
          <DashboardModal></DashboardModal>
        </div>
        <div v-else>
          <p>There are no modals</p>
        </div> -->

    <!-- ? Table -->

    <!-- <div class="w-full text-center items-center">
          <table class="table border-2">
            <thead>
              <tr>
                <th class="border-2 border-black">No</th>
                <th class="border-2 border-black">Months</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover" v-for="(month, index) in months" :key="index">
                <td class="border-2 border-black">
                  {{ index + 1 }}
                </td>
                <td class="border-2 border-black">{{ month }}</td>
              </tr>
            </tbody>
          </table> -->

    <!-- ? Props Table  -->
    <!-- <div class="flex flex-col" v-if="Role == 'Admin'"> -->
    <!-- <p>{{ Hari }}</p> -->
    <!-- ?Table Binding -->
    <!-- <table class="table border-2">
              <thead>
                <tr>
                  <th class="border-2 border-black">No</th>
                  <th class="border-2 border-black">Months</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(hari, index) in Hari" :key="index">
                  <td class="border-2 border-black">
                    {{ index + 1 }}
                  </td>
                  <td class="border-2 border-black">{{ hari }}</td>
                </tr>
              </tbody>
            </table> -->
    <!-- <p>{{ Text }}</p> -->
    <!-- ? Class Binding -->
    <!-- <p :class="'text-' + Color">This text is blue</p>
            <p>{{ HariPayload }}</p> -->
    <!-- </div>
          <div v-else>
            <p>Employee</p>
          </div> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </h1> -->
  </div>
</template>

<script>
import { ref } from "vue";
import DashboardModal from "./Dashboard/Modal.vue";
import { useRoute } from "vue-router";
export default {
  props: ["Hari", "Text", "Color", "Role", "email"],
  // props: {
  //   email: {
  //     type: String,
  //     required: false, // Since it's from query params, make it optional
  //   },
  // },
  components: { DashboardModal },
  setup(props) {
    const Mydata = "Hello world";
    const route = useRoute();
    // const email = ref(route.params.email);
    // console.log(props.email);
    // const HariPayload = props.Hari.splice(0, 1);
    let stateShowModal = ref(false);
    const months = ["January", "February", "March", "April", "Mei"];
    return { Mydata, stateShowModal, months };
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
