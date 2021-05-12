//A script that can read data from csvFiles. Sets the variable 'loaded' to true after all data has been loaded.
// Additionally, contains a function to extract the nodes from the provided data.
//This scripts creates global variables 'data' which stores the data extracted from the csv file and 'vertices',
//which is an array that contains every unique vertice in the data once.

//Since browsers cannot obtain filepath out of security issues,
//take data parsed into a string as input and then read using d3.csvParse.
//Reads the csv file into an array of objects, each object being a row and each object's properties being a column.=
function csvStringReader(dataString) {

  console.log(d3.csvParse(dataString));
  data = d3.csvParse(dataString);
  vertices = findVertices(data);
   /* d3.csv(dataString, d3.autoType).then(function (d) {

      //At this point, d is an array 
      d = d.sort(function (a, b) {
        return d3.ascending(a.date, b.date); //Sorts the .csv in ascending order (in this case, based on the dates) 
      });
    
      //Put data into another array that is accesible outside of the asynchrounous call, as well as an array of all unique vertices in the data.
      data = d;
      vertices = findVertices(d);
      console.log(vertices); // DEBUGGING PURPOSES
      loaded = true;
    });*/
}























// FillTable fills in a table with .csv values, table columns have id's "table_'column name' "
function createTable(d, visId) {
  if (loaded) { //Only run when data is completely fetched, as d3 works with asynchronous functions.
    
    
    for (var i = 0; i < d.length; i++) {
      fetchData(d, i, "date", visId);
      // fetchData(d, i, "fromId");
      // fetchData(d, i, "fromEmail");
      // fetchData(d, i, "fromJobtitle");
      // fetchData(d, i, "toId");
      // fetchData(d, i, "toEmail");
      // fetchData(d, i, "toJobtitle");
      // fetchData(d, i, "messageType");
      // fetchData(d, i, "sentiment");
    }
  }
}

// Fetches the information from the row at the selected column
function fetchData(d, i, col, visId) {
  d3.select('#' + visId) //Selects HTML element with the specified ID
    .append("p") //Appends a paragraph HTML element to the previously selected element.
    .text(function () { //Defines the text that is put in this paragraph (dates are correctly converted).
      return d[i][col] instanceof Date ? d[i][col].toLocaleDateString() : d[i][col];
    });
}