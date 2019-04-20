<template>
  <div>
    <navbar></navbar>
    <div class="col-md-6">
      <h1>Brandstof:</h1>
      <ul class="list-group">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"
           v-for="brandstof in brandstoffen" :class="{active:brandstof.id == selectedbrandstof}"
           v-on:click="brandstofClicked(brandstof)">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{brandstof.naam}}</h5>
            <small>{{brandstof.prijs}} euro</small>
          </div>
        </a>
      </ul>
    </div>
    <div class="col-md-6" v-if="selectedbrandstof != null"> <!-- geen id selectedbrandstof = hidden-->
      <div>
        <label class="">Afname:</label>
        <div>
          <label style="text-align: left">Liter</label>
          <input type="number" v-model="volume" v-on:change="volumeEnteredevent">
        </div>
      </div>
      <div>
        <button v-on:click="couponclicked">Coupon</button>
        <input v-if="couponselect == true" type="text" class="form-control" id="coupon" placeholder="Coupon Code">
      </div>
    </div>


    <div class="col-md-6" v-if="(volumeEntered == true) && (selectedbrandstof != null)">
      <h1>Tankstation:</h1>
      <ul class="list-group">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"
           v-for="tankstation in tankstations" :class="{active:tankstation.id == selectedtankstation}"
           v-on:click="tankstationclicked(tankstation)">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{tankstation.username}}</h5>
          </div>
        </a>
      </ul>
    </div>


  </div>
</template>

<script>
  import axios from 'axios';

  const qs = require('qs');

  export default {
    name: 'Pomp',
    data() {
      return {
        brandstoffen: [],
        tankstations: [],
        selectedbrandstof: null,
        selectedtankstation: null,
        couponselect: false,
        volumeEntered: false,
        volume: 0
      }
    },
    mounted() {
      axios.get(`http://localhost:8080/testing/resources/brandstof/`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          this.brandstoffen = response.data;
        })
        .catch(function (error) {
          alert("No rights");
        })
      axios.get(`http://localhost:8080/testing/resources/Userapp/allstations`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          this.tankstations = response.data;
        })
        .catch(function (error) {
          alert("No rights");
        })
    },
    methods: {
      brandstofClicked: function (brandstof) {
        this.selectedbrandstof = brandstof.id;

      },
      couponclicked: function () {
        if (this.couponselect == true) {
          this.couponselect = false;
        } else {
          this.couponselect = true;
        }
      },
      volumeEnteredevent: function () {
        if (this.volume.valueOf() > 0) {
          this.volumeEntered = true;
        } else {
          this.volumeEntered = false;
        }
      },
      tankstationclicked: function (tankstation) {
        this.selectedtankstation = tankstation.id;
        axios.post(`http://localhost:8080/testing/resources/tankbeurt/createnocoupon`, qs.stringify({
            'brandstof': this.selectedbrandstof,
            'liter': this.volume.valueOf(),
            'token': localStorage.getItem('token')
          }))
          .then(response => {
            if (response.status == 200) {
              alert("Succesful");
            }
            location.reload();
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
