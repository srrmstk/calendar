<template>
  <v-row>
    <v-date-picker @change="setDate" v-model="date" no-title locale="ru-RU" />
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Calendar",
  data() {
    return {
      date: "",
    };
  },
  methods: {
    setDate() {
      this.$store.dispatch("setDate", this.date);
    },
  },
});
</script>
