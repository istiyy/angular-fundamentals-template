import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCourseRoutingModule } from './add-course-routing.module';
import { AddCourseComponent } from './add-course.component';


@NgModule({
  declarations: [
    AddCourseComponent
  ],
  imports: [
    CommonModule,
    AddCourseRoutingModule
  ]
})
export class AddCourseModule { }
