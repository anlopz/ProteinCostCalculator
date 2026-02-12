
let foods = JSON.parse(localStorage.getItem("foods")) || [];

function save() {
    localStorage.setItem("foods", JSON.stringify(foods));
}

function addFood() {

    const food = document.getElementById("food").value.trim();
    let portionSize = parseFloat(document.getElementById("portionSize").value);
    const proteinPerPortion = parseFloat(document.getElementById("proteinPerPortion").value);
    const packageSize = parseFloat(document.getElementById("packageSize").value);
    const price = parseFloat(document.getElementById("price").value);

    // Default portion size to 100g if empty or invalid
    if (!portionSize || portionSize <= 0) {
        portionSize = 100;
    }

    if (!food || !proteinPerPortion || !packageSize || !price) return;

    const totalProtein = (packageSize / portionSize) * proteinPerPortion;
    const costPerGram = price / totalProtein;

    foods.push({
        food,
        totalProtein,
        costPerGram
    });

    save();
    render();

    // Clear inputs
    document.getElementById("food").value = "";
    document.getElementById("proteinPerPortion").value = "";
    document.getElementById("packageSize").value = "";
    document.getElementById("price").value = "";
    document.getElementById("portionSize").value = 100;
}

function render() {

    foods = foods.filter(f =>
        f &&
        typeof f.totalProtein === "number" &&
        typeof f.costPerGram === "number"
    );

    foods.sort((a,b) => a.costPerGram - b.costPerGram);

    const list = document.getElementById("list");
    list.innerHTML = "";

    foods.forEach((f, i) => {

        const row = document.createElement("tr");
        if (i === 0) row.classList.add("cheapest");

        row.innerHTML = `
            <td>${f.food}</td>
            <td>${f.totalProtein.toFixed(1)}g</td>
            <td>$${f.costPerGram.toFixed(3)}</td>
        `;

        list.appendChild(row);
    });

    save();
}

render();