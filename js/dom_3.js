function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// generate boxes
let boxes = [];

for (i = 0; i < 10; i++) {
    let x = rand(1, 1000);
    let y = rand(1, 100);
    let width = rand(10, 100);
    let height = rand(10, 100);
    let radius = rand(0, 50);
    let color = rand(1, 20)
    boxes[i] = {
        'x': x,
        'y': y,
        'width': width,
        'height': height,
        'radius': radius,
        'color': color
    };
}

console.log(boxes);

d3.select('#wrapper')
    .append('svg')
    .attr('viewbox', '0 0 1000 100')
    .attr('width', '100%')
    .append('g')
    .selectAll('rect')
    .data(boxes)
    .enter()
    .append('rect')
    .attr('x', function (d) { return d.x })
    .attr('y', function (d) { return d.y })
    .attr('width', function (d) { return d.width })
    .attr('height', function (d) { return d.height })
    .attr('xr', function (d) { return d.radius })
    .style('fill', function (d, i) { return color(i) })
    .on('mouseover', bounceAll)
    .on('click', changeColor)

function bounceAll(d) {
    d3.select(this)
        .transition()
        .duration(800).
        attr('x', rand(1, 1000))
        .attr('y', rand(1, 100));
};
function changeColor(d) {
    d3.select(this).style('fill', 'none').style('stroke', '#ddd');
};