
// helpers
import { doRequest, isRequired } from "../utils/index";


/**
 * Transak API
 */
export const Transak = class {
    constructor(args) {
        this.config = args;
        const { baseUrl, apiKey, accessToken } = this.config;
        isRequired({ baseUrl });

        this.headers = {
            ...(accessToken ? { authorization: accessToken } : {}),
        }

        this.apiKey = apiKey;
        this.reserveWallet = this.reserveWallet.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getKycForms = this.getKycForms.bind(this);
        this.patchUser = this.patchUser.bind(this);
        this.getPresignedUrl = this.getPresignedUrl.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.addFile = this.addFile.bind(this);
        this.submitKyc = this.submitKyc.bind(this);
        this.getOrderForms = this.getOrderForms.bind(this);
        this.addBank = this.addBank.bind(this);
        this.fetchPrice = this.fetchPrice.bind(this);
        this._createOrder = this._createOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.confirmOrderPayment = this.confirmOrderPayment.bind(this);
        this.webhook = this.webhook.bind(this);
        this.webSocket = this.webSocket.bind(this);
    }

    /**
     * @typedef {Object} walletReserve
     * @property {string} fiatCurrency Fiat currency which the users wants to buy/sell
     * @property {string} cryptoCurrency Crypto currency which the users wants to sell/buy
     * @property {number} fiatAmount Fiat amount that is required to buy/sell
     * @property {string} paymentMethod 'Payment method id, ex: gbp_bank_transfer'
     * @property {string} walletAddress Your wallet address
     * @property {string} isBuyOrSell Is BUY or SELL
     * @property {number} [cryptoAmount] Crypto amount that is required to sell/buy
     * @property {string} [addressAdditionalData] address additional data like memo id
     * @property {string} [network] 'Crypto network id. Example BEP2, ERC-20'
     * @property {string} [quoteId] Quote ID
     * @property {string} [partnerApiKey] enter the partner API KEY to send the co-brand email
     * @property {string} [partnerAPISecret] enter the partner API SECRET to complete the KYC on behalf of the user
     * @property {string} [partnerOrderId] Partner order Id
     * @property {string} [partnerCustomerId] Partner customer Id
     * @property {string} [redirectURL] Redirect URL
     * @property {string} [email] enter the email address
     * @property {string} [first_name] enter your first_name
     * @property {string} [last_name] enter your last_name
     * @property {string} [dob] enter your dob DD-MM-YYYY
     * @property {string} [mobileNumber] enter your mobileNumber
     * @property {string} [addressLine1] enter your addressLine1
     * @property {string} [addressLine2] enter your addressLine2
     * @property {string} [state] enter your state
     * @property {string} [city] enter your city
     * @property {string} [postCode] enter your postCode
     * @property {string} [country] enter your country
     * 
     * Create a new wallet reservation
     * In this step, users create a wallet reservation order, by providing details about their order, partners also can pass some details like their API_KEY etc.
     * @param {walletReserveArgs} param0 
     */
    async reserveWallet({
        fiatCurrency,
        cryptoCurrency,
        fiatAmount,
        paymentMethod,
        walletAddress,
        isBuyOrSell,
        cryptoAmount,
        addressAdditionalData,
        network,
        quoteId,
        partnerApiKey = this.apiKey,
        partnerAPISecret,
        partnerOrderId,
        partnerCustomerId,
        redirectURL,
        email,
        first_name,
        last_name,
        dob,
        mobileNumber,
        addressLine1,
        addressLine2,
        state,
        city,
        postCode,
        country,
    }) {
        const { method, path } = this.config.api.orders.reserveWallet;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                ...(fiatCurrency ? { fiatCurrency } : {}),
                ...(cryptoCurrency ? { cryptoCurrency } : {}),
                ...(fiatAmount ? { fiatAmount } : {}),
                ...(paymentMethod ? { paymentMethod } : {}),
                ...(walletAddress ? { walletAddress } : {}),
                ...(isBuyOrSell ? { isBuyOrSell } : {}),
                ...(cryptoAmount ? { cryptoAmount } : {}),
                ...(addressAdditionalData ? { addressAdditionalData } : {}),
                ...(network ? { network } : {}),
                ...(quoteId ? { quoteId } : {}),
                ...(partnerApiKey ? { partnerApiKey } : {}),
                ...(partnerAPISecret ? { partnerAPISecret } : {}),
                ...(partnerOrderId ? { partnerOrderId } : {}),
                ...(partnerCustomerId ? { partnerCustomerId } : {}),
                ...(redirectURL ? { redirectURL } : {}),
                ...(email ? { email } : {}),
                ...(first_name ? { first_name } : {}),
                ...(last_name ? { last_name } : {}),
                ...(dob ? { dob } : {}),
                ...(mobileNumber ? { mobileNumber } : {}),
                ...(addressLine1 ? { addressLine1 } : {}),
                ...(addressLine2 ? { addressLine2 } : {}),
                ...(state ? { state } : {}),
                ...(city ? { city } : {}),
                ...(postCode ? { postCode } : {}),
                ...(country ? { country } : {}),
            }
        };
        
        try {
            const result = await doRequest(options);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    /**
     * @typedef {Object} sendEmail
     * @property {string} reservationId Enter the email id
     * @property {string} email Enter the email verification code
     * 
     * Send one time verification code to user email address
     * > if no user associated with the provided email, a new user will be created, and a verification code will be sent to the email
     * @param {sendEmail} param0 
     */
    async sendEmail({ reservationId, email }) {
        const { method, path } = this.config.api.user.sendEmail;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                ...(reservationId ? { reservationId } : {}),
                ...(email ? { email } : {}),
            }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * @typedef {Object} verifyEmail
     * @property {string} reservationId Enter the email id
     * @property {string} email Enter the email verification code
     * @property {string} emailVerificationCode pass your reservation id
     * 
     * Verify user's email address
     * > Users need to pass the verification code that is sent to their email, on success, they'll get an accessToken that can be used with the next requests.
     * @param {verifyEmail} param0 
     */
    async verifyEmail({ reservationId, email, emailVerificationCode}) {
        const { method, path } = this.config.api.user.verifyEmail;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                ...(reservationId ? { reservationId } : {}),
                ...(email ? { email } : {}),
                ...(emailVerificationCode ? { emailVerificationCode } : {}),
            }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Fetch user data
     */
    async getUser() {
        const { method, path } = this.config.api.user.getUser;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * 
     * @typedef {Object} getForms
     * @property {string} reservationId Enter your reservation id
     * 
     * Get all required forms for a user to complete their KYC
     *  @param {getForms} param0 
     * 
     */

    async getKycForms({ reservationId }) {
        const { method, path } = this.config.api.user.getKycForms;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: { reservationId }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * @typedef {Object} patchUser
     * @property {string} reservationId Enter your reservation id
     * @property {string} [firstName] Enter your first_name
     * @property {string} [lastName] Enter your last_name
     * @property {string} [dob] Enter your dob DD-MM-YYYY
     * @property {string} [mobileNumber] Enter your mobileNumber
     * @property {string} [addressLine1] Enter your address1
     * @property {string} [addressLine2] Enter your addressLine2
     * @property {string} [state] Enter your state
     * @property {string} [city] Enter your city
     * @property {string} [postCode] Enter your postCode
     * @property {string} [country] Enter your country
     * @property {boolean} [isBillingAddress] Is user address or billing address
     * 
     * Update user
     * Only users with NOT_SUBMITTED or REJECTED kyc could be updated, the only exeption is user Billing address, it can be updated regardless the kyc status.
     * 
     * If any address information passed, all other arguments related to address are required.
     * @param {patchUser} param0
     */

    async patchUser({
        reservationId,
        firstName,
        lastName,
        dob,
        mobileNumber,
        addressLine1,
        addressLine2,
        state,
        city,
        postCode,
        countryCode,
        isBillingAddress,
    }) {
        
        const { method, path } = this.config.api.user.patchUser;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                reservationId,
                ...(firstName ? { firstName } : {}),
                ...(lastName ? { lastName } : {}),
                ...(dob ? { dob } : {}),
                ...(mobileNumber ? { mobileNumber } : {}),
                ...(addressLine1 ? { addressLine1 } : {}),
                ...(addressLine2 ? { addressLine2 } : {}),
                ...(state ? { state } : {}),
                ...(city ? { city } : {}),
                ...(postCode ? { postCode } : {}),
                ...(countryCode ? { countryCode } : {}),
                ...(isBillingAddress ? { isBillingAddress } : {}),
            }
        };
        
        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



    /**
     * 
     * @typedef {Object} getPresignedUrl
     * @property {string} mimeType The MIME type of the file you wish to upload. the supported types are image/jpeg, image/png and application/pdf.
     * 
     * Get all required forms for a user to complete their KYC
     * @param {getPresignedUrl} param0 
     * 
     */
    async getPresignedUrl({ mimeType }) {
        const { method, path } = this.config.api.user.getPresignedUrl;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                ...(mimeType ? { mimeType } : {}),
            }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * 
     * @typedef {Object} uploadFile
     * @property {string} presignedUrl use the presignedUrl to upload a file.
     * 
     * 
     * @param {uploadFile} param0 
     */
    async uploadFile({ signedUrl, method, file }) {
        const options = {
            method,
            url: signedUrl,
            headers: {
                "x-amz-acl": "public-read"
            },
            multipart: [
                { body: file }
            ], 
        };
        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * @typedef {Object} addFile
     * @property {string} key The key of the file that you have generated using the GET /user/files/presignedurl endpoint
     * @property {string} documentId Document id, examples are passport, driving_licence, etc
     * @property {string} type Document type, types are `idProof`, `addressProof`, `incomeProof`, `selfie`
     * @property {string} [side] Document side, one of `front`, `back`
     * @property {string} [country] Document issuing country
     * 
     * Add a user kyc file
     * Use this endpoint to update user with an uploaded file
     * Please read [File Upload](docs/user/3.file-upload.md) to know more about uploading process.
     * @param {addFile} param0 
     */
    async addFile({
        key,
        documentId, 
        type, 
        side, 
        country
    }) {
        const { method, path } = this.config.api.user.addFile;

        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: {
                ...this.headers,
            },
            params: {
                ...(key ? { key } : {}),
                ...(documentId ? { documentId } : {}), 
                ...(type ? { type } : {}), 
                ...(side ? { side } : {}), 
                ...(country ? { country } : {})
            }
        };
        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Call this endpoint to start validating a user KYC after submitting all the required forms.
     */
    async submitKyc() {
        const { method, path } = this.config.api.user.submitKyc;

        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: {
                ...this.headers,
            },
        };
        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * @typedef {Object} createOrder
     * @property {string} reservationId ReservationId using `POST /orders/wallet-reserve`
     * @property {string} paymentMethod Payment method id. You can get the payment method id from GET /currencies/crypto-currencies. Example: upi, credit_debit_card, gbp_bank_transfer
     * @property {string} bankId The bank id that is used to place the order -incase of bank transfer orders
     * 
     * Create order
     * Use this endpoint to create an order
     * @param {createOrder} param0 
     */

    async _createOrder({
        reservationId,
        paymentMethod,
        bankId,
    }) {
        const { method, path } = this.config.api.orders.createOrder;

        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: {
                ...this.headers,
            },
            params: {
                reservationId,
                paymentMethod,
                bankId,
            }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    /**
     * Get all required forms for a user to complete their KYC
     *  @param {getForms} param0 
     */
    async getOrderForms({ reservationId }) {
        const { method, path } = this.config.api.orders.getOrderForms;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: { reservationId }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * @typedef {Object} addBank 
     * @property {string} reservationId ReservationId using `POST /orders/wallet-reserve`
     * @property {string} detailsType 'Type of bank details. Example: `iban`, `accountNumber`, `upi`'
     * @property {string} [accountNumber] Bank account number. This field is required if the `detailsType` is `accountNumber`
     * @property {string} [sortCode] Sort code of United Kingdom bank. This field is required if the `detailsType` is `accountNumber`
     * @property {string} [swiftbic] SWIFT BIC of the bank.  This field is required if the `detailsType` is `iban`
     * @property {string} [iban] IBAN for the SEPA transfer. This field is required if the `detailsType` is `iban`
     * @property {string} [ifscCode] IFSC Code of Indian bank. This field is required if the `detailsType` is `accountNumber`
     * @property {string} [upiId] UPI id of Indian bank. This field is required if the `detailsType` is `upi`
     * @property {string} [address] Full address if the bank. This field is required if the `detailsType` is `iban`
     * 
     * Add bank details
     *  @param {addBank} param0 
     */
    async addBank({
        reservationId,
        detailsType,
        accountNumber,
        sortCode,
        swiftbic,
        iban,
        ifscCode,
        upiId,
        address,
    }) {
        const { method, path } = this.config.api.banks.addBank;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                reservationId,
                detailsType,
                ...(accountNumber ? { accountNumber } : {}),
                ...(sortCode ? { sortCode } : {}),
                ...(swiftbic ? { swiftbic } : {}),
                ...(iban ? { iban } : {}),
                ...(ifscCode ? { ifscCode } : {}),
                ...(upiId ? { upiId } : {}),
                ...(address ? { address } : {}),
            }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * @typedef {Object} fetchPrice
     * @property {string} cryptoCurrency Crypto currency symbol. Example: ETH, BTC, DAI
     * @property {string} fiatCurrency Fiat currency symbol. Example: GBP, INR, EUR, USD
     * @property {string} isBuyOrSell Is BUY or SELL order. Example: BUY, SELL
     * @property {number} [cryptoAmount] Amount in crypto currency
     * @property {number} [fiatAmount] Amount in fiat currency
     * @property {string} [partnerApiKey] Transak public api key
     * @property {string} [paymentMethodId] Payment method id. You can get the payment method id from GET /currencies/crypto-currencies. Example: upi, credit_debit_card, gbp_bank_transfer
     * 
     * Get a currency price
     * Get the price as per the payment method, fiat currency, amount
     * Although fiatAmount and cryptoAmount is not both required, you need to pass one of them.
     * @param {fetchPrice} param0 
     */
    async fetchPrice({
        cryptoCurrency,
        fiatCurrency,
        isBuyOrSell,
        cryptoAmount,
        fiatAmount,
        partnerApiKey = this.apiKey,
        paymentMethodId,
        network,
    }) {
        const { method, path } = this.config.api.currencies.fetchPrice;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                cryptoCurrency,
                fiatCurrency,
                isBuyOrSell,
                ...(cryptoAmount ? { cryptoAmount } : {}),
                ...(fiatAmount ? { fiatAmount } : {}),
                ...(partnerApiKey ? { partnerApiKey } : {}),
                ...(paymentMethodId ? { paymentMethodId } : {}),
                ...(network ? { network } : {}),
            }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * @typedef {Object} createOrder
     * @property {string} reservationId Wallet reservation Id
     * @property {string} paymentMethod Payment method id. You can get the payment method id from GET /currencies/crypto-currencies. Example: upi, credit_debit_card, gbp_bank_transfer
     * @property {string} [bankId] The bank id that is used to place the order -incase of bank transfer orders
     * 
     * Use this resource to create new order from a wallet reservation
     * @param {createOrder} param0 
     */

    async createOrder({
        reservationId,
        paymentMethod,
        bankId
    }) {
        const { method, path } = this.config.api.orders.createOrder;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                reservationId,
                paymentMethod,
                bankId
            }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * @typedef {Object} getOrder
     * @property {string} orderId Order id
     * 
     * Use this resource to find an order by its Id.
     * or Use this resource to get all orders for an authenticated user.
     * @param {getOrder} param0 
     */

    async getOrders({ orderId }) {
        const { method, path } = this.config.api.orders.getOrders;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                ...(orderId ? { orderId } : {})
            }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



    /**
     * @typedef {Object} confirmOrderPayment
     * @property {string} orderId Order id
     * @property {string} paymentOptionId Payment method id. You can get the payment method id from GET /currencies/crypto-currencies. Example: upi, credit_debit_card, gbp_bank_transfer
     * 
     * Once a user marks order payment as done, Use this resource to confirm the order.
     * @param {confirmOrderPayment} param0 
     */
    async confirmOrderPayment({
        orderId,
        paymentOptionId
    }) {
        const { method, path } = this.config.api.orders.confirmOrderPayment;
        
        const options = {
            method,
            url: `${this.config.baseUrl}${path}`,
            headers: { 
                ...this.headers,
            },
            params: {
                orderId,
                paymentOptionId
            }
        };

        try {
            const result = await doRequest(options);
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async webhook() {

    }

    async webSocket() {

    }
}