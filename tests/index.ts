import { assert } from 'chai';
import { describe, it } from 'mocha';

import { route } from '../src';
import { Route } from '../src/route-builder';

describe('route', () => {
  describe('property access', () => {
    describe('static paths', () => {
      let tree = {
        root: route(),
        a: route('a', {
          b: route('b')
        }),
      }

      it('for the root route', () => {
        assert.ok(tree.root instanceof Route)
        assert.equal(tree.root.path, '/', 'route with no arguments is the root');
      });
    });
  });

  describe('resolving path tokens', () => {

  });
});
