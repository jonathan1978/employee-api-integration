# Technical Test - Employee API

This repository contains a web server solution developed for a technical test, leveraging the BambooHR API for employee data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jonathan1978/employee-api-integration.git
   cd employee-api-integration
   npm install

2. Configure Environment Variables:

   Copy the .env.example file to .env and update the environment variables as needed:

   ```bash
   cp .env.example .env

   Open the .env file and replace the placeholder values with your configuration.

## Usage

To run the application locally:

```bash
npm run dev

Ensure you have a tool like Postman for testing the employee GET endpoint.
1. Access the endpoint:
   Use the endpoint ${baseUrl}/employees/employeeId, Example: http://localhost:3000/employees/4
2. Testing with EmployeeIds:
   You can use any valid employeeId, but if the provided employeeId is not in the system, it will return a "Not Found" response.
   Example employeeIds: 4, 5, 37, 88

Feel free to explore and test the employee API integration!
