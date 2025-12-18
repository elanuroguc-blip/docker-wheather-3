export async function getCountry(code) {
const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
return await res.json();
}
