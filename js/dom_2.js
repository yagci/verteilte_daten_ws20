function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let margin = { top: 30, right: 30, bottom: 170, left: 70 };
let width = 660 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

let uri = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json?includeTimeseries=true&includeCurrentMeasurement=true&waters=EIDER";

let collection = [];
let temperatur = 0;
let tempunit = "";

let svg = d3.select('#animal')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

let anzeige = d3.select('#animal').append('div').attr('id', 'anzeige').style('opacity', 0);
let color = d3.scaleOrdinal().range(d3.schemeCategory20);


d3.json(uri, function (data) {
    for (let i = 0; i < data.length; i++) {
        for (let z; z < data[i].timeseries.length; z++) {
            if (data[i].timeseries[z].shortname == "WT") {
                temperatur = data[i].timeseries[z].currentMeasurement.value;
                tempunit = data[i].timeseries[z].unit;
            } else {
                temperatur = null;
            }
        }
        collection[i] = {
            'water': data[i].water.longname,
            'location': data[i].longname,
            'agency': data[i].agency,
            'km': data[i].km,
            'longitude': data[i].longitude,
            'latitude': data[i].latitude,
            'pegelstand': data[i].timeseries[0].currentMeasurement.value,
            'pegelunit': data[i].timeseries[0].unit,
            'temperatur': temperatur,
            'tempunit': tempunit,
            'x': rand(10, 400),
            'y': rand(10, 300),
            'number': data[i].number,
        }
    }
    console.log(collection);

    svg.selectAll('circle')
        .data(collection)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('r', function (d) { return d.pegelstand / 10; })
        .style('fill', function (d, i) { return color(i); })
        .on('mouseover', function (d) {
            d3.select('#anzeige')
                .style('opacity', 1)
                .text(d.location + ' Pegelstand: ' + d.pegelstand + ' cm Wassertemp: ' + temperatur + ' ' + tempunit)
        })
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
        );
});


function dragstarted(d) {
    d3.select(this).raise().classed('active', true);
};
function dragged(d) {
    d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
};
function dragended(d) {
    d3.select(this).classed('active', false);
};