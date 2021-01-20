
let clickval=0;
let currentid;
currentid='outlooklink';
function displayHelper()
{
    document.getElementById("outlook").style.display = 'none';
    document.getElementById("outlooktable").style.display = 'none';
    document.getElementById("summary").style.display='none';
    document.getElementById("summarytable").style.display='none';
    document.getElementById("charts").style.display = 'none';
    document.getElementById("news").style.display = 'none';
    document.getElementById("newstable").style.display = 'table';
    document.getElementById("outlooklink").style.background='white';
    document.getElementById("summarylink").style.background='white';
    document.getElementById("chartslink").style.background='white';
    document.getElementById("newslink").style.background='white';
    document.getElementById("newslink").style.background='white';
}
function mouseOver(id)
{
  document.getElementById(id).style.background = 'rgba(236,236,236,0.50)';

    if(currentid===id){
       document.getElementById(id).style.background = 'rgba(210,210,210)';
    }
}

function mouseOut(id)
{
  document.getElementById(id).style.background = "white";
   if(window.clickval===1) {
       console.log("click received");
       document.getElementById(id).style.background = 'rgba(231,231,231)';
        window.clickval=0
   }
    if(currentid===id){
       document.getElementById(id).style.background = 'rgba(210,210,210)';
    }

}

function mousedown(clickval,id)
{
    window.clickval=clickval;
    console.log("clicked");
    currentid=id;
}

function clearbutton()
{
     // alert("dghfjhg");
     document.getElementById("inputbox").value="";
     document.getElementById("recordnotfound").style.display = 'none';
     document.getElementById("navigationbar").style.display = 'none';
     displayHelper()
}

