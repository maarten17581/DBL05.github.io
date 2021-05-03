var amountOfFrames = 0;

function addFrame() {

    document.getElementById("add").parentNode.removeChild(document.getElementById("add")); // remove current "+" div

    const div = document.createElement("div"); // add visualisation div

    div.className="col-12";
    div.id=amountOfFrames;
    div.innerHTML=`
        <div class="visual" id="`+amountOfFrames+`visual">
            <input type="button" name="add" value="x" onclick="removeFrame('`+amountOfFrames+`')" class="removeButton" class="middle">
            <div class="middle" id="`+amountOfFrames+`middle">
                <select name="Visualisation" id="`+amountOfFrames+`select">
                    <option selected value='Matrix'> Matrix </option>
                    <option value='Circle'> Circle </option>
                    <option value='Graph'> Graph </option>
                    <option value='Scatter'> Scatter </option>
                    <option value='Table'> Table </option>
                </select>
                <input type="button" name="select" value="select" onclick="makeVisualisation('`+amountOfFrames+`', document.getElementById('`+amountOfFrames+`select').value)">
            <div class="middle">
        </div>
    `;
    document.getElementById('visualise').appendChild(div);

    const div2 = document.createElement("div"); // add "+" div

    div2.className="col-12";
    div2.id="add";
    div2.innerHTML=`
        <div class="visual">
            <input type="button" name="add" value="+" onclick="addFrame()" class="addButton">
        </div>
    `;
    document.getElementById('visualise').appendChild(div2);

    amountOfFrames++;
}

function removeFrame(id) {

    document.getElementById(id).parentNode.removeChild(document.getElementById(id));
}


//FUNCTION EXPECTS GLOBAL VARIABLES: 'data'.
//Function that generates a visulisation for the data iset in the global variable 'data'.
function makeVisualisation(id, value) {
    document.getElementById(id+"middle").parentNode.removeChild(document.getElementById(id+"middle"));

    const div = document.createElement("div");
    div.id = 'vis_' + id;

    //Switch that selects the right function for creating desired visualisation.
    document.getElementById(id+"visual").appendChild(div);
    switch (value) {
        case 'Table':
            createTable(data, div.id); //Call that creates the visualisation also requires the id of the correct div
            break;
        case 'Matrix':
            createAdjMatrix(div.id, data); //Calll that creates adjacancy matrix for the data.
            break;
        default:
            div.innerHTML=`An unexpected error occured when trying to generate the visualisation: `+value;
    }
}