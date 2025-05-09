// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-SrSWIAvlp4CFLhuDydE-ZXR6bToaQ0I",
    authDomain: "web-lab1-ad91a.firebaseapp.com",
    databaseURL: "https://web-lab1-ad91a-default-rtdb.firebaseio.com",
    projectId: "web-lab1-ad91a",
    storageBucket: "web-lab1-ad91a.firebasestorage.app",
    messagingSenderId: "408112047347",
    appId: "1:408112047347:web:9aee2e9238b4f81aa84386",
    measurementId: "G-8YQ5FQFX0M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Chart configuration
const ctx = document.getElementById('weatherChart').getContext('2d');
const weatherChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Thác Trắng Minh Long', 'Mũi Ba Làng An', 'Bãi Muối Sa Huỳnh'],
        datasets: [
            {
                label: 'Nhiệt độ (°C)',
                data: [],
                backgroundColor: 'rgba(255, 0, 0, 0.6)', // Màu đỏ nhạt
                borderColor: 'rgb(255, 5, 59)', // Màu đỏ đậm
                borderWidth: 1
            },
            {
                label: 'Độ ẩm (%)',
                data: [],
                backgroundColor: 'rgba(0, 255, 34, 0.6)', // Màu xanh dương nhạt
                borderColor: 'rgb(0, 153, 255)', // Màu xanh dương đậm
                borderWidth: 1
            },
            {
                label: 'Lượng mưa (mm)',
                data: [],
                backgroundColor: 'rgba(0, 255, 255, 0.6)', // Màu xanh lá nhạt
                borderColor: 'rgb(31, 114, 114)', // Màu xanh lá đậm
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)' // Màu lưới trục y
                },
                ticks: {
                    color: 'white' // Màu chữ trục y
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)' // Màu lưới trục x
                },
                ticks: {
                    color: 'white' // Màu chữ trục x
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white' // Màu chữ chú thích
                }
            }
        }
    }
});

// Function to update sensor values and chart
function updateSensorValues(area, index) {
    const tempRef = database.ref(`${area}/Nhietdo`);
    const humidityRef = database.ref(`${area}/Doam`);
    const rainRef = database.ref(`${area}/Luongmua`);

    tempRef.on('value', (snapshot) => {
        const temp = snapshot.val();
        document.getElementById('tempValue').innerText = temp;
        weatherChart.data.datasets[0].data[index] = temp;
        weatherChart.update();
    });

    humidityRef.on('value', (snapshot) => {
        const humidity = snapshot.val();
        document.getElementById('humidityValue').innerText = humidity;
        weatherChart.data.datasets[1].data[index] = humidity;
        weatherChart.update();
    });

    rainRef.on('value', (snapshot) => {
        const rain = snapshot.val();
        document.getElementById('rainValue').innerText = rain;
        weatherChart.data.datasets[2].data[index] = rain;
        weatherChart.update();
    });
}

// Functions for each area
function function_q1() {
    updateSensorValues('quan1', 0);
}

function function_q2() {
    updateSensorValues('quan2', 1);
}

function function_q3() {
    updateSensorValues('quan3', 2);
}

// Điều khiển thiết bị
function toggleDevice(device, imgId, state = true) {
    let img = document.getElementById(imgId);
    
    if (state) {
        img.style.filter = "brightness(1.5)";
    } else {
        img.style.filter = "brightness(0.5)";
    }
}

// Clock function
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();