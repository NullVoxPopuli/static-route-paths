export interface NestedRoutes {
  [key: string]: Route;
}

export class Route {
  // still private, but shhh, don't tell anyone
  _path: string;
  _subRoutes?: NestedRoutes;
  _parent?: Route;

  // _pathBuilder: (...args: any[]) => string;

  constructor(path = '', subRoutes?: NestedRoutes) {
    this._path = path;
    this._subRoutes = subRoutes;
  }

  get path() {
    let fullPath = `${this._path}`;

    if (this._parent) {
      let parentPath = this._parent.path;
      // the root route already has a slash,
      // but we need to ensure there is a trailing slash
      if (!parentPath.endsWith('/')) {
        parentPath += '/'
      }

      fullPath = `${parentPath}${this._path}`;
    }

    // this happens if the root of the tree has no path
    // and there is also a first-level route with no path
    if (fullPath === '') {
      return '/';
    }

    return fullPath;
  }

  // resolve(...args: any[]) {
  //   return this._pathBuilder(...args);
  // }
  // [subRouteKey: string]: Route | string | NestedRoutes | undefined;

}
