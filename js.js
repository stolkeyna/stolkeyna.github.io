//Walidacja formularza
const inputName = form.querySelector("input[name=name]");
const inputEmail = form.querySelector("input[name=email]");
const formMessage = form.querySelector(".form-message");

function testFieldName() {
    return inputName.value.length >= 3
}

function testFieldEmail() {
    const regEmail = /\S+@\S+\.\S+/;
    return regEmail.test(inputEmail.value);
}

//dynamiczne podpowiedzi na pól
inputName.addEventListener("input", () => {
    inputName.classList.toggle("is-invalid", !testFieldName());
});

inputEmail.addEventListener("input", () => {
    inputEmail.classList.toggle("is-invalid", !testFieldEmail());
});

form.addEventListener("submit", e => {
    e.preventDefault();

    let formErrors = [];

    //usuwam domyślnie wszystkie zaznaczenia błędów
    for (let field of [inputName, inputEmail]) {
        field.classList.remove("is-invalid");
    }

    if (!testFieldName()) {
        formErrors.push("Wypełnij poprawnie pole z imieniem");
        inputName.classList.add("is-invalid");
    }

    if (!testFieldEmail()) {
        formErrors.push("Wypełnij poprawnie pole z emailem");
        inputEmail.classList.add("is-invalid");
    }

    if (!formErrors.length) {
        form.submit();
    } else {
        formMessage.innerHTML = `
            <h3 class="form-error-title">Proszę poprawić błędy:</h3>
            <ul class="form-error-list">
                ${formErrors.map(el => `<li>${el}</li>`).join("")}
            </ul>
        `;
    }
});

//Quiz

//Gallery
function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }