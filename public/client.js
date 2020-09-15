$(document).ready(function(){
    let data;
    const createTable = (data, city) =>  {
        let noResults = true; 
        let tableRef = document.getElementById("gigs");
        for(let i=0; i<data.length; i++){
            //exclude canceled and show Auckland only
            if (data[i].is_cancelled == false 
                && data[i].name.includes("SOLD OUT")==false 
                && data[i].address.includes(city)){
                noResults = false;

                let name = data[i].name;
                let place = data[i].location.name;
                let dates = data[i].datetime_summary;
                let genre = data[i].category.name;
                
                //Insert Row
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
                let cell4 = newRow.insertCell(1);
                let text4 = document.createTextNode(genre);
                cell4.appendChild(text4);
            }
        }
        if (noResults == true){$("#no-results").css("display", "block");}
        else{
            $("#no-results").css("display", "none")
                //Construct headers
                let header = tableRef.createTHead();
                $("thead").css("text-align", "center");
                let headerR = header.insertRow(0);
                let c1 = headerR.insertCell(0);
                c1.innerHTML = "<b>Name<b>";
                let c2 = headerR.insertCell(1);
                c2.innerHTML = "<b>Genre<b>";
                let c3 = headerR.insertCell(2);
                c3.innerHTML = "<b>Location<b>";
                let c4 = headerR.insertCell(3);
                c4.innerHTML = "<b>Dates<b>";
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
        data = await res.json();
        data = data.body;
        createTable(data, "");
    }

    getEventData();


$("#evfinda").click(function(){
    window.open("https://www.eventfinda.co.nz", '_blank');
})

$("#filterbtn").click(function(){
    let city = $("#city").val();
    $("#gigs").empty();
    createTable(data, city);
})

});
