export class Instructor {
  instructor = {
     firstName: String,
     lastName: String,
     phone: Number,
     address: String,
     email: String,
     profileDescription: String,
     instructorSchedule: Object
  }
  constructor(
    public firstName: string,
    public lastName: string,
    public phone: number,
    public address: string,
    public  email: string,
    public  profileDescription: string,
    public  instructorSchedule: any,
  ){}
}
