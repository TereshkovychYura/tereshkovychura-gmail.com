import { Component, OnInit } from '@angular/core';
import { Requirement } from './requirement-model';
import { RequirementService } from './requirement.service';

@Component({
  selector: 'app-requirements-list',
  templateUrl: './requirements-list.component.html',
  styleUrls: ['./requirements-list.component.scss']
})
export class RequirementsListComponent implements OnInit {
  requirements: Requirement[];
  constructor(private requirementService: RequirementService) {}

  ngOnInit(): void {
    this.requirements = this.requirementService.getRequirements();
  }

  onRequirementAdded(requirement: Requirement) {
    this.requirements.push(requirement);
  }
}
