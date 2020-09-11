const schemas = {
   reserveWallet: {
     type: 'object',
     properties: {
       response: {
         description: 'Return data will be as per the uniqueId',
         type: 'object',
         properties: {
           isLogin: {
             type: 'boolean',
             description: 'true for existing users, false for new users'
           },
           email: {
             type: 'string',
             description: 'user\'s email address'
           },
           liquidityProvider: {
             type: 'string',
             description: 'Liquidity provider'
           }
         }
       }
     }
   }
}


module.exports = schemas;