//NOTE: CHROME ONLY ALLOWS LOADING OF CSV FROM SERVER / WITH SPECIAL ACCESS.
//TESTING IS EASIEST VIA FIREFOX OR ANOTHER BROWSER, BUT THIS IS SOMETHING TO
//KEEP IN MIND.

loaded = false;
function loadButtonWrapper() {
    
    if (!loaded) {

        //Reads the csv file
        d3.csv("./enron-v1.csv", d3.autoType).then(function (d) {
          //At this point, d is an array console.log(d); document.write(d[0].toEmail)

          for (var i = 0; i < d.length; i++) {
            fetchData("date");
            fetchData("fromId");
            fetchData("fromEmail");
            fetchData("fromJobtitle");
            fetchData("toId");
            fetchData("toEmail");
            fetchData("toJobtitle");
            fetchData("messageType");
            fetchData("sentiment");
          }

          function fetchData(col) {
            d3.select("#table_" + col)
              .append("p")
              .text(function () {
                return d[i][col] instanceof Date ? d[i][col].toLocaleDateString() : d[i][col];
              });
          }
        });
        loaded = true;
    }
}
