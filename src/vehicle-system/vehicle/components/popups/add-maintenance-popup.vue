<template>
    <popup-container
        id="addMaintenance"
        ref="popup"
        title="Add Maintenance"
        size="lg"
        headerColor="primary"
    >
        <form>
            <b-card no-body border-variant="white">ahh</b-card>
        </form>
    </popup-container>
</template>

<script lang="ts">
import PopupContainer from '@/core/components/popup/popup-container.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'add-maintenance-popup',
    components: {
        PopupContainer,
    },
})
export default class AddMaintenancePopup extends Vue {
    public $refs!: {
        popup: PopupContainer;
    };

    public async show() {
        this.$refs.popup.show();
    }

    public async hide() {
        this.$refs.popup.hide();
    }
}
</script>