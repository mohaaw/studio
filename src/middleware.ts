
import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en',
});
 
export const config = {
  // Match all paths except for assets, api routes, and the kiosk page.
  // This ensures the middleware runs on all pages but
  // is skipped for images, fonts, and the non-localized kiosk route.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|kiosk).*)']
};
