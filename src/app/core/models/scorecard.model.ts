
class ScorecardModel {
    constructor(
    public golfer: string,
    public handicap_strokes: number,
    public tee: string,
    public holes: object[],
    public _id?: string
  ) { }
}

class FormScorecardModel {
  constructor(
    public nickname: string,
     public handicap: number
  ) { }
}


export { ScorecardModel, FormScorecardModel };