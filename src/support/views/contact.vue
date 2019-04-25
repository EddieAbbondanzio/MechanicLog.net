<template>
    <b-container fluid class="h-100 d-flex flex-column py-5">
        <b-row align-h="center">
            <b-col cols="12" sm="8" md="6" lg="4">
                <contact-form/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ContactForm from '@/support/components/contact-form.vue';

@Component({
    name: 'new-component',
    components: {
        ContactForm,
    },
})
export default class Contact extends Vue {}
</script>