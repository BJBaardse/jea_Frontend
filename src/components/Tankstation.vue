<template>
  <div>
    <navbar></navbar>
    <h1>Tankstation:</h1>
    <div class="row">
      <div class="col-md-6">
        <h3>Open Orders:</h3>
        <ul class="list-group">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"
             v-for="beurt in tankbeurten" :key="beurt.id" :class="{active:beurt.id == selectedTankbeurt.id}"
             v-on:click="tankbeurtClicked(beurt)">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{beurt.user.username}}</h5>
              <small>{{beurt.created}}</small>
            </div>
          </a>
        </ul>
      </div>
      <div class="col-md-6" v-if="tankbeurtselected == true">
        <h3>info:</h3>
        <div class="row">
          <div class="col-md-6">
            <h4>User:</h4>
            <h4>Brandstof:</h4>
            <h4>Tijd:</h4>
            <h4 v-if="selectedBeurtCoupon != null">Coupon:</h4>
            <h4>Prijs:</h4>
          </div>
          <div class="col-md-6">
            <h4>
              {{selectedBeurtUser.username}}
            </h4>
            <h4>
              {{selectedBeurtBrandstof.naam}}
            </h4>
            <h4 v-if="selectedBeurtTime != null">
              {{selectedBeurtTime}}
            </h4>
            <h4 v-else>
              Niet beschikbaar
            </h4>
            <h4 v-if="selectedBeurtCoupon != null">
              {{selectedBeurtCoupon.couponCode}}
            </h4>
            <h4>
              {{selectedBeurtPrijs}} euro
            </h4>
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
    name: 'Tankstation',
    data() {
      return {
        tankbeurten: [],
        tankbeurtselected: false,
        selectedTankbeurt: '',
        selectedBeurtUser: null,
        selectedBeurtBrandstof: null,
        selectedBeurtTime: null,
        selectedBeurtCoupon: null,
        selectedBeurtPrijs: null
      }
    },
    mounted() {
      axios.get(`http://localhost:8080/testing/resources/tankbeurt/openorders`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          this.tankbeurten = response.data;
        })
        .catch(function (error) {
          alert("No rights");
        })
    },
    methods: {
      tankbeurtClicked: function (tankbeurt) {
        this.selectedBeurtUser = tankbeurt.user;
        this.selectedBeurtCoupon = tankbeurt.coupon;
        this.selectedBeurtBrandstof = tankbeurt.brandstof;
        this.selectedBeurtPrijs = tankbeurt.prijs;
        this.selectedBeurtTime = tankbeurt.created;
        this.tankbeurtselected = true;
        this.selectedTankbeurt = tankbeurt;

      }
    }
  }
</script>

<style scoped>

</style>
