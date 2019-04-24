<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <form class="form-signin" method="post" @submit.prevent="dopost">
      <img class="mb-4" src="../assets/shell-9-282410.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required=""
             autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password"
             required="">
      <input type="text" v-model="fa2" id="input2fa" class="form-control" placeholder="2 Factor Key">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">© 2019</p>
    </form>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import axios from 'axios';
  import {router} from "@/router";

  const qs = require('qs');
  export default {
    name: 'app',
    data() {
      return {
        email: '',
        password: '',
        errors: [],
        fa2: ''
      }
    },
    methods: {
      dopost: function () {
        axios.post(`http://localhost:8080/testing/resources/authentication`, qs.stringify({
          'username': this.email,
          'password': this.password,
          'factor2': this.fa2
        }))
          .then(response => {
            localStorage.setItem('token', response.data);
            this.$router.push('/home');
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

<style>
  @import '../css/sign-in.css';
</style>
