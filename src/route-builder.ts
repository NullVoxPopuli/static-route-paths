interface NestedRoutes {
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

const proxyHandler = {
  get: function (obj: NestedRoutes, prop: string) {
    if (obj[prop] instanceof Route) {
      if ((Object.keys(obj._subRoutes) as any).includes(prop)) {
        console.log('did we make it?', obj[prop]);
        return obj[prop].path;
      }
    }

    return prop in obj ? obj[prop] : undefined;
  }
}

export function route<TNested extends NestedRoutes = {}>(
  path: string | TNested = '',
  nestedRoutes?: TNested
): Route & TNested {
  let routeEntry: Route;

  if (typeof path === 'string') {
    routeEntry = new Route(path, nestedRoutes);
  } else {
    routeEntry = new Route('', path);
  }

  let subRoutes = routeEntry._subRoutes;

  if (subRoutes) {
    let keys = Object.keys(subRoutes);
    let numSubRoutes = keys.length;

    for (let i = 0; i < numSubRoutes; i++) {
      let key = keys[i];
      let nestedEntry = subRoutes[key];

      nestedEntry._parent = routeEntry;


      (routeEntry as any)[key] = new Proxy(nestedEntry, proxyHandler as any) as any;
      console.log(key, (routeEntry as any)[key] as any);
    }
  }

  return routeEntry as Route & TNested;
}
