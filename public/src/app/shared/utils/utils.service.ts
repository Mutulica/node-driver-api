

export class UtilsService {

  public daysOfWeek = ["Duminica","Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"];
  public monthsOfYear = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai'];

  //Order date ascending
  public orderDateDesc = (a, b) => {
    if (a.date.from < b.from)
      return -1;
    if (a.date.from > b.date.from)
      return 1;
    return 0;
  }
  //order day ascending
  public orderDayAsc = (a, b) => {
    if (a.day < b.day)
      return -1;
    if (a.day > b.day)
      return 1;
    return 0;
  }

//Return only future appointments
 public filterPastAppoint = (el : Object): boolean => {
   const dateNow = new Date().getTime();
   return el['date'].from > dateNow;
 }

 //Return only past appointments
  public filterFutureAppoint = (el : Object): boolean => {
    const dateNow = new Date().getTime();
    return el['date'].from < dateNow && el['status'] === 'incomplete';
  }
  // Prevent Saturday and Sunday from being selected in Owl calendar.
  public myFilter = (d: Date): boolean => {
      const day = d.getDay();
      return day !== 0 && day !== 6;
  }

  //convert minutes to hours
  public convertToHours(x) {
      var x,y,z;
      y=x/60;
      z=x%60;
      return Math.trunc(y) +"."+ z ;
  }

  //Convert Miliseconds to minutes
  convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60) + 2;
    m = m % 60;
    h = h % 24;
    return h * 60 + m;
  };

  public buildSchedule(array, day){
    const sessionDuration = 75;
    var hours = [];
    for(var i = 0; i < array.length; i++){
      if(day != undefined && array[i].day === day){
        hours = [];
        for(var y = this.convertMS(array[i].workingHours.from); y + sessionDuration <= this.convertMS(array[i].workingHours.to); y += sessionDuration){
          //var data = y * 60;
          console.log(y);
          hours.push({from : parseFloat(this.convertToHours(y)).toFixed(2) , to: parseFloat(this.convertToHours(y + sessionDuration)).toFixed(2)});
        }
        return hours;
      }else{
        hours.push({day: array[i].day, dayOfWeek: this.daysOfWeek[array[i].day], from : array[i].workingHours.from.toFixed(2) , to: array[i].workingHours.to.toFixed(2)});
      }
    }
    return hours.sort(this.orderDayAsc);
  }

  public appendDateTime(date, time){
    return date + (time * 60 * 60) * 1000;
  }


  minutesToMilliseconds(minutes) {
   var millis = Math.floor(minutes * 60000);
   var seconds = ((millis % 60000) / 1000).toFixed(0);
   return millis;
 }

  buildScheduleFromMS(array, day){
    const sessionDuration = this.minutesToMilliseconds(90);
    var hours = [];
    for(var i = 0; i < array.length; i++){
      if(day != undefined && array[i].day === day){
        hours = [];
        for(var y = array[i].workingHours.from; y + sessionDuration <= array[i].workingHours.to; y += sessionDuration){
          hours.push({from : y , to: y + sessionDuration});
        }
        return hours;
      }else{
        hours.push({day: array[i].day, dayOfWeek: this.daysOfWeek[array[i].day], from : array[i].workingHours.from.toFixed(2) , to: array[i].workingHours.to.toFixed(2)});
      }
    }
  }
}
