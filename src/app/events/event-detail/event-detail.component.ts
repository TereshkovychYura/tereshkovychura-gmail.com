import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event-model';
import { EventService } from '../event.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  event: Event;
  index: number;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.event = this.eventService.getSingleEvent(this.index);
    });
  }
  onAddRequirements() {
    this.eventService.onSendRequirements(this.event.requirements);
  }
  onSendEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteReq() {
    this.eventService.onDeleteEvent(this.index);
  }
}
