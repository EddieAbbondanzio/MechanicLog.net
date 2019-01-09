<template>
  <div class="container-fluid">
    <nav-bar/>
    <hero />

    <div class="bg-secondary">
      oof
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import Hero from '@/components/hero.vue';

@Component({
  components: {
    NavBar,
    Hero,
  },
})
export default class Home extends Vue { }
</script>
