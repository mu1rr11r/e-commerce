import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdectService } from '../../core/service/prodect.service';
import { Iprodect } from '../../core/interface/iprodect';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly _ProdectService = inject(ProdectService);
  products: Iprodect[] = [];

  ngOnInit(): void { 
    this._ProdectService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToCart(productId: string): void {
    console.log('Add to cart:', productId);
    
  }
}
