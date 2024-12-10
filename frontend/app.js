const fishList = [
    {
        title: "Barsch",
        date: "21.11.2024",
        time: "10:45",
        type: "Flussbarsch (Perca fluviatilis)",
        location: "Weidengasse 1, Großebersdorf",
        details: "Gefangen mit Gummifisch.",
        length: "35 cm",
        weight: "0.8 kg",
        spot: "Ufer, nahe der Schilfkante",
        bait: "Gummifisch",
        technique: "Jiggen",
        weather: "sonnig",
        waterTemp: "14°C",
        special: "Aggressive Bisse, sehr aktiv",
        notes: "Erster Fang des Tages, guter Drill."
    },
    {
        title: "Barsch",
        date: "19.11.2024",
        time: "14:00",
        type: "Flussbarsch (Perca fluviatilis)",
        location: "Donauufer, Wien",
        details: "Gefangen mit Spinner.",
        length: "32 cm",
        weight: "0.7 kg",
        spot: "Flaches Wasser mit viel Vegetation",
        bait: "Spinner",
        technique: "Spinnangeln",
        weather: "bewölkt",
        waterTemp: "12°C",
        special: "Kam aus dichtem Kraut",
        notes: "Ungewöhnlich kräftig für seine Größe."
    },
    {
        title: "Forelle",
        date: "15.11.2024",
        time: "10:20",
        type: "Bachforelle (Salmo trutta)",
        location: "Seeweg 5, Klagenfurt",
        details: "Gefangen mit Wurm.",
        length: "28 cm",
        weight: "0.4 kg",
        spot: "Unter überhängenden Bäumen",
        bait: "Wurm",
        technique: "Posenangeln",
        weather: "leicht bewölkt",
        waterTemp: "10°C",
        special: "Sehr vorsichtig, mehrere Fehlbisse",
        notes: "Hatte Mühe, sie zu haken. Sehr scheu."
    },
    {
        title: "Forelle",
        date: "15.11.2024",
        time: "09:45",
        type: "Bachforelle (Salmo trutta)",
        location: "Seeweg 5, Klagenfurt",
        details: "Gefangen mit Köderfisch.",
        length: "30 cm",
        weight: "0.5 kg",
        spot: "Unter überhängenden Bäumen",
        bait: "Wurm",
        technique: "Posenangeln",
        weather: "leicht bewölkt",
        waterTemp: "10°C",
        special: "Sehr vorsichtig, mehrere Fehlbisse",
        notes: "Kam sehr nah an die Uferlinie."
    },
    {
        title: "Hecht",
        date: "19.11.2024",
        time: "14:30",
        type: "Hecht (Esox lucius)",
        location: "Weidengasse 2, Großebersdorf",
        details: "Gefangen mit Spinner.",
        length: "65 cm",
        weight: "2.5 kg",
        spot: "Strukturreiche Bereiche nahe tieferem Wasser",
        bait: "Spinner",
        technique: "Spinnangeln",
        weather: "bewölkt",
        waterTemp: "12°C",
        special: "Kraftvoller Biss, tief geschluckt",
        notes: "Sehr aggressiv, kräftiger Drill."
    },
    {
        title: "Karpfen",
        date: "15.04.2023",
        time: "11:30",
        type: "Schuppenkarpfen (Cyprinus carpio)",
        location: "Fischweg 3, Linz",
        details: "Gefangen mit Mais.",
        length: "45 cm",
        weight: "3.2 kg",
        spot: "Flaches Wasser nahe Seerosenfeldern",
        bait: "Mais",
        technique: "Grundangeln",
        weather: "sonnig",
        waterTemp: "10°C",
        special: "Langer Drill, sehr kräftig",
        notes: "Toller Fang, schwer zu landen."
    },
    {
        title: "Wels",
        date: "15.10.2024",
        time: "18:00",
        type: "Europäischer Wels (Silurus glanis)",
        location: "Seeweg 10, Linz",
        details: "Gefangen mit Boilie.",
        length: "120 cm",
        weight: "15 kg",
        spot: "Tiefes Wasser nahe Baumstämmen",
        bait: "Boilie",
        technique: "Grundangeln",
        weather: "bewölkt",
        waterTemp: "8°C",
        special: "Sehr großer Wels, langwieriger Drill",
        notes: "Größter Fang der Saison, unglaublicher Kampf."
    }
];


// Funktion: Filtert Fische nach Zeitrahmen
function filterFishByTime(fishList, timeFrame) {
    const now = new Date();
    return fishList.filter(fish => {
        const fishDate = new Date(fish.date.split('.').reverse().join('-'));
        switch (timeFrame) {
            case "24h":
                return (now - fishDate) / (1000 * 60 * 60) <= 24;
            case "1w":
                return (now - fishDate) / (1000 * 60 * 60 * 24) <= 7;
            case "1m":
                return (now - fishDate) / (1000 * 60 * 60 * 24) <= 30;
            case "1y":
                return (now - fishDate) / (1000 * 60 * 60 * 24) <= 365;
            case "total":
                return true;
            default:
                return false;
        }
    });
}

