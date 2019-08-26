import { RFAModel } from './rfa.model';


class BidModel {
    constructor(
    public bidder: string,
    public rfa: RFAModel,
    public bid_amount: number,
    public _id?: string
  ) { }
}

export { BidModel};

