var chart = c3.generate({
    data: {
      x: 'date',

      type: 'bar',
      columns: [
          ['date',
'2020-12-27', '2020-12-23', '2020-12-19', '2020-12-13', '2020-12-07', '2020-12-02', '2020-11-29', '2020-11-21', '2020-11-21', '2020-11-17', '2020-11-14', '2020-11-11', '2020-11-04', '2020-10-31', '2020-10-27', '2020-10-23', '2020-10-19', '2020-10-16', '2020-10-07', '2020-10-03', '2020-09-24', '2020-09-15', '2020-08-24', '2020-08-06', '2020-07-28', '2020-07-24', '2020-07-20', '2020-07-16', '2020-07-12', '2020-07-05', '2020-07-03', '2020-06-26', '2020-06-19', '2020-06-16', '2020-06-12', '2020-06-10', '2020-06-08', '2020-06-04', '2020-05-29', '2020-05-26', '2020-05-20', '2020-05-13', '2020-05-11', '2020-05-06', '2020-05-02', '2020-03-14', '2020-03-05', '2020-03-01', '2020-02-25', '2020-02-20', '2020-02-17', '2020-02-10', '2020-02-07', '2020-02-05', '2020-01-29', '2020-01-27', '2020-01-19', '2020-01-15', '2020-01-13', '2020-01-10', '2020-01-08', '2020-01-03'
],
          [
'Distance',
9.56, 7.51, 10.5, 9.3, 7.6, 8.6, 9.5, 6.38, 2.91, 7.01, 5.53, 8.57, 7.78, 8.04, 7.6, 7.54, 8.25, 7.51, 8.18, 8.01, 8.11, 7.7, 7.47, 8.11, 8.07, 7.12, 8.24, 8, 8.53, 6.37, 7.63, 8.41, 7.05, 5.6, 6.88, 6.5, 6.71, 6.65, 6.1, 6.09, 6.14, 6.04, 5.4, 5.3, 4.26, 5.6, 5.74, 4.59, 5.57, 4.67, 5.5, 5.57, 5.5, 5.58, 4.12, 5.03, 6.77, 5.49, 4.87, 5.5, 5.14, 6.52
          ]

        ]
    },
    axis: {
        x: {
            type: 'timeseries',
          categories: [1,2,3,4,5,6,7,8,9,10,11,12],
            tick: {
                count: 12,
				format: function(x) {
                  return x.toLocaleString('default', { month: 'short' })
                },
              culling: false

			}
        },
      y: {
        label: 'Distance (Km)'
      }
    },
    tooltip: {
      format: {
        title: function(x, index) {
          return x.toDateString();
        }
      }
    },
  legend: {
    show: false
  },
    bar: {
        width: {
            ratio: 0.1
        }
    }
});
