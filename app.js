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
const BASE_URL = "https://66e98a6387e417609449dfc5.mockapi.io/api/";
const selectFlights = document.querySelector('.Select');
const add = document.querySelector('.add');
const inputName = document.querySelector('.inputName');
const Select = document.querySelector('.Select');
const clients = document.querySelector('.clients');
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
// קריאה לפונקצייה
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
// פונקציית הדפסת הלקוח על המסך
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
// 
const allClients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
            const editClient = document.createElement("button");
            editClient.textContent = "✏️";
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
allClients();
