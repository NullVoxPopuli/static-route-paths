import { Route } from './route';

export function route<NestedRoutes extends Dict<Route<any>> = {}, DynamicSegments extends Dict<string | number | undefined | null> = {}>(
  path: string | NestedRoutes = '',
  nestedRoutes?: NestedRoutes
): Route<DynamicSegments> & NestedRoutes {
  let routeEntry: Route<DynamicSegments>;

  let _path: string;
  let _nestedRoutes: NestedRoutes | undefined;

  if (typeof path === 'string') {
    _path = path;
    _nestedRoutes = nestedRoutes;
  } else {
    _path = '';
    _nestedRoutes = path;
  }

  // how do we get the types for the dynamic segments from the nested routes?
  // those'll be needed to get the full path's dynamic segments
  routeEntry = new Route<DynamicSegments>(_path, _nestedRoutes);

  if (_nestedRoutes) {
    let keys = Object.keys(_nestedRoutes);
    let numSubRoutes = keys.length;

    for (let i = 0; i < numSubRoutes; i++) {
      let key = keys[i];
      let nestedEntry = _nestedRoutes[key];

      nestedEntry._parent = routeEntry;

      (routeEntry as any)[key] = nestedEntry;
    }
  }

  return routeEntry as Route<DynamicSegments> & NestedRoutes;
}
