# @minax/redux-hooks &middot; [![npm](https://img.shields.io/npm/v/@minax/redux-hooks.svg)](https://www.npmjs.com/package/@minax/redux-hooks)
Achieve Redux By React Hooks

## Install

``` shell
npm i --save @minax/redux-hooks
```

## Quick Overview

[![Edit lpl933nv5m](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/lpl933nv5m?fontsize=14)

### Augmenting your props using `ReduxComponentProps`

``` typescript
import { ReduxComponentProps } from '@minax/redux-hooks'

interface Props extends ReduxComponentProps<StoreInterface, ActionsInterface> {
  foo: any
  bar: any
}
```

