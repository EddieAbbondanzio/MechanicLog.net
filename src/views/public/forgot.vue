<template>
  <master-page>
      <h1>FUCK OFF</h1>
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MasterPage from '@/components/shared/master-page.vue';

/**
 * Forgotten password page. Allows user's to reset their password.
 */
@Component({
  components: {
    MasterPage,
  },
})
export default class Forgot extends Vue {}
</script>
