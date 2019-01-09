<template>
  <nav-bar/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/nav-bar/nav-bar.vue';

@Component({
  components: {
    NavBar,
  },
})
export default class Pricing extends Vue { }
</script>