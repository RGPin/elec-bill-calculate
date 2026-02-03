const outputDiv = document.querySelector("#output-div");
const form = document.querySelector("#readings-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    // Get current readings
    const currReadings3rdFloor = {};
    for (let i = 1; i <= 6; i++) {
        currReadings3rdFloor[i] = Number(formData.get(`room${i}-curr`));
    }
    const currReadingsBasement = Number(formData.get("basement-curr"));
    const currReadingsExtension = Number(formData.get("extension-curr"));

    // Get previous readings
    const prevReadings3rdFloor = {};
    for (let i = 1; i <= 6; i++) {
        prevReadings3rdFloor[i] = Number(formData.get(`room${i}-prev`));
    }
    const prevReadingsBasement = Number(formData.get("basement-prev"));
    const prevReadingsExtension = Number(formData.get("extension-prev"));


    // Get consumptions
    const consumptions3rdFloor = {};
    for (const room in currReadings3rdFloor) {
        consumptions3rdFloor[room] = currReadings3rdFloor[room] - prevReadings3rdFloor[room];
    }
    const consumptionBasement = currReadingsBasement - prevReadingsBasement;
    const consumptionExtension = currReadingsExtension - prevReadingsExtension;

    // Get total consumptions
    const totalConsumption3rdFloor = Object.values(consumptions3rdFloor).reduce((acc, curr) => (acc + curr), 0);
    const totalConsumptionBasement = Number(formData.get("basement-with-main-consumption"));
    const totalConsumptionExtension = Number(formData.get("alley-with-extension-consumption"));

    // Get electric bills
    const electricBill3rdFloor = Number(formData.get("3rd-floor-bill"));
    const electricBillBasement = Number(formData.get("basement-with-main-bill"));
    const electricBillExtension = Number(formData.get("alley-with-extension-bill"));

    const payments = {};

    for (const room in consumptions3rdFloor) {
        payments[room] = Math.round(((consumptions3rdFloor[room] / totalConsumption3rdFloor) * electricBill3rdFloor) * 100) / 100;
    }
    payments["Basement"] = Math.round(((consumptionBasement / totalConsumptionBasement) * electricBillBasement) * 100) / 100;
    payments["Extension"] = Math.round(((consumptionExtension / totalConsumptionExtension) * electricBillExtension) * 100) / 100;

    outputDiv.textContent = "";

    const title = document.createElement("h3");
    title.textContent = "Calculated payments:";
    outputDiv.append(title);

    for (let i = 1; i <= 6; i++) {
        const pay = document.createElement("h4");
        pay.textContent = `Room ${i}:  ₱${payments[i]}`;
        outputDiv.append(pay);
    }

    const basementPay = document.createElement("h4");
    basementPay.textContent = `Basement:  ₱${payments["Basement"]}`;
    outputDiv.append(basementPay);

    const extensionPay = document.createElement("h4");
    extensionPay.textContent = `Extension:  ₱${payments["Extension"]}`;
    outputDiv.append(extensionPay);

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});