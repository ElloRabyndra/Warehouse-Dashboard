# IoT Warehouse Monitoring Dashboard

An interactive and real-time web dashboard for monitoring temperature and humidity in a warehouse, designed to complement an ESP32-based IoT system. This dashboard provides a comprehensive overview of environmental conditions, historical data, and system alerts to prevent goods from being damaged.

---

###  Tech Stack
* **React**: For building the user interface.
* **Tailwind CSS**: A utility-first CSS framework for rapid styling.
* **Shadcn UI**: A collection of reusable UI components built with Radix UI and Tailwind CSS.
* **Recharts**: A charting library for displaying historical data.
* **React Router**: For managing client-side routing.

---

### Features

* **Real-time Status Monitoring**: View the current temperature and humidity, along with the status of the fan and siren.
* **Automated Alerts History**: Log and display all critical alerts (e.g., high temperature, low humidity) triggered by the IoT device.
* **Historical Data Chart**: Visualize temperature and humidity trends over time using interactive charts.
* **System Health Status**: Check the connection status of the ESP32 device and the overall system health.
* **Simulation & Real-time Modes**: Seamlessly switch between a local data simulation mode and a live connection to the physical ESP32 device.

---

### Live Demo & ESP32 Integration

You can view a live demo of the dashboard running in **Simulation Mode** here:
[https://warehouse-dashboard-self.vercel.app/](https://warehouse-dashboard-self.vercel.app/)

The dashboard can be used in two primary modes:

1.  **Simulation Mode**: The dashboard will automatically use simulated data if a connection to the ESP32 cannot be established. This allows for front-end development and demonstration without the need for a physical device.
2.  **Real-time Integration**: The dashboard is designed to connect to an ESP32 microcontroller running a web server. It communicates via API endpoints to fetch live sensor data and system status.

The source code for the ESP32 backend/server can be found here:
**[https://github.com/ElloRabyndra/Warehouse-Monitoring](https://github.com/ElloRabyndra/Warehouse-Monitoring)**

### Getting Started

Follow these steps to set up and run the project locally.

#### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ElloRabyndra/Warehouse-Dashboard.git
    cd warehouse-dashboard
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn
    ```

#### Running the Project

1.  **Start the development server**:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173`.

The dashboard will initially run in simulation mode. To connect to an ESP32, follow these steps:
* Ensure your ESP32 device is running the server code from the backend repository.
* In the dashboard's connection settings, enter the IP address of your ESP32.

If you are using the **Wokwi simulator** in VS Code, ensure your `wokwi.toml` file is configured for port forwarding, and connect to `http://localhost:8180`.