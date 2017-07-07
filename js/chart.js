$(document).ready(function() {

//By Day Chart

  $.ajax({
    url: "https://picole-pi2.herokuapp.com/machines/1/graph_by_day/",
    type: "GET",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(response) {

      var dates = new Set(response.map(function(obj) {
        return obj.date
      }));
      var flavors = new Set(response.map(function(obj) {
        return obj.flavor
      }));

      flavors = Array.from(flavors)

      dates = Array.from(dates)
      dates.sort();
      dates_obj = {}
      for (let i in dates) {
        dates_obj[dates[i]] = parseInt(i)
      }

      var reduce_option = function(item) {
        return response.reduce(function(result, obj) {
          value = result[dates_obj[obj.date]]
          if (obj.flavor == item) {
            result[dates_obj[obj.date]] = obj.total
          } else {
            result[dates_obj[obj.date]] = value || 0
          }
          return result;
        }, Array(dates.length))
      }

      var config = {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: flavors[0],
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: reduce_option(flavors[0]),
          }, {
            label: flavors[1],
            fill: false,
            backgroundColor: window.chartColors.purple,
            borderColor: window.chartColors.purple,
            data: reduce_option(flavors[1]),
          }, {
            label: flavors[2],
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: reduce_option(flavors[2]),
            fill: false,
          }, {
            label: flavors[3],
            backgroundColor: window.chartColors.yellow,
            borderColor: window.chartColors.yellow,
            data: reduce_option(flavors[3]),
            fill: false,
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Picolés vendidos por Dia '
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
              }
            }]
          }
        }
      };


      load(config);

    },
    error: function(erro) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
        alert(text[i]);
      }
    }
  });

  function load(config) {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
  };

  // Total Chart

  $.ajax({
    url: "https://picole-pi2.herokuapp.com/machines/1/graph_total/",
    type: "GET",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(response) {

      flavors = [];
      totals = [];

      for (let i in response) {
        flavors.push(response[i].flavor);
        totals.push(response[i].total);
      }


      var datasetstry = [{
        "label": flavors[0],
        "fill": false,
        "backgroundColor": window.chartColors.blue,
        "borderColor": window.chartColors.blue,
        "data": totals[0],
      }, {
        "label": flavors[1],
        "fill": false,
        "backgroundColor": window.chartColors.purple,
        "borderColor": window.chartColors.purple,
        "data": totals[1],
      }, {
        "label": flavors[2],
        "backgroundColor": window.chartColors.red,
        "borderColor": window.chartColors.red,
        "data": totals[2],
        "fill": false,
      }, {
        "label": flavors[3],
        "backgroundColor": window.chartColors.yellow,
        "borderColor": window.chartColors.yellow,
        "data": totals[1],
        "fill": false,
      }];

      new Chart(document.getElementById("canvasTotal"), {
        "type": "bar",
        "data": {
          "labels": flavors,
          "datasets": [{
            "label": flavors,
            "data": totals,
            "fill": true,
            "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
            "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)"],
            "borderWidth": 1
          }]
        },
        "options": {
          "scales": {
            "yAxes": [{
              "ticks": {
                "beginAtZero": true
              }
            }]
          }
        }
      });
    },
    error: function(erro) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
        alert(text[i]);
      }
    }
  });

// Temperature Chart

  $.ajax({
    url: "https://picole-pi2.herokuapp.com/machines/1/graph_by_day/",
    type: "GET",
    beforeSend: function(xhr) {
      var token = Cookies.get('token');
      xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: function(response) {


      var totals = [];
      var labels = [];
      var dates = [];
      for (let i in response) {
        totals.push(response.location.temperature);
        dates.push(response.location.updated_at)
      }
        console.log(totals);
        console.log(dates);


      var configTemp = {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: "Temperatura",
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: totals,
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Temperatura'
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
              }
            }]
          }
        }
      };
      loadTemp(configTemp);
    },
    error: function(erro) {
      var text = JSON.parse(error.responseText);
      for (let i in text) {
        alert(text[i]);
      }
    }


  });
  function loadTemp(config) {
    var ctx = document.getElementById("canvasTemp").getContext("2d");
    window.myLine = new Chart(ctx, config);
  };

})
