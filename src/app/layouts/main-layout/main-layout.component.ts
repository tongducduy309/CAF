import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  standalone:false
})
export class MainLayoutComponent {
  isCollapsed = false;
  user$ = this.auth.user$;

  constructor(private router: Router, private auth: AuthenticationService) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
