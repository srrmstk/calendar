<template>
  <v-container>
    <v-expansion-panels>
      <v-card-text v-if="tasks.length === 0">
        Ничего не запланировано!
      </v-card-text>
      <Task :key="task.id" v-for="task of tasks" :task="task" />
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Task from "@/components/Task.vue";

export default Vue.extend({
  name: "TaskList",
  components: { Task },
  data: () => ({
    tasks: [],
  }),
  beforeMount() {
    this.fetchTasks();
    this.$store.subscribe(() => {
      this.fetchTasks();
    });
  },
  methods: {
    fetchTasks() {
      this.tasks = this.$store.getters.eventsByDate;
    },
  },
});
</script>
