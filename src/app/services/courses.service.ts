import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private baseUrl = "http://localhost:4000/api/courses";

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, course);
  }

  editCourse(id: string, course: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, course);
  }

  getCourse(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  filterCourses(filters: { [key: string]: string[] }): Observable<any> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        filters[key].forEach((value) => {
          params = params.append(key, value);
        });
      }
    }
    return this.http.get(`${this.baseUrl}/filter`, { params });
  }

  getAllAuthors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/authors`);
  }

  createAuthor(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/authors`, { name });
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/authors/${id}`);
  }
}
