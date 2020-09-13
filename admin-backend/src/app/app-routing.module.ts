import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { MainContentComponent } from './components/main-content/main-content.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent
  },
  {
    path: 'products/all-products',
    component: AllProductsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
