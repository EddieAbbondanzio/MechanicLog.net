<template>
    <b-container fluid class="h-100 d-flex flex-column py-5">
        <b-row align-h="center">
            <b-col cols="12" sm="8" md="6" lg="4">
                <forgot-password-form @submit="onFormSubmit"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ForgotPasswordForm from '@/user-system/components/forgot-password-form.vue';

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
        this.$router.push({ name: 'reset', params: { email } });
    }
}
</script>