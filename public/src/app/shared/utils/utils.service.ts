

export class UtilsService{

  public daysOfWeek = ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"];
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


  // Prevent Saturday and Sunday from being selected in Owl calendar.
  public myFilter = (d: Date): boolean => {
      const day = d.getDay();
      return day !== 0 && day !== 6;
  }

  public buildSchedule(array, day){
    var hours = [];
    for(var i = 0; i < array.length; i++){
      if(day != undefined && array[i].day === day){
        hours = [];
        for( var y = array[i].workingHours.from; y < array[i].workingHours.to; y += 2){
          hours.push({from : y , to: y + 2});
        }
        return hours;
      }else{
        hours.push({day: array[i].day, dayOfWeek: this.daysOfWeek[array[i].day], from : array[i].workingHours.from , to: array[i].workingHours.to});
      }
    }
    return hours.sort(this.orderDayAsc);
  }

  public appendDateTime(date, time){
    return date + (time * 60 * 60) * 1000;
  }

}
