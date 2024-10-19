import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Coffee Store';
  passwordVisible = false;
  user_password?: string;

  change(componentRef:any){
    componentRef.ItemsCartEmitter?.subscribe((res:any)=>{
      console.log(res);
    })
  }
}
