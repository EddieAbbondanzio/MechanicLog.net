<template>
    <div class="pb-3">
        <h1>{{ title }}</h1>
        <hr>
        <p class="text-muted" v-if="description != null">{{ description }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * Header that can have a description.
 */
@Component({
    name: 'form-header',
})
export default class FormHeader extends Vue {
    /**
     * The title of the header.
     */
    @Prop()
    public title!: string;

    /**
     * The description for more info.
     */
    @Prop()
    public description?: string;
}
</script>