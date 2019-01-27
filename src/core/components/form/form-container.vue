<template>
  <div class="row my-5">
    <div class="col-md-8 offset-md-2 col-lg-4 offset-lg-4">
      <form class="px-3">
        <form-header :title="title" :description="description" v-if="title != null"/>
        <slot/>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormHeader from '@/core/components/form/form-header.vue';

/**
 * Wrapper for commonizing functionality of page forms.
 */
@Component({
  name: 'form-container',
  components: {
    FormHeader,
  },
})
export default class FormContainer extends Vue {
  /**
   * The title of the form.
   */
  @Prop()
  public title!: string;

  /**
   * The description below the the title.
   */
  @Prop()
  public description!: string;
}
</script>