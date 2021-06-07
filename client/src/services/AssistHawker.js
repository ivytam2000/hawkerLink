

export async function SearchHawker(locationName, languageName) {

    const response = await fetch('/hawkers', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            location: locationName,
            languages: languageName
        })
    });

    const data = await response.json();

    return data;
}