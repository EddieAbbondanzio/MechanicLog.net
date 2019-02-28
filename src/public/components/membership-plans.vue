<style lang="scss" scoped>
.pricing-container {
    padding-top: 128px;
    padding-bottom: 128px;
}
</style>


<template>
    <div class="container-fluid mx-0 px-0">
        <div class="row" style="padding-top: 128px; padding-bottom: 64px;">
            <div class="col-12 text-center">
                <h1 class="display-3 d-inline-block">Plans</h1>
            </div>
        </div>

        <div class="row" style="padding-bottom: 128px;">
            <div class="col-md-4">
                <div class="px-4 py-5 py-md-0">
                    <div class="text-center">
                        <h2 class="text-dark display-4">Trial</h2>

                        <h1 class="display-2 text-success d-inline-block">$0</h1>
                        <h3 class="d-inline-block">/60 days</h3>
                    </div>

                    <div class="text-muted text-center">
                        <p
                            style="min-height: 64px;"
                        >For an individual looking for a better way to track vehicle maintenance. No cost, no commitment.</p>

                        <div class="d-inline-block">
                            <ul class="list-unstyled text-left pb-4">
                                <li>
                                    <i class="material-icons text-success">check</i>
                                    1 Vehicle
                                </li>
                                <li>
                                    <i class="material-icons text-success">check</i>
                                    Maintenance Log
                                </li>
                            </ul>

                            <router-link to="/register">
                                <button class="btn btn-primary btn-lg">Sign Up</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="px-4 py-5 py-md-0">
                    <div class="text-center">
                        <h2 class="text-dark display-4">Standard</h2>

                        <h1 class="display-2 text-primary d-inline-block">$11.99</h1>
                        <h3 class="d-inline-block">/year</h3>
                    </div>

                    <div class="text-muted text-center">
                        <p
                            style="min-height: 64px;"
                        >For an individual who wants to track their vehicle maintenance in one easy to use location.</p>

                        <div class="d-inline-block">
                            <ul class="list-unstyled text-left pb-4">
                                <li>
                                    <i class="material-icons text-success">check</i>
                                    1 Vehicle
                                </li>
                                <li>
                                    <i class="material-icons text-success">check</i>
                                    Maintenance Log
                                </li>
                            </ul>

                            <router-link to="/register">
                                <button class="btn btn-primary btn-lg">Sign Up</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="px-4 py-5 py-md-0">
                    <div class="text-center">
                        <h2 class="text-dark display-4">Premium</h2>

                        <h1 class="display-2 text-primary d-inline-block">$24.99</h1>
                        <h3 class="d-inline-block">/year</h3>
                    </div>

                    <div class="text-muted text-center">
                        <p
                            style="min-height: 64px;"
                        >For an individual, or family with multiple vehicles.</p>

                        <div class="d-inline-block">
                            <ul class="list-unstyled text-left pb-4">
                                <li>
                                    <i class="material-icons text-success">check</i>
                                    4 Vehicles
                                </li>
                                <li>
                                    <i class="material-icons text-success">check</i>
                                    Maintenance Log
                                </li>
                            </ul>

                            <router-link to="/register">
                                <button class="btn btn-primary btn-lg">Sign Up</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--         
        <div class="col-8 offset-2">
            <div class="col-12 text-center">
                <h1 class="display-3 d-inline-block">Pricing</h1>
            </div>

            <div class="card-deck">
                <div class="card">
                    <div class="card-header bg-success text-light text-center">
                        <h2>Trial</h2>
                    </div>
                    <div class="card-body">
                        <div class="card-title text-center">
                            <h1 class="display-2 text-success d-inline-block">$0</h1>
                            <h3 class="d-inline-block">for 60 days</h3>
                        </div>

                        <div class="card-text">
                            <p>For an individual looking for a better way to track vehicle maintenance. No cost, no commitment.</p>

                            <ul class="list-unstyled">
                                <li>
                                    <i class="material-icons text-success">check</i>
                                    1 Vehicle
                                </li>
                                <li>
                                    <i class="material-icons text-success">check</i>
                                    Maintenance Log
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-footer py-4 text-center bg-white border-top-0">
                        <button class="btn btn-primary btn-lg w-50">Sign Up</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header bg-primary text-light text-center">
                        <h2>Standard</h2>
                    </div>
                    <div class="card-body">
                        <div class="card-title text-center">
                            <h1 class="display-2 text-primary d-inline-block">$11.99</h1>
                            <h3 class="d-inline-block">/yr</h3>
                        </div>
                        <p
                            class="card-text"
                        >For an individual who wants to track their vehicle maintenance in one easy to use location.</p>

                        <ul class="list-unstyled">
                            <li>
                                <i class="material-icons text-success">check</i>
                                1 Vehicle
                            </li>
                            <li>
                                <i class="material-icons text-success">check</i>
                                Maintenance Log
                            </li>
                        </ul>
                    </div>
                    <div class="card-footer py-4 text-center bg-white border-top-0">
                        <button class="btn btn-primary btn-lg w-50">Sign Up</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header bg-primary text-light text-center">
                        <h2>Premium</h2>
                    </div>
                    <div class="card-body">
                        <div class="card-title text-center">
                            <h1 class="display-2 text-primary d-inline-block">$24.99</h1>
                            <h3 class="d-inline-block">/yr</h3>
                        </div>
                        <p class="card-text">For an individual, or family with multiple vehicles.</p>

                        <ul class="list-unstyled">
                            <li>
                                <i class="material-icons text-success">check</i>
                                4 Vehicles
                            </li>
                            <li>
                                <i class="material-icons text-success">check</i>
                                Maintenance Log
                            </li>
                        </ul>
                    </div>
                    <div class="card-footer py-4 text-center bg-white border-top-0">
                        <button class="btn btn-primary btn-lg w-50">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'membership-plans',
})
export default class MembershipPlans extends Vue {}
</script>