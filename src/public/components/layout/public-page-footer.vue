<style scoped>
.footer {
    background-color: #232323;
    height: 128px;
}
</style>

<template>
    <div class="footer d-flex flex-column align-items-center justify-content-center">
        <h5 class="text-light">© {{ year }} MechanicLog</h5>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

/**
 * Footer to put at the bottom of the page.
 */
@Component({
    name: 'page-foot',
})
export default class PublicPageFooter extends Vue {
    public year: number = new Date().getFullYear();
}
</script>