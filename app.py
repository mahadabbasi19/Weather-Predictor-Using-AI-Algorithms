

from flask import Flask, jsonify, render_template 
import pandas as pd
from flask_cors import CORS
import datetime
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load datasets
def load_data(file_path):
    return pd.read_csv(file_path)

paths = [
    r"Karachi 2022-06-01 to 2024-12-25.csv",
    r"Karachi_Climate_Data.csv",
    r"weather_data_karachi.csv"
]

# Load and prepare data
dataframes = [load_data(path) for path in paths]
for df in dataframes:
    df['Tmax'] = df['Tmax'].fillna(0)
    df['Tmin'] = df['Tmin'].fillna(0)
    if 'Tavg' not in df.columns:
        df['Tavg'] = (df['Tmax'] + df['Tmin']) / 2

# data = pd.concat(dataframes, ignore_index=True)
data  = dataframes[0]
data['date'] = pd.to_datetime(data['date'], errors='coerce')
data = data.dropna(subset=['date'])
data['year'] = data['date'].dt.year
data['month'] = data['date'].dt.month
data['day'] = data['date'].dt.day
data['date_str'] = data['date'].dt.strftime('%Y-%m-%d')

# Prepare features and target for Random Forest
X = data[['year', 'month', 'day']]
y = data['Tavg']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest Regressor
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Serve prediction for today
@app.route('/predict', methods=['GET'])
def predict():
    today = datetime.datetime.now()
    today_features = [[today.year, today.month, today.day]]
    temp_pred = rf_model.predict(today_features)[0]  # Predict temperature for today
    return jsonify({"today_temp": round(temp_pred, 2)})

# FOR DataSet Karachi 2022 to 2026 
@app.route('/Karachi-22-24', methods=['GET'])
def dataSet1():
    grouped = data.groupby('year')
    year_data = {
        str(year): grouped.get_group(year)[['date_str', 'Tavg']].to_dict(orient='records')
        for year in grouped.groups
    }
    return jsonify(year_data)

data2  = dataframes[1]
data2['date'] = pd.to_datetime(data2['date'], errors='coerce')
data2 = data2.dropna(subset=['date'])
data2['year'] = data2['date'].dt.year
data2['month'] = data2['date'].dt.month
data2['day'] = data2['date'].dt.day
data2['date_str'] = data2['date'].dt.strftime('%Y-%m-%d')

# Prepare features and target for Random Forest
X = data2[['year', 'month', 'day']]
y = data2['Tavg']

# Split data into training and testing sets
X2_train, X2_test, y2_train, y2_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest Regressor
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)


# FOR DataSet Karachi-Climate-Data
@app.route('/Karachi-Climate-Data', methods=['GET'])
def dataSet2():
    grouped = data2.groupby('year')
    year_data = {
        str(year): grouped.get_group(year)[['date_str', 'Tavg']].to_dict(orient='records')
        for year in grouped.groups
    }
    return jsonify(year_data)


data3  = dataframes[2]
data3['date'] = pd.to_datetime(data3['date'], errors='coerce')
data3 = data3.dropna(subset=['date'])
data3['year'] = data3['date'].dt.year
data3['month'] = data3['date'].dt.month
data3['day'] = data3['date'].dt.day
data3['date_str'] = data3['date'].dt.strftime('%Y-%m-%d')

# Prepare features and target for Random Forest
X = data3[['year', 'month', 'day']]
y = data3['Tavg']

# Split data into training and testing sets
X3_train, X3_test, y3_train, y3_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest Regressor
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)


# FOR DataSet weather_data_karachia
@app.route('/weather_data_karachi', methods=['GET'])
def dataSet3():
    grouped = data3.groupby('year')
    year_data = {
        str(year): grouped.get_group(year)[['date_str', 'Tavg']].to_dict(orient='records')
        for year in grouped.groups
    }
    return jsonify(year_data)


if __name__ == '__main__':
    app.run(debug=True)
