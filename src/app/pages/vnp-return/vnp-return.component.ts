import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval, startWith, switchMap, takeWhile, catchError, of } from 'rxjs';
import { PaymentStatus } from 'src/app/enums/Payment.enum';
import { LayoutService } from 'src/app/services/layout.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-vnp-return',
  templateUrl: './vnp-return.component.html',
  styleUrl: './vnp-return.component.scss',
  standalone:false
})
export class VnpReturnComponent implements OnInit, OnDestroy {
  status: PaymentStatus = PaymentStatus.UNPAID;
  sub?: Subscription;
  orderId: number = 0;

  layoutService = inject(LayoutService)
  orderService = inject(OrderService)
  paymentService = inject(PaymentService)

  PaymentStatus = PaymentStatus;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.orderId = parseInt(this.route.snapshot.queryParamMap.get('vnp_TxnRef') || '1', 10);
    console.log(this.orderId)
    this.sub = interval(1500).pipe(
      startWith(0),
      switchMap(() => this.orderService.getStatus(this.orderId)),
      takeWhile(res => res === PaymentStatus.UNPAID, true),
      catchError(() => of(PaymentStatus.UNPAID ))
    ).subscribe(res => {
      this.status = res;
      this.layoutService.setReady()
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  ipn(){
    // this.paymentService.getIpn()
  }
}
