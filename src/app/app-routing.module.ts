import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { LoginComponent } from "./features/auth/login/login.component";
import { RegistrationComponent } from "./features/auth/registration/registration.component";
import { CoursesListComponent } from "./features/courses/courses-list/courses-list.component";
import { AddCourseComponent } from "./features/courses/add-course/add-course.component";
import { CourseInfoComponent } from "./features/course-info/course-info.component";
import { EditCourseComponent } from "./features/courses/edit-course/edit-course.component";

const routes: Routes = [
  { path: "", redirectTo: "courses", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () => import("./features/auth/login/login.module").then((m) => m.LoginModule),
    canActivate: [NotAuthorizedGuard],
    component: LoginComponent,
  },
  {
    path: "registration",
    loadChildren: () => import("./features/auth/registration/registration.module").then((m) => m.RegistrationModule),
    canActivate: [NotAuthorizedGuard],
    component: RegistrationComponent,
  },
  {
    path: "courses",
    loadChildren: () => import("./features/courses/courses.module").then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
    component: CoursesListComponent,
  },
  {
    path: "courses/add",
    loadChildren: () => import("./features/courses/add-course/add-course.module").then((m) => m.AddCourseModule),
    canLoad: [AuthorizedGuard],
    component: AddCourseComponent,
  },
  {
    path: "courses/:id",
    loadChildren: () => import("./features/courses/course-info/course-info.module").then((m) => m.CourseInfoModule),
    canLoad: [AuthorizedGuard],
    component: CourseInfoComponent,
  },
  {
    path: "courses/edit/:id",
    loadChildren: () => import("./features/courses/edit-course/edit-course.module").then((m) => m.EditCourseModule),
    canLoad: [AuthorizedGuard],
    component: EditCourseComponent,
  },
  { path: "**", redirectTo: "courses" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
