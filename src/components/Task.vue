<template>
  <v-expansion-panel class="task">
    <v-expansion-panel-header>
      <div class="d-flex justify-start">
        {{ task.event.title }}
      </div>
      <div class="d-flex justify-end buttons">
        <v-btn
          @click.stop=""
          @click="editEvent(task.id)"
          class="d-flex mx-1"
          text
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          @click.stop=""
          @click="deleteEvent(task.id)"
          class="d-flex mx-1"
          text
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div v-if="task.event.budget">Бюджет: {{ task.event.budget }}$</div>
      <div v-if="task.event.address">Адрес: {{ task.event.address }}</div>
      <div v-if="task.event.time">Время: {{ task.event.time }}</div>
      <div v-if="task.event.text">{{ task.event.text }}</div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Task",
  props: {
    task: {
      type: Object,
      default: undefined,
    },
  },
  methods: {
    deleteEvent() {
      this.$store.dispatch("deleteEvent", this.task.id);
    },
    editEvent() {
      this.$router.push({ name: "EventEditor", params: { id: this.task.id } });
    },
  },
});
</script>

<style scoped lang="scss">
.task {
  .buttons {
    transition-duration: 0.2s;
    opacity: 0;
  }
  &:hover {
    .buttons {
      opacity: 100;
    }
  }
}
</style>
