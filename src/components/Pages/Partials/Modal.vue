<template>
  <div v-if="Context == 'University'">
    <dialog :Id="Id" :class="classProps" ref="myModal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ ContextTitle }} {{ Context }}</h3>
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
            <button
              @click="closeModal()"
              class="btn btn-secondary hover:text-neutral-content btn-sm"
            >
              Close
            </button>
          </form>
          <div v-if="ContextTitle == 'Edit'">
            <button
              @click="EditUniv()"
              class="btn btn-warning btn-sm hover:text-neutral-content"
            >
              Edit
            </button>
          </div>
          <div v-else>
            <button
              @click="AddUniv()"
              class="btn btn-primary hover:text-neutral-content btn-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="closeModal()">close</button>
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
            <button class="btn btn-secondary">Close</button>
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
  props: {
    Id: {
      type: String,
      required: true,
    },
    Class: {
      type: String,
      required: true,
    },
    Context: {
      type: String,
      required: true,
    },
    ContextTitle: {
      type: String,
      required: true,
    },
    Data: {
      type: Object,
      required: false,
    },
  },
  emits: ["data-added", "modalClosed"],
  setup(props) {
    // console.log(props.Data.name);

    // onUpdated(() => {
    //   console.log("Modal has been updated");
    // });
    const classProps = ref(props.Class);
    const name = ref("");
    const token = localStorage.getItem("token");
    if (props.Context === "University") {
      if (props.Data && props.Data.name) {
        name.value = props.Data.name;
        // console.log(props.Data.name);
      } else {
        // console.log("Data or Data.name is undefined");
      }
    }
    return { name, classProps, token };
  },
  methods: {
    closeModal() {
      this.classProps = "modal";
      this.name = "";
      this.$emit("modalClosed");
      // this.$refs.myModal.close();
    },
    async AddUniv() {
      console.log(this.token);
      try {
        const response = await axios.post(
          "https://localhost:7117/api/University",
          {
            name: this.name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log(response);
        if (response.status == 200) {
          alert("Data has been added!");
          this.closeModal();
          this.$emit("data-added");
        }
      } catch (error) {
        console.error("Error adding data:", error);
      }
    },
    async EditUniv() {
      try {
        const response = await axios.put(
          `https://localhost:7117/api/University/`,
          {
            id: this.Data.id,
            name: this.name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log(response);
        if (response.status == 200) {
          alert("Data has been updated!");
          this.closeModal();
          this.$emit("data-added");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
