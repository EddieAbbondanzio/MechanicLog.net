<template>
    <div>
        <auto-complete-textbox :options="options" 
        name="test" 
        v-model="foo"
        v-validate="'required|max:3'"/>
        <input type="button" value="click me" />
        <span>{{ errors.first('test') }}</span>

        <login-form @login="onLogin" value="test"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthService } from '@/user-system/services/auth/auth-service';
import { User } from '@/user-system/entities/user';
import LoginForm from '@/user-system/components/login-form.vue';
import AutoCompleteTextbox from '@/core/components/inputs/auto-complete-textbox.vue';

/**
 * Login page to log in a user
 */
@Component({
    components: {
        LoginForm,
        AutoCompleteTextbox,
    },
})
export default class Login extends Vue {
    public foo: string = 'hi';

    public options: string[] = ['Apple', 'Banana', 'Car'];

    /**
     * On a successful login, redirect to the dashboard.
     */
    public onLogin(e: any): void {
        this.$router.push({ name: 'vehicles' });
    }
}
</script>