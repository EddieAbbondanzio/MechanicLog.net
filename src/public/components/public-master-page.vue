<template>
    <div class="mx-0 px-0" style="position: relative; min-height: 100vh;">
        <nav-bar />

        <router-view></router-view>

        <!-- Egads thats gross. We need this to prevent overlap behind the footer -->
        <div style="height: 128px;">&nbsp;</div>
        <page-footer/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from './nav-bar.vue';
import PageFooter from './page-footer.vue';

@Component({
    components: {
        NavBar,
        PageFooter,
    },
})
export default class PublicMasterPage extends Vue {}
</script>