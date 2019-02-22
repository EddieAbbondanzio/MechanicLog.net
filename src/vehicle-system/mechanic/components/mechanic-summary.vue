<style lang="scss">
@import './public/bootstrap/_functions.scss';
@import './public/bootstrap/_variables.scss';

.mechanic-summary {
    cursor: pointer;

    &:hover {
        background-color: $gray-200;
        color: $gray-900 !important;
    }

    &:active {
        background-color: $gray-300;
    }

    span {
        line-height: 39px;
    }
}
</style>

<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="text-muted mechanic-summary col-10 col-lg-11">
                        <div class="row">
                            <div class="col-4 col-lg-2 py-2">
                                <span>{{ mechanic.name }}</span>
                            </div>

                            <div class="col-4 col-lg-2 py-2">
                                <span>{{ mechanic.phone }}</span>
                            </div>

                            <div class="col-4 col-lg-3 py-2">
                                <span>{{ mechanic.address }}</span>
                            </div>

                            <div class="col-3 d-none d-lg-block py-2">
                                <span>{{ mechanic.city }}</span>
                            </div>

                            <div class="col-1 d-none d-lg-block py-2">
                                <span>{{ mechanic.state }}</span>
                            </div>

                            <div class="col-1 d-none d-lg-block py-2">
                                <span>{{ mechanic.zip }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <hr class="my-0 py-0">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/shared/material-icon.vue';
import { Mechanic } from '@/vehicle-system/mechanic/entities/mechanic';

/**
 * Summary of a individual mechanic.
 */
@Component({
    name: 'mechanic-summary',
    components: {
        MaterialIcon,
    },
})
export default class MechanicSummary extends Vue {
    /**
     * The mechanic to display.
     */
    @Prop()
    public mechanic!: Mechanic;
}
</script>
