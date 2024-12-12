function diagnoseNetwork() {
    const modulation = document.getElementById("modulation").value;
    const band = document.getElementById("band").value;

    let result = `Diagnostics Results:\nModulation Scheme: ${modulation.toUpperCase()}\nFrequency Band: ${band} GHz`;

    document.getElementById("result").innerText = result;
    updateChart(modulation, band);
}

function saveConfiguration() {
    const modulation = document.getElementById("modulation").value;
    const band = document.getElementById("band").value;

    const config = { modulation, band };
    localStorage.setItem("wimaxConfig", JSON.stringify(config));
    alert("Configuration saved successfully!");
}

function loadConfiguration() {
    const savedConfig = JSON.parse(localStorage.getItem("wimaxConfig"));
    if (savedConfig) {
        document.getElementById("modulation").value = savedConfig.modulation;
        document.getElementById("band").value = savedConfig.band;
        alert("Configuration loaded successfully!");
    } else {
        alert("No configuration found!");
    }
}

function updateChart(modulation, band) {
    const ctx = document.getElementById("metricsChart").getContext("2d");
    if (window.myChart) {
        window.myChart.destroy();
    }

    const data = {
        labels: ["QPSK", "16-QAM", "64-QAM"],
        datasets: [
            {
                label: `Performance Metrics for ${band} GHz`,
                data: modulation === "qpsk" ? [75, 50, 25] :
                      modulation === "16qam" ? [60, 80, 55] :
                      [40, 60, 90],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
        ]
    };

    window.myChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
