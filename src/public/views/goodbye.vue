<template>
    <b-container fluid class="h-100 d-flex flex-column py-5">
        <b-row align-h="center" class="h-100">
            <b-col cols="12" sm="8" md="6" lg="4" class="h-100">
                <card-container class="p-3">
                    <div class="text-center" slot="header">
                        <h1>Goodbye</h1>
                    </div>

                    <h3 class="text-center pb-5">Thank you for using MechanicLog.net!</h3>
                </card-container>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserMixin } from '../../user-system/user-mixin';
import { EventBus } from '../../core/event/event-bus';
import CardContainer from '@/core/components/cards/card-container.vue';

@Component({
    name: 'new-component',
    components: {
        CardContainer,
    },
})
export default class Goodbye extends UserMixin {
    public async created() {
        EventBus.emit('loading');
        this.$userStore.logout();
        EventBus.emit('loaded');
    }
}
</script>