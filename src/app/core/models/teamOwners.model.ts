
class TeamOwnerModel {
    constructor(
    public name: string,
    public teamname: string,
    public espn_team_id: number,
    public _id?: string
  ) { }
}

class FormTeamOwnerModel {
  constructor(
    public name: string,
    public teamname: string,
    public espn_team_id: number
  ) { }
}




export { TeamOwnerModel, FormTeamOwnerModel };

