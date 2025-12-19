import { getCurrentTime } from './services/time.js';
import { getCountryData } from './services/country.js';
import { getRandomDogImage } from './services/weather.js'; // Köpek API'sini weather.js içine koyduğun için buradan çağırıyoruz

async function loadDashboard() {
    // 1. Verileri Çekelim
    // 'Europe/Istanbul' ve 'Turkey' değerlerini manuel verdik, istersen dinamik yapabilirsin
    const time = await getCurrentTime('Europe/Istanbul');
    const country = await getCountryData('Turkey');
    const dogImgUrl = await getRandomDogImage();

    // 2. Saat Kartını Güncelleyelim
    const timeCard = document.getElementById('time-card');
    if (timeCard && time) {
        timeCard.innerHTML = `
            <h3>Yerel Saat</h3>
            <p>Saat: ${time.time}</p>
            <p>Tarih: ${time.date}</p>
            <p style="font-size: 0.8rem; color: gray;">Bölge: ${time.timezone}</p>
        `;
    }

    // 3. Ülke Bilgisi Kartını Güncelleyelim
    const countryCard = document.getElementById('country-card');
    if (countryCard && country) {
        countryCard.innerHTML = `
            <h3>Ülke Bilgisi</h3>
            <div style="text-align: center; margin-bottom: 10px;">
                <img src="${country.flag}" width="100" style="border: 1px solid #ddd; border-radius: 4px;" />
            </div>
            <p><strong>Ülke:</strong> ${country.name}</p>
            <p><strong>Başkent:</strong> ${country.capital}</p>
            <p><strong>Nüfus:</strong> ${country.population}</p>
        `;
    }

    // 4. Köpek Kartını Güncelleyelim
    const dogCard = document.getElementById('weather-card'); // Hava durumu kartı yerine köpek resmini buraya koyalım
    if (dogCard && dogImgUrl) {
        dogCard.innerHTML = `
            <h3>Günün Köpeği</h3>
            <div style="text-align: center;">
                <img src="${dogImgUrl}" style="max-width: 100%; border-radius: 10px; margin-top: 10px;" />
            </div>
            <p style="font-size: 0.8rem; text-align: center; color: gray;">Rastgele Köpek API'den çekildi.</p>
        `;
    }
}

// Uygulamayı başlat
loadDashboard();
