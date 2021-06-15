

export async function SearchHawker(regionNames, languageNames) {

    const response = await fetch('/search-hawker', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            region: regionNames,
            languages: languageNames
        })
    });

    const data = await response.json();

    return data;
}