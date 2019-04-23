<template>
    <b-container fluid class="h-100 d-flex flex-column justify-content-center py-5">
        <b-row align-h="center">
            <b-col sm="8" md="6" lg="4">
                <sign-up-form @registered="onRegistered"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignUpForm from '@/user-system/components/sign-up-form.vue';

/**
 * Registration page that allows new users to sign up with the site.
 */
@Component({
    components: {
        SignUpForm,
    },
})
export default class SignUp extends Vue {
    /**
     * On a successful registration, redirect to the email confirmation page.
     */
    public onRegistered(e: any): void {
        this.$router.push({ name: 'vehicles' });
    }
}
</script>