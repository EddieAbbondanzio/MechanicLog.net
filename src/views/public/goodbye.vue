<template>
    <div>Bye!</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'new-component',
})
export default class Goodbye extends Vue {
}
</script>