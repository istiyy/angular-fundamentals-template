import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad() {
    if (this.authService.isAuthorized) {
      return true;
    }

    this.router.navigate([this.authService.getLoginUrl()]);
    return false;
  }
}
