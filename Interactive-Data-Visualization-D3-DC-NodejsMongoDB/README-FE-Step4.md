 4. Building our frontend using D3.js,Dc.js 

A lot of great Business Intelligence (BI) tools exist in the current landscape, Qlik,Spotfire,Tableau,Microstrategy to name a few. 

We will be using a responsive html template for our design needs as our main aim is to get the charts up and running rather than code the responsiveness and the style of the various divs. I have used a nice synchronous template for this project.

If you take a look at the node.js code you will observe that the static content will be served in the public folder. Hence we place our html stuff there.

We will be utilizing the following libraries for visualization:

D3.js: Which will render our charts. D3 creates svg based charts which are easily passed into out html blocks
Dc.js: which we will use as a wrapper for D3.js, meaning we dont need to code each and every thing about the charts but just the basic parameters
Crossfilter.js: which is used for exploring large multivariate datasets in the browser. Really great for slicing and dicing data.Enables drill down based analysis
queue.js: An asynchronous helper library for data ingestion involving multiple api’s
Dc.css : Contains the styling directives for our dc charts
Dashboard.js: Will contain the code for our charts and graphs
You can always refer to the code repository for the placement of these libraries. We need to include these libraries in our html page (index.html). Now, To the main task at hand: Coding the charts!

In our Dashboard.js file we have the following :

A queue() function which utilizes the queue library for asynchronous loading. It is helpful when you are trying to get data from multiple API’s for a single analysis. In our current project we don’t need the queue functionality, but its good to have a code than can be reused as per the need. The queue function process that data hosted at the API and inserts it into the apiData Variable.

queue()
.defer(d3.json, "/api/data")
.await(makeGraphs);
function makeGraphs(error, apiData) {

Then we do some basic transformations on our data using the d3 functions. We pass the data inside the apiData variable into our dataSet variable. We then parse the date data type to suit our charting needs and set the data type of total_donations as a number using the + operator.

var dataSet = apiData;
var dateFormat = d3.time.format("%m/%d/%Y");
dataSet.forEach(function(d) {
d.date_posted = dateFormat.parse(d.date_posted);
d.date_posted.setDate(1);
d.total_donations = +d.total_donations;
});

Next Steps are ingesting the data into a crossfilter instance and creating dimensions based on the crossfilter instance. Crossfilter acts as a two way data binding pipeline. Whenever you make a selection on the data, it is automatically applied to other charts as well enabling our drill down functionality.

var ndx = crossfilter(dataSet);

var datePosted = ndx.dimension(function(d) { return d.date_posted; });
var gradeLevel = ndx.dimension(function(d) { return d.grade_level; });
var resourceType = ndx.dimension(function(d) { return d.resource_type; });
var fundingStatus = ndx.dimension(function(d) { return d.funding_status; });
var povertyLevel = ndx.dimension(function(d) { return d.poverty_level; });
var state = ndx.dimension(function(d) { return d.school_state; });
var totalDonations = ndx.dimension(function(d) { return d.total_donations; });

Now we calculate metrics and groups for grouping and counting our data.

var projectsByDate = datePosted.group();
var projectsByGrade = gradeLevel.group();
var projectsByResourceType = resourceType.group();
var projectsByFundingStatus = fundingStatus.group();
var projectsByPovertyLevel = povertyLevel.group();
var stateGroup = state.group();
var all = ndx.groupAll();


//Calculate Groups
var totalDonationsState = state.group().reduceSum(function(d) {
return d.total_donations;
});
var totalDonationsGrade = gradeLevel.group().reduceSum(function(d) {
return d.grade_level;
});
var totalDonationsFundingStatus = fundingStatus.group().reduceSum(function(d) {
return d.funding_status;
});
var netTotalDonations = ndx.groupAll().reduceSum(function(d) {return d.total_donations;});

Now we define the charts using DC.js library. Dc.js makes it easy to code good looking charts. Plus the dc library has a lot of charts to suit majority of anaysis. Checkout the github page for dc here.

var dateChart = dc.lineChart("#date-chart");
var gradeLevelChart = dc.rowChart("#grade-chart");
var resourceTypeChart = dc.rowChart("#resource-chart");
var fundingStatusChart = dc.pieChart("#funding-chart");
var povertyLevelChart = dc.rowChart("#poverty-chart");
var totalProjects = dc.numberDisplay("#total-projects");
var netDonations = dc.numberDisplay("#net-donations");
var stateDonations = dc.barChart("#state-donations");

And the final part where we define our charts. We are using a combination of charts and widgets here. You may notice that we are essentially supplying basic information to the chart definitions like dimension,group, axes properties etc.

// A dropdown widget
selectField = dc.selectMenu('#menuselect')
.dimension(state)
.group(stateGroup);
// Widget for seeing the rows selected and rows available in the dataset
dc.dataCount("#row-selection")
.dimension(ndx)
.group(all);
//A number chart
totalProjects
.formatNumber(d3.format("d"))
.valueAccessor(function(d){return d; })
.group(all);
//Another number chart
netDonations
.formatNumber(d3.format("d"))
.valueAccessor(function(d){return d; })
.group(netTotalDonations)
.formatNumber(d3.format(".3s"));
//A line chart
dateChart
//.width(600)
.height(220)
.margins({top: 10, right: 50, bottom: 30, left: 50})
.dimension(datePosted)
.group(projectsByDate)
.renderArea(true)
.transitionDuration(500)
.x(d3.time.scale().domain([minDate, maxDate]))
.elasticY(true)
.renderHorizontalGridLines(true)
.renderVerticalGridLines(true)
.xAxisLabel("Year")
.yAxis().ticks(6);
//A row chart
resourceTypeChart
//.width(300)
.height(220)
.dimension(resourceType)
.group(projectsByResourceType)
.elasticX(true)
.xAxis().ticks(5);
//Another row chart
povertyLevelChart
//.width(300)
.height(220)
.dimension(povertyLevel)
.group(projectsByPovertyLevel)
.xAxis().ticks(4);
//Another row chart
gradeLevelChart
//.width(300)
.height(220)
.dimension(gradeLevel)
.group(projectsByGrade)
.xAxis().ticks(4);
//A pie chart
fundingStatusChart
.height(220)
//.width(350)
.radius(90)
.innerRadius(40)
.transitionDuration(1000)
.dimension(fundingStatus)
.group(projectsByFundingStatus);
//A bar chart
stateDonations
//.width(800)
.height(220)
.transitionDuration(1000)
.dimension(state)
.group(totalDonationsState)
.margins({top: 10, right: 50, bottom: 30, left: 50})
.centerBar(false)
.gap(5)
.elasticY(true)
.x(d3.scale.ordinal().domain(state))
.xUnits(dc.units.ordinal)
.renderHorizontalGridLines(true)
.renderVerticalGridLines(true)
.ordering(function(d){return d.value;})
.yAxis().tickFormat(d3.format("s"));

And finally we call the dc render function which renders our charts.

dc.renderAll();

Mission Accomplished!

Open your browser and go to localhost:8080/index.html to see your dashboard in action.

There is a lot of customization that can be done to the charts. We can format the axes, the colors, the labels, the titles and a whole lot of things using dc.js, d3.js and CSS. 