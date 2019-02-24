<style lang="scss" scoped>
.navigation-button {
    height: 40px;
}
</style>


<template>
    <div class="text-center">
        <b-btn class="mr-1 navigation-button" variant="success" @click="previous" :disabled="disablePrevious">
            <material-icon class="align-middle" icon="navigate_before"/>
            <span class="align-bottom">Previous</span>
        </b-btn>
        <b-btn class="mr-1 navigation-button" variant="success" @click="next" :disabled="disableNext">
            <span class="align-bottom">Next</span>
            <material-icon class="align-middle" icon="navigate_next"/>
        </b-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';

@Component({
    name: 'previous-next',
    components: {
        MaterialIcon,
    },
})
export default class PreviousNext extends Vue {
    /**
     * If the next button should be disabled.
     */
    @Prop()
    public disableNext!: boolean;

    /**
     * If the previous button should be disabled.
     */
    @Prop()
    public disablePrevious!: boolean;

    /**
     * Event handler to go to the next page.
     */
    protected next(): void {
        this.$emit('next');
    }

    /**
     * Event handler to go back to the previous page.
     */
    protected previous(): void {
        this.$emit('previous');
    }
}
</script>