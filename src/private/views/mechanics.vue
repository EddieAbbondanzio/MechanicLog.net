<template>
    <page-content>
        <error-popup ref="errorPopup"/>
        <add-mechanic-popup ref="addPopup" @add="onMechanicAdd"/>

        <div
            slot="tool-bar"
            class="d-flex flex-row align-items-center justify-content-between w-100"
        >
            <div>
                <span class="text-muted">Garage > Mechanics</span>
            </div>

            <b-btn variant="success" style="height: 40px" @click="onAddClick">
                <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                <span style="vertical-align: middle;">Add Mechanic</span>
            </b-btn>
        </div>

        <div class="container-fluid p-0 m-0">
            <div class="row">
                <div class="col-12">
                    <card-container>
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
                    </card-container>
                </div>
            </div>
        </div>
    </page-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MechanicSummary from '@/vehicle-system/mechanic/components/mechanic-summary.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';
import { MechanicMixin } from '@/vehicle-system/mechanic/mechanic-mixin';
import ErrorPopup from '@/core/components/popup/popups/error-popup.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import AddMechanicPopup from '@/vehicle-system/mechanic/components/add-mechanic-popup.vue';
import GarageBar from '@/vehicle-system/components/garage-bar.vue';
import CardContainer from '@/core/components/cards/card-container.vue';
import { ServiceError } from '@/core/common/errors/service-error';
import PageContent from '@/private/components/layout/page-content.vue';

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
        CardContainer,
        PageContent,
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
        this.mechanics = await this.$mechanicStore.getMechanics();
    }

    public onAddClick(): void {
        this.$refs.addPopup.show();
    }

    /**
     * On an new add, force an update of the screen.
     */
    public async onMechanicAdd(mechanic: Mechanic): Promise<void> {
        const result = await this.$mechanicStore.addMechanic(mechanic);
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
    public onError(error: Error) {
        this.$refs.errorPopup.show(error.message);
    }
}
</script>