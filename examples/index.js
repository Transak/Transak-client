const Transak = require('..');
const fs = require('fs');
const mime = require('mime');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const chalk = require('chalk');
const prompt = require('prompt');
// config
const config = require('../config');
// fake users data to test
const { demoUser } = require('../assets/users/testData');
// constants
const schemas = require("../constants/schemas");
// websocket
const { byOrderId } = require("../test/webSocket.test");

const chai = require('chai');
chai.use(require('chai-json-schema'));
const expect = chai.expect;

// variables
const mainTimeout = 14000;

const keys = {
  reserveWallet: [
    { name: "id" },
  ],
}
const log = console.log;

//
// Start the prompt
//
prompt.start();


let transak;

transak = new Transak(config);

const quote = async () => {
    const schema = {
        properties: {
          cryptoCurrency: {
            required: true,
            message: "please enter cryptoCurrency code",
            default: demoUser.order.cryptoCurrency,
          },
          fiatCurrency: {
            required: true,
            message: "please enter fiatCurrency code",
            default: demoUser.order.fiatCurrency,
          },
          paymentMethod: {
            required: false,
            message: "please enter paymentMethod",
            default: demoUser.order.paymentMethod,
          },
          fiatAmount: {
            required: false,
            message: "please enter fiatAmount",
            default: demoUser.order.fiatAmount,
          },
          cryptoAmount: {
            required: false,
            message: "please enter cryptoAmount",
            default: demoUser.order.cryptoAmount,
          },
          isBuyOrSell: {
            required: false,
            message: "isBuyOrSell",
            default: "BUY",
          },
          network: {
            required: true,
            message: "network",
            default: "ethereum",
          },
        }
    }
    const input = await new Promise((resolve, reject) => {
        prompt.get(schema, (error, result) => {
            if(error) reject(error);
            resolve(result)
        })
    });
    demoUser.runtime.quote = input;

    const { quoteId } = await transak.fetchPrice(input);
    log(quoteId);

    demoUser.order.quoteId = quoteId;

}

const reservation = async () => {
    const reservationSchema = {
        properties: {
          // cryptoCurrency: {
          //   required: true,
          //   message: "please enter cryptoCurrency code",
          //   default: demoUser.order.cryptoCurrency,
          // },
          // fiatCurrency: {
          //   required: true,
          //   message: "please enter fiatCurrency code",
          //   default: demoUser.order.fiatCurrency,
          // },
          walletAddress: {
            required: true,
            message: "please enter your walletAddress",
            default: demoUser.order.walletAddress,
          },
          // paymentMethod: {
          //   required: false,
          //   message: "please enter paymentMethod",
          //   default: demoUser.order.paymentMethod,
          // },
          // fiatAmount: {
          //   required: false,
          //   message: "please enter fiatAmount",
          //   default: demoUser.order.fiatAmount,
          // },
          // cryptoAmount: {
          //   required: false,
          //   message: "please enter cryptoAmount",
          //   default: demoUser.order.cryptoAmount,
          // },
          // isBuyOrSell: {
          //   required: false,
          //   message: "isBuyOrSell",
          //   default: "BUY",
          // },
        }
    }
    const input = await new Promise((resolve, reject) => {
        prompt.get(reservationSchema, (error, result) => {
            if(error) reject(error);
            resolve(result)
        })
    });
    
    const result = await transak.reserveWallet({
        ...demoUser.runtime.quote,
        ...input
    });

    demoUser.runtime.reservationId = result.id;

}
const login = async () => {
    try {
        const emailSchema = {
            properties: {
              email: {
                required: true,
                message: "please enter your email address",
                default: demoUser.user.email,
                pattern: ".{1,}@[^.]{1,}"
              },
            }
        }
        const input = await new Promise((resolve, reject) => {
            prompt.get(emailSchema, (error, result) => {
                if(error) reject(error);
                resolve(result)
            })
        });
        

        demoUser.user.email = input.email;
        const result = await transak.sendEmail({
            email: demoUser.user.email,
            reservationId: demoUser.runtime.reservationId,
        });
    
        demoUser.runtime.responses.verifyEmail = result;
    } catch (error) {
        log(error);
    }

    try {
        const otpSchema = {
            properties: {
              emailVerificationCode: {
                required: true,
                hidden: true,
                message: "please enter your emailVerificationCode",
              },
            }
        }

        const input = await new Promise((resolve, reject) => {
            prompt.get(otpSchema, (error, result) => {
                if(error) reject(error);
                resolve(result)
            })
        });

        const result = await transak.verifyEmail({
            email: demoUser.user.email,
            reservationId: demoUser.runtime.reservationId,
            emailVerificationCode: input.emailVerificationCode,
        });
        // update headers to use the accessToken
        transak.headers.authorization = result.id;
    } catch (error) {
        
    }

    try {
        const result = await transak.getUser();
        // test the response
        expect(result);
        expect(result.id);
        expect(result.email === demoUser.user.email);
        expect(result.emailVerified);
        // if first time login, kyc status should be NOT_SUBMITTED
        const user = result;
        if(!demoUser.runtime.responses.verifyEmail.isLogin) {
          expect(user.kyc.l1.status === "NOT_SUBMITTED");
        }
        demoUser.runtime.kyc = user.kyc;
        demoUser.runtime.user = user;
    } catch (error) {
        
    }
}

