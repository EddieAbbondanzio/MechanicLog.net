<template>
    <page-content>
        <error-popup ref="errorPopup"/>
        <add-mechanic-popup ref="addPopup" @add="onMechanicAdd"/>
        <edit-mechanic-popup ref="editPopup" @edit="onEdit"/>
        <delete-mechanic-confirm-popup ref="deletePopup" @delete="onDelete"/>

        <div
            slot="tool-bar"
            class="d-flex flex-row align-items-center justify-content-between w-100"
        >
            <div>
                <span class="text-muted">Garage > Mechanics</span>
            </div>
        </div>

        <card-container style="height: auto!important;">
            <div class="pb-3 clearfix">
                <h2 class="float-left">Mechanics</h2>

                <b-btn
                    variant="success"
                    class="float-right"
                    style="height: 40px"
                    @click="onAddClick"
                >
                    <material-icon icon="add" size="md" style="vertical-align: bottom;"/>
                    <span style="vertical-align: middle;">Add Mechanic</span>
                </b-btn>
            </div>

            <b-table :fields="columnNames" :items="mechanics" :busy="isLoading">
                <template slot="name" slot-scope="row">{{ row.value }}</template>
                <template slot="type" slot-scope="row">{{ row.value }}</template>
                <template slot="phone" slot-scope="row">{{ row.value }}</template>
                <template slot="address" slot-scope="row">{{ row.value }}</template>
                <template slot="city" slot-scope="row">{{ row.value }}</template>
                <template slot="state" slot-scope="row">{{ row.value }}</template>
                <template slot="zip" slot-scope="row">{{ row.value }}</template>
                <template slot="options" slot-scope="row">
                    <span>{{ row.value }}</span>
                </template>
                <template slot="options" slot-scope="row">
                    <b-dropdown no-caret variant="link" class="maintenance-options">
                        <div slot="button-content">
                            <material-icon
                                icon="more_vert"
                                color="muted"
                                size="md"
                                class="align-middle m-0 p-0"
                            />
                        </div>
                        <b-dropdown-item href="#" @click="onEditClick(row.item.id)">Edit</b-dropdown-item>
                        <b-dropdown-item
                            href="#"
                            class="text-danger"
                            @click="onDeleteClick(row.item.id)"
                        >Delete</b-dropdown-item>
                    </b-dropdown>
                </template>
            </b-table>
        </card-container>
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
import CardContainer from '@/core/components/cards/card-container.vue';
import { ServiceError } from '@/core/common/errors/service-error';
import PageContent from '@/private/components/layout/page-content.vue';
import { EventBus } from '@/core/event/event-bus';
import { MechanicType } from '@/vehicle-system/mechanic/entities/mechanic-type';
import EditMechanicPopup from '@/vehicle-system/mechanic/components/edit-mechanic-popup.vue';
import DeleteMechanicConfirmPopup from '@/vehicle-system/mechanic/components/delete-mechanic-confirm-popup.vue';
import { Nullable } from '@/core/common/monads/nullable';

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
        CardContainer,
        PageContent,
        EditMechanicPopup,
        DeleteMechanicConfirmPopup,
    },
})
export default class Mechanics extends MechanicMixin {
    public readonly columnNames = [
        { key: 'name', label: 'Name', class: 'align-middle', sortable: true },
        { key: 'type', label: 'Type', class: 'align-middle', sortable: true, formatter: (val: MechanicType) => MechanicType[val] },
        { key: 'phone', label: 'Phone', class: 'align-middle' },
        { key: 'address', label: 'Address', class: 'align-middle' },
        { key: 'city', label: 'City', class: 'align-middle' },
        { key: 'state', label: 'State', class: 'align-middle' },
        { key: 'zip', label: 'Zip', class: 'align-middle' },
        { key: 'options', label: 'Options', class: 'align-middle' },
    ];

    /**
     * References to children components.
     */
    public $refs!: {
        addPopup: AddMechanicPopup;
        errorPopup: ErrorPopup;
        editPopup: EditMechanicPopup;
        deletePopup: DeleteMechanicConfirmPopup;
    };

    /**
     * The mechanics to render
     */
    public mechanics: Mechanic[] = [];

    public editMechanic: Nullable<Mechanic> = null;

    public isLoading: boolean = false;

    public deleteId: number = -1;

    /**
     * On page load go out and try to get all of the mechanics from the backend.
     */
    public async mounted(): Promise<void> {
        EventBus.emit('loading');
        this.mechanics = await this.$mechanicStore.getMechanics();
        EventBus.emit('loaded');
    }

    public onAddClick(): void {
        this.$refs.addPopup.show();
    }

    /**
     * On an new add, force an update of the screen.
     */
    public async onMechanicAdd(mechanic: Mechanic): Promise<void> {
        EventBus.emit('loading');
        this.isLoading = true;
        const result = await this.$mechanicStore.addMechanic(mechanic);
        this.isLoading = false;
        EventBus.emit('loaded');
        this.$forceUpdate();
    }

    public onEditClick(id: number) {
        this.$refs.editPopup.show(this.mechanics.find((m) => m.id === id)!);
    }

    /**
     * Event handler for when the user has finished editing the mechanic.
     */
    protected async onEdit(newMechanic: Mechanic): Promise<void> {
        await this.$mechanicStore.updateMechanic(newMechanic);
    }

    protected async onDeleteClick(id: number) {
        this.deleteId = id;
        this.$refs.deletePopup.show();
    }

    /**
     * Event handler for when the user has finished deleting the mechanic.
     */
    protected async onDelete(): Promise<void> {
        try {
            EventBus.emit('loading');
            this.isLoading = true;
            await this.$mechanicStore.deleteMechanic(this.mechanics.find((m) => m.id === this.deleteId)!);
        } catch (error) {
            this.$refs.errorPopup.show(error.message);
        }

        this.isLoading = false;
        EventBus.emit('loaded');
    }

    /**
     * On an error, display it to the user.
     */
    public onError(error: Error) {
        this.$refs.errorPopup.show(error.message);
    }
}
</script>