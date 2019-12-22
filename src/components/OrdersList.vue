<template>
<div class="container">
    <vue-good-table
      :columns="columns"
      :rows="orderList"
      @on-row-click="onRowClick"
      :line-numbers="true"
      :sort-options="{
        enabled: true,
        initialSortBy: [
        {field: 'date', type: 'desc'},
        {field: 'total', type: 'desc'}]
      }"
      :pagination-options="{
        enabled: true 
        }"
      :search-options="{
        enabled: true,
        placeholder: 'Search',
       }"/>

  <div class="modal fade bd-example-modal-lg" id="foods" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Order</h5>
          <button type="button" @click="clearArr()" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="card mt-3">
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
    </div>
  </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js';
import { db } from '../firebase';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import $ from 'jquery'

export default {

    components: {
        VueQrReader,
        VueGoodTable
    },

    methods: {
        onRowClick(params) {
          params.row.foods.forEach((value, index) => {
            this.foods.push(value);
          });
          $('#foods').modal({
            backdrop: 'static',
            keyboard: false
          })
          $('#foods').modal('toggle');
        },

        clearArr(){
          this.foods = []
        }

    },


  computed: {
    ...mapGetters({
      user: "user"
    }),

    refreshOrder(){
        if(this.user.data.email == "foxpocus@gmail.com"){
            db.ref('Orders').orderByChild("restaurantName").equalTo(`McDonald's`).limitToLast(100).on('child_added', snapshot=>{
            this.orderList.push(snapshot.val())});
        }

        if(this.user.data.email == "ultracers200@gmail.com"){
            db.ref('Orders').orderByChild("restaurantName").equalTo(`Burger King`).limitToLast(100).on('child_added', snapshot=>{
            this.orderList.push(snapshot.val())});
        }

        if(this.user.data.email == "javosoftgames@gmail.com"){
            db.ref('Orders').orderByChild("restaurantName").equalTo(`Starbucks`).limitToLast(100).on('child_added', snapshot=>{
            this.orderList.push(snapshot.val())});
        }
    },

    
  },

  created(){
      this.refreshOrder();
  },

  data () {
    return {
      foods: [],
      orderList: [],
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Phone',
          field: 'phone',
          sortable: false,
        },
        {
          label: 'Date',
          field: 'date',
        },
        {
          label: 'Restaurant',
          field: 'restaurantName',
          sortable: false,
        },
        {
          label: 'Total, $',
          field: 'total',
          type: 'decimal'
        },
      ],
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