import { BaseEvent } from "@/store/types/BaseEvent";

export class CalendarEvent extends BaseEvent {
  address: string;
  time: string;
  type: string;
  constructor(title: string, address: string, time: string) {
    super(title);
    this.address = address;
    this.time = time;
    this.type = "calendarEvent";
  }
}
