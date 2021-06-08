

export async function SearchHawker(locations, languages) {

    const response = await fetch('/hawkers', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            location: locations,
            languages: languages
        })
    });

    const data = await response.json();

    return data;
}