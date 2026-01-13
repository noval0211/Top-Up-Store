import midtransClient from 'midtrans-client';

let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey:process.env.MIDTRANS_CLIENT_KEY
});

export { core };