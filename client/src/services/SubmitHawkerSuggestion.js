
export async function submitHawker(storeName, hawkerCentre, address, hawkerName, hawkerPhoneNumber, region, languages, reasonForHelp) {

    const response = await fetch('/suggest-hawker', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            storeName: storeName,
            hawkerCentre: hawkerCentre,
            address: address,
            hawkerName: hawkerName,
            hawkerPhoneNumber: hawkerPhoneNumber,
            region: region,
            languages: languages,
            reasonForHelp: reasonForHelp
        })
    });

    const data = await response.json();

    return data;
}
