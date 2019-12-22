<template>
<div class="container">
    <div class="card">
        <div class="row">
            <div class="col-12 text-center"  v-if="obj == ''">
                <vue-qr-reader vide-width="200" vide-height="200" v-on:error-captured="errorCaptured" v-on:code-scanned="codeArrived" />
            </div>
            <div class="col-sm-12 text-center" v-if="obj != ''">
                <button @click="refreshCompanent()" class="btn btn-success" style="width: 200px;">Scan Order</button>
            </div>
        </div>
        
    </div>
    <div class="card" style="overflow-x:auto;" v-if="obj != ''">
        <table class="table">
            <thead>
            <tr>
                <th class="text-center">Name</th>
                <th class="text-center">Phone</th>
                <th class="text-center">Restaurant</th>
                <th class="text-center">Date</th>
                <th class="text-center">Total</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(order, idx) in orderInfo" v-bind:key="idx">
                <td class="text-center">{{order.name}}</td>
                <td class="text-center">{{order.phone}}</td>
                <td class="text-center">{{order.restaurantName}}</td>
                <td class="text-center">{{order.date}}</td>
                <td class="text-center">${{order.total}}</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="card mt-3" v-if="obj != ''">
        <table class="table table-hover product-table">
            <thead>
            <tr>
                <th></th>
                <th class="text-center">Name</th>
                <th class="text-center">Quantity</th>
                <th class="text-center">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(food, i) in foods" :key="`${i}-${food.id}`">
                <td><img class="food_image" v-bind:src="food.image" alt=""></td>
                <td class="text-center">{{food.productName}}</td>
                <td class="text-center">{{food.quantity}}</td>
                <td class="text-center">${{food.price}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js';
import { db } from '../firebase';

export default {

    components: {
        VueQrReader
    },

    methods: {
        codeArrived (code) {
            this.$data.obj = code;  
        },
        refreshCompanent() {
            Object.assign(this.$data, this.$options.data.apply(this))
        },
        errorCaptured(error) {
            switch (error.name) {
                case 'NotAllowedError':
                this.errorMessage = 'Camera permission denied.'
                break;
                case 'NotFoundError':
                this.errorMessage = 'There is no connected camera.'
                break;
                case 'NotSupportedError':
                this.errorMessage = 'Seems like this page is served in non-secure context.'
                break;
                case 'NotReadableError':
                this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
                break;
                case 'OverconstrainedError':
                this.errorMessage = 'Constraints don\'t match any installed camera.'
                break;
                default:
                this.errorMessage = 'UNKNOWN ERROR: ' + error.message
            }
            console.error(this.errorMessage);
        },
    },


  computed: {
    ...mapGetters({
      user: "user"
    }),

    refreshOrder(){
        if(this.$data.obj != ''){
            db.ref('Orders').child(this.$data.obj).child('foods').on('child_added', snapshot=>{
            this.foods.push(snapshot.val())});

            db.ref('Orders').child(this.$data.obj).on('value', snapshot=>{
            this.orderInfo.push(snapshot.val())});
        } 
    },

    
  },

    beforeUpdate(){
        this.refreshOrder();
    },

  data () {
    return {
      foods: [],
      orderInfo: [],
      obj: ''
    }
  },
};


</script>

<style>
.food_image{
    max-width: 100px;
    max-height: 100px;
}
</style>