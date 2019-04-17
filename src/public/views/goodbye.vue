<template>
    <div>
        <form-container title="Goodbye!">
            <h3 class="text-center pb-5">Thank you for using MechanicLog.net!</h3>
        </form-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormContainer from '@/core/components/form/form-container.vue';
import { UserMixin } from '../../user-system/user-mixin';
import { EventBus } from '../../core/event/event-bus';

@Component({
    name: 'new-component',
    components: {
        FormContainer,
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