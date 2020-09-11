const demoUser = {
    user: {
      email: `transak-test-${Math.floor(1000 + Math.random() * 9000)}@transak.com`,
      firstName: "Angie",
      lastName: "Lightner",
      mobileNumber: "+12149898344",
      dob: "01-01-1992",
      addressLine1: "1417  Deercove Drive",
      addressLine2: "",
      state: "Pennsylvania",
      city: "TIRE HILL",
      postCode: "15959",
      countryCode: "US",
      document: "./assets/images/demo.jpg",
      documents: {
        idProof: {
          mimeType: "image/jpeg",
          data: "data:image/jpeg;base64,/9j/4AA.....",
        },
      },
      iban: `GB68BARC20035389353138${Math.floor(1000 + Math.random() * 9000)}`,
      swiftbic:"HBUKGB4BXXX",
      address:"1 CENTENARY SQUARE"
    },
    order: {
        fiatCurrency: "EUR",
        cryptoCurrency: "ETH",
        walletAddress: "0x245b28C24dF77d6f2944f81708b47ac076539419",
        paymentMethod: "sepa_bank_transfer",
        fiatAmount: "800",
        isBuyOrSell: "BUY",
        quoteId: "8e4577d1-31f1-460b-86b4-0e6473416ea3",
        network: "erc20",
    },
    runtime: {
      reservationId: "",
      authorization: "",
      accessToken: "",
      documents: [
        {
          name: "idProof",
          presignedUrl: "https://transak-bucket-development.s3.us-east-2.amazonaws.com/f79733e2-3caa-46c5-b05c-4c39f7056e4d.jpeg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWSQ4OU7I56DTCSLT%2F20200828%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200828T095121Z&X-Amz-Expires=120&X-Amz-Signature=824eaa352cf5cfa78a55190773f0fd80fbcc3711e834cae13ac5bfbd3673f02a&X-Amz-SignedHeaders=host%3Bx-amz-acl%3Bx-amz-meta-userid&x-amz-acl=public-read&x-amz-meta-userid=d90e1a43-289d-4511-9e7c-acc469e752e3"
        },
        {
          name: "addressProof",
          presignedUrl: "https://transak-bucket-development.s3.us-east-2.amazonaws.com/37e046f7-c7c8-4468-9359-cd51f22d86c7.jpeg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWSQ4OU7I56DTCSLT%2F20200828%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200828T095131Z&X-Amz-Expires=120&X-Amz-Signature=64d7b24772bdd028d538971db92a4cfa41e0715532a551f019b2a337d12e274e&X-Amz-SignedHeaders=host%3Bx-amz-acl%3Bx-amz-meta-userid&x-amz-acl=public-read&x-amz-meta-userid=d90e1a43-289d-4511-9e7c-acc469e752e3"
        },
      ],
      responses: {},
      propmtSchemas: []
    }
}










module.exports = { demoUser };