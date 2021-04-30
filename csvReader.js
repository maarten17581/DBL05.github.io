//A script that can read data from csvFiles. Sets the variable 'loaded' to true after all data has been loaded.
// Additionally, contains a function to extract the nodes from the provided data.

loaded = false;
data = [];
vertices = [];

//Reads the csv file as a 2d array (d) which is put into an array (data).
// Additionally, sets 'loaded' to true to indicate that the asyncrhonous part is done.
d3.csv("./enron-v1.csv", d3.autoType).then(function (d) {

  console.log(findVertices(d)); // DEBUGGING PURPOSES
  
  //At this point, d is an array 
  d = d.sort(function (a, b) {
    return d3.ascending(a.date, b.date); //Sorts the .csv in ascending order (in this case, based on the dates) 
  });

  //Put data into another array that is accesible outside of the asynchrounous call, as well as an array of all unique vertices in the data.
  data = d;
  vertices = findVertices(d);
  loaded = true;

});

//INPUT: 2d array containing a dataset read from a csv using d3 as input.
//RETURNS: an array containing all unique IDs found in the dataset (combined fromID and toID)
//This function is essentially a hack to find all vertices in the dataset in O(n) time,
//provided it is called in the d3 function that reads the dataset.
function findVertices(data) {
  //We initially use an object to store all unique vertices, by adding their value as properties of the object.
  var verticesObject = {};
  
  //Take the key value of each element in the dataset, and then 'go' to that property in verticesObject.
  //If this value is already a property of the object, the value is simply set to undefined again.
  //If it is not yet a property of the object, then it is added as a property of the object with an undefined value
  //(some sort of value must be added to the property for this to work, so we opted for 'undefined').
  //Because properties can be freely added to an object without having to create a new object,
  //and a set amount of space does not have to be reserved when declaring an object in advance,
  //this essentially allows you to store all unique vertices in the dataset once in O(n) time.
  data.forEach(function(r) {
      verticesObject[r.fromId] = {"id" : r.fromId};
      verticesObject[r.toId] = {"id": r.toId};
    });
    
    //Return all keys of the objects properties as an array: 
    //this yields an array that contains all unqiue vertices in the dataset once.
    
    return verticesObject;
    //return Object.keys(verticesObject);
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