var amountOfFrames = 0;

function addFrame() {

    amountOfFrames++;

    //document.getElementById("add").parentNode.removeChild(document.getElementById("add")); // remove current "+" div

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

function makeVisualisation(id, value) { // set div to specific visualisation
    document.getElementById(id+"middle").parentNode.removeChild(document.getElementById(id+"middle"));

    const div = document.createElement("div");

    div.innerHTML=`The visualisation is `+value;
    document.getElementById(id+"visual").appendChild(div);
}

var filterAmount = 0;

var columns = ['FromId', 'ToId', 'Date', 'Sentiment'];

function setColumns(column) // set columns of the data for the filters
{
    columns = column;
    document.getElementById('selection').innerHTML='';
    makeNewFilter();
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
    document.getElementById('selection').removeChild(document.getElementById(id+'globalSelectDiv'));
}

function getGlobalFilter() { // get info from filters

    var field = [];
    var sign = [];
    var value = [];

    for(var i = 0; i <= filterAmount; i++)
    {
        field.push(document.getElementById(filterAmount+"globalSelect").value);
        sign.push(document.getElementById(filterAmount+"globalSign").value);
        value.push(document.getElementById(filterAmount+"value").value);
    }
}

function uploadData()
{
    const file = document.getElementById("data").files;
    if(file.substring(file.length-4, file.length-1) == "csv")
    {
        
    }
}