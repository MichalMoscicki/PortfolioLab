document.addEventListener("DOMContentLoaded", function () {

    /**
     * Form Select
     */
    class FormSelect {
        constructor($el) {
            this.$el = $el;
            this.options = [...$el.children];
            this.init();
        }

        init() {
            this.createElements();
            this.addEvents();
            this.$el.parentElement.removeChild(this.$el);
        }

        createElements() {
            // Input for value
            this.valueInput = document.createElement("input");
            this.valueInput.type = "text";
            this.valueInput.name = this.$el.name;

            // Dropdown container
            this.dropdown = document.createElement("div");
            this.dropdown.classList.add("dropdown");

            // List container
            this.ul = document.createElement("ul");

            // All list options
            this.options.forEach((el, i) => {
                const li = document.createElement("li");
                li.dataset.value = el.value;
                li.innerText = el.innerText;

                if (i === 0) {
                    // First clickable option
                    this.current = document.createElement("div");
                    this.current.innerText = el.innerText;
                    this.dropdown.appendChild(this.current);
                    this.valueInput.value = el.value;
                    li.classList.add("selected");
                }

                this.ul.appendChild(li);
            });

            this.dropdown.appendChild(this.ul);
            this.dropdown.appendChild(this.valueInput);
            this.$el.parentElement.appendChild(this.dropdown);
        }

        addEvents() {
            this.dropdown.addEventListener("click", e => {
                const target = e.target;
                this.dropdown.classList.toggle("selecting");

                // Save new value only when clicked on li
                if (target.tagName === "LI") {
                    this.valueInput.value = target.dataset.value;
                    this.current.innerText = target.innerText;
                }
            });
        }
    }

    document.querySelectorAll(".form-group--dropdown select").forEach(el => {
        new FormSelect(el);
    });

    /**
     * Hide elements when clicked on document
     */
    document.addEventListener("click", function (e) {
        const target = e.target;
        const tagName = target.tagName;

        if (target.classList.contains("dropdown")) return false;

        if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
            return false;
        }

        if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
            return false;
        }

        document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
            el.classList.remove("selecting");
        });
    });

    /**
     * Switching between form steps
     */
    class FormSteps {
        constructor(form) {
            this.$form = form;
            this.$next = form.querySelectorAll(".next-step");
            this.$prev = form.querySelectorAll(".prev-step");
            this.$step = form.querySelector(".form--steps-counter span");
            this.currentStep = 1;

            this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
            const $stepForms = form.querySelectorAll("form > div");
            this.slides = [...this.$stepInstructions, ...$stepForms];

            this.init();
        }

        /**
         * Init all methods
         */
        init() {
            this.events();
            this.updateForm();
        }

        /**
         * All events that are happening in form
         */
        events() {
            // Next step
            this.$next.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep++;
                    this.updateForm();
                });
            });

            // Previous step
            this.$prev.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep--;
                    this.updateForm();
                });
            });

            // Form submit
            this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
        }

        /**
         * Update form front-end
         * Show next or previous section etc.
         */
        updateForm() {
            this.$step.innerText = this.currentStep;

            // TODO: Validation
            //jeśli nic nie klikniknięte, nie można pójść dalej, przycisk powinien być niedostępny/cofać do kroku
            //łapię sobie warunki, wypełnię je po konsultacji z sensei

            const form = document.querySelector('form');
            const quantity = form.querySelector('#quantity');
            const categories = document.querySelectorAll('input[type="checkbox"]:checked');
            const street = form.querySelector('#street');
            const city = form.querySelector('#city');
            const zipCode = form.querySelector('#zipCode');
            const phone = form.querySelector('#phone');
            const pickUpDate = form.querySelector('#pickUpDate');
            const pickUpTime = form.querySelector('#pickUpTime');
            const pickUpComment = form.querySelector('#pickUpComment');

            //tu jakoś sprytniej trzeba to zrobić:
            const stepOneNextButton = document.getElementById("stepOneNextButton");
            if (categories.length === 0) {
                // stepOneNextButton.disabled = "true";
            } else {
                // stepOneNextButton.disabled = "false";
            }


            const stepTwoNextButton = document.getElementById("stepTwoNextButton");
            stepTwoNextButton.disabled = "true";
            function checkStepTwo() {
                if (quantity.value === "") {
                    stepTwoNextButton.disabled = true;
                } else {
                    stepTwoNextButton.disabled = false;
                }
            }
            quantity.addEventListener("change", checkStepTwo);

            //tu również sprytnoiej - bez sensu pisać sześć takich samych funkcji!
            const stepFourNextButton = document.getElementById("stepFourNextButton");
            if (street.value !== "") {
                console.log("Street: passed.")
            }
            if (city.value !== "") {
                console.log("City: passed.")
            }
            if (zipCode.value !== "") {
                console.log("ZipCode: passed.")
            }
            if (phone.value !== "") {
                console.log("Phone: passed.")
            }
            if (pickUpDate.value !== "") {
                console.log("PickUpDate: passed.")
            }
            if (pickUpTime.value !== "") {
                console.log("PickUpTime: passed.")
            }


            this.slides.forEach(slide => {
                slide.classList.remove("active");

                if (slide.dataset.step == this.currentStep) {
                    slide.classList.add("active");
                }
            });

            this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
            this.$step.parentElement.hidden = this.currentStep >= 5;

            /**
             * Dynamic summary
             */

            const quantitySummary = document.getElementById("summary-bags");
            let bagOrBags = "worek";
            if (quantity.value > 1) {
                bagOrBags = "worki";
            }

            let categoriesNames = ""
            categories.forEach((e) => {
                const categoryLabel = e.parentElement;
                const categoryName = categoryLabel.querySelector(".description");
                categoriesNames = categoriesNames + ", " + categoryName.innerText;
            });
            categoriesNames = categoriesNames.substring(2, categoriesNames.length);
            quantitySummary.innerText = quantity.value + " " + bagOrBags + ": " + categoriesNames;

            const institutionInput = form.querySelector('input[type="radio"]:checked');
            const institutionLabel = institutionInput.parentElement;
            const institutionTitle = institutionLabel.querySelector(".title");
            const institutionSummary = document.getElementById("summary-institution");
            institutionSummary.innerText = "Dla fundacji " + institutionTitle.innerText;


            const streetSummary = document.getElementById("streetSummary");
            streetSummary.innerText = street.value;

            const citySummary = document.getElementById("citySummary");
            citySummary.innerText = city.value;

            const zipCodeSummary = document.getElementById("zipCodeSummary");
            zipCodeSummary.innerText = zipCode.value;

            const phoneSummary = document.getElementById("phoneSummary");
            phoneSummary.innerText = phone.value;

            const pickUpDateSummary = document.getElementById("pickUpDateSummary");
            pickUpDateSummary.innerText = pickUpDate.value;

            const pickUpTimeSummary = document.getElementById("pickUpTimeSummary");
            pickUpTimeSummary.innerText = pickUpTime.value;

            const pickUpCommentSummary = document.getElementById("pickUpCommentSummary");
            pickUpCommentSummary.innerText = pickUpComment.value;
        }

    }

    const form = document.querySelector(".form--steps");
    if (form !== null) {
        new FormSteps(form);
    }
});
