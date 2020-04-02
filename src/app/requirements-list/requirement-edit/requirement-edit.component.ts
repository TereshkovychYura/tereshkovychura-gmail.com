import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Requirement } from '../requirement-model';
@Component({
  selector: 'app-requirement-edit',
  templateUrl: './requirement-edit.component.html',
  styleUrls: ['./requirement-edit.component.scss']
})
export class RequirementEditComponent implements OnInit {
  @ViewChild('skillsInput', { static: false }) skillsInputRef: ElementRef;
  @ViewChild('descInput', { static: false }) descInputRef: ElementRef;
  @Output() newRequirementAdded = new EventEmitter<Requirement>();
  constructor() {}

  ngOnInit(): void {}
  onAddItem() {
    const skills = this.skillsInputRef.nativeElement.value;
    const description = this.descInputRef.nativeElement.value;
    const newRequirement = new Requirement(skills, description);
    this.newRequirementAdded.emit(newRequirement);
  }
}
