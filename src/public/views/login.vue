
<template>
    <b-container fluid class="h-100 d-flex flex-column py-5">
        <b-row align-h="center">
            <b-col cols="12" sm="8" md="6" lg="4">
                <login-form @login="onLogin" value="test"/>
            </b-col>
        </b-row>
    </b-container>
</template>
user-store
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from '@/user-system/components/login-form.vue';
/**
 * Login page to log in a user
 */
@Component({
    components: {
        LoginForm,
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