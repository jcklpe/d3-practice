/* eslint-disable no-shadow */
/* eslint-disable vars-on-top */
/* eslint-disable no-undef */
//- scss injection
import "./styles.scss";
import csvdatafile from "./data/crash-time/crash-time-cleaned.csv";

//- Logic

d3.csv(csvdatafile).then(function(csvdata) {
  // var xDomain = csvdata.map(function(datum) {
  //   return datum[`Day of Week`];
  // });

  var sortedData = d3
    .nest()
    .key(function(datum) {
      return datum[`Day of Week`];
    })
    .entries(csvdata);

  var xDomain = sortedData.map(function(datum) {
    return datum;
  });

  console.log(sortedData);

  // var yDomain = [
  //   0,
  //   d3.max(summedData, function(datum) {
  //     return datum.value;
  //   }),
  // ];
});

var dataset = [];

const barchartWidth = 800;
const barchartHeight = 400;
const barPadding = 10;

//create SVG element
var svgElement = d3
  .select(`#barchart`)
  .append(`svg`)
  .attr(`width`, barchartWidth)
  .attr(`height`, barchartHeight);

for (var i = 0; i < 20; i++) {
  var number = Math.floor(d3.randomUniform(1, 60)());
  dataset.push(number);
}

//Bind dataset and create the bars

svgElement
  .selectAll(`rect`)
  .data(dataset)
  .enter()
  .append(`rect`)
  .attr(`x`, function(datum, i) {
    return i * (barchartWidth / dataset.length);
  })
  .attr(`y`, function(datum) {
    return barchartHeight - datum * 5;
  })
  .attr(`width`, barchartWidth / dataset.length - barPadding)
  .attr(`height`, function(datum) {
    return datum * 5;
  });

// Adding labels

svgElement
  .selectAll(`text`)
  .data(dataset)
  .enter()
  .append(`text`)
  .text(function(d) {
    return d;
  })
  .attr(`x`, function(datum, i) {
    return (
      i * (barchartWidth / dataset.length) +
      ((barchartWidth / dataset.length - barPadding) / 2 / 2 - 1)
    );
  })
  .attr(`y`, function(datum) {
    return barchartHeight - datum * 5 + 20;
  })
  .attr(`fill`, `white`);

// d3.select("#barchart")
//     .selectAll("div")
//     .dataset(dataset)
//     .enter()
//     .append('div')
//     .attr("class", "bar")
//     .style("height", function (datasetinstance) {
//         return `${datasetinstance * 6}px`
//     });

// console.log(dataset);
