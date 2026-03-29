const outputDiv = document.querySelector("#output-div");
const form = document.querySelector("#readings-form");

function createTables(data) {
  console.log(data);
  const thirdFloorTable = createTable(data, "3rd Floor");
  const basementMainTable = createTable(data, "Basement with Main");
  const alleyExtensionTable = createTable(data, "Alley with Extension");
  outputDiv.append(thirdFloorTable, basementMainTable, alleyExtensionTable);
}

function createTable(data, captionText) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const caption = document.createElement("caption");

  caption.textContent = captionText;

  populateThead(thead);
  populateTbody(data, tbody, captionText);

  table.append(thead, tbody, caption);
  return table;
}

function populateThead(thead) {
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const th3 = document.createElement("th");

  th1.textContent = "Room:";
  th2.textContent = "Percentage:";
  th3.textContent = "Payment:";

  tr.append(th1, th2, th3);
  thead.append(tr);
}

function populateTbody(data, tbody, captionText) {
  switch (captionText) {
    case "3rd Floor":
      populate3floorTbody(data, tbody);
      break;
    case "Basement with Main":
      populateBasementMainTbody(data, tbody);
      break;
    case "Alley with Extension":
      populateAlleyExtensionTbody(data, tbody);
      break;
  }
}

function populate3floorTbody(data, tbody) {
  for (let i = 1; i <= 6; i++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    th.textContent = `Room ${i}`;
    td1.textContent = `${data[0][i]}%`;
    td2.textContent = `₱${data[1][i]}`;

    tr.append(th, td1, td2);
    tbody.append(tr);
  }
}

function populateBasementMainTbody(data, tbody) {
  const mainTr = document.createElement("tr");
  const mainTh = document.createElement("th");
  const mainTd1 = document.createElement("td");
  const mainTd2 = document.createElement("td");

  const basementTr = document.createElement("tr");
  const basementTh = document.createElement("th");
  const basementTd1 = document.createElement("td");
  const basementTd2 = document.createElement("td");

  mainTh.textContent = "Main";
  basementTh.textContent = "Basement";
  mainTd1.textContent = `${data[0]["Main"]}%`;
  basementTd1.textContent = `${data[0]["Basement"]}%`;
  mainTd2.textContent = `₱${data[1]["Main"]}`;
  basementTd2.textContent = `₱${data[1]["Basement"]}`;

  mainTr.append(mainTh, mainTd1, mainTd2);
  basementTr.append(basementTh, basementTd1, basementTd2);

  tbody.append(basementTr, mainTr);
}

function populateAlleyExtensionTbody(data, tbody) {
  const alleyTr = document.createElement("tr");
  const alleyTh = document.createElement("th");
  const alleyTd1 = document.createElement("td");
  const alleyTd2 = document.createElement("td");

  const extensionTr = document.createElement("tr");
  const extensionTh = document.createElement("th");
  const extensionTd1 = document.createElement("td");
  const extensionTd2 = document.createElement("td");

  alleyTh.textContent = "Alley";
  extensionTh.textContent = "Extension";
  alleyTd1.textContent = `${data[0]["Alley"]}%`;
  extensionTd1.textContent = `${data[0]["Extension"]}%`;
  alleyTd2.textContent = `₱${data[1]["Alley"]}`;
  extensionTd2.textContent = `₱${data[1]["Extension"]}`;

  alleyTr.append(alleyTh, alleyTd1, alleyTd2);
  extensionTr.append(extensionTh, extensionTd1, extensionTd2);

  tbody.append(extensionTr, alleyTr);
}

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
    consumptions3rdFloor[room] =
      currReadings3rdFloor[room] - prevReadings3rdFloor[room];
  }
  const consumptionBasement = currReadingsBasement - prevReadingsBasement;
  const consumptionExtension = currReadingsExtension - prevReadingsExtension;

  // Get total consumptions
  const totalConsumption3rdFloor = Object.values(consumptions3rdFloor).reduce(
    (acc, curr) => acc + curr,
    0,
  );
  const totalConsumptionBasement = Number(
    formData.get("basement-with-main-consumption"),
  );
  const totalConsumptionExtension = Number(
    formData.get("alley-with-extension-consumption"),
  );

  // Get electric bills
  const electricBill3rdFloor = Number(formData.get("3rd-floor-bill"));
  const electricBillBasement = Number(formData.get("basement-with-main-bill"));
  const electricBillExtension = Number(
    formData.get("alley-with-extension-bill"),
  );

  const payments = {};
  const percentages = {};

  for (const room in consumptions3rdFloor) {
    percentages[room] =
      Math.round(
        (consumptions3rdFloor[room] / totalConsumption3rdFloor) * 10000,
      ) / 100;
  }
  percentages["Basement"] =
    Math.round((consumptionBasement / totalConsumptionBasement) * 10000) / 100;
  percentages["Extension"] =
    Math.round((consumptionExtension / totalConsumptionExtension) * 10000) /
    100;
  percentages["Main"] = Math.round((100 - percentages["Basement"]) * 100) / 100;
  percentages["Alley"] =
    Math.round((100 - percentages["Extension"]) * 100) / 100;

  for (const room in consumptions3rdFloor) {
    payments[room] =
      Math.round(
        (consumptions3rdFloor[room] / totalConsumption3rdFloor) *
          electricBill3rdFloor *
          100,
      ) / 100;
  }
  payments["Basement"] =
    Math.round(
      (consumptionBasement / totalConsumptionBasement) *
        electricBillBasement *
        100,
    ) / 100;
  payments["Extension"] =
    Math.round(
      (consumptionExtension / totalConsumptionExtension) *
        electricBillExtension *
        100,
    ) / 100;
  payments["Main"] =
    Math.round((electricBillBasement - payments["Basement"]) * 100) / 100;
  payments["Alley"] =
    Math.round((electricBillExtension - payments["Extension"]) * 100) / 100;

  outputDiv.textContent = "";

  // const title = document.createElement("h3");
  // title.textContent = "Calculated payments:";
  // outputDiv.append(title);

  // for (let i = 1; i <= 6; i++) {
  //   const pay = document.createElement("h4");
  //   pay.textContent = `Room ${i}:  ₱${payments[i]}`;
  //   outputDiv.append(pay);
  // }

  // const basementPay = document.createElement("h4");
  // basementPay.textContent = `Basement:  ₱${payments["Basement"]}`;
  // outputDiv.append(basementPay);

  // const extensionPay = document.createElement("h4");
  // extensionPay.textContent = `Extension:  ₱${payments["Extension"]}`;
  // outputDiv.append(extensionPay);

  createTables([percentages, payments]);

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
});
