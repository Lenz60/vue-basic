<template>
  <div class="text-center">
    <div class="items-start justify-start">
      <label class="form-control w-fit max-w-xs">
        <div class="label">
          <span class="label-text">Data size {{ pageSize }}</span>
        </div>
        <select
          class="select select-bordered"
          v-model="pageSize"
          @change="ChangeSize($event)"
        >
          <option
            v-for="(page, index) in pageSizeChoice"
            :key="index"
            :value="page"
          >
            {{ page }}
          </option>
        </select>
      </label>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th v-for="(value, key) in Datas[0]" :key="key">
            {{ toPascalCase(key) }}
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in paginatedData" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-for="(value, key) in data" :key="key">{{ value }}</td>
          <div v-if="Context === 'University'">
            <td>
              <button
                @click="editModal(data)"
                class="btn btn-warning btn-sm hover:text-neutral-content"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                @click="deleteModal(data)"
                class="btn btn-error btn-sm hover:text-neutral-content"
              >
                Delete
              </button>
            </td>
          </div>
          <div v-else>
            <td>
              <button
                @click="editModal(data)"
                class="btn btn-warning btn-sm hover:text-neutral-content"
              >
                Edit
              </button>
            </td>
          </div>
        </tr>
      </tbody>
    </table>
    <div class="w-full flex items-center justify-center">
      <div
        class="join grid grid-cols-3 w-fit p-2 text-center items-center justify-center"
      >
        <button
          class="join-item btn btn-outline w-fit rounded-md"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <span class="w-fit p-1"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          class="join-item btn btn-outline w-fit rounded-md"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
  <Modal
    v-if="toggleEditModal"
    ref="editUnivModal"
    Id="editUnivModal"
    Class="modal modal-open"
    Context="University"
    :Data="selectedData"
    ContextTitle="Edit"
    @data-added="refreshTable"
    @modalClosed="toggleEditModal = false"
  ></Modal>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import Modal from "./Modal.vue";
import axios from "axios";
export default {
  props: {
    Datas: {
      type: Object,
      required: true,
    },
    Context: {
      type: String,
      required: true,
    },
  },
  emits: ["refresh-table"],
  components: {
    Modal,
  },
  setup(props) {
    // debugger;
    const aliasedDatas = ref([]);
    const toggleEditModal = ref(false);
    const selectedData = ref([]);
    const token = localStorage.getItem("token");
    const currentPage = ref(1);
    const pageSize = ref(5);
    const pageSizeChoice = ref([2, 5, 15, 20]);
    // const filteredPageSizeChoice = ref([]);

    const totalPages = computed(() => {
      return Math.ceil(props.Datas.length / pageSize.value);
    });

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return props.Datas.slice(start, end);
    });

    // const filteredPageSizeChoice = computed(() => {
    //   return pageSizeChoice.value.filter((size) => size !== pageSize.value);
    // });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // const editModal = (data) => {
    //   selectedData.value = data;
    //   if (editUnivModal.value) {
    //     editUnivModal.value.showModal();
    //   }
    // };

    const toPascalCase = (str) => {
      return str
        .replace(/(\w)(\w*)/g, (_, firstChar, rest) => {
          return firstChar.toUpperCase() + rest.toLowerCase();
        })
        .replace(/_/g, "");
    };

    const computeAliasedDatas = () => {
      if (props.Context === "University") {
        aliasedDatas.value = props.Datas.map((data) => ({
          Id: data.id,
          Name: data.name,
        }));
      } else {
        aliasedDatas.value = props.Datas;
      }
    };

    onMounted(() => {
      computeAliasedDatas();
    });

    return {
      aliasedDatas,
      toggleEditModal,
      selectedData,
      token,
      toPascalCase,
      currentPage,
      pageSize,
      totalPages,
      paginatedData,
      nextPage,
      prevPage,
      pageSizeChoice,
      // filteredPageSizeChoice,
    };
  },
  methods: {
    editModal(data) {
      this.toggleEditModal = !this.toggleEditModal;
      this.selectedData = data;
      // console.log(this.selectedData);
      // this.selectedData.value = data;
      // if (editUnivModal.value) {
      //   editUnivModal.value.showModal();
      // }
    },
    ChangeSize(event) {
      // console.log(event);
      this.pageSize = parseInt(event.target.value);
      this.currentPage = 1;
      // console.log(this.pageSize);
    },
    async deleteModal(data) {
      try {
        const response = await axios.delete(
          "https://localhost:7117/api/University/" + data.id,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log(response);
        if (response.status == 200) {
          alert("Data has been deleted!");
          if (this.paginatedData.length > 0) {
            this.currentPage = 1;
          }
          this.$emit("refresh-table");
        }
      } catch (error) {
        console.error("Error adding data:", error);
      }
    },
    refreshTable() {
      this.$emit("refresh-table");
    },
  },
};
</script>

<style lang="scss" scoped></style>
