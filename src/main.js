// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from "firebase"
import { firestorePlugin } from 'vuefire'
import store from "./store"
import 'firebase/database'



Vue.config.productionTip = false

/*const configOptions = {
  apiKey: "AIzaSyClwCFfkCZjbsvFsEWYqw8RS7RBEUB25vQ",
  authDomain: "burgeron-81696.firebaseapp.com",
  databaseURL: "https://burgeron-81696.firebaseio.com",
  projectId: "burgeron-81696",
  storageBucket: "burgeron-81696.appspot.com",
  messagingSenderId: "31305328357",
  appId: "1:31305328357:web:711ff3933d57159804960c",
  measurementId: "G-FP513PSK31"
};


firebase.initializeApp(configOptions)
export const db = firebase.firestore()*/

Vue.use(firestorePlugin)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

