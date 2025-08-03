# TechShop Manager

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
*   **Self-Service Kiosk Mode**: A simplified, customer-facing interface for browsing products and checking repair statuses. #kiosk #self-service
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
