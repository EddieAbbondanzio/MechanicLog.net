
<template>
    <div class="h-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <login-form @login="onLogin" value="test"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from '@/user-system/components/login-form.vue';
import { UserMixin } from '../../user-system/user-mixin';

/**
 * Login page to log in a user
 */
@Component({
    components: {
        LoginForm,
    },
})
export default class Login extends UserMixin {
    /**
     * On a successful login, redirect to the dashboard.
     */
    public onLogin(e: any): void {
        this.$router.push({ name: 'vehicles' });
    }
}
</script>