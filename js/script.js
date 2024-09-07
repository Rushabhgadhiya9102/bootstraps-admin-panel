$("#home-page,#user-page,#message").hide();

// ----buttons----

$(".nav-link").on("click", function () {
  $("#home-page,#user-page,#message,#analysis").hide();
  $($(this).attr("href")).fadeToggle();
});

// -------------- graph ----------

window.Apex = {
  chart: {
    foreColor: "#000000",
    toolbar: {
      show: false,
    },
  },
  colors: ["#FCCF31", "#17ead9", "#f02fc2"],
  stroke: {
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#40475D",
  },
  xaxis: {
    axisTicks: {
      color: "#333",
    },
    axisBorder: {
      color: "#333",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      gradientToColors: ["#F55555", "#6078ea", "#6094ea"],
    },
  },
  tooltip: {
    theme: "dark",
    x: {
      formatter: function (val) {
        return moment(new Date(val)).format("HH:mm:ss");
      },
    },
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      offsetX: -10,
    },
  },
};

var trigoStrength = 3;
var iteration = 11;

function getRandom() {
  var i = iteration;
  return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2);
}

function getRangeRandom(yrange) {
  return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2);

    series.push([x, y]);
    baseval += 300000;
    i++;
  }
  return series;
}

function getNewData(baseval, yrange) {
  var newTime = baseval + 300000;
  return {
    x: newTime,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
  };
}

var optionsColumn = {
  chart: {
    foreColor: "black",
    height: 350,
    type: "bar",
    animations: {
      enabled: false,
    },
    events: {
      animationEnd: function (chartCtx, opts) {
        const newData = chartCtx.w.config.series[0].data.slice();
        newData.shift();
        window.setTimeout(function () {
          chartCtx.updateOptions(
            {
              series: [
                {
                  data: newData,
                },
              ],
              xaxis: {
                min: chartCtx.minX,
                max: chartCtx.maxX,
              },
              subtitle: {
                text: parseInt(getRangeRandom({ min: 1, max: 20 })).toString() + "%",
              },
            },
            false,
            false
          );
        }, 300);
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  series: [
    {
      name: "Load Average",
      data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
        min: 10,
        max: 110,
      }),
    },
  ],
  title: {
    text: "Load Average",
    align: "left",
    style: {
      fontSize: "12px",
    },
  },
  subtitle: {
    text: "20%",
    floating: true,
    align: "right",
    offsetY: 0,
    style: {
      fontSize: "22px",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.5,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100],
    },
  },
  xaxis: {
    type: "datetime",
    range: 2700000,
  },
};

var chartColumn = new ApexCharts(document.querySelector("#chart-1"), optionsColumn);
chartColumn.render();

var optionsLine = {
  chart: {
    height: 350,
    type: "line",
    stacked: true,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22,
    },
    events: {
      animationEnd: function (chartCtx, opts) {
        const newData1 = chartCtx.w.config.series[0].data.slice();
        newData1.shift();
        const newData2 = chartCtx.w.config.series[1].data.slice();
        newData2.shift();

        if (opts.el.node.getAttribute("index") === "0") {
          window.setTimeout(function () {
            chartCtx.updateOptions(
              {
                series: [
                  {
                    data: newData1,
                  },
                  {
                    data: newData2,
                  },
                ],
                subtitle: {
                  text: parseInt(getRandom() * Math.random()).toString(),
                },
              },
              false,
              false
            );
          }, 300);
        }
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    width: 5,
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
    },
  },
  markers: {
    size: 0,
    hover: {
      size: 0,
    },
  },
  series: [
    {
      name: "Running",
      data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
        min: 30,
        max: 110,
      }),
    },
    {
      name: "Waiting",
      data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
        min: 30,
        max: 110,
      }),
    },
  ],
  xaxis: {
    type: "datetime",
    range: 2700000,
  },
  title: {
    text: "Processes",
    align: "left",
    style: {
      fontSize: "12px",
    },
  },
  subtitle: {
    text: "20",
    floating: true,
    align: "right",
    offsetY: 0,
    style: {
      fontSize: "22px",
    },
  },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: "left",
    onItemClick: {
      toggleDataSeries: false,
    },
    position: "top",
    offsetY: -28,
    offsetX: 60,
  },
};

var chartLine = new ApexCharts(document.querySelector("#chart-2"), optionsLine);
chartLine.render();

