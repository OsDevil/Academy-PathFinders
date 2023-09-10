  let myChart;
  let ctx = document.getElementById("myChart").getContext('2d');
  let wrRangeInput = document.getElementById("wrRange");
  let rrRangeInput = document.getElementById("rrRange");
  let riskRangeInput = document.getElementById("riskRange");
  let wrNumberInput = document.getElementById("wrNumber");
  let rrNumberInput = document.getElementById("rrNumber");
  let riskNumberInput = document.getElementById("riskNumber");
  
  let xAxisLabels = [0, 5, 10, 20, 50, 100, 200, 400];
  let xAxisData = [];
  for (let i = 0; i <= 400; i++) {
      xAxisData.push(i);
  }
  
  const resultCells = [
      document.getElementById("result1"),
      document.getElementById("result2"),
      document.getElementById("result3"),
      document.getElementById("result4")
  ];
  
  function initializeChart() {
      let initialData = xAxisData.map(value => {
          const E = ((40 / 100) * 3 - (1 - (40 / 100))) * (1 / 100);
          const yAxisData = (value / 100) / E;
          return yAxisData;
      });
  
      let data = {
          labels: xAxisData,
          datasets: [{
              label: 'Nb trades',
              data: initialData,
              backgroundColor: 'rgba(9, 19, 27, 0)',
              borderColor: '#ED9266',
              borderWidth: 2,
              pointRadius: 0,
          }]
      }

      if (myChart) {
          myChart.destroy();
      }
  
      myChart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true,
                      grid: {
                          color: '#262626'
                      },
                      ticks: {
                          color: '#ffffff'
                      },
                      title: {
                          display: true,
                          text: 'Nb trades',
                          color: '#C5C5C5',
                      },
                  },
                  x: {
                      type: 'logarithmic',
                      grid: {
                          color: '#09131b'
                      },
                      ticks: {
                          color: '#ffffff',
                          min: 0,
                          max: 10000,
                          maxTicksLimit: 500,
                          callback: function (value, index, values) {
                              if (xAxisLabels.includes(value)) {
                                  return '+' + value + '%';
                              } else {
                                  return '';
                              }
                          }
                      },
                      title: {
                          display: true,
                          text: '% augmentation capital',
                          color: '#C5C5C5',
                      },
                  },
              },
              plugins: {
                  legend: {
                      display: false,
                  },
                  title: {
                      display: true,
                      text: 'Nb trades nécessaires à une augmentation de X% du capital',
                      color: '#C5C5C5',
                      padding: {
                          top: 0,
                          bottom: 30,
                      },
                      
                  },
  
              }
          }
      });
  
      function updateChart(wr, rr, risk) {
          let updatedData = xAxisData.map(value => {
              const E = ((wr / 100) * rr - (1 - (wr / 100))) * (risk / 100);
              const yAxisData = (value / 100) / E;
              return yAxisData;
          });
  
          myChart.data.datasets[0].data = updatedData;
          myChart.update();
      }
  
      function updateTableResults(wr, rr, risk) {
          const tableData = [
              { value: 100, multiplier: 2 },
              { value: 400, multiplier: 5 },
              { value: 900, multiplier: 10 },
              { value: 9900, multiplier: 100 }
          ];
  
          for (let i = 0; i < tableData.length; i++) {
              const result = calculateResult(tableData[i].value, tableData[i].multiplier, wr, rr, risk);
              resultCells[i].textContent = result;
          }
      }
  
      function calculateResult(value, multiplier, wr, rr, risk) {
          const E = ((wr / 100) * rr - (1 - (wr / 100))) * (risk / 100);
          const yAxisData = Math.ceil((value / 100) / E);
          const result = (yAxisData).toFixed(0);
          return result;
      }
  
      wrRangeInput.addEventListener('input', function () {
          wrNumberInput.value = wrRangeInput.value;
          updateChart(wrRangeInput.value, rrRangeInput.value, riskRangeInput.value);
          updateTableResults(wrRangeInput.value, rrRangeInput.value, riskRangeInput.value);
      });
  
      rrRangeInput.addEventListener('input', function () {
          rrNumberInput.value = rrRangeInput.value;
          updateChart(wrRangeInput.value, rrRangeInput.value, riskRangeInput.value);
          updateTableResults(wrRangeInput.value, rrRangeInput.value, riskRangeInput.value);
      });
  
      riskRangeInput.addEventListener('input', function () {
          riskNumberInput.value = riskRangeInput.value;
          updateChart(wrRangeInput.value, rrRangeInput.value, riskRangeInput.value);
          updateTableResults(wrRangeInput.value, rrRangeInput.value, riskRangeInput.value);
      });
  
      wrNumberInput.addEventListener('input', function () {
          wrRangeInput.value = wrNumberInput.value;
          updateChart(wrNumberInput.value, rrNumberInput.value, riskNumberInput.value);
          updateTableResults(wrNumberInput.value, rrNumberInput.value, riskNumberInput.value);
      });
  
      rrNumberInput.addEventListener('input', function () {
          rrRangeInput.value = rrNumberInput.value;
          updateChart(wrNumberInput.value, rrNumberInput.value, riskNumberInput.value);
          updateTableResults(wrNumberInput.value, rrNumberInput.value, riskNumberInput.value);
      });
  
      riskNumberInput.addEventListener('input', function () {
          riskRangeInput.value = riskNumberInput.value;
          updateChart(wrNumberInput.value, rrNumberInput.value, riskNumberInput.value);
          updateTableResults(wrNumberInput.value, rrNumberInput.value, riskNumberInput.value);
      });
  
      updateChart(40, 3, 1);
      updateTableResults(40, 3, 1);
  }
  
      initializeChart();
