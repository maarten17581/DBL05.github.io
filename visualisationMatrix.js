//This script creates an adjaceny matrix, using svg.

function createMatrix(visId, data, vertices) { 
    

    visId = 'matrix'  // DEBUGGING PURPOSES

    margin = {top: 50, left: 50, bottom: 10, right: 0}; //Reserve a space for the labels around the matrix.
    width = 800;
    height = 800;
    //vertices = Object.assign({}, vertices);
    
    verts = Object.values(vertices);

    var container = d3.select('#' + visId).append("svg") // Append a SVG to the div to display the visualisation.
        .attr("width", width)
        .attr("height", height);

        container.append("rect")
        .attr("class", 'background')
        .attr("width", width)
        .attr("height", height)
        .attr("style", 'fill: rgb(157, 164, 176)');


    container.append("rect") // Rectangle acts as a background for the actual grid of the matrix
        .attr("class", 'background')
        .attr("width", width - margin.right)
        .attr ("height", height - margin.top)
        .attr("style", 'fill: rgb(126, 156, 207)')
        .attr("transform", "translate(" + margin.right + "," + margin.top + ")");
    
    


    
    //Create a 2d array to represent the matrix

    var matrix = []; //This will be a 2D array with for each cell of the matrix the number of edges (mails sent).
    // for (i = 0; i < vertices.length; i++) {
    //     matrix[i] = vertices;
    // }
    
    verts.forEach(vert => {
        vert.count = 0;
    });
    console.log(verts);


    //console.log(matrix);

}