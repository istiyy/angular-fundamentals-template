import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CoursesService } from "./courses.service";

interface Author {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  topRated: boolean;
  authors: Author[];
}

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  courses$ = this.coursesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    this.loadingSubject.next(true);
    this.coursesService.getAll().subscribe((courses) => {
      this.coursesSubject.next(courses);
      this.loadingSubject.next(false);
    });
  }

  createCourse(course: Course) {
    this.loadingSubject.next(true);
    this.coursesService.createCourse(course).subscribe(() => {
      this.getAll();
    });
  }

  getCourse(id: string): Observable<Course> {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: Course) {
    this.loadingSubject.next(true);
    this.coursesService.editCourse(id, course).subscribe(() => {
      this.getAll();
    });
  }

  deleteCourse(id: string) {
    this.loadingSubject.next(true);
    this.coursesService.deleteCourse(id).subscribe(() => {
      this.getAll();
    });
  }

  filterCourses(value: string) {
    this.loadingSubject.next(true);
    this.coursesService.filterCourses({ search: [value] }).subscribe((courses) => {
      this.coursesSubject.next(courses);
      this.loadingSubject.next(false);
    });
  }

  getAllAuthors(): Observable<Author[]> {
    return this.coursesService.getAllAuthors();
  }

  createAuthor(name: string) {
    this.loadingSubject.next(true);
    this.coursesService.createAuthor(name).subscribe(() => {
      this.loadingSubject.next(false);
    });
  }

  getAuthorById(id: string): Observable<Author> {
    return this.coursesService.getAuthorById(id);
  }

  editAuthor(id: string, name: string) {
    this.loadingSubject.next(true);
    this.coursesService.editAuthor(id, name).subscribe(() => {
      this.loadingSubject.next(false);
    });
  }

  deleteAuthor(id: string) {
    this.loadingSubject.next(true);
    this.coursesService.deleteAuthor(id).subscribe(() => {
      this.loadingSubject.next(false);
    });
  }
}
