"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://66eaf30a55ad32cda47b1270.mockapi.io/api/";
const selectFlights = document.querySelector('.Select');
const add = document.querySelector('.add');
const inputName = document.querySelector('.inputName');
const Select = document.querySelector('.Select');
const clients = document.querySelector('.clients');
const refresh = document.querySelector('.ref');
// ריצה על כל הטיסות הקיימות
const getFlights = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(BASE_URL + "flights");
        const flights = yield res.json();
        for (let flight of flights) {
            // קריאה לפונקצייה שיוצרת סלקט
            optionFlights(flight);
        }
    }
    catch (err) {
        console.log(err);
    }
});
//  יצירת אופשן עבור כל טיסה
const optionFlights = (flight) => {
    const opt = document.createElement('option');
    opt.value = flight.id;
    opt.textContent = `${flight.from} => ${flight.to} (${flight.date})`;
    selectFlights.appendChild(opt);
    console.log(flight);
};
// קריאה לפונקצייה שציג תסלקט
getFlights();
// פונקציית הכנסה לAPI
add.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(BASE_URL + "pasangers", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                createdAt: new Date().toLocaleDateString(),
                name: inputName.value,
                gender: document.querySelector("input[name=gander]:checked").value,
                flight_id: selectFlights.value,
                agent: 2124
            })
        });
        const client = yield res.json();
        console.log(client);
        // קריאה לפונקצייה שמדפיסה את הלקוחות על המסך
        displayCliants(client);
    }
    catch (err) {
        console.log(err);
    }
}));
// פונקציית הדפסת הלקוח שנוסף על המסך
const displayCliants = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const flights = yield fetch(BASE_URL + `flights/${client.flight_id}`);
    const data = yield flights.json();
    const newDiv = document.createElement('div');
    newDiv.classList.add("newDiv");
    const line = document.createElement("h2");
    line.textContent = `name: ${client.name}, ${data.from} ==> ${data.to}`;
    const deleteClient = document.createElement("button");
    deleteClient.textContent = "🗑️";
    const editClient = document.createElement("button");
    editClient.textContent = "✏️";
    newDiv.appendChild(line);
    newDiv.appendChild(deleteClient);
    newDiv.appendChild(editClient);
    clients.appendChild(newDiv);
});
// פונקציית הדפסת כל הקליינטים על המסך
const allClients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        clients.innerHTML = "";
        const resFlights = yield fetch(BASE_URL + "flights");
        const dataFlights = yield resFlights.json();
        const resClients = yield fetch(BASE_URL + `pasangers?agent=2124`);
        const dataClients = yield resClients.json();
        for (let i = 0; i < dataClients.length; i++) {
            console.log(dataFlights);
            const newDiv = document.createElement('div');
            newDiv.classList.add("newDiv");
            const line = document.createElement("h2");
            line.textContent = `name: ${dataClients[i].name}, ${dataFlights[i].from} ==> ${dataFlights[i].to}`;
            const deleteClient = document.createElement("button");
            deleteClient.textContent = "🗑️";
            deleteClient.addEventListener("click", () => removeClient(dataClients[i].id, dataFlights[i].id));
            const editClient = document.createElement("button");
            editClient.textContent = "✏️";
            editClient.addEventListener("click", () => editClint(dataClients[i]));
            newDiv.appendChild(line);
            newDiv.appendChild(deleteClient);
            newDiv.appendChild(editClient);
            clients.appendChild(newDiv);
        }
    }
    catch (err) {
        console.log(err);
    }
});
// קריאה לפונקצייה שתדפיס את כל הרקליינטים על המסך
allClients();
// פונקצייה שמוחקת קליינטים
const removeClient = (idClient, idFlight) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Client = yield fetch(BASE_URL + `pasangers/${idClient}`, {
            method: "DELETE"
        });
        const Flight = yield fetch(BASE_URL + `flights/${idFlight}`, {
            method: "DELETE"
        });
        allClients();
    }
    catch (err) {
        console.error(err);
    }
});
refresh.addEventListener("click", allClients);
const editClint = (idClients) => {
    const newEdit = prompt("Enter new title:", idClients.name);
};
