import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval, startWith, switchMap, takeWhile, catchError, of } from 'rxjs';
import { PaymentStatus } from 'src/app/enums/Payment.enum';
import { LayoutService } from 'src/app/services/layout.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { numberToStringMonth, parseLocalDateTime } from 'src/app/utils/Date';

interface PaymentInfo {
  amountRaw?: string;
  amountFormatted?: string;
  bankCode?: string;
  bankTranNo?: string;
  cardType?: string;
  orderInfo?: string;
  payDateRaw?: string;
  // payDateFormatted?: string;
  payDateTime?: { year: string; month: string; day: string; hour: string; minute: string; second: string; } | null;
  responseCode?: string;
  transactionNo?: string;
  transactionStatus?: string;
  txnRef?: string;
  secureHash?: string;
}

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrl: './payment-summary.component.scss',
  standalone:false
})
export class PaymentSummaryComponent {
  status: PaymentStatus = PaymentStatus.UNPAID;
  payment: PaymentInfo = {};
  sub?: Subscription;
  orderId: number = 0;

  layoutService = inject(LayoutService)
  orderService = inject(OrderService)
  paymentService = inject(PaymentService)

  PaymentStatus = PaymentStatus;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.orderId = parseInt(this.route.snapshot.queryParamMap.get('vnp_TxnRef') || '1', 10);
    this.route.queryParams.subscribe(params => {
      if (params && (params['vnp_Amount'] || params['vnp_TxnRef'] || params['vnp_TransactionNo'])) {
        const parsed = this.buildFromVnpParams(params);
        this.payment = { ...(this.payment || {}), ...parsed };
        console.log('Payment info:', this.payment);
        this.layoutService.setReady()
      }
    },()=>{},()=>{});
    this.sub = interval(1500).pipe(
      startWith(0),
      switchMap(() => this.orderService.getStatus(this.orderId)),
      takeWhile(res => res === PaymentStatus.UNPAID, true),
      catchError(() => of(PaymentStatus.UNPAID ))
    ).subscribe(res => {
      this.status = res;
      
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  private buildFromVnpParams(params: any): PaymentInfo {
    const amountRaw = params['vnp_Amount'] ?? '';
    const payDateRaw = params['vnp_PayDate'] ?? '';
    const txnRef = params['vnp_TxnRef'] ?? '';
    const orderInfo = params['vnp_OrderInfo'] ? decodeURIComponent(params['vnp_OrderInfo']) : '';

    return {
      amountRaw,
      amountFormatted: this.formatVnpAmount(amountRaw),
      bankCode: params['vnp_BankCode'] ?? '',
      bankTranNo: params['vnp_BankTranNo'] ?? '',
      cardType: params['vnp_CardType'] ?? '',
      orderInfo,
      payDateRaw,
      payDateTime: this.formatVnpPayDate(payDateRaw),
      responseCode: params['vnp_ResponseCode'] ?? '',
      transactionNo: params['vnp_TransactionNo'] ?? '',
      transactionStatus: params['vnp_TransactionStatus'] ?? '',
      txnRef,
      secureHash: params['vnp_SecureHash'] ?? ''
    };
  }

  private formatVnpAmount(amountStr?: string): string {
    if (!amountStr) return '';
    const num = parseInt(amountStr, 10);
    if (isNaN(num)) return amountStr;
    let value = num;
    if (num % 100 === 0) value = Math.round(num / 100);
    return value.toLocaleString('en-US') + ' VND';
  }

  private formatVnpPayDate(payDate?: string):
  { year: string; month: string; day: string; hour: string; minute: string; second: string } | null {
  if (!payDate) return null;

  const m = payDate.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (!m) return null;

  const year = Number(m[1])+"";
  const month = numberToStringMonth(Number(m[2]));
  const day = Number(m[3])+"";
  const hour = Number(m[4])+"";
  const minute = Number(m[5])+"";
  const second = Number(m[6])+"";

  return { year, month, day, hour, minute, second };
}

  ipn(){
    // this.paymentService.getIpn()
  }

  goHome(){
    window.location.href = '/';
  }
}
