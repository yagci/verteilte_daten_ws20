d3.select('#title').insert('h2').attr('id', 'user-info').text('User Info');
d3.select('#user-info').append('i').attr('class', 'fas fa-user').lower();

let navigator = window.navigator;

let navigatorInfo = [
    ['Platform', navigator.platform],
    ['Browser', navigator.appCodeName],
    ['Browser', navigator.appName],
    ['Browser Version', navigator.appVersion],
    ['Vendor', navigator.vendor],
    ['Cookies', navigator.cookieEnabled],
    ['Online Status', navigator.onLine],
    ['Product', navigator.product],
    ['Product Sub', navigator.productSub]
];

function make_list(data, selector, id) {
    d3.select(selector).append('ul').attr('id', id).attr('class', 'list-group');
    d3.select('#' + id)
        .selectAll('li')
        .data(data)
        .enter()
        .append('li')
        .attr('class', 'list-group-item highlight lead')
        .text(function (d) { return d[0] + ": " + d[1] });
}

make_list(navigatorInfo, '#navigator', 'navigator-list');

let uri = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json";
d3.json(uri, function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        let tr = d3.select('tbody').append('tr');
        tr.append('td').text(data[i].water.longname);
        tr.append('td').text(data[i].water.km);
        tr.append('td').text(data[i].water.shortname);
        tr.append('td').text(data[i].water.agency);
    }
});