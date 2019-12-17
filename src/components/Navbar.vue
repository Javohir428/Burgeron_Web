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
      <div class="navbar-toggle-always collapsed" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <li class="nav-item">
              <button class="btn btn-secondary" @click.prevent="signOut" type="submit">Sign Out</button>
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
// map `this.user` to `this.$store.getters.user`
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