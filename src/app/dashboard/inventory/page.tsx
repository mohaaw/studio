
import InventoryClientPage from "@/components/inventory/inventory-client-page";

// Note: This data would typically be fetched from a database.
const inventoryItems = [
  { id: '1', sku: 'IP13P-256-GR', name: 'iPhone 13 Pro', serial: 'F17G83J8Q1J9', category: 'Phones', location: 'Shop 1', status: 'For Sale', purchasePrice: 750.00, salePrice: 999.00, image: 'https://placehold.co/64x64.png' },
  { id: '2', sku: 'MBA-M2-512-SG', name: 'MacBook Air M2', serial: 'C02H1234ABCD', category: 'Laptops', location: 'Storehouse', status: 'Intake', purchasePrice: 950.00, salePrice: 1199.00, image: 'https://placehold.co/64x64.png' },
  { id: '3', sku: 'AW8-45-ALU-MD', name: 'Apple Watch Series 8', serial: 'G99KAP123XYZ', category: 'Wearables', location: 'Shop 2', status: 'For Sale', purchasePrice: 280.00, salePrice: 399.00, image: 'https://placehold.co/64x64.png' },
  { id: '4', sku: 'SGS23-256-BK', name: 'Samsung Galaxy S23', serial: 'R58R3ABC123', category: 'Phones', location: 'Shop 1', status: 'Sold', purchasePrice: 600.00, salePrice: 899.00, image: 'https://placehold.co/64x64.png' },
  { id: '5', sku: 'DXPS13-I7-16-W', name: 'Dell XPS 13', serial: '5CG1234567', category: 'Laptops', location: 'Storehouse', status: 'Under Repair', purchasePrice: 800.00, salePrice: 1099.00, image: 'https://placehold.co/64x64.png' },
  { id: '6', sku: 'AP-PRO2-W', name: 'AirPods Pro 2', serial: 'GX7Y2345Z123', category: 'Accessories', location: 'Shop 1', status: 'For Sale', purchasePrice: 180.00, salePrice: 249.00, image: 'https://placehold.co/64x64.png' },
];

export default function InventoryPage() {
  // In a real app, you'd fetch inventoryItems from an API
  return <InventoryClientPage initialItems={inventoryItems} />;
}
