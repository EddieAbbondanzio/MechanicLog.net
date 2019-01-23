<template>
  <nav-bar/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/core/components/nav-bar/nav-bar.vue';

@Component({
  components: {
    NavBar,
  },
})
export default class Register extends Vue { }
</script>