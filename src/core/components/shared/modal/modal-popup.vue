<template>
    <div
        class="modal fade"
        :id="id"
        tabindex="-1"
        role="dialog"
        :aria-labelledby="id + '-title'"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <!-- Header Banner -->
                <div class="modal-header">
                    <h5 class="modal-title" :id="id + '-title'">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * Popup window modal that can be used to really attract the user's
 * attention.
 */
@Component({
    name: 'modal-popup',
})
export default class ModalPopup extends Vue {
    /**
     * The unique name of the popup.
     */
    @Prop()
    public id!: string;

    /**
     * The header text of the popup.
     */
    @Prop()
    public title!: string;
}
</script>