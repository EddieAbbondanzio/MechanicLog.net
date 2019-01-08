<template>
  <div class="home">
    <nav-bar />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/hello-world.vue'; // @ is an alias to /src
import NavBar from '@/components/nav-bar.vue';

@Component({
  components: {
    HelloWorld,
    NavBar,
},
})
export default class Home extends Vue {}
</script>