function changeInputBoxColor()
{
    document.getElementById("inputbox").style.outlineColor="black";
}
function isEmpty(obj)
{
    return Object.keys(obj).length === 0;
}
function getSummary(ticker)
{
    if(ticker!=="")
     {
          var xhr = new XMLHttpRequest();
          xhr.overrideMimeType("application/json");
          var method = "GET";
          var s_url = "http://127.0.0.1:5000/getSummaryData/"+ticker;
          // var s_url = "/getSummaryData/"+ticker;
          // document.write("enter2");
          xhr.onreadystatechange = function () {
          // In local files, status is 0 upon success in Mozilla Firefox
              console.log(this.readyState);
              console.log(this.status);
                if(this.readyState === 4 && this.status === 200)
                {
                    // document.write("enter3");
                    response = xhr.responseText;
                    json={};
                    json = JSON.parse(response);
                    // json=json[0];
                    console.log(json);
                    // document.write("enter4");
                }
                // document.write("enter5");
          };
          xhr.open(method, s_url, false);
          try {
              xhr.send();
          }

          catch (Exception) {
              displayHelper();
          }
          if(!isEmpty(json)) {

              document.getElementById("sticker").innerHTML=json["ticker"];
              timestampt=new Date(json["timestamp"]);
              var ddt = String(timestampt.getDate()).padStart(2, '0');
                var mmt = String(timestampt.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyyt = timestampt.getFullYear();

                todayt = yyyyt + '-' + mmt + '-' + ddt;
              document.getElementById("timestamp").innerHTML=todayt;
              document.getElementById("prevClose").innerHTML=json["prevClose"].toFixed(2);
              document.getElementById("open").innerHTML=json["open"].toFixed(2);
              document.getElementById("high").innerHTML=json["high"].toFixed(2);
              document.getElementById("low").innerHTML=json["low"].toFixed(2);
              document.getElementById("last").innerHTML=json["last"].toFixed(2);
              document.getElementById("change").innerHTML=(json["last"]-json["prevClose"]).toFixed(2) + " &nbsp";
              document.getElementById("changepercent").innerHTML=(((json["last"]-json["prevClose"])/json["prevClose"])*100).toFixed(2)+"%  &nbsp ";
              // document.getElementById("changepercent").innerHTML+=;
              let img1 = document.createElement("img");
              let img2 = document.createElement("img");
              changevalue=(json["last"]-json["prevClose"]);
              if(changevalue > 0) {
                  img1.src = "https://csci571.com/hw/hw6/images/GreenArrowUp.jpg";
                  img2.src = "https://csci571.com/hw/hw6/images/GreenArrowUp.jpg";

              }
              else {
                  img1.src = "https://csci571.com/hw/hw6/images/RedArrowDown.jpg";
                  img2.src = "https://csci571.com/hw/hw6/images/RedArrowDown.jpg";
              }
                img1.width=12;
                img1.height=12;
                img2.width=12;
                img2.height=12;
                let src = document.getElementById("changepercent");
                src.appendChild(img1);
                let src2 = document.getElementById("change");
                src2.appendChild(img2);
              document.getElementById("volume").innerHTML=json["volume"];
          }
     }

}

function getCharts(ticker)
{

          var xhr = new XMLHttpRequest();
          xhr.overrideMimeType("application/json");
          var method = "GET";
          var s_url = "http://127.0.0.1:5000/getChartsData/"+ticker;
          // var s_url = "/getChartsData/"+ticker;
          // document.write("enter2");
          xhr.onreadystatechange = function () {
          // In local files, status is 0 upon success in Mozilla Firefox
              console.log(this.readyState);
              console.log(this.status);
                if(this.readyState === 4 && this.status === 200)
                {
                    // document.write("enter3");
                    console.log("entered charts");
                    response = xhr.responseText;
                    json={};
                    json = JSON.parse(response);
                    console.log("received charts");
                    console.log(json);
                    // document.write("enter4");
                }
                // document.write("enter5");
          };
          xhr.open(method, s_url, false);
          try {
              xhr.send();
          }

          catch (Exception) {
              displayHelper();
          }
          chart1=[];
          chart2=[];
          if(!isEmpty(json)) {

              // document.getElementById("charts").innerHTML=json[0];
                var countKey = Object.keys(json).length;
                let k=0;
                for(k=0;k<countKey;k++)
                {
                    date=json[k]["date"];
                    let d=new Date(date);
                    var utcdate = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
                    // let utcdate=d.toUTCString();
                    closeval=json[k]["close"];
                    volume=json[k]["volume"];
                    arr1=[utcdate,closeval];
                    arr2=[utcdate,volume];
                    chart1.push(arr1);
                    chart2.push(arr2);
                }
                console.log(chart1);
                console.log(chart2);
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;


                  // create the chart
                  Highcharts.stockChart('charts', {
                    title: {
                      text: 'Stock Price '+ticker.toUpperCase()+" "+today
                    },
                    subtitle: {
                      text : '<a target="_blank" rel="noopener noreferrer" href="https://api.tiingo.com/">Source: Tingo</a>', useHTML:true
                    },

                    xAxis: {
                      gapGridLineWidth: 0,
                    },
                    yAxis: [
                        {
                    title: {
                        text: "Stock Price"
                            },
                    opposite: false,
                    }   , {
                    title: {
                        text: "Volume",
                    },
                    opposite: true,
                    }
                  ] ,
                    rangeSelector: {
                      buttons: [{
                        type: 'day',
                        count: 7,
                        text: '7d'
                      }, {
                        type: 'day',
                        count: 15,
                        text: '15d'
                      }, {
                        type: 'month',
                        count: 1,
                        text: '1m'
                      }, {
                        type: 'month',
                        count: 3,
                        text: '3m'
                      }, {
                        type: 'month',
                        count: 6,
                        text: '6m'
                      }],
                      selected: 4,
                      inputEnabled: false
                    },

                    series: [
                          {
                      name: ticker.toUpperCase(),
                      type: 'area',
                      data: chart1,
                      gapSize: 5,
                      tooltip: {
                        valueDecimals: 2
                      },
                      fillColor: {
                        linearGradient: {
                          x1: 0,
                          y1: 0,
                          x2: 0,
                          y2: 1
                        },
                        stops: [
                          [0, Highcharts.getOptions().colors[0]],
                          [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                      },
                      threshold: null
                    },
                        {
                            name: ticker.toUpperCase() + " Volume",
                            type: 'column',
                            pointWidth: 2,
                            data: chart2,
                            gapSize: 5,
                            yAxis: 1,
                            tooltip: {
                                valueDecimals: 0
                            },
                            threshold: null,
                    }
                      ]
                  });

          }


}

function getNews(ticker)
{
    if(ticker!=="")
     {
          var xhr = new XMLHttpRequest();
          xhr.overrideMimeType("application/json");
          var method = "GET";
          var s_url = "http://127.0.0.1:5000/getNewsData/"+ticker;
          // var s_url = "/getNewsData/"+ticker;
          // document.write("enter2");
          json={};
          xhr.onreadystatechange = function () {
          // In local files, status is 0 upon success in Mozilla Firefox
              console.log(this.readyState);
              console.log(this.status);

                if(this.readyState === 4 && this.status === 200)
                {
                    // document.write("enter3");
                    response = xhr.responseText;
                    json = JSON.parse(response);
                    console.log(json);
                    // document.write("enter4");
                }
                // document.write("enter5");
          };
          xhr.open(method, s_url, false);
          try {
              xhr.send();
          }
          catch (Exception) {
              displayHelper();
          }
          if(!isEmpty(json)) {
               var countKey = Object.keys(json).length;
               let k=1;
               array1=[];
               array2=[];
               for(k=1;k<=countKey;k++){
                   i=k;
                   document.getElementById("img"+k).src=json[(i)]["urlToImage"];
                   document.getElementById("title"+k).innerHTML=json[(i)]["title"];
                   document.getElementById("date"+k).innerHTML="Published Date: "+json[(i)]["publishedAt"];
                   document.getElementById("url"+k).href=json[i]["url"];

               }

          }
     }
}
function StartSearch()
{
    displayHelper();
    currentid='outlooklink';
    // event.preventDefault();
     let ticker = document.getElementById("inputbox").value;
     // alert(ticker);
     if(ticker!=="")
     {
          // document.write("enter");
          var xhr = new XMLHttpRequest();
          xhr.overrideMimeType("application/json");
          var method = "GET";
          var s_url = "http://127.0.0.1:5000/getOutlookData/"+ticker;
          // var s_url = "/getOutlookData/"+ticker;
          // document.write("enter2");
          json={};
          xhr.onreadystatechange = function () {
          // In local files, status is 0 upon success in Mozilla Firefox
          //     console.log(this.readyState);
          //     console.log(this.status);
                if(this.readyState === 4 && this.status === 200)
                {
                    // document.write("enter3");
                    response = xhr.responseText;

                    json = JSON.parse(response);

                    // console.log(json);
                    // document.write("enter4");
                }
                // document.write("enter5");
          };
          xhr.open(method, s_url, false);
          try {
              // document.write("enter6");
              xhr.send();
          }

          catch (Exception) {
              // document.write("enter7");
              // alert(Exception+"exception");
              displayHelper();
          }
          if(!isEmpty(json)) {
              document.getElementById("navigationbar").style.display = 'block';
              document.getElementById("name").innerHTML=json["name"];
              document.getElementById("ticker").innerHTML=json["ticker"];
              document.getElementById("exchangeCode").innerHTML=json["exchangeCode"];
              document.getElementById("startDate").innerHTML=json["startDate"];
              document.getElementById("description").innerHTML=json["description"];
              document.getElementById("outlook").style.display = 'table';

              document.getElementById("recordnotfound").style.display = 'none';
              document.getElementById("outlooktable").style.display = 'table';
              document.getElementById("outlooklink").style.background='rgba(210,210,210)';

              getSummary(ticker);
              getCharts(ticker);
              getNews(ticker);

          }
          else{
              displayHelper();
              document.getElementById("recordnotfound").style.display = 'block';
              document.getElementById("navigationbar").style.display='none';
          }
  //        fetch('http://127.0.0.1:5000/getOutlookData/'+ticker)
  // .then(response => response.json())
  // .then(data => console.log(data));
  //        document.getElementById("navigationbar").style.display="block";
     }
}


function displayOutlook() {
    displayHelper();

    document.getElementById("outlooklink").style.background='rgba(210,210,210)';
    document.getElementById("outlook").style.display = 'table';
    document.getElementById("outlooktable").style.display = 'table';

}
function displaySummary() {
    displayHelper();
    document.getElementById("summarylink").style.background='rgba(210,210,210)';
    document.getElementById("summary").style.display = 'table';
    document.getElementById("summarytable").style.display = 'table';
}
function displayNews() {
    displayHelper();
    document.getElementById("newslink").style.background='rgba(210,210,210)';
    document.getElementById("news").style.display = 'table';
    document.getElementById("newstable").style.display = 'table';
    let i=1;
    for (i=1;i<=5;i++){
        if(document.getElementById("title"+i).innerHTML!=="")
        {
            document.getElementById("title"+i).style.display='block';
        }
    }
    for (i=1;i<=5;i++){
        if(document.getElementById("title"+i).innerHTML==="")
        {
            document.getElementById("article"+i).style.display='none';
        }
    }

    return false;

}
function displayCharts()
{
    displayHelper();
    document.getElementById("chartslink").style.background='rgba(210,210,210)';
    document.getElementById("charts").style.display = 'block';
}

