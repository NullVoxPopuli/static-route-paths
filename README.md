# Static Route Paths

Depedency-free static route builder that can be used alongside any dynamic routing library to bring sanity to intellisense

## Why

Ever had to make a single-page-app where all the route references were strings?

Ever had a silly mistake where you had wasted time due to a typo in those strings?

Have you ever wished you could use intellisense on your route pathings?

This library is for _you_.

## Install

```bash
npm install static-route-paths
# or
yarn add static-route-paths
```

## Usage

Using this library is a 2 step process.

### 1. Define your route tree

In order to have intellisense work, we nede to define the tree

```ts
import { route } from 'static-route-paths';

const routes = route({
  root: route(),
  login: route('login'),
  dashboard: route('dashboard', {
    preferences: route('preferences'),
    myProfile: route('my-profile'),
    blogs: route('blogs', {
      show: route(':id'),
      edit: route(':id/edit'),
    })
  }),
})
```

### 2. Getting the strings

Now we can reference our tree to get the strings for our single-page-app framework or library of choice.

```ts
import { routes } from 'wherever-you/defined-the/above';

routes.root.path
// => '/'
routes.login.path
// => '/login
routes.dashboard.blogs.path
// => /dashboard/blogs
routes.dashboard.blogs.show.path
// => /dashboard/blogs/:id
routes.dashboard.blogs.show.with({ id: 'some-blog-id-or-slug' });
// => /dashboard/blogs/some-blog-id-or-slug
```
