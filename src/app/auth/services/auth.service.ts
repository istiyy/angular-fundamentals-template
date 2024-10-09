import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SessionStorageService } from "./session-storage.service";

interface User {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(private http: HttpClient, private sessionService: SessionStorageService) {
    this.isAuthorized$$.next(!!this.sessionService.getToken());
  }

  login(user: User): Observable<void> {
    return this.http.post<LoginResponse>("http://localhost:4000/api/login", user).pipe(
      map((response) => {
        this.sessionService.setToken(response.token);
        this.isAuthorized = true;
        return;
      })
    );
  }

  logout(): void {
    this.sessionService.deleteToken();
    this.isAuthorized = false;
  }

  register(user: User): Observable<void> {
    return this.http.post<void>("http://localhost:4000/api/register", user);
  }

  get isAuthorized(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return "/login";
  }
}
