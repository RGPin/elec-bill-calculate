const outputDiv = document.querySelector("#output-div");
const form = document.querySelector("#readings-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const currReadings = {};
    for (let i = 1; i <=6; i++) {
        currReadings[i] = Number(formData.get(`room${i}-curr`));
    }

    const prevReadings = {};
    for (let i = 1; i <=6; i++) {
        prevReadings[i] = Number(formData.get(`room${i}-prev`));
    }

    const consumption = {};

    for (const room in currReadings) {
        consumption[room] = currReadings[room] - prevReadings[room];
    }

    const totalConsumption = Object.values(consumption).reduce((acc, curr) => (acc + curr), 0);
    
    const electricBill = Number(formData.get("bill"));
    
});