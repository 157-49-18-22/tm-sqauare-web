/** URL paths — single source of truth for navigation */
export const ROUTES = {
  home: '/',
  about: '/about',
  products: '/products',
  contact: '/contact',
  paper: '/paper',
  fastag: '/fastag',
  cart: '/cart',
  account: '/account',
};

/** Browser tab titles */
export const ROUTE_TITLES = {
  [ROUTES.home]: 'Home',
  [ROUTES.about]: 'About Us',
  [ROUTES.products]: 'Products',
  [ROUTES.contact]: 'Contact',
  [ROUTES.paper]: 'Copier Paper',
  [ROUTES.fastag]: 'FASTag Services',
  [ROUTES.cart]: 'Cart',
  [ROUTES.account]: 'My Account',
};

/** Legacy page keys (product cards, footer) → path */
export const pageKeyToPath = (key) => {
  const map = {
    home: ROUTES.home,
    about: ROUTES.about,
    products: ROUTES.products,
    contact: ROUTES.contact,
    paper: ROUTES.paper,
    fastag: ROUTES.fastag,
    cart: ROUTES.cart,
    'my-account': ROUTES.account,
  };
  return map[key] ?? ROUTES.home;
};

export const isProductsRoute = (pathname) =>
  pathname === ROUTES.products ||
  pathname === ROUTES.paper ||
  pathname === ROUTES.fastag;

/** Pages with full-bleed hero (no top padding on main) */
export const FULL_BLEED_PATHS = new Set([
  ROUTES.home,
  ROUTES.contact,
  ROUTES.paper,
  ROUTES.fastag,
]);
