import Vue from "vue";
import Vuex, { Commit } from "vuex";
import { HolidayEvent } from "@/store/types/HolidayEvent";
import { Note } from "@/store/types/Note";
import { CalendarEvent } from "@/store/types/CalendarEvent";

Vue.use(Vuex);

export type EventType = {
  id: number;
  date: string;
  event: HolidayEvent | Note | CalendarEvent;
};

type EventState = {
  eventList: EventType[];
  currentDay: string;
};

export default new Vuex.Store({
  state: {
    eventList: [] as EventType[],
    currentDay: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  },
  getters: {
    eventsByDate: (state: EventState) =>
      state.eventList.filter((item) => item.date === state.currentDay),
    eventById: (state: EventState) => (id: number) =>
      state.eventList.find((event) => event.id === id),
  },
  actions: {
    fetchEvents({ commit }: { commit: Commit }) {
      const data = localStorage.getItem("events");
      if (data != null) {
        commit("EVENT_SET", JSON.parse(data));
      }
    },
    setDate({ commit }: { commit: Commit }, date: string) {
      commit("DATE_SET", date);
    },
    addEvent({ commit }: { commit: Commit }, payload: EventType) {
      commit("EVENT_ADD", payload);
    },
    updateEvent({ commit }: { commit: Commit }, payload: EventType) {
      commit("EVENT_UPDATE", payload);
    },
    deleteEvent({ commit }: { commit: Commit }, id: number) {
      commit("EVENT_REMOVE", id);
    },
  },
  mutations: {
    DATE_SET(state: EventState, date: string) {
      state.currentDay = date;
      localStorage.setItem("selectedDate", date);
    },
    EVENT_ADD: (state: EventState, event: EventType) => {
      state.eventList.push(event);
      localStorage.setItem("events", JSON.stringify(state.eventList));
    },
    EVENT_REMOVE: (state, id) => {
      state.eventList = state.eventList.filter((task) => task.id !== id);
      localStorage.setItem("events", JSON.stringify(state.eventList));
    },
    EVENT_UPDATE: (state: EventState, updatedEvent: EventType) => {
      const index = state.eventList.findIndex(
        (task) => task.id === updatedEvent.id
      );
      if (index !== -1) {
        state.eventList.splice(index, 1, updatedEvent);
      }
      localStorage.setItem("events", JSON.stringify(state.eventList));
    },
    EVENT_SET: (state: EventState, events: EventType[]) =>
      (state.eventList = events),
  },
});
