//Function that obtains file containing data from HTML5 file input with id 'data'.
//Also checks if file type is allowed.
function fetchDataFile() {
    //Get the file rfrom the DOM upload button.
    file = document.getElementById("data").files[0]; //Get File object of selected user file.
    console.log(file);
    fileName = file.name; //gets file name
    fileExt = fileName.split('.').pop(); //gets the extension of the file.
    console.log(fileName + ' | ' + fileExt); //DEBUGGING PURPOSES

    //If file extension is allowed, read the data.
    if (fileExt == 'csv') {
        readDataFile(file, fileExt);
    }
    else {
        console.log('File type not allowed!')
    }
}

//Reads data into a string. This is done so that the user can have local file data read:
//for security reason browsers cannot obtain filepaths and thus javascript uses its FileReader object to read files into datatypes.
//These datatypes can then be used by other functions.
//Then passes the string to d3 function.
function readDataFile(dataFile, dataExt) {
    const reader = new FileReader();
    reader.onload = function(){ //Function will not run after reader has finished reading a file.

        //Depending on data file extension, pass to a d3 function.
        switch(dataExt) {
            case 'csv':
                csvStringReader(reader.result);
                break;
            default:
                console.log("Something went wrong while handling data.");
        }
    }

    reader.readAsText(dataFile); //Read the file; above reader.onload function will handle the rest after reading file has completed.
}