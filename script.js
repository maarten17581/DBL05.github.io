
//Returns a "promise" : object representing the eventual completion (or failure) of an asynchronous operation and its
// resulting value.

//NOTE: CHROME ONLY ALLOWS LOADING OF CSV FROM SERVER / WITH SPECIAL ACCESS. TESTING IS EASIEST
// VIA FIREFOX OR ANOTHER BROWSER, BUT THIS IS SOMETHING TO KEEP IN MIND.
testData = d3.csv("./enron-v1.csv", function(d) {

    return {
        date: new Date(d.date), //Convert date to Date
        fromEmail: d.fromEmail,
        fromId: +d.fromId,
        fromJobtitle: d.fromJobtitle,
        messageType: d.messageType,
        sentiment: +d.sentiment,
        toEmail: d.toEmail,
        toId: +d.toId,
        toJobtitle: d.toJobtitle
    };
});

console.log(testData);
