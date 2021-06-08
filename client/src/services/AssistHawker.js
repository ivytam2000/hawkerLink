

export async function SearchHawker(regionName, languageName) {

    const response = await fetch('/hawkers', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            region: regionName,
            languages: languageName
        })
    });

    const data = await response.json();

    return data;
}