<template>
  <div>
    <navbar></navbar>
  <b-list-group >
    <b-list-group-item href="#" active class="flex-column align-items-start" v-for="user in users" :key="user.id">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">username: {{user.username}}</h5>
        <small>{{user.role}}</small>
      </div>

      <p class="mb-1">
       userid: {{user.id}}
      </p>

      <small>password: {{user.password}}</small>
    </b-list-group-item>
    <b-list-group-item href="#" active class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">List group item heading</h5>
        <small>3 days ago</small>
      </div>

      <p class="mb-1">
        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
      </p>

      <small>Donec id elit non mi porta.</small>
    </b-list-group-item>


  </b-list-group>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'app',
    data () {
      return {
        users: [],
        errors: []
      }
    },
    mounted () {
      axios.get(`http://localhost:8080/testing/resources/Userapp/`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          this.users = response.data;
        })
        .catch(function (error) {
          alert("No rights");
        })
    }
  }
</script>

<style scoped>

</style>
