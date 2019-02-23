<template>
    <forgot-password-form @submit="onFormSubmit"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ForgotPasswordForm from '@/user-system/components/forgot-password-form.vue';
import { UserMixin } from '@/user-system/mixins/user-mixin';

@Component({
    components: {
        ForgotPasswordForm,
    },
})
export default class Forgot extends Vue {
    /**
     * Event handler for when the form is submitted.
     */
    public async onFormSubmit(email: string): Promise<void> {
        this.$router.push({ name: 'reset' });
    }
}
</script>