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
        .attr('class', 'list-group-item')
        .text(function (d) { return d[0] + ": " + d[1] });
};

function make_list2(data, selector, id) {
    d3.select(selector).append('ul').attr('id', id).attr('class', 'list-group');
    d3.select('#' + id)
        .selectAll('li')
        .data(data)
        .enter()
        .append('li')
        .attr('class', 'list-group-item')
        .text(function (d) { return d.shortname + ': ' + d.km });
};

make_list(navigatorInfo, '#navigator', 'navigator-list');

let uri = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json";
d3.json(uri, function (data) {
    let dt = data.slice(1, 10);
    console.log(dt);
    for (var i = 0; i < dt.length; i++) {
        let tr = d3.select('tbody').append('tr');
        tr.append('td').text(dt[i].water.longname);
        tr.append('td').text(dt[i].km);
        tr.append('td').text(dt[i].shortname);
        tr.append('td').text(dt[i].agency);
    };

    make_list2(dt, '#pegel-list', 'pg-list');
});