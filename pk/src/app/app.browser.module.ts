import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { AdsComponent } from './shared/ads/ads.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    
    AppRoutingModule,
    
    AppModule,
    
    BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
