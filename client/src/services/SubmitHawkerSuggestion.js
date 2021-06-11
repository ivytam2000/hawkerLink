
export async function submitHawker(storeName, location, region, languages) {

    const response = await fetch('/suggest-hawker', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            store_name: storeName,
            location: location,
            region: region,
            languages: languages
        })
    });

    const data = await response.json();

    return data;
}
