import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment.prod';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  cateSlug = this.route.snapshot.paramMap.get("slug");

  listingUrl= environment.apiUrl+'listings/search';
  listingRegion: any;
  listsPost: any;
  listSubcate: any;
  listData: any;

  searchUrl: any;
  skeyword: any;
  slat: any;
  slng: any;
  scate: any;

  choosecate:any;

  distances = [
    {'km' : '0 to 10km' ,'val' : '10' },
    {'km' : '11 to 50km','val' : '50' },
    {'km' : '51 to 100km','val' : '100' },
    {'km' : '101 to 500km','val' : '500' },
    {'km' : '500km Max','val' : '5000' }
  ];

  rating = [
    {'rate' : '5.0' },
    {'rate' : '4.0' },
    {'rate' : '3.0' },
    {'rate' : '2.0' },
    {'rate' : '1.0' },
    {'rate' : '0' }
  ];

  mostviews = [
    {'text' : 'Most Populars', 'subtext' : 'Views More than 3500', 'value':  '3500'  },
    {'text' : 'Populars', 'subtext' : 'Views More than 2500', 'value':  '2500'  },
    {'text' : 'Lowest', 'subtext' : 'Viewed Below  100', 'value':  '100'  }
  ];


  constructor(  private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {   
    //this.getListing(this.cateSlug);
    console.log(this.route.snapshot.url[0]['path']);
    console.log(this.route.snapshot.params['slug']);
    console.log(this.route.snapshot.params['child']);

    const pagetypeCateg=this.route.snapshot.params['slug'];
    const pagetypeSubCateg=this.route.snapshot.params['child'];
    const pagetypePromoLisiting=this.route.snapshot.url[0]['path'];
    const pagetypeRegionLisiting=this.route.snapshot.url[0]['path'];
    const pageSearchLisiting=this.route.snapshot.url[0]['path'];


    if(pagetypeCateg!=='' && pagetypeSubCateg===undefined && pagetypePromoLisiting=='listing-category'){
      this.getListing(pagetypeCateg);
      console.log('cate');      
    }
    else if(pagetypeCateg!=='' && pagetypeSubCateg!=='' && pagetypePromoLisiting=='listing-category' ){
      this.getListing(pagetypeSubCateg);
      console.log('subcate');
    }
    else if(pagetypePromoLisiting!=='listing-category' && pagetypePromoLisiting!=='listing-region' && pagetypePromoLisiting!=='listings'){
      this.getPromo(pagetypePromoLisiting);
      console.log('promo');
    }
    else if(pagetypeRegionLisiting==='listing-region'){
      this.getRegionList(pagetypeCateg);
      console.log('region');
    }
    else if(pageSearchLisiting==='listings'){
      this.getSearch();
      console.log('search');
    }

  }

  getListing(slug){    
    this.http.get(this.listingUrl+'/?search_category='+slug+'&search_type=listing').subscribe(
      (res: any)=>{
        this.listingRegion=res.regions;
        this.listSubcate=res.categories;  
        this.listData=res.data;
      }
    )
  }

  getPromo(slug){
    this.http.get(this.listingUrl+'/?search_type='+slug).subscribe(
      (res: any)=>{
        this.listingRegion=res.regions;
        this.listSubcate=res.categories;  
        this.listData=res.data;
      }
    )
  }

  getRegionList(slug){
    this.http.get(this.listingUrl+'/?search_region='+slug+'&search_type=listing').subscribe(
      (res: any)=>{
        this.listingRegion=res.regions;
        this.listSubcate=res.categories;  
        this.listData=res.data;
      }
    )
  }


  getSearch(){
    this.route.queryParams.subscribe(params => {
      this.skeyword= params['keyword'] ? params['keyword'] : '';
      this.slat= params['lat'] ? params['lat'] : '';
      this.slng= params['lng'] ? params['lng'] : '' ;
      this.scate= params['category']  ? params['category'] : '';
    });
    console.log(this.skeyword+"---");

    this.searchUrl=environment.apiUrl+"listings/search?search_lat="+this.slat+"&search_lng="+this.slng+"&search_keyword="+this.skeyword+"&search_category="+this.scate+"";
    this.http.get(this.searchUrl).subscribe(
      (res: any) => {
        this.listData=res.data;
        this.listingRegion=res.regions;
        this.listSubcate=res.categories;
        //console.log(res);
      },
      (msg: any)=>{
        console.log(msg);
      }
    );   
  }

  onSearch(){
   // console.log('test');
    var checkedcate = null; 
    var cates='filter_cate';
    var checkedregion= null;
    var regions='filter_region';
    var distance='filter_km';
    var checked_km= null;
    var rate='ratings';
    var checkedrate= null;
    var mviews= 'mview';
    var mviewed= null;


    for (var j = 0; j < this.listingRegion.length; j++) {
      if((<HTMLInputElement>(document.getElementsByClassName("filter_region")[j])).checked==true){
        checkedregion=(<HTMLInputElement>(document.getElementsByClassName("filter_region")[j])).value;
      }
    }

    for (var i = 0; i < cates.length; i++) {
      if((<HTMLInputElement>(document.getElementsByClassName("filter_cate")[i])).checked==true){
        checkedcate=(<HTMLInputElement>(document.getElementsByClassName("filter_cate")[i])).value;
      }  
    }
   
    for (var km = 0; km < this.distances.length; km++) {
      if((<HTMLInputElement>(document.getElementsByClassName("filter_km")[km])).checked==true){
        checked_km=(<HTMLInputElement>(document.getElementsByClassName("filter_km")[km])).value;
      }
    }

    for (var d = 0; d < this.rating.length; d++) {
      if((<HTMLInputElement>(document.getElementsByClassName("ratess")[d])).checked==true){
        checkedrate=(<HTMLInputElement>(document.getElementsByClassName("ratess")[d])).value;
      }
    }

    for (var i = 0; i < this.mostviews.length; i++) {
      if((<HTMLInputElement>(document.getElementsByClassName("mview")[i])).checked==true){
        mviewed=(<HTMLInputElement>(document.getElementsByClassName("mview")[i])).value;
      }
    }

    console.log('cate: '+cates.length+'-'+checkedcate);
    console.log('region: '+this.listingRegion.length+'-'+checkedregion);
    console.log('distance: '+this.distances.length+'-'+checked_km);
    console.log('rate: '+ this.rating.length+'-'+checkedrate);
    console.log('viewed: '+ this.mostviews.length+'-'+mviewed);
    
    if(checkedcate===null){
      checkedcate=this.cateSlug;
    }
    if(checkedregion==null){
      checkedregion='';
    }
    if(checked_km==null){
      checked_km='';
    }
    if(checkedrate==null){
      checkedrate='';
    }
    if(mviewed==null){
      mviewed='';
    }

    this.searchUrl=environment.apiUrl+"listings/search?search_category="+checkedcate+"&search_region="+checkedregion+"&search_radius="+checked_km+"&search_rating="+checkedrate+"&search_view="+mviewed;
    this.http.get(this.searchUrl).subscribe(
      (res: any) => {        
        console.log(res);
      },
      (msg: any)=>{
        console.log(msg);
      }
    );

  }

}
