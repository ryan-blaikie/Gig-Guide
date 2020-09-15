$(document).ready(function(){

    const createTable = (data) =>  {
        for(let i=0; i<data.length; i++){
            let name = data[i].name;
            let place = data[i].location.name;
            let dates = data[i].datetime_summary;
            let tableRef = document.getElementById("gigs");
            let newRow  = tableRef.insertRow(-1);
            let cell1 = newRow.insertCell(0);
            let text1 = document.createTextNode(name);
            cell1.appendChild(text1);
            let cell2 = newRow.insertCell(1);
            let text2 = document.createTextNode(place);
            cell2.appendChild(text2);
            let cell3 = newRow.insertCell(2);
            let text3 = document.createTextNode(dates);
            cell3.appendChild(text3);
        }
    }

    async function getEventData(){

        const options = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }
    
        const res = await fetch('/getData', options);
        let data = await res.json();
        data = data.body;
        createTable(data);
    }

    getEventData();


$("#evfinda").click(function(){
    window.open("https://www.eventfinda.co.nz", '_blank');
})

});
