<template>
    <div class="row">
        <div class="col-12">
            <div style="position: relative">
                <img src="@/assets/hero.png" style="width: 100%;">

                <div
                    class="text-white"
                    style="position: absolute; left: 10%; top: 20%; right: 10%;"
                >
                    <h1 class="pb-3 font-weight-bold display-1">Simple, and Elegant</h1>
                    <h3>
                        Vehicle maintenance logging made easy. Never lose a receipt, or forget when a service was performed again. MechanicLog
                        helps keep all vehicle maintenance records in one location. And if you ever need to warranty out a part, you'll
                        know where to find the receipt.
                    </h3>

                    <!-- Call to action buttons -->
                    <div class="mt-5">
                        <router-link to="/login">
                            <button type="button" class="btn btn-primary btn-lg mr-2" to="/login">Login</button>
                        </router-link>
    
                        <router-link to="/register">
                            <button type="button" class="btn btn-warning btn-lg ml-2">Sign Up</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * Large hero image for showing something off.
 */
@Component({
    name: 'hero',
})
export default class Hero extends Vue {}
</script>