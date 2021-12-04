<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row justify="center">
        <v-col class="col-sm-6">
          <v-card>
            <v-card-title>Добавить событие</v-card-title>
            <v-card-text>
              <v-text-field
                label="Название события"
                outlined
                dense
                v-model="form.title"
                :rules="textRules"
                required
              />
              <v-select
                label="Тип события"
                outlined
                dense
                v-model="form.eventType"
                :items="eventTypeData"
                @change="clearForm"
                required
              />

              <div v-if="form.eventType === 'Праздничные дни'">
                <v-text-field
                  label="Бюджет"
                  outlined
                  type="number"
                  dense
                  v-model="form.budget"
                  :rules="numberRules"
                  required
                />
              </div>

              <div v-if="form.eventType === 'Мероприятия'">
                <v-text-field
                  label="Куда идти?"
                  outlined
                  dense
                  v-model="form.address"
                  :rules="textRules"
                  required
                />
                <v-text-field
                  label="Во сколько?"
                  outlined
                  dense
                  v-model="form.time"
                  :rules="textRules"
                  required
                />
              </div>

              <div v-if="form.eventType === 'Пометки / Другое'">
                <v-text-field
                  label="Любой текст"
                  outlined
                  dense
                  v-model="form.text"
                  :rules="textRules"
                  required
                />
              </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-around">
              <v-btn @click="$router.replace('/')">Отмена</v-btn>
              <v-btn @click="save">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EventConstructor",
  data() {
    return {
      valid: false,
      form: {
        id: this.$store.state.eventList.length,
        eventType: "Праздничные дни",
        title: "",
        budget: "",
        address: "",
        time: "",
        text: "",
        date: localStorage.getItem("selectedDate"),
      },
      textRules: [
        (v: any) => !!v || "Обязательное поле",
        (v: any) => v.length >= 4 || "Введите хотя-бы 4 символа",
      ],
      numberRules: [(v: any) => !!v || "Обязательное поле"],
      eventTypeData: ["Праздничные дни", "Мероприятия", "Пометки / Другое"],
    };
  },
  methods: {
    clearForm() {
      (
        this.$refs.form as Vue & { resetValidation: () => boolean }
      ).resetValidation();

      this.form.budget = "";
      this.form.address = "";
      this.form.time = "";
      this.form.text = "";
    },
    save: async function () {
      this.valid = (
        this.$refs.form as Vue & { validate: () => boolean }
      ).validate();
      if (this.valid) {
        switch (this.form.eventType) {
          case "Праздничные дни": {
            const event = {
              id: this.form.id,
              date: this.form.date,
              event: {
                title: this.form.title,
                budget: this.form.budget,
              },
            };
            await this.$store.dispatch("addEvent", event);
            await this.$router.push("/");
            break;
          }
          case "Мероприятия": {
            const event = {
              id: this.form.id,
              date: this.form.date,
              event: {
                title: this.form.title,
                address: this.form.address,
                time: this.form.time,
              },
            };
            await this.$store.dispatch("addEvent", event);
            await this.$router.replace("/");
            break;
          }
          case "Пометки / Другое": {
            const event = {
              id: this.form.id,
              date: this.form.date,
              event: {
                title: this.form.title,
                text: this.form.text,
              },
            };
            await this.$store.dispatch("addEvent", event);
            await this.$router.replace("/");
            break;
          }
        }
      }
    },
  },
});
</script>
