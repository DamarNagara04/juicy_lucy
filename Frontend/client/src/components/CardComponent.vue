<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapWritableState, mapActions } from "pinia"
import { useFruitStore } from '../stores/fruitStore'

export default {
   name: "CardComponent",
   props: ['fruit'],
   emits: ['doCreateOrder'],
   computed: {},
   methods: {
      ...mapActions(useFruitStore, ['createOrderMethods']),

      doCreateOrder(id) {
         this.$emit('doCreateOrder', id)
      }

   }

}
</script>

<template>
   <div class="card my-3">
      <header class="card_header">
         <h1 class="card_title"> {{ fruit.name }}</h1>
      </header>
      <div class="card_gallery">
         <img class="first" src="https://bakeitwithlove.com/wp-content/uploads/2021/11/How-To-Store-Apples-sq.jpg">
      </div>
      <div class="card_body">
         <p class="card_description">
            Calories: {{ fruit.calories }},
            Protein : {{ fruit.protein_g }}g,
            Pottassium : {{ fruit.potassium_mg }}mg,
            Carbohydrate : {{ fruit.carbohydrates_total_g }}g,
            Fiber : {{ fruit.fiber_g }}g,
            Sugar : {{ fruit.sugar_g }} g
         </p>
      </div>
      <div class="card_info">
         <span class="card_price">Rp. 20.000/100g</span>
         <span class="material-symbols-outlined card_like" @click.prevent="doCreateOrder(fruit.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cup-straw"
               viewBox="0 0 16 16">
               <path
                  d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82 0 .046-.004.09-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87-1.516 0-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A.78.78 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278zM9.768 4.607A13.991 13.991 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.284 3.284 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085l.18-.808zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a5.514 5.514 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69 1.27 0 2.081-.441 2.438-.69.042-.029.09-.094.102-.215l.852-8.03a5.517 5.517 0 0 1-.435.127 8.88 8.88 0 0 1-.89.17zM4.467 4.884s.003.002.005.006l-.005-.006zm7.066 0-.005.006c.002-.004.005-.006.005-.006zM11.354 5a3.174 3.174 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222z" />
            </svg>
            Order
         </span>
      </div>
   </div>
</template>

<style scoped>
body {
   background-color: white;

   font-family: Roboto;
   /* overflow-x: hidden; */

   /* min-height: 100vh; */
   /* display: flex; */
   /* justify-content: center; */
   /* align-items: center; */
   /* flex-direction: column; */
}

img {
   width: 100%;
   height: 100%;
   position: absolute;
   object-fit: cover;
   border-radius: 20px;
}

.card {
   width: 350px;
   padding: 1rem;
   background-color: white;
   border-radius: 20px;
   box-shadow: 0 10px 20px rgba(128, 128, 128, 0.3);
}

.card_header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 1rem;
}

.card_title {
   text-transform: uppercase;
   font-weight: normal;
   font-size: 1.2rem;
   font-weight: bold;
}

.card_description {
   font-size: 1rem;
   color: rgb(131, 131, 131);
}

.card_body {
   display: flex;
   flex-direction: column;
   gap: 1rem;
   padding: 1rem 0;
}

.card_info {
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.card_price {
   font-size: 1.3rem;
   font-weight: bold;
}

.card_like {
   color: white;
   font-weight: bold;
   padding: .5rem;
   background-color: rgb(255, 42, 42);
   border-radius: 10px;
   cursor: pointer;
}

.card_gallery {
   position: relative;
   width: 100%;
   aspect-ratio: 1/1;
}
</style>