// Funktion: Zählt Fische nach Art
function countFishByType(fishItems) {
    const fishCounts = {};
    fishItems.forEach(fish => {
        if (!fishCounts[fish.title]) {
            fishCounts[fish.title] = 0;
        }
        fishCounts[fish.title]++;
    });
    return fishCounts;
}

// Funktion: Gruppiert Fische nach Datum
function groupFishByDate(fishItems) {
    const groupedFish = {};
    fishItems.forEach(fish => {
        if (!groupedFish[fish.date]) {
            groupedFish[fish.date] = [];
        }
        groupedFish[fish.date].push(fish);
    });
    return groupedFish;
}

// Funktion: Rendert Fische für `profile.html`
function renderFishSummary(filter) {
    const fishSummary = document.getElementById("fishSummary");
    fishSummary.innerHTML = "";
    const filteredFish = filterFishByTime(fishList, filter);
    const fishCounts = countFishByType(filteredFish);

    for (const [fishType, count] of Object.entries(fishCounts)) {
        const fishDiv = document.createElement("div");
        fishDiv.className = "fish-item";
        fishDiv.innerHTML = `
            <img src="https://via.placeholder.com/40" alt="${fishType}">
            <div>${fishType}</div>
            <div>x${count}</div>
        `;
        fishSummary.appendChild(fishDiv);
    }
}

// Funktion: Rendert Fische für `history.html`
function renderFishItems(filter) {
    const fishSummary = document.getElementById("fishSummary");
    fishSummary.innerHTML = ""; // Vorherige Inhalte löschen

    const filteredFish = filterFishByTime(fishList, filter); // Filtert Fische nach Zeitrahmen
    const groupedFish = groupFishByDate(filteredFish); // Gruppiert Fische nach Datum

    for (const date in groupedFish) {
        // Erstelle das Datumsgroup-Div
        const dateGroup = document.createElement("div");
        dateGroup.className = "date-group";
        dateGroup.innerHTML = `<h3>${date}</h3>`;

        groupedFish[date].forEach(fish => {
            // Erstelle das Fisch-Div
            const fishDiv = document.createElement("div");
            fishDiv.className = "fish-item";

            // Erstelle den Header-Bereich mit Bild und Details
            fishDiv.innerHTML = `
                <div class="header">
                    <img src="https://via.placeholder.com/50" alt="${fish.title}">
                    <div class="details">
                        <div class="title">${fish.title}</div>
                        <div class="subtitle">${fish.date} at ${fish.time}</div>
                    </div>
                </div>
            `;

            dateGroup.appendChild(fishDiv);
        });

        fishSummary.appendChild(dateGroup);
    }
}


// Funktion: Rendert Fische für `history_detail.html`
function renderFishDetails(filter) {
    const fishSummary = document.getElementById("fishSummary");
    fishSummary.innerHTML = "";
    const filteredFish = filterFishByTime(fishList, filter);
    const groupedFish = groupFishByDate(filteredFish);

    for (const date in groupedFish) {
        const dateGroup = document.createElement("div");
        dateGroup.className = "date-group";
        dateGroup.innerHTML = `<h3>${date}</h3>`;
        groupedFish[date].forEach(fish => {
            const fishDiv = document.createElement("div");
            fishDiv.className = "fish-item";
            fishDiv.innerHTML = `
                <div class="header" onclick="toggleDetails(event)">
                    <img src="https://via.placeholder.com/50" alt="${fish.title}">
                    <div>${fish.title}</div>
                </div>
                <div class="extra-details">
                    <p><strong>Type:</strong> ${fish.type}</p>
                    <p><strong>Location:</strong> ${fish.location}</p>
                    <p><strong>Details:</strong> ${fish.details}</p>
                </div>
            `;
            dateGroup.appendChild(fishDiv);
        });
        fishSummary.appendChild(dateGroup);
    }
}

// Funktion: Details ein- und ausklappen
function toggleDetails(event) {
    const header = event.currentTarget;
    const fishItem = header.parentElement;
    fishItem.classList.toggle("expanded");
}

// Tabs-Logik für alle Seiten
const tabs = document.querySelectorAll(".tabs button");
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelector(".tabs button.active").classList.remove("active");
        tab.classList.add("active");
        const filter = tab.getAttribute("data-filter");
        if (document.body.classList.contains("profile-page")) {
            renderFishSummary(filter);
        } else if (document.body.classList.contains("history-page")) {
            renderFishItems(filter);
        } else if (document.body.classList.contains("history-detail-page")) {
            renderFishDetails(filter);
        }
    });
});

// Standard: Filter "Total" beim Laden
document.addEventListener("DOMContentLoaded", () => {
    const defaultFilter = "total";
    if (document.body.classList.contains("profile-page")) {
        renderFishSummary(defaultFilter);
    } else if (document.body.classList.contains("history-page")) {
        renderFishItems(defaultFilter);
    } else if (document.body.classList.contains("history-detail-page")) {
        renderFishDetails(defaultFilter);
    }
});