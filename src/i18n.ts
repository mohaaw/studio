
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Providing a default is required if you use `getTranslator`
  const messages = (await import(`../messages/${locale}/common.json`)).default;
  
  return {
    locale,
    messages: {
      ...messages,
      Sidebar: (await import(`../messages/${locale}/sidebar.json`)).default,
      Modules: (await import(`../messages/${locale}/modules.json`)).default,
    }
  }
});
