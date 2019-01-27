<template>
  <div class="form-group text-danger" v-if="form.errors.all().length > 0">
    <!-- Header -->
    <span
      class="font-weight-bold"
    >{{ form.errors.all().length > 1 ? 'The following errors exist:' : 'The following error exists:' }}</span>

    <ul>
      <li v-for="error in form.errors.all()" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormContainer from '@/core/components/form/form-container.vue';

/**
 * List of errors wrong with the parent form.
 */
@Component({
  name: 'form-error-list',
})
export default class FormErrorList extends Vue {
  @Prop()
  public form!: FormContainer;
}
</script>