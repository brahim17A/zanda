// script.js

async function fetchPrayerTimes(city) {
  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=Algeria&method=14`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.code === 200) {
      const timings = data.data.timings;
      document.getElementById("fajr").innerText = "الفجر: " + timings.Fajr;
      document.getElementById("dhuhr").innerText = "الظهر: " + timings.Dhuhr;
      document.getElementById("asr").innerText = "العصر: " + timings.Asr;
      document.getElementById("maghrib").innerText = "المغرب: " + timings.Maghrib;
      document.getElementById("isha").innerText = "العشاء: " + timings.Isha;
    } else {
      console.error("خطأ في جلب البيانات:", data);
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب مواقيت الصلاة:", error);
  }
}

function updateTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById("current-time").innerText = `${h}:${m}:${s}`;
}

function changeCity() {
  const city = document.getElementById("city").value;
  fetchPrayerTimes(city);
}

function toggleAzkar(type) {
  const azkarSection = document.getElementById("azkar-section");
  azkarSection.classList.remove("hidden");
  let azkarContent = "";

  if (type === "morning") {
    azkarContent = "🌅 بسم الله الذي لا يضر مع اسمه شيء...";
  } else if (type === "evening") {
    azkarContent = "🌇 أمسينا وأمسى الملك لله...";
  } else if (type === "night") {
    azkarContent = "🌙 اللهم باسمك أموت وأحيا...";
  }

  azkarSection.innerHTML = `<div class="bg-gray-100 p-4 rounded-lg shadow">${azkarContent}</div>`;
}

setInterval(updateTime, 1000);

window.onload = () => {
  updateTime();
  const defaultCity = document.getElementById("city").value;
  fetchPrayerTimes(defaultCity);
};
