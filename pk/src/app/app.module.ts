import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AdsenseModule } from "ng2-adsense";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxTwitterTimelineModule } from "ngx-twitter-timeline";
import { FacebookModule } from "@greg-md/ng-facebook";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedInLoginProvider
} from "angularx-social-login";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./shared/layouts/header/header.component";
import { FooterComponent } from "./shared/layouts/footer/footer.component";
import { AdsComponent } from "./shared/ads/ads.component";
import { CommonModule } from "@angular/common";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { HttpClientModule } from "@angular/common/http";
import { NgtUniversalModule } from "@ng-toolkit/universal";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { PackageComponent } from "./pages/package/package.component";
import { PagenotfoundComponent } from "./pages/pagenotfound/pagenotfound.component";
import { SiteLayoutComponent } from "./shared/layouts/site-layout/site-layout.component";
import { HeaderctrlDirective } from "./shared/layouts/header/headerctrl.directive";
import { AddlistingComponent } from "./pages/myaccount/addlisting/addlisting.component";
import { DashmenuComponent } from "./pages/myaccount/dashmenu/dashmenu.component";
import { DashmsgComponent } from "./pages/myaccount/dashmsg/dashmsg.component";
import { AddpromoComponent } from "./pages/myaccount/addpromo/addpromo.component";
import { AllbusinessComponent } from "./pages/myaccount/allbusiness/allbusiness.component";
import { ListreviewsComponent } from "./pages/myaccount/listreviews/listreviews.component";
import { ProfileviewComponent } from "./pages/myaccount/profileview/profileview.component";
import { ProfeditComponent } from "./pages/myaccount/profedit/profedit.component";
import { TermsComponent } from "./pages/terms/terms.component";
import { PrivacyComponent } from "./pages/privacy/privacy.component";
import { CategoryComponent } from "./pages/category/category.component";
import { ListingComponent } from "./pages/listing/listing.component";
import { SearchComponent } from "./pages/search/search.component";
import { FilterComponent } from "./pages/filter/filter.component";
import { LocalmarketComponent } from "./pages/landing/localmarket/localmarket.component";
import { AudienceComponent } from "./pages/landing/audience/audience.component";
import { Layout2Component } from "./shared/layouts/layout2/layout2.component";
import { LandheadComponent } from "./shared/layouts/landhead/landhead.component";
import { LandfootComponent } from "./shared/layouts/landfoot/landfoot.component";
import { SupportComponent } from "./pages/landing/support/support.component";
import { DashboardComponent } from "./pages/myaccount/dashboard/dashboard.component";
import { MessagesComponent } from "./pages/myaccount/messages/messages.component";
import { ClaimComponent } from "./pages/myaccount/claim/claim.component";
import { InvoiceComponent } from "./pages/myaccount/invoice/invoice.component";
import { ListsettingComponent } from "./pages/myaccount/listsetting/listsetting.component";
import { InvoicedetailComponent } from "./pages/myaccount/invoicedetail/invoicedetail.component";
import { OwnersComponent } from "./pages/owners/owners.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { LogoutComponent } from "./pages/logout/logout.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { ResetpassComponent } from "./pages/resetpass/resetpass.component";
import { VerifyComponent } from "./pages/myaccount/verify/verify.component";
import { HelpComponent } from "./pages/help/help.component";
import { PaysuccessComponent } from "./pages/paysuccess/paysuccess.component";
import { PaycancelComponent } from "./pages/paycancel/paycancel.component";
import { EditlistingComponent } from "./pages/myaccount/editlisting/editlisting.component";
import { EditpromoComponent } from "./pages/myaccount/editpromo/editpromo.component";
import { TargetComponent } from "./pages/landing/target/target.component";
import { ValueComponent } from "./pages/landing/value/value.component";
import { PayfreeSuccessComponent } from "./pages/payfree-success/payfree-success.component";
import { RegionsComponent } from "./pages/regions/regions.component";
import { SubcateComponent } from "./pages/subcate/subcate.component";
import { PageservService } from "./services/pageserv.service";
import { PromoComponent } from "./pages/promo/promo.component";
import { JoinersComponent } from "./pages/myaccount/joiners/joiners.component";
import { AboutusComponent } from "./pages/aboutus/aboutus.component";
import { HowitsComponent } from "./pages/howits/howits.component";
import { ContactusComponent } from "./pages/contactus/contactus.component";
import { TermsidebarComponent } from "./shared/termsidebar/termsidebar.component";
import { TermchildComponent } from "./pages/termchild/termchild.component";
import { ContentpolicyComponent } from "./pages/contentpolicy/contentpolicy.component";
import { SocialloginComponent } from "./pages/sociallogin/sociallogin.component";
import { StatelandingComponent } from "./pages/landing/statelanding/statelanding.component";
import { CitylandingComponent } from "./pages/landing/citylanding/citylanding.component";
import { CityservlandingComponent } from "./pages/landing/cityservlanding/cityservlanding.component";
import { FunnelfrmComponent } from "./pages/landing/funnelfrm/funnelfrm.component";
import { AudiencesubcateComponent } from "./pages/landing/audience/audiencesubcate/audiencesubcate.component";
import { AudiencecateComponent } from "./pages/landing/audience/audiencecate/audiencecate.component";
import { AudienceservComponent } from "./pages/landing/audience/audienceserv/audienceserv.component";
import { CareerComponent } from "./pages/career/career.component";
import { ChartComponent } from "./pages/myaccount/chart/chart.component";
import { ChartsModule } from "ng2-charts";
//import { SiteComponent } from './shared/layouts/site/site.component';
import { AngularEditorModule } from "@kolkov/angular-editor";
import { FormsModule } from "@angular/forms";
import { NotfoundComponent } from "./notfound/notfound.component";
import { MetaModule } from "@ngx-meta/core";
import { HomenewComponent } from "./pages/homenew/homenew.component";
import { ThanksComponent } from "./pages/myaccount/thanks/thanks.component";
import { PrivacychildComponent } from "./pages/privacychild/privacychild.component";
import { LocalserviceComponent } from "./pages/landing/localservice/localservice.component";
import { AudienceservicesComponent } from "./pages/landing/audienceservices/audienceservices.component";
import { NgxPaginationModule } from "ngx-pagination";


