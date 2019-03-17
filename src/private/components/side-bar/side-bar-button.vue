<style lang="scss">
@import './public/bootstrap/_functions';
@import './public/bootstrap/_variables';

.side-bar-button {
    cursor: pointer;
    // height: 46px;

    & span,
    i {
        vertical-align: middle;
    }

    & span {
        font-size: 1.25em;
    }

    div:hover {
        background-color: $gray-200;
    }

    div:active {
        background-color: $gray-300;
    }
}
</style>

<template>
    <div class="side-bar-button" @click="onClick">
        <!-- Active State -->
        <div v-if="isActive()" class="h-100 p-2 rounded">
            <span class="text-dark">{{ name }}</span>
        </div>
        <!-- Passive State -->
        <div v-else class="h-100 p-2 rounded">
            <span class="text-muted">{{ name }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';

@Component({
    name: 'side-bar-button',
    components: {
        MaterialIcon,
    },
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
     * If this option is currently active.
     */
    public isActive(): boolean {
        // What a hack
        return this.$route.path.indexOf(this.route) !== -1;
    }

    /**
     * On click event handler.
     */
    public async onClick(): Promise<void> {
        this.$router.push({ name: this.route });
    }
}
</script>