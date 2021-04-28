//A script that can read data from csvFiles. Sets the variable 'loaded' to true after all data has been loaded.

//var dataArray = [];
loaded = false;
data = [];

//Reads the csv file
d3.csv("./test.csv", d3.autoType).then(function (d) {
  //At this point, d is an array console.log(d); document.write(d[0].toEmail)
  d = d.sort(function (a, b) {
    return d3.ascending(a.date, b.date); //Sorts the .csv in ascending order (in this case, based on the dates) 
  });

  //fillTable(d);

  //Push data into another array that is accesible outside of the asynchrounous call.
  data = d;
  loaded = true;

});

// FillTable fills in a table with .csv values, table columns have id's "table_'column name' "
function fillTable(d) {
  if (loaded) { //Only run when data is completely fetched, as d3 works with asynchronous functions.
    
    
    for (var i = 0; i < d.length; i++) {
      fetchData(d, i, "date");
      fetchData(d, i, "fromId");
      fetchData(d, i, "fromEmail");
      fetchData(d, i, "fromJobtitle");
      fetchData(d, i, "toId");
      fetchData(d, i, "toEmail");
      fetchData(d, i, "toJobtitle");
      fetchData(d, i, "messageType");
      fetchData(d, i, "sentiment");
    }
  }
}

// Fetches the information from the row at the selected column
function fetchData(d, i, col) {
  d3.selectAll("#table_" + col) //Selects HTML element with the specified ID
    .append("p") //Appends a paragraph HTML element to the previously selected element.
    .text(function () { //Defines the text that is put in this paragraph (dates are correctly converted).
      return d[i][col] instanceof Date ? d[i][col].toLocaleDateString() : d[i][col];
    });
}