<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapWritableState, mapActions } from "pinia"
import { useFruitStore } from '../stores/fruitStore'

export default {
   name: 'OrderPage',
   data() {
      return {
         // quantity: 100,
         // price: 20_000
      }
   },
   computed: {
      ...mapState(useFruitStore, ['orderData', 'orderDataAll']),
      ...mapWritableState(useFruitStore, ['quantity', 'totalPrice'])
   },
   methods: {
      ...mapActions(useFruitStore, ['fetchOrder', 'createTransaction']),


      goCheckOut(val) {
         this.totalPrice = this.totalPrice * (this.quantity / 100)
         const sendData = { OrderId: this.orderDataAll.id, amount: this.totalPrice, quantity: this.quantity }
         // console.log(sendData, 'data utk create transaction, ini di order page');
         this.createTransaction(sendData)
         this.$router.push("/checkout")
      }
   },
   created() {
      this.fetchOrder()
   }
}
</script>

<template>
   <div class="container">
      <h1>Order Page</h1>

      <section class="h-100" style="background-color: #eee;">
         <div class="container h-100 py-5">
            <div class="row d-flex justify-content-center align-items-center h-100">
               <div class="col-10">

                  <div class="card rounded-3 mb-4">
                     <div class="card-body p-4">
                        <div class="row d-flex justify-content-between align-items-center">
                           <div class="col-md-2 col-lg-2 col-xl-2">
                              <img src="https://bakeitwithlove.com/wp-content/uploads/2021/11/How-To-Store-Apples-sq.jpg"
                                 class="img-fluid rounded-3" alt="Cotton T-shirt">
                           </div>
                           <div class="col-md-3 col-lg-3 col-xl-3">
                              <p class="lead fw-normal mb-2">{{ orderData.name }}</p>
                              <div class="col">
                                 <div class="row">
                                    <p>
                                       <span class="text-muted">Calories: </span>{{ orderData.calories * (quantity / 100)
                                       }}
                                    </p>
                                    <p>
                                       <span class="text-muted">Fat: </span>{{ orderData.fat_total_g * (quantity / 100) }}
                                       g
                                    </p>
                                    <p>
                                       <span class="text-muted">Protein: </span>{{ orderData.protein_g * (quantity / 100)
                                       }}
                                       g
                                    </p>
                                    <p>
                                       <span class="text-muted">Sodium: </span>{{ orderData.sodium_mg * (quantity / 100) }}
                                       g
                                    </p>
                                    <p>
                                       <span class="text-muted">Pottasium: </span>{{ orderData.potassium_mg * (quantity /
                                          100) }} g
                                    </p>
                                    <p>
                                       <span class="text-muted">Carbohydrates: </span>{{ orderData.carbohydrates_total_g *
                                          (quantity / 100) }}
                                       g
                                    </p>
                                    <p>
                                       <span class="text-muted">Fiber: </span>{{ orderData.fiber_g * (quantity / 100) }} g
                                    </p>
                                    <p>
                                       <span class="text-muted">Sugar: </span>{{ orderData.sugar_g * (quantity / 100) }} g
                                    </p>
                                 </div>
                              </div>
                           </div>


                           <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <!-- <button class="btn btn-link px-2"
                                 onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                 <i class="fas fa-minus"></i>
                              </button> -->

                              <div class="col">
                                 <div class="row my-2">
                                    <label for="input-quantity">Quantity :</label>
                                 </div>
                                 <div class="row">
                                    <input v-model="quantity" id="form1" min="100" name="quantity" type="number"
                                       class="form-control form-control-sm" />
                                 </div>
                                 <div class="row mt-2">
                                    <p>in grams</p>
                                 </div>
                              </div>


                              <!-- <button class="btn btn-link px-2"
                                 onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                 <i class="fas fa-plus"></i>
                              </button> -->
                           </div>
                           <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h5 class="mb-0"> Rp. {{ totalPrice * (quantity / 100) }}</h5>
                           </div>
                           <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="card">
                     <div class="card-body">
                        <button @click.prevent="goCheckOut()" type="button" class="btn btn-warning btn-block btn-lg">Check
                           Out</button>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </section>

   </div>
</template>

<style scoped>
p {
   margin-bottom: 0px;
}
</style>