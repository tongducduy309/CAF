import { Component, inject, OnInit } from '@angular/core';
import { PageTitleService } from 'src/app/services/page-title.service';
import { Location } from '@angular/common';
import { LayoutService } from 'src/app/services/layout.service';
@Component({
  selector: 'app-shipping-and-delivery',
  templateUrl: './shipping-and-delivery.component.html',
  styleUrl: './shipping-and-delivery.component.scss',
  standalone: false
})
export class ShippingAndDeliveryComponent implements OnInit{
  private pageTitle = inject(PageTitleService);
  private layoutService = inject(LayoutService)
  constructor(private location:Location){
  }
  ngOnInit(): void {
    this.pageTitle.setTitle('SHIPPING_AND_DELIVERY.TITLE');
    this.layoutService.setReady()
  }
  back(){
    this.location.back();
  }
}
