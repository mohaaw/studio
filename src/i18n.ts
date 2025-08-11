
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Providing a default is required if you use `getTranslator`
  const messages = (await import(`../messages/${locale}/common.json`)).default;
  
  return {
    locale,
    messages: {
      ...messages,
      Sidebar: (await import(`../messages/${locale}/sidebar.json`)).default,
      Dashboard: (await import(`../messages/${locale}/dashboard.json`)).default,
      Inventory: (await import(`../messages/${locale}/inventory.json`)).default,
      Repairs: (await import(`../messages/${locale}/repairs.json`)).default,
      Team: (await import(`../messages/${locale}/team.json`)).default,
      Modules: (await import(`../messages/${locale}/modules.json`)).default,
      POS: (await import(`../messages/${locale}/pos.json`)).default,
      Customers: (await import(`../messages/${locale}/customers.json`)).default,
      Returns: (await import(`../messages/${locale}/returns.json`)).default,
      Suppliers: (await import(`../messages/${locale}/suppliers.json`)).default,
      PurchaseOrders: (await import(`../messages/${locale}/purchase-orders.json`)).default,
      Expenses: (await import(`../messages/${locale}/expenses.json`)).default,
      TradeIns: (await import(`../messages/${locale}/trade-ins.json`)).default,
      Intake: (await import(`../messages/${locale}/intake.json`)).default,
      Reporting: (await import(`../messages/${locale}/reporting.json`)).default,
      TeamHub: (await import(`../messages/${locale}/team-hub.json`)).default,
      Settings: (await import(`../messages/${locale}/settings.json`)).default,
      Kiosk: (await import(`../messages/${locale}/kiosk.json`)).default,
      Login: (await import(`../messages/${locale}/login.json`)).default,
    }
  }
});

    