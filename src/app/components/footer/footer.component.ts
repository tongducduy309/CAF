import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  visible = true
  constructor(private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
    {
        switch (event.urlAfterRedirects){
          case '/dashboard':
            this.visible = false
            break

          default:
            this.visible = true
        }
      }
    });
  }
}
