import { NestedRoutes, Route } from "./route";

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

      (routeEntry as any)[key] = nestedEntry;
      console.log(key, (routeEntry as any)[key] as any);
    }
  }

  return routeEntry as  Route & TNested;
}
