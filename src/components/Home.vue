<template>
  <div>
    <navbar></navbar>
 <h1>Landing page</h1>
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
