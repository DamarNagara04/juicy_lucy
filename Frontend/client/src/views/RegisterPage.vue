<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapWritableState, mapActions } from "pinia"
import { useFruitStore } from '../stores/fruitStore'


export default {
   name: 'RegisterPage',
   components: {},
   data() {
      return {
         registerData: {
            username: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: ''
         }
      }
   },
   computed: {
      ...mapWritableState(useFruitStore, ['currentPage'])
   },
   methods: {
      ...mapActions(useFruitStore, ['register']),

      doRegister() {
         const data = {
            username: this.registerData.username,
            email: this.registerData.email,
            password: this.registerData.password,
            phoneNumber: this.registerData.phoneNumber,
            address: this.registerData.address
         }
         this.register(data)

         this.$router.push('/login')
      }
   },
   created() {
      this.currentPage = 'login'
   }
}
</script>

<template>
   <!-- REGISTER -->
   <div class="container mt-5">
      <div class="row">
         <div class="contaienr" id="formContainer">
            <div class="col">
               <h1 id="titlePage">REGISTER PAGE</h1>
            </div>
            <form id="register-form" action="" @submit.prevent="doRegister">
               <div class="mb-3">
                  <div class="d-flex justify-content-between">
                     <label for="register-username">Username</label>
                     <label class="text-danger text-end fw-bold">*</label>
                  </div>
                  <input v-model="registerData.username" type="text" class="form-control" id="register-username"
                     placeholder="Enter email address ..." autocomplete="off" required />
               </div>
               <div class="mb-3">
                  <div class="d-flex justify-content-between">
                     <label for="register-email">Email</label>
                     <label class="text-danger text-end fw-bold">*</label>
                  </div>
                  <input v-model="registerData.email" type="email" class="form-control" id="register-email"
                     placeholder="Enter email address ..." autocomplete="off" required />
               </div>
               <div class="mb-3">
                  <div class="d-flex justify-content-between">
                     <label for="register-password">Password</label>
                     <label class="text-danger text-end fw-bold">*</label>
                  </div>
                  <input v-model="registerData.password" type="password" class="form-control" id="register-password"
                     placeholder="Enter your password ..." autocomplete="off" required />
               </div>
               <div class="mb-3">
                  <div class="d-flex justify-content-between">
                     <label for="register-phoneNumer">Phone Numer</label>
                     <label class="text-danger text-end fw-bold">*</label>
                  </div>
                  <input v-model="registerData.phoneNumber" type="text" class="form-control" id="register-phone"
                     placeholder="Enter phone number (optional) ..." autocomplete="off" required />
               </div>
               <div class="mb-3">
                  <div class="d-flex justify-content-between">
                     <label for="register-address">Address</label>
                     <label class="text-danger text-end fw-bold">*</label>
                  </div>
                  <textarea v-model="registerData.address" id="register-address" class="form-control" rows="3"
                     placeholder="Enter your address (optional) ..." autocomplete="off"></textarea>
               </div>
               <div class="mb-3">
                  Have an Account ?
                  <RouterLink to="/login">
                     <a id="anchorLogReg" href="#">login here </a>
                  </RouterLink>
               </div>
               <button class="btn btn-lg btn-light rounded-pill w-100 p-2" type="submit" style="border: 2px solid black"
                  href="">
                  Sign Up
               </button>
            </form>
            <div class="col-6"></div>
         </div>
      </div>
   </div>
</template>

<style scoped>
#formContainer {
   max-width: 38em;
   padding: 1em 3em 2em 3em;
   margin: 0em auto;
   background-color: #fff;
   border-radius: 4.2px;
   box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
}

a {
   color: rgb(0, 0, 0);
   font-weight: bold;
}
</style>