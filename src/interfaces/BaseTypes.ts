export type MerchantAuthentication = {
  name: string;
  transactionKey: string;
};

export enum CardType {
  Visa = "Visa",
  Mastercard = "Mastercard",
  Discover = "Discover",
  Amex = "AmericanExpress",
  DinersClub = "DinersClub",
  JCB = "JCB",
}

export enum ResultCode {
  Ok = "Ok",
  Error = "Error",
}

export enum ProfileType {
  Guest = "guest",
  Regular = "regular",
}

export enum eCheckType {
  PPD = "PPD",
  WEB = "WEB",
  CCD = "CCD",
}

export type MessagesType = {
  resultCode: ResultCode;
  message: {
    code: string;
    text: string;
  }[];
};

export type PaymentType = {
  creditCard: {
    cardNumber: string;
    expirationDate: string;
    cardType: CardType;
    cardCode?: string;
  };
};
