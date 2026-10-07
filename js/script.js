// Array & Objects for bakery menu items //

const bakeryMenu = [
    { id: "croissant", name: "Sourdough Croissant", price: "\$4.50", category: "Pastry"},
    { id: "baguette", name: "Artisanal French Baguette", price: "\$3.75", category: "Bread"},
    { id: "cinnamon-roll", name: "North Star Cinnamon Roll", price: "\$5.00", category: "Pastry"},
    { id: "danish", name: "Seasonal Fruit Danish", price: "\$4.25", category: "Pastry"}
];

// interactive feature and storage // 

// main initializer //
function initBakeryFeature() {
    renderFavoriteSelector();
    loadSavedFavorite();
}

// dynamically renders drop-down //
function renderFavoriteSelector() {
    const container = document.getElementById("bakery-feature-container");
    if (!container) return;

    let html = `
        <div class="wishlist-box">
            <h3>⭐ Select Your Bakery Favorite</h3>
            <p>Save your favorite treat to personalize your future orders!</p>
            <label for="bakery-fav-select">Choose an item:</label>
            <select id="bakery-fav-select">
                <option value="">-- Choose a Treat --</option>
    `;

    // array iteration for options //
    bakeryMenu.forEach(item => {
        html += `<option value="${item.id}">${item.name} (${item.price})</option>` ;
    });

    html += `
        </select>
        <button id="save-fav-btn" type="button">Save to My Favorites</button>
        <p id="feature-feedback" class="feedback-msg"></p>
      </div>
    `;

    container.innerHTML = html;

    //event listener // 
    document.getElementById("save-fav-btn").addEventListener("click", handleSaveFavorite);
}

// logic function for storage //
function handleSaveFavorite() {
    const selectEl = document.getElementById("bakery-fav-select");
    const feedbackEl = document.getElementById("feature-feedback");
    const selectedValue = selectEl.value;

    if (!selectedValue) {
        feedbackEl.textContent = "Please select an item first!";
        feedbackEl.style.color = "#d9534f";
        return;
    }

    const chosenItem = bakeryMenu.find(item => item.id === selectedValue);

    //save choice in localStorage//
    localStorage.setItem("northStarFavId", chosenItem.id);
    localStorage.setItem("northStarFavName", chosenItem.name);

    feedbackEl.textContent = `Saved! We will remember that you love our ${chosenItem.name}.` ;
    feedbackEl.style.color = "#5cb85c";
}

//loads stored data on page initialization //
function loadSavedFavorite(){
    const savedId = localStorage.getItem("northStarFavId");
    const savedName = localStorage.getItem("northStarFavName");
    const selectEl = document.getElementById("bakery-fav-select");
    const feedbackEl = document.getElementById("feature-feedback");

    if (savedId && selectEl) {
        selectEl.value = savedId;
        if (feedbackEl) {
            feedbackEl.textContent = `Welcome back! Your saved favorite is the ${savedName}.` ;
            feedbackEl.style.color = "#5cb85c";
        }
    }
}

// form validation //

function initFormValidation() {
    const form = document.getElementById("bakery-order-form");
    if (!form) return;

    form.addEventListener("submit", function(event) {
        let isFormValid = true;

        // name field check and minimum length //
        const nameInput = document.getElementById("cust-name");
        const nameError = document.getElementById("name-error");
        if (!nameInput.value.trim()) {
            nameError.textContent = "! Name is required to process bakery orders.";
            isFormValid = false;
        } else if (nameInput.value.trim().length < 3) {
            nameError.textContent = "! Name must be at least 3 characters long.";
            isFormValid = false;
        } else {
            nameError.textContent = "";
        }

        // email form validation //
        const emailInput = document.getElementById("cust-email");
        const emailError = document.getElementById("email-error");
        const emailRegEx = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;

        if (!emailInput.value.trim()) {
            emailError.textContent = "! Email is required for order confirmations.";
            isFormValid = false;
        } else if (!emailRegEx.test(emailInput.value.trim())) {
            emailError.textContent = "! Please enter a valid email format (e.g., name@domain.com).";
            isFormValid = false;
        } else {
            emailError.textContent = "";
        }

        if (!isFormValid) {
            event.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initBakeryFeature();
    initFormValidation();
});
