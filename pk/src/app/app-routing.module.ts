import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SiteLayoutComponent } from "./shared/layouts/site-layout/site-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { ResetpassComponent } from "./pages/resetpass/resetpass.component";
import { PackageComponent } from "./pages/package/package.component";
import { PagenotfoundComponent } from "./pages/pagenotfound/pagenotfound.component";
import { HeaderComponent } from "./shared/layouts/header/header.component";
import { AddlistingComponent } from "./pages/myaccount/addlisting/addlisting.component";
import { AddpromoComponent } from "./pages/myaccount/addpromo/addpromo.component";
import { AllbusinessComponent } from "./pages/myaccount/allbusiness/allbusiness.component";
import { ListreviewsComponent } from "./pages/myaccount/listreviews/listreviews.component";

import { DashboardComponent } from "./pages/myaccount/dashboard/dashboard.component";
import { ProfileviewComponent } from "./pages/myaccount/profileview/profileview.component";
import { ProfeditComponent } from "./pages/myaccount/profedit/profedit.component";
import { TermsComponent } from "./pages/terms/terms.component";
import { PrivacyComponent } from "./pages/privacy/privacy.component";
import { ListingComponent } from "./pages/listing/listing.component";
import { CategoryComponent } from "./pages/category/category.component";
import { SearchComponent } from "./pages/search/search.component";
import { OwnersComponent } from "./pages/owners/owners.component";

import { Layout2Component } from "./shared/layouts/layout2/layout2.component";
import { LocalmarketComponent } from "./pages/landing/localmarket/localmarket.component";
import { AudienceComponent } from "./pages/landing/audience/audience.component";
import { SupportComponent } from "./pages/landing/support/support.component";
import { MessagesComponent } from "./pages/myaccount/messages/messages.component";
import { ClaimComponent } from "./pages/myaccount/claim/claim.component";
import { ListsettingComponent } from "./pages/myaccount/listsetting/listsetting.component";
import { InvoiceComponent } from "./pages/myaccount/invoice/invoice.component";
import { InvoicedetailComponent } from "./pages/myaccount/invoicedetail/invoicedetail.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { AuthGuardService as AuthService } from "./auth/auth-guard.service";
import { LogoutComponent } from "./pages/logout/logout.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { VerifyComponent } from "./pages/myaccount/verify/verify.component";
import { HelpComponent } from "./pages/help/help.component";
import { PaysuccessComponent } from "./pages/paysuccess/paysuccess.component";
import { PaycancelComponent } from "./pages/paycancel/paycancel.component";
import { EditlistingComponent } from "./pages/myaccount/editlisting/editlisting.component";
import { EditpromoComponent } from "./pages/myaccount/editpromo/editpromo.component";
import { TargetComponent } from "./pages/landing/target/target.component";
import { ValueComponent } from "./pages/landing/value/value.component";
import { PayfreeSuccessComponent } from "./pages/payfree-success/payfree-success.component";
import { SubcateComponent } from "./pages/subcate/subcate.component";
import { RegionsComponent } from "./pages/regions/regions.component";

import { PromoComponent } from "./pages/promo/promo.component";
import { JoinersComponent } from "./pages/myaccount/joiners/joiners.component";
import { AboutusComponent } from "./pages/aboutus/aboutus.component";
import { HowitsComponent } from "./pages/howits/howits.component";
import { ContactusComponent } from "./pages/contactus/contactus.component";
import { TermchildComponent } from "./pages/termchild/termchild.component";
import { ContentpolicyComponent } from "./pages/contentpolicy/contentpolicy.component";
import { StatelandingComponent } from "./pages/landing/statelanding/statelanding.component";
import { CitylandingComponent } from "./pages/landing/citylanding/citylanding.component";
import { CityservlandingComponent } from "./pages/landing/cityservlanding/cityservlanding.component";
import { AudiencecateComponent } from "./pages/landing/audience/audiencecate/audiencecate.component";
import { AudiencesubcateComponent } from "./pages/landing/audience/audiencesubcate/audiencesubcate.component";
import { AudienceservComponent } from "./pages/landing/audience/audienceserv/audienceserv.component";
import { CareerComponent } from "./pages/career/career.component";
import { ChartComponent } from "./pages/myaccount/chart/chart.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { HomenewComponent } from "./pages/homenew/homenew.component";
import { ThanksComponent } from "./pages/myaccount/thanks/thanks.component";
import { PrivacychildComponent } from "./pages/privacychild/privacychild.component";
import { LocalserviceComponent } from "./pages/landing/localservice/localservice.component";

