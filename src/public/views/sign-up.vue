<template>
    <sign-up-form @registered="onRegistered"/>
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
        this.$router.push({ name: 'home' });
    }
}
</script>