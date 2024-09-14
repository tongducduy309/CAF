import { Injectable } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isVerify=false;
  constructor(private crud:CrudService) { }

  exist(){

  }
}
