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

function makeVisualisation(id, value) {
    document.getElementById(id+"middle").parentNode.removeChild(document.getElementById(id+"middle"));

    const div = document.createElement("div");

    div.className="middle";
    div.innerHTML=`The visualisation is `+value;
    document.getElementById(id+"visual").appendChild(div);
}