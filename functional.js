var amountOfFrames = 0;

function addFrame() {

    amountOfFrames++;

    //document.getElementById("add").parentNode.removeChild(document.getElementById("add")); // remove current "+" div

    const div = document.createElement("div"); // add visualisation div

    div.className="vis2";
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
                </select>
                <input type="button" name="select" value="select" onclick="makeVisualisation('`+amountOfFrames+`', document.getElementById('`+amountOfFrames+`select').value)">
            </div>
        </div>
    `;
    document.getElementById('visualise').appendChild(div);

    //const div2 = document.createElement("div"); // add "+" div

    //div2.className="col-12";
    //div2.id="add";
    //div2.innerHTML=`
    //    <div class="visual">
    //        <input type="button" name="add" value="+" onclick="addFrame()" class="addButton">
    //    </div>
    //`;
    //document.getElementById('visualise').appendChild(div2);
}

function removeFrame(id) { // delete an visualisation div

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
            createAdjMatrix(div.id, data); //Call that creates adjacancy matrix for the data.
            break;
        default:
            div.innerHTML=`An unexpected error occured when trying to generate the visualisation: `+value;
    }
}

var filterAmount = 0;
var removedFilters = [];

var columns = ['FromId', 'ToId', 'Date', 'Sentiment'];

function setColumns(column) // set columns of the data for the filters
{
    columns = column;
    document.getElementById('selection').innerHTML='';
    filterAmount = 0;
    removedFilters = [];
}

function makeNewFilter() { // set an extra filter

    const div = document.createElement("div");

    div.id=filterAmount+"globalSelectDiv";
    var innerHTML =`
    <select name="`+filterAmount+`globalSelect" id="`+filterAmount+`globalSelect">
    `;

    var selected = `selected`;
    for(var i = 0; i < columns.length; i++)
    {
        innerHTML += `<option `+selected+` value='`+columns[i]+`'> `+columns[i]+` </option>`;
        selected = ``;
    }

    innerHTML += `</select>
    <select name="`+filterAmount+`globalSign" id="`+filterAmount+`globalSign">
        <option selected value=&lt> &lt; </option> <!--the sign-->
        <option value='gt'> &gt; </option>
        <option value='e'> = </option>
        <option value='ne'> &ne; </option>
        <option value='leq'> &leq; </option>
        <option value='geq'> &geq; </option>
    </select>
    <input type="number" name="value" id="`+filterAmount+`value" value="0" style="width: 75%;">
    <input type="button" name="removeFilter" id="`+filterAmount+`removeFilter" value="x" onclick="removeFilter(`+filterAmount+`)"><br>
    `;

    div.innerHTML = innerHTML;

    document.getElementById("selection").appendChild(div);

    filterAmount++;
}

function removeFilter(id) {
    removedFilters.push(id);
    document.getElementById('selection').removeChild(document.getElementById(id+'globalSelectDiv'));
}

function getGlobalFilter() { // get info from filters

    var field = [];
    var sign = [];
    var value = [];

    for(var i = 0; i < filterAmount; i++)
    {
        if(!removedFilters.includes(i))
        {
            field.push(document.getElementById(i+"globalSelect").value);
            sign.push(document.getElementById(i+"globalSign").value);
            value.push(document.getElementById(i+"value").value);
        }
    }
}