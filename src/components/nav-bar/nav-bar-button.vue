<template>
  <li class="nav-item mx-2">
    <router-link class="nav-link" :to="route">{{ name }}</router-link>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * Button on the nav bar that allows a user to change pages.
 */
@Component({
  name: 'nav-bar-button',
})
export default class NavBarButton extends Vue {
  /**
   * The name of the button on screen.
   */
  @Prop()
  public name!: string;

  /**
   * The route the button redirects to.
   */
  @Prop()
  public route!: string;
}
</script>