

export class UtilsService{

  //Order date DESC
  public orderDateDesc = (a, b) => {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }
}
