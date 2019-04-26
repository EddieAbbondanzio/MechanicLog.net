<template>
    <div class="d-flex flex-column">
        <div class="d-flex flex-row justify-content-between bg-primary py-5">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-lg-6 text-center">
                        <div
                            class="w-75 text-center d-inline-block d-lg-flex flex-column justify-content-center"
                        >
                            <h1
                                class="text-white display-4 text-center font-weight-bold pb-3"
                            >Vehicle Maintenance Tracking Made Easy</h1>
                            <h4 class="text-light">
                                Track every penny. Never forget if, or when a service was last done.
                                With us, you can consolidate all your vehicle records into one convenient location and access them anywhere.
                            </h4>

                            <div class="py-4">
                                <router-link to="/register">
                                    <b-btn variant="success" size="lg" class="mr-2">Get Started</b-btn>
                                </router-link>
                                <b-btn variant="outline-light" size="lg" class="ml-2">
                                    Learn More
                                    <material-icon
                                        icon="arrow_forward"
                                        size="md"
                                        color="light"
                                        style="vertical-align: middle"
                                    />
                                </b-btn>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <img
                            src="@/assets/mockup-cropped.png"
                            class="float-right"
                            style="height: 720px;"
                        >
                    </div>
                </div>
            </div>
            <!-- 
            <div class="d-flex flex-column align-items-center justify-content-center">
                <div class="w-75 text-center">
                    <h1
                        class="text-white display-4 text-center font-weight-bold pb-3"
                    >Vehicle Maintenance Tracking Made Easy</h1>
                    <h4 class="text-light">
                        Track every penny. Never forget if, or when a service was last done.
                        With us, you can consolidate all your vehicle records into one convenient location and access them anywhere.
                    </h4>

                    <div class="py-4">
                        <router-link to="/register">
                            <b-btn variant="success" size="lg" class="mr-2">Get Started</b-btn>
                        </router-link>
                        <b-btn variant="outline-light" size="lg" class="ml-2">
                            Learn More
                            <material-icon
                                icon="arrow_forward"
                                size="md"
                                color="light"
                                style="vertical-align: middle"
                            />
                        </b-btn>
                    </div>
                </div>
            </div>

            <div>
                <img src="@/assets/mockup-cropped.png" style="height: 720px;">
            </div>-->
        </div>

        <feature-showcase/>

        <membership-plans/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FeatureShowcase from '@/public/components/feature-showcase.vue';
import MembershipPlans from '@/public/components/membership-plans.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import { CookieStorage } from '../../core/cookie-storage';
import { UserMixin } from '../../user-system/user-mixin';

@Component({
    components: {
        MembershipPlans,
        MaterialIcon,
        FeatureShowcase,
    },
})
export default class Home extends UserMixin {}
</script>
