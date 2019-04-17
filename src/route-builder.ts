export interface NestedRoutes {
  [key: string]: Route;
}

export class Route {


  // still private, but shhh, don't tell anyone
  _path: string;
  _subRoutes?: NestedRoutes;
  _parent?: Route;

  // _pathBuilder: (...args: any[]) => string;

  constructor(path: string = '', subRoutes?: NestedRoutes) {
    this._path = path;
    this._subRoutes = subRoutes;
  }

  get path() {
    let fullPath = `/${this._path}`;

    if (this._parent) {
      fullPath = `${this._parent.path}/${this._path}`;
    }

    return fullPath;
  }

  // resolve(...args: any[]) {
  //   return this._pathBuilder(...args);
  // }
  // [subRouteKey: string]: Route | string | NestedRoutes | undefined;

}

export function route<TNested extends NestedRoutes = {}>(
  path = '',
  nestedRoutes?: TNested
): Route & TNested {
  let routeEntry = new Route(path, nestedRoutes);
  let subRoutes = routeEntry._subRoutes;

  if (subRoutes) {
    let keys = Object.keys(subRoutes);
    let numSubRoutes = keys.length;

    for (let i = 0; i < numSubRoutes; i++) {
      let key = keys[i];
      let nestedEntry = subRoutes[key];

      nestedEntry._parent = routeEntry;

      (routeEntry as any)[key] = nestedEntry;
    }
  }

  return routeEntry as Route & TNested;
}
