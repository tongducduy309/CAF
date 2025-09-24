// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { firstValueFrom, map } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const user = await firstValueFrom(this.auth.user$);
    if (user) return true;

    try {
      const checked = await firstValueFrom((await this.auth.fetchProfile()).pipe(
        map(u => !!u)
      ));
      if (checked) return true;
    } catch (e) {
    }

    this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
