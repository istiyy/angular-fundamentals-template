import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (!this.authService.isAuthorized) {
      return true;
    }
    this.router.navigate(["/courses"]);
    return false;
  }
}
