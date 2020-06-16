//- scss injection
import "./styles.scss";

//- Logic


var data = [];

const barchartWidth = 800;
const barchartHeight = 400;
const barPadding = 10;

for (var i = 0; i < 20; i++){
    var number = Math.floor(d3.randomUniform(1,60)());
    data.push(number);
}

//create SVG element
var svgElement = d3.select(`#barchart`)
    .append(`svg`)
    .attr(`width`, barchartWidth)
    .attr(`height`, barchartHeight);

//Bind data and create the bars

svgElement.selectAll(`rect`)
    .data(data)
    .enter()
    .append(`rect`)
    .attr(`x`, function (d, i) {
        return i * (barchartWidth / data.length)
    })
    .attr(`y`, function (d) {
        return barchartHeight - d * 5;
    })
    .attr(`width`, barchartWidth / data.length - barPadding)
    .attr(`height`, function (d) {
        return d * 5;
    });

    // Adding labels

svgElement.selectAll(`text`)
    .data(data)
    .enter()
    .append(`text`)
    .text(function(d){
        return d;
    })
    .attr(`x`, function (d, i) {
        return i * (barchartWidth / data.length) + (((barchartWidth / data.length) - barPadding) / 2/2 - 1);
    })
    .attr(`y`, function (d) {
        return barchartHeight - d * 5;
    });


// d3.select("#barchart")
//     .selectAll("div")
//     .data(data)
//     .enter()
//     .append('div')
//     .attr("class", "bar")
//     .style("height", function (datainstance) {
//         return `${datainstance * 6}px`
//     });

console.log(data);
