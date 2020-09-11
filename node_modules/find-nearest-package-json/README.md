# find-nearest-package-json
[![Build Status](https://travis-ci.org/vinsonchuong/find-nearest-package-json.svg?branch=master)](https://travis-ci.org/vinsonchuong/find-nearest-package-json)

Find the nearest `package.json` by recursively crawling parent directories

## Usage
Install [find-nearest-package-json](https://yarnpkg.com/en/package/find-nearest-package-json)
by running

```sh
yarn add find-nearest-package-json
```

```js
import {
  findNearestPackageJson,
  findNearestPackageJsonSync
} from 'find-nearest-package-json'

async function runAsync() {
  const packageJsonNearestCwd = await findNearestPackageJson()
  const packageJsonNearestGivenDir = await findNearestPackageJson('/tmp/some-project/some-dir')

  console.log(packageJsonNearestGivenDir.path)
  console.log(packageJsonNearestGivenDir.data)
}

function runSync() {
  const packageJsonNearestCwd = findNearestPackageJsonSync()
  const packageJsonNearestGivenDir = findNearestPackageJsonSync('/tmp/some-project/some-dir')

  console.log(packageJsonNearestGivenDir.path)
  console.log(packageJsonNearestGivenDir.data)
}
```
