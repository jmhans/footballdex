
class RFAModel {
    constructor(
    public owner: any,
    public name: string,
    public adv?: number,
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

