import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRoutingModule } from './video-routing.module';
import { VideolistingComponent } from './videolisting/videolisting.component';
import { AppRoutingModule } from '../app-routing.module';
import { VideocateComponent } from './videocate/videocate.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SinglevideoComponent } from './singlevideo/singlevideo.component';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [VideolistingComponent, VideocateComponent, SinglevideoComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxPaginationModule,
    AdsenseModule.forRoot({
    }),
  ]
})
export class VideoModule { }
