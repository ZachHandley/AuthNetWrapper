import { MessagesType, CardType, eCheckType, ProfileType } from "./BaseTypes";

export type ShipToList = {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phoneNumber: string;
  faxNumber: string;
  customerAddressId: string;
}[];

export type BillTo = {
  firstName?: string;
  lastName?: string;
  company: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country: string;
  phoneNumber: string;
  faxNumber: string;
};

export type Payment = {
  creditCard?: {
    cardNumber: string;
    expirationDate: string;
    cardType: CardType;
    issuerNumber?: string;
    isPaymentToken: boolean;
  };
  bankAccount?: {
    accountType: string;
    routingNumber: string;
    accountNumber: string;
    nameOnAccount: string;
    echeckType: eCheckType;
    bankName: string;
  };
  opaqueData?: {
    dataDescriptor: string;
    dataValue: string;
  };
};

export type PaymentProfile = {
  defaultPaymentProfile?: boolean;
  customerProfileId: string;
  customerType: "individual" | "business";
  customerPaymentProfileId: string;
  billTo: BillTo;
  payment: Payment;
};

export type CustomerProfile = {
  merchantCustomerId: string; // Required only when no values for description and email are submitted
  description?: string;
  customerProfileId: string;
  email: string;
  paymentProfiles: PaymentProfile[];
  shipToList: ShipToList;
  profileType: ProfileType;
  subscriptionIds: {
    subscriptionId: string;
  }[];
  originalNetworkTransId: string;
  originalAuthAmount: number;
  excludeFromAccountUpdater: boolean; // This field is only included in the response if the payment profile is
  //updated with excludeFromAccountUpdater set to true.
};

export type createCustomerProfileRequest = {
  refId?: string;
  profile: {
    merchantCustomerId?: string; // Required only when no values for description or email are submitted
    description?: string;
    email: string; // Required when using a European payment processor
    paymentProfiles: {
      customerType: "individual" | "business";
      billTo: BillTo;
      payment: Payment;
    };
    shipToList: ShipToList;
  };
  profileType: ProfileType;
  validationMode?: "testMode" | "liveMode";
};

export type createCustomerProfileResponse = {
  refId: string;
  messages: MessagesType;
  customerProfileId: string;
  customerPaymentProfileIdList?: string[];
  customerShippingAddressIdList?: string[];
  validationDirectResponseList?: string[];
};

export type getCustomerProfileRequest = {
  refId?: string;
  customerProfileId: string;
  merchantCustomerId?: string;
  email: string;
  unmaskExpirationDate: boolean; // Set to true if you want the expiration date to be returned unmasked
  includeIssuerInfo: boolean; // Set to true if you want the issuer information to be returned
};

export type getCustomerProfileResponse = {
  refId: string;
  messages: MessagesType;
  profile: CustomerProfile;
};

export type getCustomerProfileIdsRequest = {
  redId?: string;
};

export type getCustomerProfileIdsResponse = {
  refId: string;
  messages: MessagesType;
  ids: {
    numericString: string;
  }[];
};

export type updateCustomerProfileRequest = {
  refId?: string;
  profile: {
    merchantCustomerId?: string;
    description?: string;
    email: string;
    customerProfileId: string;
    profileType: ProfileType;
  };
};

export type updateCustomerProfileResponse = {
  refId: string;
  messages: MessagesType;
};

export type deleteCustomerProfileRequest = {
  refId?: string;
  customerProfileId: string;
};

export type deleteCustomerProfileResponse = {
  refId: string;
  messages: MessagesType;
};

export type createCustomerPaymentProfileRequest = {
  refId?: string;
  customerProfileId: string;
  paymentProfile: {
    customerType: "individual" | "business";
    billTo: BillTo;
    payment: Payment;
    defaultPaymentProfile: boolean;
  };
  validationMode?: "testMode" | "liveMode";
};

export type createCustomerPaymentProfileResponse = {
  refId: string;
  messages: MessagesType;
  customerPaymentProfileId: string;
  validationDirectResponse?: string;
  defaultPaymentProfile?: boolean;
};

export type getCustomerPaymentProfileRequest = {
  refId?: string;
  customerProfileId: string;
  customerPaymentProfileId: string;
  unmaskExpirationDate: boolean;
  includeIssuerInfo: boolean;
};

export type getCustomerPaymentProfileResponse = {
  refId: string;
  messages: MessagesType;
  paymentProfile: PaymentProfile;
  subscriptionIds: {
    subscriptionId: string;
  }[];
  originalNetworkTransId: string;
  originalAuthAmount: number;
  excludeFromAccountUpdater?: boolean;
};

export type getCustomerPaymentProfileListRequest = {
  refId?: string;
  searchType: string; // use cardsExpringInMonth to filter profiles with cards that expire in a given month
  month: string; // Use XML gYearMonth (YYYY-MM) format
  sorting: {
    orderBy: string;
    orderDescending: boolean;
  };
  paging: {
    limit: number;
    offset: number;
  };
};

export type getCustomerPaymentProfileListResponse = {
  refId: string;
  messages: MessagesType;
  totalNumInResultSet: number;
  paymentProfiles: PaymentProfile[];
};
