<template>
    <div class="text-center">
        <h1 class="py-5">Sorry! The page you're looking for cannot be found.</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'new-component',
})
export default class NotFound extends Vue {}
</script>