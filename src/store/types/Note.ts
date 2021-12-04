import { BaseEvent } from "@/store/types/BaseEvent";

export class Note extends BaseEvent {
  text: string;
  constructor(title: string, text: string) {
    super(title);
    this.text = text;
  }
}
