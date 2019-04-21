<template>
  <div>
    <navbar></navbar>
    <h1>Administratie Pagina</h1>
    <div class="row">
      <div class="col-md-6">
        <h3>Open Orders:</h3>
        <ul class="list-group">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"
             v-for="user in gebruikers" :key="user.id" :class="{active:user.id == selectedUser.id}"
             v-on:click="gebruikerClicked(user)">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{user.username}}</h5>
              <small>{{user.role}}</small>
            </div>
          </a>
        </ul>
      </div>
      <div class="col-md-6" v-if="userSelected == true">
        <h3>info:</h3>
        <div class="row">
          <div class="col-md-6">
            <h4>Username:</h4>
            <h4>Role:</h4>
            <button v-on:click="passwordbutton()">Change Password</button>
          </div>
          <div class="col-md-6">
            <input type="text" v-model="username" class="form-control" placeholder="Enter username">
            <select class="form-control" v-model="role">
              <option value="Shell">Shell</option>
              <option value="Tankstation">Tankstation</option>
              <option value="User">User</option>
            </select>
            <div v-if="passwordchanging==true">
            <input type="password" v-model="password" class="form-control" placeholder="Enter new password">
            </div>
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
    name: 'Administratie',
    data() {
      return {
        gebruikers: [],
        selectedUser: '',
        userSelected: null,
        username: "",
        role: "",
        password: "",
        passwordchanging: false
      }
    },
    mounted() {
      axios.get(`http://localhost:8080/testing/resources/Userapp/`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          this.gebruikers = response.data;
        })
        .catch(function (error) {
          alert("No rights");
        })
    },
    methods: {
      gebruikerClicked: function (gebruiker) {
        this.selectedUser = gebruiker;
        this.username = gebruiker.username;
        this.role = gebruiker.role;
        this.userSelected = true;
        this.passwordchanging = false;
      },
      passwordbutton: function () {
        if(this.passwordchanging == true){
          this.passwordchanging= false;
        }
        else{
          this.password = "";
          this.passwordchanging=true;
        }
      }

    }
  }
</script>

<style scoped>

</style>
