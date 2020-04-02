import { Requirement } from './requirement-model';
import { Injectable } from '@angular/core';

@Injectable()
export class RequirementService {
  private requirement: Requirement[] = [
    new Requirement('Java Script', 'Base knowlage of OOP'),
    new Requirement('HTML, JS, CSS,', 'REST API')
  ];
  getRequirements() {
    return this.requirement.slice();
  }
}
