<template>
    <div>
        <!-- Breadcrumb trail -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white">
                <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
        </nav>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import PrivateMasterPage from "@/core/components/private/private-master-page.vue";

/**
 * Dashboard page of the app.
 */
@Component({
    components: {
        PrivateMasterPage
    }
})
export default class Dashboard extends Vue {}
</script>