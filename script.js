const outputDiv = document.querySelector("#output-div");
const form = document.querySelector("#readings-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const currInputs = document.querySelectorAll('input[name$="-curr"]');
    const currReadings = {};
    for (let i = 1; i <=6; i++) {
        currReadings[`room${i}`] = Number(formData.get(`room${i}-curr`));
    }

    console.log(currReadings)

    // const room1Prev = Number(formData.get("room1-prev"));
    // const room2Prev = Number(formData.get("room2-prev"));
    // const room3Prev = Number(formData.get("room3-prev"));
    // const room4Prev = Number(formData.get("room4-prev"));
    // const room5Prev = Number(formData.get("room5-prev"));
    // const room6Prev = Number(formData.get("room6-prev"));

    // const room1Curr = Number(formData.get("room1-curr"));
    // const room2Curr = Number(formData.get("room2-curr"));
    // const room3Curr = Number(formData.get("room3-curr"));
    // const room4Curr = Number(formData.get("room4-curr"));
    // const room5Curr = Number(formData.get("room5-curr"));
    // const room6Curr = Number(formData.get("room6-curr"));

    // const room1Consumption = room1Curr - room1Prev;
    // const room2Consumption = room2Curr - room2Prev;
    // const room3Consumption = room3Curr - room3Prev;
    // const room4Consumption = room4Curr - room4Prev;
    // const room5Consumption = room5Curr - room5Prev;
    // const room6Consumption = room6Curr - room6Prev;
    
});