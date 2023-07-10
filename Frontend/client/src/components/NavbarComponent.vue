<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapWritableState, mapActions } from "pinia"
import { useFruitStore } from '../stores/fruitStore'

export default {
   name: "NavbarComponent",
   computed: {
      ...mapState(useFruitStore, ['currentPage']),
      ...mapWritableState(useFruitStore, ['isLogged'])
   },
   methods: {
      ...mapActions(useFruitStore, []),

      doLogout() {
         localStorage.clear()
         this.isLogged = false
         this.$router.push({ path: '/login' })
      },
   },
   created() {
      if (localStorage.getItem('access_token')) this.isLogged = true
      this.currentPage
   }
}
</script>

<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-lg-5 titleName">
         <RouterLink to="/">
            <a href="https://imgbb.com/"><img src="https://i.ibb.co/9Ws6xwv/juice-removebg-preview.png"
                  alt="juice-removebg-preview" width="50" height="50"><span>Fruity Juice</span></a>
         </RouterLink>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span
               class="navbar-toggler-icon"></span></button>

         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            </ul>

            <ul v-if="isLogged === true" class="navbar-nav">
               <li class="nav-item dropdown">
                  <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd"
                           d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                     </svg> Profile
                  </button>
                  <ul class="dropdown-menu dropdown-menu-dark">
                     <li class="nav-item"><a class="nav-link" href="#!">Profile</a></li>
                     <li class="nav-item"><a class="nav-link" href="#!" @click.prevent="doLogout">Logout</a></li>
                  </ul>
               </li>
            </ul>
            <ul v-if="isLogged === false" class="navbar-nav ">
               <li class="nav-item" @click.prevent="doLogout"><a class="nav-link" href="#!">Login</a></li>
            </ul>
         </div>
      </div>
   </nav>
</template>

<style>
a {
   text-decoration: none;
   color: rgb(255, 255, 255);

}

.titleName {
   font-size: 20px;
}

/*  */
</style>