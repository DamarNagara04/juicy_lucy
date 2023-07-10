/* eslint-disable no-unused-vars */
// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

import firebaseConfig from "../firebaseConfig";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

firebaseConfig;

const providerGithub = new GithubAuthProvider();

const auth = getAuth();

const baseUrl = "http://localhost:3000";

// const baseUrl = "https://zaroo-server.damarnagara.site";

export const useFruitStore = defineStore("product", {
  state: () => ({
    fruitData: [],
    fruitDetail: [],
    orderData: [],
    orderDataAll: [],
    transactionData: [],
    quantity: 100,
    totalPrice: 20000,
    currentPage: "home",
    isLogged: false,

    currentTransactionId: 0,
    page: 1,
    totalPage: 1,
  }),
  actions: {
    pageNow(val) {
      this.currentPage = val;
    },

    async changePage(val) {
      // console.log(val, "di pinia >>>>>>>>>..");
      try {
        this.page = val;
        await this.fetchFruit();
      } catch (err) {
        //   console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },

    async register(data) {
      try {
        this.createTransaction();
        //   console.log(data, "di pinia >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        const response = await axios.post(`${baseUrl}/register`, data);
        //   console.log(response, ">>>>>>register>>>>>>>>>");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "New Accout Created Successfuly",
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },

    async login(data) {
      try {
        //   console.log(data, ">>>>>>>>>>login>>>>>>>>>..");
        const response = await axios.post(`${baseUrl}/login`, data);

        //   console.log(response);

        localStorage.setItem("access_token", response.data.access_token);

        //   this.$router.push({ path: "/" });

        this.isLogged = true;

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Logged Successfuly",
        });
      } catch (err) {
        console.error(err.response);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response,
        });
      }
    },

    async fetchFruit() {
      try {
        const { data } = await axios.get(`${baseUrl}/fruit/?page=${this.page}`);

        this.fruitData = data.fruitData.rows;
        this.totalPage = data.pageTotal;

        //   console.log(data, ">>>>>>>>>>>>>>>>>>>>");
        //   console.log(this.fruitData);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },

    async createOrderMethods(fruitId) {
      try {
        console.log(fruitId, "di pinia");

        const { data } = await axios.post(`${baseUrl}/order/${fruitId}`, null, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.router.push({ path: "/order" });

        console.log(data);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Fruit Added to Order Successfuly",
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },

    async fetchOrder() {
      try {
        const { data } = await axios.get(`${baseUrl}/order`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.orderData = data[0].Fruit;
        this.orderDataAll = data[0];

        console.log(this.orderData, "di pinia order");
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },

    async createTransaction(sendData) {
      try {
        console.log(sendData);
        const { data } = await axios.post(`${baseUrl}/transaction`, sendData, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        console.log(data.response, "create transaction");

        this.currentTransactionId = data.response.id;

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "A Transaction Created Successfuly",
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },

    async fetchTransaction() {
      try {
        const data = await axios.get(`${baseUrl}/transaction`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        console.log(data, "di pinia ");
      } catch (err) {
        console.error(err);
      }
    },

    async callback(val) {
      try {
        const { data } = await axios.post(`${baseUrl}/googleLogin`, {
          token_google: val.credential,
        });
        //   console.log(data.access_token, "di pinia response>>>>>>>>>>>>>>>>>>");
        localStorage.setItem("access_token", data.access_token);

        this.router.push("/");
        this.isLogged = true;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You Have Successfuly Loged In",
        });
      } catch (err) {
        //   console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },

    async buyFruit(amount) {
      try {
        this.isLogged = true;
        const { data } = await axios({
          method: "post",
          url: `${baseUrl}/midtransToken`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            amount: amount,
          },
        });
        const token = data.token;

        //   const redirect = this.router;
        //   const sendData = { id: this.currentTransactionId };

        window.snap.pay(token, {
          onSuccess: async (result) => {
            /* You may add your own implementation here */
            console.log(result, "di midtrans");
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Payment Success",
            });

            const { data } = await axios({
              method: "patch",
              url: `${baseUrl}/transaction`,
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
              data: {
                transactionId: this.currentTransactionId,
              },
            });

            console.log(data), "hasil success midtrans";
            this.router.push({ path: "/" });
          },
          // ===============================================================

          onPending: function (result) {
            /* You may add your own implementation here */
            Swal.fire("wating your payment!");
            console.log(result);
          },
          onError: function (result) {
            /* You may add your own implementation here */
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Paymen Failed",
            });
            console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            Swal.fire(
              "Popup Closed",
              "you closed the popup without finishing the payment?",
              "question"
            );
          },
        });
      } catch (err) {
        console.error(err);
      }
    },

    async handleSignIngithub() {
      try {
        const result = await signInWithPopup(auth, providerGithub);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const email = result.user.email;
        const username = result._tokenResponse.screenName;
        const imageUrl = result.user.photoURL;
        const data = { email, username, imageUrl };

        //   console.log(email, username, imageUrl, "data >>>>>>>>>>>>>>>>>>>.");

        const response = await axios.post(`${baseUrl}/githubLogin`, {
          data,
        });
        //   console.log(response, ">>>>>>>>>>>>>>>>>>>>>>");

        localStorage.setItem("access_token", response.data.access_token);
        this.router.push("/");
        this.isLogged = true;

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You Have Successfuly Loged In",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
