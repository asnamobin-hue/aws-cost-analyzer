from flask import Flask
import boto3
app = Flask(__name__)
client = boto3.client("ce")       
@app.route("/total-cost")
def total_cost():
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
    response_d = budget_client.describe_budgets(
        AccountId="978092319786"
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
