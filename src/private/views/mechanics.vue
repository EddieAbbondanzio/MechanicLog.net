<template>
    <div class="container-fluid px-0">
        <garage-bar>
            <div class="d-inline-block pb2 pb-sm-0 pr-2">
                <b-btn variant="success" style="height: 40px" @click="onAddClick">
                    <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                    <span style="vertical-align: middle;">Add Mechanic</span>
                </b-btn>
            </div>
        </garage-bar>

        <error-popup ref="errorPopup"/>
        <add-mechanic-popup ref="addPopup" @add="onMechanicAdd"/>

        <!-- Header -->
        <div class="row pt-3">
            <div class="col-12 col-lg-6">
                <p
                    class="text-muted py-2 px-4"
                    style="font-size: 1.25em;"
                >Mechanics, shops, or dealerships that work on your vehicles.</p>
            </div>
        </div>

        <!-- Table Header -->
        <div class="row">
            <div class="col-12 pb-2">
                <span class="text-muted">MECHANICS</span>
            </div>
        </div>

        <!-- Column Headers -->
        <div class="row pb-2">
            <div class="col-10 col-lg-11">
                <div class="row">
                    <div class="col-3 col-lg-2">
                        <span>Name</span>
                    </div>

                    <div class="col-2 col-lg-1">
                        <span>Type</span>
                    </div>

                    <div class="col-3 col-lg-2">
                        <span>Phone</span>
                    </div>

                    <div class="col-4 col-lg-3">
                        <span>Address</span>
                    </div>

                    <div class="col-2 d-none d-lg-block">
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
                    @edit="onMechanicEdit"
                    @delete="onMechanicDelete"
                    @error="onError"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MechanicSummary from '@/vehicle-system/mechanic/components/mechanic-summary.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';
import { MechanicMixin } from '@/vehicle-system/mechanic/mechanic-mixin';
import { HttpError } from '@/core/http/service-error';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import AddMechanicPopup from '@/vehicle-system/mechanic/components/add-mechanic-popup.vue';
import GarageBar from '@/vehicle-system/components/garage-bar.vue';

/**
 * List of all the mechanics the user has.
 */
@Component({
    name: 'new-component',
    components: {
        AddMechanicPopup,
        MechanicSummary,
        ErrorPopup,
        MaterialIcon,
        GarageBar,
    },
})
export default class Mechanics extends MechanicMixin {
    /**
     * References to children components.
     */
    public $refs!: {
        addPopup: AddMechanicPopup;
        errorPopup: ErrorPopup;
    };

    /**
     * The mechanics to render
     */
    public mechanics: Mechanic[] = [];

    /**
     * On page load go out and try to get all of the mechanics from the backend.
     */
    public async mounted(): Promise<void> {
        (await this.$mechanicStore.getMechanics()).do(
            async (mechanics) => {
                this.mechanics = mechanics;
            },
            async (error) => {
                this.mechanics = [];
            }
        );
    }

    public onAddClick(): void {
        this.$refs.addPopup.show();
    }

    /**
     * On an new add, force an update of the screen.
     */
    public async onMechanicAdd(mechanic: Mechanic): Promise<void> {
        const result = await this.$mechanicStore.addMechanic(mechanic);

        // Errored out.
        if (result.hasSome()) {
            this.$refs.errorPopup.message = result.getSome().message;
        }

        this.$forceUpdate();
    }

    /**
     * On an update, force an update of the screen.
     */
    public async onMechanicEdit(mechanic: Mechanic): Promise<void> {
        this.$forceUpdate();
    }

    /**
     * On delete, force an update of the screen.
     */
    public async onMechanicDelete(mechanic: Mechanic): Promise<void> {
        this.$forceUpdate();
    }

    /**
     * On an error, display it to the user.
     */
    public onError(error: HttpError) {
        this.$refs.errorPopup.show(error.message);
    }
}
</script>