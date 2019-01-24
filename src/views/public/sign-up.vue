<template>
  <master-page>
    <sign-up-form />
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MasterPage from '@/core/components/master-page.vue';
import SignUpForm from '@/user-system/components/sign-up-form.vue';

@Component({
  components: {
    MasterPage,
    SignUpForm,
  },
})
export default class SignUp extends Vue { }
</script>