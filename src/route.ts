import { extractTokens } from './utils';

// TODO: convert the path to a constructor-time property
//       may need changes on the route-builder w/r/t when
//       the parent route is set and when the route-named
//       properties are set
export class Route {
  // still private, but shhh, don't tell anyone
  _path: string;
  _subRoutes?: Dict<Route>;
  _parent?: Route;

  // _pathBuilder: (...args: any[]) => string;

  constructor(path = '', subRoutes?: Dict<Route>) {
    this._path = path;
    this._subRoutes = subRoutes;
  }

  get path(): string {
    let fullPath = `${this._path}`;

    if (this._parent) {
      let parentPath = this._parent.path;
      // the root route already has a slash,
      // but we need to ensure there is a trailing slash
      if (!parentPath.endsWith('/')) {
        parentPath += '/';
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

  with(params: Dict<string | number> = {}): string {
    let path = this.path;
    let tokens = extractTokens(path);
    let detectedParams = Object.keys(params);

    if (detectedParams.length !== tokens.length) {
      throw new Error(
        `The wrong number of dynamic segments were passed. Expected to have each of [${tokens.join(
          ', '
        )}], but was passed [${detectedParams.join(', ')}]`
      );
    }

    detectedParams.forEach(
      (token): void => {
        let value = params[token];

        path = path.replace(`:${token}`, `${value}`);
      }
    );

    return path;
  }
}
