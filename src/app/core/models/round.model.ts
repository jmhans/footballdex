
class RoundModel {
    constructor(
    public description: string,
    public groups: any[],
    public date: Date,
    public course: any, 
    public _id?: string
  ) { }
}

class FormRoundModel {
  constructor(
    public description: string,
    public groups: any[],
    public date: Date,
    public course: any, 
  ) { }
}




export { RoundModel, FormRoundModel };

