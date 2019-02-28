<style lang="scss">
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.mechanic-summary {
    // cursor: pointer;

    // &:hover {
    //     background-color: $gray-200;
    //     color: $gray-900 !important;
    // }

    // &:active {
    //     background-color: $gray-300;
    // }

    span {
        line-height: 39px;
    }

    .mechanic-options-button {
        cursor: pointer;
        text-decoration: none !important;

        &:hover {
            background-color: $gray-200;
        }
        &:active {
            background-color: $gray-300;
        }
    }
}
</style>

<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="text-muted mechanic-summary col-10 col-lg-11">
                        <div class="row">
                            <div class="col-4 col-lg-2 py-2">
                                <span>{{ mechanic.name }}</span>
                            </div>

                            <div class="col-4 col-lg-2 py-2">
                                <span>{{ mechanic.phone }}</span>
                            </div>

                            <div class="col-4 col-lg-3 py-2">
                                <span>{{ mechanic.address }}</span>
                            </div>

                            <div class="col-3 d-none d-lg-block py-2">
                                <span>{{ mechanic.city }}</span>
                            </div>

                            <div class="col-1 d-none d-lg-block py-2">
                                <span>{{ mechanic.state }}</span>
                            </div>

                            <div class="col-1 d-none d-lg-block py-2">
                                <span>{{ mechanic.zip }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- More Options Button -->
                    <div
                        class="col-2 col-lg-1 py-2 vehicle-options-button text-center d-table align-middle"
                    >
                        <div class="d-table-cell">
                            <b-dropdown variant="link" no-caret ref="optionsDropDown">
                                <div slot="button-content">
                                    <material-icon
                                        icon="more_vert"
                                        size="md"
                                        color="dark"
                                        class="align-middle"
                                    />
                                </div>

                                <b-dropdown-item href="#" @click="onEditClick">Edit</b-dropdown-item>
                                <b-dropdown-item
                                    href="#"
                                    class="text-danger"
                                    @click="onDeleteClick"
                                >Delete</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <hr class="my-0 py-0">
            </div>
        </div>

        <delete-mechanic-confirm-popup ref="deletePopup" @delete="onDelete"/>
        <edit-mechanic-popup ref="editPopup" :mechanic="mechanic" @edit="onEdit"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';
import EditMechanicPopup from '@/vehicle-system/mechanic/components/edit-mechanic-popup.vue';
import DeleteMechanicConfirmPopup from '@/vehicle-system/mechanic/components/delete-mechanic-confirm-popup.vue';
import { MechanicMixin } from '@/vehicle-system/mechanic/mechanic-mixin';

/**
 * Summary of a individual mechanic.
 */
@Component({
    name: 'mechanic-summary',
    components: {
        MaterialIcon,
        EditMechanicPopup,
        DeleteMechanicConfirmPopup,
    },
})
export default class MechanicSummary extends MechanicMixin {
    /**
     * The mechanic to display.
     */
    @Prop()
    public mechanic!: Mechanic;

    /**
     * Event handler for when the user wants to edit the mechanic.
     */
    protected async onEditClick(): Promise<void> {
        (this.$refs.editPopup as any).show();
    }

    /**
     * Event handler for when the user wants to delete the mechanic.
     */
    protected async onDeleteClick(): Promise<void> {
        (this.$refs.deletePopup as any).show();
    }

    /**
     * Event handler for when the user has finished editing the mechanic.
     */
    protected async onEdit(newMechanic: Mechanic): Promise<void> {
        const taskResult = await this.$mechanicStore.updateMechanic(newMechanic);

        if (taskResult.hasSome()) {
            this.$emit('error', taskResult.getSome());
        } else {
            this.$emit('edit', newMechanic);
        }
    }

    /**
     * Event handler for when the user has finished deleting the mechanic.
     */
    protected async onDelete(): Promise<void> {
        await this.$mechanicStore.deleteMechanic(this.mechanic);
        this.$emit('delete', this.mechanic);
    }
}
</script>
