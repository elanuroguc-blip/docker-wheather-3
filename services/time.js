/**
 * Belirlenen zaman dilimine (timezone) göre güncel saat verisini çeker.
 * @param {string} timezone - Varsayılan olarak 'Europe/Istanbul'
 */
export async function getCurrentTime(timezone = "Europe/Istanbul") {
    const url = `http://worldtimeapi.org/api/timezone/${timezone}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API hatası: ${response.status}`);
        }

        const data = await response.json();

        // API'den gelen veriyi daha kullanışlı bir hale getiriyoruz
        const fullDateTime = new Date(data.datetime);
        
        return {
            date: fullDateTime.toLocaleDateString('tr-TR'), // Örn: 19.12.2023
            time: fullDateTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }), // Örn: 14:30
            timezone: data.timezone,
            dayOfWeek: data.day_of_week // Haftanın kaçıncı günü olduğu
        };

    } catch (error) {
        console.error("Zaman bilgisi çekilirken bir hata oluştu:", error);
        return null;
    }
}
