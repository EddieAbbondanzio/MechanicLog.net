<template>
    <b-container fluid class="h-100 d-flex flex-column py-5">
        <b-row align-h="center">
            <b-col cols="12" sm="8" md="6" lg="4">
                <reset-password-form @submit="onFormSubmit"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ResetPasswordForm from '@/user-system/components/reset-password-form.vue';

/**
 * Reset password page.
 */
@Component({
    components: {
        ResetPasswordForm,
    },
})
export default class Reset extends Vue {
    /**
     * Event handler to process a form submission.
     */
    public async onFormSubmit(): Promise<void> {
        this.$router.push({ name: 'login' });
    }
}
</script>