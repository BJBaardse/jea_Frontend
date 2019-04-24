<template>
  <div>
    <navbar></navbar>
    <h1>2 Factor</h1>
    <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" v-on:click="couponClicked">Klik
      hier om een nieuwe 2 Factor code te genereren</a>
    <div v-if="generated">
      <label>Vul de volgende code in de Google Authenticator App:</label>
      <h4>{{authkey}}</h4>
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
        authkey: '',
        generated: false
      }
    },
    methods: {
      couponClicked: function () {
        axios.get(`http://localhost:8080/testing/resources/Userapp/keys/`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(response => {
            if (response.status == 200) {
              this.generated = true;
              this.authkey = response.data;
            }
          })
          .catch(function (error) {
            if (error.response.status == 403) {
              alert("Incorrect credentials");
            }
          })
      },
    }
  }
</script>

<style scoped>

</style>
