
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // products: Product[] = [
  //   {
  //     "id": 1,
  //     "name": "iPhone 12 Pro",
  //     "desc": "Apple iPhone 12th generation",
  //     "price": 999,
  //     "color": "#33505a",
  //     "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021661000"
  //   },
  //   {
  //     "id": 2,
  //     "name": "Pixel 5",
  //     "desc": "Google Pixel phone 5th generation",
  //     "price": 699,
  //     "color": "#00ac51",
  //     "image": "https://cdn.shopify.com/s/files/1/0051/8301/2928/products/Pixel5Front-Reformatted_1200x1200.png?v=1605040074"
  //   },
  //   {
  //     "id": 3,
  //     "name": "M1 Macbook Air",
  //     "desc": "Apple Macbook air with apple silicon",
  //     "price": 1099,
  //     "color": "#e0bfae",
  //     "image": "https://photos5.appleinsider.com/price_guide/m1-macbook-pro-pp-header.png"
  //   },
  //   {
  //     "id": 4,
  //     "name": "Playstation 5",
  //     "desc": "Sony Playstation 5th generation",
  //     "price": 500,
  //     "color": "#544ee4",
  //     "image": "https://i1.wp.com/freepngimages.com/wp-content/uploads/2020/07/Playstation-5-games-console-transparent-background-png-image.png?fit=1000%2C1000"
  //   },
  //   {
  //     "id": 5,
  //     "name": "Airpods Pro",
  //     "desc": "Apple Aipods Pro 1st generation",
  //     "price": 200,
  //     "color": "#e3e4e9",
  //     "image": "https://crdms.images.consumerreports.org/c_lfill,w_598/prod/products/cr/models/400116-wireless-portable-headphones-apple-airpods-pro-10009323.png"
  //   },
  //   {
  //     "id": 6,
  //     "name": "iPad Pro",
  //     "desc": "Apple iPad Pro 2020 edition",
  //     "price": 799,
  //     "color": "#f73984",
  //     "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-silver-202003_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1583551131102"
  //   },
  //   {
  //     "id": 7,
  //     "name": "Galaxy S21 Ultra",
  //     "desc": "Samsung Galaxy S21 Ultra 2021 edition",
  //     "price": 1299,
  //     "color": "#1c1c1c",
  //     "image": "https://lh3.googleusercontent.com/qRQPjHrhRVIs-xnfNSyiPXOH2vH97ylMacgbTKebqJtRfNH3LlYo8pN-5igsLDWUH62tGl5zNpTsl5xd8SprzGmXoCEmWFOi2-2cQVGS-r3PaRXHt62DmJHq-jrYX0UQvWZ9BA=s800-c"
  //   },
  //   {
  //     "id": 8,
  //     "name": "Galaxy S21",
  //     "desc": "Samsung Galaxy S21 2021 edition",
  //     "price": 899,
  //     "color": "#7c95eb",
  //     "image": "https://images.samsung.com/is/image/samsung/p6pim/za/galaxy-s21/gallery/za-clear-cover-galaxy-s21-5g-ef-qg991ttegww-363168624?$720_576_PNG$"
  //   }
  // ];

  products: any[] = [];
  filteredProducts: any[] = [];
  filter: string = 'all';
  searchQuery: string = '';

  constructor(private productService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = data;
    });

    this.route.queryParams.subscribe(params => {
    this.searchQuery = params['searchQuery'] ? params['searchQuery'].toLowerCase() : '';
    this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        this.applyFilterAndSearch();
      },
      err => console.error("Error in fetching the data", err)
    );
  }

  onFilterChange(event: any): void {
    this.filter = event.target.value;
    this.applyFilter();
  }

  applyFilterAndSearch(): void {
    let filtered = [...this.products];

   
    if (this.searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery)
      );
    }
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'all':
        this.filteredProducts = this.products;
        break;
      case 'price':
        this.filteredProducts = this.products.sort((a, b) => a.price - b.price);
        break;
      case 'category':
        this.filteredProducts = this.products.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'rating':
        this.filteredProducts = this.products.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'brand':
        this.filteredProducts = this.products.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case 'stock':
        this.filteredProducts = this.products.sort((a, b) => b.rating.count - a.rating.count);
        break;
      default:
        this.filteredProducts = this.products;
        break;
    }
  }
}
