    /*** Dark Mode ***/
    // (This section remains the same)

    // Step 1: Select the necessary elements from the DOM
    const rsvpButton = document.getElementById('rsvp-button');
    const participantsList = document.querySelector('.rsvp-participants .participants');
    const firstNameInput = document.getElementById('fName');
    const lastNameInput = document.getElementById('lName');
    const attendanceCountElement = document.getElementById('attendance-count');
    const rsvpForm = document.getElementById('rsvp-form'); 

    const addParticipant = (person) => {

        const newParticipant = document.createElement('p');
        newParticipant.textContent = `🎟️ ${person.firstName} ${person.lastName} will attend.`;
        participantsList.appendChild(newParticipant);

        let currentCount = parseInt(attendanceCountElement.textContent);
        attendanceCountElement.textContent = currentCount + 1;

    };


    /*** Form Validation ***/

    // const validateForm = (event) => {
    //     // Prevent the form from refreshing the page
    //     event.preventDefault();

    //     let containsErrors = false;
    //     const rsvpInputs = rsvpForm.elements;

    //     for (const input of rsvpInputs) {
    //         if (input.type === "text") {
    //             if (input.value.length < 2) {
    //                 containsErrors = true;
    //                 // Add the .error class to apply the red highlight
    //                 input.classList.add('error');
    //             } else {
    //                 // If the input is valid, remove any previous error highlight
    //                 input.classList.remove('error');
    //             }
    //         }
    //     }

    //     // Only if there are NO errors, add the participant and clear the form.
    //     if (!containsErrors) {
    //         addParticipant();
    //         rsvpForm.reset();
    //     }
    // };

    const validateForm = (event) => {
        event.preventDefault();

        let containsErrors = false;
        const rsvpInputs = rsvpForm.elements;

        for (const input of rsvpInputs) {
            if (input.type === "text") {
                if (input.value.trim().length < 2) {
                    containsErrors = true;
                    input.classList.add("error");
                } else {
                    input.classList.remove("error");
                }
            }
        }

        if (!containsErrors) {
            const person = {
                firstName: rsvpInputs["fName"].value.trim(),
                lastName: rsvpInputs["lName"].value.trim(),
                email: rsvpInputs["email"].value.trim()
            };

            addParticipant(person);
            rsvpForm.reset();
        }
    };




    rsvpButton.addEventListener('click', validateForm);


    const themeButton = document.getElementById('theme-button');
    const body = document.body;

    themeButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
    });


    const toggleModal = (person) => {
        let modal = 0; // TODO
        
        // TODO: Update modal display to flex
        

        // TODO: Update modal text to personalized message


        // Set modal timeout to 5 seconds
        
    };

    // TODO: animation variables and animateImage() function

