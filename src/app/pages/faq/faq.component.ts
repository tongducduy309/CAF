import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Page } from 'src/app/classes/page';
import { PageTitleService } from 'src/app/services/page-title.service';
@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    standalone: false
})
export class FaqComponent extends Page implements AfterViewInit,OnInit{
  panels = {
    "col_1":[
      {
        header: 'Làm sao để tôi có thể đăng ký thành viên Coffee Store sau khi đặt hàng?',
        content: 'Bạn vui lòng truy cập https://caf-bay.vercel.app/account/register để đăng ký thành viên'
      },
      {
        header: 'Điểm là gì?',
        content:`
        Với mỗi 10,000 đồng chi trả cho thức uống, bánh và sản phẩm tại hệ thống cửa hàng Coffee Store hoặc qua website Order.phuclong.com.vn, bạn sẽ tích luỹ được 1 điểm tương ứng.
Ví dụ: Hóa đơn 50.000 đồng = 5 điểm Thành viên Coffee Store.
Điểm sẽ được làm tròn đến số chẵn thấp hơn gần nhất trên hoá đơn và sẽ không được bảo tồn phần dư cho giao dịch sau đó.
Ví dụ: Hóa đơn 52.000 đồng = 5 điểm Thành viên Coffee Store.
        `
      },
      {
        header: 'Tôi có thể tích điểm như thế nào?',
        content: `Hiện tại, Coffee Store Coffee & Tea áp dụng tích điểm khi bạn xuất trình Thẻ Thành viên, mã vạch Barcode trên Web và đọc SĐT tại hệ thống cửa hàng Coffee Store



Bạn đăng nhập thành viên trên web https://caf-bay.vercel.app/ và xuất trình mã vạch Barcode ở mục TÀI KHOẢN trên Web cho nhân viên để tích điểm trước khi thanh toán và ra hóa đơn.



Chúng tôi sẽ không giải quyết bất kì trường hợp khiếu nại nào liên quan đến việc tích điểm cho bạn nếu bạn không xuất trình Thẻ Thành viên, Barcode trên Web app hoặc đọc SĐT trước khi thanh toán và hóa đơn đã được in ra.`
      },
      {
        header: 'Điểm tích lũy và điểm đổi quà là gì?',
        content: `Hiện tại hệ thống thành viên Coffee Store sẽ có 2 loại điểm bao gồm: điểm tích lũy và điểm đổi quà.

- Điểm tích lũy là điểm để xét hạng mức của thành viên, lên hạng hoặc hạ hạng như đã đề cập trong Điều khoản & Điều kiện của chương trình Thẻ Thành viên Coffee Store

- Điểm đổi quà là điểm để đổi nước, cứ 100 điểm bạn sẽ được đổi 1 ly nước miễn phí size vừa (không hỗ trợ bù tiền upsize)`
      },
      {
        header: 'Cách sử dụng điểm đổi quà?',
        content: `Cách đổi quà: Bạn liên hệ thu ngân để yêu cầu đổi quà và xuất trình mã vạch barcode mới nhất trên web để được hỗ trợ. Không áp dụng đổi quà bằng hình thức đọc SĐT`
      },
      {
        header: 'Sau khi đổi quà thì có bị ảnh hưởng điểm tích lũy không?',
        content: `Sau khi đổi quà thì hệ thống chỉ trừ trên điểm đổi quà để bạn biết được mình còn lại bao nhiêu ly nước tặng, việc trừ điểm này không ảnh hưởng đến số điểm tích lũy để xét hạng`
      }
    ],
    "col_2":
    [
      {
        header: 'Điểm đổi quà có bị hết hạn sử dụng không?',
        content: `Điểm đổi quà có hạn sử dụng là 1 năm kể từ ngày bạn mua hàng.

Bạn vui lòng theo dõi ngày hết hạn trên web https://caf-bay.vercel.app/`
      },
      {
        header: 'Thành viên có bị hết hạn không?',
        content: `Có. Tài khoản thành viên sẽ hết hạn và bị vô hiệu hóa sau 365 ngày bạn không chi tiêu kể từ ngày đăng ký thành viên.

Ngày xét hạng là ngày cuối trong chu kỳ 12 tháng/1 năm/365 ngày kể từ ngày đăng ký thành viên hoặc lên hạng. Mỗi tài khoản thành viên sẽ có ngày xét hạng khác nhau, bạn vui lòng theo dõi ngày xét hạng trên web ở Tài khoản -> Khách hàng thành viên`
      },
      {
        header: 'Sử dụng voucher có được áp dụng đồng thời với Thành viên không?',
        content: `Bạn đươc tích điểm trên phần tiền bạn chi trả thêm cho Coffee Store.

Ví dụ: Bạn mua hóa đơn 100.000 có sử dụng voucher 20.000 và thanh toán thêm tiền mặt 80.000 => Với hóa đơn này bạn được tích 8 điểm`
      },
      {
        header: 'Khi đặt hàng qua hotline 1800, tôi có thể áp dụng Thành viên được không?',
        content: `Có, Bạn cung cấp số điện thoại đăng ký thành viên Coffee Store cho tổng đài viên để được hỗ trợ tích điểm và giảm giá theo hạng (VIP & Diamond).`
      },
      {
        header: 'Tôi muốn đặt hàng online và áp dụng Thành viên thì làm cách nào?',
        content: `1. GIAO HÀNG

- Thời gian nhận đơn hàng: từ 9h00 - 16h30 hàng ngày

- Điều kiện giao hàng: Freeship với đơn hàng từ 300.000đ (nếu bạn đặt ít hơn 300,000 thì sẽ không thanh toán thành công)

- Bán kính giao hàng: Cửa hàng nhận giao đơn trong bán kinh 2km. Tính từ vị trí của bạn đến cửa hàng gần nhất. Trường hợp bạn không thấy hiển thị cửa hàng vì địa chỉ của bạn vượt quá bán kính giao hàng hoặc cửa hàng đang quá tải đơn nên tắt trạng thái nhận đơn trên web.



2. ĐẾN LẤY

- Hình Thức này bạn sẽ tìm tên cửa hàng muốn mua hàng và đến trực tiếp cửa hàng đã chọn nhận nước, đối với hình thức này thì không quy định giá trị đơn hàng, khoảng cách.



Lưu ý:

- Sau khi chọn được cửa hàng thì bạn mới có thể xem được menu thức uống sẵn có theo tình trạng thực tế tại cửa hàng và chọn món.

- Món nào không hiển thị có nghĩa cửa hàng đang tạm hết.

- Bạn đã là thành viên của Coffee Store thì sau khi đăng nhập thành công và tiến hành đặt hàng, điểm sẽ tự động cập nhật vào tài khoản khi đơn hàng chuyển sang trạng thái “hoàn thành”`
      },
      {
        header: 'Cách nào để tôi có thể báo mất thẻ?',
        content: `Khi bị mất thẻ hoặc thất lạc, bạn vui long gửi tin nhắn vào Fanpage Phuc Long Coffee & Tea hoặc liên hệ số điện thoại 1900234518 (Ext.1) để báo khóa thẻ trong giờ hành chính từ 8h-17h45 Tthứ 2 - Chủ Nhật (trừ các dịp lễ - Tết)



Hiện tại Coffee Store đã ngưng phát hành thẻ cứng, bạn vui lòng đăng nhập vào web https://caf-bay.vercel.app/ và xuất trình Barcode mới nhât để tích điểm thay cho thẻ cứng.`
      }
    ]
  };
  private pageTitle = inject(PageTitleService);
  constructor(private location:Location){
    super();
  }

  ngOnInit(): void {
    this.pageTitle.setTitle('FAQ.TITLE');
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
