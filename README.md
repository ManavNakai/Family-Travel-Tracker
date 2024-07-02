# Family-Travel-Tracker

Family-Travel-Tracker is an application that allows users to keep track of all the countries they and their family members have visited. Each family member has a tab button of their own name and color. The world map displays the countries visited by the selected family member highlighted by the same color given to him/her. This project is an extension of the previous "Travel-Tracker" project, adding functionality to track visits by multiple users.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview
Family-Travel-Tracker is a basic website with a minimal frontend that uses Node.js and Express.js to create a backend server running at `localhost:3000` and renders EJS dynamically. PostgreSQL is used to store three tables: `countries`, `visited_countries`, and `users`. PG Admin is used as a tool to create and manage the PostgreSQL database, and dotenv is used to manage environment variables for database connection information.

## Tech Stack
- **CSS3**: For styling the web page.
- **Node.js**: For setting up the backend server.
- **Express.js**: For managing server-side logic and routing.
- **EJS**: For rendering dynamic content on the web page.
- **PostgreSQL**: For storing data related to countries, visited_countries and users. It also makes a relation between visited_countries and users tables based on the users' id.

## Features
- **Multi-user Functionality**: Allows users to add multiple family members using `Add Family Member` button.
- **Track Visited Countries by Multiple Users**: Allows users to keep track of all the countries they and their family members have visited.
- **Color-Coded Visits**: Different colors for different family members to easily identify which family member is currently selected.
- **Database Management**: Uses PostgreSQL to store country codes data, visited countries data, and users data.
- **Dynamic Rendering**: Utilizes EJS to render dynamic content on the frontend.
- **User Input**: Users can input the country names of the countries they or their family members have visited.

## Getting Started
To get a local copy up and running, follow these simple steps:

### Prerequisites
- Node.js installed on your local machine
- PostgreSQL installed and configured
- PG Admin installed for database management
- A code editor (e.g., VSCode)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/ManavNakai/Family-Travel-Tracker.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Family-Travel-Tracker
   ```
3. Install the required dependencies:
   ```sh
   npm install
   ```
4. Set up the PostgreSQL database `world` locally using PG Admin and create three tables:
   
   4.1. **Open PG Admin and create a new database**:
   
   - Open PG Admin and create a new database named `world`.
   
   4.2. **Create the `countries` table**:
   
   - Create a table named `countries` with the following structure:

     ```sql
     CREATE TABLE countries (
       id SERIAL PRIMARY KEY,
       country_code CHAR(2) NOT NULL,
       country_name VARCHAR(255) NOT NULL
     );
     ```
     
   - Import the `countries.csv` file provided with the project files into the `countries` table. In PG Admin, go to the `countries` table, right-click and select `Import/Export`, then follow the instructions to import the CSV file.
     
   4.3. **Create the `users` table**:
   
   - Create a table named `users` with the following structure:
     
     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(15) UNIQUE NOT NULL,
       colour VARCHAR(15)
     );
     ```
     
   4.4. **Create the `visited_countries` table**:

   - Create a table named `visited_countries` with the following structure:
   
     ```sql
     CREATE TABLE visited_countries (
       id SERIAL PRIMARY KEY,
       country_code CHAR(2) NOT NULL,
       user_id INTEGER REFERENCES users(id),
       ADD UNIQUE(user_id, country_code)
     );
     ```
     
5. Create a `.env` file in the project root and add your PostgreSQL database connection details:
   ```plaintext
   PG_USER=your_db_user
   PG_HOST="localhost"
   PG_DATABASE="world"
   PG_PASSWORD=your_db_password
   PG_PORT="5432"
   ```
6. Start the server:
   ```sh
   node index.js
   ```
7. Open your web browser and go to `http://localhost:3000`.

## Usage
- Open your web browser and navigate to `http://localhost:3000`.
- Add Family Members using `Add Family Member` button.
- Use the input field to enter the country names of the countries you or your family members have visited.
- The application will consist of a world map that displays the countries visited by the selected family member highlighted by the same color given to him/her.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have suggestions for improving the project, please follow these steps:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Project Link: [https://github.com/ManavNakai/Family-Travel-Tracker](https://github.com/ManavNakai/Family-Travel-Tracker)

---

Feel free to reach out if you have any questions or need further assistance! Thank you for checking out Family-Travel-Tracker!
