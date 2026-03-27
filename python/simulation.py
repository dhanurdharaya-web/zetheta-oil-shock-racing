import random
import json

def generate_shock():
    shock_type = random.choice(["supply", "demand", "policy"])

    if shock_type == "supply":
        impact = random.uniform(10, 25)
    elif shock_type == "demand":
        impact = random.uniform(-20, -5)
    else:
        impact = random.uniform(-10, 10)

    return {
        "type": shock_type,
        "impact": round(impact, 2)
    }

def simulate_market(price):
    shock = generate_shock()
    new_price = price + shock["impact"]

    inflation = shock["impact"] * 0.03
    energy = shock["impact"] * 0.8
    airline = -shock["impact"] * 0.5

    return {
        "shock": shock,
        "price": round(new_price, 2),
        "inflation": round(inflation, 2),
        "energy_sector": round(energy, 2),
        "airline_sector": round(airline, 2)
    }

if __name__ == "__main__":
    result = simulate_market(80)
    print(json.dumps(result))