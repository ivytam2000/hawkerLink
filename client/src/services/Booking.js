

export async function getAvailableSessions(){
    const response= await fetch('/booking');
    const data = await response.json();
    return data;
}
export async function sendBookedSession(id, startTime) {

    const response = await fetch('/search-hawker', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            startTime: startTime
        })
    });

    const data = await response.json();

    return data;
}