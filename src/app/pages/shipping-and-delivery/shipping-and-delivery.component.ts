import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';
import { PageTitleService } from 'src/app/services/page-title.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-shipping-and-delivery',
  templateUrl: './shipping-and-delivery.component.html',
  styleUrl: './shipping-and-delivery.component.scss',
  standalone: false
})
export class ShippingAndDeliveryComponent extends Page implements AfterViewInit,OnInit{
  private pageTitle = inject(PageTitleService);
  constructor(private location:Location){
    super()
  }
  ngOnInit(): void {
    this.pageTitle.setTitle('SHIPPING_AND_DELIVERY.TITLE');
  }
  back(){
    this.location.back();
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(()=> {
      // this.getUser()
      this.loaded()
    })

  }
}