var optionsCircle = {
  chart: {
    type: "radialBar",
    height: 320,
    offsetY: -30,
    offsetX: 20,
  },
  plotOptions: {
    radialBar: {
      size: undefined,
      inverseOrder: false,
      hollow: {
        margin: 5,
        size: "48%",
        background: "transparent",
      },
      track: {
        show: true,
        background: "#40475D",
        strokeWidth: "10%",
        opacity: 1,
        margin: 3,
      },
    },
  },
  series: [71, 63],
  labels: ["Device 1", "Device 2"],
  legend: {
    show: true,
    position: "left",
    offsetX: -30,
    offsetY: 10,
    formatter: function (val, opts) {
      return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
};

var chartCircle = new ApexCharts(document.querySelector("#chart-3"), optionsCircle);
chartCircle.render();

var optionsProgress1 = {
  chart: {
    height: 70,
    type: "bar",
    stacked: true,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "20%",
      colors: {
        backgroundBarColors: ["#40475D"],
      },
    },
  },
  stroke: {
    width: 0,
  },
  series: [
    {
      name: "Process 1",
      data: [44],
    },
  ],
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: "Process 1",
  },
  subtitle: {
    floating: true,
    align: "right",
    offsetY: 0,
    text: "44%",
    style: {
      fontSize: "20px",
    },
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: ["Process 1"],
  },
  yaxis: {
    max: 100,
  },
  fill: {
    opacity: 1,
  },
};

// ANALYSIS - CHART

 var options = {
   series: [
     {
       name: "High - 2013",
       data: [28, 29, 33, 36, 32, 32, 33],
     },
     {
       name: "Low - 2013",
       data: [12, 11, 14, 18, 17, 13, 13],
     },
   ],
   chart: {
     height: 350,
     type: "line",
     dropShadow: {
       enabled: true,
       color: "#000",
       top: 18,
       left: 7,
       blur: 10,
       opacity: 0.2,
     },
     zoom: {
       enabled: false,
     },
     toolbar: {
       show: false,
     },
   },
   colors: ["#77B6EA", "#545454"],
   dataLabels: {
     enabled: true,
   },
   stroke: {
     curve: "smooth",
   },
   title: {
     text: "Average High & Low Temperature",
     align: "left",
   },
   grid: {
     borderColor: "#e7e7e7",
     row: {
       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
       opacity: 0.5,
     },
   },
   markers: {
     size: 1,
   },
   xaxis: {
     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
     title: {
       text: "Month",
     },
   },
   yaxis: {
     title: {
       text: "Temperature",
     },
     min: 5,
     max: 40,
   },
   legend: {
     position: "top",
     horizontalAlign: "right",
     floating: true,
     offsetY: -25,
     offsetX: -5,
   },
 };

 var chart = new ApexCharts(document.querySelector("#analysis-chart-1"), options);
 chart.render();

 // analysis - chart - 2

  var options = {
    series: [
      {
        name: "Website Blog",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Social Media",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Traffic Sources",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
    ],
    yaxis: [
      {
        title: {
          text: "Website Blog",
        },
      },
      {
        opposite: true,
        title: {
          text: "Social Media",
        },
      },
    ],
  };

  var chart = new ApexCharts(document.querySelector("#analysis-chart-2"), options);
  chart.render();

  // analysis - chart - 3

  var options = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector("#analysis-chart-3"), options);
  chart.render();

  // analysis - chart - 4

   var options = {
     series: [
       {
         name: "PRODUCT A",
         data: [44, 55, 41, 67, 22, 43],
       },
       {
         name: "PRODUCT B",
         data: [13, 23, 20, 8, 13, 27],
       },
       {
         name: "PRODUCT C",
         data: [11, 17, 15, 15, 21, 14],
       },
       {
         name: "PRODUCT D",
         data: [21, 7, 25, 13, 22, 8],
       },
     ],
     chart: {
       type: "bar",
       height: 350,
       stacked: true,
       toolbar: {
         show: true,
       },
       zoom: {
         enabled: true,
       },
     },
     responsive: [
       {
         breakpoint: 480,
         options: {
           legend: {
             position: "bottom",
             offsetX: -10,
             offsetY: 0,
           },
         },
       },
     ],
     plotOptions: {
       bar: {
         horizontal: false,
         borderRadius: 10,
         borderRadiusApplication: "end", // 'around', 'end'
         borderRadiusWhenStacked: "last", // 'all', 'last'
         dataLabels: {
           total: {
             enabled: true,
             style: {
               fontSize: "13px",
               fontWeight: 900,
             },
           },
         },
       },
     },
     xaxis: {
       type: "datetime",
       categories: ["01/01/2011 GMT", "01/02/2011 GMT", "01/03/2011 GMT", "01/04/2011 GMT", "01/05/2011 GMT", "01/06/2011 GMT"],
     },
     legend: {
       position: "right",
       offsetY: 40,
     },
     fill: {
       opacity: 1,
     },
   };

   var chart = new ApexCharts(document.querySelector("#analysis-chart-4"), options);
   chart.render();

   // analysis - chart - 5

    var options = {
      series: [
        {
          data: [44, 55, 41, 64, 22, 43, 21],
        },
        {
          data: [53, 32, 33, 52, 13, 44, 32],
        },
      ],
      chart: {
        type: "bar",
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
    };

    var chart = new ApexCharts(document.querySelector("#analysis-chart-5"), options);
    chart.render();