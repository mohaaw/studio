import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // Redirect / to /en/dashboard
  pathnames: {
    '/': '/'
  }
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ar)/:path*']
};