import { RegionallComponent } from "./pages/regionall/regionall.component";
import { ListstatsComponent } from "./pages/myaccount/chart/liststats/liststats.component";
import { WebstatsComponent } from "./pages/myaccount/chart/webstats/webstats.component";
import { AddstatsComponent } from "./pages/myaccount/chart/addstats/addstats.component";
import { SearchstatsComponent } from "./pages/myaccount/chart/searchstats/searchstats.component";
import { ListingdetailComponent } from "./listingdetail/listingdetail.component";
import { NewletterunsubComponent } from "./pages/newletterunsub/newletterunsub.component";
import { Newsletterunsub2Component } from "./pages/newsletterunsub2/newsletterunsub2.component";

import { LoginfrmComponent } from "./pages/loginfrm/loginfrm.component";
import { StarterComponent } from "./pages/plan/starter/starter.component";
import { BasicComponent } from "./pages/plan/basic/basic.component";
import { ProfessionalComponent } from "./pages/plan/professional/professional.component";
import { EnterpriseComponent } from "./pages/plan/enterprise/enterprise.component";
import { PricingComponent } from "./pages/plan/pricing/pricing.component";
import { OwnerdetailComponent } from "./pages/ownerdetail/ownerdetail.component";

import { Layout3Component } from "./shared/layout3/layout3.component";
import { OnlineListingComponent } from "./pages/online-listing/online-listing.component";
import { TestsComponent } from "./pages/tests/tests.component";
import { IndemnificationComponent } from "./pages/indemnification/indemnification.component";
import { DisclaimerLimitationsComponent } from "./pages/disclaimer-limitations/disclaimer-limitations.component";
import { VerifyemailComponent } from "./pages/myaccount/verifyemail/verifyemail.component";
import { EnquiryReplyComponent } from "./pages/enquiry-reply/enquiry-reply.component";

import { ReqenquiryComponent } from "./pages/myaccount-guest/reqenquiry/reqenquiry.component";
import { EnquiryresponseComponent } from "./pages/myaccount-guest/enquiryresponse/enquiryresponse.component";
import { MessageComponent } from "./pages/myaccount/message/message.component";
import { Liststats2Component } from "./pages/myaccount/chart/liststats2/liststats2.component";
import { ReqcustomerComponent } from "./pages/myaccount/reqcustomer/reqcustomer.component";
import { EnquiryComponent } from "./pages/myaccount/enquiry/enquiry.component";
import { AgentsComponent } from "./pages/agents/agents.component";
import { AgentprofileComponent } from "./pages/agents/agentprofile/agentprofile.component";
import { AgentprofeditComponent } from "./pages/agents/agentprofedit/agentprofedit.component";
import { CommissionComponent } from "./pages/agents/commission/commission.component";
import { CustomerComponent } from "./pages/agents/customer/customer.component";
import { RegisteragentcustomerComponent } from "./pages/registeragentcustomer/registeragentcustomer.component";
import { RegisteragentComponent } from "./pages/registeragent/registeragent.component";
import { CreateleadComponent } from "./pages/agents/createlead/createlead.component";
import { LeadsComponent } from "./pages/agents/leads/leads.component";
import { VideolistingComponent } from "./video/videolisting/videolisting.component";
import { SinglevideoComponent } from "./video/singlevideo/singlevideo.component";
import { VideocateComponent } from "./video/videocate/videocate.component";
import { Test1Component } from "./pages/test1/test1.component";
import { IncancelComponent } from "./pages/myaccount/invoice/incancel/incancel.component";


