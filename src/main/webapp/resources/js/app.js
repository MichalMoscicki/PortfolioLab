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

            const form = document.querySelector('form');
            const quantity = form.querySelector('#quantity');
            const categories = document.querySelectorAll('input[type="checkbox"]');
            const street = form.querySelector('#street');
            const city = form.querySelector('#city');
            const zipCode = form.querySelector('#zipCode');
            const phone = form.querySelector('#phone');
            const pickUpDate = form.querySelector('#pickUpDate');
            const pickUpTime = form.querySelector('#pickUpTime');
            const pickUpComment = form.querySelector('#pickUpComment');


            const stepOneNextButton = document.getElementById("stepOneNextButton");
            stepOneNextButton.disabled = "true";
            function checkStepOne() {
                let anyChecked = false;
                categories.forEach((e) => {
                    if(e.checked){
                        anyChecked = true;
                    }
                })
                if(anyChecked){
                    stepOneNextButton.disabled = false;
                } else {
                    stepOneNextButton.disabled = true;
                }
            }

            categories.forEach((e) =>{
                e.addEventListener("change", checkStepOne)
            });

            const stepTwoNextButton = document.getElementById("stepTwoNextButton");

            function checkStepTwo() {
                if (quantity.value === "") {
                    stepTwoNextButton.disabled = true;
                } else {
                    stepTwoNextButton.disabled = false;
                }
            }

            stepTwoNextButton.disabled = "true";
            quantity.addEventListener("change", checkStepTwo);

            /**
             * Form step four validation
             */

            const stepFourNextButton = document.getElementById("stepFourNextButton");
            const stepFourInputs = [street, city, zipCode, phone, pickUpDate, pickUpTime];
            stepFourNextButton.disabled = "true";

            function checkStepFour() {
                if (street.value === "" || city.value === "" || zipCode.value === "" || phone.value === ""
                    || pickUpDate.value === "" || pickUpTime.value === "") {
                    stepFourNextButton.disabled = true;
                } else {
                    stepFourNextButton.disabled = false;
                }
            }

            stepFourInputs.forEach((el) => {
                el.addEventListener("change", checkStepFour)
            })


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
