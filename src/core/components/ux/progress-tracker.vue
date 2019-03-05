<style lang="scss" scoped>
.step-label {
    font-size: 0.9em;
}
</style>

<template>
    <div>
        <span class="text-muted step-label">Step {{ current }} of {{ max }}</span>

        <b-progress class="mt-2" :max="max">
            <b-progress-bar :value="current" variant="primary"/>
        </b-progress>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * UX component that allows for tracking progress
 */
@Component({
    name: 'progress-tracker',
})
export default class ProgressTracker extends Vue {
    /**
     * The current step.
     */
    @Prop()
    public current!: number;

    /**
     * The max number of steps.
     */
    @Prop()
    public max!: number;
}
</script>