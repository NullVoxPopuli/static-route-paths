const TOKEN_REGEX = /:[\w_]+\/?/gi;
export function extractTokens(path: string): string[] {
  const matches = path.match(TOKEN_REGEX);

  if (!matches) {
    return [];
  }

  return matches.map(
    (match): string => {
      // example:
      // match: :blogId/
      //        :postId
      //        :Post_id

      return match.replace(/\//g, '');
    }
  );
}
