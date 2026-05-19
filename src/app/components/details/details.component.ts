import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProdectService } from '../../core/service/prodect.service';
import { Iprodect } from '../../core/interface/iprodect';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProdectService = inject(ProdectService);

  product: Iprodect | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        const iprodect = p.get('id');
        this._ProdectService.specificProduct(iprodect).subscribe({
          next: (res) => {
            this.product = res.data;
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }

  addToCart(productId: string | undefined): void {
    console.log('Add to cart:', productId);
  }
}
