<template>
  <div class="form-group text-danger" v-if="$parent.errors.all().length > 0">
    <!-- Header -->
    <h5>{{ $parent.errors.all().length > 1 ? 'The following errors exist:' : 'The following error exists:' }}</h5>

    <ul>
      <li v-for="error in $parent.errors.all()" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * List of errors wrong with the parent form.
 */
@Component({
  name: 'form-error-list',
})
export default class FormErrorList extends Vue { }
</script>