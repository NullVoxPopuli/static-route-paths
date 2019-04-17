# React Action Decorators

Remove menial event handling

## Install

```bash
npm install react-action-decorators
# or
yarn add react-action-decorators
```

## Example

```js
import React from 'react';
import { withTemplateHelpers } from 'react-action-decorators';

@withTemplateHelpers
export default class MyComponent extends Component {
    render() {
        const { mut } = this;
        const { text } = this.state;

        return (
            <div>
              <input value={text} onChange={mut('text')} />
            </div>
        );
    }
}
```

Demo: https://codesandbox.io/s/2067py0prn

## Available Helpers

- `mut`
- `toggle`
- `pipe`
