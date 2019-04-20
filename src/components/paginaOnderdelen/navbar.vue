<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="#" v-bind:to="'pomp'">Pompen</b-nav-item>
          <b-nav-item href="#"v-bind:to="'tankstation'">Tankstation</b-nav-item>

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Shell" right>
            <b-dropdown-item href="#"v-bind:to="'administratie'">Adminitratie</b-dropdown-item>
            <b-dropdown-item href="#"v-bind:to="'coupon'">Coupon</b-dropdown-item>
            <b-dropdown-item href="#"v-bind:to="'geschiedenis'">Geschiedenis</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Gebruiker" right>
            <b-dropdown-item href="#" v-on:click="Logout">Uitloggen</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: 'navbar',
    data() {
      return {}
    },
    methods: {
      Logout: function () {
        localStorage.removeItem('token');
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>
