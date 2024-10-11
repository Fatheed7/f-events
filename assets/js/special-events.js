let events = [];

function addEvent() {
    const name = document.getElementById('eventName').value;
    const iso = document.getElementById('eventISODate').value;
    const description = document.getElementById('eventDescription').value;

    if (name && iso && description) {
        const isoDate = new Date(iso);
        
        const formattedDate = isoDate.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const event = {
            name: name,
            date: formattedDate,
            iso: iso,
            description: description
        };
        
        events.push(event);
        displayEvents();
        clearInputs();
    } else {
        alert("Please fill in all fields.");
    }
}

function displayEvents() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.textContent = `${event.name} - ${event.date}`;
        eventList.appendChild(li);
    });
}

function clearInputs() {
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventISODate').value = '';
    document.getElementById('eventDescription').value = '';
}

function downloadJSON() {
    const jsonData = {
        events: events
    };

    const jsonString = JSON.stringify(jsonData, null, 4);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'special-events.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}