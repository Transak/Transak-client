const axios = require("axios/index");
const expect = require('chai').expect;


// validate object by all it's keys
export const allKeys = (result, keys) => {
    // // to have all required properties
    expect(result).have.keys(...(keys.map(key => key.name)));
    // if any "1 level" nested keys
    keys.map(
        key => key.childs
        ? expect(result[key.name]).have.keys(...(key.childs.map(key => key.name)))
        : null
    );
};

export const isRequired = (args) => {
    for (const property in args) {
        if(args[property] === undefined) throw new Error(`${property} is required`);
    }
}

export async function doRequest(options) {
  let retries = 3;
  const handler = async () => {
      try {
          let response = await axios(options);
          const result = ((response || {}).data || {}).response
          if (!result) return false;
          if (result.statusCode !== 200 && result.message) {
              throw result;
          }
          
          return result;
      } catch (e) {
          if (e.message === "Network Error") {
              // network error    
              if (retries) {
                  await sleep(500);
                  retries -= 1;
                  return await handler();
              }
              else {
                  throw new Error(errorLang.NETWORK_ERROR);
              }

          }
          else {
              throw e
          }
      }
  }
  return await handler();
}
