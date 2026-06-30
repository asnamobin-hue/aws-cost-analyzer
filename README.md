# AWS Cost Analyzer

> A full-stack cloud dashboard built using React, Flask and AWS Cost Explorer APIs.

A full-stack web application that helps visualize AWS cloud costs using the AWS Cost Explorer API.

The project consists of a Flask backend that fetches cost data from AWS and a React frontend that displays it in a clean dashboard with charts, budget tracking, and service-wise cost analysis.

This project also includes a demo mode, making it easy to explore the application without requiring an AWS account that already has billing data.

---

## Live Demo

**Frontend (Vercel)**  
https://aws-cost-analyzer.vercel.app/

**Backend (Render)**  
https://aws-cost-analyzer-1.onrender.com/

---

## Features

- View total AWS cost
- Monthly cost trend visualization
- Service-wise cost breakdown
- Budget overview with progress tracking
- Light and Dark theme
- Demo mode for showcasing the application
- Responsive dashboard
- Flask REST API
- AWS Cost Explorer integration

---

## Tech Stack

### Frontend
- React
- CSS
- Recharts

### Backend
- Flask
- Boto3
- Flask-CORS

### Cloud Services
- AWS Cost Explorer API
- AWS Budgets API

### Deployment
- Vercel
- Render

---

## Screenshots

### Dashboard (Light Mode)

![Dashboard Light](screenshots/dashboard-light.png)

### Dashboard (Dark Mode)

![Dashboard Dark](screenshots/dashboard-dark.png)

---

## Project Structure

```
aws-cost-analyzer
│
├── frontend
│
├── screenshots
│   ├── dashboard-light.png
│   └── dashboard-dark.png
│
├── app.py
├── requirements.txt
├── .gitignore
└── README.md
```

---

## Running Locally

### Clone the repository

```bash
git clone https://github.com/asnamobin-hue/aws-cost-analyzer.git
```

### Move into the project

```bash
cd aws-cost-analyzer
```

### Backend

Install dependencies

```bash
pip install -r requirements.txt
```

Run Flask

```bash
python app.py
```

---

### Frontend

Move into frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Start React

```bash
npm start
```

---

## Demo Mode

The application currently supports a demo mode.

When enabled, the backend returns sample AWS billing data so the dashboard can be explored without requiring an AWS account that already has billing information.

Switching to live AWS data only requires disabling demo mode.

---

## What I Learned

Building this project helped me understand:

- Building REST APIs using Flask
- Working with AWS SDK (Boto3)
- Using AWS Cost Explorer APIs
- Integrating frontend and backend applications
- React state management with Hooks
- Creating responsive dashboards
- Deploying Flask applications on Render
- Deploying React applications on Vercel
- Managing environment variables and API endpoints
- Connecting cloud services with a frontend application

---

## Future Improvements

Some features I would like to add in future versions:

- Custom date range selection
- Cost forecasting
- Download reports as CSV or PDF
- Authentication
- Multi-account AWS support
- Service filters
- Better analytics and insights

---

## Author

**Asna Mobin**

GitHub  
https://github.com/asnamobin-hue

LinkedIn  
https://www.linkedin.com/in/asna-mobin-57b5aa380

---

## License

This project is created for learning and portfolio purposes.
