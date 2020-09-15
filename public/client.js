async function getEventData(){

    const options = {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    }

    const res = await fetch('/getData', options);
    let data = await res.json();
    console.log(data);
}

getEventData();