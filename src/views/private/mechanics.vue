<template>
    <div class="container-fluid px-0">
        <!-- Header -->
        <div class="row pt-3">
            <div class="col-12 col-lg-6">
                <p class="text-muted py-2 px-4" style="font-size: 1.25em;">
                    Mechanics, shops, or dealerships that work on your vehicles.
                </p>
            </div>

            <div class="col-12 col-lg-6">
                <div class="float-right d-inline-block">
                    <div class="d-inline-block pb2 pb-sm-0 pr-2">
                        <add-mechanic-form/>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table Header -->
        <div class="row">
            <div class="col-12 pb-2">
                <!-- <hr style="height: 4px; border: none;" class="bg-light"> -->
                <span class="text-muted">MECHANICS</span>
            </div>
        </div>

        <!-- Column Headers -->
        <div class="row pb-2">
            <div class="col-10 col-lg-11">
                <div class="row">
                    <div class="col-4 col-lg-2">
                        <span>Name</span>
                    </div>

                    <div class="col-4 col-lg-2">
                        <span>Phone</span>
                    </div>

                    <div class="col-4 col-lg-3">
                        <span>Address</span>
                    </div>

                    <div class="col-3 d-none d-lg-block">
                        <span>City</span>
                    </div>

                    <div class="col-1 d-none d-lg-block">
                        <span>State</span>
                    </div>

                    <div class="col-1 d-none d-lg-block">
                        <span>Zip</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 py-0 my-0">
                <hr class="my-0 py-0 bg-secondary" style="height 4px;">
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <mechanic-summary
                    v-for="mechanic in mechanics"
                    :mechanic="mechanic"
                    :key="mechanic.name"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import AddMechanicForm from '@/vehicle-system/mechanic/components/add-mechanic-form.vue';
import MechanicSummary from '@/vehicle-system/mechanic/components/mechanic-summary.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';
import { MechanicMixin } from '@/vehicle-system/mechanic/mixins/mechanic-mixin';

@Component({
    name: 'new-component',
    components: {
        AddMechanicForm,
        MechanicSummary,
    },
})
export default class Mechanics extends MechanicMixin {
    public mechanics: Mechanic[] = [];

    public async mounted(): Promise<void> {
        this.mechanics = await this.$getMechanics();
    }
}
</script>