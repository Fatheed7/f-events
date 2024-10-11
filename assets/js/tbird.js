let tBirdsDates = [];
let teaseTuesdayDates = [];

function addToTBirds() {
    const iso = document.getElementById('eventISODate').value;
    const description = document.getElementById('eventDescription').value;

    if (iso) {
        const isoDate = new Date(iso);
        const formattedDate = isoDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }) + (description ? " - " + description : "");

        const event = {
            date: formattedDate,
            iso: iso
        };
        tBirdsDates.push(event);
        displayTBirdsEvents();
        clearInputs();
    } else {
        alert("Please enter a date.");
    }
}

function addToTeaseTuesday() {
    const iso = document.getElementById('eventISODate').value;
    const description = document.getElementById('eventDescription').value;

    if (iso) {
        const isoDate = new Date(iso);
        const formattedDate = isoDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }) + (description ? " - " + description : "");

        const event = {
            date: formattedDate,
            iso: iso
        };
        teaseTuesdayDates.push(event);
        displayTeaseEvents();
        clearInputs();
    } else {
        alert("Please enter a date.");
    }
}

function displayTBirdsEvents() {
    const eventList = document.getElementById('tbirdsEventList');
    eventList.innerHTML = '';
    tBirdsDates.forEach((event, index) => {
        const li = document.createElement('li');
        li.textContent = `${event.date} (${event.iso})`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => removeFromTBirds(index);

        li.appendChild(removeBtn);
        eventList.appendChild(li);
    });
}

function displayTeaseEvents() {
    const eventList = document.getElementById('teaseEventList');
    eventList.innerHTML = '';
    teaseTuesdayDates.forEach((event, index) => {
        const li = document.createElement('li');
        li.textContent = `${event.date} (${event.iso})`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => removeFromTeaseTuesday(index);

        li.appendChild(removeBtn);
        eventList.appendChild(li);
    });
}

function removeFromTBirds(index) {
    tBirdsDates.splice(index, 1);
    displayTBirdsEvents();
}

function removeFromTeaseTuesday(index) {
    teaseTuesdayDates.splice(index, 1);
    displayTeaseEvents();
}

function clearInputs() {
    document.getElementById('eventISODate').value = '';
    document.getElementById('eventDescription').value = '';
}

function downloadJSON() {
    const jsonData = {
        tBirdsDates: tBirdsDates,
        teaseTuesdayDates: teaseTuesdayDates
    };

    const jsonString = JSON.stringify(jsonData, null, 4);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'events.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}