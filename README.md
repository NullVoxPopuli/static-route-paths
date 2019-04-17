# Static Route Paths

Depedency-free static route builder that can be used alongside any dynamic routing library to bring sanity to intellisense

## Install

```bash
npm install static-route-paths
# or
yarn add static-route-paths
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