const processDynamicForms = async forms => {
    /**
     * 1. process each form
     * for each form do:
     * - map each form input as prompt input
     * - get all fields from the user
     * - submit the form
     */

    for (const form of forms) {
        const schema = { properties: {}};
        log(`[form: ${form.formId}]`);

        // if form contains uploading fields, exclude it.
        // const isUploadForm = form.tabs[0].fields.filter(field => field.type === "document");
        // if(isUploadForm.length) return;
        
        for (const field of form.tabs[0].fields) {
            schema.properties[field.id] = {
                ...(field.regex ? { pattern: field.regex } : {}),
                required: !!field.isRequired,
                message: `${chalk.redBright(`[field: ${field.id}]`)} ${chalk.cyanBright(`please enter your ${field.name}`)}\n`,
                hidden: field.type === 'password',
                default: demoUser.user[field.id] || field.value,
            }
        }

        const input = await new Promise((resolve, reject) => {
            prompt.get(schema, (error, result) => {
                if(error) reject(error);
                resolve(result)
            })
        });


        const isUpload = form.tabs[0].fields.find(field => field.type === "document");

        if(isUpload) {
            /**
             * 1. get the document mime-type
             */
            const mimeType = mime.getType(demoUser.user.document);

            /**
             * 2. get a presignedUrl
             */
            const { signedUrl, key, method } = await transak.getPresignedUrl({
              mimeType,
            });


            /**
             * 3. use the url obtained above to upload the file
             */
            
            const file = await readFile(demoUser.user.document);
            await transak.uploadFile({ signedUrl, method, file });

            /**
             * 4. update user data
             */
            
            await transak.addFile({
                key,
                documentId: input.documentId, 
                type: form.formId, 
                country: input.country, 
            });
        } else {
            /**
             * 1. get transak method name
             * note that method names defined to match the api properties name, example:
             * `transak.getUser` method and `config.api.user.getUser`
             */
            let methods = {};
            Object.keys(config.api).reduce(function (r, k) {
              for (const methodName in config.api[k]) {
                if (config.api[k].hasOwnProperty(methodName)) {
                  const element = config.api[k][methodName];
                  methods[`${element.path}_${element.method.toLowerCase()}`] = { methodName, ...element }
                }
              }
            }, []);
            const { methodName } = methods[`${form.endpoint.path}_${form.endpoint.method.toLowerCase()}`]
            /**
             * 3. get transak method using method name
             */
            const method = transak[methodName];
            const result = await method({
                reservationId: demoUser.runtime.reservationId,
                ...input
            });
        }

        const result = await transak.getUser();
        // test the response
        expect(result);
        expect(result.id);
        expect(result.email === demoUser.user.email);
        expect(result.emailVerified);
        // if first time login, kyc status should be NOT_SUBMITTED
        if(!demoUser.runtime.responses.verifyEmail.isLogin) {
            const user = result;
            expect(user.kyc.l1.status === "APPROVED");
            // update user
            demoUser.runtime.user = user;
        }
    }    
}

const processKycForms = async () => {
    if(demoUser.runtime.kyc.l1.status === "APPROVED") {
        return;
     }
    /**
     * 1. get kyc dynamic forms
     */
    const response = await transak.getKycForms({
        reservationId: demoUser.runtime.reservationId,
    });
    await processDynamicForms(response.forms);
}


const processOrderForms = async () => {
    
    // if user has a bank, skip
    if(demoUser.runtime.user.banks.length) {
        return;
    }
    
    const response = await transak.getOrderForms({
        reservationId: demoUser.runtime.reservationId,
    });

    await processDynamicForms(response.forms);

}



const placeAnOrder = async () => {
    const { kyc } = demoUser.runtime.user;
    await expect(kyc.l1.status).to.equal("APPROVED");

    // create an order
    try {
        const { reservationId } = demoUser.runtime
        const { paymentMethod } = demoUser.order;
        
        const bankId = demoUser.runtime.user.banks[0].id;
        
        
        const result = await transak._createOrder({
          reservationId,
          paymentMethod,
          bankId
        });
        
        expect(result.status === "AWAITING_PAYMENT_FROM_USER")
        demoUser.runtime.order = result;
    } catch (error) {
        log(error)
    }

    // mark payment as done
    try {
        const { id: orderId, paymentOptionId } = demoUser.runtime.order;
        const result = await transak.confirmOrderPayment({
          orderId,
          paymentOptionId
        });
        log(result);
        expect(result.status === "PENDING_DELIVERY_FROM_TRANSAK")
    } catch (error) {
        log(error)
    }

    // get order data
    try {
        const { id: orderId } = demoUser.runtime.order;
        const order = await transak.getOrders({ orderId });
        expect(order.id === orderId);
    } catch (error) {
        log(error)
    }

    // get all orders
    try {
        const { id: orderId } = demoUser.runtime.order;
        const orders = await transak.getOrders({});
        expect(orders.length);
        expect(orders.find(order => order.id === orderId));
    } catch (error) {
        log(error)
    }

    // Subscribe to webSockets and wait until order is completed
    try {
        const { id: orderId } = demoUser.runtime.order;
        const result = await byOrderId(orderId);
        log(result);
    } catch (error) {
        log(error)
    }
}






const start = async () => {
    await quote();
    await reservation();
    await login();
    await processKycForms();
    await processOrderForms();
    await placeAnOrder();
}

start();