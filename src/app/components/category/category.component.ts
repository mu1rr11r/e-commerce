import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/service/categories.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  private readonly _CategoriesService=inject(CategoriesService)


ngOnInit(): void {
  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res);
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

}
