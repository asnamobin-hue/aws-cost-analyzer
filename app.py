from flask import Flask
import boto3
app = Flask(__name__)
@app.route("/total-cost")
def total_cost():
    client = boto3.client("ce")
    response = client.get_cost_and_usage(
        TimePeriod={
            'Start': '2026-06-01' ,
            'End' : '2026-06-25'
    },
        Granularity='MONTHLY',
        Metrics=['UnblendedCost']
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
if __name__ == "__main__":
    app.run(debug=True)
