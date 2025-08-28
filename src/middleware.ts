import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en',
});
 
export const config = {
  // Match all paths except for assets and api routes.
  // This ensures the middleware runs on all pages but
  // is skipped for images, fonts, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
