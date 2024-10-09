<template>
  <div v-if="Context == 'University'">
    <dialog :Id="Id" :class="Class" ref="myModal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Input University</h3>
        <div class="my-3">
          <label class="input input-bordered flex items-center gap-2">
            Name
            <input
              v-model="name"
              type="text"
              class="grow"
              placeholder="Amikom"
            />
          </label>
        </div>
        <div class="modal-action flex flex-row">
          <form method="dialog">
            <button class="btn btn-primary btn-sm">Close</button>
          </form>
          <button @click="AddUniv()" class="btn btn-primary btn-sm">
            Save
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
  <div v-else>
    <dialog :Id="Id" :class="Class">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Not Univ!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";
import { onUpdated, ref } from "vue";

export default {
  props: ["Id", "Class", "Context"],
  setup() {
    // onUpdated(() => {
    //   console.log("Modal has been updated");
    // });
    const name = ref("");
    return { name };
  },
  methods: {
    async AddUniv() {
      try {
        const response = await axios.post(
          "https://localhost:7117/api/University",
          {
            name: this.name,
          }
        );
        console.log(response);
        if (response.status == 200) {
          alert("Data has been added!");
          this.$refs.myModal.close();
          this.$emit("data-added");
        }
      } catch (error) {
        console.error("Error adding data:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
