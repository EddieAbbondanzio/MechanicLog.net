<style scoped>
.navbar-brand {
  font-size: 24px;
  font-weight: 600;
}

.logo {
  height: 48px;
}

.nav-item {
  font-size: 18px;
}
</style>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <!-- Icon and Name -->
    <a class="navbar-brand" href="#">
      <img alt="MechanicLog logo" class="logo" src="../assets/logo.png">
      {{ brand }}
    </a>

    <!-- Toggle Button -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Menu Options -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active mx-2">
          <router-link class="nav-link" to="/about">Features</router-link>
        </li>
        <li class="nav-item mx-2">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item mx-2">
          <a class="nav-link text-alert" href="#">Login</a>
        </li>
        <li class="nav-item mx-2">
          <a class="nav-link" href="#">Sign Up</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'nav-bar',
})
export default class NavBar extends Vue {
  /**
   * The name of the product in the nav bar
   */
  public brand: string = 'MechanicLog';
}
</script>