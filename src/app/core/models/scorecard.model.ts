
class GolferModel {
    constructor(
    public nickname: string,
    public handicap: number,
    public _id?: string
  ) { }
}

class FormGolferModel {
  constructor(
    public nickname: string,
     public handicap: number
  ) { }
}




export { GolferModel, FormGolferModel };