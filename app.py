from flask import Flask
from flask_cors import CORS
import os
import boto3
app = Flask(__name__)
CORS(app)
client = boto3.client("ce")       
DEMO_MODE = True
ACCOUNT_ID = os.getenv("AWS_ACCOUNT_ID")
@app.route("/total-cost")
def total_cost():
    if DEMO_MODE:
        return {
            "amount": "23.40",
            "unit": "USD"
        }
    response = client.get_cost_and_usage(
        TimePeriod={
            'Start': '2026-06-01' ,
            'End' : '2026-06-25'
        },
        Granularity="MONTHLY",
        Metrics=["UnblendedCost"]
    )
    results = response["ResultsByTime"]
    first = results[0]
    cost_info = first["Total"]["UnblendedCost"]

    amount = cost_info["Amount"]
    unit = cost_info["Unit"]

    return {
        "amount": amount,
        "unit": unit
    }
@app.route("/service-breakdown")
def service_breakdown():
    if DEMO_MODE:
        return [
            {"service":"Amazon EC2","amount":"9.80","unit":"USD"},
            {"service":"Amazon S3","amount":"5.60","unit":"USD"},
            {"service":"AWS Lambda","amount":"3.40","unit":"USD"},
            {"service":"Amazon RDS","amount":"2.90","unit":"USD"},
            {"service":"Amazon CloudWatch","amount":"1.70","unit":"USD"},
        ]
    response_b = client.get_cost_and_usage(
        TimePeriod={
            'Start' : '2026-06-01' ,
            'End' : '2026-06-25'
     },
     Granularity="MONTHLY",
     Metrics=["UnblendedCost"],
     GroupBy=[
          {
               "Type" : "DIMENSION" ,
               "Key" : "SERVICE"
            }
       ]
      )
    groups = response_b["ResultsByTime"][0]["Groups"] 
    services = []
    for group in groups:
        service = group["Keys"][0]
        amount = group["Metrics"]["UnblendedCost"]["Amount"]
        unit = group["Metrics"]["UnblendedCost"]["Unit"] 
        services.append({
           "service": service,
           "amount": amount,
           "unit": unit
})
    return services
@app.route("/monthly-trend")
def monthly_trend():
    if DEMO_MODE:
        return [
            {"month":"2026-01-01","amount":"14.20","unit":"USD"},
            {"month":"2026-02-01","amount":"18.60","unit":"USD"},
            {"month":"2026-03-01","amount":"16.40","unit":"USD"},
            {"month":"2026-04-01","amount":"21.10","unit":"USD"},
            {"month":"2026-05-01","amount":"19.80","unit":"USD"},
            {"month":"2026-06-01","amount":"23.40","unit":"USD"},
        ]
    response_c = client.get_cost_and_usage(
        TimePeriod={
            'Start' : '2026-01-01',
            'End' : '2026-06-30'
    },
    Granularity="MONTHLY",
    Metrics=["UnblendedCost"],
    )
    
    months = response_c["ResultsByTime"]
    monthly_data = []
    for month in months:
        start = month["TimePeriod"]["Start"]
        amount = month["Total"]["UnblendedCost"]["Amount"]
        unit = month["Total"]["UnblendedCost"]["Unit"]
        monthly_data.append({
            "month": start,
            "amount": amount,
            "unit" : unit
})
    return monthly_data
@app.route("/budget")
def budget():
    budget_client = boto3.client("budgets")
    if DEMO_MODE:
        return {
            "budget": 50.00,
            "spent": 23.40,
            "remaining": 26.60,
            "forecast": 31.20,
            "status": "HEALTHY",
            "unit": "USD"
        } 
    response_d = budget_client.describe_budgets(
        AccountId=ACCOUNT_ID
    )
    budget = response_d["Budgets"][0]
    budget_limit = float(budget["BudgetLimit"]["Amount"])
    status = budget["HealthStatus"]["Status"]
    unit = budget["BudgetLimit"]["Unit"]
    forecast = float(budget["CalculatedSpend"]["ForecastedSpend"]["Amount"])
    actual_spend = float(budget["CalculatedSpend"]["ActualSpend"]["Amount"])
    remaining = float(budget_limit)-float(actual_spend)
    return { 
        "budget": budget_limit,
        "spent": actual_spend,
        "remaining": remaining,
        "forecast": forecast,
        "status": status,
        "unit": unit
    }
if __name__ == "__main__":
    app.run(debug=True)