import { RegionallComponent } from "./pages/regionall/regionall.component";
import { ListstatsComponent } from "./pages/myaccount/chart/liststats/liststats.component";
import { WebstatsComponent } from "./pages/myaccount/chart/webstats/webstats.component";
import { AddstatsComponent } from "./pages/myaccount/chart/addstats/addstats.component";
import { SearchstatsComponent } from "./pages/myaccount/chart/searchstats/searchstats.component";
import { ListingdetailComponent } from "./listingdetail/listingdetail.component";
import { NewletterunsubComponent } from "./pages/newletterunsub/newletterunsub.component";
import { Funnelfrm2Component } from "./pages/landing/funnelfrm2/funnelfrm2.component";
import { LoginfrmComponent } from "./pages/loginfrm/loginfrm.component";
import { BasicComponent } from "./pages/plan/basic/basic.component";
import { StarterComponent } from "./pages/plan/starter/starter.component";
import { ProfessionalComponent } from "./pages/plan/professional/professional.component";
import { EnterpriseComponent } from "./pages/plan/enterprise/enterprise.component";
import { PricingComponent } from "./pages/plan/pricing/pricing.component";
import { Funnelfrm3Component } from "./pages/landing/funnelfrm3/funnelfrm3.component";
import { OwnerdetailComponent } from "./pages/ownerdetail/ownerdetail.component";
import { Layout3Component } from "./shared/layout3/layout3.component";
import { TestsComponent } from "./pages/tests/tests.component";
import { OnlineListingComponent } from "./pages/online-listing/online-listing.component";
import { IndemnificationComponent } from "./pages/indemnification/indemnification.component";
import { DisclaimerLimitationsComponent } from "./pages/disclaimer-limitations/disclaimer-limitations.component";
import { LOCALE_ID } from "@angular/core";
import { VerifyemailComponent } from "./pages/myaccount/verifyemail/verifyemail.component";
import { EnquiryReplyComponent } from "./pages/enquiry-reply/enquiry-reply.component";
import { GuestdashboardComponent } from "./pages/myaccount-guest/guestdashboard/guestdashboard.component";
import { ReqenquiryComponent } from "./pages/myaccount-guest/reqenquiry/reqenquiry.component";
import { EnquiryresponseComponent } from "./pages/myaccount-guest/enquiryresponse/enquiryresponse.component";
import { MessageComponent } from "./pages/myaccount/message/message.component";
import { Liststats2Component } from "./pages/myaccount/chart/liststats2/liststats2.component";
import { Newsletterunsub2Component } from "./pages/newsletterunsub2/newsletterunsub2.component";
import { ReqcustomerComponent } from "./pages/myaccount/reqcustomer/reqcustomer.component";
import { EnquiryComponent } from "./pages/myaccount/enquiry/enquiry.component";
import { AgentsComponent } from "./pages/agents/agents.component";
import { AgentprofileComponent } from "./pages/agents/agentprofile/agentprofile.component";
import { AgentsidebarComponent } from "./pages/agents/agentsidebar/agentsidebar.component";
import { AgentprofeditComponent } from "./pages/agents/agentprofedit/agentprofedit.component";
import { CustomerComponent } from "./pages/agents/customer/customer.component";
import { CommissionComponent } from "./pages/agents/commission/commission.component";
import { ReqtoadminComponent } from "./pages/agents/reqtoadmin/reqtoadmin.component";
import { RegisteragentComponent } from "./pages/registeragent/registeragent.component";
import { RegisteragentcustomerComponent } from "./pages/registeragentcustomer/registeragentcustomer.component";
import { LeadsComponent } from './pages/agents/leads/leads.component';
import { CreateleadComponent } from './pages/agents/createlead/createlead.component';
import { VideoModule } from "./video/video.module";
import { Unit1Component } from './ads/unit1/unit1.component';
import { Unit2Component } from './ads/unit2/unit2.component';
import { Unit3Component } from './ads/unit3/unit3.component';
import { Unit4Component } from './ads/unit4/unit4.component';
import { Unit5Component } from './ads/unit5/unit5.component';
import { Test1Component } from "./pages/test1/test1.component";
import { IncancelComponent } from './pages/myaccount/invoice/incancel/incancel.component';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "545279007491-2bdvuk0ce6jig4eusfi2j1gdiaj0j3i8.apps.googleusercontent.com"
    )
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("685147935275841")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdsComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PackageComponent,
    PagenotfoundComponent,
    SiteLayoutComponent,
    HeaderctrlDirective,
    AddlistingComponent,
    DashmenuComponent,
    DashmsgComponent,
    AddpromoComponent,
    AllbusinessComponent,
    ListreviewsComponent,
    ProfileviewComponent,
    ProfeditComponent,
    TermsComponent,
    PrivacyComponent,
    CategoryComponent,
    ListingComponent,
    SearchComponent,
    FilterComponent,
    LocalmarketComponent,
    AudienceComponent,
    Layout2Component,
    LandheadComponent,
    LandfootComponent,
    SupportComponent,
    DashboardComponent,
    MessagesComponent,
    ClaimComponent,
    InvoiceComponent,
    ListsettingComponent,
    InvoicedetailComponent,
    OwnersComponent,
    CategoriesComponent,
    LogoutComponent,
    CheckoutComponent,
    ResetpassComponent,
    VerifyComponent,
    HelpComponent,
    PaysuccessComponent,
    PaycancelComponent,
    EditlistingComponent,
    EditpromoComponent,
    TargetComponent,
    ValueComponent,
    PayfreeSuccessComponent,
    RegionsComponent,
    SubcateComponent,
    PromoComponent,
    JoinersComponent,
    AboutusComponent,
    HowitsComponent,
    ContactusComponent,
    TermsidebarComponent,
    TermchildComponent,
    ContentpolicyComponent,
    SocialloginComponent,
    StatelandingComponent,
    CitylandingComponent,
    CityservlandingComponent,
    FunnelfrmComponent,
    AudiencesubcateComponent,
    AudiencecateComponent,
    AudienceservComponent,
    CareerComponent,
    ChartComponent,
    NotfoundComponent,
    HomenewComponent,
    ThanksComponent,
    PrivacychildComponent,
    LocalserviceComponent,
    AudienceservicesComponent,
    RegionallComponent,
    ListstatsComponent,
    WebstatsComponent,
    AddstatsComponent,
    SearchstatsComponent,
    ListingdetailComponent,
    NewletterunsubComponent,
    Funnelfrm2Component,
    LoginfrmComponent,
    BasicComponent,
    StarterComponent,
    ProfessionalComponent,
    EnterpriseComponent,
    PricingComponent,
    Funnelfrm3Component,
    OwnerdetailComponent,
    Layout3Component,
    TestsComponent,
    OnlineListingComponent,
    IndemnificationComponent,
    DisclaimerLimitationsComponent,
    VerifyemailComponent,
    EnquiryReplyComponent,
    GuestdashboardComponent,
    ReqenquiryComponent,
    EnquiryresponseComponent,
    MessageComponent,
    Liststats2Component,
    Newsletterunsub2Component,
    ReqcustomerComponent,
    EnquiryComponent,
    AgentsComponent,
    AgentprofileComponent,
    AgentsidebarComponent,
    AgentprofeditComponent,
    CustomerComponent,
    CommissionComponent,
    ReqtoadminComponent,
    RegisteragentComponent,
    RegisteragentcustomerComponent,
    LeadsComponent,
    CreateleadComponent,
    Test1Component,
    Unit1Component,
    Unit2Component,
    Unit3Component,
    Unit4Component,
    Unit5Component,
    IncancelComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    ReactiveFormsModule,
    MetaModule.forRoot(),
    SocialLoginModule,
    AdsenseModule.forRoot({}),
    NgxTwitterTimelineModule,
    NgxPaginationModule,
    FacebookModule,
    ChartsModule,
    AngularEditorModule,
    FormsModule,
    VideoModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    { provide: LOCALE_ID, useValue: "en-US" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
