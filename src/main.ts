import { CustomerProfile } from "./classes/CustomerProfile";
import { MerchantAuthentication } from "./interfaces/BaseTypes";

export class AuthNetWrapper {
    private _merchantAuthentication: MerchantAuthentication;
    private _customerProfile: CustomerProfile;

    constructor(apiId: string, apiTransactionKey: string) {
        this._merchantAuthentication = {
            name: apiId,
            transactionKey: apiTransactionKey,
        }
        
        this._customerProfile = new CustomerProfile(this._merchantAuthentication);
    }

    public get async customerProfile(customerId: string): CustomerProfile {
        return await this._customerProfile.getCustomerProfile(customerId);
    }
}