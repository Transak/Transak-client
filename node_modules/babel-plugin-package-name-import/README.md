# babel-plugin-package-name-import
[![Build Status](https://travis-ci.org/vinsonchuong/babel-plugin-package-name-import.svg?branch=master)](https://travis-ci.org/vinsonchuong/babel-plugin-package-name-import)

Import files from the current package by name

## Installing
Install it locally to your project by running:

```bash
yarn add --dev babel-plugin-package-name-import
```

Add the plugin to your Babel configuration:

```json
{
  "plugins": ["package-name-import"]
}
```

## Usage
Given that your `package.json` contains:
```json
{
  "name": "project",
  "main": "src/index.js"
}
```

You can import files from the current project by name:

```javascript
import project from 'project'
```

Note that `require` is not supported as its argument can be dynamically
computed.

## eslint-plugin-import
If your project uses
[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import),
ensure that it can resolve current project imports by including the
[eslint-import-resolver-package-name-import](https://github.com/vinsonchuong/eslint-import-resolver-package-name-import)
plugin.


### Flow
If your project uses [Flow](https://flowtype.org/), ensure that it can resolve
current project imports by adding to `.flowconfig`:

```
[options]
module.name_mapper='^project$' -> '<PROJECT_ROOT>'
module.name_mapper='^project\/\(.*\)$' -> '<PROJECT_ROOT>/\1'
```

Note that `<PROJECT_ROOT>` is a special token and should be left unmodified.
