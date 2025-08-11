# TechShop Manager Pro 💻

Welcome to **TechShop Manager**, a comprehensive, AI-enhanced application designed to streamline the operations of a second-hand electronics store. This application is built with Next.js, TypeScript, and Tailwind CSS, featuring a modern and responsive user interface.

## Key Features & Improvements

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
*   **Multi-Language Support**: Seamlessly switch between **English** and **Arabic** to cater to a broader user base and improve accessibility.
    *   **English**: The default language, providing a familiar interface for a wide audience.
    *   **Arabic**: Newly added support, offering full translation of the user interface and content for Arabic-speaking users. This enhances usability and expands the application's potential reach. #multilanguage #i18n #localization #arabic
*   **Improved User Interface and Experience**: Refined design and navigation for a more intuitive and efficient workflow across all modules.
*   **Enhanced Performance**: Optimized backend processes and frontend rendering for faster load times and smoother interactions.
*   **Supplier & Purchase Order Tracking**: Manage your list of suppliers and keep track of all your purchase orders. #purchasing #supply-chain
*   **Self-Service Kiosk Mode**: A simplified, customer-facing interface for browsing products and checking repair statuses. #kiosk #self-service #customer-experience
*   **Employee Management**: Track employee information and manage roles and permissions. #hrm #staff-management
*   **Reporting & Analytics**: Generate detailed reports on sales, inventory, repairs, and more to gain insights into your business performance. #reporting #analytics #business-intelligence
*   **Multi-Store Support (Future)**: Designed with scalability in mind, with future plans for managing multiple store locations from a single instance. #scalability #multi-location
*   **Integration with Payment Gateways (Future)**: Planned integrations with popular payment processors for seamless transactions. #payments #ecommerce
*   **Integration with Shipping Carriers (Future)**: Future support for integrating with shipping services for online sales. #shipping #logistics

## Design Philosophy

TechShop Manager Pro is built upon a robust and thoughtful design philosophy focused on providing a powerful, intuitive, and scalable solution for managing second-hand electronics businesses. Key principles include:

*   **Efficiency and Streamlining**: Automating and simplifying complex workflows to reduce manual effort and increase operational efficiency.

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

This guide provides instructions for setting up and running the TechShop Manager project on both **EndeavourOS (Linux)** and **Windows 11**.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js**: Version 18.x or later.
*   **npm**: Node Package Manager, which comes with Node.js.
*   **Git**: For cloning the repository.
*   **Visual Studio Code (Recommended)**: With the integrated terminal.

You can verify your Node.js and npm installations by running:
```sh
node -v
npm -v
```

### 1. Clone the Repository

First, clone the project repository to your local machine using Git. Open your terminal or command prompt and run:

```sh
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_DIRECTORY>
```

### 2. Install Dependencies

Once you are inside the project directory, install all the required Node.js packages:

```sh
npm install
```

### 3. Set Up Environment Variables

This project uses Google's Genkit for its AI features, which requires a Google AI (Gemini) API key.

1.  Create a new file named `.env` in the root directory of the project.
2.  Obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add your API key to the `.env` file as follows:

    ```
    GEMINI_API_KEY=your_api_key_here
    ```

### 4. Running the Application

The application requires two separate processes to run concurrently: the **Next.js front-end** and the **Genkit AI server**. The following instructions are for using the integrated terminal within Visual Studio Code, which is the recommended approach.

1.  **Open the project in Visual Studio Code.**

2.  **Open two integrated terminals:**
    *   You can open a terminal by going to `Terminal > New Terminal` in the menu bar.
    *   Split the terminal by clicking the "Split Terminal" icon (a square with a vertical line). You should now have two terminal panels side-by-side.

3.  **Start the Genkit AI Server (Terminal 1):**
    In the first terminal panel, run the following command to start the Genkit server. This server handles all the AI-powered features.

    ```sh
    npm run genkit:dev
    ```
    You should see output indicating that the Genkit server has started, typically on port 3400.

4.  **Start the Next.js Development Server (Terminal 2):**
    In the second terminal panel, run the following command to start the main Next.js application.

    ```sh
    npm run dev
    ```
    This will start the front-end development server, usually on port 9002.

5.  **Access the Application:**
    Open your web browser and navigate to **http://localhost:9002**. You should now see the TechShop Manager login screen.

You are all set! The application is now running locally on your machine.
