
class TeamOwnerModel {
    constructor(
    public name: string,
    public teamname: string,
    public _id?: string
  ) { }
}

class FormTeamOwnerModel {
  constructor(
    public name: string,
    public teamname: string
  ) { }
}




export { TeamOwnerModel, FormTeamOwnerModel };

