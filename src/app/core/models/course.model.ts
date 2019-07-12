
class CourseModel {
    constructor(
    public name: string,
    public location: string,
    public holes: [{number: number, par: number, handicap: number}],
    public _id?: string
  ) { }
}

class FormCourseModel {
  constructor(
    public name: string,
    public location: string,
    public holes: [{number: number, par: number, handicap: number}],
  ) { }
}




export { CourseModel, FormCourseModel };