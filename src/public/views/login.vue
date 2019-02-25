
<template>
    <div>
        <login-form @login="onLogin" value="test"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthService } from '@/user-system/services/auth/auth-service';
import { User } from '@/user-system/entities/user';
import LoginForm from '@/user-system/components/login-form.vue';
import popupContainer from '@/core/components/popup/popup-container.vue';
import { ConfigState } from '@/core/store/config/config-state';
import store from '@/core/store/store';

/**
 * Login page to log in a user
 */
@Component({
    components: {
        LoginForm,
        popupContainer,
    },
})
export default class Login extends Vue {
    /**
     * On a successful login, redirect to the dashboard.
     */
    public onLogin(e: any): void {
        this.$router.push({ name: 'vehicles' });
    }
}
</script>