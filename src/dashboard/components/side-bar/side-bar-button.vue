<style lang="scss">
.side-bar-button {
    font-size: 27px;
}

i,
span {
    vertical-align: middle;
}
</style>

<template>
    <button
        type="button"
        :class="'btn btn-lg btn-primary btn-block text-left my-0 ' + (isActive() ? 'active' : '')"
        style="border-radius: 0px!important;"
        @click="onClick"
    >
        <i class="material-icons icon-md pr-2">{{ icon }}</i>
        <span style="vertical-align: middle;">{{ name }}</span>
    </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'side-bar-button',
})
export default class SideBarButton extends Vue {
    /**
     * The name of the button on screen.
     */
    @Prop()
    public name!: string;

    /**
     * The route the button redirects to.
     */
    @Prop()
    public route!: string;

    /**
     * The material icon code.
     */
    @Prop()
    public icon!: string;

    /**
     * If this option is currently active.
     */
    public isActive(): boolean {
        return this.$route.name === this.route;
    }

    /**
     * On click event handler.
     */
    public async onClick(): Promise<void> {
        this.$router.push({ name: this.route });
    }
}
</script>