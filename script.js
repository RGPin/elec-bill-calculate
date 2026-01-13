const outputDiv = document.querySelector("#output-div");
const form = document.querySelector("#readings-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const currReadings = {};
    for (let i = 1; i <= 6; i++) {
        currReadings[i] = Number(formData.get(`room${i}-curr`));
    }

    const prevReadings = {};
    for (let i = 1; i <= 6; i++) {
        prevReadings[i] = Number(formData.get(`room${i}-prev`));
    }

    const consumptions = {};

    for (const room in currReadings) {
        consumptions[room] = currReadings[room] - prevReadings[room];
    }

    const totalConsumption = Object.values(consumptions).reduce((acc, curr) => (acc + curr), 0);

    const electricBill = Number(formData.get("bill"));

    const payments = {};

    for (const room in consumptions) {
        payments[room] = Math.round(((consumptions[room] / totalConsumption) * electricBill) * 100) / 100;
    }

    outputDiv.textContent = "";

    const title = document.createElement("h3");
    title.textContent = "Calculated payments:";
    outputDiv.append(title);

    for (let i = 1; i <= 6; i++) {
        const pay = document.createElement("h4");
        pay.textContent = `Room ${i}: ${payments[i]}`;
        outputDiv.append(pay);
    }

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});