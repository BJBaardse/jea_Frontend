<template>
  <div>
    <navbar></navbar>
    <h1>Coupon Pagina</h1>
    <div class="row">
      <div class="col-md-6">
        <h3>Open Orders:</h3>
        <ul class="list-group">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"
             v-for="coupon in Coupons" :key="coupon.id" :class="{active:coupon.valid }"
             v-on:click="couponClicked(coupon)">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{coupon.couponCode}}</h5>
              <div v-if="coupon.valid == true">
                <p class="mb-1">
                  Coupon Active
                </p>
              </div>
              <div v-else>
                Coupon Not Active
              </div>
              <small>
                {{coupon.used}}
                <br>------<br>
                {{coupon.allowed}}

              </small>

            </div>
          </a>
        </ul>
      </div>
      <div class="col-md-6" v-if="couponSelected == true">
        <h3>info:</h3>
        <div class="row">
          <div class="col-md-6">
            <h4>User:</h4>
            <h4>Tankstation:</h4>
            <h4>Brandstof:</h4>
            <h4>Tijd:</h4>
            <h4>Prijs:</h4>
          </div>
          <div class="col-md-6">
            side tekst
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  const qs = require('qs');

  export default {
    name: 'Coupon',
    data() {
      return {
        Coupons: [],
        selectedCoupon: '',
      }
    },
    mounted() {
      this.loadCoupons();
    },
    methods: {
      loadCoupons: function(){
        axios.get(`http://localhost:8080/testing/resources/coupon/`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then(response => {
            this.Coupons = response.data;
            this.selectedCoupon = '';
          })
          .catch(function (error) {
            alert("No rights");
          })
      },
      couponClicked: function (coupon) {
        axios.post(`http://localhost:8080/testing/resources/coupon/afronden/`, qs.stringify({
            'couponid': coupon.id
          }),
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(response => {
            if (response.status == 204) {
              alert("Succesful");
            }
            this.loadCoupons();
          })
          .catch(function (error) {
            if (error.response.status == 403) {
              alert("Incorrect credentials");
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
