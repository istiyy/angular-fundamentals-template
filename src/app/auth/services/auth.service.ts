import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionStorageService } from "./session-storage.service";

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(private http: HttpClient, private sessionService: SessionStorageService) {}

  login(user: User) {
    return this.http.post("http://localhost:4000/api/login", { email: user.email, password: user.password });
  }

  logout() {
    this.sessionService.deleteToken();
    this.isAuthorised = false;
  }

  register(user: User) {
    return this.http.post("http://localhost:4000/api/register", { email: user.email, password: user.password });
  }

  get isAuthorised() {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    return "/login";
  }
}
