import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCourseRoutingModule } from './edit-course-routing.module';
import { EditCourseComponent } from './edit-course.component';


@NgModule({
  declarations: [
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    EditCourseRoutingModule
  ]
})
export class EditCourseModule { }
