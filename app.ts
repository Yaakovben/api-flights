const  BASE_URL:string = "https://66eaf30a55ad32cda47b1270.mockapi.io/api/"
const selectFlights: HTMLSelectElement = document.querySelector('.Select')!
const add: HTMLSelectElement = document.querySelector('.add')!
const inputName: HTMLSelectElement = document.querySelector('.inputName')!
const Select: HTMLSelectElement = document.querySelector('.Select')!
const clients: HTMLSelectElement = document.querySelector('.clients')!
const refresh: HTMLSelectElement = document.querySelector('.ref')!



// ריצה על כל הטיסות הקיימות
 const getFlights = async ():Promise<void> =>{
    try{
        const res:Response = await fetch(BASE_URL +"flights")
        const flights:Flights[] = await res.json()
        for(let flight of flights){
            // קריאה לפונקצייה שיוצרת סלקט
            optionFlights(flight)
        }
    }catch(err){
        console.log(err); 
    }
 }


 //  יצירת אופשן עבור כל טיסה
 const optionFlights = (flight:Flights):void =>{
    const opt: HTMLOptionElement = document.createElement('option')
    opt.value = flight.id
    opt.textContent = `${flight.from} => ${flight.to} (${flight.date})`
    selectFlights.appendChild(opt)
    console.log(flight);   
 }

 // קריאה לפונקצייה שציג תסלקט
 getFlights()


 // פונקציית הכנסה לAPI

add.addEventListener("click",async():Promise<void> =>{
    try{
        const res:Response = await fetch(BASE_URL+"pasangers", {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                createdAt: new Date().toLocaleDateString(),
                name: inputName.value,
                gender:(document.querySelector("input[name=gander]:checked") as HTMLInputElement).value ,
                flight_id:selectFlights.value,
                agent: 2124
            })
        })
        const client = await res.json()
        console.log(client);
            // קריאה לפונקצייה שמדפיסה את הלקוחות על המסך
            displayCliants(client)
    }catch(err){
        console.log(err);        
    }
})


// פונקציית הדפסת הלקוח שנוסף על המסך
 const displayCliants =async (client:Client):Promise <void> =>{
    const flights = await fetch(BASE_URL+`flights/${client.flight_id}`)
    const data:Flights =await flights.json()
    const newDiv: HTMLElement = document.createElement('div')
    newDiv.classList.add("newDiv")
    const line:HTMLElement = document.createElement("h2")
    line.textContent = `name: ${client.name}, ${data.from} ==> ${data.to}`
    const deleteClient:HTMLElement = document.createElement("button")
    deleteClient.textContent = "🗑️"
    const editClient:HTMLElement = document.createElement("button")
    editClient.textContent = "✏️"
    newDiv.appendChild(line)
    newDiv.appendChild(deleteClient)
    newDiv.appendChild(editClient)
    clients.appendChild(newDiv)
 }



 // פונקציית הדפסת כל הקליינטים על המסך
 const allClients = async():Promise<void> =>{
    try{
        clients.innerHTML = ""
        const resFlights:Response = await fetch(BASE_URL+"flights")
        const dataFlights:Flights[] = await resFlights.json()
        const resClients:Response = await fetch(BASE_URL+`pasangers?agent=2124`)
        const dataClients:Client[] = await resClients.json()
        for(let i = 0;  i< dataClients.length; i++ ){
            console.log(dataFlights);      
            const newDiv: HTMLElement = document.createElement('div')
            newDiv.classList.add("newDiv")
            const line:HTMLElement = document.createElement("h2")
            line.textContent = `name: ${dataClients[i].name}, ${dataFlights[i].from} ==> ${dataFlights[i].to}`
            const deleteClient:HTMLElement = document.createElement("button")
            deleteClient.textContent = "🗑️"
            deleteClient.addEventListener("click", () => removeClient(dataClients[i].id, dataFlights[i].id))
            const editClient:HTMLElement = document.createElement("button")
            editClient.textContent = "✏️" 
            editClient.addEventListener("click", () => editClint(dataClients[i]))    
            newDiv.appendChild(line)
            newDiv.appendChild(deleteClient)
            newDiv.appendChild(editClient)
            clients.appendChild(newDiv)
        }
    }catch(err){
        console.log(err);       
    }
 }


// קריאה לפונקצייה שתדפיס את כל הרקליינטים על המסך
 allClients()

// פונקצייה שמוחקת קליינטים
 const removeClient  = async(idClient:string, idFlight:string):Promise<void> =>{
    try {
        const Client = await fetch(BASE_URL+`pasangers/${idClient}`,{
            method:"DELETE"
        }) 
        const Flight = await fetch(BASE_URL+`flights/${idFlight}`, {
            method:"DELETE"
        })

        allClients()
       
    } catch (err) {
        console.error(err)
    }


 }

 refresh.addEventListener("click",allClients)





 const editClint = (idClients:Client): void => {
    const newEdit = prompt("Enter new title:", idClients.name)
    
    }
   






interface Flights{

    date:string
    from:string
    to:string
    id:string
}


interface Client{

createdAt: string,
name: string,
gender:string
flight_id: string
agent: string
id:string

}