const routes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      { path: "home", component: HomenewComponent },
      { path: "", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "referred-user", component: RegisteragentcustomerComponent },
      { path: "career", component: RegisteragentComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "reset-password", component: ResetpassComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "plans", component: PricingComponent },

      { path: "owners", component: OwnersComponent },
      { path: "author/:single", component: OwnerdetailComponent },
      { path: "about-us", component: AboutusComponent },
      { path: "how-it-works", component: HowitsComponent },
      { path: "contact-us", component: ContactusComponent },

      {
        path: "online-listing-and-link-building-services",
        component: OnlineListingComponent
      },
      {
        path: "indemnification",
        component: IndemnificationComponent
      },
      {
        path: "disclaimer-limitations-liability",
        component: DisclaimerLimitationsComponent
      },
      { path: "terms-and-conditions", component: TermsComponent },
      { path: "terms-and-conditions/:child", component: TermchildComponent },
      { path: "privacy-policy", component: PrivacyComponent },
      { path: "privacy-policy/:child", component: PrivacychildComponent },
      { path: "content-policy", component: ContentpolicyComponent },
      { path: "listing-category/:slug", component: CategoryComponent },
      { path: "listing-category/:slug/:child", component: SubcateComponent },
      { path: "listing-region/:slug", component: RegionsComponent },
      { path: "business-regions", component: RegionallComponent },
      { path: "listings", component: SearchComponent },
      { path: "explore", component: PromoComponent },
      { path: "engage", component: PromoComponent },
      { path: "shop", component: PromoComponent },
      { path: "review", component: PromoComponent },
      { path: "thankyou/:id", component: ThanksComponent },
      { path: "logfrm", component: LoginfrmComponent },
      { path: "testing", component: TestsComponent },
      {
        path: "newsletter-unsubscribe",
        component: NewletterunsubComponent
      },
      {
        path: "newsletter-userprofile",
        component: Newsletterunsub2Component
      },
      {
        path: "verifyemail/:id",
        component: VerifyemailComponent
      },
      {
        path: "enquiry-reply/:enqid",
        component: EnquiryReplyComponent
      },
      { path: "listing/:slug", component: ListingdetailComponent },
      {
        path: "video",
        component: VideolistingComponent
      },
      {
        path: "video/:slug",
        component: SinglevideoComponent
      },
      {
        path: "video-category/:slug",
        component: VideocateComponent
      }
    ]
  },
  {
    path: "",
    component: SiteLayoutComponent,
    canActivate: [AuthService],
    children: [
      { path: "myaccount", component: DashboardComponent },
      { path: "my-profile", component: ProfileviewComponent },
      { path: "profile-edit", component: ProfeditComponent },
      { path: "all-business", component: AllbusinessComponent },
      { path: "add-business", component: AddlistingComponent },
      { path: "edit-business/:id", component: EditlistingComponent },
      { path: "add-promotion", component: AddpromoComponent },
      { path: "edit-promotion/:id", component: EditpromoComponent },
      { path: "messages", component: MessagesComponent },
      { path: "single-message/:id", component: MessageComponent },
      { path: "list-of-joiners", component: JoinersComponent },
      { path: "claim-your-business", component: ClaimComponent },
      { path: "verify-your-business", component: VerifyComponent },
      { path: "settings", component: ListsettingComponent },
      { path: "listing-reviews", component: ListreviewsComponent },
      { path: "billing", component: InvoiceComponent },
      { path: "invoice-detail/:id", component: InvoicedetailComponent },
      { path: "invoice-cancel/:id", component: IncancelComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "payment-success/:id", component: PaysuccessComponent },
      { path: "payment-cancel", component: PaycancelComponent },
      { path: "payfree-success", component: PayfreeSuccessComponent },
      { path: "listing-stats/:id", component: ChartComponent },
      { path: "all-listing-stats", component: Liststats2Component },
      { path: "listing-visit-stats", component: ListstatsComponent },
      { path: "website-visit-stats", component: WebstatsComponent },
      { path: "address-visit-stats", component: AddstatsComponent },
      { path: "search-visit-stats", component: SearchstatsComponent },
      { path: "customer-enquiry", component: ReqenquiryComponent },
      { path: "enquiry-response/:id", component: EnquiryresponseComponent },
      { path: "customer-requests", component: ReqcustomerComponent },
      { path: "listing-enquiry", component: EnquiryComponent }
    ]
  },
  {
    path: "",
    component: Layout3Component,
    children: [
      { path: "plans/link-building-service", component: StarterComponent },
      { path: "plans/landing-page-builder", component: BasicComponent },
      { path: "plans/advertising", component: ProfessionalComponent },
      { path: "plans/marketing", component: EnterpriseComponent }
    ]
  },
  {
    path: "",
    component: Layout2Component,
    children: [
      {
        path: "local-marketing",
        component: LocalmarketComponent
      },
      {
        path: "local-marketing/ad-builder",
        component: LocalserviceComponent
      },
      {
        path: "local-marketing/lead-builder",
        component: LocalserviceComponent
      },
      {
        path: "local-marketing/sales-builder",
        component: LocalserviceComponent
      },
      {
        path: "local-marketing/review-builder",
        component: LocalserviceComponent
      },
      {
        path: "local-marketing/:state",
        component: StatelandingComponent
      },
      {
        path: "audience-interest",
        component: AudienceComponent
      },
      {
        path: "audience-interest/display-ad",
        component: AudienceservComponent
      },
      {
        path: "audience-interest/free-target-audience",
        component: AudienceservComponent
      },
      {
        path: "audience-interest/reach-audience",
        component: AudienceservComponent
      },
      {
        path: "audience-interest/connect-with-customers",
        component: AudienceservComponent
      },
      {
        path: "audience-interest/:cate",
        component: AudiencecateComponent
      },
      {
        path: "target-audience",
        component: TargetComponent
      },
      {
        path: "value-marketing",
        component: ValueComponent
      }
    ]
  },
  {
    path: "",
    component: SiteLayoutComponent,
    canActivate: [AuthService],
    children: [
      { path: "agent", component: AgentsComponent },
      { path: "agent/profile", component: AgentprofileComponent },
      { path: "agent/profile-edit", component: AgentprofeditComponent },
      { path: "agent/customers", component: CustomerComponent },
      { path: "agent/commissions", component: CommissionComponent },
      { path: "agent/create-lead", component: CreateleadComponent },
      { path: "agent/leads", component: LeadsComponent }
    ]
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      {
        path: "404",
        component: PagenotfoundComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: "404"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
