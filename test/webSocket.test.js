const Pusher = require('pusher-js');

let pusher = new Pusher('1d9ffac87de599c61283', {cluster: 'ap2'});

const byOrderId = orderId => new Promise((resolve, reject) => {
    //to subscribe
    let channel = pusher.subscribe(orderId);

    //receive updates of all the events
    pusher.bind_global((eventId, orderData) => {
        console.log(`${eventId} ${JSON.stringify(orderData)}`)
    });

    //receive updates of a specific event
    channel.bind(`ORDER_COMPLETED`, orderData => {
        console.log(orderData);
        pusher.unsubscribe(orderId);
        resolve(orderData);
    });
})

//to unsubscribe
//pusher.unsubscribe(orderId);


module.exports = {
    byOrderId
}