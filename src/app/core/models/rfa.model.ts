
class RFAModel {
    constructor(
    public owner: any,
    public name: string,
    public adv?: number,
    public created_by?: string,
    public _id?: string
  ) { }
}

class RFAModelWithBids {
      constructor(
    public rfa: RFAModel,
    public bids?: any[]
  ) { }
}

class FormRFAModel {
  constructor(
    public owner: any,
    public name: string,
    public adv?: number,
  ) { }
}


export { RFAModel, FormRFAModel, RFAModelWithBids };

