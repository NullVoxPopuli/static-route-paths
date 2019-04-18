import { assert } from 'chai';
import { describe, it } from 'mocha';

import { extractTokens } from '../src/utils';

describe('Unit | extractTokens', () => {
  it('has no token for root', () => assert.deepEqual(extractTokens('/'), []));

  it('has a single token at the top level', () =>
    assert.deepEqual(extractTokens('/:blogId'), [':blogId']));

  it('has a single token at a nested level', () =>
    assert.deepEqual(extractTokens('/protected/:blogId'), [':blogId']));

  it('has two tokens', () =>
    assert.deepEqual(extractTokens('/:blogId/:postId'), [
      ':blogId',
      ':postId',
    ]));

  it('has two tokens with a trailing slash', () =>
    assert.deepEqual(extractTokens('/:blogId/:postId/'), [
      ':blogId',
      ':postId',
    ]));

  it('has two tokens without surrounding slashes', () =>
    assert.deepEqual(extractTokens(':blogId/:postId'), [':blogId', ':postId']));

  it('handles underscores', () =>
    assert.deepEqual(extractTokens('/blogs/:blog_id/posts/:post_id'), [
      ':blog_id',
      ':post_id',
    ]));
});
