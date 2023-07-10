<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapWritableState, mapActions } from "pinia"
import { useFruitStore } from '../stores/fruitStore'

export default {
   name: 'CheckOutPage',
   data() {
      return {
         price: 20_000,
         total: 0
      }
   },
   computed: {
      ...mapState(useFruitStore, ['orderData', 'quantity'])
   },
   methods: {
      ...mapActions(useFruitStore, ['fetchOrder', 'buyFruit']),

      goBuyFruit() {
         this.buyFruit(this.price * (this.quantity / 100))
      },

      calcTotal() {
         this.total = this.price * (this.quantity / 100)
      }

   },
   created() {
      this.fetchOrder()
      this.quantity
      this.calcTotal()
   }
}
</script>

<template>
   <div class="container">
      <div class="col">
         <div class="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
            <div class="row">
               <div class="col-xs-6 col-sm-6 col-md-6">
                  <address>
                     <strong>Fruity Juice</strong>
                     <br>
                     Green Office Park 69
                     <br>
                     Planet jupiter MX
                     <br>
                     Phone Number: 14045
                  </address>
               </div>
               <div class="col-xs-6 col-sm-6 col-md-6 text-right">
                  <p>
                     <em>Date: 1st November, 2013</em>
                  </p>
               </div>
            </div>
            <div class="row">
               <div class="text-center">
                  <h1>Receipt</h1>
               </div>

               <table class="table table-hover">
                  <thead>
                     <tr>
                        <th>Fruit</th>
                        <th>#</th>
                        <th class="text-center">Price</th>
                        <th class="text-center">Total</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td class="col-md-9">
                           <h4><em>{{ orderData.name }} </em></h4>
                        </td>
                        <td class="col-md-1"> {{ quantity }}g </td>
                        <td class="col-md-1 text-center">Rp 20.000,00</td>
                        <td class="col-md-1 text-center">Rp. {{ this.price * (this.quantity / 100) }}</td>
                     </tr>
                     <tr>
                        <td>   </td>
                        <td>   </td>
                        <td class="text-right">
                           <p>
                              <strong>Subtotal: </strong>
                           </p>
                        </td>
                        <td class="text-center">
                           <p>
                              <strong>Rp. {{ this.price * (this.quantity / 100) }}</strong>
                           </p>
                        </td>
                     </tr>
                     <tr>
                        <td>   </td>
                        <td>   </td>
                        <td class="text-right">
                           <h4><strong>Total: </strong></h4>
                        </td>
                        <td class="text-center text-danger">
                           <h4><strong>Rp. {{ total }}</strong></h4>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <button @click.prevent="goBuyFruit()" type="button" class="btn btn-success btn-lg btn-block">
                  Pay Now   <span class="glyphicon glyphicon-chevron-right"></span>
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.well {
   margin-top: 20px;
   margin-left: 25%;
}
</style>