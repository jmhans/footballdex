
class GroupModel {
    constructor(
    public groupTitle: string,
    public scorecards: any[], 
    public groupScores: any[], 
    public _id?: string
  ) { }
}

class FormGroupModel {
  constructor(
    public groupTitle: string, 
    public scorecards: any[], 
    public _id?: string
  ) { }
}




export { GroupModel, FormGroupModel };