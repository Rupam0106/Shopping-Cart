import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AppRoutingModule } from '../app-routing.module';
import { HeroComponent } from './partials/hero/hero.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    HeroComponent,
    LoginComponent,
    RegisterComponent,
  ],
  exports: [HeaderComponent, FooterComponent, HomeComponent, ProductsComponent],
  imports: [CommonModule,AppRoutingModule,FormsModule],
})
export class ComponentsModule {}