//setting up empty data array
var data = [];

getData(); // popuate data 

// line chart based on http://bl.ocks.org/mbostock/3883245
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    // get el width and height
    width = parseInt(d3.select('#graph').style('width'), 10) * 0.9,
    height = 300 - margin.top - margin.bottom; // fixed height for now

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) {
        return x(d.q);
    })
    .y(function(d) {
        return y(d.p);
    });

var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(d3.extent(data, function(d) {
    return d.q;
}));
y.domain(d3.extent(data, function(d) {
    return d.p;
}));

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);


function getData() {
    var mean = 0;
    var sigma = 1;
    // loop to populate data array with 
    // probabily - quantile pairs
    for (var i = 0; i < 100000; i++) {
        if (!i) console.log(mean,sigma);
        q = d3.random.normal()();
        p = gaussian(q,mean,sigma) // calc prob of rand draw
        el = {
            "q": q,
            "p": p
        }
        data.push(el)
};

// need to sort for plotting
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
data.sort(function(x, y) {
    return x.q - y.q;
});	
}

//taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
function gaussian(x,mean,sigma) {
	var gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
};

var spareRandom = null;

function normalRandom()
{
    var val, u, v, s, mul;

    if(spareRandom !== null)
    {
        val = spareRandom;
        spareRandom = null;
    }
    else
    {
        do
        {
            u = Math.random()*2-1;
            v = Math.random()*2-1;

            s = u*u+v*v;
        } while(s === 0 || s >= 1);

        mul = Math.sqrt(-2 * Math.log(s) / s);

        val = u * mul;
        spareRandom = v * mul;
    }
    
    return val / 14;    // 7 standard deviations on either side
}

function normalRandomInRange(min, max)
{
    var val;
    do
    {
        val = normalRandom();
    } while(val < min || val > max);
    
    return val;
}

function normalRandomScaled(mean, stddev)
{
    var r = normalRandomInRange(-1, 1);

    r = r * stddev + mean;

    return Math.round(r);
}

function lnRandomScaled(gmean, gstddev)
{
    var r = normalRandomInRange(-1, 1);

    r = r * Math.log(gstddev) + Math.log(gmean);

    return Math.round(Math.exp(r));
}