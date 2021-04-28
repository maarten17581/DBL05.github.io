//NOTE: CHROME ONLY ALLOWS LOADING OF CSV FROM SERVER / WITH SPECIAL ACCESS.
//TESTING IS EASIEST VIA FIREFOX OR ANOTHER BROWSER, BUT THIS IS SOMETHING TO
//KEEP IN MIND.

loaded = false;
function loadButtonWrapper() {
  if (!loaded) {
    //Reads the csv file
    d3.csv("./test.csv", d3.autoType).then(function (d) {
      //At this point, d is an array console.log(d); document.write(d[0].toEmail)

      d = d.sort(function (a, b) {
        return d3.ascending(a.fromId, b.fromId);
      });

      fillTable(d);
    });
    loaded = true;
  }
}

function fillTable(d) {
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

function fetchData(d, i, col) {
  d3.select("#table_" + col)
    .append("p")
    .text(function () {
      return d[i][col] instanceof Date ? d[i][col].toLocaleDateString() : d[i][col];
    });
}
