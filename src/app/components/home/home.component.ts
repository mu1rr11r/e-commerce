import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdectService } from '../../core/service/prodect.service';
import { Iprodect } from '../../core/interface/iprodect';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/service/categories.service';
import { Icategories } from '../../core/interface/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{
  private readonly _ProdectService = inject(ProdectService);
  private readonly _CategoriesService = inject(CategoriesService);
   

  hmed = new Date();
  
  products: Iprodect[] = [];

  categories: Icategories[] = [];

  getallsubscraibtion !:Subscription 
customOptionsCat: OwlOptions = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 3200,
  autoplayHoverPause: true,
  smartSpeed: 700,
  autoplaySpeed: 700,
  mouseDrag: true, 
  touchDrag: true,
  pullDrag: true,
  dots: false,
  nav: true,
  navSpeed: 700,
  navText: ['<', '>'],
  margin: 18,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  }
};
  ngOnInit(): void { 
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.categories = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this.getallsubscraibtion = this._ProdectService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.getallsubscraibtion?.unsubscribe();
  }

  addToCart(productId: string): void {
    console.log('Add to cart:', productId);
  }

  trackByProductId(index: number, item: Iprodect): string {
    return item._id;
  }

  trackByCategoryId(index: number, item: Icategories): string {
    return item._id;
  }
}
