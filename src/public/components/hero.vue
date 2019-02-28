<style lang="scss" scoped>
.hero-container {
    margin-top: 2em;
    margin-bottom: 128px;
}
</style>

<template>
    <div class="container-fluid mx-0 px-0 py-3">
        <div class="row hero-container px-4">
            <div class="col-12 col-lg-6 text-center d-table h-100">
                <div class="d-inline-block align-middle d-table-cell px-4 pt-4">
                    <h1 class="text-dark display-4 font-weight-bold pb-2 pb-md-5">
                        Vehicle Maintenance
                        Tracking Made Easy
                    </h1>

                    <p class="text-muted pb-4 text-left" style="font-size: 1.25em;">
                        Upgrade from spreadsheets and never lose an invoice again. With us you can consolidate all your
                        records in one convenient place that can be accessed from anywhere.
                        Next time you need to hunt down a receipt, you'll know where to find it.
                    </p>

                    <div>
                        <router-link to="/register">
                            <b-btn
                                size="lg"
                                variant="primary"
                                class="rounded ml-2"
                            >Start My Free Trial</b-btn>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 h-100 pt-5 pt-lg-0">
                <img src="@/assets/mechanic.jpg" class="w-100">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * Large hero image for showing something off.
 */
@Component({
    name: 'hero',
})
export default class Hero extends Vue {}
</script>