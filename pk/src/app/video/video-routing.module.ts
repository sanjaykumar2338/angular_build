import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from '../shared/layouts/site-layout/site-layout.component';
import { VideolistingComponent } from './videolisting/videolisting.component';

const routes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      { path: "video", component: VideolistingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
