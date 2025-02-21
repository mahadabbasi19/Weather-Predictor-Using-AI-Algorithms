
let currentChart1 = null;
let currentChart2 = null;
let currentChart3 = null;


document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=24.8607&longitude=67.0011&current_weather=true";

    // Fetch predictions from the backend
    fetch("http://127.0.0.1:5000/predict")
        .then(response => response.json())
        .then(data => {
            document.getElementById("today-temp-pred").textContent = `${data.today_temp.toFixed(2)}°C`;
        })
        .catch(error => console.error("Error fetching data:", error));

    // Fetch actual weather data from API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const currentTemp = data.current_weather.temperature;
            document.getElementById("actual-temp").textContent = `${currentTemp}°C`;
            document.getElementById("tomorrow-pred-temp").textContent = `${currentTemp}°C`;
        })
        .catch(error => console.error("Error fetching weather data:", error));

    // Fetch past data for graph rendering
    fetch("http://127.0.0.1:5000/Karachi-22-24")
        .then(response => response.json())
        .then(data => {
            const yearSelect = document.getElementById("dataset_1");
            const years = Object.keys(data);
            // Populate dropdown with years
            years.forEach(year => {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });

            // Handle year selection
            yearSelect.addEventListener("change", () => {
                const selectedYear = yearSelect.value;
                if (selectedYear) {
                    renderGraph1(data[selectedYear]);
                }
            });
        })
        .catch(error => console.error("Error fetching past data:", error));


        fetch("http://127.0.0.1:5000/Karachi-Climate-Data")
        .then(response => response.json())
        .then(data => {
            const yearSelect = document.getElementById("dataset_2");
            const years = Object.keys(data);
            // Populate dropdown with years
            years.forEach(year => {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });

            // Handle year selection
            yearSelect.addEventListener("change", () => {
                const selectedYear = yearSelect.value;
                if (selectedYear) {
                    renderGraph2(data[selectedYear]);
                }
            });
        })
        .catch(error => console.error("Error fetching past data:", error));

        fetch("http://127.0.0.1:5000/weather_data_karachi")
        .then(response => response.json())
        .then(data => {
            const yearSelect = document.getElementById("dataset_3");
            const years = Object.keys(data);
            // Populate dropdown with years
            years.forEach(year => {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });

            // Handle year selection
            yearSelect.addEventListener("change", () => {
                const selectedYear = yearSelect.value;
                if (selectedYear) {
                    renderGraph3(data[selectedYear]);
                }
            });
        })
        .catch(error => console.error("Error fetching past data:", error));

});

// Render chart using Chart.js
function renderGraph1(yearData) {
    const ctx = document.getElementById("graph-1").getContext("2d");

    // Destroy the existing chart instance if it exists
    if (currentChart1) {
        currentChart1.destroy();
    }

    const labels = yearData.map(entry => entry.date_str);
    const temperatures = yearData.map(entry => entry.Tavg);

    currentChart1 = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Average Temperature (°C)",
                data: temperatures,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Temperature (°C)"
                    }
                }
            }
        }
    });
}
function renderGraph2(yearData) {
    const ctx = document.getElementById("graph-2").getContext("2d");


    // Destroy the existing chart instance if it exists
    if (currentChart2) {
        currentChart2.destroy();
    }

    const labels = yearData.map(entry => entry.date_str);
    const temperatures = yearData.map(entry => entry.Tavg);

    currentChart2 = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Average Temperature (°C)",
                data: temperatures,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Temperature (°C)"
                    }
                }
            }
        }
    });
}

function renderGraph3(yearData) {
    const ctx = document.getElementById("graph-3").getContext("2d");


    // Destroy the existing chart instance if it exists
    if (currentChart3) {
        currentChart3.destroy();
    }

    const labels = yearData.map(entry => entry.date_str);
    const temperatures = yearData.map(entry => entry.Tavg);

    currentChart3 = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Average Temperature (°C)",
                data: temperatures,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Temperature (°C)"
                    }
                }
            }
        }
    });
}

