<style lang="scss" scoped>
.features-showcase {
    h2 {
        padding-bottom: 8px;
    }

    p {
        font-size: 1.2em;
    }
}
</style>


<template>
    <div class="container-fluid mx-0 py-0 features-showcase bg-gray-900 text-white">
        <div class="row" style="padding-top: 128px; padding-bottom: 64px;">
            <div class="col-12 text-center">
                <h1 class="display-3 d-inline-block">Features</h1>
            </div>
        </div>

        <div class="row bg-gray-900 text-white" style="padding-bottom: 128px;">
            <div class="col-md-4">
                <div class="px-4 py-5 py-md-0">
                    <div class="text-center">
                        <material-icon
                            icon="cloud"
                            size="xl"
                            color="white"
                            class="border p-3 rounded mb-5"
                        />

                        <h2 class="font-weight-bold">Cloud Convenience</h2>
                        <p>
                            Thanks to our secure cloud infrastructure, you can access your maintenance
                            records from anywhere with an internet connection.
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="px-4 py-5 py-md-0">
                    <div class="text-center">
                        <material-icon
                            icon="directions_car"
                            size="xl"
                            color="white"
                            class="border p-3 rounded mb-5"
                        />

                        <h2 class="font-weight-bold">Track By Vehicle</h2>

                        <p>Track maintenance for each vehicle individually. Whether you have 1 car or a fleet of 100 each vehicle will have it's own dedicated service history.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4 ">
                <div class="px-4 py-5 py-md-0">
                    <div class="text-center">
                        <material-icon
                            icon="attach_money"
                            size="xl"
                            color="white"
                            class="border p-3 rounded mb-5"
                        />

                        <h2 class="font-weight-bold">Save Money</h2>

                        <p>
                            Well maintained vehicles have a lower cost of ownership. Never forget the last time
                            a service was performed, or if you're due for maintenance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';

@Component({
    name: 'feature-component',
    components: {
        MaterialIcon,
    },
})
export default class NewComponent extends Vue {}
</script>