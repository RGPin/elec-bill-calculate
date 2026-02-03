const outputDiv = document.querySelector("#output-div");
const form = document.querySelector("#readings-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const currReadings3rdFloor = {};
    for (let i = 1; i <= 6; i++) {
        currReadings3rdFloor[i] = Number(formData.get(`room${i}-curr`));
    }

    const prevReadings3rdFloor = {};
    for (let i = 1; i <= 6; i++) {
        prevReadings3rdFloor[i] = Number(formData.get(`room${i}-prev`));
    }

    const consumptions3rdFloor = {};

    for (const room in currReadings3rdFloor) {
        consumptions3rdFloor[room] = currReadings3rdFloor[room] - prevReadings3rdFloor[room];
    }

    const totalConsumption3rdFloor = Object.values(consumptions3rdFloor).reduce((acc, curr) => (acc + curr), 0);

    const electricBill3rdFloor = Number(formData.get("3rd-floor-bill"));

    const payments = {};

    for (const room in consumptions3rdFloor) {
        payments[room] = Math.round(((consumptions3rdFloor[room] / totalConsumption3rdFloor) * electricBill3rdFloor) * 100) / 100;
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