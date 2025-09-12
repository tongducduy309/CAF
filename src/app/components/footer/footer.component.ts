import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LangService } from 'src/app/services/lang.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent {
  visible = true
  constructor(private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
    {
      const s = event.url.split("/")[1]
        switch (s){
          case 'dashboard':
            this.visible = false
            break

          default:
            this.visible = true
        }
      }
    });
  }

  private lang = inject(LangService);
  
}
