const whitelist = {
  '/': true,
  '/exception/403': true,
  '/exception/404': true,
};
export default function Authorized(props) {
  const { pathname, urls, children, noMatch, routes } = props;
  if (!routes[pathname] || whitelist[pathname] || urls[pathname]) {
    return children;
  }
  return noMatch;
}
