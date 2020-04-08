import { Requirement } from './requirement-model';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RequirementService {
  eventUpdate = new EventEmitter<Requirement[]>();
  startEdit = new Subject<number>();

  private requirements: Requirement[] = [
    new Requirement('Java Script', 'Base knowlage of OOP'),
    new Requirement('HTML, JS, CSS,', 'REST API'),
  ];

  getRequirements() {
    return this.requirements.slice();
  }

  onAddRequirement(requirements: Requirement) {
    this.requirements.push(requirements);
    this.eventUpdate.emit(this.requirements.slice());
  }
  onAddRequirements(requirements: Requirement[]) {
    this.requirements.push(...requirements);
    this.eventUpdate.emit(this.requirements.slice());
  }

  getSingleRequirement(index: number) {
    return this.requirements[index];
  }
  updateRequirements(index: number, newReq: Requirement) {
    this.requirements[index] = newReq;
    this.eventUpdate.next(this.requirements.slice());
  }
  deleteRequirement(index: number) {
    if (index !== -1) {
      this.requirements.splice(index, 1);
    }
    this.eventUpdate.next(this.requirements.slice());
  }
}
