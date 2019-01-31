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
  <div class="row">
    <div class="col-12">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <!-- Icon and Name -->
        <router-link class="nav-link navbar-brand" to="/">
          <img alt="MechanicLog logo" class="logo" src="../../../../assets/logo.png">
          {{ brand }}
        </router-link>

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

        <!-- Menu options for non-users-->
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <nav-bar-button name="Features" route="/features"/>
            <nav-bar-button name="Pricing" route="/pricing"/>
            <nav-bar-button name="Login" route="/login"/>
            <nav-bar-button name="Sign Up" route="/register"/>
          </ul>
        </div>
        
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavBarButton from '@/core/components/public/nav-bar/nav-bar-button.vue';
import { UserMixin } from '@/user-system/mixins/user-mixin';

@Component({
  name: 'nav-bar',
  components: {
    NavBarButton,
  },
})
export default class NavBar extends Vue {
  /**
   * The name of the product in the nav bar
   */
  public brand: string = 'MechanicLog';
}
</script>