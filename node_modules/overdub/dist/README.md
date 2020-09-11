# overdub
[![Build Status](https://travis-ci.org/vinsonchuong/overdub.svg?branch=master)](https://travis-ci.org/vinsonchuong/overdub)

Add full ES.Next support to Node.js

## Usage
Install [overdub](https://yarnpkg.com/en/package/overdub)
by running:

```sh
yarn add --dev overdub
```

Import `overdub/register` from the `node` CLI or from a test runner. For
example:

```sh
node -r overdub/register
```

Support for all standardized ECMAScript features is provided via Babel. React
and Flow syntax is also supported.

For test runners and other CLI tools that require users to specify a Babel
config, reuse the `overdub` Babel config like so:

```json
{
  "extends": "overdub/babel"
}
```
