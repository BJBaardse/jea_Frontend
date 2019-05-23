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
          <b-nav-item href="#" v-if="disconnected == false" v-on:click="unconnect()">STAHP</b-nav-item>
          <b-nav-item href="#" v-else v-on:click="connect()">Reconnect</b-nav-item>
          <b-nav-item-dropdown v-bind:text="TimerString" right>
            <b-dropdown-item href="#" v-on:click="intervalchange(1000)">1 Sec</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click="intervalchange(2000)">2 Sec</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click="intervalchange(5000)">5 Sec</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click="intervalchange(10000)">10 Sec</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Gebruiker" right>
            <b-dropdown-item href="#" v-on:click="Logout">Uitloggen</b-dropdown-item>
            <b-dropdown-item href="#" v-bind:to="'2factor'">2 Factor Setup</b-dropdown-item>
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
      return {
        TimerString: 'test',
        logs: [],
        status: "disconnected",
        interval: 1000,
        disconnected: false
      }
    },
    mounted () {
      this.connect()
    },
    methods: {
      Logout: function () {
        localStorage.removeItem('token');
        this.$router.push('/');
      },
      connect() {
        this.socket = new WebSocket("ws://127.0.0.1:8080/testing/clock");
        this.socket.onopen = () => {
          this.status = "connected";
          this.logs.push({ event: "Connected to", data: 'ws://127.0.0.1:8080/testing/clock'})
          this.socket.onmessage = ({data}) => {
            const o = data;
            console.log(o);
            this.TimerString = data;
          };
        };
        this.disconnected = false;
      },
      unconnect(){
        this.socket.close();
        this.disconnected = true;
      },
      intervalchange(seconden){
        this.socket.send(seconden);
        this.socket.onmessage = ({data}) => {
          const o = data;
          console.log(o);
          this.TimerString = data;
        };
      }
    }
  }
</script>

<style scoped>

</style>
