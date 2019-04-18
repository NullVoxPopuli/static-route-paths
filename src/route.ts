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

  with(params: any = {}) {
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

    detectedParams.forEach((token) => {
      let value = params[token];

      console.log(token, value, path);
      path = path.replace(`:${token}`, value);
    });

    return path;
  }
}

const TOKEN_REGEX = /:[\w_]+\/?/gi;
export function extractTokens(path: string): string[] {
  const matches = path.match(TOKEN_REGEX);

  if (!matches) {
    return [];
  }

  return matches.map((match) => {
    // example:
    // match: :blogId/
    //        :postId
    //        :Post_id

    return match.replace(/\//g, '');
  });
}
