import { Event } from './event-model';
import { Requirement } from '../requirements-list/requirement-model';
import { Injectable, EventEmitter } from '@angular/core';
import { RequirementService } from '../requirements-list/requirement.service';
import { Subject } from 'rxjs';

@Injectable()
export class EventService {
  startEdit = new Subject<number>();
  eventSelected = new EventEmitter<Event>();
  updateEvents = new EventEmitter<Event[]>();
  private events: Event[] = [
    new Event(
      'Java Script Patterns',
      'For advanced skills students',
      'https://monsterlessons.com/api/storage/uploads/posters/9e7ad2a5-9047-4139-b25b-2ede6cec1fc8/poster.png',
      [new Requirement('Java Script', 'Java Script Druid')]
    ),
    new Event(
      'Java for true coders',
      'Java is the best programming ...',
      'https://upload.wikimedia.org/wikipedia/uk/8/85/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_Java.png',
      [new Requirement('Java', 'Java Spring')]
    ),
  ];
  constructor(private requirementService: RequirementService) {}
  getEvents() {
    return this.events.slice();
  }
  onSendRequirements(requirements: Requirement[]) {
    this.requirementService.onAddRequirements(requirements);
  }
  getSingleEvent(index: number) {
    return this.events[index];
  }
  onAddEvent(event: Event) {
    this.events.push(event);
    this.updateEvents.emit(this.events.slice());
  }
  updateEvent(index: number, newEvent: Event) {
    this.events[index] = newEvent;
    this.updateEvents.next(this.events.slice());
  }
  onDeleteEvent(index: number) {
    if (index !== -1) {
      this.events.splice(index, 1);
    }
    this.updateEvents.next(this.events.slice());
    console.log(this.events);
  }
}
