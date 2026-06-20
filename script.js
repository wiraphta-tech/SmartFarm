// --- 1. ระบบเมนู Responsive (Mobile Toggle) ---
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // เปลี่ยนไอคอนสลับระหว่างแฮมเบอร์เกอร์กับกากบาท
    const icon = menuToggle.querySelector('i');
    if(navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
    } else {
        icon.className = 'fa-solid fa-bars';
    }
});


// --- 2. ฟังก์ชันแสดงเวลาแบบเรียลไทม์ ---
function updateTime() {
    const timeDisplay = document.getElementById('currentTime');
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    timeDisplay.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleDateString('th-TH', options)}`;
}
setInterval(updateTime, 1000);
updateTime();


// --- 3. ระบบควบคุมการเปิด-ปิด อุปกรณ์ (Switches) ---
function toggleDevice(device) {
    let isChecked, statusTextElement;
    
    if (device === 'water') {
        isChecked = document.getElementById('switchWater').checked;
        statusTextElement = document.getElementById('status-water');
        statusTextElement.innerText = isChecked ? "กำลังรดน้ำ..." : "ปิดใช้งาน";
        statusTextElement.style.color = isChecked ? "var(--primary-light)" : "var(--text-muted)";
    } 
    else if (device === 'fan') {
        isChecked = document.getElementById('switchFan').checked;
        statusTextElement = document.getElementById('status-fan');
        statusTextElement.innerText = isChecked ? "พัดลมกำลังทำงาน" : "ปิดใช้งาน";
        statusTextElement.style.color = isChecked ? "var(--primary-light)" : "var(--text-muted)";
    } 
    else if (device === 'light') {
        isChecked = document.getElementById('switchLight').checked;
        statusTextElement = document.getElementById('status-light');
        statusTextElement.innerText = isChecked ? "เปิดไฟส่องสว่าง" : "ปิดใช้งาน";
        statusTextElement.style.color = isChecked ? "var(--primary-light)" : "var(--text-muted)";
    }

    // UX Notification จำลองการส่งข้อมูลไป Hardware
    console.log(`ส่งคำสั่งไปยังบอร์ด: อุปกรณ์ ${device} -> สถานะ: ${isChecked ? 'ON' : 'OFF'}`);
}


// --- 4. ระบบความปลอดภัยจำลอง (Security System Toggle) ---
function toggleSecurity() {
    const securityBtn = document.getElementById('securityStatus');
    const isSecure = securityBtn.classList.contains('secure');

    if(isSecure) {
        // เปลี่ยนเป็นโหมดแจ้งเตือนอันตราย
        securityBtn.classList.remove('secure');
        securityBtn.classList.add('warning');
        securityBtn.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>ตรวจพบความผิดปกติ!</span>`;
        alert("🚨 แจ้งเตือนความปลอดภัย: พบค่าความชื้นในดินต่ำกว่ากำหนดในโซน B!");
    } else {
        // กลับสู่โหมดปลอดภัย
        securityBtn.classList.remove('warning');
        securityBtn.classList.add('secure');
        securityBtn.innerHTML = `<i class="fa-solid fa-lock"></i> <span>ระบบปลอดภัย</span>`;
    }
}


// --- 5. ระบบกราฟแสดงผลจำลอง (Chart.js Integration) ---
const ctx = document.getElementById('farmChart').getContext('2d');
const farmChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        datasets: [
            {
                label: 'ความชื้นในดิน (%)',
                data: [70, 68, 62, 60, 65, 72],
                borderColor: '#2e7d32', // สีเขียวหลัก
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            },
            {
                label: 'อุณหภูมิอากาศ (°C)',
                data: [24, 27, 32, 33, 29, 26],
                borderColor: '#121212', // สีดำตามธีม
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderDash: [5, 5], // กราฟเส้นประ
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { family: 'Sarabun' }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: { font: { family: 'Sarabun' } }
            },
            x: {
                ticks: { font: { family: 'Sarabun' } }
            }
        }
    }
});


// --- 6. จำลองการอัปเดตข้อมูลเซนเซอร์อัตโนมัติ (Real-time Simulation) ---
setInterval(() => {
    // สุ่มค่าแกว่งเล็กน้อยให้ดูสมจริง
    const currentTemp = (28 + Math.random() * 2).toFixed(1);
    const currentSoil = Math.floor(63 + Math.random() * 5);
    
    document.getElementById('tempValue').innerText = currentTemp;
    document.getElementById('soilHumidValue').innerText = currentSoil;
}, 5000); // อัปเดตทุกๆ 5 วินาที