/**
 * Ülke adına göre (İngilizce) detaylı bilgi çeker.
 * @param {string} countryName - Örn: 'Turkey', 'France', 'Japan'
 */
export async function getCountryData(countryName) {
    // API URL (Filtreleme ekleyerek sadece ihtiyacımız olan alanları çekiyoruz)
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Ülke bulunamadı veya API hatası oluştu.");
        }

        const data = await response.json();
        
        // API bir dizi (array) döndürür, ilk eşleşmeyi alıyoruz
        const country = data[0];

        return {
            name: country.name.common,        // Ülkenin yaygın adı
            officialName: country.name.official, // Resmi adı
            capital: country.capital ? country.capital[0] : "Bilinmiyor",
            region: country.region,           // Kıta
            population: country.population.toLocaleString(), // Nüfusu formatlı getirir (örn: 85,000,000)
            flag: country.flags.png,          // Bayrak resim URL'si (PNG)
            map: country.maps.googleMaps      // Google Haritalar linki
        };

    } catch (error) {
        console.error("Ülke bilgisi çekilirken hata:", error);
        return null;
    }
}
