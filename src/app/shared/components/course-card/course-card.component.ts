import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: string; // Adjusted for simplicity
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() editable: boolean = false; // Determines if course is editable

  @Output() clickOnShow = new EventEmitter<void>(); // Event emitter for show course action

  showCourse() {
    this.clickOnShow.emit();
  }
}
