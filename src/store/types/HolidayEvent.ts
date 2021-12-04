import { BaseEvent } from "@/store/types/BaseEvent";

export class HolidayEvent extends BaseEvent {
  type: string;
  budget: number;
  constructor(title: string, budget: number) {
    super(title);
    this.budget = budget;
    this.type = "holiday";
  }
}
