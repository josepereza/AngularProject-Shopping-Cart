import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { ContactComponent } from './components/contact/contact.component';
import { ActionComponent } from './components/action/action.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('CLIENT ID') // this is provied by google.
                                                   // you have to go in youre google account api and from there you will get that.
  }

]);

export function provideConfig(): any {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ContactComponent,
    ActionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    SocialLoginModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
