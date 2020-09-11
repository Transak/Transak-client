
const config = {
    // baseUrl: "http://localhost:8292/api/v2/",
    baseUrl: "https://staging-api.transak.com/api/v2",
    // apiKey: "a135bd06-b7f9-4f9e-87f6-c59321f137b2",
    api: {
        countries: {
            getCounties: {
                path: "/countries",
                method: "get",
            }
        },
        user: {
            getUser: {
                path: "/user/",
                method: "GET",
            },
            patchUser: {
                path: "/user/",
                method: "PATCH",
            },
            logout: {
                path: "/user/logout",
                method: "POST",
            },
            getKycForms: {
                path: "/user/kyc/forms",
                method: "GET",
            },
            sendEmail: {
                path: "/user/email/send",
                method: "POST",
            },
            verifyEmail: {
                path: "/user/email/verify",
                method: "POST",
            },
            addFile: {
                path: "/user/files",
                method: "POST",
            },
            getPresignedUrl: {
                path: "/user/files/signed-url",
                method: "GET",
            },
            submitKyc: {
                path: "/user/kyc/submit",
                method: "POST",
            },
        },
        partner: {
            getPartner: {
                path: "/partners",
                method: "GET",
            },
            getPartnerOrders: {
                path: '/partners/orders',
                method: "GET"
            },
            testWebhooks: {
                path: '/partners/test-webhook',
                method: "POST"
            },
            getPastWebhooks: {
                path: '/partners/webhooks',
                method: "GET"
            },
            updateWebhooksUrl: {
                path: '/partners/update-webhook-url',
                method: "POST"
            },
        },
        banks: {
            getBank: {
                path: "/banks",
                method: "GET"
            },
            addBank: {
                path: "/banks",
                method: "POST"
            },
            deleteBank: {
                path: "/banks",
                method: "DELETE"
            }
        },
        currencies: {
            fetchPrice: {
                path: "/currencies/price",
                method: "GET"
            },
            getCryptoCurrencies: {
                path: '/currencies/crypto-currencies',
                method: "GET"
            },
            getFiatCurrencies: {
                path: '/currencies/fiat-currencies',
                method: "GET"
            },
            verifyWallet: {
                path: '/currencies/verify-wallet-address',
                method: "GET"
            },
        },
        orders: {
            confirmOrderPayment: {
                path: '/orders/payment-confirmation',
                method: "POST"
            },
            getOrders: {
                path: '/orders',
                method: "GET"
            },
            createOrder: {
                path: '/orders',
                method: "POST" 
            },
            deleteOrder: {
                path: '/orders',
                method: "DELETE" 
            },
            getOrderForms: {
                path: '/orders/forms',
                method: "GET"
            },
            reserveWallet: {
                path: '/orders/wallet-reserve',
                method: "POST",
            },
        },        
    }
};

module.exports = config;
