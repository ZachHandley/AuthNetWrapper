import {
  MerchantAuthentication,
  CustomerProfileRequest,
  CustomerProfileResponse,
} from "../interfaces/BaseTypes";
import { APIControllers, APIContracts } from "authorizenet";
export class CustomerProfile {
  private merchantAuthentication: MerchantAuthentication;

  constructor(merchantAuthentication: MerchantAuthentication) {
    this.merchantAuthentication = merchantAuthentication;
  }

  async createCustomerProfile(
    customerRequest: CustomerProfileRequest
  ): Promise<CustomerProfileResponse> {
    // Implementation for creating a customer profile
  }

  async getCustomerProfile(
    customerId: string
  ): Promise<CustomerProfileResponse> {
    const merchantAuthenticationType =
      new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(this.merchantAuthentication.name);
    merchantAuthenticationType.setTransactionKey(
      this.merchantAuthentication.transactionKey
    );

    const getRequest = new APIContracts.GetCustomerProfileRequest();
    getRequest.setCustomerProfileId(customerId);
    getRequest.setMerchantAuthentication(merchantAuthenticationType);
    let toReturn: CustomerProfileResponse | undefined = undefined;
    const ctrl = new APIControllers.GetCustomerProfileController(
      getRequest.getJSON()
    );
    ctrl.execute(() => {
        const apiResponse = ctrl.getResponse();
        const response = new APIContracts.GetCustomerProfileResponse(apiResponse);

        if (response != null) {
            if (response.getMessages().getResultCude() == APIContracts.MessageTypeEnum.OK) {
                console.log('Get customer profile successful');
                console.log('Customer Id: ' + response.getProfile().getCustomerProfileId());
                console.log('Customer Email: ' + response.getProfile().getEmail());
                console.log('Customer Description: ' + response.getProfile().getDescription());
                toReturn = {
                    customerProfileId: response.getProfile().getCustomerProfileId(),
                    
                    customerPaymentProfileIdList: response.getProfile().getPaymentProfiles(),
                    customerShippingAddressIdList: response.getProfile().getShipToList()
                }
            } else {
                console.log('Result Code: ' + response.getMessages().getResultCode());
                console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
            }
        } else {
            console.log('Null Response.');
            toReturn = undefined;
        }
    })
  }

  async updateCustomerProfile(
    customerRequest: CustomerProfileRequest
  ): Promise<CustomerProfileResponse> {
    // Implementation for updating a customer profile
  }

  async deleteCustomerProfile(
    customerId: string
  ): Promise<CustomerProfileResponse> {
    // Implementation for deleting a customer profile
  }

  // Additional methods for managing customer payment profiles and shipping addresses
}
