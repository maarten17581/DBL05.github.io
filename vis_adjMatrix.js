//SCRIPT EXPECTS GLOBAL VARIABLES: 'data' and 'vertices'.
//This script creates an adjaceny matrix, using svg.

function createAdjMatrix(visId, data) { 

    width = 800;
    height = 800;

    /*Adds a d3.zoom() object, currently commneted out because not in use.
    const zoom = d3.zoom()
        .scaleExtent([1, 10])*/

    // THIS IS A TEST !!!! EXTREMELY BUGGY
    var tooltipDiv = d3.select("body").append("div")	
        .attr("class", "tooltip")	
        .style("width", "30px")
        .style("height", "cellSizepx")
        .style("background", "lightsteelblue")		
        .style("opacity", 0)
        .style("position", "absolute")
    
    // Create an object that will count the number of times an email "from-to" occurs,
    // this count will be used as the weight of the cell in the adjacency matrix.
    var edgesWeighted = {}; 
    data.forEach(edge => { // We loop through each row (edge) of the dataset
        var id = edge.fromId + "-" + edge.toId; // id is a string "fromId-toId", this gives directed edges
        if (edgesWeighted[id]) {edgesWeighted[id] += 1;} // If the id is already present, increase the count
        else {edgesWeighted[id] = 1} // Otherwise it is a new edge and we set the count to 1
    });
    console.log(edgesWeighted); // DEBUGGING PURPOSES

    var matrix = [];
    vertices.forEach((from, a) => {
        vertices.forEach((to, b) => {
            var grid = {id: from + "-" + to, x: a, y: b, weight: 0 };
            if (edgesWeighted[grid.id]) {
                grid.weight = edgesWeighted[grid.id];
            }
         matrix.push(grid);
        });
        
    });
    console.log(matrix); //DEBUGGING PURPOSES

    var cellSize = width / vertices.length;

    //Generate an svg that will contain the adjancy matrix. Then create a g that will contain the matrix grid.
    //Then generate a rect for each element in 'matrix' array, which is put into the g (in order of the array).
    //Then, proceed to 'color' rects in the matrix for which there are edges by increasing their opacity.
    var svg = d3.select('#' + visId).append("svg")
        .attr("id", visId + 'svg')
        .attr("width", cellSize*vertices.length+50)
        .attr("height", cellSize*vertices.length+50)
        /*Adds a zoom functionality below: commented out because of lack of use and performance issues when used on large data sets
        .call(zoom.on("zoom", function (event) {
            g.attr("transform", event.transform); 
        }))*/
    
    g = svg.append("g")
        .attr("transform", "translate(50,50)") 
        .selectAll("rect")
        .data(matrix)
        .enter()
        .append("rect")
        .attr("class", "grid")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", d => d.x*cellSize)
        .attr("y", d => d.y*cellSize)
        .style("fill-opacity", d => d.weight * 0.2)

        //Add 'mouseover' event to each rect in adjancy matrix, in order of 'data' array.
        .on("mouseover", function(event, d)  { 
            d3.select(this).style("fill", "#7AE7C7")
        //    console.log(d3.pointer(event))
            // tooltipDiv.html("x: " + d3.pointer(event)[0] + "\ny: " + d3.pointer(event)[1] + "\nWeight: " + d.weight)
            //     .style("opacity", 1)
            //     .style("left", d3.pointer(event)[0] + 'px')
            //     .style("top", d3.pointer(event)[1] + 'px')
        })
          
        
        //Add 'mouseout' event to each rect in the adjancy matrix, in order of 'data' array.
        .on("mouseout", function(d) { 
            d3.select(this).style("fill", "#FECC22")
            //tooltipDiv.style("opacity", 0)
        })

    /*Generates labels above and besides the matrix that correspond to the rows and columns of vertices. Commented out because of inusability on large datasets.
    //Generate a g above the adjancy matrix that will contain rotated labels, which correspond to the columns for outgoing edges in the matrix.
    d3.select('#' + visId + 'svg')
		.append("g")
		.attr("transform","translate(50,45)")
		.selectAll("text")
		.data(vertices)
		.enter()
		.append("text")
		.attr("x", (d,i) => i * cellSize + cellSize/2)
		.text(d => d)
		.style("text-anchor","end")
		.style("font-size","10px")
        .style("writing-mode", "vertical-rl")
    
    //Generate a g on the left side of the adjancy matrix, that will contain labels that correspond to the rows for ingoing edges in the matrix.
	d3.select('#' + visId + 'svg')
		.append("g").attr("transform","translate(45,55)")
		.selectAll("text")
		.data(vertices)
		.enter()
		.append("text")
		.attr("y",(d,i) => i * cellSize + cellSize/2)
		.text(d => d)
		.style("text-anchor","end")
        .style("font-size","10px")
        */
}