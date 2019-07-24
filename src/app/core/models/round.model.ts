
class RoundModel {
    constructor(
    public description: string,
    public groups: any[],
    public date: Date,
    public course: any,
    public score_type: string,
    public _id?: string
  ) { }
}

class FormRoundModel {
  constructor(
    public description: string,
    public groups: any[],
    public date: Date,
    public course: any,
    public score_type: string
  ) { }
}




export { RoundModel, FormRoundModel };

