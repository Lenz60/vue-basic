<template>
  <div class="p-5">
    <div
      class="border-2 border-green-700 grid grid-cols-2 grid-rows-2 p-2 gap-2"
    >
      <div class="p-2 border-2 border-yellow-400">
        <canvas id="degreeChart"></canvas>
      </div>
      <div class="p-2 border-2 border-blue-400"></div>
      <div class="p-2 border-2 border-yellow-400"></div>
      <div class="p-2 border-2 border-blue-400"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import DashboardModal from "../Dashboard/Modal.vue";
import { useRoute, useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
export default {
  components: { DashboardModal },
  setup(props) {
    const router = useRouter();
    const decodedToken = ref(null);
    const token = localStorage.getItem("token");

    const validateToken = async () => {
      try {
        const response = await axios.post(
          "https://localhost:7117/api/Account/Validate",
          {
            token: token,
          }
        );
        decodedToken.value = jwtDecode(token);
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            // console.log(error.response.data.errors.token[0]);
            alert(error.response.data.errors.token[0]);
          } else {
            alert(error.response.data.title);
          }
        } else {
          alert("An error occurred: " + error.message);
        }
        // console.log(error.response.data);
        router.push({ name: "Login" });
        localStorage.removeItem("token");
      }
    };

    const fetchDegreeCount = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7117/api/University/DegreeCount",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = {};
        response.data.data.forEach((item) => {
          // Adjust this line based on the actual structure
          data[item.degree] = item.count;
        });
        createChart(data);
      } catch (error) {
        console.log(error);
      }
    };

    const createChart = (data) => {
      const ctx = document.getElementById("degreeChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: "Degree Count",
              data: Object.values(data),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    onMounted(() => {
      if (!token) {
        router.push({ name: "Login" });
      } else {
        validateToken();
        fetchDegreeCount();
      }
    });
    let stateShowModal = ref(false);
    return { stateShowModal, router };
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
