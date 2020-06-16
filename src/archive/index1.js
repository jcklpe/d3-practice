// var data = d3.json('https://data.austintexas.gov/resource/7d8e-dm7r.json');

d3.csv('./src/data/cleaned-data.csv').then(function (data) {
    console.log(data);
    generate(data.columns);
})

d3.json('https://data.austintexas.gov/resource/7d8e-dm7r.json').then(function (data) {
    console.log(data);
    generate(data);
})

function generate(dataset) {

    var element = d3.select(`body`)
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')
    .text(function (data) {
        return `this is a paragraph ${data}`;
    })
    .style('color', function (data) {
        if (data < 15) {
            return 'orange';
        } else {
            return 'grey';
        }
    });

}
