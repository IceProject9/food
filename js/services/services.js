const postData = async (url, data) => {
    let res = await  fetch(url, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Не смог зафетчить ${url}, состояние: ${res.status}`);
    }


    return await res.json();
}

export {postData};
export {getResource};