
export async function AssistHawker(name, email, hawkerIds, number, availability, languages, comfortable) {

    const response = await fetch('/volunteer-signup', {
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
            languages:languages,
            comfortable: comfortable
        })
    });

    const data = await response.json();

    return data;
}