<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapWritableState, mapActions } from "pinia"
import { useFruitStore } from '../stores/fruitStore'

export default {
   name: 'LoginPage',
   components: {},
   data() {
      return {
         loginData: {
            email: '',
            password: ''
         },
      }
   },
   computed: {
      ...mapWritableState(useFruitStore, ['currentPage'])
   },
   methods: {
      ...mapActions(useFruitStore, ['login', 'callback', 'handleSignIngithub']),


      doLogin() {
         const data = { email: this.loginData.email, password: this.loginData.password }
         // console.log(data, 'di page>>>>>>>>');
         this.login(data)

         this.$router.push({ path: '/' })

      },
   },
   created() {
      this.currentPage = 'login'
   }
}
</script>

<template>
   <div class="container mt-5">
      <div class="row">
         <div class="contaienr" id="formContainer">
            <div class="col">
               <h1 id="titlePage">LOGIN PAGE</h1>
            </div>
            <form id="login-form" action="" @submit.prevent="doLogin">
               <div class="mb-3 mt-3">
                  <div class="d-flex justify-content-between">
                     <label for="login-email">Email</label>
                     <label class="text-danger text-end fw-bold">*</label>
                  </div>
                  <input v-model="loginData.email" type="email" class="form-control" id="login-email"
                     placeholder="Enter email address ..." autocomplete="off" required />
               </div>
               <div class="mb-4">
                  <div class="d-flex justify-content-between">
                     <label for="login-password">Password</label>
                     <label class="text-danger text-end fw-bold">*</label>
                  </div>
                  <input v-model="loginData.password" type="password" class="form-control" id="login-password"
                     placeholder="Enter your password ..." autocomplete="off" required />
               </div>
               <div class="mb-3">
                  Don't Have Account ?
                  <RouterLink to="/register">
                     <a id="anchorLogReg" href="#">register here </a>
                  </RouterLink>
               </div>
               <button class="btn btn-lg btn-light rounded-pill w-100 p-2" type="submit" style="border: 2px solid black"
                  href="">
                  Log In
               </button>
            </form>
            <div class="col-6 mt-3">
               Or Login With
            </div>
            <div style="text-align: center;">
               <div class="row" style="align-items: center;">
                  <div class="col mt-3">
                     <GoogleLogin class="w-full" :callback="callback" promt auto-login />
                  </div>
                  <div class="col mt-3">
                     <div class="mx-3 my-2 py-2 bordert">
                        <div class="text-center py-3">
                           <a @click.prevent="handleSignIngithub" href="https://www.github.com" target="_blank"
                              class="px-2">
                              <img
                                 src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png"
                                 alt="">
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
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

img {
   width: 40px;
   height: 40px;
   object-fit: cover;
   border-radius: 50%;
   position: relative;
}
</style>