var avg = function() {
    let sum = 0;
    for (const item of arguments) {
      sum += item;
    }
    return sum / arguments.length;
  };

  const sum = (avg) => avg+2;

  console.log(avg(1,2,3,4));

  console.log(sum(avg(1,2,3,4)));


  var nameExtract = (fname, lname) => {
   return fname[0]+lname[0];}

  console.log(nameExtract('nikhil','balne'));