const outputDiv = document.querySelector("#output-div");

function createTables(data) {
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

export { createTables };
