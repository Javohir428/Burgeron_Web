<template>
  <nav class="navbar navbar-expand-md navbar-custom">
    <div class="container">
      <router-link to="/" class="navbar-brand"><img class="logo_image" src= "@/assets/img/logo.png" alt="">Burgeron</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label>
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="user.loggedIn">
        <img v-if="user.data.email == 'foxpocus@gmail.com'" class="logo_image" src= "https://www.freepnglogos.com/uploads/mcdonalds-png-logo/mcdonalds-png-logo-picture-3.png" alt="">
        <img v-if="user.data.email == 'ultracers200@gmail.com'" class="logo_image" src= "https://upload.wikimedia.org/wikipedia/ru/thumb/3/3a/Burger_King_Logo.svg/1010px-Burger_King_Logo.svg.png" alt="">
        <img v-if="user.data.email == 'javosoftgames@gmail.com'" class="logo_image" src= "https://www.freepnglogos.com/uploads/starbucks-logo-png-transparent-0.png" alt="">
      </div>
      <div class="navbar-toggle-always collapsed" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <li class="nav-item">
              <button class="btn btn-outline-light mr-3" @click.prevent="ordersList" type="submit">Orders</button>
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-dark" @click.prevent="signOut" type="submit">Sign Out</button>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">
                  <button class="btn btn-light" type="submit">Login</button>
                  </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login"
          });
        });
    },
    ordersList() {
        this.$router.replace({
          name: "OrdersList"
        });
      }
  }
};
</script>

<style>
.navbar-custom{
    background-color: firebrick;
}

.navbar-brand{
    color: white;
}

.navbar-brand:hover{
    color: whitesmoke;
}

.logo_image {
    max-height: 40px;
    margin: 5px;
}



</style>