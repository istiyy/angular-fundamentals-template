import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  courseForm: FormGroup;

  availableAuthors: { id: number; name: string }[] = [
    { id: 1, name: "Author 1" },
    { id: 2, name: "Author 2" },
  ];

  courseAuthors: { id: number; name: string }[] = [];

  constructor(private fb: FormBuilder, private library: FaIconLibrary) {
    this.library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      author: ["", [Validators.pattern("^[a-zA-Z0-9 ]*$")]], // Validation for Latin letters/numbers
      authors: this.fb.array([]), // Will use FormArray to handle added authors
      duration: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get title() {
    return this.courseForm.get("title");
  }

  get description() {
    return this.courseForm.get("description");
  }

  get author() {
    return this.courseForm.get("author");
  }

  get authors() {
    return this.courseForm.get("authors") as FormArray;
  }

  get duration() {
    return this.courseForm.get("duration");
  }

  addAuthor(author: any) {
    this.courseAuthors.push(author);
    this.availableAuthors = this.availableAuthors.filter((a) => a.id !== author.id);
    this.authors.push(this.fb.control(author));
  }

  removeAuthor(author: any) {
    this.availableAuthors.push(author);
    this.courseAuthors = this.courseAuthors.filter((a) => a.id !== author.id);
    const index = this.authors.controls.findIndex((control) => control.value.id === author.id);
    this.authors.removeAt(index);
  }

  createAuthor() {
    if (this.author?.valid) {
      const newAuthor = {
        id: Math.floor(Math.random() * 1000),
        name: this.author?.value,
      };
      this.availableAuthors.push(newAuthor);
      this.author?.reset();
    }
  }

  isControlInvalid(control: AbstractControl | null): boolean {
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log("Form Submitted:", this.courseForm.value);
    } else {
      console.error("Form is invalid");
    }
  }

  formatDuration(minutes: number): string {
    if (minutes <= 0) return "00:00";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  }
}
