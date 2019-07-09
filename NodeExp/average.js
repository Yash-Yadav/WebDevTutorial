function average(scores)
{
  //add all scores together
    var total = 0;
    scores.forEach(function(scores) {
      total+=scores;
    });
    //divide by total number of scores
    var avg = total/scores.length;

    //round Average
    return Math.round(avg);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));  //Should return 94

var scores = [40, 65, 77, 80, 82, 54, 73, 63, 95, 49];
console.log(average(scores));  //Should return 68