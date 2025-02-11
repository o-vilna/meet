# Meet App

## Project Overview
The Meet App is a serverless, progressive web application (PWA) developed with React using a test-driven development (TDD) approach. The application leverages the Google Calendar API to fetch and display upcoming events and offers advanced features such as offline usage and data visualization.

### Objective
The primary goal is to create a high-quality, responsive application that meets the latest web development trends, including serverless architecture and PWA functionalities. The use of TDD ensures robust and reliable code while providing immediate feedback during development.

## Features
1. **Filter Events By City:** Users can search for and filter events by city to focus on specific locations.
2. **Show/Hide Event Details:** Users can show or hide event details to view only the relevant information.
3. **Specify Number of Events:** Users can control the number of events displayed on the screen.
4. **Use the App When Offline:** The app provides offline support, enabling access to cached event data.
5. **Add an App Shortcut to the Home Screen:** Users can install the app as a shortcut for quicker access.
6. **Display Charts Visualizing Event Details:** Visual charts help users better understand event trends and statistics.

## Technologies Used
- **React:** Front-end library for building the user interface.
- **Vite:** Build tool for fast and optimized React development.
- **AWS Lambda:** Serverless backend functions.
- **Google Calendar API:** Fetch event data.
- **Service Workers:** Enable offline functionality.
- **Chart.js/Recharts:** Data visualization libraries.
- **Jest/Enzyme:** Testing frameworks for TDD.
- **GitHub and Vercel:** Deployment and hosting platforms.

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/o-vilna/meet
   ```
2. Navigate to the project directory:
   ```bash
   cd meet-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Run tests:
   ```bash
   npm test
   ```
6. Deploy to Vercel:
   ```bash
   vercel deploy
   ```

## Testing Instructions
- Ensure all tests pass by running:
  ```bash
  npm test --coverage
  ```
- View the test coverage report to verify at least 90% coverage.

## User Stories

### Filter Events By City
- **As a user:** I want to filter events by city so that I can find events in a specific location.

### Show/Hide Event Details
- **As a user:** I should be able to show or hide event details so that I can view only the information I find relevant.

### Specify Number of Events
- **As a user:** I should be able to specify the number of events displayed so that I can control the amount of information shown on the screen.

### Use the App When Offline
- **As a user:** I should be able to use the app offline so that I can access event information without an internet connection.

### Add an App Shortcut to the Home Screen
- **As a user:** I should be able to add the app to my home screen so that I can access it faster and more conveniently.

### Display Charts Visualizing Event Details
- **As a user:** I should be able to see charts visualizing event details so that I can better understand trends and statistics.

## Feature Scenarios

### Feature: Filter Events By City
- **Scenario:** Show Upcoming Events from All Cities When User Hasn't Searched for a City
  - Given the user is on the events page
  - When the user hasn't searched for a city
  - Then the user should see upcoming events from all cities

- **Scenario:** Show a List of Suggestions When User Searches for a City
  - Given the user is on the events page
  - When the user starts typing in the city search bar
  - Then the user should see a list of suggestions matching the search term

- **Scenario:** User Can Select a City from the Suggested List
  - Given the user is on the events page
  - When the user selects a city from the suggested list
  - Then events from that city are displayed

### Feature: Show/Hide Event Details
- **Scenario:** An Event Element is Collapsed by Default
  - Given the user opens the events page
  - When the page loads
  - Then all event elements are collapsed by default

- **Scenario:** User Can Expand an Event to See Details
  - Given an event is collapsed
  - When the user clicks on the event
  - Then the event details are displayed

- **Scenario:** User Can Collapse an Event to Hide Details
  - Given an event is expanded
  - When the user clicks on the event
  - Then the event details are hidden

### Feature: Specify Number of Events
- **Scenario:** Default Number of Events is 32
  - Given the user has not specified a number of events
  - When the page loads
  - Then 32 events are displayed

- **Scenario:** User Can Change the Number of Events Displayed
  - Given the events page is open
  - When the user specifies a number of events
  - Then the specified number of events is displayed

### Feature: Use the App When Offline
- **Scenario:** Show Cached Data When There’s No Internet Connection
  - Given there is no internet connection
  - When the user opens the app
  - Then cached event data is displayed

- **Scenario:** Show Error When User Changes Search Settings
  - Given there is no internet connection
  - When the user changes the city or the number of events
  - Then an error message is displayed

### Feature: Add an App Shortcut to the Home Screen
- **Scenario:** Install the App as a Shortcut
  - Given the user is using the app on a supported device
  - When the user chooses to install the app
  - Then the app is added as a shortcut on the home screen

### Feature: Display Charts Visualizing Event Details
- **Scenario:** Show a Chart with the Number of Upcoming Events in Each City
  - Given there are upcoming events in multiple cities
  - When the user opens the charts view
  - Then a chart showing the number of upcoming events per city is displayed

## Contribution Guidelines
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes with clear messages.
4. Open a pull request and describe your changes.

## License
This project is licensed under the MIT License.
