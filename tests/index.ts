import { assert } from 'chai';
import { describe, it, xit } from 'mocha';

import { route, Route } from '../src';
import { extractTokens } from '../src/route';

describe('route', () => {
  describe('property access', () => {
    describe('static paths', () => {
      const tree = route({
        root: route(),
        a: route('a', {
          b: route('b'),
        }),
      });

      describe('(root) "/"', () => {
        it('is an istance of Route', () => assert.ok(tree instanceof Route));
        it('is the root route', () => assert.equal(tree.path, '/'));
        it('any pathless route is also root', () =>
          assert.equal(tree.root.path, '/'));
      });

      describe('(nested) "/a" & "/a/b"', () => {
        it('renders top-level', () => assert.equal(tree.a.path, '/a'));
        it('renders nested', () => assert.equal(tree.a.b.path, '/a/b'));
      });
    });
  });

  describe('resolving path tokens', () => {
    const tree = route({
      blogs: route('blogs', {
        show: route(':blog_id', {
          edit: route('edit'),
          posts: route('posts', {
            show: route(':post_id'),
            edit: route(':post_id/edit'),
          }),
        }),
      }),
    });

    describe('paths', () => {
      it('shows tokens', () => assert.equal(tree.blogs.show.path, '/blogs/:blog_id'));

      // it('shows nested tokens', () => assert.equal(tree.blogs.show.path, '/blogs/:blog_id'));
    });

    describe('one level of tokens can be resolved', () => {
      it('errors when no value is given', () => {
        assert.throws(() => {
          tree.blogs.show.with();
        }, `The wrong number of dynamic segments were passed. Expected to have each of [:blog_id], but was passed []`)
      });

      it('replaces the token', () => {
        const result = tree.blogs.show.with({ blog_id: 1 });

        assert.equal(result, '/blogs/1');
      });
    });

    // temp disabled due to a bug is TS Node
    // https://github.com/TypeStrong/ts-node/issues/820
    describe('nested levels of tokens can be resolved', () => {
      xit('errors when a value is missing', () => {});

      xit('replaces the tokens', () => {
        // const result = tree.blogs.show.posts.show.with({
        //   blog_id: 1,
        //   post_id: 'my-post',
        // });
        // assert.equal(result, '/blogs/1/posts/my-post');
      });
    });
  });
});

describe('Unit | extractTokens', () => {
  it('has no token for root', () => assert.deepEqual(extractTokens('/'), []));

  it('has a single token at the top level', () =>
    assert.deepEqual(extractTokens('/:blogId'), [':blogId']));

  it('has a single token at a nested level', () =>
    assert.deepEqual(extractTokens('/protected/:blogId'), [':blogId']));

  it('has two tokens', () =>
    assert.deepEqual(extractTokens('/:blogId/:postId'), [':blogId', ':postId']));

  it('has two tokens with a trailing slash', () =>
    assert.deepEqual(extractTokens('/:blogId/:postId/'), [':blogId', ':postId']));

  it('has two tokens without surrounding slashes', () =>
    assert.deepEqual(extractTokens(':blogId/:postId'), [':blogId', ':postId']));

  it('handles underscores', () =>
    assert.deepEqual(extractTokens('/blogs/:blog_id/posts/:post_id'), [
      ':blog_id',
      ':post_id',
    ]));
});
