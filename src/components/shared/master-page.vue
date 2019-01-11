<template>
  <div class="container-fluid" style="position: relative; min-height: 100vh;">
    <nav-bar/>
    <slot></slot>

    <!-- Egads thats gross -->
    <div style="height: 128px;">&nbsp;</div>
    <page-footer style="height: 128px; line-height: 128px;"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/shared/nav-bar/nav-bar.vue';
import PageFooter from '@/components/shared/page-footer.vue';

@Component({
  components: {
    NavBar,
    PageFooter,
  },
})
export default class MasterPage extends Vue { }
</script>