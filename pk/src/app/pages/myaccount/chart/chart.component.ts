import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
//import * as  from "chartjs-plugin-annotation";

import { environment } from "../../../../environments/environment.prod";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

import { Meta, Title } from "@angular/platform-browser";
import * as moment from "moment";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {
  listingid = this.route.snapshot.paramMap.get("id");
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  date = new Date();

  /*Last month */
  lmfirstDay = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
  lmlastDay = new Date(
    this.lmfirstDay.getFullYear(),
    this.lmfirstDay.getMonth() + 1,
    0
  );
  /*End Last month*/

  /*Week firstdate and lastdate */
  wkfirst = this.date.getDate() - this.date.getDay();
  wklast = this.wkfirst + 6;
  wkfirstday = new Date(this.date.setDate(this.wkfirst)).toUTCString();
  wklastday = new Date(this.date.setDate(this.wklast)).toUTCString();
  /* End Week firstdate and lastdate */

  Auth_Token = localStorage.getItem("token");
  logeduser = localStorage.getItem("logedUser");

  public viewslineChartData: ChartDataSets[] = [];
  public viewslineChartLabels: [];

  /* public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: []; */
  public lineChartOptions: ChartOptions & { annotation: any } = {
    maintainAspectRatio: false,

    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],

      yAxes: [
        {
          id: "y-axis-0",
          position: "left"
        },
        {
          id: "y-axis-1",
          position: "right",
          gridLines: {
            color: "rgb(236, 252, 255)"
          },
          ticks: {
            fontColor: "#eaeaea"
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "rgb(236, 252, 255)",
          borderWidth: 1,
          label: {
            enabled: true,
            fontColor: "#ccc",
            content: "LineAnno"
          }
        }
      ]
    }
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 0.8)",
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 99, 132, 0.8)",
      borderWidth: 1
    },
    {
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 0.8)",
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(54, 162, 235, 0.8)",
      borderWidth: 1
    },
    {
      backgroundColor: "rgba(255, 206, 86, 0.5)",
      borderColor: "rgba(255, 206, 86, 0.8)",
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 206, 86, 0.8)",
      borderWidth: 1
    },
    {
      backgroundColor: "rgba(153, 102, 255, 0.5)",
      borderColor: "rgba(153, 102, 255, 0.8)",
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(153, 102, 255, 0.8)",
      borderWidth: 1
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];

  chart: BaseChartDirective;
  //@ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  statfilter($event) {
    var val = $event.target.value;
    console.log("test" + val);
    if (val == "week") {
      this.currentweek();
    }
    if (val == "currentmonth") {
      this.currentmonth();
    }
    if (val == "lastmonth") {
      this.lastmonth();
    }
    if (val == "3month") {
      this.month3();
    }
    if (val == "6month") {
      this.month6();
    }
    if (val == "1year") {
      this.month12();
    }
  }

  ngOnInit() {
    this.currentweek();
    var chart = this.chart.getChartConfiguration();
    console.log(chart);
  }

  currentweek() {
    const today = moment();
    const from_date = today.startOf("week").format("YYYY-MM-DD");
    const to_date = today.endOf("week").format("YYYY-MM-DD  ");

    /*-----views------*/

    var viewsUrl =
      environment.apiUrl +
      "/stats/listing-stats/id/" +
      this.listingid +
      "?start_date=" +
      from_date.toString() +
      "&end_date=" +
      to_date.toString() +
      "";

    this.http
      .get(viewsUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.viewslineChartLabels = res.labels;
          this.viewslineChartData = res.data;
          this.chart.update();
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }

  currentmonth() {
    const today = moment();
    const from_date = today.startOf("month").format("YYYY-MM-DD");
    const to_date = today.endOf("month").format("YYYY-MM-DD  ");

    /*-----views------*/
    var viewsUrl =
      environment.apiUrl +
      "/stats/listing-stats/id/" +
      this.listingid +
      "?start_date=" +
      from_date.toString() +
      "&end_date=" +
      to_date.toString() +
      "";

    this.http
      .get(viewsUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.viewslineChartLabels = res.labels;
          this.viewslineChartData = res.data;
          this.chart.update();
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }

  lastmonth() {
    const today = moment().subtract(1, "months");
    const from_date = today.startOf("month").format("YYYY-MM-DD");
    const to_date = today.endOf("month").format("YYYY-MM-DD");

    /*-----views------*/
    var viewsUrl =
      environment.apiUrl +
      "/stats/listing-stats/id/" +
      this.listingid +
      "?start_date=" +
      from_date.toString() +
      "&end_date=" +
      to_date.toString() +
      "";

    this.http
      .get(viewsUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.viewslineChartLabels = res.labels;
          this.viewslineChartData = res.data;
          this.chart.update();
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }

  month3() {
    /*-----views------*/
    var viewsUrl =
      environment.apiUrl +
      "/stats/listing-stats/id/" +
      this.listingid +
      "?type=3month";

    this.http
      .get(viewsUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.viewslineChartLabels = res.labels;
          this.viewslineChartData = res.data;
          this.chart.update();
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }

  month6() {
    /*-----views------*/
    var viewsUrl =
      environment.apiUrl +
      "/stats/listing-stats/id/" +
      this.listingid +
      "?type=6month";

    this.http
      .get(viewsUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.viewslineChartLabels = res.labels;
          this.viewslineChartData = res.data;
          this.chart.update();
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }

  month12() {
    /*-----views------*/
    var viewsUrl =
      environment.apiUrl +
      "/stats/listing-stats/id/" +
      this.listingid +
      "?type=1year";

    this.http
      .get(viewsUrl, {
        headers: new HttpHeaders().set("Authorization", this.Auth_Token)
      })
      .subscribe(
        (res: any) => {
          this.viewslineChartLabels = res.labels;
          this.viewslineChartData = res.data;
          this.chart.update();
        },
        (msg: any) => {
          console.log(msg);
        }
      );
  }
}
