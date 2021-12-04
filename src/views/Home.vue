<template>
  <v-container>
    <v-row>
      <v-col class="ma-4 d-flex align-center flex-column">
        <Calendar />
        <v-btn @click="addTask">Добавить</v-btn>
      </v-col>
      <v-col>
        <TaskList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Calendar from "@/components/Calendar.vue";
import TaskList from "@/components/TaskList.vue";

export default Vue.extend({
  name: "Home",
  components: {
    TaskList,
    Calendar,
  },
  mounted() {
    this.$store.dispatch("fetchEvents");
  },
  methods: {
    addTask() {
      this.$router.push("/constructor");
    },
  },
});
</script>
