<style lang="scss">
@import "./public/bootstrap/_functions";
@import "./public/bootstrap/_variables";

.side-bar-button {
    cursor: pointer;
    height: 46px;

    & span,
    i {
        vertical-align: middle;
    }

    & span {
        font-size: 1.25em;
    }

    &:hover {
        background-color: $gray-200;
    }

    &:active {
        background-color: $gray-300;
    }

    .router-link-active:after {
        content: "";
        display: block;
        width: 110%;
        margin-left: -5px;
        margin-top: 4px;
        height: 4px;
        background-color: $primary;
        vertical-align: bottom;
    }
}

.side-bar-active-indicator {
    float: left;
    width: 4px;
    height: 100%;
}
</style>

<template>
    <div class="side-bar-button" @click="onClick">
        <!-- Active State -->
        <div v-if="isActive()" class="h-100" style>
            <div class="side-bar-active-indicator bg-primary">&nbsp;</div>

            <div class="ml-3" style="padding-top: 8px; padding-bottom: 8px;">
                <material-icon :icon="icon" size="md" color="dark" class="pr-2"/>
                <span class="text-dark">{{ name }}</span>
            </div>
        </div>
        <!-- Passive State -->
        <div v-else class="h-100">
            <div class="side-bar-active-indicator">&nbsp;</div>

            <div class="ml-3" style="padding-top: 8px; padding-bottom: 8px;">
                <material-icon :icon="icon" size="md" color="muted" class="pr-2"/>
                <span class="text-muted">{{ name }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import MaterialIcon from "@/core/components/shared/material-icon.vue";

@Component({
    name: "side-bar-button",
    components: {
        MaterialIcon
    }
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
        // What a hack
        if (this.route === "vehicles") {
            return (
                this.$route.name === "vehicles" ||
                this.$route.name === "mechanics"
            );
        } else {
            return this.$route.name === this.route;
        }
    }

    /**
     * On click event handler.
     */
    public async onClick(): Promise<void> {
        this.$router.push({ name: this.route });
    }
}
</script>