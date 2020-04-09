import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Event } from '../event-model';
import { NgForm } from '@angular/forms';
import { Requirement } from 'src/app/requirements-list/requirement-model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent implements OnInit {
  event: Event;
  index: number;
  editMode = true;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.event = this.eventService.getSingleEvent(this.index);
      if (this.event === undefined) {
        this.editMode = false;
      } else {
      }
    });
    console.log('Edit mode =>', this.editMode);
  }
  onEditEvent(form: NgForm) {
    console.log('form =>', form.value);
    const eventName = form.value.name;
    const eventDescription = form.value.description;
    const reqName = form.value.requirement.name;
    const reqDesc = form.value.requirement.description;
    const image = form.value.image;
    const newEvent = new Event(eventName, eventDescription, image, [
      new Requirement(reqName, reqDesc),
    ]);
    console.log(newEvent);
    if (this.editMode) {
      this.eventService.updateEvent(this.index, newEvent);
    } else {
      this.eventService.onAddEvent(newEvent);
    }
  }
}
