/**
 * Rastgele bir köpek resmi URL'si çeker.
 */
export async function getRandomDogImage() {
    const url = "https://dog.ceo/api/breeds/image/random";

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Köpek resmi alınamadı.");
        }

        const data = await response.json();
        
        // API { message: "URL", status: "success" } şeklinde bir obje döndürür
        return data.message; 

    } catch (error) {
        console.error("Dog API Hatası:", error);
        return null;
    }
}
