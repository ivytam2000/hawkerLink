
export async function AssistHawker(name, email, hawkerIds, number, availability, languages) {

    const response = await fetch('/assist-hawker', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            hawkerIds: hawkerIds,
            number: number,
            availability: availability,
            languages:languages
        })
    });

    const data = await response.json();

    return data;
}