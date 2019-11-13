// Functional Component Made to handle all calls for the date

function GetDate(days){
  let someDate = new Date();
  let numberOfDaysToAdd = days ;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

  let dd = someDate.getDate();
  let mm = someDate.getMonth() + 1;
  let y = someDate.getFullYear();

  let mydate = new Date(y + '-' + mm + '-'+ dd);

  return mydate.toDateString();
}

export default GetDate;  
  