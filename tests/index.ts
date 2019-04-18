import { assert } from 'chai';
import { describe, it } from 'mocha';

import { route, Route } from '../src';

describe('route', () => {
  describe('property access', () => {
    describe('static paths', () => {
      let tree = route({
        root: route(),
        a: route('a', {
          b: route('b')
        }),
      });

      describe('(root) "/"', () => {
        it('is an istance of Route', () => assert.ok(tree instanceof Route));
        it('is the root route', () => assert.equal(tree.path, '/'));
        it('any pathless route is also root', () => assert.equal(tree.root.path, '/'));
      });

      describe('(nested) "/a" & "/a/b"', () => {
        it('renders top-level', () => assert.equal(tree.a.path, '/a'));
        it('renders nested', () => assert.equal(tree.a.b.path, '/a/b'));
      });

    });
  });

  describe('resolving path tokens', () => {
    let tree = {
      blogs: route('blogs', {
        show: route(':blog_id'),
        edit: route(':blog_id/edit'),
        posts: route('posts', {
          show: route(':post_id'),
          edit: route(':post_id/edit'),
        })
      }),
    }

    describe('one level of tokens can be resolved', () => {
      it('errors when no value is given', () => {

      });

      it('replaces the token', () => 0);
    });

    describe('nested levels of tokens can be resolved', () => {
      it('errors when a value is missing', () => {

      });

      it('replaces the tokens', () => {

      });
    });
  });
});
