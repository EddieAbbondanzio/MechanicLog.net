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
          <img alt="MechanicLog logo" class="logo" src="../../../assets/logo.png">
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
        <div class="collapse navbar-collapse" v-if="$currentUser == null">
          <ul class="navbar-nav ml-auto">
            <nav-bar-button name="Features" route="/features"/>
            <nav-bar-button name="Pricing" route="/pricing"/>
            <nav-bar-button name="Login" route="/login"/>
            <nav-bar-button name="Sign Up" route="/register"/>
          </ul>
        </div>
        <!-- Menu options for users -->
        <div class="navbar-nav ml-auto text-light" v-else>
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown">
              <i
                class="material-icons icon-lg pr-2"
                style="vertical-align: middle"
                title="Logged in as"
              >person</i>
              <span
                class="d-inline-block pr-2"
                style="height: 32px;"
              >{{ $currentUser.name.indexOf(' ') != -1 ? $currentUser.name.split(' ')[0] : $currentUser.name }}</span>
            </a>

            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Dashboard</a>
              <a class="dropdown-item" href="#">Settings</a>
              <a class="dropdown-item" href="#" @click="$logOut">Log Out</a>
            </div>
            <!-- <i class="material-icons icon-md" title="Settings">settings</i> -->
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavBarButton from '@/core/components/nav-bar/nav-bar-button.vue';
import { UserMixin } from '@/user-system/mixins/user-mixin';

@Component({
  name: 'nav-bar',
  components: {
    NavBarButton,
  },
})
export default class NavBar extends UserMixin {
  /**
   * The name of the product in the nav bar
   */
  public brand: string = 'MechanicLog';

  /**
   * When the page loads, check if we need to fire off a login
   * request to the backend.
   */
  public async created(): Promise<void> {
    if (this.$hasAuthToken() && this.$currentUser == null) {
      await this.$relogin();
    }
  }
}
</script>