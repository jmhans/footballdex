
class GroupModel {
    constructor(
    public groupTitle: string,
    public scorecards: any[]
  ) { }
}

class FormGroupModel {
  constructor(
    public scorecards: any[]
  ) { }
}




export { GroupModel, FormGroupModel };