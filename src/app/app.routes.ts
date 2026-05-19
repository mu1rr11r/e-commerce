import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandComponent } from './components/brand/brand.component';
import { ProductComponent } from './components/product/product.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { authGuard } from './core/guards/auth.guard';
import { logdGuard } from './core/guards/logd.guard';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
    {path:'',redirectTo:'blank/home',pathMatch:'full'},
    {path:'auth',component:AuthLayoutComponent,canActivate:[logdGuard],children:
        [
            {path:'',redirectTo:'login',pathMatch:'full'},
            {path: 'login',component:LoginComponent},
            {path: 'register',component:RegisterComponent},
            {path:'Forgotpassword',component:ForgotpasswordComponent}
        ]},
    {path:'blank',component:BlankLayoutComponent,canActivate:[authGuard],children:
        [
            {path:'',redirectTo:'home',pathMatch:'full'},
            {path:'home',component:HomeComponent},
            {path:'cart',component:CartComponent},
            {path:'category',component:CategoryComponent},
            {path:'brand',component:BrandComponent},
            {path:'product',component:ProductComponent},
            {path:'details/:id',component:DetailsComponent},

            
        ]},
    {path:'**',redirectTo:'blank/home'}
]