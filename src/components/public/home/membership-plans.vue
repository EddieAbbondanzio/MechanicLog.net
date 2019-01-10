<template>
  <div class="row py-5">
    <div class="col-8 offset-2">
      <h1>Membership Plans</h1>

      <div class="card-deck">
        <div class="card">
          <div class="card-header bg-success text-light text-center">
            <h2>Trial</h2>
          </div>
          <div class="card-body">
            <!-- Pricing -->
            <div class="card-title text-center">
              <h1 class="display-1 text-success d-inline-block">$0</h1>
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
          <!-- Sign Up -->
          <div class="card-footer py-4 text-center bg-white border-top-0">
            <button class="btn btn-warning btn-lg w-50">Sign Up</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header bg-primary text-light text-center">
            <h2>Standard</h2>
          </div>
          <div class="card-body">
            <!-- Pricing -->
            <div class="card-title text-center">
              <h1 class="display-1 text-primary d-inline-block">$1.99</h1>
              <h3 class="d-inline-block">/mo</h3>
            </div>
            <p class="card-text">
                For an individual who wants to track their vehicle maintenance in one easy to use location.
            </p>

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
          <!-- Sign Up -->
          <div class="card-footer py-4 text-center bg-white border-top-0">
            <button class="btn btn-warning btn-lg w-50">Sign Up</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header bg-primary text-light text-center">
            <h2>Premium</h2>
          </div>
          <div class="card-body">
            <!-- Pricing -->
            <div class="card-title text-center">
              <h1 class="display-1 text-primary d-inline-block">$3.99</h1>
              <h3 class="d-inline-block">/mo</h3>
            </div>
            <p class="card-text">
                For an individual, or family with multiple vehicles. 
            </p>

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
          <!-- Sign Up -->
          <div class="card-footer py-4 text-center bg-white border-top-0">
            <button class="btn btn-warning btn-lg w-50">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'membership-plans',
})
export default class MembershipPlans extends Vue {
}
</script>