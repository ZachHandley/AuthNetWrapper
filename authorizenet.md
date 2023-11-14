Payment Transactions

The createTransactionRequest function enables you to submit a wide variety of transaction requests, depending on how you structure it. For example, differences in the transactionType field or the payment field can create different types of transactions.

For more information about the different types of transactions, see the Payment Transactions page.
Charge a Credit Card

Use this method to authorize and capture a credit card payment.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var SDKConstants = require('authorizenet').Constants;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function chargeCreditCard(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var creditCard = new ApiContracts.CreditCardType();

    creditCard.setCardNumber('4242424242424242');

    creditCard.setExpirationDate('0822');

    creditCard.setCardCode('999');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setCreditCard(creditCard);

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest Required.
This element is a container for transaction specific information.

transactionType Type of credit card transaction.

String.

Use authCaptureTransaction to authorize and automatically capture the transaction.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

currencyCode Required.
Currency of the transaction.

Use the ISO 4217 three-letter alphabetic code for the currency.Use the ISO 4217 three-letter alphabetic code for the currency.

Currently supported currencies are USD, CAD, GBP, DKK, NOK, PLN, SEK, EUR, AUD, and NZD.
String, three characters.

payment Contains payment information.

trackData

Applies to Card Present transactions only.

Contains track data read from the customer's card.

Track data contains the full card number and expiration date by default. If you use the trackData element, do not send the creditCard element. Sending both elements may result in Response Reason Code 153.
track1 Conditional.

Applies to Card Present transactions only.

Track data includes the full card number and expiration date by default. If you send the track1 element, do not send the creditCard element. Sending both elements may result in Response Reason Code 153.
String, 76 characters.

Do not include the start sentinel (percent sign), end sentinel (question mark), or Longitudinal Redundancy Check.

track2 Conditional.

Applies to Card Present transactions only.

Track data includes the full card number and expiration date by default. If you use the track2 element, do not send the creditCard element. Sending both elements may result in Response Reason Code 153.
String, 37 characters.

Do not include the start sentinel (semicolon), end sentinel (question mark), or Longitudinal Redundancy Check.

creditCard Conditional.

Applies to Card Not Present transactions only.

Contains human-readable information from the customer's card.

cardNumber Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card number.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
Numeric string, 13-16 digits.

expirationDate Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card expiration date.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

cardCode Conditional.

Applies to Card Not Present transactions only.

The customer’s card code.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This field is required if the merchant would like to use the Card Code Verification (CCV) security feature.

Cardholder information must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

For more information about PCI, please refer to the Standards, Compliance and Security developer training video at https://developer.authorize.net/training.
Numeric string, 3-4 digits.

profile The following field enables you to create a customer profile from the data sent to make the transaction.

createProfile Indicates whether to create a customer profile.

If set to true, a customer profile and payment profile will be generated from the customer and payment data.
Boolean.

Either true or false.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

name The name is generated by the solution provider and provided to Authorize.net.

See the Solution ID Implementation Guide for details.
String, up to 255 characters.

terminalNumber The merchant's in-store terminal number. Can identify the cashiers or kiosks used.

Do not use your processor's terminal ID for this field.
String.

order Contains information about the order.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String, up to 20 characters.

description Description of the item purchased.

String, up to 255 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

tax Contains information about applicable taxes.

amount Amount of tax.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of tax.

String, up to 31 characters.

description Description of tax.

String, up to 255 characters.

duty Contains information about any duty applied.

amount Amount of duty.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of duty.

String, up to 31 characters.

description Description of duty.

String, up to 255 characters.

shipping Items in this element describe shipping charges applied.

amount Amount of the shipping charges.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of the shipping charges.

String, up to 31 characters.

description Description of the shipping charges.

String, up to 255 characters.

taxExempt Indicates whether or not order is exempt from tax.

Boolean.

Either true or false.

poNumber The merchant-assigned purchase order number.

If you use purchase order numbers, your solution should generate the purchase order number and send it with your transaction requests. Authorize.net does not generate purchase order numbers.
String, up to 25 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

customerIP Conditional.

The IPv4 address of the customer initiating the transaction. Defaults to 255.255.255.255 if not included in your request.

Required only when the merchant is using customer IP based AFDS filters.
String, up to 15 characters.

Use dot-decimal formatting.

cardholderAuthentication Important: This field is deprecated and should not be used.

Merchants using a third party cardholder authentication solution can submit the following authentication values with Visa and Mastercard transactions.

Invalid combinations of card type, authenticationIndicator, and cardholderAuthenticationValue will result in Response Reason Code 118.
authenticationIndicator Conditional.

Important: This field is deprecated and should not be used.

The Electronic Commerce Indicator (ECI) value for a Visa transaction, or the Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the ECI or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of authenticationIndicator will result in Response Reason Code 116.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

cardholderAuthenticationValue Conditional.

Important: This field is deprecated and should not be used.

The Cardholder Authentication Verification Value (CAVV) for a Visa transaction, or Accountholder Authentication Value (AVV)/ Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the CAVV, AAV, or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of cardholderAuthenticationValue will result in Response Reason Code 117.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

retail The retail element contains two elements: marketType and deviceType. If you submit the retail element, the marketType and deviceType elements are required.

marketType The market type of the transaction.

This element is required if you submit the retail element.
Numeric string.

Either 0 for e-commerce, 1 for MOTO, or 2 for retail. Defaults to 2.

deviceType The type of device submitting the retail transaction.

This element is required if you submit the retail element.
Numeric string.

One of the following:

1 -- unknown device type
2 -- unattended terminal
3 -- self-service terminal
4 -- electronic cash register
5 -- personal computer based terminal
7 -- wireless POS
8 -- website
9 -- dial terminal
10 -- Virtual Terminal

employeeId Merchant-assigned employee ID.

This field is required for the EVO processor, and is supported on the TSYS processor.
Numeric string, 4 digits. Defaults to 0000.

transactionSettings This element contains one or more setting elements.

setting Contains settingName and settingValue.

settingName Name of a specific setting to be modified for this transaction.

For a list of valid settingName values and their uses, please see the Transaction Settings section of the Payment Transactions page.
String.

One of the following:
allowPartialAuth
duplicateWindow
emailCustomer
headerEmailReceipt
footerEmailReceipt
recurringBilling

settingValue Indicates whether the specified setting is enabled or disabled.

For a list of permitted settingValue formats, please see the Transaction Settings section of the Payment Transactions page.
String.

Permitted values depend on the value of settingName.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

surcharge Used to record payment card surcharges that are passed along to customers. Contains an amount and a description child element.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
amount Amount of the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

description Describes the reason or details for the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
String, up to 255 characters.

tip The amount of the tip authorized by the cardholder.

The total transaction amount must include this value.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

processingOptions Contains details for additional transaction processing.

Required if the merchant stores card-on-file payment information.
isFirstRecurringPayment Indicates the initial zero-dollar authorization or the first recurring payment in a series of charges.

Required if the merchant stores card-on-file payment information.

Set recurringBilling to true if you set isFirstRecurringPayment.
Boolean.

isFirstSubsequentAuth Indicates the initial zero-dollar authorization or the first payment in a series of charges.

Required if the merchant stores card-on-file payment information.
Boolean.

isSubsequentAuth Indicates that the transaction is a follow-on transaction for an established customer.

Use in these situations:

    - When resubmitting declined transactions;
    - When resubmitting a transaction with an expired authorization;
    - When submitting delayed charges after completing the original payments;
    - When charging customer penalties for reservation no-shows; or
    - When processing an unscheduled card-on-file transaction.

Required if the merchant stores card-on-file payment information.
Boolean.

isStoredCredentials Indicates that the transaction was initiated by the customer using card-on-file payment information.

Required if the merchant stores card-on-file payment information.
Boolean.

subsequentAuthInformation Contains details for subsequent authorizations using a payment card stored by the merchant.

Required if the merchant stores card-on-file payment information.
originalNetworkTransId Required.
The network transaction ID returned in response to the original card-on-file transaction.

Store the networkTransId value received in the original card-on-file transaction response. Set the originalNetworkTransId to the original networkTransId value for all subsequent authorizations against the same card-on-file.
String, up to 255 characters.

reason Required.
Describes the reason for the subsequent card-on-file transaction.

Use resubmission for resubmitting the original charge if declined, and if the customer has already received goods or services.

Use delayedCharge if there are supplemental charges after the original charge was submitted and the customer has received the goods or services.

Use reauthorization for new transactions submitted after the original transaction, for example, for split or delayed shipments of goods, or for extended services beyond those originally requested.

Use noShow for penalties after cancellation of services, for example, when a customer does not appear after making a reservation.
String. Either resubmission, delayedCharge, reauthorization, or noShow.

originalAuthAmount Required.
The original authorization amount.

Store the amount of the original card-on-file transaction response. Set the originalAuthAmount to the original amount value for all subsequent authorizations against the same card-on-file.
Decimal, up to 15 digits with a decimal point.

Required for Discover, Diners Club, JCB, and China Union Pay transactions.

Do not use currency symbols.

authorizationIndicator Indicates whether the authorization was a pre-authorization or final authorization.

Applicable to Mastercard only. Use pre for initial authorizations, for example, prior to tips. Use final for final authorizations, for example, including tips.
String.

Either pre or final.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value will be included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

transactionResponse
responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

authCode The authorization code granted by the card issuing bank for this transaction.

String, up to 6 characters.

avsResultCode Address Verification Service (AVS) response code.

String, 1 character.

One of the following:

A -- The street address matched, but the postal code did not.
B -- No address information was provided.
E -- The AVS check returned an error.
G -- The card was issued by a bank outside the U.S. and does not support AVS.
N -- Neither the street address nor postal code matched.
P -- AVS is not applicable for this transaction.
R -- Retry — AVS was unavailable or timed out.
S -- AVS is not supported by card issuer.
U -- Address information is unavailable.
W -- The US ZIP+4 code matches, but the street address does not.
X -- Both the street address and the US ZIP+4 code matched.
Y -- The street address and postal code matched.
Z -- The postal code matched, but the street address did not.

cvvResultCode Card code verification (CCV) response code.

String, 1 character.

One of the following:

M -- CVV matched.
N -- CVV did not match.
P -- CVV was not processed.
S -- CVV should have been present but was not indicated.
U -- The issuer was unable to process the CVV check.

cavvResultCode Cardholder authentication verification response code.

Important: Mastercard transactions always return a null result for this element. Consequently, transaction details for Mastercard transactions do not contain CAVV results.
String, 1 character.

One of the following:

Blank or not present -- CAVV not validated.
0 -- CAVV was not validated because erroneous data was submitted.
1 -- CAVV failed validation.
2 -- CAVV passed validation.
3 -- CAVV validation could not be performed; issuer attempt incomplete.
4 -- CAVV validation could not be performed; issuer system error.
5 -- Reserved for future use.
6 -- Reserved for future use.
7 -- CAVV failed validation, but the issuer is available. Valid for U.S.-issued card submitted to non-U.S acquirer.
8 -- CAVV passed validation and the issuer is available. Valid for U.S.-issued card submitted to non-U.S. acquirer.
9 -- CAVV failed validation and the issuer is unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
A -- CAVV passed validation but the issuer unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
B -- CAVV passed validation, information only, no liability shift.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Deprecated.

Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

Superseded by transHashSha2.
String.

accountNumber The masked card number or bank account number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

description Text explanation of the code for the result.

String.

errors This element contains one or more error elements.

error This element contains detailed information about any errors returned.

errorCode Error code returned.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

errorText Text description of error.

For a complete list of response codes, see the Response Code Tool.
String.

splitTenderPayments If the transaction was a partial authorization transaction, then the split tender payment details are contained in this element.

splitTenderPayment Contains information about one split tender transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

responseToCustomer The response reason code.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

authCode The authorization code granted by the card issuing bank for this transaction.

String, up to 6 characters.

accountNumber The masked card number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

requestedAmount Amount requested in original authorization.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

approvedAmount Amount approved.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

balanceOnCard Balance on the debit card or prepaid card.

Can be a positive or negative number. Has a value only if the current transaction is for a prepaid card.
Numeric string.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

transHashSha2 The SHA-512 hash returned in transaction responses, which you can use to confirm that the transaction response came from Authorize.net.

See the Transaction Hash Upgrade Guide<\/a> for details on how to use transHashSha2<\/code>.
String.

networkTransId Required.
The network transaction ID returned in response to the requested card-on-file transaction.

Store the networkTransId value received in the original card-on-file transaction response. Set the originalNetworkTransId to the original networkTransId value for all subsequent authorizations against the same card-on-file.
String, up to 255 characters.

profileResponse Contains result of attempt to create a customer payment profile.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

customerProfileId The ID number associated with the customer profile.

Numeric string.

customerPaymentProfileIdList Contains the Customer Payment Profile ID element

numericString The ID number associated with the customer payment profile.

This is only included if the original transaction included a billing address.
Numeric string.

customerShippingProfileIdList Contains the Customer Shipping Profile ID element.

numericString The ID number associated with the customer shipping profile.

This value is only included if the original transaction included a shipping address.
Numeric string.

Authorize a Credit Card

Use this method to authorize a credit card payment. To actually charge the funds you will need to follow up with a capture transaction.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function authorizeCreditCard(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var creditCard = new ApiContracts.CreditCardType();

    creditCard.setCardNumber('4242424242424242');

    creditCard.setExpirationDate('0822');

    creditCard.setCardCode('999');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setCreditCard(creditCard);

​

    var orderDetails = new ApiContracts.OrderType();

    orderDetails.setInvoiceNumber('INV-12345');

    orderDetails.setDescription('Product Description');

​

    var tax = new ApiContracts.ExtendedAmountType();

    tax.setAmount('4.26');

    tax.setName('level2 tax name');

    tax.setDescription('level2 tax');

​

    var duty = new ApiContracts.ExtendedAmountType();

    duty.setAmount('8.55');

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest Required.
This element is a container for transaction specific information.

transactionType Type of credit card transaction.

String.

Use authOnlyTransaction to authorize the transaction for capture at a later time.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

currencyCode Required.
Currency of the transaction.

Use the ISO 4217 three-letter alphabetic code for the currency.Use the ISO 4217 three-letter alphabetic code for the currency.

Currently supported currencies are USD, CAD, GBP, DKK, NOK, PLN, SEK, EUR, AUD, and NZD.
String, three characters.

payment This element contains payment information.

trackData Conditional.

Applies to Card Present transactions only.

Contains track data read from the customer's card.

Track data contains the full card number and expiration date by default. If you use the trackData element, do not send the creditCard element. Sending both elements may result in Response Reason Code 153.
track1 Conditional.

Applies to Card Present transactions only.

Track data includes the full card number and expiration date by default. If you send the track1 element, do not send the creditCard element. Sending both elements may result in Response Reason Code 153.
String, 76 characters.

Do not include the start sentinel (percent sign), end sentinel (question mark), or Longitudinal Redundancy Check.

track2 Conditional.

Applies to Card Present transactions only.

Track data includes the full card number and expiration date by default. If you use the track2 element, do not send the creditCard element. Sending both elements may result in Response Reason Code 153.
String, 37 characters.

Do not include the start sentinel (semicolon), end sentinel (question mark), or Longitudinal Redundancy Check.

creditCard Conditional.

Applies to Card Not Present transactions only.

Contains human-readable information from the customer's card.

cardNumber Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card number.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
Numeric string, 13-16 digits.

expirationDate Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card expiration date.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

cardCode Conditional.

Applies to Card Not Present transactions only.

The customer’s card code.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This field is required if the merchant would like to use the Card Code Verification (CCV) security feature.

Cardholder information must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

For more information about PCI, please refer to the Standards, Compliance and Security developer training video at https://developer.authorize.net/training.
Numeric string, 3-4 digits.

profile The following field enables you to create a customer profile from the data sent to make the transaction.

createProfile Indicates whether to create a customer profile.

If set to true, a customer profile and payment profile will be generated from the customer and payment data.
Boolean.

Either true or false.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

name The name is generated by the solution provider and provided to Authorize.net.

See the Solution ID Implementation Guide for details.
String, up to 255 characters.

terminalNumber The merchant's in-store terminal number. Can identify the cashiers or kiosks used.

Do not use your processor's terminal ID for this field.
String.

order Contains information about the order.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String, up to 20 characters.

description Description of the item purchased.

String, up to 255 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

tax Contains information about applicable taxes.

amount Amount of tax.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of tax.

String, up to 31 characters.

description Description of tax.

String, up to 255 characters.

duty Contains information about any duty applied.

amount Amount of duty.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of duty.

String, up to 31 characters.

description Description of duty.

String, up to 255 characters.

shipping Items in this element describe shipping charges applied.

amount Amount of the shipping charges.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of the shipping charges.

String, up to 31 characters.

description Description of the shipping charges.

String, up to 255 characters.

taxExempt Indicates whether or not order is exempt from tax.

Boolean.

Either true or false.

poNumber The merchant-assigned purchase order number.

If you use purchase order numbers, your solution should generate the purchase order number and send it with your transaction requests. Authorize.net does not generate purchase order numbers.
String, up to 25 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

customerIP Conditional.

The IPv4 address of the customer initiating the transaction. Defaults to 255.255.255.255 if not included in your request.

Required only when the merchant is using customer IP based AFDS filters.
String, up to 15 characters.

Use dot-decimal formatting.

cardholderAuthentication Important: This field is deprecated and should not be used.

Merchants using a third party cardholder authentication solution can submit the following authentication values with Visa and Mastercard transactions.

Invalid combinations of card type, authenticationIndicator, and cardholderAuthenticationValue will result in Response Reason Code 118.
authenticationIndicator Conditional.

Important: This field is deprecated and should not be used.

The Electronic Commerce Indicator (ECI) value for a Visa transaction, or the Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the ECI or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of authenticationIndicator will result in Response Reason Code 116.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

cardholderAuthenticationValue Conditional.

Important: This field is deprecated and should not be used.

The Cardholder Authentication Verification Value (CAVV) for a Visa transaction, or Accountholder Authentication Value (AVV)/ Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the CAVV, AAV, or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of cardholderAuthenticationValue will result in Response Reason Code 117.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

retail The retail element contains two elements: marketType and deviceType. If you submit the retail element, the marketType and deviceType elements are required.

marketType The market type for the transaction.

This element is required if you submit the retail element.
Numeric string.

Either 0 for e-commerce, 1 for MOTO, or 2 for retail. Defaults to 2.

deviceType The type of device submitting the retail transaction.

This element is required if you submit the retail element.
Numeric string.

One of the following:

1 -- unknown device type
2 -- unattended terminal
3 -- self-service terminal
4 -- electronic cash register
5 -- personal computer based terminal
7 -- wireless POS
8 -- website
9 -- dial terminal
10 -- Virtual Terminal

employeeId Merchant-assigned employee ID.

This field is required for the EVO processor, and is supported on the TSYS processor.
Numeric string, 4 digits. Defaults to 0000.

transactionSettings This element contains one or more setting elements.

setting Contains settingName and settingValue.

settingName Name of a specific setting to be modified for this transaction.

For a list of valid settingName values and their uses, please see the Transaction Settings section of the Payment Transactions page.
String.

One of the following:
allowPartialAuth
duplicateWindow
emailCustomer
headerEmailReceipt
footerEmailReceipt
recurringBilling

settingValue Indicates whether the specified setting is enabled or disabled.

For a list of permitted settingValue formats, please see the Transaction Settings section of the Payment Transactions page.
String.

Permitted values depend on the value of settingName.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

surcharge Used to record payment card surcharges that are passed along to customers. Contains an amount and a description child element.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
amount Amount of the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

description Describes the reason or details for the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
String, up to 255 characters.

tip The amount of the tip authorized by the cardholder.

The total transaction amount must include this value.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

processingOptions Contains details for additional transaction processing.

Required if the merchant stores card-on-file payment information.
isFirstRecurringPayment Indicates the initial zero-dollar authorization or the first recurring payment in a series of charges.

Required if the merchant stores card-on-file payment information.

Set recurringBilling to true if you set isFirstRecurringPayment.
Boolean.

isFirstSubsequentAuth Indicates the initial zero-dollar authorization or the first payment in a series of charges.

Required if the merchant stores card-on-file payment information.
Boolean.

isSubsequentAuth Indicates that the transaction is a follow-on transaction for an established customer.

Use in these situations:

    - When resubmitting declined transactions;
    - When resubmitting a transaction with an expired authorization;
    - When submitting delayed charges after completing the original payments;
    - When charging customer penalties for reservation no-shows; or
    - When processing an unscheduled card-on-file transaction.

Required if the merchant stores card-on-file payment information.
Boolean.

isStoredCredentials Indicates that the transaction was initiated by the customer using card-on-file payment information.

Required if the merchant stores card-on-file payment information.
Boolean.

subsequentAuthInformation Contains details for subsequent authorizations using stored payment information.

Required if the merchant stores card-on-file payment information.
originalNetworkTransId Required.
The network transaction ID returned in response to the original card-on-file transaction.

Store the networkTransId value received in the original card-on-file transaction response. Set the originalNetworkTransId to the original networkTransId value for all subsequent authorizations against the same card-on-file.
String, up to 255 characters.

reason Required.
Describes the reason for the subsequent card-on-file transaction.

Use resubmission for resubmitting the original charge if declined, and if the customer has already received goods or services.

Use delayedCharge if there are supplemental charges after the original charge was submitted and the customer has received the goods or services.

Use reauthorization for new transactions submitted after the original transaction, for example, for split or delayed shipments of goods, or for extended services beyond those originally requested.

Use noShow for penalties after cancellation of services, for example, when a customer does not appear after making a reservation.
String. Either resubmission, delayedCharge, reauthorization, or noShow.

originalAuthAmount Required.
The original authorization amount.

Store the amount of the original card-on-file transaction response. Set the originalAuthAmount to the original amount value for all subsequent authorizations against the same card-on-file.
Decimal, up to 15 digits with a decimal point.

Required for Discover, Diners Club, JCB, and China Union Pay transactions.

Do not use currency symbols.

authorizationIndicator Indicates whether the authorization was a pre-authorization or final authorization.

Applicable to Mastercard only. Use pre for initial authorizations, for example, prior to tips. Use final for final authorizations, for example, including tips.
String.

Either pre or final.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value will be included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

transactionResponse
responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

authCode The authorization code granted by the card issuing bank for this transaction.

String, up to 6 characters.

avsResultCode Address Verification Service (AVS) response code.

String, 1 character.

One of the following:

A -- The street address matched, but the postal code did not.
B -- No address information was provided.
E -- The AVS check returned an error.
G -- The card was issued by a bank outside the U.S. and does not support AVS.
N -- Neither the street address nor postal code matched.
P -- AVS is not applicable for this transaction.
R -- Retry — AVS was unavailable or timed out.
S -- AVS is not supported by card issuer.
U -- Address information is unavailable.
W -- The US ZIP+4 code matches, but the street address does not.
X -- Both the street address and the US ZIP+4 code matched.
Y -- The street address and postal code matched.
Z -- The postal code matched, but the street address did not.

cvvResultCode Card code verification (CCV) response code.

String, 1 character.

One of the following:

M -- CVV matched.
N -- CVV did not match.
P -- CVV was not processed.
S -- CVV should have been present but was not indicated.
U -- The issuer was unable to process the CVV check.

cavvResultCode Cardholder authentication verification response code.

Important: Mastercard transactions always return a null result for this element. Consequently, transaction details for Mastercard transactions do not contain CAVV results.
String, 1 character.

One of the following:

Blank or not present -- CAVV not validated.
0 -- CAVV was not validated because erroneous data was submitted.
1 -- CAVV failed validation.
2 -- CAVV passed validation.
3 -- CAVV validation could not be performed; issuer attempt incomplete.
4 -- CAVV validation could not be performed; issuer system error.
5 -- Reserved for future use.
6 -- Reserved for future use.
7 -- CAVV failed validation, but the issuer is available. Valid for U.S.-issued card submitted to non-U.S acquirer.
8 -- CAVV passed validation and the issuer is available. Valid for U.S.-issued card submitted to non-U.S. acquirer.
9 -- CAVV failed validation and the issuer is unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
A -- CAVV passed validation but the issuer unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
B -- CAVV passed validation, information only, no liability shift.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Deprecated.

Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

Superseded by transHashSha2.
String.

accountNumber The masked card number or bank account number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

description Text explanation of the code for the result.

String.

errors This element contains one or more error elements.

error This element contains detailed information about any errors returned.

errorCode Error code returned.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

errorText Text description of error.

For a complete list of response codes, see the Response Code Tool.
String.

splitTenderPayments If the transaction was a partial authorization transaction, then the split tender payment details are contained in this element.

splitTenderPayment Contains information about one split tender transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

responseToCustomer The response reason code.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

authCode The authorization code granted by the card issuing bank for this transaction.

String, up to 6 characters.

accountNumber The masked card number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

requestedAmount Amount requested in original authorization.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

approvedAmount Amount approved.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

balanceOnCard Balance on the debit card or prepaid card.

Can be a positive or negative number. Has a value only if the current transaction is for a prepaid card.
Numeric string.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

transHashSha2 The SHA-512 hash returned in transaction responses, which you can use to confirm that the transaction response came from Authorize.net.

See the Transaction Hash Upgrade Guide<\/a> for details on how to use transHashSha2<\/code>.
String.

networkTransId Required.
The network transaction ID returned in response to the requested card-on-file transaction.

Store the networkTransId value received in the original card-on-file transaction response. Set the originalNetworkTransId to the original networkTransId value for all subsequent authorizations against the same card-on-file.
String, up to 255 characters.

profileResponse Contains result of attempt to create a customer payment profile.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

Capture a Previously Authorized Amount

Use this method to capture funds reserved with a previous authOnlyTransaction transaction request.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var constants = require('../constants.js');

​

function capturePreviouslyAuthorizedAmount(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var orderDetails = new ApiContracts.OrderType();

    orderDetails.setInvoiceNumber('INV-12345');

    orderDetails.setDescription('Product Description');

​

    var transactionRequestType = new ApiContracts.TransactionRequestType();

    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.PRIORAUTHCAPTURETRANSACTION);

    transactionRequestType.setRefTransId(transactionId);

    transactionRequestType.setOrder(orderDetails);

​

Request Field Description
Response Field Description
Capture Funds Authorized Through Another Channel

Use this method to capture funds which have been authorized through another channel, such as phone authorization. If you need to capture an authorizeOnlyTransaction, use priorAuthCaptureTransaction instead.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function captureFundsAuthorizedThroughAnotherChannel(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var creditCard = new ApiContracts.CreditCardType();

    creditCard.setCardNumber('4242424242424242');

    creditCard.setExpirationDate('0822');

    creditCard.setCardCode('999');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setCreditCard(creditCard);

​

Request Field Description
Response Field Description
Refund a Transaction

This transaction type is used to refund a customer for a transaction that was successfully settled through the payment gateway. Note that credit card information and bank account information are mutually exclusive, so you should not submit both.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function refundTransaction(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var creditCard = new ApiContracts.CreditCardType();

    creditCard.setCardNumber('4242424242424242');

    creditCard.setExpirationDate('0822');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setCreditCard(creditCard);

​

    var transactionRequestType = new ApiContracts.TransactionRequestType();

Request Field Description
Response Field Description
Void a Transaction

This transaction type can be used to cancel either an original transaction that is not yet settled or an entire order composed of more than one transaction. A Void prevents the transaction or the order from being sent for settlement. A Void can be submitted against any other transaction type

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var constants = require('../constants.js');

​

function voidTransaction(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var transactionRequestType = new ApiContracts.TransactionRequestType();

    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.VOIDTRANSACTION);

    transactionRequestType.setRefTransId(transactionId);

​

    var createRequest = new ApiContracts.CreateTransactionRequest();

    createRequest.setMerchantAuthentication(merchantAuthenticationType);

    createRequest.setTransactionRequest(transactionRequestType);

​

    //pretty print request

Request Field Description
Response Field Description
Update Split Tender Group

Use this function to update the status of an existing order that contains multiple transactions with the same splitTenderId value.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var constants = require('../constants.js');

​

function updateSplitTenderGroup(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var updateRequest = new ApiContracts.UpdateSplitTenderGroupRequest();

    updateRequest.setMerchantAuthentication(merchantAuthenticationType);

    updateRequest.setSplitTenderId('115901');

    updateRequest.setSplitTenderStatus(ApiContracts.SplitTenderStatusEnum.VOIDED);

​

    //pretty print request

    console.log(JSON.stringify(updateRequest.getJSON(), null, 2));



    var ctrl = new ApiControllers.UpdateSplitTenderGroupController(updateRequest.getJSON());

Request Field Description
Response Field Description
Debit a Bank Account

Use this method to process an ACH debit transaction using bank account details.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function debitBankAccount(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var bankAccountType = new ApiContracts.BankAccountType();

    bankAccountType.setAccountType(ApiContracts.BankAccountTypeEnum.SAVINGS);

    bankAccountType.setRoutingNumber('121042882');

    //added code

    var bankAccountNum = Math.floor(Math.random() * 9999999999) + 10000;

    bankAccountType.setAccountNumber(bankAccountNum.toString());

    bankAccountType.setNameOnAccount('John Doe');

​

Request Field Description
Response Field Description
Credit a Bank Account

This transaction type is used to refund a customer using a bank account credit transaction.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function creditBankAccount(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var paymentType = new ApiContracts.PaymentType();

​

    var bankAccountType = new ApiContracts.BankAccountType();

    bankAccountType.setAccountType(ApiContracts.BankAccountTypeEnum.SAVINGS);

    bankAccountType.setRoutingNumber('121042882');

    //added code

    var bankAccountNum = Math.floor(Math.random() * 9999999999) + 10000;

    bankAccountType.setAccountNumber(bankAccountNum.toString());

Request Field Description
Response Field Description
Charge a Customer Profile

Use this method to authorize and capture a payment using a stored customer payment profile.
Important: You can use Customer Profiles with createTransactionRequest calls by using the profile field and its children as payment information.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function chargeCustomerProfile(customerProfileId, customerPaymentProfileId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var profileToCharge = new ApiContracts.CustomerProfilePaymentType();

    profileToCharge.setCustomerProfileId(customerProfileId);

​

    var paymentProfile = new ApiContracts.PaymentProfile();

    paymentProfile.setPaymentProfileId(customerPaymentProfileId);

    profileToCharge.setPaymentProfile(paymentProfile);

​

    var orderDetails = new ApiContracts.OrderType();

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest Required.
This element is a container for transaction specific information.

transactionType Type of credit card transaction.

If the value submitted does not match a supported value, the transaction is rejected.
String.

Use authCaptureTransaction to authorize and automatically capture the transaction.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

currencyCode Required.
Currency of the transaction.

Use the ISO 4217 three-letter alphabetic code for the currency.Use the ISO 4217 three-letter alphabetic code for the currency.

Currently supported currencies are USD, CAD, GBP, DKK, NOK, PLN, SEK, EUR, AUD, and NZD.
String, three characters.

profile The following fields enable you to charge a transaction using payment or shipping profiles.

customerProfileId Conditional.

The ID of the customer profile.

Required if you are using a customer profile as the source for payment or shipping information.
Numeric string.

paymentProfile Contains payment profile information.

paymentProfileId The customer payment profile ID.

Designates the payment profile to use for payment and billing information. Required if the paymentProfile element exists.
Numeric string.

cardCode Applies to Card Not Present transactions only.

The customer’s card code, which may be collected by the merchant for validation. The card code is not stored with the customer profile.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This field is required if the merchant would like to use the Card Code Verification (CCV) security feature.

Cardholder information must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

For more information about PCI, please refer to the Standards, Compliance and Security developer training video at https://developer.authorize.net/training.
Numeric string, 3-4 digits.

shippingProfileId The customer shipping profile ID.

Conditional.

This field is mutually exclusive with the shipTo element. Use one or the other.
Numeric string.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

name The name is generated by the solution provider and provided to Authorize.net.

See the Solution ID Implementation Guide for details.
String, up to 255 characters.

order Contains information about the order.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String, up to 20 characters.

description Description of the item purchased.

String, up to 255 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

tax Contains information about applicable taxes.

amount Amount of tax.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of tax.

String, up to 31 characters.

description Description of tax.

String, up to 255 characters.

duty Contains information about any duty applied.

amount Amount of duty.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of duty.

String, up to 31 characters.

description Description of duty.

String, up to 255 characters.

shipping Items in this element describe shipping charges applied.

amount Amount of the shipping charges.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of the shipping charges.

String, up to 31 characters.

description Description of the shipping charges.

String, up to 255 characters.

taxExempt Indicates whether or not order is exempt from tax.

Boolean.

Either true or false.

poNumber The merchant-assigned purchase order number.

If you use purchase order numbers, your solution should generate the purchase order number and send it with your transaction requests. Authorize.net does not generate purchase order numbers.
String, up to 25 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

customerIP Conditional.

The IPv4 address of the customer initiating the transaction. Defaults to 255.255.255.255 if not included in your request.

Required only when the merchant is using customer IP based AFDS filters.
String, up to 15 characters.

Use dot-decimal formatting.

cardholderAuthentication Important: This field is deprecated and should not be used.

Merchants using a third party cardholder authentication solution can submit the following authentication values with Visa and Mastercard transactions.

Invalid combinations of card type, authenticationIndicator, and cardholderAuthenticationValue will result in Response Reason Code 118.
authenticationIndicator Conditional.

Important: This field is deprecated and should not be used.

The Electronic Commerce Indicator (ECI) value for a Visa transaction, or the Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the ECI or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of authenticationIndicator will result in Response Reason Code 116.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

cardholderAuthenticationValue Conditional.

Important: This field is deprecated and should not be used.

The Cardholder Authentication Verification Value (CAVV) for a Visa transaction, or Accountholder Authentication Value (AVV)/ Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the CAVV, AAV, or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of cardholderAuthenticationValue will result in Response Reason Code 117.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

employeeId Merchant-assigned employee ID.

This field is required for the EVO processor, and is supported on the TSYS processor.
Numeric string, 4 digits. Defaults to 0000.

transactionSettings This element contains one or more setting elements.

setting Contains settingName and settingValue.

settingName Name of a specific setting to be modified for this transaction.

For a list of valid settingName values and their uses, please see the Transaction Settings section of the Payment Transactions page.
String.

One of the following:
allowPartialAuth
duplicateWindow
emailCustomer
headerEmailReceipt
footerEmailReceipt
recurringBilling

settingValue Indicates whether the specified setting is enabled or disabled.

For a list of permitted settingValue formats, please see the Transaction Settings section of the Payment Transactions page.
String.

Permitted values depend on the value of settingName.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

surcharge Used to record payment card surcharges that are passed along to customers. Contains an amount and a description child element.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
amount Amount of the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

description Describes the reason or details for the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
String, up to 255 characters.

tip The amount of the tip authorized by the cardholder.

The total transaction amount must include this value.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

processingOptions Contains details for additional transaction processing.

Required if the merchant stores card-on-file payment information.
isFirstRecurringPayment Indicates the initial zero-dollar authorization or the first recurring payment in a series of charges.

Required if the merchant stores card-on-file payment information.

Set recurringBilling to true if you set isFirstRecurringPayment.
Boolean.

isFirstSubsequentAuth Indicates the initial zero-dollar authorization or the first payment in a series of charges.

Required if the merchant stores card-on-file payment information.
Boolean.

isSubsequentAuth Indicates that the transaction is a follow-on transaction for an established customer.

Use in these situations:

    - When resubmitting declined transactions;
    - When resubmitting a transaction with an expired authorization;
    - When submitting delayed charges after completing the original payments;
    - When charging customer penalties for reservation no-shows; or
    - When processing an unscheduled card-on-file transaction.

Required if the merchant stores card-on-file payment information.
Boolean.

isStoredCredentials Indicates that the transaction was initiated by the customer using card-on-file payment information.

Required if the merchant stores card-on-file payment information.
Boolean.

subsequentAuthInformation Contains details for subsequent authorizations using stored payment information.

Required if the merchant stores card-on-file payment information.
originalNetworkTransId Required.
The network transaction ID returned in response to the original card-on-file transaction.

Store the networkTransId value received in the original card-on-file transaction response. Set the originalNetworkTransId to the original networkTransId value for all subsequent authorizations against the same card-on-file.
Alphanumeric string, 255 characters or fewer.

reason Required.
Describes the reason for the subsequent card-on-file transaction.

Use resubmission for resubmitting the original charge if declined, and if the customer has already received goods or services.

Use delayedCharge if there are supplemental charges after the original charge was submitted and the customer has received the goods or services.

Use reauthorization for new transactions submitted after the original transaction, for example, for split or delayed shipments of goods, or for extended services beyond those originally requested.

Use noShow for penalties after cancellation of services, for example, when a customer does not appear after making a reservation.
String. Either resubmission, delayedCharge, reauthorization, or noShow.

originalAuthAmount Required.
The original authorization amount.

Store the amount of the original card-on-file transaction response. Set the originalAuthAmount to the original amount value for all subsequent authorizations against the same card-on-file.
Decimal, up to 15 digits with a decimal point.

Required for Discover, Diners Club, JCB, and China Union Pay transactions.

Do not use currency symbols.

authorizationIndicator Indicates whether the authorization was a pre-authorization or final authorization.

Applicable to Mastercard only. Use pre for initial authorizations, for example, prior to tips. Use final for final authorizations, for example, including tips.
String.

Either pre or final.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value will be included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

transactionResponse
responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

authCode The authorization code granted by the card issuing bank for this transaction.

String, up to 6 characters.

avsResultCode Address Verification Service (AVS) response code.

String, 1 character.

One of the following:

A -- The street address matched, but the postal code did not.
B -- No address information was provided.
E -- The AVS check returned an error.
G -- The card was issued by a bank outside the U.S. and does not support AVS.
N -- Neither the street address nor postal code matched.
P -- AVS is not applicable for this transaction.
R -- Retry — AVS was unavailable or timed out.
S -- AVS is not supported by card issuer.
U -- Address information is unavailable.
W -- The US ZIP+4 code matches, but the street address does not.
X -- Both the street address and the US ZIP+4 code matched.
Y -- The street address and postal code matched.
Z -- The postal code matched, but the street address did not.

cvvResultCode Card code verification (CCV) response code.

String, 1 character.

One of the following:

M -- CVV matched.
N -- CVV did not match.
P -- CVV was not processed.
S -- CVV should have been present but was not indicated.
U -- The issuer was unable to process the CVV check.

cavvResultCode Cardholder authentication verification response code.

Important: Mastercard transactions always return a null result for this element. Consequently, transaction details for Mastercard transactions do not contain CAVV results.
String, 1 character.

One of the following:

Blank or not present -- CAVV not validated.
0 -- CAVV was not validated because erroneous data was submitted.
1 -- CAVV failed validation.
2 -- CAVV passed validation.
3 -- CAVV validation could not be performed; issuer attempt incomplete.
4 -- CAVV validation could not be performed; issuer system error.
5 -- Reserved for future use.
6 -- Reserved for future use.
7 -- CAVV failed validation, but the issuer is available. Valid for U.S.-issued card submitted to non-U.S acquirer.
8 -- CAVV passed validation and the issuer is available. Valid for U.S.-issued card submitted to non-U.S. acquirer.
9 -- CAVV failed validation and the issuer is unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
A -- CAVV passed validation but the issuer unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
B -- CAVV passed validation, information only, no liability shift.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Deprecated.

Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

Superseded by transHashSha2.
String.

accountNumber The masked card number or bank account number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

description Text explanation of the code for the result.

String.

errors This element contains one or more error elements.

error This element contains detailed information about any errors returned.

errorCode Error code returned.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

errorText Text description of error.

For a complete list of response codes, see the Response Code Tool.
String.

splitTenderPayments If the transaction was a partial authorization transaction, then the split tender payment details are contained in this element.

splitTenderPayment Contains information about one split tender transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

responseToCustomer The response reason code.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

authCode The authorization code granted by the card issuing bank for this transaction.

String, up to 6 characters.

accountNumber The masked card number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

requestedAmount Amount requested in original authorization.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

approvedAmount Amount approved.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

balanceOnCard Balance on the debit card or prepaid card.

Can be a positive or negative number. Has a value only if the current transaction is for a prepaid card.
Numeric string.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

transHashSha2 The SHA-512 hash returned in transaction responses, which you can use to confirm that the transaction response came from Authorize.net.

See the Transaction Hash Upgrade Guide<\/a> for details on how to use transHashSha2<\/code>.
String.

profileResponse Contains result of attempt to create a customer payment profile.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

customerProfileId The ID of the customer profile.

Numeric string.

customerPaymentProfileIdList Contains the Customer Payment Profile ID element

numericString Payment gateway assigned ID associated with the customer payment profile.

This is only included if the original transaction included a billing address.
Numeric string.

customerShippingProfileIdList Contains the Customer Shipping Profile ID element.

numericString Payment gateway assigned ID associated with the customer shipping profile.

This is only included if the original transaction included a shipping address.
Numeric string.

Charge a Tokenized Credit Card

Use this method to authorize and capture a payment using a tokenized credit card number issued by a certified token provider. The payment processor must support payment network tokenization, and you must pass in your request the token, the expiration date, and the cryptogram receied from the token provider.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function chargeTokenizedCreditCard(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var creditCard = new ApiContracts.CreditCardType();

    creditCard.setCardNumber('4242424242424242');

    creditCard.setExpirationDate('0822');

    // Set the token specific info

    creditCard.setIsPaymentToken(true);

    creditCard.setCryptogram('EjRWeJASNFZ4kBI0VniQEjRWeJA=');

​

    var paymentType = new ApiContracts.PaymentType();

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest Required.
This element is a container for transaction specific information.

transactionType Type of credit card transaction.

If the value submitted does not match a supported value, the transaction is rejected.
String.

Use authCaptureTransaction to authorize and automatically capture the transaction.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

currencyCode Required.
Currency of the transaction.

Use the ISO 4217 three-letter alphabetic code for the currency.Use the ISO 4217 three-letter alphabetic code for the currency.

Currently supported currencies are USD, CAD, GBP, DKK, NOK, PLN, SEK, EUR, AUD, and NZD.
String, three characters.

payment This element contains payment information.

creditCard Contains tokenized credit card information.

cardNumber Required.
The token issued by the token provider.

Use the token as decrypted from the cryptogram. Do not use the physical card's account number.
Numeric string, 13-16 digits.

expirationDate Required.
The token's expiration date.

Use the expiration date as decrypted from the cryptogram. Do not use the physical card's expiration date.
String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

isPaymentToken A flag to Indicate that the payment uses a payment network token.

Set to true if the cardNumber is a token.
Boolean.

Either true or false.

cryptogram Required.
The cryptogram received from the token provider.

Include the cryptogram to verify that the transaction is tokenized.
String.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

name The name is generated by the solution provider and provided to Authorize.net.

See the Solution ID Implementation Guide for details.
String, up to 255 characters.

terminalNumber The merchant's in-store terminal number. Can identify the cashiers or kiosks used.

Do not use your processor's terminal ID for this field.
String.

order Contains information about the order.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String, up to 20 characters.

description Description of the item purchased.

String, up to 255 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

tax Contains information about applicable taxes.

amount Amount of tax.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of tax.

String, up to 31 characters.

description Description of tax.

String, up to 255 characters.

duty Contains information about any duty applied.

amount Amount of duty.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of duty.

String, up to 31 characters.

description Description of duty.

String, up to 255 characters.

shipping Items in this element describe shipping charges applied.

amount Amount of the shipping charges.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of the shipping charges.

String, up to 31 characters.

description Description of the shipping charges.

String, up to 255 characters.

taxExempt Indicates whether or not order is exempt from tax.

Boolean.

Either true or false.

poNumber The merchant-assigned purchase order number.

If you use purchase order numbers, your solution should generate the purchase order number and send it with your transaction requests. Authorize.net does not generate purchase order numbers.
String, up to 25 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

customerIP Conditional.

The IPv4 address of the customer initiating the transaction. Defaults to 255.255.255.255 if not included in your request.

Required only when the merchant is using customer IP based AFDS filters.
String, up to 15 characters.

Use dot-decimal formatting.

cardholderAuthentication Important: This field is deprecated and should not be used.

Merchants using a third party cardholder authentication solution can submit the following authentication values with Visa and Mastercard transactions.

Invalid combinations of card type, authenticationIndicator, and cardholderAuthenticationValue will result in Response Reason Code 118.
authenticationIndicator Conditional.

Important: This field is deprecated and should not be used.

The Electronic Commerce Indicator (ECI) value for a Visa transaction, or the Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the ECI or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of authenticationIndicator will result in Response Reason Code 116.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

cardholderAuthenticationValue Conditional.

Important: This field is deprecated and should not be used.

The Cardholder Authentication Verification Value (CAVV) for a Visa transaction, or Accountholder Authentication Value (AVV)/ Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the CAVV, AAV, or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of cardholderAuthenticationValue will result in Response Reason Code 117.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

retail The retail element contains two elements: marketType and deviceType. If you submit the retail element, the marketType and deviceType elements are required.

marketType The market type for the transaction.

This element is required if you submit the retail element.
Numeric string.

Either 0 for e-commerce, 1 for MOTO, or 2 for retail. Defaults to 2.

deviceType The type of device submitting the retail transaction.

This element is required if you submit the retail element.
Numeric string.

One of the following:

1 -- unknown device type
2 -- unattended terminal
3 -- self-service terminal
4 -- electronic cash register
5 -- personal computer based terminal
7 -- wireless POS
8 -- website
9 -- dial terminal
10 -- Virtual Terminal

employeeId Merchant-assigned employee ID.

This field is required for the EVO processor, and is supported on the TSYS processor.
Numeric string, 4 digits. Defaults to 0000.

transactionSettings This element contains one or more setting elements.

setting Contains settingName and settingValue.

settingName Name of a specific setting to be modified for this transaction.

For a list of valid settingName values and their uses, please see the Transaction Settings section of the Payment Transactions page.
String.

One of the following:
allowPartialAuth
duplicateWindow
emailCustomer
headerEmailReceipt
footerEmailReceipt
recurringBilling

settingValue Indicates whether the specified setting is enabled or disabled.

For a list of permitted settingValue formats, please see the Transaction Settings section of the Payment Transactions page.
String.

Permitted values depend on the value of settingName.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

surcharge Used to record payment card surcharges that are passed along to customers. Contains an amount and a description child element.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
amount Amount of the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

description Describes the reason or details for the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
String, up to 255 characters.

tip The amount of the tip authorized by the cardholder.

The total transaction amount must include this value.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

processingOptions Contains details for additional transaction processing.

Required if the merchant stores card-on-file payment information.
isFirstRecurringPayment Indicates the initial zero-dollar authorization or the first recurring payment in a series of charges.

Required if the merchant stores card-on-file payment information.

Set recurringBilling to true if you set isFirstRecurringPayment.
Boolean.

isFirstSubsequentAuth Indicates the initial zero-dollar authorization or the first payment in a series of charges.

Required if the merchant stores card-on-file payment information.
Boolean.

isSubsequentAuth Indicates that the transaction is a follow-on transaction for an established customer.

Use in these situations:

    - When resubmitting declined transactions;
    - When resubmitting a transaction with an expired authorization;
    - When submitting delayed charges after completing the original payments;
    - When charging customer penalties for reservation no-shows; or
    - When processing an unscheduled card-on-file transaction.

Required if the merchant stores card-on-file payment information.
Boolean.

isStoredCredentials Indicates that the transaction was initiated by the customer using card-on-file payment information.

Required if the merchant stores card-on-file payment information.
Boolean.

subsequentAuthInformation Contains details for subsequent authorizations using stored payment information.

Required if the merchant stores card-on-file payment information.
originalNetworkTransId Required.
The network transaction ID returned in response to the original card-on-file transaction.

Store the networkTransId value received in the original card-on-file transaction response. Set the originalNetworkTransId to the original networkTransId value for all subsequent authorizations against the same card-on-file.
String, up to 255 characters.

reason Required.
Describes the reason for the subsequent card-on-file transaction.

Use resubmission for resubmitting the original charge if declined, and if the customer has already received goods or services.

Use delayedCharge if there are supplemental charges after the original charge was submitted and the customer has received the goods or services.

Use reauthorization for new transactions submitted after the original transaction, for example, for split or delayed shipments of goods, or for extended services beyond those originally requested.

Use noShow for penalties after cancellation of services, for example, when a customer does not appear after making a reservation.
String. Either resubmission, delayedCharge, reauthorization, or noShow.

originalAuthAmount Required.
The original authorization amount.

Store the amount of the original card-on-file transaction response. Set the originalAuthAmount to the original amount value for all subsequent authorizations against the same card-on-file.
Decimal, up to 15 digits with a decimal point.

Required for Discover, Diners Club, JCB, and China Union Pay transactions.

Do not use currency symbols.

authorizationIndicator Indicates whether the authorization was a pre-authorization or final authorization.

Applicable to Mastercard only. Use pre for initial authorizations, for example, prior to tips. Use final for final authorizations, for example, including tips.
String.

Either pre or final.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value will be included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

transactionResponse
responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

authCode The authorization code granted by the card issuing bank for this transaction.

String, up to 6 characters.

avsResultCode Address Verification Service (AVS) response code.

String, 1 character.

One of the following:

A -- The street address matched, but the postal code did not.
B -- No address information was provided.
E -- The AVS check returned an error.
G -- The card was issued by a bank outside the U.S. and does not support AVS.
N -- Neither the street address nor postal code matched.
P -- AVS is not applicable for this transaction.
R -- Retry — AVS was unavailable or timed out.
S -- AVS is not supported by card issuer.
U -- Address information is unavailable.
W -- The US ZIP+4 code matches, but the street address does not.
X -- Both the street address and the US ZIP+4 code matched.
Y -- The street address and postal code matched.
Z -- The postal code matched, but the street address did not.

cvvResultCode Card code verification (CCV) response code.

String, 1 character.

One of the following:

M -- CVV matched.
N -- CVV did not match.
P -- CVV was not processed.
S -- CVV should have been present but was not indicated.
U -- The issuer was unable to process the CVV check.

cavvResultCode Cardholder authentication verification response code.

Important: Mastercard transactions always return a null result for this element. Consequently, transaction details for Mastercard transactions do not contain CAVV results.
String, 1 character.

One of the following:

Blank or not present -- CAVV not validated.
0 -- CAVV was not validated because erroneous data was submitted.
1 -- CAVV failed validation.
2 -- CAVV passed validation.
3 -- CAVV validation could not be performed; issuer attempt incomplete.
4 -- CAVV validation could not be performed; issuer system error.
5 -- Reserved for future use.
6 -- Reserved for future use.
7 -- CAVV failed validation, but the issuer is available. Valid for U.S.-issued card submitted to non-U.S acquirer.
8 -- CAVV passed validation and the issuer is available. Valid for U.S.-issued card submitted to non-U.S. acquirer.
9 -- CAVV failed validation and the issuer is unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
A -- CAVV passed validation but the issuer unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
B -- CAVV passed validation, information only, no liability shift.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Deprecated.

Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

Superseded by transHashSha2.
String.

accountNumber The masked card number or bank account number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

description Text explanation of the code for the result.

String.

errors This element contains one or more error elements.

error This element contains detailed information about any errors returned.

errorCode Error code returned.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

errorText Text description of error.

For a complete list of response codes, see the Response Code Tool.
String.

splitTenderPayments If the transaction was a partial authorization transaction, then the split tender payment details are contained in this element.

splitTenderPayment Contains information about one split tender transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

responseToCustomer The response reason code.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

authCode The authorization code granted by the card issuing bank for this transaction.

String, up to 6 characters.

accountNumber The masked card number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

requestedAmount Amount requested in original authorization.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

approvedAmount Amount approved.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

balanceOnCard Balance on the debit card or prepaid card.

Can be a positive or negative number. Has a value only if the current transaction is for a prepaid card.
Numeric string.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

transHashSha2 The SHA-512 hash returned in transaction responses, which you can use to confirm that the transaction response came from Authorize.net.

See the Transaction Hash Upgrade Guide<\/a> for details on how to use transHashSha2<\/code>.
String.

Mobile In-App Transactions

Enables you to pass Accept Mobile, Apple Pay, or Google Pay payment data to Authorize.net. For more information about in-app payment transactions, see the Mobile In-App developer guide.
Create an Apple Pay Transaction

Use this function to create an Authorize.net payment transaction request using Apple Pay data in place of card data.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function createApplePayTransaction(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var opaqueData = new ApiContracts.OpaqueDataType();

    opaqueData.setDataDescriptor('COMMON.APPLE.INAPP.PAYMENT');

    opaqueData.setDataValue('eyJkYXRhIjoiQkRQTldTdE1tR2V3UVVXR2c0bzdFXC9qKzFjcTFUNzhxeVU4NGI2N2l0amNZSTh3UFlBT2hzaGpoWlBycWRVcjRYd1BNYmo0emNHTWR5KysxSDJWa1BPWStCT01GMjV1YjE5Y1g0bkN2a1hVVU9UakRsbEIxVGdTcjhKSFp4Z3A5ckNnc1NVZ2JCZ0tmNjBYS3V0WGY2YWpcL284WkliS25yS1E4U2gwb3VMQUtsb1VNbit2UHU0K0E3V0tycXJhdXo5SnZPUXA2dmhJcStIS2pVY1VOQ0lUUHlGaG1PRXRxK0grdzB2UmExQ0U2V2hGQk5uQ0hxenpXS2NrQlwvMG5xTFpSVFliRjBwK3Z5QmlWYVdIZWdoRVJmSHhSdGJ6cGVjelJQUHVGc2ZwSFZzNDhvUExDXC9rXC8xTU5kNDdrelwvcEhEY1JcL0R5NmFVTStsTmZvaWx5XC9RSk4rdFMzbTBIZk90SVNBUHFPbVhlbXZyNnhKQ2pDWmxDdXcwQzltWHpcL29iSHBvZnVJRVM4cjljcUdHc1VBUERwdzdnNjQybTRQendLRitIQnVZVW5lV0RCTlNEMnU2amJBRzMiLCJ2ZXJzaW9uIjoiRUNfdjEiLCJoZWFkZXIiOnsiYXBwbGljYXRpb25EYXRhIjoiOTRlZTA1OTMzNWU1ODdlNTAxY2M0YmY5MDYxM2UwODE0ZjAwYTdiMDhiYzdjNjQ4ZmQ4NjVhMmFmNmEyMmNjMiIsInRyYW5zYWN0aW9uSWQiOiJjMWNhZjVhZTcyZjAwMzlhODJiYWQ5MmI4MjgzNjM3MzRmODViZjJmOWNhZGYxOTNkMWJhZDlkZGNiNjBhNzk1IiwiZXBoZW1lcmFsUHVibGljS2V5IjoiTUlJQlN6Q0NBUU1HQnlxR1NNNDlBZ0V3Z2ZjQ0FRRXdMQVlIS29aSXpqMEJBUUloQVBcL1wvXC9cLzhBQUFBQkFBQUFBQUFBQUFBQUFBQUFcL1wvXC9cL1wvXC9cL1wvXC9cL1wvXC9cL1wvXC9cL01Gc0VJUFwvXC9cL1wvOEFBQUFCQUFBQUFBQUFBQUFBQUFBQVwvXC9cL1wvXC9cL1wvXC9cL1wvXC9cL1wvXC9cLzhCQ0JheGpYWXFqcVQ1N1BydlZWMm1JYThaUjBHc014VHNQWTd6ancrSjlKZ1N3TVZBTVNkTmdpRzV3U1RhbVo0NFJPZEpyZUJuMzZRQkVFRWF4ZlI4dUVzUWtmNHZPYmxZNlJBOG5jRGZZRXQ2ek9nOUtFNVJkaVl3cFpQNDBMaVwvaHBcL200N242MHA4RDU0V0s4NHpWMnN4WHM3THRrQm9ONzlSOVFJaEFQXC9cL1wvXC84QUFBQUFcL1wvXC9cL1wvXC9cL1wvXC9cLys4NXZxdHB4ZWVoUE81eXNMOFl5VlJBZ0VCQTBJQUJHbStnc2wwUFpGVFwva0RkVVNreHd5Zm84SnB3VFFRekJtOWxKSm5tVGw0REdVdkFENEdzZUdqXC9wc2hCWjBLM1RldXFEdFwvdERMYkUrOFwvbTB5Q21veHc9IiwicHVibGljS2V5SGFzaCI6IlwvYmI5Q05DMzZ1QmhlSEZQYm1vaEI3T28xT3NYMkora0pxdjQ4ek9WVmlRPSJ9LCJzaWduYXR1cmUiOiJNSUlEUWdZSktvWklodmNOQVFjQ29JSURNekNDQXk4Q0FRRXhDekFKQmdVckRnTUNHZ1VBTUFzR0NTcUdTSWIzRFFFSEFhQ0NBaXN3Z2dJbk1JSUJsS0FEQWdFQ0FoQmNsK1BmMytVNHBrMTNuVkQ5bndRUU1Ba0dCU3NPQXdJZEJRQXdKekVsTUNNR0ExVUVBeDRjQUdNQWFBQnRBR0VBYVFCQUFIWUFhUUJ6QUdFQUxnQmpBRzhBYlRBZUZ3MHhOREF4TURFd05qQXdNREJhRncweU5EQXhNREV3TmpBd01EQmFNQ2N4SlRBakJnTlZCQU1lSEFCakFHZ0FiUUJoQUdrQVFBQjJBR2tBY3dCaEFDNEFZd0J2QUcwd2daOHdEUVlKS29aSWh2Y05BUUVCQlFBRGdZMEFNSUdKQW9HQkFOQzgra2d0Z212V0YxT3pqZ0ROcmpURUJSdW9cLzVNS3ZsTTE0NnBBZjdHeDQxYmxFOXc0ZklYSkFEN0ZmTzdRS2pJWFlOdDM5ckx5eTd4RHdiXC81SWtaTTYwVFoyaUkxcGo1NVVjOGZkNGZ6T3BrM2Z0WmFRR1hOTFlwdEcxZDlWN0lTODJPdXA5TU1vMUJQVnJYVFBITmNzTTk5RVBVblBxZGJlR2M4N20wckFnTUJBQUdqWERCYU1GZ0dBMVVkQVFSUk1FK0FFSFpXUHJXdEpkN1laNDMxaENnN1lGU2hLVEFuTVNVd0l3WURWUVFESGh3QVl3Qm9BRzBBWVFCcEFFQUFkZ0JwQUhNQVlRQXVBR01BYndCdGdoQmNsK1BmMytVNHBrMTNuVkQ5bndRUU1Ba0dCU3NPQXdJZEJRQURnWUVBYlVLWUNrdUlLUzlRUTJtRmNNWVJFSW0ybCtYZzhcL0pYditHQlZRSmtPS29zY1k0aU5ERkFcL2JRbG9nZjlMTFU4NFRId05SbnN2VjNQcnY3UlRZODFncTBkdEM4elljQWFBa0NISUkzeXFNbko0QU91NkVPVzlrSmsyMzJnU0U3V2xDdEhiZkxTS2Z1U2dRWDhLWFFZdVpMazJScjYzTjhBcFhzWHdCTDNjSjB4Z2VBd2dkMENBUUV3T3pBbk1TVXdJd1lEVlFRREhod0FZd0JvQUcwQVlRQnBBRUFBZGdCcEFITUFZUUF1QUdNQWJ3QnRBaEJjbCtQZjMrVTRwazEzblZEOW53UVFNQWtHQlNzT0F3SWFCUUF3RFFZSktvWklodmNOQVFFQkJRQUVnWUJhSzNFbE9zdGJIOFdvb3NlREFCZitKZ1wvMTI5SmNJYXdtN2M2VnhuN1phc05iQXEzdEF0OFB0eSt1UUNnc3NYcVprTEE3a3oyR3pNb2xOdHY5d1ltdTlVandhcjFQSFlTK0JcL29Hbm96NTkxd2phZ1hXUnowbk1vNXkzTzFLelgwZDhDUkhBVmE4OFNyVjFhNUpJaVJldjNvU3RJcXd2NXh1WmxkYWc2VHI4dz09In0=');

​

    var payment = new ApiContracts.PaymentType();

    payment.setOpaqueData(opaqueData);

​

    var transactionRequest = new ApiContracts.TransactionRequestType();

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest Required.
This element is a container for transaction specific information.

transactionType Type of credit card transaction.

String.

Use authCaptureTransaction to authorize and automatically capture the transaction. Use authOnlyTransaction to authorize the transaction for capture at a later time.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

payment This element contains payment information.

opaqueData Required.
Contains dataDescriptor and dataValue.

dataDescriptor Required.
Specifies how the request should be processed.

The value of dataDescriptor is based on the source of the value of dataValue.
String, 128 characters.

Use COMMON.APPLE.INAPP.PAYMENT for Apple Pay transactions.

dataValue Required.
Base64 encoded data that contains encrypted payment data known as the payment nonce. The nonce is valid for 15 minutes.

The payment gateway expects the encrypted payment data and meta data for the encryption keys.
String, 8192 characters.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

name The name is generated by the solution provider and provided to Authorize.net.

See the Solution ID Implementation Guide for details.
String, up to 255 characters.

order Contains information about the order.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String, up to 20 characters.

description Description of the item purchased.

String, up to 255 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

tax Contains information about applicable taxes.

amount Amount of tax.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of tax.

String, up to 31 characters.

description Description of tax.

String, up to 255 characters.

duty Contains information about any duty applied.

amount Amount of duty.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of duty.

String, up to 31 characters.

description Description of duty.

String, up to 255 characters.

shipping Items in this element describe shipping charges applied.

amount Amount of the shipping charges.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of the shipping charges.

String, up to 31 characters.

description Description of the shipping charges.

String, up to 255 characters.

taxExempt Indicates whether or not order is exempt from tax.

Boolean.

Either true or false.

poNumber The merchant-assigned purchase order number.

If you use purchase order numbers, your solution should generate the purchase order number and send it with your transaction requests. Authorize.net does not generate purchase order numbers.
String, up to 25 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

customerIP Conditional.

The IPv4 address of the customer initiating the transaction. Defaults to 255.255.255.255 if not included in your request.

Required only when the merchant is using customer IP based AFDS filters.
String, up to 15 characters.

Use dot-decimal formatting.

retail The retail element contains two elements: marketType and deviceType. If you submit the retail element, the marketType and deviceType elements are required.

marketType The market type for the transaction.

This element is required if you submit the retail element. For Apple Pay transactions, set marketType to 0.
Numeric string.

Either 0 for e-commerce, 1 for MOTO, or 2 for retail. Defaults to 2.

deviceType The type of device submitting the retail transaction.

This element is required if you submit the retail element.
Numeric string.

One of the following:

1 -- unknown device type
2 -- unattended terminal
3 -- self-service terminal
4 -- electronic cash register
5 -- personal computer based terminal
7 -- wireless POS
8 -- website
9 -- dial terminal
10 -- Virtual Terminal

transactionSettings This element contains one or more setting elements.

setting Contains settingName and settingValue.

settingName Name of a specific setting to be modified for this transaction.

For a list of valid settingName values and their uses, please see the Transaction Settings section of the Payment Transactions page.
String.

One of the following:
allowPartialAuth
duplicateWindow
emailCustomer
headerEmailReceipt
footerEmailReceipt
recurringBilling

settingValue Indicates whether the specified setting is enabled or disabled.

For a list of permitted settingValue formats, please see the Transaction Settings section of the Payment Transactions page.
String.

Permitted values depend on the value of settingName.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

authorizationIndicator Indicates whether the authorization is for the final transaction amount. Applies to Mastercard transactions only.

Use final if the amount of the transaction is final.

Use pre if the amount of the transaction is not final.
String. Either pre or final.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

transactionResponse This element contains the transaction response, including AVS, CVV, and CAVV details.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

authCode The authorization code granted by the card issuing bank for this transaction.

String, 6 characters.

avsResultCode Address Verification Service (AVS) response code.

String, 1 character.

One of the following:

A -- The street address matched, but the postal code did not.
B -- No address information was provided.
E -- The AVS check returned an error.
G -- The card was issued by a bank outside the U.S. and does not support AVS.
N -- Neither the street address nor postal code matched.
P -- AVS is not applicable for this transaction.
R -- Retry — AVS was unavailable or timed out.
S -- AVS is not supported by card issuer.
U -- Address information is unavailable.
W -- The US ZIP+4 code matches, but the street address does not.
X -- Both the street address and the US ZIP+4 code matched.
Y -- The street address and postal code matched.
Z -- The postal code matched, but the street address did not.

cvvResultCode Card code verification (CCV) response code.

String, 1 character.

One of the following:

M -- CVV matched.
N -- CVV did not match.
P -- CVV was not processed.
S -- CVV should have been present but was not indicated.
U -- The issuer was unable to process the CVV check.

cavvResultCode Cardholder authentication verification response code.

Important: Mastercard transactions always return a null result for this element. Consequently, transaction details for Mastercard transactions do not contain CAVV results.
String, 1 character.

One of the following:

Blank or not present -- CAVV not validated.
0 -- CAVV was not validated because erroneous data was submitted.
1 -- CAVV failed validation.
2 -- CAVV passed validation.
3 -- CAVV validation could not be performed; issuer attempt incomplete.
4 -- CAVV validation could not be performed; issuer system error.
5 -- Reserved for future use.
6 -- Reserved for future use.
7 -- CAVV failed validation, but the issuer is available. Valid for U.S.-issued card submitted to non-U.S acquirer.
8 -- CAVV passed validation and the issuer is available. Valid for U.S.-issued card submitted to non-U.S. acquirer.
9 -- CAVV failed validation and the issuer is unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
A -- CAVV passed validation but the issuer unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
B -- CAVV passed validation, information only, no liability shift.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountNumber The masked card number or bank account number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

messages This element contains one or more message elements.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

description Text explanation of the code for the result.

String.

errors This element contains one or more error elements.

error This element contains detailed information about any errors returned.

errorCode Error code returned.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

errorText Text description of error.

For a complete list of response codes, see the Response Code Tool.
String.

splitTenderPayments If the transaction was a partial authorization transaction, then the split tender payment details are contained in this element.

splitTenderPayment Contains information about one split tender transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

responseToCustomer The response reason code.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

authCode The authorization code granted by the card issuing bank for this transaction.

String, 6 characters.

accountNumber The masked card number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

requestedAmount Amount requested in original authorization.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

approvedAmount Amount approved.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

balanceOnCard Balance on the debit card or prepaid card.

Can be a positive or negative number. Has a value only if the current transaction is for a prepaid card.
Numeric string.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

Create a Google Pay Transaction

Use this function to create an Authorize.net payment transaction request using Google Pay data in place of card data.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function createGooglePayTransaction(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var opaqueData = new ApiContracts.OpaqueDataType();

    opaqueData.setDataDescriptor('COMMON.GOOGLE.INAPP.PAYMENT');

    opaqueData.setDataValue('1234567890ABCDEF1111AAAA2222BBBB3333CCCC4444DDDD5555EEEE6666FFFF7777888899990000');

​

    var payment = new ApiContracts.PaymentType();

    payment.setOpaqueData(opaqueData);

​

    var lineItem = new ApiContracts.LineItemType();

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest Required.
This element is a container for transaction specific information.

transactionType Type of credit card transaction.

String.

Use authCaptureTransaction to authorize and automatically capture the transaction. Use authOnlyTransaction to authorize the transaction for capture at a later time.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

payment This element contains payment information.

opaqueData Required.
Contains dataDescriptor and dataValue.

dataDescriptor Required.
Specifies how the request should be processed.

The value of dataDescriptor is based on the source of the value of dataValue.
String, 128 characters.

Use COMMON.GOOGLE.INAPP.PAYMENT for Google Pay transactions.

dataValue Required.
Base64 encoded data that contains encrypted payment data known as the payment nonce. The nonce is valid for 15 minutes.

The payment gateway expects the encrypted payment data and meta data for the encryption keys.
String, 8192 characters.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

name The name is generated by the solution provider and provided to Authorize.net.

See the Solution ID Implementation Guide for details.
String, up to 255 characters.

order Contains information about the order.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String, up to 20 characters.

description Description of the item purchased.

String, up to 255 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

tax Contains information about applicable taxes.

amount Amount of tax.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of tax.

String, up to 31 characters.

description Description of tax.

String, up to 255 characters.

duty Contains information about any duty applied.

amount Amount of duty.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of duty.

String, up to 31 characters.

description Description of duty.

String, up to 255 characters.

shipping Items in this element describe shipping charges applied.

amount Amount of the shipping charges.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of the shipping charges.

String, up to 31 characters.

description Description of the shipping charges.

String, up to 255 characters.

taxExempt Indicates whether or not order is exempt from tax.

Boolean.

Either true or false.

poNumber The merchant-assigned purchase order number.

If you use purchase order numbers, your solution should generate the purchase order number and send it with your transaction requests. Authorize.net does not generate purchase order numbers.
String, up to 25 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

customerIP Conditional.

The IPv4 address of the customer initiating the transaction. Defaults to 255.255.255.255 if not included in your request.

Required only when the merchant is using customer IP based AFDS filters.
String, up to 15 characters.

Use dot-decimal formatting.

transactionSettings This element contains one or more setting elements.

setting Contains settingName and settingValue.

settingName Name of a specific setting to be modified for this transaction.

For a list of valid settingName values and their uses, please see the Transaction Settings section of the Payment Transactions page.
String.

One of the following:
allowPartialAuth
duplicateWindow
emailCustomer
headerEmailReceipt
footerEmailReceipt
recurringBilling

settingValue Indicates whether the specified setting is enabled or disabled.

For a list of permitted settingValue formats, please see the Transaction Settings section of the Payment Transactions page.
String.

Permitted values depend on the value of settingName.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

authorizationIndicator Indicates whether the authorization is for the final transaction amount. Applies to Mastercard transactions only.

Use final if the amount of the transaction is final.

Use pre if the amount of the transaction is not final.
String. Either pre or final.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

transactionResponse
responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

authCode The authorization code granted by the card issuing bank for this transaction.

String, 6 characters.

avsResultCode Address Verification Service (AVS) response code.

String, 1 character.

One of the following:

A -- The street address matched, but the postal code did not.
B -- No address information was provided.
E -- The AVS check returned an error.
G -- The card was issued by a bank outside the U.S. and does not support AVS.
N -- Neither the street address nor postal code matched.
P -- AVS is not applicable for this transaction.
R -- Retry — AVS was unavailable or timed out.
S -- AVS is not supported by card issuer.
U -- Address information is unavailable.
W -- The US ZIP+4 code matches, but the street address does not.
X -- Both the street address and the US ZIP+4 code matched.
Y -- The street address and postal code matched.
Z -- The postal code matched, but the street address did not.

cvvResultCode Card code verification (CCV) response code.

String, 1 character.

One of the following:

M -- CVV matched.
N -- CVV did not match.
P -- CVV was not processed.
S -- CVV should have been present but was not indicated.
U -- The issuer was unable to process the CVV check.

cavvResultCode Cardholder authentication verification response code.

Important: Mastercard transactions always return a null result for this element. Consequently, transaction details for Mastercard transactions do not contain CAVV results.
String, 1 character.

One of the following:

Blank or not present -- CAVV not validated.
0 -- CAVV was not validated because erroneous data was submitted.
1 -- CAVV failed validation.
2 -- CAVV passed validation.
3 -- CAVV validation could not be performed; issuer attempt incomplete.
4 -- CAVV validation could not be performed; issuer system error.
5 -- Reserved for future use.
6 -- Reserved for future use.
7 -- CAVV failed validation, but the issuer is available. Valid for U.S.-issued card submitted to non-U.S acquirer.
8 -- CAVV passed validation and the issuer is available. Valid for U.S.-issued card submitted to non-U.S. acquirer.
9 -- CAVV failed validation and the issuer is unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
A -- CAVV passed validation but the issuer unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
B -- CAVV passed validation, information only, no liability shift.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountNumber The masked card number or bank account number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

messages This element contains one or more message elements.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

description Text explanation of the code for the result.

String.

errors This element contains one or more error elements.

error This element contains detailed information about any errors returned.

errorCode Error code returned.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

errorText Text description of error.

For a complete list of response codes, see the Response Code Tool.
String.

splitTenderPayments If the transaction was a partial authorization transaction, then the split tender payment details are contained in this element.

splitTenderPayment Contains information about one split tender transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

responseToCustomer The response reason code.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

authCode The authorization code granted by the card issuing bank for this transaction.

String, 6 characters.

accountNumber The masked card number used for the transaction.

String.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

requestedAmount Amount requested in original authorization.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

approvedAmount Amount approved.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

balanceOnCard Balance on the debit card or prepaid card.

Can be a positive or negative number. Has a value only if the current transaction is for a prepaid card.
Numeric string.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

PayPal Express Checkout

Use the following methods to process PayPal transactions. You must first sign up for the service in the Merchant Interface. The sign-up page is at Accounts > Digital Payment Solutions.

The following calls are createTransactionRequest calls with PayPal-specific fields. For more information about our implementation of PayPal Checkout Express, see the PayPal developer guide.

Important: Billing and shipping request fields are used only if the customer wants to use an address different than the one stored in their PayPal billing and shipping profiles. If you provide these fields, PayPal will validate the address to ensure that it is a valid address. The transaction is declined if PayPal’s validation fails. Billing and shipping fields are present in the Authorization and Authorization and Capture request calls.
Authorization Only

An Authorization Only request notifies PayPal that an authorization has been initiated but does not complete the authorization. It returns a secure URL with a token appended to it. The purpose of this token is to identify the transaction when the customer is redirected to PayPal.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function authorizationOnly(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var payPal = new ApiContracts.PayPalType();

    payPal.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPal.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setPayPal(payPal);

​

    var transactionRequestType = new ApiContracts.TransactionRequestType();

    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);

    transactionRequestType.setPayment(paymentType);

    transactionRequestType.setAmount(utils.getRandomAmount());

​

    var createRequest = new ApiContracts.CreateTransactionRequest();

    createRequest.setMerchantAuthentication(merchantAuthenticationType);

    createRequest.setTransactionRequest(transactionRequestType);

​

    console.log(JSON.stringify(createRequest.getJSON(), null, 2));



    var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

​

    ctrl.execute(function(){

​

        var apiResponse = ctrl.getResponse();

​

        var response = new ApiContracts.CreateTransactionResponse(apiResponse);

​

        console.log(JSON.stringify(response, null, 2));

​

        if(response != null){

            if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){

                if(response.getTransactionResponse().getMessages() != null){

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest This element is a container for transaction specific information.

transactionType Type of credit card transaction.

String.

Use authOnlyTransaction to authorize the transaction for capture at a later time.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.

currencyCode Required.
Currency of the transaction.

Use the ISO 4217 three-letter alphabetic code for the currency.

Currently supported currencies are USD, CAD, GBP, EUR, and AUD.
String, three characters.

payment This element contains payment information.

payPal This element contains PayPal order information.

successURL URL to which the customer's browser returns when the customer chooses to pay with PayPal.

String.

A valid and well-formed URL.

For example, https://example.com/Success/TC25262
cancelURL URL to which the customer's browser returns when the customer chooses not to pay with PayPal.

String.

A valid and well-formed URL.

For example, https://example.com/Cancel/TC25262
payPalLc Locale of pages displayed by PayPal during Express Checkout.

Defaults to US.
String.

One of:

AU -- Australia
CAN -- Canada
DE -- Germany
ES -- Spain
FR -- France
GB -- United Kingdom
IT -- Italy
US -- United States

paypalHdrImg URL for the image that will be displayed in the upper left area of the payment page.

String.

A valid and well-formed URL.

For example, https://example.com/images/logo.gif
PaypalPayflowcolor Background color for the payment page.

A valid hexadecimal RGB code.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

For example, 5.4321.

unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

For example, 5.4321.

taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

shipTo This element contains shipping information.

firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.Net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactionResponse Contains transaction response information.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

rawResponseCode Contains the specific error code returned by PayPal.

This field is set to 0 for an approved transaction.
transId The Authorize.Net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountType The account type used for the transaction.

String.

The value for PayPal transactions is payPal.

messages This element contains one or more message elements.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
description Text explanation of the code for the result.

String.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.Net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

secureAcceptance This element contains Secure Acceptance information.

secureAcceptanceUrl Contains the URL to a payment form that can accept payment details in a secure fashion. You should redirect the customer's browser to this URL, so that the customer can log in, provide payment details, and initiate payment processing. This URL has a token appended to it that is valid for up to three hours.

In Test Mode, the URL will be returned with an invalid token of 0.

String.

A valid and well-formed URL.

For example, http://www.paypal.com/cgibin/webscr?cmd=_express-checkout&token=0.
Authorization and Capture

This type of transaction is the most common and is the default payment gateway transaction type. Like the Authorization Only request, it notifies PayPal that an Authorization and Capture transaction has been initiated, but does not complete the request. It also returns a secure URL with a token appended to it. The purpose of this token is to identify the transaction when the customer is redirected to PayPal.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function authorizationAndCapture(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var payPalType = new ApiContracts.PayPalType();

    payPalType.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPalType.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPalType.setPayerID('B2LA5T27DMX7G');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setPayPal(payPalType);

​

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest This element is a container for transaction specific information.

transactionType Type of credit card transaction.

String.

Use authCaptureTransaction to authorize and automatically capture the transaction.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.

currencyCode Required.
Currency of the transaction.

Use the ISO 4217 three-letter alphabetic code for the currency.

Currently supported currencies are USD, CAD, GBP, EUR, and AUD.
String, three characters.

payment This element contains payment information.

payPal This element contains PayPal order information.

successURL URL to which the customer's browser returns when the customer chooses to pay with PayPal.

String.

A valid and well-formed URL.

For example, https://example.com/Success/TC25262
cancelURL URL to which the customer's browser returns when the customer chooses not to pay with PayPal.

String.

A valid and well-formed URL.

For example, https://example.com/Cancel/TC25262
payPalLc Locale of pages displayed by PayPal during Express Checkout.

Defaults to US.
String.

One of:

AU -- Australia
CAN -- Canada
DE -- Germany
ES -- Spain
FR -- France
GB -- United Kingdom
IT -- Italy
US -- United States

paypalHdrImg URL for the image that will be displayed in the upper left area of the payment page.

String.

A valid and well-formed URL.

For example, https://example.com/images/logo.gif
PaypalPayflowcolor Background color for the payment page.

A valid hexadecimal RGB code.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

shipTo This element contains shipping information.

firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.Net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactionResponse Contains transaction response information.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

rawResponseCode Contains the specific error code returned by PayPal.

This field is set to 0 for an approved transaction.
transId The Authorize.Net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountType The account type used for the transaction.

String.

The value for PayPal transactions is payPal.

messages This element contains one or more message elements.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
description Text explanation of the code for the result.

String.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.Net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

secureAcceptance This element is a container.

secureAcceptanceUrl Contains the URL to a payment form that can accept payment details in a secure fashion. You should redirect the customer's browser to this URL, so that the customer can log in, provide payment details, and initiate payment processing. This URL has a token appended to it that is valid for up to three hours.

In Test Mode, the URL will be returned with an invalid token of 0.

String.

A valid and well-formed URL.

For example, http://www.paypal.com/cgibin/webscr?cmd=_express-checkout&token=0.
Get Details

A Get Details transaction returns customer’s PayPal Payer ID and shipping information. Get Details can be called at any time and is most useful after the customer has approved the payment at PayPal.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var constants = require('../constants.js');

​

function getDetails(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var payPal = new ApiContracts.PayPalType();

    payPal.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPal.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setPayPal(payPal);

​

    var transactionRequestType = new ApiContracts.TransactionRequestType();

    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.GETDETAILSTRANSACTION);

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest This element is a container for transaction specific information.

transactionType

String.

Use getDetailsTransaction to authorize and automatically capture the transaction.

refTransId The ID of the original transaction from which you are pulling the Payer ID and shipping information.

Numeric string.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactionResponse The overall status of the transaction.
rawResponseCode Contains the specific error code returned by PayPal.

This field is set to 0 for an approved transaction.
transId The Authorize.Net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountType The account type used for the transaction.

String.

The value for PayPal transactions is payPal.

messages This element contains one or more message elements.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
description Text explanation of the code for the result.

String.

shipTo This element contains shipping information.

firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

secureAcceptance Contains information about secure acceptance.

PayerID Contains the Payer ID of the customer, returned by PayPal. This is returned only if the customer has visited the PayPal payment form using the URL returned in the SecureAcceptanceUrl field of the authOnlyTransaction response, and logged in. Otherwise, this field will not be returned.

String.

Authorization Only, Continued

This request, if successful, actually authorizes the transaction but does not capture it.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function authorizationOnlyContinued(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var payPalType = new ApiContracts.PayPalType();

    payPalType.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPalType.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPalType.setPayerID('B2LA5T27DMX7G');



    var paymentType = new ApiContracts.PaymentType();

    paymentType.setPayPal(payPalType);

​

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest This element is a container for transaction specific information.

transactionType
String.

Use authOnlyContinueTransaction to authorize and automatically capture the transaction.

amount Optional. Updated amount of the transaction. This is the total amount and must include tax, shipping, tips, and any other charges.

Decimal, up to 15 digits with a decimal point. Do not use currency symbols. For example, 8.95

currencyCode Required.
Currency of the transaction.

Use the ISO 4217 three-letter alphabetic code for the currency.

Currently supported currencies are USD, CAD, GBP, EUR, and AUD.
String, three characters.

payment This element contains payment information.

payPal This element is a container for PayPal information.

payerID The payerID value returned in the GetDetailsTransaction response, or the value passed to the merchant's success/cancel URL server by PayPal as a web parameter

refTransId The value of transId returned from the original authOnlyTransaction call.

Numeric string.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

Prior Authorization Capture

This transaction type is used to capture an Authorization Only, Continued transaction that was successfully authorized through the payment gateway.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function priorAuthorizationCapture(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var payPalType = new ApiContracts.PayPalType();

    payPalType.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPalType.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');



    var paymentType = new ApiContracts.PaymentType();

    paymentType.setPayPal(payPalType);

​

    var txnRequest = new ApiContracts.TransactionRequestType();

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest This element is a container for transaction specific information.

transactionType Type of credit card transaction.

String.

Use priorAuthCaptureTransaction to capture a previous authOnlyTransaction transaction request.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.

currencyCode Required.
Currency of the transaction.

Use the ISO 4217 three-letter alphabetic code for the currency.

Currently supported currencies are USD, CAD, GBP, EUR, and AUD.
String, three characters.

payment This element contains payment information.

payPal This element contains PayPal order information.

successURL URL to which the customer's browser returns when the customer chooses to pay with PayPal.

String.

A valid and well-formed URL.

For example, https://example.com/Success/TC25262
cancelURL URL to which the customer's browser returns when the customer chooses not to pay with PayPal.

String.

A valid and well-formed URL.

For example, https://example.com/Cancel/TC25262
payPalLc Locale of pages displayed by PayPal during Express Checkout.

Defaults to US.
String.

One of:

AU -- Australia
CAN -- Canada
DE -- Germany
ES -- Spain
FR -- France
GB -- United Kingdom
IT -- Italy
US -- United States

paypalHdrImg URL for the image that will be displayed in the upper left area of the payment page.

String.

A valid and well-formed URL.

For example, https://example.com/images/logo.gif
PaypalPayflowcolor Background color for the payment page.

A valid hexadecimal RGB code.

shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.Net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

refTransID The value of transId returned from the original authOnlyTransaction call.

Numeric string.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactionResponse Contains information about a specific transaction.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

rawResponseCode Contains the specific error code returned by PayPal. This field is set to 0 for an approved transaction.

transId The Authorize.Net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountType The account type used for the transaction.

String.

The value for PayPal transactions is payPal.

messages This element contains one or more message elements.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
description Text explanation of the code for the result.

String.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.Net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.Net will not store this value.
String.

Authorization and Capture, Continued

This request actually authorizes and captures the transaction.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function authorizationAndCaptureContinued(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var payPalType = new ApiContracts.PayPalType();

    payPalType.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPalType.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPalType.setPayerID('B2LA5T27DMX7G');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setPayPal(payPalType);

​

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest This element is a container for transaction specific information.

transactionType The transaction type.

String.

Use authCaptureContinueTransaction to complete the original authCaptureTransaction request.

amount Optional. Updated amount of the transaction. This is the total amount and must include tax, shipping, tips, and any other charges.

Decimal, up to 15 digits with a decimal point. Do not use currency symbols. For example, 8.95

currencyCode Required.
Currency of the transaction.

Use the ISO 4217 three-letter alphabetic code for the currency.

Currently supported currencies are USD, CAD, GBP, EUR, and AUD.
String, three characters.

payment This element contains payment information.

payPal This element is a container for PayPal information.

payerID The payer identification value returned in the GetDetailsTransaction response, or the value passed to the merchant's success/cancel URL server by PayPal as a web parameter

refTransId The value of transId returned from the original authOnlyTransaction call.

Numeric string.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

transactionResponse Contains transaction response information.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

rawResponseCode Contains the specific error code returned by PayPal.

This field is set to 0 for an approved transaction.
transId The Authorize.Net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountType The account type used for the transaction.

String.

The value for PayPal transactions is payPal.

messages This element contains one or more message elements.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

description Text explanation of the code for the result.

String.

secureAcceptance This element is a container.

secureAcceptanceUrl Contains the URL to a payment form that can accept payment details in a secure fashion. You should redirect the customer's browser to this URL, so that the customer can log in, provide payment details, and initiate payment processing. This URL has a token appended to it that is valid for up to three hours.

In Test Mode, the URL will be returned with an invalid token of 0.

String.

A valid and well-formed URL.

Void

This transaction type can be used to cancel an authorization that has not yet been captured. Void can be used only in the following sequence: Authorization Only > Authorization Only, Continued > Void.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var constants = require('../constants.js');

​

function paypalVoid(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var payPalType = new ApiContracts.PayPalType();

    payPalType.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPalType.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setPayPal(payPalType);

​

    var txnRequest = new ApiContracts.TransactionRequestType();

    txnRequest.setTransactionType(ApiContracts.TransactionTypeEnum.VOIDTRANSACTION);

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest This element is a container for transaction specific information.

transactionType Type of credit card transaction.

String.

Use voidTransaction to void a transaction prior to capture.

refTransID The value of transId returned from the original authOnlyTransaction call.

Numeric string.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactionResponse Contains transaction response information.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

rawResponseCode Contains the specific error code returned by PayPal.

This field is set to 0 for an approved transaction.
transId The Authorize.Net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountType The account type used for the transaction.

String.

The value for PayPal transactions is payPal.

messages This element contains one or more message elements.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
description Text explanation of the code for the result.

String.

Credit

This transaction type is used to refund a customer for a transaction that was originally processed and successfully settled through the payment gateway. Credits do not occur until after your transactions have been settled on our system, which happens after the cutoff time.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function credit(transactionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var payPalType = new ApiContracts.PayPalType();

    payPalType.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

    payPalType.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');

​

    var paymentType = new ApiContracts.PaymentType();

    paymentType.setPayPal(payPalType);

​

    var txnRequest = new ApiContracts.TransactionRequestType();

Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest This element is a container for transaction specific information.

transactionType Type of transaction.

String.

Use refundTransaction to initiate a refund against a previously settled transaction.

refTransID The value of transId that was returned from the original authOnlyTransaction call.

Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactionResponse Contains transaction response information.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

rawResponseCode Contains the specific error code returned by PayPal.

This field is set to 0 for an approved transaction.
transId The Authorize.Net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountType The account type used for the transaction.

String.

The value for PayPal transactions is payPal.

messages This element contains one or more message elements.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
description Text explanation of the code for the result.

String.

Fraud Management

You can use this feature of the Authorize.net API to access suspicious transactions and then approve or decline. For more information about fraud management, see the Payment Transactions developer guide.
Get Held Transaction List

Use this function to get data for suspicious transactions. The function will return data for up to 1000 of the most recent transactions in a single request. Paging options can be sent to limit the result set or to retrieve additional transactions beyond the 1000 transaction limit. You can add the sorting and paging options shown below to customize the result set.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var constants = require('../constants.js');

​

function getHeldTransactionList(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var getRequest = new ApiContracts.GetUnsettledTransactionListRequest();

​

    var paging = new ApiContracts.Paging();

    paging.setLimit(10);

    paging.setOffset(1);

​

    var sorting = new ApiContracts.TransactionListSorting();

    sorting.setOrderBy(ApiContracts.TransactionListOrderFieldEnum.ID);

    sorting.setOrderDescending(true);

Request Field Description

getUnsettledTransactionListRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

status Required.
String.

Use pendingApproval to request transactions held for merchant approval.

sorting Contains sorting information.

orderBy Order of transactions in response.

String.

Use id to sort by transaction ID. Use submitTimeUTC to sort by transaction submission time, in UTC.

orderDescending Sort the transactions in descending order.

Boolean.

Either true or false.

paging Contains paging information.

limit The number of transactions per page.

You can request up to 1000 transactions per page of results.
Decimal, between 1 and 1000.

offset The number of the page to return results from.

For example, if you use a limit of 100, setting offset to 1 will return the first 100 transactions, setting offset to 2 will return the second 100 transactions, and so forth.
Decimal, between 1 and 100000.

Response Field Description

getUnsettledTransactionListResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactions Contains information about all transactions.

transaction Contains information about one transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

submitTimeUTC Date and time the transaction was submitted, expressed in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

submitTimeLocal Date and time the transaction was submitted, in the merchant's time zone.

This element uses the merchant's time zone as configured in the Merchant Interface. If unconfigured, defaults to Mountain Time (UTC-7).
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

transactionStatus The status of the transaction.

String.

One of:
authorizedPendingCapture
capturedPendingSettlement
communicationError
refundSettledSuccessfully
refundPendingSettlement
approvedReview
declined
couldNotVoid
expired
generalError
failedReview
settledSuccessfully
settlementError
underReview
voided
FDSPendingReview
FDSAuthorizedPendingReview
returnedItem

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String. 20-character maximum.

firstName Conditional.

First name associated with customer’s billing address.

String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

String, up to 50 characters.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

accountNumber The masked card number or bank account number used for the transaction.

String.

For example, XXXX1234.
settleAmount The amount that was submitted for settlement.

Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
hasReturnedItems Boolean.

Either true or false.

Indicates that this transaction contains returned eCheck.Net transactions. More detailed information can be seen by calling getTransactionDetailsResponse for the transaction.
subscription Contains subscription information.

id The subscription ID.

Numeric string.

payNum Identifies the number of this transaction, in terms of how many transactions have been submitted for this subscription.

For example, the third transaction processed for this subscription will return payNum set to 3.
Numeric string, between 1 and 999.

marketType The market type for the transaction.

String.

Either eCommerce, MOTO, or Retail

product Indicates whether the card was present for the transaction.

String.

Either Card Not Present or Card Present.

mobileDeviceId The unique identifier of the mobile device.

String, up to 60 characters.

profile Contains customer profile information used for this transaction.

customerProfileId The ID number associated with the customer profile.

Numeric string.

customerPaymentProfileId The ID of the customer payment profile used to charge this transaction.

Numeric string.

totalNumInResultSet Shows the number of results for this request.

Numeric string.

Approve or Decline Held Transaction

Approve or Decline a held Transaction.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var SDKConstants = require('authorizenet').Constants;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function approveOrDeclineHeldTransaction(refTransId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var transactionRequestType = new ApiContracts.HeldTransactionRequestType();

    transactionRequestType.setAction(ApiContracts.AfdsTransactionEnum.APPROVE);

    transactionRequestType.setRefTransId(refTransId);

​

    var updateRequest = new ApiContracts.UpdateHeldTransactionRequest();

    updateRequest.setMerchantAuthentication(merchantAuthenticationType);

    updateRequest.setHeldTransactionRequest(transactionRequestType);

Request Field Description

updateHeldTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

action Required.
The action you are requesting to take for the specified transaction.

Use approve to permit the transaction to process as usual. Use decline to mark the transaction as declined, to prevent it from processing.
String.

Either approve or decline.

refTransId Required.
The transaction ID of the held transaction.

Numeric string.

Response Field Description

updateHeldTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactionResponse
responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

authCode The authorization code granted by the card issuing bank for this transaction.

String, 6 characters.

avsResultCode Address Verification Service (AVS) response code.

String, 1 character.

One of the following:

A -- The street address matched, but the postal code did not.
B -- No address information was provided.
E -- The AVS check returned an error.
G -- The card was issued by a bank outside the U.S. and does not support AVS.
N -- Neither the street address nor postal code matched.
P -- AVS is not applicable for this transaction.
R -- Retry — AVS was unavailable or timed out.
S -- AVS is not supported by card issuer.
U -- Address information is unavailable.
W -- The US ZIP+4 code matches, but the street address does not.
X -- Both the street address and the US ZIP+4 code matched.
Y -- The street address and postal code matched.
Z -- The postal code matched, but the street address did not.

cvvResultCode Card code verification (CCV) response code.

String, 1 character.

One of the following:

M -- CVV matched.
N -- CVV did not match.
P -- CVV was not processed.
S -- CVV should have been present but was not indicated.
U -- The issuer was unable to process the CVV check.

cavvResultCode Cardholder authentication verification response code.

Important: Mastercard transactions always return a null result for this element. Consequently, transaction details for Mastercard transactions do not contain CAVV results.
String, 1 character.

One of the following:

Blank or not present -- CAVV not validated.
0 -- CAVV was not validated because erroneous data was submitted.
1 -- CAVV failed validation.
2 -- CAVV passed validation.
3 -- CAVV validation could not be performed; issuer attempt incomplete.
4 -- CAVV validation could not be performed; issuer system error.
5 -- Reserved for future use.
6 -- Reserved for future use.
7 -- CAVV failed validation, but the issuer is available. Valid for U.S.-issued card submitted to non-U.S acquirer.
8 -- CAVV passed validation and the issuer is available. Valid for U.S.-issued card submitted to non-U.S. acquirer.
9 -- CAVV failed validation and the issuer is unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
A -- CAVV passed validation but the issuer unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
B -- CAVV passed validation, information only, no liability shift.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountNumber The masked card number or bank account number used for the transaction.

String.

For example, XXXX1234.
accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

errors This element contains one or more error elements.

error This element contains detailed information about any errors returned.

errorCode Error code returned.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

errorText Text description of error.

For a complete list of response codes, see the Response Code Tool.
String.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

Recurring Billing

Recurring Billing API methods enable you to manage regular payment subscriptions. For more information about Recurring Billing see the Recurring Billing developer guide.
Create a Subscription

For subscriptions with a monthly interval, whose payments begin on the 31st of a month, payments for months with fewer than 31 days occur on the last day of the month.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function createSubscription(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var interval = new ApiContracts.PaymentScheduleType.Interval();

    interval.setLength(1);

    interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);

​

    var paymentScheduleType = new ApiContracts.PaymentScheduleType();

    paymentScheduleType.setInterval(interval);

    paymentScheduleType.setStartDate(utils.getDate());

    paymentScheduleType.setTotalOccurrences(5);

Request Field Description

ARBCreateSubscriptionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

subscription Required.
Contains information about the subscription.

name Merchant-assigned name for the subscription.

String, up to 50 characters.

paymentSchedule Required.
Contains information about the payment schedule.

interval Required.
Contains information about the time between payments.

The length and unit elements together define the interval in between payments. If specified in terms of days, the interval can be between seven (7) and 365 days. If specified in terms of months, the interval can be between one (1) and twelve (12) months.
length Required.
The measurement of time, in association with unit, that is used to define the frequency of the billing occurrences.

For a unit of days, use an integer between 7 and 365, inclusive. For a unit of months, use an integer between 1 and 12, inclusive.
Numeric string, up to 3 digits.

unit Required.
The unit of time, in association with the length, between each billing occurrence.

String.

Either days or months.

startDate Required.
The date of the first payment. Can not be prior to the subscription creation date.

The validation checks against the local server's time, which is expressed as Mountain Time. An error might occur if you try to submit a subscription from a time zone in which the resulting date is different; for example, if you are in the Pacific time zone and try to submit a subscription between 11:00 PM and midnight, with a start date set for today.

If the start date is the 31st, and the interval is monthly, the billing date is the last day of each month (even when the month does not have 31 days).
String, 10 characters.

Use XML date (YYYY-MM-DD) formatting.

totalOccurrences Required.
Number of payments for the subscription.

If a trial period is specified, this value should include the number of payments during the trial period.

To create an ongoing subscription without an end date, set totalOccurrences to "9999".
Numeric string, up to 4 digits.

trialOccurrences Number of payments in the trial period.

If a trial period is specified, include the number of payments during the trial period in totalOccurrences.
Numeric string, up to 2 digits.

amount Required.
Amount of the charge to be run after the trial period.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
trialAmount Conditional.

The amount to be charged for each payment during the trial period.

Required when using trialOccurrences.

During the trial period, we will bill trialAmount on each scheduled payment. Once the trial period is over, we will bill amount for the remaining scheduled payments.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
payment This element contains payment information.

creditCard Conditional.

Applies to Card Not Present transactions only.

Contains human-readable information from the customer's card.

cardNumber Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card number.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
Numeric string, 13-16 digits.

expirationDate Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card expiration date.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

cardCode Conditional.

Applies to Card Not Present transactions only.

The customer’s card code.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This field is required if the merchant would like to use the Card Code Verification (CCV) security feature.

Cardholder information must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

For more information about PCI, please refer to the Standards, Compliance and Security developer training video at https://developer.authorize.net/training.
Numeric string, 3-4 digits.

bankAccount Conditional.
Applies to eCheck.Net transactions only. Used to submit bank account information. If this element is sent, its child elements are required.

For more details please see the eCheck.Net API Documentation.
accountType The type of bank account used for the eCheck.Net transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either checking, savings, or businessChecking.

routingNumber The ABA routing number.

Numeric string, up to 9 digits.

accountNumber The bank account number.

Numeric string, up to 17 digits.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

The value of accountType must be valid for the echeckType value submitted.

For recurring payments, do not use TEL, ARC, or BOC.

For more details please see the eCheck.Net API Documentation.
String.

Either PPD, WEB, or CCD.

bankName The name of the bank.

String, up to 50 characters.

opaqueData Required.
Contains dataDescriptor and dataValue.

dataDescriptor Required.
Specifies how the request should be processed.

The value of dataDescriptor is based on the source of the value of dataValue.
String, 128 characters.

Use COMMON.ACCEPT.INAPP.PAYMENT for Accept transactions.

dataValue Required.
Base64 encoded data that contains encrypted payment data.

The payment gateway expects the encrypted payment data and meta data for the encryption keys.
String, 8192 characters.

order Contains optional order information.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

The invoice number will be associated with each payment in the subscription.
String, up to 20 characters.

description Merchant-provided description of the subscription.

The description will be associated with each payment in the subscription.
String, up to 255 characters.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

For example, janedoe@example.com.
phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

Response Field Description

ARBCreateSubscriptionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

subscriptionId The payment gateway assigned identification number for the subscription.

Numeric string, up to 13 digits.

profile
customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId Payment gateway assigned ID associated with the customer payment profile.

Numeric string.

customerAddressId Payment gateway assigned ID associated with the customer shipping address.

Numeric string.

Create a Subscription from Customer Profile

This request enables you to create a recurring billing subscription from an existing customer profile. Important: The customer payment profile first and last name fields must be populated, these are required for a subscription. For subscriptions with a monthly interval, whose payments begin on the 31st of a month, payments for months with fewer than 31 days occur on the last day of the month.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function createSubscriptionFromCustomerProfile(customerProfileId, customerPaymentProfileId, customerAddressId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var interval = new ApiContracts.PaymentScheduleType.Interval();

    interval.setLength(1);

    interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);

​

    var paymentScheduleType = new ApiContracts.PaymentScheduleType();

    paymentScheduleType.setInterval(interval);

    paymentScheduleType.setStartDate(utils.getDate());

    paymentScheduleType.setTotalOccurrences(5);

Request Field Description

ARBCreateSubscriptionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

subscription Required.
Contains information about the subscription.

name Merchant-assigned name for the subscription.

String, up to 50 characters.

paymentSchedule Required.
Contains information about the payment schedule.

interval Required.
Contains information about the time between payments.

The length and unit elements together define the interval in between payments. If specified in terms of days, the interval can be between seven (7) and 365 days. If specified in terms of months, the interval can be between one (1) and twelve (12) months.
length Required.
The measurement of time, in association with unit, that is used to define the frequency of the billing occurrences.

For a unit of days, use an integer between 7 and 365, inclusive. For a unit of months, use an integer between 1 and 12, inclusive.
Numeric string, up to 3 digits.

unit Required.
The unit of time, in association with the length, between each billing occurrence.

String.

Either days or months.

startDate Required.
The date of the first payment. Can not be prior to the subscription creation date.

The validation checks against the local server's time, which is expressed as Mountain Time. An error might occur if you try to submit a subscription from a time zone in which the resulting date is different; for example, if you are in the Pacific time zone and try to submit a subscription between 11:00 PM and midnight, with a start date set for today.

If the start date is the 31st, and the interval is monthly, the billing date is the last day of each month (even when the month does not have 31 days).
String, 10 characters.

Use XML date (YYYY-MM-DD) formatting.

totalOccurrences Required.
Number of payments for the subscription.

If a trial period is specified, this value should include the number of payments during the trial period.

To create an ongoing subscription without an end date, set totalOccurrences to "9999".
Numeric string, up to 4 digits.

trialOccurrences Number of payments in the trial period.

If a trial period is specified, include the number of payments during the trial period in totalOccurrences.
Numeric string, up to 2 digits.

amount Required.
Amount of the charge to be run after the trial period.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
trialAmount Conditional.

The amount to be charged for each payment during the trial period.

Required when using trialOccurrences.

During the trial period, we will bill trialAmount on each scheduled payment. Once the trial period is over, we will bill amount for the remaining scheduled payments.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
order Contains optional order information.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

The invoice number will be associated with each payment in the subscription.
String, up to 20 characters.

description Description of the subscription.

The description will be associated with each payment in the subscription.
String, up to 255 characters.

profile
customerProfileId Required.
Payment gateway assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId Required.
Payment gateway assigned ID associated with the customer payment profile.

Numeric string.

customerAddressId Payment gateway-assigned ID associated with the customer shipping address.

Numeric string.

Response Field Description

ARBCreateSubscriptionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

subscriptionId The payment gateway assigned identification number for the subscription.

Numeric string.

profile
customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId Payment gateway assigned ID associated with the customer payment profile.

Numeric string.

customerAddressId Payment gateway assigned ID associated with the customer shipping address.

Numeric string.

Get Subscription

Retrieves an existing ARB subscription.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var constants = require('../constants.js');

​

function getSubscription(subscriptionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var getRequest = new ApiContracts.ARBGetSubscriptionRequest();

    getRequest.setMerchantAuthentication(merchantAuthenticationType);

    getRequest.setSubscriptionId(subscriptionId);

​

    console.log(JSON.stringify(getRequest.getJSON(), null, 2));



    var ctrl = new ApiControllers.ARBGetSubscriptionController(getRequest.getJSON());

​

    ctrl.execute(function(){

Request Field Description

ARBGetSubscriptionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

subscriptionId Required.
The payment gateway-assigned identification number for the subscription.

Numeric string.

includeTransactions Indicates whether to include information about transactions for this subscription.

If set to true, information about the most recent 20 transactions for this subscription will be included in the response.
Boolean.

Either true or false.

Response Field Description

ARBGetSubscriptionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

subscription Required.
Contains information about the subscription.

name Merchant-assigned name for the subscription.

String, up to 50 characters.

paymentSchedule Required.
Contains information about the payment schedule.

interval Required.
Contains information about the time between payments.

The length and unit elements together define the interval in between payments. If specified in terms of days, the interval can be between seven (7) and 365 days. If specified in terms of months, the interval can be between one (1) and twelve (12) months.
length Required.
The measurement of time, in association with unit, that is used to define the frequency of the billing occurrences.

For a unit of days, use an integer between 7 and 365, inclusive. For a unit of months, use an integer between 1 and 12, inclusive.
Numeric string, up to 3 digits.

unit Required.
The unit of time, in association with the length, between each billing occurrence.

String.

Either days or months.

startDate Required.
The date of the first payment. Can not be prior to the subscription creation date.

The validation checks against the local server's time, which is expressed as Mountain Time. An error might occur if you try to submit a subscription from a time zone in which the resulting date is different; for example, if you are in the Pacific time zone and try to submit a subscription between 11:00 PM and midnight, with a start date set for today.

If the start date is the 31st, and the interval is monthly, the billing date is the last day of each month (even when the month does not have 31 days).
String, 10 characters.

Use XML date (YYYY-MM-DD) formatting.

totalOccurrences Required.
Number of payments for the subscription.

If a trial period is specified, this value should include the number of payments during the trial period.

To create an ongoing subscription without an end date, set totalOccurrences to "9999".
Numeric string, up to 4 digits.

trialOccurrences Number of payments in the trial period.

If a trial period is specified, include the number of payments during the trial period in totalOccurrences.
Numeric string, up to 2 digits.

amount Required.
Amount of the charge to be run after the trial period.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

trialAmount Conditional.

The amount to be charged for each payment during the trial period.

Required when using trialOccurrences.

During the trial period, we will bill trialAmount on each scheduled payment. Once the trial period is over, we will bill amount for the remaining scheduled payments.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

status Contains information about the subscription status.

String.

Either active, expired, suspended, canceled, or terminated.

profile Contains information for the customer profile.

merchantCustomerId Merchant-assigned ID for the customer.

String, up to 20 characters.

description Description of the customer or customer profile.

String, up to 255 characters.

email Email address associated with the customer profile.

String, up to 255 characters.

customerProfileId Payment gateway-assigned ID associated with the customer profile.

This output is present only for successful requests.
Numeric string.

paymentProfile Contains payment information for the customer profile.

customerType Type of customer.

String.

Either individual or business.

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

customerPaymentProfileId Payment gateway assigned ID associated with the customer payment profile.

Numeric string.

payment This element contains payment information.

creditCard Conditional.

Applies to Card Not Present transactions only.

Contains human-readable information from the customer's card.

cardNumber Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card number.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
Numeric string, 13-16 digits.

expirationDate Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card expiration date.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

cardCode Conditional.

Applies to Card Not Present transactions only.

The customer’s card code.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This field is required if the merchant would like to use the Card Code Verification (CCV) security feature.

Cardholder information must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

For more information about PCI, please refer to the Standards, Compliance and Security developer training video at https://developer.authorize.net/training.
Numeric string, 3-4 digits.

bankAccount Conditional.
Applies to eCheck.Net transactions only. Used to submit bank account information. If this element is sent, its child elements are required.

For more details please see the eCheck.Net API Documentation.
accountType The type of bank account used for the eCheck.Net transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either checking, savings, or businessChecking.

routingNumber The ABA routing number.

Numeric string, up to 9 digits.

accountNumber The bank account number.

Numeric string, up to 17 digits.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

The value of accountType must be valid for the echeckType value submitted.

For recurring payments, do not use TEL, ARC, or BOC.

For more details please see the eCheck.Net API Documentation.
String.

Either PPD, WEB, or CCD.

bankName The name of the bank.

String, up to 50 characters.

opaqueData Required.
Contains dataDescriptor and dataValue.

dataDescriptor Required.
Specifies how the request should be processed.

The value of dataDescriptor is based on the source of the value of dataValue.
String, 128 characters.

Use COMMON.ACCEPT.INAPP.PAYMENT for Accept transactions.

dataValue Required.
Base64 encoded data that contains encrypted payment data.

The payment gateway expects the encrypted payment data and meta data for the encryption keys.
String, 8192 characters.

shippingProfile Contains shipping address information for the customer profile.

customerAddressId Payment gateway-assigned ID associated with the customer shipping address.

Numeric string.

firstName Conditional.

First name associated with customer’s billing address.

String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

String, up to 60 characters.

city Conditional.

City of customer’s billing address.

String, up to 40 characters.

state Conditional.

State of customer’s billing address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

order Contains optional order information.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

The invoice number will be associated with each payment in the subscription.
String, up to 20 characters.

description Description of the subscription.

The description will be associated with each payment in the subscription.
String, up to 255 characters.

arbTransactions Contains information about up to 20 recent transactions.

arbTransaction Contains information about 1 recent transaction.

transId The identification number of the transaction.

This value is only returned for successful transactions, whether authorized or declined. If the transaction ends in error, you will not receive transId in the response.
Numeric string.

response Contains explanatory text about the transaction.

String.

For example, "The credit card has expired."
submitTimeUTC Date and time the transaction was submitted, expressed in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

payNum Number of payments for this subscription to date. For example, if this is the fifth payment for this subscription, the value of payNum will be 5.

Numeric string.

attemptNum Number of attempts that were made for this payment.

Numeric string.

Get Subscription Status

Retrieves the status of an existing ARB subscription.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var constants = require('../constants.js');

​

function getSubscriptionStatus(subscriptionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var getRequest = new ApiContracts.ARBGetSubscriptionStatusRequest();

    getRequest.setMerchantAuthentication(merchantAuthenticationType);

    getRequest.setSubscriptionId(subscriptionId);

​

    console.log(JSON.stringify(getRequest.getJSON(), null, 2));



    var ctrl = new ApiControllers.ARBGetSubscriptionStatusController(getRequest.getJSON());

​

    ctrl.execute(function(){

Request Field Description

ARBGetSubscriptionStatusRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

subscriptionId Required.
The payment gateway-assigned identification number for the subscription.

Numeric string.

Response Field Description

ARBGetSubscriptionStatusResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

status Contains information about the subscription status.

String.

Either active, expired, suspended, canceled, or terminated.

Update a Subscription

Updates an existing ARB subscription. Only the subscription ID and fields that you wish to modify must be submitted.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function updateSubscription(subscriptionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var orderType = new ApiContracts.OrderType();

    orderType.setInvoiceNumber(utils.getRandomString('Inv:'));

    orderType.setDescription(utils.getRandomString('Description'));

​

    var arbSubscriptionType = new ApiContracts.ARBSubscriptionType();

    arbSubscriptionType.setOrder(orderType);

​

    var updateRequest = new ApiContracts.ARBUpdateSubscriptionRequest();

Request Field Description

ARBUpdateSubscriptionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

subscriptionId Required.
The payment gateway-assigned identification number for the subscription.

Numeric string.

subscription Required.
Contains information about the subscription.

name Merchant-assigned name for the subscription.

String, up to 50 characters.

paymentSchedule Required.
Contains information about the payment schedule.

interval Required.
Contains information about the time between payments.

The length and unit elements together define the interval in between payments. If specified in terms of days, the interval can be between seven (7) and 365 days. If specified in terms of months, the interval can be between one (1) and twelve (12) months.
length Required.
The measurement of time, in association with unit, that is used to define the frequency of the billing occurrences.

For a unit of days, use an integer between 7 and 365, inclusive. For a unit of months, use an integer between 1 and 12, inclusive.
Numeric string, up to 3 digits.

unit Required.
The unit of time, in association with the length, between each billing occurrence.

String.

Either days or months.

startDate Required.
The date of the first payment. Can not be prior to the subscription creation date.

The validation checks against the local server's time, which is expressed as Mountain Time. An error might occur if you try to submit a subscription from a time zone in which the resulting date is different; for example, if you are in the Pacific time zone and try to submit a subscription between 11:00 PM and midnight, with a start date set for today.

If the start date is the 31st, and the interval is monthly, the billing date is the last day of each month (even when the month does not have 31 days).
String, 10 characters.

Use XML date (YYYY-MM-DD) formatting.

totalOccurrences Required.
Number of payments for the subscription.

If a trial period is specified, this value should include the number of payments during the trial period.

To create an ongoing subscription without an end date, set totalOccurrences to "9999".
Numeric string, up to 4 digits.

trialOccurrences Number of payments in the trial period.

If a trial period is specified, include the number of payments during the trial period in totalOccurrences.
Numeric string, up to 2 digits.

amount Required.
Amount of the charge to be run after the trial period.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
trialAmount Conditional.

The amount to be charged for each payment during the trial period.

Required when using trialOccurrences.

During the trial period, we will bill trialAmount on each scheduled payment. Once the trial period is over, we will bill amount for the remaining scheduled payments.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
payment This element contains payment information.

creditCard Conditional.

Applies to Card Not Present transactions only.

Contains human-readable information from the customer's card.

cardNumber Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card number.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
Numeric string, 13-16 digits.

expirationDate Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card expiration date.

Only use cardNumber and expirationDate for Card Present transactions if the track data is unavailable. Note that using cardNumber and expirationDate in Card Present transactions may result in higher merchant rates.
String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

cardCode Conditional.

Applies to Card Not Present transactions only.

The customer’s card code.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This field is required if the merchant would like to use the Card Code Verification (CCV) security feature.

Cardholder information must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

For more information about PCI, please refer to the Standards, Compliance and Security developer training video at https://developer.authorize.net/training.
Numeric string, 3-4 digits.

bankAccount Conditional.
Applies to eCheck.Net transactions only. Used to submit bank account information. If this element is sent, its child elements are required.

For more details please see the eCheck.Net API Documentation.
accountType The type of bank account used for the eCheck.Net transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either checking, savings, or businessChecking.

routingNumber The ABA routing number.

Numeric string, up to 9 digits.

accountNumber The bank account number.

Numeric string, up to 17 digits.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

The value of accountType must be valid for the echeckType value submitted.

For recurring payments, do not use TEL, ARC, or BOC.

For more details please see the eCheck.Net API Documentation.
String.

Either PPD, WEB, or CCD.

bankName The name of the bank.

String, up to 50 characters.

opaqueData Required.
Contains dataDescriptor and dataValue.

dataDescriptor Required.
Specifies how the request should be processed.

The value of dataDescriptor is based on the source of the value of dataValue.
String, 128 characters.

Use COMMON.ACCEPT.INAPP.PAYMENT for Accept transactions.

dataValue Required.
Base64 encoded data that contains encrypted payment data.

The payment gateway expects the encrypted payment data and meta data for the encryption keys.
String, 8192 characters.

order Contains optional order information.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

The invoice number will be associated with each payment in the subscription.
String, up to 20 characters.

description Description of the subscription.

The description will be associated with each payment in the subscription.
String, up to 255 characters.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

For example, janedoe@example.com.
phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

profile
customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId Payment gateway assigned ID associated with the customer payment profile.

Numeric string.

customerAddressId Payment gateway assigned ID associated with the customer shipping address.

Numeric string.

Response Field Description

ARBUpdateSubscriptionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

profile
customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId Payment gateway assigned ID associated with the customer payment profile.

Numeric string.

customerAddressId Payment gateway assigned ID associated with the customer shipping address.

Numeric string.

Cancel a Subscription

Cancels an existing subscription.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var constants = require('../constants.js');

​

function cancelSubscription(subscriptionId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var cancelRequest = new ApiContracts.ARBCancelSubscriptionRequest();

    cancelRequest.setMerchantAuthentication(merchantAuthenticationType);

    cancelRequest.setSubscriptionId(subscriptionId);

​

    console.log(JSON.stringify(cancelRequest.getJSON(), null, 2));

​

    var ctrl = new ApiControllers.ARBCancelSubscriptionController(cancelRequest.getJSON());

​

    ctrl.execute(function(){

Request Field Description

ARBCancelSubscriptionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

subscriptionId Required.
The payment gateway-assigned identification number for the subscription.

Numeric string.

Response Field Description

ARBCancelSubscriptionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

Get a List of Subscriptions

You can use the following method to request a list of subscriptions. The function will return up to 1000 results in a single request. Paging options can be sent to limit the result set or to retrieve additional results beyond the 1000 item limit. You can add the sorting and paging options shown below to customize the result set.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

This sample JavaScript code demonstrates how to perform this function using our Node.js SDK.

URL: View Sample code file on GitHub

'use strict';

​

var ApiContracts = require('authorizenet').APIContracts;

var ApiControllers = require('authorizenet').APIControllers;

var utils = require('../utils.js');

var constants = require('../constants.js');

​

function getListOfSubscriptions(callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(constants.apiLoginKey);

    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

​

    var refId = utils.getRandomInt();

​

    var sorting = new ApiContracts.ARBGetSubscriptionListSorting();

    sorting.setOrderDescending(true);

    sorting.setOrderBy(ApiContracts.ARBGetSubscriptionListOrderFieldEnum.CREATETIMESTAMPUTC);

​

    var paging = new ApiContracts.Paging();

    paging.setOffset(1);

Request Field Description

ARBGetSubscriptionListRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

searchType Required.
Specifies how to filter search results.

String.

Either cardExpiringThisMonth, subscriptionActive, subscriptionInactive, or subscriptionExpiringThisMonth.

sorting Contains sorting information.

orderBy Required.
Order of results in response.

String.

One of the following: id
name
status
createTimeStampUTC
lastName
firstName
accountNumber (ordered by last four digits)
amount
pastOccurences

orderDescending Sort the results in descending order.

Boolean.

Either true or false.

paging Contains paging information.

limit The number of transactions per page.

You can request up to 1000 subscriptions per page of results.
Decimal, between 1 and 1000.

offset The number of the page to return results from.

For example, if you use a limit of 100, setting offset to 1 will return the first 100 subscriptions, setting offset to 2 will return the second 100 subscriptions, and so forth.
Decimal, between 1 and 100000.

Response Field Description

ARBGetSubscriptionListResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

totalNumInResultSet Shows the number of results for this request.

We return a non-zero value for totalNumInResultSet only for the first page of results, that is, if offset equals 1.
Numeric string.

Defaults to 0

subscriptionDetails Contains one or more instances of subscriptionDetail.

subscriptionDetail Contains the results of one query.

id Required.
Subscription ID.

Numeric string.

name The name specified when the subscription was created.

String.

status Contains information about the subscription status.

String.

Either active, expired, suspended, canceled, or terminated.

createTimeStampUTC Required.
When the subscription was created.

The T character separates the date from the time. This element interprets the time as Universal Time (UTC).
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

firstName Conditional.

First name associated with customer’s billing address.

String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

String, up to 50 characters.

totalOccurences Required.
How many total payments will make up the completed subscription. This includes both past and future scheduled payments.

Numeric string.

pastOccurences Required.
How many payments have been attempted, whether they were completed or not.

Numeric string.

paymentMethod Required.
The payment method used.

String.

Either creditCard, eCheck, or payPal.

accountNumber The last 4 digits of card or bank account number.

Numeric string, 4 digits.

invoice The invoice number specified when the subscription was created.

String, up to 20 characters.

amount Required.
Amount of the charge to be run after the trial period.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
currencyCode The three-letter ISO code for the currency used in the transaction.

See ISO 4217 for a complete list of three-letter currency codes.
String, 3 characters.

customerProfileId The ID number associated with the customer profile.

Numeric string.

customerPaymentProfileId Required.
ID of the payment profile.

Numeric string.

customerShippingProfileId ID of the shipping profile.

Numeric string.

Customer Profiles

This API enables you to store customer payment and address data for subsequent use. For more information about customer profiles, see the Customer Profiles developer guide.
Create Customer Profile

Use this function to create a new customer profile including any customer payment profiles and customer shipping addresses.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/create-customer-profile.js
Request Field Description

createCustomerProfileRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

profile Contains the information for the customer profile.

At least one of the following fields must be submitted under profile: merchantCustomerId, description, or email.
merchantCustomerId Required.
Conditional.
Merchant assigned ID for the customer.

Required only when no values for description and email are submitted.
String, up to 20 characters.

description Conditional.
Description of the customer or customer profile.

Required only when no values for merchantCustomerId and email are submitted.
String, up to 255 characters.

email Conditional.
Email address associated with the customer profile.

Required when no values for description and merchantCustomerId are submitted.

Required when using a European payment processor.
String, up to 255 characters.

paymentProfiles Contains payment profiles for the customer profile.

Multiple instances of this element can be submitted to create multiple payment profiles for the customer profile.
customerType Type of customer.

String. Either individual or business

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

payment This element contains payment information.

creditCard, bankAccount, or opaqueData

creditCard Conditional.

Applies to Card Not Present transactions only.

Contains human-readable information from the customer's card.

cardNumber Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card number.

Numeric string, 13-16 digits.

expirationDate Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card expiration date.

String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

cardCode The customer's card code.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This field is required if the merchant would like to use the Card Code Verification (CCV) security feature.

Cardholder information must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

The cardCode field is only used for validation and is not stored in the customer profile. It should only be used when submitting validationMode with a value of testMode or liveMode.
Numeric string, 3-4 digits.

bankAccount Conditional.
Applies to eCheck.Net transactions only. Used to submit bank account information. If this element is sent, its child elements are required.

For more details please see the eCheck.Net API Documentation.
accountType The type of bank account used for the eCheck.Net transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either checking, savings, or businessChecking.

routingNumber The ABA routing number.

Numeric string, up to 9 digits.

accountNumber The bank account number.

Numeric string, up to 17 digits.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

Do not use TEL, ARC, or BOC for recurring charges.
String. Either PPD, WEB, or CCD.

bankName The name of the bank.

String, up to 50 characters.

opaqueData Required.
Contains dataDescriptor and dataValue.

dataDescriptor Required.
Specifies how the request should be processed.

The value of dataDescriptor is based on the source of the value of dataValue.
String, 128 characters.

Use COMMON.ACCEPT.INAPP.PAYMENT for Accept transactions.

For Apple Pay, use COMMON.APPLE.INAPP.PAYMENT.

For Android Pay, use COMMON.ANDROID.INAPP.PAYMENT.

dataValue Required.
Base64 encoded data that contains encrypted payment data.

The payment gateway expects the encrypted payment data and meta data for the encryption keys.
String, 8192 characters.

shipToList Contains shipping address information for the customer profile.

firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

For international payment processors, use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

profileType Indicates whether a profile is a guest profile.

We recommend submitting profileType only when you need a guest profile. If you do not need guest profiles, you do not need to send this element.

We retain guest profiles for 90 days after their last usage in a transaction request. If you create no more transactions using a given guest profile, we purge the guest profile from our system.
String.

Either guest or regular. Defaults to regular.

validationMode Indicates the processing mode for the request. If the customer profile contains no payment data, this field should not be sent.

String.

Use testMode to perform a Luhn mod-10 check on the card number, without further validation. Use liveMode to submit a zero-dollar or one-cent transaction (depending on card type and processor support) to confirm the card number belongs to an active credit or debit account.

Response Field Description

createCustomerProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

customerProfileId Payment gateway assigned ID associated with the customer profile.

This output is present only for successful requests.
Numeric string.

customerPaymentProfileIdList A list of all payment profile IDs created with the request.

This output is present only for requests that contain one or more payment profiles.

The payment profile IDs are returned in the same order as they were in the request.
Numeric string.

customerShippingAddressIdList A list of all shipping profile IDs created with the request.

This output is present only for requests that contain multiple shipping profiles.

The shipping profile IDs are returned in the same order as they were in the request.
Numeric string.

validationDirectResponseList A list of the direct response results for the validation transaction for each payment profile.

This value is present only when using validationMode, either with testMode or liveMode.

The list is returned in the same order as the payment profiles were submitted in the request.
String.

Get Customer Profile

Use this function to retrieve an existing customer profile along with all the associated payment profiles and shipping addresses.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/get-customer-profile.js
Request Field Description

getCustomerProfileRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway-assigned ID associated with the customer profile.

Numeric string.

merchantCustomerId Merchant-assigned customer reference ID.

Must be unique among all of the customer IDs stored with profiles to be able to retrieve.
String, up to 20 characters.

email Merchant-assigned customer email address.

Must be unique among all of the customer IDs stored with profiles to be able to retrieve.
String, up to 255 characters.

unmaskExpirationDate Set to true if you want the expiration date to be returned unmasked.

Boolean.

Either true or false.

includeIssuerInfo When set to true, this optional field requests that the issuer number (IIN) be included in the response, in the field issuerNumber.

Boolean.

Either true or false.

Response Field Description

getCustomerProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

profile Contains the information for the customer profile.

merchantCustomerId Required.
Conditional.
Merchant assigned ID for the customer.

Required only when no values for description and email are submitted.
String, up to 20 characters.

description Conditional.
Description of the customer or customer profile.

Required only when no values for merchantCustomerId and email are submitted.
String, up to 255 characters.

customerProfileId Payment gateway-assigned ID associated with the customer profile.

This output is present only for successful requests.
Numeric string.

email Email address associated with the customer profile.

String, up to 255 characters.

paymentProfiles Contains one or more payment profiles for the customer profile.

billTo This element contains billing address information.

firstName Conditional.

First name associated with customer’s billing address.

String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

String, up to 60 characters.

city Conditional.

City of customer’s billing address.

String, up to 40 characters.

state Conditional.

State of customer’s billing address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

For international payment processors, use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

defaultPaymentProfile Indicates whether this profile is the default.

If a customer profile does not have a default payment profile, then the defaultPaymentProfile element is not displayed in the getCustomerProfileResponse.

If a profile has multiple payment profiles, the default profile returns defaultPaymentProfile set to true. Non-default profiles do not return defaultPaymentProfile.
Boolean.

EIther true or false.

customerPaymentProfileId Payment gateway assigned ID associated with the customer payment profile.

Numeric string.

payment This element contains payment information.

Contains either creditCard or bankAccount.

creditCard Contains credit card payment information for the payment profile.

For information about the fields in this object, see the creditCard object in getCustomerPaymentProfileResponse
cardNumber The customer’s masked credit card number.

All sensitive payment information in the output is masked.
String, 8 characters.

expirationDate The expiration date for the customer’s credit card.

All sensitive payment information in the output is masked unless you set unmaskExpirationDate to true in the request. When masked, expirationDate set to "XXXX".
String, 7 characters.

cardType Type of credit card.

String.

Either Visa, Mastercard, AmericanExpress, Discover, JCB, or DinersClub.

issuerNumber Unique identifier (IIN) for the issuer of the card. This element is only returned if you set the includeIssuerInfo field to true in the request.

Numeric string, six digits.

isPaymentToken Indicates whether the payment method used an encrypted token.

Boolean.

EIther true or false.

bankAccount Conditional.
Applies to eCheck.Net transactions only. Used to submit bank account information. If this element is sent, its child elements are required.

For more details please see the eCheck.Net API Documentation.
accountType The type of bank account used for the eCheck.Net transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either checking, savings, or businessChecking.

routingNumber The ABA routing number.

Numeric string, up to 9 digits.

accountNumber The bank account number.

Numeric string, up to 17 digits.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

Do not use TEL, ARC, or BOC for recurring charges.
String. Either PPD, WEB, or CCD.

bankName The name of the bank.

String, up to 50 characters.

shipToList One or more of this field will be returned for any shipping profiles associated with this customer.

firstName First name associated with this customer's shipping profile.

String, up to 50 characters.

lastName Last name associated with this customer's shipping profile.

String, up to 50 characters.

company Company associated with this customer's shipping profile.

String, up to 50 characters.

address Address associated with this customer's shipping profile.

String, up to 60 characters.

city City associated with this customer's shipping profile.

String, up to 40 characters.

state State associated with this customer's shipping profile.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

customerAddressId customerAddressId associated with this customer's shipping profile.

Numeric string.

profileType Indicates whether a profile is a guest profile.

We recommend submitting profileType only when you need a guest profile. If you do not need guest profiles, you do not need to send this element.

We retain guest profiles for 90 days after their last usage in a transaction request. If you create no more transactions using a given guest profile, we purge the guest profile from our system.
String.

Either guest or regular. Defaults to regular.

subscriptionIds Contains one or more subscriptionId fields associated with the customer.

subscriptionId Contains one or more subscription IDs associated with the customer.

Numeric string.

originalNetworkTransId Required.
The network transaction ID returned in response to the original card-on-file transaction.

String, up to 255 characters.

originalAuthAmount Required.
The original authorization amount.

Decimal, up to 15 digits with a decimal point.

Required for Discover, Diners Club, JCB, and China Union Pay transactions.

Do not use currency symbols.

excludeFromAccountUpdater Indicates whether the payment profile should be excluded from Account Updater updates.

This field is only included in the response if the payment profile is updated with excludeFromAccountUpdater set to true.
Boolean.

Either true or false.

Get Customer Profile IDs

Use this function to retrieve all existing customer profile IDs.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/get-customer-profile-ids.js
Request Field Description

getCustomerProfileIdsRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

Response Field Description

getCustomerProfileIdsResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

ids Payment gateway assigned IDs associated with the customer profiles.

This output is present only for successful requests.
numericString The ID number associated with a customer profile.

Numeric string.

Update Customer Profile

Use this function to update an existing customer profile.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/update-customer-profile.js
Request Field Description

updateCustomerProfileRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

profile Contains the information for the customer profile.

At least one of the following fields must be submitted under profile: merchantCustomerId, description, or email.
merchantCustomerId Required.
Conditional.
Merchant assigned ID for the customer.

Required only when no values for description and email are submitted.
String, up to 20 characters.

description Conditional.
Description of the customer or customer profile.

Required only when no values for merchantCustomerId and email are submitted.
String, up to 255 characters.

email Conditional.
Email address associated with the customer profile.

Required when no values for description and merchantCustomerId are submitted.

Required when using a European payment processor.
String, up to 255 characters.

customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

profileType Indicates whether a profile is a guest profile.

We recommend submitting profileType only when you need a guest profile. If you do not need guest profiles, you do not need to send this element.

We retain guest profiles for 90 days after their last usage in a transaction request. If you create no more transactions using a given guest profile, we purge the guest profile from our system.
String.

Either guest or regular. Defaults to regular.

Response Field Description

updateCustomerProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

Delete Customer Profile

Use this function to delete an existing customer profile along with all associated customer payment profiles and customer shipping addresses.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/delete-customer-profile.js
Request Field Description

deleteCustomerProfileRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

Response Field Description

deleteCustomerProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

Create Customer Payment Profile

Use this function to create a new customer payment profile for an existing customer profile.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/create-customer-payment-profile.js
Request Field Description

createCustomerPaymentProfileRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

paymentProfile Required.
Contains payment information for the customer profile.

customerType Type of customer.

String.

Either individual or business.

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

For international payment processors, use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

payment This element contains payment information.

creditCard, bankAccount, or opaqueData

creditCard Contains credit card payment information for the payment profile.

cardNumber Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card number.

Numeric string, 13-16 digits.

expirationDate Required.
Conditional.

Applies to Card Not Present transactions only.

The customer’s credit card expiration date.

String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

cardCode The customer's card code.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This field is required if the merchant would like to use the Card Code Verification (CCV) security feature.

Cardholder information must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

The cardCode field is only used for validation and is not stored in the customer profile. It should only be used when submitting validationMode with a value of testMode or liveMode.
Numeric string, 3-4 digits.

bankAccount Conditional.
Applies to eCheck.Net transactions only. Used to submit bank account information. If this element is sent, its child elements are required.

For more details please see the eCheck.Net API Documentation.
accountType The type of bank account used for the eCheck.Net transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either checking, savings, or businessChecking.

routingNumber The ABA routing number.

Numeric string, up to 9 digits.

accountNumber The bank account number.

Numeric string, up to 17 digits.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

Do not use TEL, ARC, or BOC for recurring charges.
Either PPD, WEB, or CCD.

bankName The name of the bank.

String, up to 50 characters.

opaqueData Required.
Contains dataDescriptor and dataValue.

dataDescriptor Required.
Specifies how the request should be processed.

The value of dataDescriptor is based on the source of the value of dataValue.
String, 128 characters.

Use COMMON.ACCEPT.INAPP.PAYMENT for Accept transactions.

For Apple Pay, use COMMON.APPLE.INAPP.PAYMENT.

For Android Pay, use COMMON.ANDROID.INAPP.PAYMENT.

dataValue Required.
Base64 encoded data that contains encrypted payment data.

The payment gateway expects the encrypted payment data and meta data for the encryption keys.
String, 8192 characters.

defaultPaymentProfile When set to true, this field designates the payment profile as the default payment profile.

When a default payment profile has been designated, you can use getCustomerPaymentProfileRequest with customerProfileId as the only parameter.
Boolean.

Either true or false.

validationMode Indicates the processing mode for the request. If the customer profile contains no payment data, this field should not be sent.

String.

Use testMode to perform a Luhn mod-10 check on the card number, without further validation. Use liveMode to submit a zero-dollar or one-cent transaction (depending on card type and processor support) to confirm the card number belongs to an active credit or debit account.

Response Field Description

createCustomerPaymentProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

customerPaymentProfileId Payment gateway assigned ID associated with the customer payment profile.

This output is present only for successful requests.
Numeric string.

validationDirectResponse Contains detailed information about the result of the transaction.

This output is present only if the validationMode input parameter is passed with a value of testMode or liveMode.
String.

defaultPaymentProfile Designates whether this payment profile is set as the default payment profile.

This is returned only if you designated this profile as the default in the request.
String.

Defaults to true.

Get Customer Payment Profile

Use this function to retrieve the details of a customer payment profile associated with an existing customer profile.

Important: If the payment profile has previously been set as the default payment profile, you can submit this request using customerProfileId as the only parameter. Submitting this request with only the customer profile ID will cause the information for the default payment profile to be returned if a default payment profile has been previously designated. If no payment profile has been designated as the default payment profile, failing to specify a payment profile will result in an error.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/get-customer-payment-profile.js
Request Field Description

getCustomerPaymentProfileRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway-assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId Payment gateway-assigned ID associated with the customer payment profile.

Numeric string..

unmaskExpirationDate Pass true to return an unmasked expiration date in the response.

Default is false.
Boolean.

Either true or false.

includeIssuerInfo When set to true, this optional field requests that the issuer number (IIN) be included in the response, in the field issuerNumber.

Boolean.

Either true or false.

Response Field Description

getCustomerPaymentProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

paymentProfile Contains payment information for the customer profile.

defaultPaymentProfile Designates whether this payment profile is set as the default payment profile.

This is returned only if you designated this profile as the default in the request.
String.

Defaults to true.

customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId Payment gateway assigned ID associated with the customer payment profile.

Numeric string.

customerType Type of customer.

String.

Either individual or business.

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

For international payment processors, use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

payment This element contains payment information.

Use either creditCard or bankAccount.

creditCard Contains credit card payment information for the payment profile.

For information about the fields in this object, see the creditCard object in getCustomerPaymentProfileResponse
cardNumber The customer’s masked credit card number.

All sensitive payment information in the output is masked.
String.

expirationDate The expiration date for the customer’s credit card.

All sensitive payment information in the output is masked unless you set unmaskExpirationDate to true in the request. When masked, expirationDate will return as "XXXX".
String, 7 characters.

cardType Type of credit card.

String.

Either Visa, Mastercard, AmericanExpress, Discover, JCB, or DinersClub.

issuerNumber Unique identifier (IIN) for the issuer of the card. This element is only returned if you set the includeIssuerInfo field to true in the request.

Numeric string, six digits.

isPaymentToken Indicates whether the payment method used an encrypted token.

Boolean.

Either true or false.

bankAccount Conditional.
Applies to eCheck.Net transactions only.

For more details please see the eCheck.Net API Documentation.
accountType The type of bank account used for the eCheck.Net transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either checking, savings, or businessChecking.

routingNumber The ABA routing number.

Numeric string, up to 9 digits.

accountNumber The bank account number.

Numeric string, up to 17 digits.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

Do not use TEL, ARC, or BOC for recurring charges.
Either PPD, WEB, or CCD.

bankName The name of the bank.

String, up to 50 characters.

subscriptionIds Contains one or more subscriptionId fields.

subscriptionId Contains a subscription ID associated with this customer.

Numeric string.

originalNetworkTransId Required.
The network transaction ID returned in response to the original card-on-file transaction.

String, up to 255 characters.

originalAuthAmount Required.
The original authorization amount.

Decimal, up to 15 digits with a decimal point.

Required for Discover, Diners Club, JCB, and China Union Pay transactions.

Do not use currency symbols.

excludeFromAccountUpdater Indicates whether the payment profile should be excluded from Account Updater updates.

This field is only included in the response if the payment profile is updated with excludeFromAccountUpdater set to true.
Boolean.

Either true or false.

Get Customer Payment Profile List

Use this function to get list of all the payment profiles that match the submitted searchType. You can use this function to get the list of all cards expiring this month. The function will return up to 10 results in a single request. Paging options can be sent to limit the result set or to retrieve additional results beyond the 10 item limit. You can add the sorting and paging options shown below to customize the result set.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/get-customer-payment-profile-list.js
Request Field Description

getCustomerPaymentProfileListRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

searchType Required.
Specifies how to filter search results.

String.

Use cardsExpiringInMonth to filter profiles with cards that expire in a given month.

month Required.
The expiration month for the type of payment profiles.

String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

sorting Contains sorting information.

orderBy Order of results in response.

String.

Use id to sort results by payment profile ID.

orderDescending Sort the results in descending order.

Boolean.

Either true or false.

paging Contains paging information.

limit The number of transactions per page.

You can request up to 1000 payment profiles per page of results.
Decimal, between 1 and 1000.

offset The number of the page to return results from.

For example, if you use a limit of 100, setting offset to 1 will return the first 100 profiles, setting offset to 2 will return the second 100 profiles, and so forth.
Decimal, between 1 and 100000.

Response Field Description

getCustomerPaymentProfileListResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

totalNumInResultSet Shows the number of results for this request.

Numeric string.

paymentProfiles Contains one or more instances of paymentProfile.

paymentProfile Contains the results of one query.

defaultPaymentProfile Designates whether this payment profile is set as the default payment profile.

This is returned only if you previously designated this profile as the default payment profile.
true

customerPaymentProfileId Required.
Payment gateway assigned ID associated with the customer payment profile.

Numeric.

customerProfileId Required.
Payment gateway assigned ID associated with the customer profile.

Numeric

billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

For international payment processors, use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

payment Contains either a creditCard or BankAccount element and its sub-elements.

creditCard Contains credit card information.

cardNumber Required.
The customer’s credit card number.

This is sensitive cardholder information and must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

For more information about PCI, please refer to the Standards, Compliance and Security developer training video at https://developer.authorize.net/training.
Numeric string, 13-16 digits.

expirationDate Required.
The customer’s credit card expiration date.

This is sensitive cardholder information and must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

For more information about PCI, please refer to the Standards, Compliance and Security developer training video at https://developer.authorize.net/training.
String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

cardType The customer’s card type.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

isPaymentToken Indicates whether the payment method used an encrypted token.

Boolean.

EIther true or false.

cardArt The display parameters for the customer's card type.

cardBrand The customer’s card brand.

String.

cardImageHeight The height of customer’s card image, in pixels

String.

cardImageUrl The url of customer’s card image.

String.

A valid and well-formed URL.

cardImageWidth The height of customer’s card image, in pixels.

Numeric string.

cardType The customer’s card type.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

bankAccount Conditional.
Applies to eCheck.Net transactions only.

For more details please see the eCheck.Net API Documentation.
accountType The type of bank account used for the eCheck.Net transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either checking, savings, or businessChecking.

routingNumber The ABA routing number.

Numeric string, up to 9 digits.

accountNumber The bank account number.

Numeric string, up to 17 digits.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

Do not use TEL, ARC, or BOC for recurring transactions.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either PPD, WEB, or CCD.

bankName The name of the bank.

String, up to 50 characters.

originalNetworkTransId Required.
The network transaction ID returned in response to the original card-on-file transaction.

String, up to 255 characters.

originalAuthAmount Required.
The original authorization amount.

Decimal, up to 15 digits with a decimal point.

Required for Discover, Diners Club, JCB, and China Union Pay transactions.

Do not use currency symbols.

excludeFromAccountUpdater Indicates whether the payment profile should be excluded from Account Updater updates.

This field is only included in the response if the payment profile is updated with excludeFromAccountUpdater set to true.
Boolean.

Either true or false.

Validate Customer Payment Profile

Use this function to generate a test transaction that verifies an existing customer payment profile. No customer receipt emails are sent when the validateCustomerPaymentProfileRequest function is called.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/validate-customer-payment-profile.js
Request Field Description

validateCustomerPaymentProfileRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId The ID number associated with the customer profile.

Numeric string.

customerPaymentProfileId Payment gateway-assigned ID associated with the customer payment profile.

Numeric string.

customerShippingAddressId Payment gateway-assigned ID associated with the customer shipping address.

If customerShippingAddressId is not passed, shipping information will not be included with the transaction.
Numeric string.

cardCode Conditional.

Applies to Card Not Present transactions only.

The customer’s card code.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This field is required if the merchant would like to use the Card Code Verification (CCV) security feature.

Cardholder information must be stored securely and in accordance with the Payment Card Industry (PCI) Data Security Standard.

For more information about PCI, please refer to the Standards, Compliance and Security developer training video at https://developer.authorize.net/training.
Numeric string, 3-4 digits.

validationMode Indicates the processing mode for the request. If the customer profile contains no payment data, this field should not be sent.

String.

Use testMode to perform a Luhn mod-10 check on the card number, without further validation. Use liveMode to submit a zero-dollar or one-cent transaction (depending on card type and processor support) to confirm the card number belongs to an active credit or debit account.

Response Field Description

validateCustomerPaymentProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

directResponse Contains detailed information about the result of the transaction.

String.

Update Customer Payment Profile

Use this function to update a payment profile for an existing customer profile.

Important: If some fields in this request are not submitted or are submitted with a blank value, the values in the original profile are removed. As a best practice to prevent this from happening, call getCustomerPaymentProfileRequest to receive all current information including masked payment information. Change the field or fields that you wish to update, and then reuse all the fields you received, with updates, in a call to updateCustomerPaymentProfileRequest.

To test the validity of new payment information, call validateCustomerPaymentProfileRequest after successfully updating the payment profile.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/update-customer-payment-profile.js
Request Field Description

updateCustomerPaymentProfileRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway-assigned ID associated with the customer profile.

Numeric string.

paymentProfile Contains payment information for the customer profile.

Sensitive information that is not being updated can be masked.
customerType Type of customer.

If this field is not submitted in the request, or is submitted with a blank value, the original value will be removed from the profile.
String. Either individual or business.

billTo If this entire billTo element is not submitted, the original billing information for the profile will stay the same.

If you update only one or more elements under billTo, all elements must be submitted with their valid values to prevent the original values from being removed.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName The customer’s first name.

If this field is not submitted in the request, or is submitted with a blank value, the original value will be removed from the profile.
String, up to 50 characters.

lastName The customer’s last name.

If this field is not submitted in the request, or is submitted with a blank value, the original value will be removed from the profile.
String, up to 50 characters.

company The name of the company associated with the customer, if applicable.

If this field is not submitted in the request, or is submitted with a blank value, the original value will be removed from the profile.
String, up to 50 characters.

address The customer’s address.

If this field is not submitted in the request, or submitted with a blank value, the original value will be removed from the profile.
String, up to 60 characters.

city The city of the customer’s shipping address.

If this field is not submitted in the request, or is submitted with a blank value, the original value will be removed from the profile.
String, up to 40 characters.

state The state of the customer’s address.

If this field is not submitted in the request, or is submitted with a blank value, the original value will be removed from the profile.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s billing address.

If this field is not submitted in the request, or is submitted with a blank value, the original value will be removed from the profile.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

For international payment processors, use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
payment This element contains payment information.

Use creditCard if you have payment card information. Use bankAccount if you have bank account information. Use opaqueData if you have encrypted payment data from Accept. Do not include more than one option per request.
creditCard Contains credit card payment information for the payment profile.

This parameter and its children are required only when the payment profile is credit card.
cardNumber The customer’s credit card number.

If the value is masked, the last four digits must match the original value in the profile.

If a masked value is submitted, the original value will not be updated.
String, 13 to 16 characters. Masked card numbers accepted.

For example, 4111111111111111 or XXXX1234.
expirationDate The expiration date for the customer’s credit card.

If a masked value is submitted, the original value will not be updated.
String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting. For masked expiration dates, use XXXX.

For example, 2025-12 or XXXX.
cardCode The customer’s card code.

The three- or four-digit number on the back of a credit card (on the front for American Express).

This element is required if the merchant would like to use the Card Code Verification (CCV) security feature.

cardCode is only used for validation and is not stored in the customer profile. It should only be used when submitting validationMode with a value of testMode or liveMode.
Numeric string, 3 to 4 characters.

bankAccount Conditional.
Applies to eCheck.Net transactions only. Used to submit bank account information. If this element is sent, its child elements are required.

For more details please see the eCheck.Net API Documentation.
accountType The type of bank account used for the eCheck.Net transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either checking, savings, or businessChecking.

routingNumber The ABA routing number.

Numeric string, up to 9 digits.

accountNumber The bank account number.

Numeric string, up to 17 digits.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

The value of accountType must be valid for the echeckType value submitted.

For more details please see the eCheck.Net API Documentation.
String.

Either PPD, WEB, CCD, TEL, ARC, or BOC.

bankName The name of the bank.

String, up to 50 characters.

opaqueData Required.
Contains dataDescriptor and dataValue.

dataDescriptor Required.
Specifies how the request should be processed.

The value of dataDescriptor is based on the source of the value of dataValue.
String, 128 characters.

Use COMMON.ACCEPT.INAPP.PAYMENT for Accept transactions.

dataValue Required.
Base64 encoded data that contains encrypted payment data.

The payment gateway expects the encrypted payment data and meta data for the encryption keys.
String, 8192 characters.

defaultPaymentProfile When set to true, this field designates the payment profile as the default payment profile.

When a default payment profile has been designated, you can use getCustomerPaymentProfileRequest with customerProfileId as the only parameter.
Boolean.

Either true or false.

excludeFromAccountUpdater Indicates whether the payment profile should be excluded from Account Updater updates.

Only to be used by merchants with the Account Updater service.
Boolean.

Either true or false.

customerPaymentProfileId Payment gateway-assigned ID associated with the customer payment profile.

Numeric.

validationMode Indicates the processing mode for the request. If the customer profile contains no payment data, this field should not be sent.

- liveMode: A $0 or $0.01 (depending on card type and processor) live transaction is processed against the card and then immediately voided. Address is required for cards that support $0 authorizations and will be validated along with card code if submitted.

- testMode: Card data is validated using simple mathematical checks to confirm that it appears to be valid. It is not a guarantee that the card is legitimate and customer data is not validated.
  testMode or liveMode

Response Field Description

updateCustomerPaymentProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode Ok or Error.

States whether the request was handled successfully, or ended with an error.
message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

validationDirectResponse Contains detailed information about the result of the transaction.

This output is only present if the validationMode input element is passed with a value of testMode or liveMode.
String.

defaultPaymentProfile Designates whether this payment profile is set as the default payment profile.

This is returned only if you designated this profile as the default in the request.
String.

Defaults to true.

Delete Customer Payment Profile

Use this function to delete a customer payment profile from an existing customer profile.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/delete-customer-payment-profile.js
Request Field Description

deleteCustomerPaymentProfileRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway-assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId Payment gateway assigned ID associated with the customer payment profile.

Numeric string.

Response Field Description

deleteCustomerPaymentProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

Create Customer Shipping Address

Use this function to create a new customer shipping address for an existing customer profile.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/create-customer-shipping-address.js
Request Field Description

createCustomerShippingAddressRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

address Contains shipping address information for the customer profile.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

For international payment processors, use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
defaultShippingAddress When set to true, this field designates the shipping address as the default shipping address.

When a default shipping address has been designated, you can use getCustomerShippingAddressRequest with customerProfileId as the only parameter.
Boolean.

Either true or false.

Response Field Description

createCustomerShippingAddressResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

customerShippingAddressId Payment gateway assigned ID associated with the customer shipping address.

This output is present only for successful requests.
Numeric string.

defaultPaymentProfile Designates whether this payment profile is set as the default payment profile.

This is returned only if you designated this profile as the default in the request.
String.

Defaults to true.

Get Customer Shipping Address

Use this function to retrieve the details of a customer shipping address associated with an existing customer profile.

Important: If the shipping address has previously been set as the default shipping address, you can submit this request using customerProfileId as the only parameter. Submitting this request with only the customer profile ID will cause the information for the default shipping address to be returned if a default shipping address has been previously designated. If no shipping address has been designated as the default shipping address, failing to specify a shipping address will result in an error.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/get-customer-shipping-address.js
Request Field Description

getCustomerShippingAddressRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway-assigned ID associated with the customer profile.

Numeric string.

customerAddressId Payment gateway-assigned ID associated with the customer shipping address.

Numeric string.

Response Field Description

getCustomerShippingAddressResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

defaultPaymentProfile Designates whether this payment profile is set as the default payment profile.

This is returned only if you designated this profile as the default in the request.
String.

Defaults to true.

address Contains shipping address information for the customer profile.

customerAddressId Payment gateway-assigned ID associated with the customer shipping address.

Numeric.

firstName Conditional.

First name associated with customer’s billing address.

String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

String, up to 60 characters.

city Conditional.

City of customer’s billing address.

String, up to 40 characters.

state Conditional.

State of customer’s billing address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

For international payment processors, use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
subscriptionIds Contains one or more subscriptionId fields.

subscriptionId Contains a subscription ID associated with this customer.

Numeric string.

Update Customer Shipping Address

Use this function to update a shipping address for an existing customer profile.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/update-customer-shipping-address.js
Request Field Description

updateCustomerShippingAddressRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway-assigned ID associated with the customer profile.

Numeric string.

address Contains shipping address information for the customer profile.

firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

For international payment processors, use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
customerAddressId Payment gateway-assigned ID associated with the customer shipping address.

Numeric string.

defaultShippingAddress When set to true, this field designates the shipping address as the default shipping address.

When a default shipping address has been designated, you can use getCustomerShippingAddressRequest with customerProfileId as the only parameter.
Boolean.

Either true or false.

Response Field Description

updateCustomerShippingAddressResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

defaultShippingAddress Designates whether this shipping profile is set as the default shipping profile.

This is returned only if you designated this profile as the default in the request.
String.

Defaults to true.

Delete Customer Shipping Address

Use this function to delete a customer shipping address from an existing customer profile.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/delete-customer-shipping-address.js
Request Field Description

deleteCustomerShippingAddressRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway-assigned ID associated with the customer profile.

Numeric string.

customerShippingAddressId Payment gateway-assigned ID associated with the customer shipping address.

Numeric string.

Response Field Description

deleteCustomerShippingAddressResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

Create a Customer Profile from a Transaction

This request enables you to create a customer profile, payment profile, and shipping profile from an existing successful transaction.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/CustomerProfiles/create-customer-profile-from-transaction.js
Request Field Description

createCustomerProfileFromTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transId Required.
The transaction ID for the successful transaction from which you would like to generate a customer profile.

Numeric string.

customer Contains the information for the customer profile.

At least one of the following fields must be submitted under customer: merchantCustomerId, description, or email.
merchantCustomerId Conditional.
Merchant assigned ID for the customer.

Required only when no values for description and email are submitted.
String, up to 20 characters.

description Conditional.
Description of the customer or customer profile.

Required only when no values for merchantCustomerId and email are submitted.
String, up to 255 characters.

email Conditional.
Email address associated with the customer profile.

Required when no values for description and merchantCustomerId are submitted.

Required only when using a European payment processor.
String, up to 255 characters.

customerProfileId Payment gateway assigned ID associated with the customer profile.

This output is present only for successful requests.
Numeric string.

profileType Indicates whether a profile is a guest profile.

We recommend submitting profileType only when you need a guest profile. If you do not need guest profiles, you do not need to send this element.

We retain guest profiles for 90 days after their last usage in a transaction request. If you create no more transactions using a given guest profile, we purge the guest profile from our system.
String.

Either guest or regular. Defaults to regular.

Response Field Description

createCustomerProfileResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

customerProfileId Payment gateway assigned ID associated with the customer profile.

This output is present only for successful requests.
Numeric string.

customerPaymentProfileIdList A list of all payment profile IDs created with the request.

This output is present only for requests that contain one or more payment profiles.

The payment profile IDs are returned in the same order as they were in the request.
Numeric string.

customerShippingAddressIdList A list of all shipping profile IDs created with the request.

This output is present only for requests that contain multiple shipping profiles.

The shipping profile IDs are returned in the same order as they were in the request.
Numeric string.

validationDirectResponseList A list of the direct response results for the validation transaction for each payment profile.

This output is present only if the validationMode input element is passed with a value of testMode or liveMode.

The list is returned in the same order as the payment profiles were submitted in the request.
String.

Transaction Reporting

You can use this feature of the Authorize.net API to access transaction history and details. For more information about transaction reporting, see the Transaction Reporting developer guide.
Get Settled Batch List

This function returns Batch ID, Settlement Time, & Settlement State for all settled batches with a range of dates. If includeStatistics is true, you also receive batch statistics by payment type and batch totals. All input parameters other than merchant authentication are optional. If no dates are specified, then the default is the past 24 hours, ending at the time of the call to getSettledBatchListRequest.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/TransactionReporting/get-settled-batch-list.js
Request Field Description

getSettledBatchListRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

includeStatistics Include statistics for the batches.

If includeStatistics is true, then statistics are included for the entire range, including the first and last settlement dates.
Boolean.

Either true or false. Defaults to false.

firstSettlementDate Use this field to query against an inclusive range of dates other than the past 24 hrs.

The time between firstSettlementDate and lastSettlementDate, inclusively, cannot exceed 31 days.

We will use the merchant time zone by default. To update the time zone, log in to the Merchant Interface and click Account > Settings > Time Zone.

Unless you specify UTC, we will take the merchant time zone into consideration when calculating the batch date range

firstSettlementDate cannot precede January 1, two years before the current year. For example, if the current date is September 1, 2010, firstSettlementDate must be January 1, 2008 or later.
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

Defaults to the merchant's time zone if configured in the Merchant Interface. If not configured, defaults to Mountain Time (UTC-7). For UTC, append a Z after the time.

lastSettlementDate Use this field to query against an inclusive range of dates other than the past 24 hrs.

The time between firstSettlementDate and lastSettlementDate, inclusively, cannot exceed 31 days.

We will use the merchant time zone by default. To update the time zone, log in to the Merchant Interface and click Account > Settings > Time Zone.

Unless you specify UTC, we will take the merchant time zone into consideration when calculating the batch date range

If lastSettlementDate specifies a time of 00:00:00, we will include batches settled on that date, regardless of when they settled.
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

Defaults to the merchant's time zone if configured in the Merchant Interface. If not configured, defaults to Mountain Time (UTC-7). For UTC, append a Z after the time.

Response Field Description

getSettledBatchListResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

batchList Contains information for all batches

The batch list is sorted by batch id in ascending order.
batch Contains information specific to one batch.

batchId The identification number for the batch.

Numeric string.

settlementTimeUTC Date and time when the batch was settled, expressed in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

settlementTimeLocal Date and time when the batch was settled, expressed in merchant’s local time zone.

This element returns the time in the merchant time zone as set in the Merchant Interface.

To update the time zone, log in to the Merchant Interface and click Account > Settings > Time Zone.
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

settlementState Status of the batch.

String.

Either settledSuccessfully, settlementError, or pendingSettlement.

paymentMethod Indicates whether the batch contains credit card transactions or eCheck.Net transactions.

Since credit cards and electronic checks have different settlement and clearance processes, we create separate batches for credit card transactions and eCheck.Net transactions.
String.

Either creditCard or eCheck.

marketType The market type of the batch.

Since e-commerce, MOTO, and retail transactions have different processing rules, we create separate batches for e-commerce transactions, MOTO transactions, and retail transactions.
String.

Either eCommerce, MOTO, or Retail

product Indicates whether the card was present for the transaction.

String.

Either Card Present or Card Not Present.

statistics Contains one or more statistic elements.

statistic One statistic element is returned for each accountType.

Returned only if the value of includeStatistics is true. The specific fields depend on the value of accountType.

Please note that PayPal batches do not currently return accountType in their statistic element.
accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

chargeAmount The total charge amount for the specified accountType in a batch, expressed in the merchant's default currency.

Decimal.

chargeCount The number of charge transactions for the specified accountType in a batch.

Integer.

refundAmount The total refund amount for the specified accountType in a batch, expressed in the merchant's default currency.

Decimal.

refundCount The number of refund transactions for the specified accountType in a batch.

Integer.

voidCount The number of voided transactions for the specified accountType in a batch.

Integer.

declineCount The number of declined transactions for the specified accountType in a batch.

Integer.

errorCount The number of errored transactions for the specified accountType in a batch.

Integer.

returnedItemAmount The total amount of returned eCheck.Net transactions in a batch, expressed in the merchant's default currency.

Decimal.

returnedItemCount The number of returned eCheck.Net transactions in a batch.

Integer.

chargebackAmount The total amount of chargeback eCheck.Net transactions in a batch, expressed in the merchant's default currency.

Decimal.

chargebackCount The number of chargeback eCheck.Net transactions in a batch.

Integer.

correctionNoticeCount The number of Notices of Change received for eCheck.Net transactions in a batch.

Integer.

chargeChargeBackAmount The total amount of charge eCheck.Net transactions charged back in a batch, expressed in the merchant's default currency.

Decimal.

chargeChargeBackCount The number of charge eCheck.Net transactions charged back in a batch.

Integer.

refundChargeBackAmount The total amount of refund eCheck.Net transactions charged back in a batch, expressed in the merchant's default currency.

Decimal.

refundChargeBackCount The number of refund eCheck.Net transactions charged back in a batch.

Integer.

chargeReturnedItemsAmount The total amount of returned charge eCheck.Net transactions in a batch, expressed in the merchant's default currency.

Decimal.

chargeReturnedItemsCount The number of returned charge eCheck.Net transactions in a batch.

Integer.

refundReturnedItemsAmount The total amount of returned refund eCheck.Net transactions in a batch, expressed in the merchant's default currency.

Decimal.

refundReturnedItemsCount The number of returned refund eCheck.Net transactions in a batch.

Integer.

Get Transaction List

Use this function to return data for all transactions in a specified batch. The function will return data for up to 1000 of the most recent transactions in a single request. Paging options can be sent to limit the result set or to retrieve additional transactions beyond the 1000 transaction limit. No input parameters are required other than the authentication information and a batch ID. However, you can add the sorting and paging options shown below to customize the result set.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/TransactionReporting/get-transaction-list.js
Request Field Description

getTransactionListRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

batchId The identification number for the batch.

Numeric string.

sorting Contains sorting information.

orderBy Order of transactions in response.

String.

Use id to sort by transaction ID. Use submitTimeUTC to sort by transaction submission time, in UTC.

orderDescending Sort the transactions in descending order.

Boolean.

Either true or false.

paging Contains paging information.

limit The number of transactions per page.

You can request up to 1000 transactions per page of results.
Decimal, between 1 and 1000.

offset The number of the page to return results from.

For example, if you use a limit of 100, setting offset to 1 will return the first 100 transactions, setting offset to 2 will return the second 100 transactions, and so forth.
Decimal, between 1 and 100000.

Response Field Description

getTransactionListResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactions Contains information about all transactions.

transaction Contains information about one transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

submitTimeUTC Date and time the transaction was submitted, expressed in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

submitTimeLocal Date and time the transaction was submitted, in the merchant's time zone.

This element uses the merchant's time zone as configured in the Merchant Interface. If unconfigured, defaults to Mountain Time (UTC-7).
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

transactionStatus The status of the transaction.

String.

One of:
authorizedPendingCapture
capturedPendingSettlement
communicationError
refundSettledSuccessfully
refundPendingSettlement
approvedReview
declined
couldNotVoid
expired
generalError
failedReview
settledSuccessfully
settlementError
underReview
voided
FDSPendingReview
FDSAuthorizedPendingReview
returnedItem

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String. 20-character maximum.

firstName Conditional.

First name associated with customer’s billing address.

String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

String, up to 50 characters.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

accountNumber The masked card number or bank account number used for the transaction.

String.

For example, XXXX1234.
settleAmount The amount that was submitted for settlement.

Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
hasReturnedItems Indicates that this transaction contains returned eCheck.Net transactions.

More detailed information can be seen by calling getTransactionDetailsResponse for the transaction.
Boolean.

Either true or false.

subscription Contains subscription information.

id The subscription ID.

Numeric string.

payNum Identifies the number of this transaction, in terms of how many transactions have been submitted for this subscription.

For example, the third transaction processed for this subscription will return payNum set to 3.
Numeric string, between 1 and 999.

profile Conditional.

Contains customer profile information used for this transaction.

The element only appears if you use a customer profile to generate the transaction.
customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId The ID of the customer payment profile used to create this payment transaction.

Numeric string.

hasReturnedItems Indicates that this transaction contains returned items.

This element is used only for eCheck.Net transactions.

For details on the returned items, use getTransactionDetailsResponse.
Boolean.

Either true or false.

marketType The market type for the transaction.

String.

Either eCommerce, MOTO, or Retail.

product Indicates whether the card was present for the transaction.

String.

Either Card Not Present or Card Present.

mobileDeviceId The unique identifier of the mobile device.

String, up to 60 characters.

totalNumInResultSet Shows the number of results for this request.

Numeric string.

Get Unsettled Transaction List

Use this function to get data for unsettled transactions. The function will return data for up to 1000 of the most recent transactions in a single request. Paging options can be sent to limit the result set or to retrieve additional transactions beyond the 1000 transaction limit. No input parameters are required other than the authentication information. However, you can add the sorting and paging options shown below to customize the result set.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/TransactionReporting/get-unsettled-transaction-list.js
Request Field Description

getUnsettledTransactionListRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

sorting Contains sorting information.

orderBy Order of transactions in response.

String.

Use id to sort by transaction ID. Use submitTimeUTC to sort by transaction submission time, in UTC.

orderDescending Sort the transactions in descending order.

Boolean.

Either true or false.

paging Contains paging information.

limit The number of transactions per page.

You can request up to 1000 transactions per page of results.
Decimal, between 1 and 1000.

offset The number of the page to return results from.

For example, if you use a limit of 100, setting offset to 1 will return the first 100 transactions, setting offset to 2 will return the second 100 transactions, and so forth.
Decimal, between 1 and 100000.

Response Field Description

getUnsettledTransactionListResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactions Contains information about all transactions.

transaction Contains information about one transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

submitTimeUTC Date and time the transaction was submitted, expressed in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

submitTimeLocal Date and time the transaction was submitted, in the merchant's time zone.

This element uses the merchant's time zone as configured in the Merchant Interface. If unconfigured, defaults to Mountain Time (UTC-7).
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

transactionStatus The status of the transaction.

String.

One of:
authorizedPendingCapture
capturedPendingSettlement
communicationError
refundSettledSuccessfully
refundPendingSettlement
approvedReview
declined
couldNotVoid
expired
generalError
failedReview
settledSuccessfully
settlementError
underReview
voided
FDSPendingReview
FDSAuthorizedPendingReview
returnedItem

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String. 20-character maximum.

firstName Conditional.

First name associated with customer’s billing address.

String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

String, up to 50 characters.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

accountNumber The masked card number or bank account number used for the transaction.

String.

For example, XXXX1234.
settleAmount The amount that was submitted for settlement.

Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
hasReturnedItems Indicates that this transaction contains returned eCheck.Net transactions.

More detailed information can be seen by calling getTransactionDetailsResponse for the transaction.
Boolean.

Either true or false.

subscription Contains subscription information.

id The subscription ID.

Numeric string.

payNum Identifies the number of this transaction, in terms of how many transactions have been submitted for this subscription.

For example, the third transaction processed for this subscription will return payNum set to 3.
Numeric string, between 1 and 999.

marketType The market type for the transaction.

String.

Either eCommerce, MOTO, or Retail

product Indicates whether the card was present for the transaction.

String.

Either Card Not Present or Card Present.

mobileDeviceId The unique identifier of the mobile device.

String, up to 60 characters.

profile Contains customer profile information used for this transaction.

customerProfileId The ID number associated with the customer profile.

Numeric string.

customerPaymentProfileId The ID of the customer payment profile used to charge this transaction.

Numeric string.

totalNumInResultSet Shows the number of results for this request.

Numeric string.

Get Customer Profile Transaction List

Use this method to retrieve transactions for a specific customer profile or customer payment profile. The function will return data for up to 1000 of the most recent transactions in a single request. Paging options can be sent to limit the result set or to retrieve additional transactions beyond the 1000 transaction limit. If no customer payment profile is supplied then this function will return transactions for all customer payment profiles associated with the specified customer profile. This allows you to retrieve all transactions for that customer regardless of card type (such as Visa or Mastercard) or payment type (such as credit card or bank account). You can add the sorting and paging options shown below to customize the result set.

Important:The proper response to getTransactionListForCustomerRequest is getTransactionListResponse. Failure to observe this behavior may cause parsing issues.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/TransactionReporting/get-customer-profile-transaction-list.js
Request Field Description

getTransactionListForCustomerRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileIdList A list of all payment profile IDs created with the request.

The payment profile IDs are returned in the same order as they were in the request.
Numeric string.

sorting Contains sorting information.

orderBy Order of results in response.

String.

Use id to sort results by payment profile ID.

orderDescending Sort the results in descending order.

Boolean.

Either true or false.

paging Contains paging information.

limit The number of transactions per page.

You can request up to 1000 payment profiles per page of results.
Decimal, between 1 and 1000.

offset The number of the page to return results from.

For example, if you use a limit of 100, setting offset to 1 will return the first 100 profiles, setting offset to 2 will return the second 100 profiles, and so forth.
Decimal, between 1 and 100000.

Response Field Description

getTransactionListResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactions Contains information about all transactions.

transaction Contains information about one transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

submitTimeUTC Date and time the transaction was submitted, expressed in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

submitTimeLocal Date and time the transaction was submitted, in the merchant's time zone.

This element uses the merchant's time zone as configured in the Merchant Interface. If unconfigured, defaults to Mountain Time (UTC-7).
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

transactionStatus The status of the transaction.

String.

One of:
authorizedPendingCapture
capturedPendingSettlement
communicationError
refundSettledSuccessfully
refundPendingSettlement
approvedReview
declined
couldNotVoid
expired
generalError
failedReview
settledSuccessfully
settlementError
underReview
voided
FDSPendingReview
FDSAuthorizedPendingReview
returnedItem

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String. 20-character maximum.

firstName Conditional.

First name associated with customer’s billing address.

String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

String, up to 50 characters.

accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

accountNumber The masked card number or bank account number used for the transaction.

String.

For example, XXXX1234.
settleAmount The amount that was submitted for settlement.

Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
hasReturnedItems Indicates that this transaction contains returned eCheck.Net transactions.

More detailed information can be seen by calling getTransactionDetailsResponse for the transaction.
Boolean.

Either true or false.

subscription Contains subscription information.

id The subscription ID.

Numeric string.

payNum Identifies the number of this transaction, in terms of how many transactions have been submitted for this subscription.

For example, the third transaction processed for this subscription will return payNum set to 3.
Numeric string, between 1 and 999.

profile Conditional.

Contains customer profile information used for this transaction.

The element only appears if you use a customer profile to generate the transaction.
customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

customerPaymentProfileId The ID of the customer payment profile used to create this payment transaction.

Numeric string.

hasReturnedItems Indicates that this transaction contains returned items.

This element is used only for eCheck.Net transactions.

For details on the returned items, use getTransactionDetailsResponse.
Boolean.

Either true or false.

marketType The market type for the transaction.

String.

Either eCommerce, MOTO, or Retail.

product Indicates whether the card was present for the transaction.

String.

Either Card Not Present or Card Present.

mobileDeviceId The unique identifier of the mobile device.

String, up to 60 characters.

totalNumInResultSet Shows the number of results for this request.

Numeric string.

Get Transaction Details

Use this function to get detailed information about a specific transaction.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/TransactionReporting/get-transaction-details.js
Request Field Description

getTransactionDetailsRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

Response Field Description

getTransactionDetailsResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to six characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

transaction Contains information about the transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of the original transaction.

This appears only for linked credits (transaction type refundTransaction).
Numeric string.

splitTenderId Identifies the split tender order, if applicable.

This appears only for transactions that are part of a split tender purchase.
Numeric string.

submitTimeUTC Date and time the transaction was submitted, expressed in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

submitTimeLocal Date and time the transaction was submitted, in the merchant's time zone.

This element uses the merchant's time zone as configured in the Merchant Interface. If unconfigured, defaults to Mountain Time (UTC-7).
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

transactionType The type of transaction that was originally submitted.

String.

Either authCaptureTransaction, authOnlyTransaction, captureOnlyTransaction, or refundTransaction.

transactionStatus The status of the transaction.

String.

One of:
authorizedPendingCapture
capturedPendingSettlement
communicationError
refundSettledSuccessfully
refundPendingSettlement
approvedReview
declined
couldNotVoid
expired
generalError
failedReview
settledSuccessfully
settlementError
underReview
voided
FDSPendingReview
FDSAuthorizedPendingReview
returnedItem

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

responseReasonCode A code that represents more details about the result of the transaction.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
Numeric string.

responseReasonDescription A brief explanation of the responseReasonCode.

String.

authCode The authorization code granted by the card issuing bank for this transaction.

String, 6 characters.

AVSResponse Address Verification Service (AVS) response code.

String, 1 character.

One of the following:

A -- The street address matched, but the postal code did not.
B -- No address information was provided.
E -- The AVS check returned an error.
G -- The card was issued by a bank outside the U.S. and does not support AVS.
N -- Neither the street address nor postal code matched.
P -- AVS is not applicable for this transaction.
R -- Retry — AVS was unavailable or timed out.
S -- AVS is not supported by card issuer.
U -- Address information is unavailable.
W -- The US ZIP+4 code matches, but the street address does not.
X -- Both the street address and the US ZIP+4 code matched.
Y -- The street address and postal code matched.
Z -- The postal code matched, but the street address did not.

cardCodeResponse Card code verification (CCV) response code.

String, 1 character.

One of the following:

M -- CVV matched.
N -- CVV did not match.
P -- CVV was not processed.
S -- CVV should have been present but was not indicated.
U -- The issuer was unable to process the CVV check.

CAVVResponse Cardholder authentication verification response code.

Important: Mastercard transactions always return a null result for this element. Consequently, transaction details for Mastercard transactions do not contain CAVV results.
String, 1 character.

One of the following:

Blank or not present -- CAVV not validated.
0 -- CAVV was not validated because erroneous data was submitted.
1 -- CAVV failed validation.
2 -- CAVV passed validation.
3 -- CAVV validation could not be performed; issuer attempt incomplete.
4 -- CAVV validation could not be performed; issuer system error.
5 -- Reserved for future use.
6 -- Reserved for future use.
7 -- CAVV failed validation, but the issuer is available. Valid for U.S.-issued card submitted to non-U.S acquirer.
8 -- CAVV passed validation and the issuer is available. Valid for U.S.-issued card submitted to non-U.S. acquirer.
9 -- CAVV failed validation and the issuer is unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
A -- CAVV passed validation but the issuer unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
B -- CAVV passed validation, information only, no liability shift.

FDSFilterAction The action applied to the transaction by the merchant's Advanced Fraud Detection Suite settings.

When multiple filters apply to a transaction, we will take the most restrictive action. For example, if a transaction triggers two AFDS filters, and one filter returns hold while the other filter returns reject, we will reject the transaction instead of holding it.
String.

One of:
reject
decline
hold
authAndHold
report

FDSFilters Contains information for any fraud filters that have been applied.

Since one transaction may trigger more than one filter, you will receive each filter that the transaction triggered, along with the action specified by the filter.
FDSFilter Contains information for one fraud filter.

name Name of the fraud filter.

String.

action The setting for the filter.

String.

One of:
reject
decline
hold
authAndHold
report

order Contains information about the transaction.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String, up to 20 characters.

description Description of the item purchased.

String, up to 255 characters.

purchaseOrderNumber The merchant-assigned purchase order number.

String, up to 25 characters.

requestedAmount Amount requested in original authorization.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.

authAmount The amount authorized or refunded by the original transaction..

Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.

settleAmount The amount that was submitted for settlement.

This will equal the value of authAmount in most cases. For voided transactions, we will return a value of "0.00". For transactions captured after an intitial authOnlyTransaction request, the value may be less than authAmount if the full amount wasn't captured.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.

batch Contains information about the batch if the transaction is settled. This will not be present for unsettled transactions.

batchId The identification number for the batch.

Numeric string.

settlementTimeUTC Date and time when the batch was settled, expressed in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

settlementTimeLocal Date and time when the batch was settled, expressed in merchant’s local time zone.

This element returns the time in the merchant time zone as set in the Merchant Interface.

To update the time zone, log in to the Merchant Interface and click Account > Settings > Time Zone.
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

settlementState Status of the batch.

String.

Either settledSuccessfully, settlementError, or pendingSettlement.

tax Contains information about applicable taxes.

amount Amount of tax.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of tax.

String, up to 31 characters.

description Description of tax.

String, up to 255 characters.

duty Contains information about any duty applied.

amount Amount of duty.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of duty.

String, up to 31 characters.

description Description of duty.

String, up to 255 characters.

shipping Items in this element describe shipping charges applied.

amount Amount of the shipping charges.

The total transaction amount must include this value.
Decimal, up to four decimal places.

name Name of the shipping charges.

String, up to 31 characters.

description Description of the shipping charges.

String, up to 255 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

prepaidBalanceRemaining The amount remaining on the prepaid card at the time of the transaction.

This element is provided only for prepaid card transactions.
Decimal, up to four decimal places.

taxExempt Indicates whether the item is tax exempt.

Boolean.

Either true or false.

payment This element contains payment information.

creditCard This element is not returned if payment was by bank account.

cardNumber The masked card number used for the transaction.

String.

expirationDate The masked expiration date for the card.

String.

cardType Type of credit card.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

bankAccount This element is not returned if payment was by credit card.

routingNumber The masked ABA routing number.

String, 8 characters.

accountNumber The masked bank account number.

String, 8 characters.

nameOnAccount Name of the person who holds the bank account.

String, up to 22 characters.

echeckType The type of eCheck transaction.

String.

Either PPD, WEB, CCD, TEL, ARC, or BOC.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

billTo Contains the billing address information.

firstName The first name associated with the customer's billing address.

String, up to 50 characters.

lastName The last name associated with the customer's billing address.

String, up to 50 characters.

company The company name associated with the customer's billing address.

String, up to 50 characters.

address The customer's billing address.

String, up to 60 characters.

city The city of the customer's billing address.

String, up to 40 characters.

state The state or province of the customer's billing address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code for the customer's billing address.

String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

shipTo Contains the shipping address information.

firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

recurringBilling Indicates whether or not this is a recurring transaction.

Boolean.

Either true or false.

returnedItems This element is a container for one or more returnedItem fields. Applies only to eCheck.Net transactions.

returnedItem Contains fields that contain returned item information.

id Transaction ID.

Numeric string.

dateUTC Date and time the item was returned, in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

dateLocal Date and time the item was returned, in the merchant's time zone.

This element uses the merchant's time zone as configured in the Merchant Interface. If unconfigured, defaults to Mountain Time (UTC-7).
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

code The ACH return code.

To view a list of return codes, see our Testing Guide.
String.

description A text description of the reason for the return.

String.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

name The name of the solution which submitted this transaction.

See the Solution ID Implementation Guide for details.
String, up to 255 characters.

vendorName The name of the vendor which created the solution.

See the Solution ID Implementation Guide for details.
String

customerIP The IPv4 address of the customer initiating the transaction. Defaults to 255.255.255.255 if not included in your request.

Required only when the merchant is using customer IP based AFDS filters.
String, up to 15 characters.

Use dot-decimal formatting.

networkTransId The network transaction ID generated by the card network if made available by the processor.

Alphanumeric string, 255 characters or fewer.

originalNetworkTransId The network transaction ID returned in response to the original card-on-file transaction.

Store the networkTransId value received in the original card-on-file transaction response. Set the originalNetworkTransId to the original networkTransId value for all subsequent authorizations against the same card-on-file.
Alphanumeric string, 255 characters or fewer.

originalAuthAmount The authorized amount for the original card-on-file transaction.

Store the amount of the original card-on-file transaction response. Set the originalAuthAmount to the original amount value for all subsequent authorizations against the same card-on-file.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

authorizationIndicator Indicates whether the authorization was a pre-authorization or final authorization.

Applicable to Mastercard only. Use pre for initial authorizations, for example, prior to tips. Use final for final authorizations, for example, including tips.
String.

Either pre or final.

subscription Contains subscription information.

id The subscription ID.

Numeric string.

payNum Identifies the number of this transaction, in terms of how many transactions have been submitted for this subscription.

For example, the third transaction processed for this subscription will return payNum set to 3.
Numeric string, between 1 and 999.

marketType The market type of the transaction.

String.

Either eCommerce, MOTO, or Retail.

product Indicates whether the card was present for the transaction.

String.

Either Card Not Present or Card Present.

mobileDeviceId The unique identifier of the mobile device.

String, up to 60 characters.

profile Contains customer profile information used for this transaction.

customerProfileId The ID number associated with the customer profile.

Numeric string.

customerPaymentProfileId The ID of the customer payment profile used to charge this transaction.

Numeric string.

clientId The name of the SDK used to generate the transaction, if using an SDK.

String.

transrefId Merchant-assigned reference ID for the request.

If your request included refId, we will return the value in transrefId. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

Get Batch Statistics

A call to getBatchStatisticsRequest returns statistics for a single batch, specified by the batch ID.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/TransactionReporting/get-batch-statistics.js
Request Field Description

getBatchStatisticsRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

batchId The identification number for the batch.

Numeric string.

Response Field Description

getBatchStatisticsResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to six characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

batch Contains information specific to one batch.

batchId The identification number for the batch.

Numeric string.

settlementTimeUTC Date and time when the batch was settled, expressed in UTC.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

settlementTimeLocal Date and time when the batch was settled, expressed in merchant’s local time zone.

This element returns the time in the merchant time zone as set in the Merchant Interface.

To update the time zone, log in to the Merchant Interface and click Account > Settings > Time Zone.
String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

settlementState Status of the batch.

String.

Either settledSuccessfully, settlementError, or pendingSettlement.

paymentMethod Indicates whether the batch contains credit card transactions or eCheck.Net transactions.

Since credit cards and electronic checks have different settlement and clearance processes, we create separate batches for credit card transactions and eCheck.Net transactions.
String.

Either creditCard or eCheck.

marketType The market type of the batch.

Since e-commerce, MOTO, and retail transactions have different processing rules, we create separate batches for e-commerce transactions, MOTO transactions, and retail transactions.
eCommerce, MOTO, or Retail

product Indicates whether the card was present for the transaction.

String.

Either Card Present or Card Not Present.

statistics Contains one or more statistic elements.

statistic One statistic element is returned for each accountType.

Returned only if the value of includeStatistics is true. The specific fields depend on the value of accountType.

Please note that PayPal batches do not currently return accountType in their statistic element.
accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

chargeAmount The total charge amount for the specified accountType in a batch, expressed in the merchant's default currency.

Decimal.

chargeCount The number of charge transactions for the specified accountType in a batch.

Integer.

refundAmount The total refund amount for the specified accountType in a batch, expressed in the merchant's default currency.

Decimal.

refundCount The number of refund transactions for the specified accountType in a batch.

Integer.

voidCount The number of voided transactions for the specified accountType in a batch.

Integer.

declineCount The number of declined transactions for the specified accountType in a batch.

Integer.

errorCount The number of errored transactions for the specified accountType in a batch.

Integer.

returnedItemAmount The total amount of returned eCheck.Net transactions in a batch, expressed in the merchant's default currency.

Decimal.

returnedItemCount The number of returned eCheck.Net transactions in a batch.

Integer.

chargebackAmount The total amount of chargeback eCheck.Net transactions in a batch, expressed in the merchant's default currency.

Decimal.

chargebackCount The number of chargeback eCheck.Net transactions in a batch.

Integer.

correctionNoticeCount The number of Notices of Change received for eCheck.Net transactions in a batch.

Integer.

chargeChargeBackAmount The total amount of charge eCheck.Net transactions charged back in a batch, expressed in the merchant's default currency.

Decimal.

chargeChargeBackCount The number of charge eCheck.Net transactions charged back in a batch.

Integer.

refundChargeBackAmount The total amount of refund eCheck.Net transactions charged back in a batch, expressed in the merchant's default currency.

Decimal.

refundChargeBackCount The number of refund eCheck.Net transactions charged back in a batch.

Integer.

chargeReturnedItemsAmount The total amount of returned charge eCheck.Net transactions in a batch, expressed in the merchant's default currency.

Decimal.

chargeReturnedItemsCount The number of returned charge eCheck.Net transactions in a batch.

Integer.

refundReturnedItemsAmount The total amount of returned refund eCheck.Net transactions in a batch, expressed in the merchant's default currency.

Decimal.

refundReturnedItemsCount The number of returned refund eCheck.Net transactions in a batch.

Integer.

Get Merchant Details

Call this function and supply your authentication information to receive merchant details in the response. The information that is returned is helpful for OAuth and Accept integrations.

Generate a PublicClientKey only if one is not generated or is not active. Only the most recently generated active key is returned.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/TransactionReporting/get-merchant-details.js
Request Field Description

getMerchantDetailsRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

Response Field Description

getMerchantDetailsResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

text Text explanation of the code for the result.

String.

isTestMode Indicates whether the account is set to Test Mode.

Test Mode simulates transaction activity without actually submitting transactions to the merchant's processor for authorization or settlement. We do not record transaction requests submitted in Test Mode.
Boolean.

Either true or false.

processors Contains all processors configured on a merchant's account.

processor Contains information about one processor.

name Name of the processor.

String, up to 255 characters.

merchantName Merchant's name, as recorded by the merchant account.

String.

gatewayId The ID of the gateway account.

Use gatewayId to identify a specific payment gateway account.
Numeric string.

marketTypes Contains marketType information.

marketType The market type for the transaction.

String.

Either eCommerce, MOTO, or Retail

productCodes Contains productCode information.

productCode Indicates whether the account supports card present transactions.

String.

Either CP (Card Present), or CNP (Card Not Present).

paymentMethods The payment methods enabled on the payment gateway. Contains one or more paymentMethod fields.

paymentMethod One of the payment methods enabled on the payment gateway.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, EnRoute, Paypal, VisaCheckout, ApplePay, AndroidPay, GooglePay, or Echeck.

currencies The currencies enabled on the payment gateway. Contains one or more currency fields.

currency String, three letters.

Uses ISO 4217 currency codes.

publicClientKey This is the value of the merchant's public client key.

String.

businessInformation Contains geographical information about the merchant.

company Name of the merchant's company.

String.

address Address of the merchant.

String.

city City of the merchant.

String.

zip ZIP code of the merchant.

String.

country Country of the merchant.

String.

phoneNumber Country of the merchant.

String.

merchantTimeZone Time zone of the merchant.

String.

Use the IANA Time Zone Database name format. For example:

America/Los_Angeles

contactDetails Contains one or more contactDetail. See below.

contactDetail Contains first name, last name, and email address of the contact. There can be multiple contactDetail elements in contactDetails.

email Email address of the contact.

String.

fisrtName First name of the contact.

String.

lastName Last name of the contact.

String.

Get Account Updater Job Summary

Use this function to get a summary of the results of the Account Updater process for a particular month.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/TransactionReporting/get-account-updater-job-summary.js
Request Field Description

getAUJobSummaryRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

month Required.
The month in which the Account Updater process was run.

String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

Response Field Description

getAUJobSummaryResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

auSummary Contains one or more auResponse elements, each containing a summary of a specific reason for update or deletion.

auResponse Contains a summary of cards updated or deleted for one specific reason.

auReasonCode A code representing the reason for the card update or deletion.

String.

Either NAN (New Account Number), NED (New Expiration Date), ACL (Account Closed), or CCH (Contact Cardholder).

profileCount The number of payment profiles (for example, individual cards) that were updated or deleted for this specific reason code.

Numeric string.

reasonDescription A description of the auReasonCode.

String.

Either NewAccountNumber, NewExpirationDate, AccountClosed, or ContactCardholder.

Get Account Updater Job Details

Use this function to get details of each card updated or deleted by the Account Updater process for a particular month. The function will return data for up to 1000 of the most recent transactions in a single request. Paging options can be sent to limit the result set or to retrieve additional transactions beyond the 1000 transaction limit. No input parameters are required other than the authentication information and a batch ID. However, you can add the sorting and paging options shown below to customize the result set.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/TransactionReporting/get-account-updater-job-details.js
Request Field Description

getAUJobDetailsRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

month Required.
The month in which the Account Updater process was run.

String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

modifiedTypeFilter Optional.
Filter the results to to include only updates, only deletes, or all changes.

String.

Either all, updates, or deletes.

paging Contains paging information.

limit The number of transactions per page.

You can request up to 1000 transactions per page of results.
Decimal, between 1 and 1000.

offset The number of the page to return results from.

For example, if you use a limit of 100, setting offset to 1 will return the first 100 transactions, setting offset to 2 will return the second 100 transactions, and so forth.
Decimal, between 1 and 100000.

Response Field Description

getAUJobDetailsResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

totalNumInResultSet Shows the number of results for this request.

Numeric string.

auDetails Contains one or more auUpdate or auDelete fields, each containing details of a specific update or deletion.

auUpdate Contains sub-elements with details for a card that was updated.

customerProfileId The ID of the customer profile containing the payment profile that was updated.

Numeric string.

customerPaymentProfileId The ID of the specific customer payment profile (for example, a credit card) that was updated.

Numeric string.

firstName Customer's first name.

String, up to 50 characters.

lastName Customer's last name.

String, up to 50 characters.

updateTimeUTC The time in UTC that the card was updated.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

auReasonCode A code representing the reason for the card update or deletion.

String.

Either NAN (New Account Number), NED (New Expiration Date), ACL (Account Closed), or CCH (Contact Cardholder).

reasonDescription A description of the auReasonCode.

String.

Either NewAccountNumber, NewExpirationDate, AccountClosed, or ContactCardholder.

newCreditCard Container element that contains information about the new card.

cardNumber A masked version of the card number showing the last four digits.

String.

For example, XXXX1234.

expirationDate The card's expiration date.

String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

oldCreditCard Container element that contains information about the old card.

cardNumber A masked version of the card number showing the last four digits.

String.

For example, XXXX1234.

expirationDate The card's expiration date.

String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

auDelete Contains sub-elements with details for a card that was deleted.

customerProfileId The ID of the customer profile containing the payment profile that was updated.

Numeric string.

customerPaymentProfileId The ID of the specific customer payment profile (for example, a credit card) that was updated.

Numeric string.

firstName Customer's first name.

String, up to 50 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

lastName Customer's last name.

String, up to 50 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

updateTimeUTC The time in UTC that the card was updated.

String.

Use XML dateTime (YYYY-MM-DDThh:mm:ss) formatting.

auReasonCode A code representing the reason for the card update or deletion.

String.

Either NAN (New Account Number), NED (New Expiration Date), ACL (Account Closed), or CCH (Contact Cardholder).

reasonDescription A description of the auReasonCode.

String.

Either NewAccountNumber, NewExpirationDate, AccountClosed, or ContactCardholder.

creditCard
cardNumber A masked version of the card number showing the last four digits.

String.

For example, XXXX1234.

expirationDate The card's expiration date.

String, 7 characters.

Use XML gYearMonth (YYYY-MM) formatting.

Accept Suite

Authorize.net Accept is a suite of developer tools for building websites and mobile applications without increasing PCI burden for merchants. It offers a range of integration options, including JavaScript libraries, mobile SDKs and hosted forms.
Create an Accept Payment Transaction

Use this function to create an Authorize.net payment transaction request, using the Accept Payment nonce in place of card data.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/AcceptSuite/create-an-accept-payment-transaction.js
Request Field Description

createTransactionRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest Required.
This element is a container for transaction specific information.

transactionType Type of credit card transaction.

If the value submitted does not match a supported value, the transaction is rejected.
String.

Use authCaptureTransaction to authorize and automatically capture the transaction, or use authOnlyTransaction to authorize the transaction for capture at a later time.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
payment This element contains payment information.

opaqueData Required.
Contains dataDescriptor and dataValue.

dataDescriptor Required.
Specifies how the request should be processed.

The value of dataDescriptor is based on the source of the value of dataValue.
String, 128 characters.

Use COMMON.ACCEPT.INAPP.PAYMENT for Accept transactions.

dataValue Required.
Base64 encoded data that contains encrypted payment data, known as the payment nonce. The nonce is valid for 15 minutes.

The payment gateway expects the encrypted payment data and meta data for the encryption keys.
String, 8192 characters.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

name The name is generated by the solution provider and provided to Authorize.net.

See the Solution ID Implementation Guide for details.
String, up to 255 characters.

terminalNumber The merchant's in-store terminal number. Can identify the cashiers or kiosks used.

Do not use your processor's terminal ID for this field.
String.

order Contains information about the order.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String, up to 20 characters.

description Description of the item purchased.

String, up to 255 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

For example, 5.4321.
unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

For example, 5.4321.
taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

tax Contains information about applicable taxes.

amount Amount of tax.

The total transaction amount must include this value.
Decimal, up to four decimal places.

For example, 5.4321.
name Name of tax.

String, up to 31 characters.

description Description of tax.

String, up to 255 characters.

duty Contains information about any duty applied.

amount Amount of duty.

The total transaction amount must include this value.
Decimal, up to four decimal places.

For example, 5.4321.
name Name of duty.

String, up to 31 characters.

description Description of duty.

String, up to 255 characters.

shipping Items in this element describe shipping charges applied.

amount Amount of the shipping charges.

The total transaction amount must include this value.
Decimal, up to four decimal places.

For example, 5.4321.
name Name of the shipping charges.

String, up to 31 characters.

description Description of the shipping charges.

String, up to 255 characters.

taxExempt Indicates whether or not order is exempt from tax.

Boolean.

Either true or false.

poNumber The merchant-assigned purchase order number.

If you use purchase order numbers, your solution should generate the purchase order number and send it with your transaction requests. Authorize.net does not generate purchase order numbers.
String, up to 25 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

For example, janedoe@example.com.
billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

customerIP Conditional.

The IPv4 address of the customer initiating the transaction. Defaults to 255.255.255.255 if not included in your request.

Required only when the merchant is using customer IP based AFDS filters.
String, up to 15 characters.

Use dot-decimal formatting.

For example, 255.255.255.255.
cardholderAuthentication Important: This field is deprecated and should not be used.

Merchants using a third party cardholder authentication solution can submit the following authentication values with Visa and Mastercard transactions.

Invalid combinations of card type, authenticationIndicator, and cardholderAuthenticationValue will result in Response Reason Code 118.
authenticationIndicator Conditional.

Important: This field is deprecated and should not be used.

The Electronic Commerce Indicator (ECI) value for a Visa transaction, or the Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the ECI or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of authenticationIndicator will result in Response Reason Code 116.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

cardholderAuthenticationValue Conditional.

Important: This field is deprecated and should not be used.

The Cardholder Authentication Verification Value (CAVV) for a Visa transaction, or Accountholder Authentication Value (AVV)/ Universal Cardholder Authentication Field indicator (UCAF) for a Mastercard transaction. The cardholder authentication process generates the CAVV, AAV, or UCAF value prior to submitting the transaction.

Required only for authorizationOnlyTransaction and authCaptureTransaction requests processed through 3D Secure cardholder authentication programs, such as Visa Secure or Mastercard Identity Check. When submitted with other values for transactionValue, this element is ignored.

Invalid values of cardholderAuthenticationValue will result in Response Reason Code 117.

This field is currently supported through Chase Paymentech, FDMS Nashville, Global Payments and TSYS.
String.

employeeId Merchant-assigned employee ID.

This field is required for the EVO processor, and is supported on the TSYS processor.
Numeric string, 4 digits. Defaults to 0000.

transactionSettings This element contains one or more setting elements.

setting Contains settingName and settingValue.

settingName Name of a specific setting to be modified for this transaction.

For a list of valid settingName values and their uses, please see the Transaction Settings section of the Payment Transactions page.
String.

One of the following:
allowPartialAuth
duplicateWindow
emailCustomer
headerEmailReceipt
footerEmailReceipt
recurringBilling

settingValue Indicates whether the specified setting is enabled or disabled.

For a list of permitted settingValue formats, please see the Transaction Settings section of the Payment Transactions page.
String.

Permitted values depend on the value of settingName.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

surcharge Used to record payment card surcharges that are passed along to customers. Contains an amount and a description child element.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
amount Amount of the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
description Describes the reason or details for the surcharge.

Currently supported for TSYS merchants.

For details on surcharge rules, please see Visa's merchant regulations and fees.
String, up to 255 characters.

tip The amount of the tip authorized by the cardholder.

The total transaction amount must include this value.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
Response Field Description

createTransactionResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value will be included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

transactionResponse
responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

authCode The authorization code granted by the card issuing bank for this transaction.

String, 6 characters.

avsResultCode Address Verification Service (AVS) response code.

String, 1 character.

One of the following:

A -- The street address matched, but the postal code did not.
B -- No address information was provided.
E -- The AVS check returned an error.
G -- The card was issued by a bank outside the U.S. and does not support AVS.
N -- Neither the street address nor postal code matched.
P -- AVS is not applicable for this transaction.
R -- Retry — AVS was unavailable or timed out.
S -- AVS is not supported by card issuer.
U -- Address information is unavailable.
W -- The US ZIP+4 code matches, but the street address does not.
X -- Both the street address and the US ZIP+4 code matched.
Y -- The street address and postal code matched.
Z -- The postal code matched, but the street address did not.

cvvResultCode Card code verification (CCV) response code.

String, 1 character.

One of the following:

M -- CVV matched.
N -- CVV did not match.
P -- CVV was not processed.
S -- CVV should have been present but was not indicated.
U -- The issuer was unable to process the CVV check.

cavvResultCode Cardholder authentication verification response code.

Important: Mastercard transactions always return a null result for this element. Consequently, transaction details for Mastercard transactions do not contain CAVV results.
String, 1 character.

One of the following:

Blank or not present -- CAVV not validated.
0 -- CAVV was not validated because erroneous data was submitted.
1 -- CAVV failed validation.
2 -- CAVV passed validation.
3 -- CAVV validation could not be performed; issuer attempt incomplete.
4 -- CAVV validation could not be performed; issuer system error.
5 -- Reserved for future use.
6 -- Reserved for future use.
7 -- CAVV failed validation, but the issuer is available. Valid for U.S.-issued card submitted to non-U.S acquirer.
8 -- CAVV passed validation and the issuer is available. Valid for U.S.-issued card submitted to non-U.S. acquirer.
9 -- CAVV failed validation and the issuer is unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
A -- CAVV passed validation but the issuer unavailable. Valid for U.S.-issued card submitted to non-U.S acquirer.
B -- CAVV passed validation, information only, no liability shift.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

refTransId The transaction ID of a related, previously settled transaction.

Numeric string.

transHash Payment gateway-generated MD5 hash value that can be used to authenticate the transaction response.

String.

accountNumber The masked card number or bank account number used for the transaction.

String.

For example, XXXX1234.
accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, JCB, or eCheck.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

errors This element contains one or more error elements.

error This element contains detailed information about any errors returned.

errorCode Error code returned.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

errorText Text description of error.

For a complete list of response codes, see the Response Code Tool.
String.

splitTenderPayments If the transaction was a partial authorization transaction, then the split tender payment details are contained in this element.

splitTenderPayment Contains information about one split tender transaction.

transId The Authorize.net assigned identification number for a transaction.

Use this value to reference at a later time the transaction generated by this API call. You may need the transaction ID for follow-on transactions such as credits, voids, and captures of unsettled transactions, as well as for reporting calls.
Numeric string.

responseCode The overall status of the transaction.

String.

One of the following:

1 -- Approved
2 -- Declined
3 -- Error
4 -- Held for Review

responseToCustomer The response reason code.

For a complete list of response codes, see the Response Code Tool.
Numeric string.

authCode The authorization code granted by the card issuing bank for this transaction.

String, 6 characters.

accountNumber The masked card number used for the transaction.

String.

For example, XXXX1234.
accountType The account type used for the transaction.

String.

Either Visa, Mastercard, Discover, AmericanExpress, DinersClub, or JCB.

requestedAmount Amount requested in original authorization.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

approvedAmount Amount approved.

Present if the current transaction is for a prepaid card or if a splitTenderId value was sent.
Numeric string.

balanceOnCard Balance on the debit card or prepaid card.

Can be a positive or negative number. Has a value only if the current transaction is for a prepaid card.
Numeric string.

userFields These elements may be used to pass through information, such as session IDs and order details. The merchant will receive these elements in the response, exactly as it was submitted in the request. Authorize.net will not store these values.

Do not use these fields to pass through sensitive details as doing so may be a violation of the PCI Data Security Standard.

Worldpay RAFT 610 merchants can view the first two userField elements in the Worldpay Reporting Portal.

userField The element for individual user-defined fields. Contains the name and value child elements.

Up to 20 userField elements may be submitted per request.
String.

name Name of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

value Value of the user-defined field.

User reference field provided for the merchant’s use. The merchant will receive this field in the response, exactly as it was submitted in the request. Authorize.net will not store this value.
String.

Get Accept Customer Profile Page

Use this function to initiate a request for direct access to the Authorize.net website.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/AcceptSuite/get-accept-customer-profile-page.js
Request Field Description

getHostedProfilePageRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

customerProfileId Payment gateway assigned ID associated with the customer profile.

Numeric string.

hostedProfileSettings This is an array of settings for the session (optional). For more information on these parameters, see the 'Guidelines for Parameter Setting' section in our Customer Profiles developer guide.

setting Contains settingName and settingValue.

settingName The name of the setting you wish to change.

String.

One of:
hostedProfileReturnUrl
hostedProfileReturnUrlText
hostedProfileHeadingBgColor
hostedProfilePageBorderVisible
hostedProfileIFrameCommunicatorUrl
hostedProfileValidationMode
hostedProfileBillingAddressRequired
hostedProfileCardCodeRequired
hostedProfileBillingAddressOptions
hostedProfileManageOptions

settingValue The value of the setting you wish to change.

For more information on settingValue, see the 'Guidelines for Parameter Setting' section in our Customer Profiles developer guide.
String.

Response Field Description

getHostedProfilePageResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

token An encrypted string that the merchant must include when posting to the Authorize.net web page.

If not used within 15 minutes of the original API call, the token expires.

The customer’s browser posts the token, Authorize.net validates it, and makes sure the timestamp is less than 15 minutes old.
String.

Get an Accept Payment Page

Use this function to retrieve a form token which can be used to request the Authorize.net Accept hosted payment page. For more information on using the hosted payment page, see the Accept Hosted developer guide.

    API Live Console
    PHP
    CS
    JAVA
    RUBY
    PYTHON
    NODE

Error - Cannot find: https://api.github.com/repos/AuthorizeNet/sample-code-nodejs/contents/AcceptSuite/get-an-accept-payment-page.js
Request Field Description

getHostedPaymentPageRequest
Element Description Format
merchantAuthentication Required.
Contains merchant authentication information.

name Required.
Merchant’s unique API Login ID.

The merchant API Login ID is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 25 characters.

transactionKey Required.
Merchant’s unique Transaction Key.

The merchant Transaction Key is provided in the Merchant Interface and must be stored securely.

The API Login ID and Transaction Key together provide the merchant authentication required for access to the payment gateway.
String, up to 16 characters.

refId Merchant-assigned reference ID for the request.

If included in the request, this value is included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

transactionRequest Required.
This element is a container for transaction specific information.

transactionType Required.
Type of credit card transaction.

If the value submitted does not match a supported value, the transaction is rejected.
String.

Use authCaptureTransaction to authorize and automatically capture the transaction, or use authOnlyTransaction to authorize the transaction for capture at a later time.

amount Required.
Amount of the transaction.

This is the total amount and must include tax, shipping, tips, and any other charges.
Decimal, up to 15 digits with a decimal point.

Do not use currency symbols.

For example, 8.95.
profile The following fields enable you to charge a transaction using payment or shipping profiles.

customerProfileId The ID of the customer profile.

If this value is included in the response, the customer will be able to choose saved payment methods in the payment form.
Numeric string.

solution Contains information about the software that generated the transaction.

id The unique Solution ID which you generate and associate with your solution through the Partner Interface.

See the Solution ID Implementation Guide for details.
String, up to 50 characters.

name The name is generated by the solution provider and provided to Authorize.net.

See the Solution ID Implementation Guide for details.
String, up to 255 characters.

order Contains information about the order.

invoiceNumber Merchant-defined invoice number associated with the order.

Worldpay RAFT 610 merchants can view the invoice number in the Worldpay Reporting Portal.

String, up to 20 characters.

description Description of the item purchased.

String, up to 255 characters.

lineItems Contains one or more lineItem elements, up to a maximum of 30 line items.

lineItem Contains information about one item.

itemId Item identification.

String, up to 31 characters.

name The human-readable name for the item.

String, up to 31 characters.

description A description of the item.

String, up to 255 characters.

quantity The quantity of items sold.

Decimal, up to four decimal places.

For example, 5.4321.
unitPrice The cost per unit, excluding tax, freight, and duty.

Decimal, up to four decimal places.

For example, 5.4321.
taxable Indicates whether the item is taxable.

Boolean.

Either true or false.

tax Contains information about applicable taxes.

amount Amount of tax.

The total transaction amount must include this value.
Decimal, up to four decimal places.

For example, 5.4321.
name Name of tax.

String, up to 31 characters.

description Description of tax.

String, up to 255 characters.

duty Contains information about any duty applied.

amount Amount of duty.

The total transaction amount must include this value.
Decimal, up to four decimal places.

For example, 5.4321.
name Name of duty.

String, up to 31 characters.

description Description of duty.

String, up to 255 characters.

shipping Items in this element describe shipping charges applied.

amount Amount of the shipping charges.

The total transaction amount must include this value.
Decimal, up to four decimal places.

For example, 5.4321.
name Name of the shipping charges.

String, up to 31 characters.

description Description of the shipping charges.

String, up to 255 characters.

taxExempt Indicates whether or not order is exempt from tax.

Boolean.

Either true or false.

poNumber The merchant-assigned purchase order number.

If you use purchase order numbers, your solution should generate the purchase order number and send it with your transaction requests. Authorize.net does not generate purchase order numbers.
String, up to 25 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

customer The following fields contain customer information.

type Type of customer.

String.

Either individual or business.

id The unique customer ID used to represent the customer associated with the transaction.

If you use customer IDs, your solution should generate the customer ID and send it with your transaction requests. Authorize.net does not generate customer IDs.
String, up to 20 characters.

Use alphanumeric characters only, without spaces, dashes, or other symbols.

email Conditional.

The customer’s valid email address.

Required only when using a European payment processor.

If you enable Email Receipts in the Merchant Interface, and if the email address format is valid, the customer will receive an Authorize.net generated email receipt.
String, up to 255 characters.

For example, janedoe@example.com.
billTo This element contains billing address information.

If EVO is your payment processor and you submit any of the following billTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName Conditional.

First name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

lastName Conditional.

Last name associated with customer’s billing address.

Required only when using a European payment processor.
String, up to 50 characters.

company Company associated with customer’s billing address.

String, up to 50 characters.

address Conditional.

Customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 60 characters.

city Conditional.

City of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

state Conditional.

State of customer’s billing address.

Required only when using a European payment processor.
String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip Conditional.

The postal code of customer’s billing address.

Required if merchant would like to use the Address Verification Service security feature.

Required when using GPN Canada or Worldpay Streamline Processing Platform.
String, up to 20 characters.

country Country of customer’s billing address.

String, up to 60 characters.

Use the ISO 3166 alpha-2 code for the country.

phoneNumber Phone number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
faxNumber Fax number associated with customer’s billing address.

String, up to 25 characters.

For example, (123) 555-1234.
shipTo This element contains shipping information.

If EVO is your payment processor and you submit any of the following shipTo fields, you must submit all of them.

firstName
lastName
address
city
state
zip
firstName First name associated with customer’s shipping address.

String, up to 50 characters.

lastName Last name associated with customer’s shipping address.

String, up to 50 characters.

company Company associated with customer’s shipping address.

String, up to 50 characters.

address Customer’s shipping address.

String, up to 60 characters.

city City of customer’s shipping address.

String, up to 40 characters.

state State of customer’s shipping address.

String, up to 40 characters.

For US states, use the USPS two-character abbreviation for the state.

zip The postal code of customer’s shipping address.

String, up to 20 characters.

country Country of customer’s shipping address.

String, up to 60 characters.

hostedPaymentSettings Required.
This is an array of settings for the session.

Within this element, you must also submit at least one setting. For more information on these parameters, see the 'Hosted Form Parameter Settings' section in our Accept Hosted developer guide.
setting Contains settingName and settingValue.

settingName Conditional.

One of:
hostedPaymentReturnOptions
hostedPaymentButtonOptions
hostedPaymentStyleOptions
hostedPaymentPaymentOptions
hostedPaymentSecurityOptions
hostedPaymentShippingAddressOptions
hostedPaymentBillingAddressOptions
hostedPaymentCustomerOptions
hostedPaymentOrderOptions
hostedPaymentIFrameCommunicatorUrl

String.

settingValue Parameters and values for the specific setting.

For more information on possible parameters for settingValue, see the 'Hosted Form Parameter Settings' section in our Accept Hosted developer guide.
String.

Response Field Description

getHostedPaymentPageResponse
Element Description Format
refId Merchant-assigned reference ID for the request.

If included in the request, this value will be included in the response. This feature might be especially useful for multi-threaded applications.
String, up to 20 characters.

messages This element contains a resultCode and one or more message elements.

resultCode States whether the request was handled successfully, or ended with an error.

String.

Either Ok or Error.

message Contains details about the result.

code The code number for the result.

For a comprehensive list of possible values, or to look up a returned value, see the Response Code Tool.
String, up to 6 characters.

The first character is either an I for informational responses, or E for error responses. The remaining characters are numeric and indicate the type of informational or error response.

For example, I00001 or E00001.
text Text explanation of the code for the result.

String.

token An encrypted string that the merchant must include when posting to the Authorize.net web page.
If not used within 15 minutes of the original API call, this token expires.

String.
