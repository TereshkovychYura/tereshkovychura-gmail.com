import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Requirement } from '../requirement-model';
import { RequirementService } from '../requirement.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-requirement-edit',
  templateUrl: './requirement-edit.component.html',
  styleUrls: ['./requirement-edit.component.scss'],
})
export class RequirementEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') reqForm: NgForm;
  constructor(private requirementService: RequirementService) {}
  subscription: Subscription;
  editMode = false;
  editedItem: number;
  editedRequirement: Requirement;

  ngOnInit(): void {
    this.subscription = this.requirementService.startEdit.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItem = index;
        this.editedRequirement = this.requirementService.getSingleRequirement(
          index
        );
        this.reqForm.setValue({
          skills: this.editedRequirement.name,
          description: this.editedRequirement.description,
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const skills = form.value.skills;
    const description = form.value.description;
    const newRequirement = new Requirement(skills, description);
    if (this.editMode) {
      this.requirementService.updateRequirements(
        this.editedItem,
        newRequirement
      );
    } else {
      this.requirementService.onAddRequirement(newRequirement);
    }
  }
  onClearForm() {
    this.editMode = false;
  }
  onDeleteItem() {
    this.requirementService.deleteRequirement(this.editedItem);
  }
}
