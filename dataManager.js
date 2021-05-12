//This script manages all global variables and operations performed on them.

data = [];
vertices = [];

//INPUT: 2d array containing a dataset read using d3 as input.
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
        verticesObject[r.fromId] = undefined;
        verticesObject[r.toId] = undefined;
      });
      
      //Return all keys of the objects properties as an array: 
      //this yields an array that contains all unqiue vertices in the dataset once.
      return Object.keys(verticesObject);
  }