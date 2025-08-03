# TechShop Manager 💻

Welcome to **TechShop Manager**, a comprehensive, AI-enhanced application designed to streamline the operations of a second-hand electronics store. This application is built with Next.js, TypeScript, and Tailwind CSS, featuring a modern and responsive user interface.

## Features

This application is packed with features designed to cover all aspects of running a modern electronics resale and repair shop:

*   **Advanced Analytics Dashboard**: Get a real-time overview of your business with stats on revenue, profit, sales, and inventory value. #analytics #dashboard #business-intelligence
*   **Complete Inventory Management**: Track every item in your store, from intake to sale or repair. View detailed item profiles and history. #inventory #stock-management
*   **Point of Sale (POS) System**: A fully-featured POS interface with cart management, product search, and barcode scanning capabilities. #pos #pointofsale #cash-register
*   **Repair Tracking Module**: Manage the entire repair lifecycle, from customer check-in and AI-powered diagnostics to completion and pickup. #repairs #repair-shop-software
*   **Customer Management (CRM)**: Keep a record of your customers, view their purchase history, and manage a loyalty program. #crm #customer-relationship-management
*   **AI-Powered Features (via Google's Genkit)**:
    *   **Repair Diagnostics**: Automatically get a preliminary diagnosis and parts suggestions based on the customer's issue description.
    *   **Product Descriptions**: Generate compelling, sales-focused descriptions for your items with one click.
    *   **Price Suggestions**: Receive intelligent pricing suggestions for both resale and trade-in items.
    *   **Marketing Content**: Create engaging copy for social media or email campaigns in seconds.
    *   **Kiosk Chatbot**: An AI assistant to help customers with common questions in the self-service kiosk.
    #ai #genai #genkit #google-gemini
*   **Trade-in & Buyback Management**: A dedicated workflow to process customer trade-ins, complete with AI-suggested valuation. #tradein #buyback
*   **Supplier & Purchase Order Tracking**: Manage your list of suppliers and keep track of all your purchase orders. #purchasing #supply-chain
*   **Self-Service Kiosk Mode**: A simplified, customer-facing interface for browsing products and checking repair statuses. #kiosk #self-service #customer-experience
*   **Employee Management**: Track employee information and manage roles and permissions. #hrm #staff-management
*   **Reporting & Analytics**: Generate detailed reports on sales, inventory, repairs, and more to gain insights into your business performance. #reporting #analytics #business-intelligence
*   **Multi-Store Support (Future)**: Designed with scalability in mind, with future plans for managing multiple store locations from a single instance. #scalability #multi-location
*   **Integration with Payment Gateways (Future)**: Planned integrations with popular payment processors for seamless transactions. #payments #ecommerce
*   **Integration with Shipping Carriers (Future)**: Future support for integrating with shipping services for online sales. #shipping #logistics

## Design Philosophy

TechShop Manager is built with a focus on **simplicity, efficiency, and intelligence**. The design principles guiding this application include:

*   **User-Centric Interface**: Prioritizing a clean, intuitive, and easy-to-navigate user interface that minimizes training time and maximizes productivity for store employees.
*   **Data-Driven Decisions**: Providing powerful analytics and reporting tools to empower store owners and managers to make informed business decisions based on real-time data.
*   **AI Augmentation**: Leveraging the power of AI to automate repetitive tasks, provide intelligent suggestions (diagnostics, pricing, descriptions), and enhance the customer experience through the Kiosk Chatbot. The AI features are integrated seamlessly into the workflow, acting as an assistant rather than a replacement for human expertise.
*   **Scalability and Future-Proofing**: Building on a modern, flexible tech stack that allows for easy expansion of features and integrations, including planned support for multi-store operations and external services like payment gateways and shipping carriers.
*   **Modularity**: Designing the application with a modular structure, allowing for independent development and maintenance of different features like Inventory, POS, Repairs, and CRM.
*   **Responsive Design**: Ensuring a consistent and optimal user experience across various devices, from desktops used by managers to tablets used at the POS or self-service kiosks.
*   **Security and Reliability**: Implementing best practices for data security and application reliability to protect sensitive business and customer information.
*   **Themability**: Offering multiple UI themes to allow users to personalize their workspace and reduce eye strain during long working hours.

The overall design aims to create a powerful yet user-friendly platform that serves as the central nervous system for a modern second-hand electronics store, enabling efficiency, growth, and a better experience for both employees and customers.

## Tech Stack

*   **Team Hub**: An internal space for team announcements and quick access to master price lists. #team-management
*   **Multiple UI Themes**: Switch between Light, Dark, and a special "Pro" theme to suit your preference. #theming #darkmode

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
*   **AI Integration**: [Genkit (Google)](https://firebase.google.com/docs/genkit)
*   **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps. This guide is compatible with **Windows, macOS, and Linux**.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or later) and npm installed on your system. You can verify this by running the following commands in your terminal:

```sh
node -v
npm -v
```

### Installation & Setup

1.  **Clone the repository**
    To get started, clone this repository to your local machine:
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    cd <YOUR_REPOSITORY_DIRECTORY>
    ```

2.  **Install dependencies**
    Once inside the project directory, install all the necessary packages using npm:
    ```sh
    npm install
    ```

3.  **Set up environment variables**
    This project uses Google's Genkit for its AI features, which requires an API key.
    *   Create a copy of the `.env.example` file (if it exists) or create a new file named `.env` in the root of the project.
    *   Obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Add your API key to the `.env` file like this:
        ```
        GEMINI_API_KEY=your_api_key_here
        ```

### Running the Application

This application requires running two processes simultaneously: the Next.js front-end and the Genkit AI flows.

1.  **Start the Genkit server**
    In your first terminal window, run the following command to start the AI agent:
    ```sh
    npm run genkit:dev
    ```
    This will start the Genkit development server, usually on port 3400.

2.  **Start the Next.js development server**
    In a second terminal window, run the following command to start the main application:
    ```sh
    npm run dev
    ```
    This will start the Next.js development server, usually on port 9002.

3.  **Open the app**
    Open your web browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application in action!
