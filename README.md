# react-document-order

> Allows React components to contribute to a list that is maintained in the document order of those components. Can be used to construct forms with dynamic nested components with rich behaviours between fields, among other things.

[![NPM](https://img.shields.io/npm/v/react-document-order.svg)](https://www.npmjs.com/package/react-document-order) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-document-order
```

## Usage

```tsx
import React, { Component } from 'react'

import MyComponent from 'react-document-order'
import 'react-document-order/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [barnardb](https://github.com/barnardb)
