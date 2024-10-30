import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/classes/page';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent extends Page implements OnInit  {
  rangePrice = [0,100000]
  valuePrice = [0,100000]
  inStockQuantity = 0;
  outOfStockQuantity = 0;
  maxPrice=0;
  minPrice=0;
  AccessoriesQty=0;
  CoffeeQty=0;
  Grinder=0;
  MachineQty=0;
  MugQty=0;
  ToolsQty=0;
  ZpressoQty=0;
  BeanQty=0;
  BeanlyQty=0;
  BenkiQty=0;
  BudanQty=0;
  CoffeeWorkDoQty=0;
  GenericQty=0;
  KCQty=0;
  NescafeQty=0;
  RAGEQty=0;
  SunbeanQty=0;
  TATAQty=0;
  TokaiQty=0;
  BlackQty=0;
  BlueQty=0;
  BrownQty=0;
  GreenQty=0;
  GreyQty=0;
  PinkQty=0;
  PurpleQty=0;
  RedQty=0;
  WhiteQty=0;
  whiteQty=0;
  YellowQty=0;
  CeramiQty=0;
  ClassicQty=0;
  CreamyQty=0;
  CuppuccinoQty=0;
  DhakBlendQty=0;
  DrakRoastQty=0;
  EthiopianQty=0;
  HazelnutQty=0;
  HazinutQty=0;
  ItalianQty=0;
  KerehakluQty=0;
  MediumQty=0;
  OGBlendQty=0;
  RiseBlendQty=0;
  SoulBlendQty=0;
  SteelQty=0;
  StrongQty=0;
  ThogarihunkalQty=0;
  VenillaQty=0;
  ViennaRoastQty=0;
  VitaBlendQty=0;
  Cups1_size=0;
  gram230=0;
  Grams765=0;
  Grams900=0;
  Ounces9_6=0;
  cm5xcm5xcm8=0;
  cm6xcm6xcm8=0;
  Cup1_style=0;
  Cups2_style=0;
  color_text = '#262626';

  products:any = []
  constructor(private crud:CrudService) {
    super();
  }

  ngOnInit(): void {
    // Giả lập việc lấy dữ liệu từ hệ thống
    this.getStockData();

    this.getAllProducts();
  }

  getAllProducts(){
    this.crud.get("products","all").subscribe((products)=>{
      this.products=products
      this.loaded()
      console.log(this.products);
    })
  }

  selectedProvince = 'Alphabetically,A-Z';
  provinceData = [ 'Best seller','Alphabetically,A-Z','Alphabetically,Z-A',
    'Feartured','Price,low to high','Price,high to low','Date,old to new','Date,new to old'];
  expandIconPosition: 'start' | 'end' = 'start';
  panels = [
    {
      active: true,
      name: 'Availability',
    },
    {
      active: true,
      name: 'Price'
    },
    {
      active: true,
      name: 'Product type'
    },
    {
      active: true,
      name: 'Brand'
    },
    {
      active: true,
      name: 'Color'
    },
    {
      active: true,
      name: 'Material'
    },
    {
      active: true,
      name: 'Size'
    },
    {
      active: true,
      name: 'Style'
    },
  ];
  checkboxOption_Availability=[
    { label: 'In stock', value: 'In stock', checked: false },
    { label: 'Out of stock', value: 'Out of stock', checked: false }
  ];
  checkboxOption_ProType=[
    { label: 'Accessories', value: 'Accessories', checked: false },
    { label: 'Coffee', value: 'Coffee', checked: false },
    { label: 'Grinder', value: 'Grinder', checked: false },
    { label: 'Machine', value: 'Machine', checked: false },
    { label: 'Mugs', value: 'Mugs', checked: false },
    { label: 'Tools', value: 'Tools', checked: false }
  ];
  checkboxBrand = [
    { label: 'Zpresso', value: 'Zpresso', checked: false, quantity: this.ZpressoQty },
    { label: 'Bean', value: 'Bean', checked: false, quantity: this.BeanQty },
    { label: 'Beanly', value: 'Beanly', checked: false, quantity: this.BeanlyQty },
    { label: 'Benki', value: 'Benki', checked: false, quantity: this.BenkiQty },
    { label: 'Budan', value: 'Budan', checked: false, quantity: this.BudanQty },
    { label: 'Coffee WorkDo', value: 'Coffee WorkDo', checked: false, quantity: this.CoffeeWorkDoQty },
    { label: 'Generic', value: 'Generic', checked: false, quantity: this.GenericQty },
    { label: 'KC', value: 'KC', checked: false, quantity: this.KCQty },
    { label: 'Nescafe', value: 'Nescafe', checked: false, quantity: this.NescafeQty },
    { label: 'RAGE', value: 'RAGE', checked: false, quantity: this.RAGEQty },
    { label: 'Sunbean', value: 'Sunbean', checked: false, quantity: this.SunbeanQty },
    { label: 'TATA', value: 'TATA', checked: false, quantity: this.TATAQty },
    { label: 'Tokai', value: 'Tokai', checked: false, quantity: this.TokaiQty },
  ];
  checkboxColor = [
    { label: 'Black', value: 'Black', checked: false },
    { label: 'Blue', value: 'Blue', checked: false },
    { label: 'Brown', value: 'Brown', checked: false },
    { label: 'Green', value: 'Green', checked: false },
    { label: 'Grey', value: 'Grey', checked: false },
    { label: 'Pink', value: 'Pink', checked: false },
    { label: 'Purple', value: 'Purple', checked: false },
    { label: 'Red', value: 'Red', checked: false },
    { label: 'White', value: 'White', checked: false },
    { label: 'Yellow', value: 'Yellow', checked: false },
  ];
  checkboxMaterial = [
    { label: 'Ceramic', value: 'Ceramic', checked: false },
    { label: 'Classic', value: 'Classic', checked: false },
    { label: 'Creamy', value: 'Creamy', checked: false },
    { label: 'Cappuccino', value: 'Cappuccino', checked: false },
    { label: 'Dhak Blend', value: 'Dhak Blend', checked: false },
    { label: 'Dark Roast', value: 'Dark Roast', checked: false },
    { label: 'Ethiopian', value: 'Ethiopian', checked: false },
    { label: 'Hazelnut', value: 'Hazelnut', checked: false },
    { label: 'Hazinut', value: 'Hazinut', checked: false },
    { label: 'Italian', value: 'Italian', checked: false },
    { label: 'Kerehaklu', value: 'Kerehaklu', checked: false },
    { label: 'Medium', value: 'Medium', checked: false },
    { label: 'OG Blend', value: 'OG Blend', checked: false },
    { label: 'Rise Blend', value: 'Rise Blend', checked: false },
    { label: 'Soul Blend', value: 'Soul Blend', checked: false },
    { label: 'Steel', value: 'Steel', checked: false },
    { label: 'Strong', value: 'Strong', checked: false },
    { label: 'Thogarihunkal', value: 'Thogarihunkal', checked: false },
    { label: 'Vanilla', value: 'Vanilla', checked: false },
    { label: 'Vienna Roast', value: 'Vienna Roast', checked: false },
    { label: 'Vita Blend', value: 'Vita Blend', checked: false },
  ];
  checkboxSize = [
    { label: '1 Cups', value: 'Cups 1 size', checked: false },
    { label: '230 gram', value: 'gram230', checked: false },
    { label: '765 Grams', value: 'Grams 765', checked: false },
    { label: '900 Grams', value: 'Grams 900', checked: false },
    { label: '9.6 Ounces', value: 'Ounces 9.6', checked: false },
    { label: '5 cm x 5 cm x 8 cm', value: 'cm5xcm5xcm8', checked: false },
    { label: '6 cm x 6 cm x 8 cm', value: 'cm6xcm6xcm8', checked: false },
  ];
  checkboxStyle = [
    { label: '1 Cup', value: 'Cup 1 style', checked: false },
    { label: '2 Cups', value: 'Cup 2 style', checked: false },
  ];
  getStockData(): void {
    // Giả lập gọi API lấy dữ liệu, bạn có thể thay bằng một API thực tế
    this.inStockQuantity = 37; // Giả lập số lượng còn hàng
    this.outOfStockQuantity = 14; // Giả lập số lượng hết hàng
    this.minPrice=0
    this.maxPrice=782
    this.AccessoriesQty=7
    this.CoffeeQty=8
    this.GenericQty=7
    this.MachineQty=7
    this.MugQty=8
    this.ToolsQty=5
    this.ZpressoQty=0;
    this.BeanQty=0;
    this.BeanlyQty=0;
    this.BenkiQty=0;
    this.BudanQty=0;
    this.CoffeeWorkDoQty=0;
    this.GenericQty=0;
    this.KCQty=0;
    this.NescafeQty=0;
    this.RAGEQty=0;
    this.SunbeanQty=0;
    this.TATAQty=0;
    this.TokaiQty=0;
    this.BlackQty=0;
    this.BlueQty=0;
    this.BrownQty=0;
    this.GreenQty=0;
    this.GreyQty=0;
    this.PinkQty=0;
    this.PurpleQty=0;
    this.RedQty=0;
    this.WhiteQty=0;
    this.whiteQty=0;
    this.YellowQty=0;
    this.CeramiQty=0;
    this.ClassicQty=0;
    this.CreamyQty=0;
    this.CuppuccinoQty=0;
    this.DhakBlendQty=0;
    this.DrakRoastQty=0;
    this.EthiopianQty=0;
    this.HazelnutQty=0;
    this.HazinutQty=0;
    this.ItalianQty=0;
    this.KerehakluQty=0;
    this.MediumQty=0;
    this.OGBlendQty=0;
    this.RiseBlendQty=0;
    this.SoulBlendQty=0;
    this.SteelQty=0;
    this.StrongQty=0;
    this.ThogarihunkalQty=0;
    this.VenillaQty=0;
    this.ViennaRoastQty=0;
    this.VitaBlendQty=0;
    this.Cups1_size=0;
    this.gram230=0;
    this.Grams765=0;
    this.Grams900=0;
    this.Ounces9_6=0;
    this.cm5xcm5xcm8=0;
    this.cm6xcm6xcm8=0;
    this.Cup1_style=0;
    this.Cups2_style=0;
  }
  getQuantity(value: string): number {
    switch (value) {
      case 'In stock':
        return this.inStockQuantity
      case 'Out of stock':
        return this.outOfStockQuantity
      case 'Accessories':
        return this.AccessoriesQty;
      case 'Coffee':
        return this.CoffeeQty;
      case 'Grinder':
        return this.GenericQty;
      case 'Machine':
        return this.MachineQty;
      case 'Mugs':
        return this.MugQty;
      case 'Tools':
        return this.ToolsQty;
      case 'Zpresso':
        return this.ZpressoQty
      case 'Bean':
        return this.BeanQty
      case 'Beanly':
        return this.BeanlyQty
      case 'Benki':
        return this.BenkiQty
      case 'Budan':
        return this.BudanQty
      case 'Coffee WorkDo':
        return this.CoffeeWorkDoQty
      case 'Generic':
        return this.GenericQty
      case 'KC':
        return this.KCQty
      case 'Nescafe':
        return this.NescafeQty
      case 'RAGE':
        return this.RAGEQty
      case 'Sunbean':
        return this.SunbeanQty
      case 'TATA':
        return this.TATAQty
      case 'Tokai':
        return this.TokaiQty
      case 'Black':
        return this.BlackQty
      case 'Blue':
        return this.BlueQty
      case 'Brown':
        return this.BrownQty
      case 'Green':
        return this.GreenQty
      case 'Grey':
        return this.GreyQty
      case 'Pink':
        return this.PinkQty
      case 'Purple':
        return this.PurpleQty
      case 'Red':
        return this.RedQty
      case 'White':
        return this.WhiteQty
      case 'Yellow':
        return this.YellowQty
      case 'Ceramic':
        return this.CeramiQty
      case 'Classic':
        return this.ClassicQty
      case 'Creamy':
        return this.CreamyQty
      case 'Cappuccino':
        return this.CuppuccinoQty
      case 'Dhak Blend':
        return this.DhakBlendQty
      case 'Dark Roast':
        return this.DrakRoastQty
      case 'Ethiopian':
        return this.EthiopianQty
      case 'Hazelnut':
        return this.HazelnutQty
      case 'Hazinut':
        return this.HazinutQty
      case 'Italian':
        return this.ItalianQty
      case 'Kerehaklu':
        return this.KerehakluQty
      case 'Medium':
        return this.MediumQty
      case 'OG Blend':
        return this.OGBlendQty
      case 'Rise Blend':
        return this.RiseBlendQty
      case 'Soul Blend':
        return this.SoulBlendQty
      case 'Steel':
        return this.SteelQty
      case 'Strong':
        return this.StrongQty
      case 'Thogarihunkal':
        return this.ThogarihunkalQty
      case 'Vanilla':
        return this.VenillaQty
      case 'Vienna Roast':
        return this.ViennaRoastQty
      case 'Vita Blend':
        return this.VitaBlendQty
        case 'Cups 1 size':
          return this.Cups1_size;
        case 'Gram 230':
          return this.gram230;
        case 'Grams 765':
          return this.Grams765;
        case 'Grams 900':
          return this.Grams900;
        case 'Ounces 9.6':
          return this.Ounces9_6;
        case 'cm 5x5x8':
          return this.cm5xcm5xcm8;
        case 'cm 6x6x8':
          return this.cm6xcm6xcm8;
          case 'Cup 1 style':
            return this.Cup1_style;
          case 'Cup 2 style':
            return this.Cups2_style;
      default:
        return 0; // Nếu không có
    }
  }
  log(values: string[]): void {
    console.log(values);
  }

  changePrice(price:any){

  }

}
