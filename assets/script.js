// This JavaScript file is run by the browser 

// For now literal dates are used for the beginning and end of the timeline
// The duration of the timeline, totalTimeline, is calculated in milliseconds
const timelineStart = new Date('1950-01-01');
const timelineEnd = new Date('2100-01-01');
const totalTimeline = timelineEnd - timelineStart;

// The frontend state array containing objects from the backend array, but extended with position data
// Using let because there will be reassignment
let eventsPositionArray = [];

// Gets all events from the backend (Node)
fetch('/api/events')
    .then(response => response.json())
    .then(result => {

        const events = result.data;

        // Extend the objects in the backend array to also have calculated positions
        // Using .map because creating a new array of similar length
        eventsPositionArray = events.map(event => {

            const eventStartDate = new Date(event.startDate);
            const eventEndDate = new Date(event.endDate);

            const startPosition = calculateTimelinePosition(
                eventStartDate,
                timelineStart,
                totalTimeline
            );

            const endPosition = calculateTimelinePosition(
                eventEndDate,
                timelineStart,
                totalTimeline
            );

            return { ...event, startPosition: startPosition, endPosition: endPosition };
        });


        // Fill the dropdown select with the categories
        // Fill the event selects by chosen category
        // And add a listener for when a new category is selected to trigger refill
        const categorySelect = document.getElementById('event-category');

        fillEventSelects(eventsPositionArray);

        categorySelect.addEventListener('change', () => {

            const selectedCategory = categorySelect.value;

            if (selectedCategory === 'all') {

                fillEventSelects(eventsPositionArray);

            } else {

                // Using .filter to create a new array of only the events matching the chosen category
                const filteredEvents = eventsPositionArray.filter(event => {
                    return event.category === selectedCategory;
                });

                fillEventSelects(filteredEvents);
            }

        });

    });




// Calculates how old a person was on the date of an event
function calculateAgeAtDate(birthdayString, eventDateString) {

    const birthday = new Date(birthdayString);
    const eventDate = new Date(eventDateString);

    let age = eventDate.getFullYear() - birthday.getFullYear();

    const eventMonth = eventDate.getMonth();
    const birthMonth = birthday.getMonth();

    const eventDay = eventDate.getDate();
    const birthDay = birthday.getDate();

    // In case of birthday at a later month in the year
    if (eventMonth < birthMonth) {
        age -= 1;
    }

    // In case of birthday at a later day of the month
    if (eventMonth === birthMonth && eventDay < birthDay) {
        age -= 1;
    }

    if (age < 0) {
        return 'Not born yet';
    }

    return age;
}

// Calculates the end of a persons life if they live until 80 years old
function calculateLifeEnd(birthdayString) {

    const birthday = new Date(birthdayString);

    const birthYear = birthday.getFullYear();
    const expectedEndYear = birthYear + 80;

    const lifeEnd = new Date(birthday);
    lifeEnd.setFullYear(expectedEndYear);

    return lifeEnd;
}

// Calculates where a date should be placed on the timeline
function calculateTimelinePosition(date, timelineStart, totalTimeline) {

    const distance = date - timelineStart;

    const position = (distance / totalTimeline) * 100;

    return position;
}

// Fills the three event dropdowns with events
// value contains the Id
function fillEventSelects(eventsToShow) {

    const eventOneSelect = document.getElementById('event-one');
    const eventTwoSelect = document.getElementById('event-two');
    const eventThreeSelect = document.getElementById('event-three');

    eventOneSelect.innerHTML = '';
    eventTwoSelect.innerHTML = '';
    eventThreeSelect.innerHTML = '';

    // Using .forEach because the purpose is iteration and not creation of a new array
    eventsToShow.forEach(event => {

        const optionOne = document.createElement('option');
        optionOne.value = event.id;
        optionOne.textContent = event.title;
        eventOneSelect.appendChild(optionOne);

        const optionTwo = document.createElement('option');
        optionTwo.value = event.id;
        optionTwo.textContent = event.title;
        eventTwoSelect.appendChild(optionTwo);

        const optionThree = document.createElement('option');
        optionThree.value = event.id;
        optionThree.textContent = event.title;
        eventThreeSelect.appendChild(optionThree);

    });
}

// 'Show us' button click will show the two friends and the three selected events on the timeline
const showButton = document.getElementById('show-persons');

showButton.addEventListener('click', () => {

    // Gets todays date and places the today marker on the timeline
    // Using millisecond for comparisons
    const today = new Date();

    const personAName = document.getElementById('person-a-name');
    const personABirthday = document.getElementById('person-a-birthday');

    const personBName = document.getElementById('person-b-name');
    const personBBirthday = document.getElementById('person-b-birthday');


    // Validate for empty names
    if (personAName.value.trim() === '') {
        alert('Enter a name for Friend A');
        return;
    }

    if (personBName.value.trim() === '') {
        alert('Enter a name for Friend B');
        return;
    }



    // Validation of birthdays to avoid the friend timelines to extend beyond the main timeline
    // And to ensure that a birthday has been entered
    if (personABirthday.value === '' || personABirthday.value < '1950-01-01' || personABirthday.value > '2019-12-31') {
        alert('Friend A birthday must be between 1950 and 2019');
        return;
    }

    if (personBBirthday.value === '' || personBBirthday.value < '1950-01-01' || personBBirthday.value > '2019-12-31') {
        alert('Friend B birthday must be between 1950 and 2019');
        return;
    }

    const todayPosition = calculateTimelinePosition(
        today,
        timelineStart,
        totalTimeline
    );

    const todayMarker = document.getElementById('today-marker');

    // Using inline css manipulation instead of toggling class because of the range of options
    todayMarker.style.left = todayPosition + '%';


    // Grabs the three events selected by the user in the dropdown selects
    const eventOneSelect = document.getElementById('event-one');
    const eventTwoSelect = document.getElementById('event-two');
    const eventThreeSelect = document.getElementById('event-three');

    // using Number to convert Id from string to a number
    const eventOneId = Number(eventOneSelect.value);
    const eventTwoId = Number(eventTwoSelect.value);
    const eventThreeId = Number(eventThreeSelect.value);


    // Use .find to find the first matching Id. There should only be one match
    const eventOne = eventsPositionArray.find(event => event.id === eventOneId);
    const eventTwo = eventsPositionArray.find(event => event.id === eventTwoId);
    const eventThree = eventsPositionArray.find(event => event.id === eventThreeId);

    // An array of the three chosen events
    const selectedEvents = [eventOne, eventTwo, eventThree];

    // Creates and places the three event markers on the timeline
    const selectedEventsContainer =
        document.getElementById('selected-events');

    selectedEventsContainer.innerHTML = '';

    // Using .forEach because the purpose is to manipulate DOM and not to make a new array
    selectedEvents.forEach((event, index) => {

        // The <div> that the <span> will be appended to. A marker and its label
        const marker = document.createElement('div');

        // Clicking on an event marker will show the popup 
        // with its date and the age of each friend at the time of the event
        marker.addEventListener('click', () => {

            const personAAgeAtEvent = calculateAgeAtDate(
                personABirthday.value,
                event.startDate
            );

            const personBAgeAtEvent = calculateAgeAtDate(
                personBBirthday.value,
                event.startDate
            );

            // Grab elements in the popup dialog of the timeline
            const eventInfoTitle = document.getElementById('event-info-title');
            const eventInfoDate = document.getElementById('event-info-date');
            const eventInfoPersonA = document.getElementById('event-info-person-a');
            const eventInfoPersonB = document.getElementById('event-info-person-b');

            eventInfoTitle.textContent = event.title;

            // Show the date of the event in a DK format
            eventInfoDate.textContent = new Date(event.startDate).toLocaleDateString('da-DK');

            // show 'years' after the age, unless the friend A was not yet born
            if (personAAgeAtEvent === 'Not born yet') {
                eventInfoPersonA.textContent =
                    personAName.value + ': ' + personAAgeAtEvent;
            } else {
                eventInfoPersonA.textContent =
                    personAName.value + ': ' + personAAgeAtEvent + ' years';
            }

            // show 'years' after the age, unless the friend B was not yet born
            if (personBAgeAtEvent === 'Not born yet') {
                eventInfoPersonB.textContent =
                    personBName.value + ': ' + personBAgeAtEvent;
            } else {
                eventInfoPersonB.textContent =
                    personBName.value + ': ' + personBAgeAtEvent + ' years';
            }

            const eventInfo = document.getElementById('event-info');

            // Make the dialog pop up
            eventInfo.showModal();

        });

        // The label <span> that will be appended to the marker <div>
        const label = document.createElement('span');

        label.textContent = event.title;
        label.classList.add('event-label');

        // Different CSS for the three labels to make them at different heights to not overlap
        if (index === 0) {
            label.classList.add('event-label-one');
        }

        if (index === 1) {
            label.classList.add('event-label-two');
        }

        if (index === 2) {
            label.classList.add('event-label-three');
        }

        // Append label to marker
        marker.appendChild(label);

        // For now all markers will be events (point) and not periods (span)
        if (event.startDate === event.endDate) {

            marker.classList.add('event-point');

        } else {

            marker.classList.add('event-span');

            const width =
                event.endPosition - event.startPosition;

            // (Inline css manipulation because of the range of options)
            marker.style.width = width + '%';
        }

        // Inline css manipulation because of the range of options
        marker.style.left = event.startPosition + '%';

        // Append markers to the timeline
        selectedEventsContainer.appendChild(marker);
    });


    // Calculate Friend As life on the timeline
    const personABirthDate = new Date(personABirthday.value);
    const personALifeEnd = calculateLifeEnd(personABirthday.value);

    const personABirthPosition = calculateTimelinePosition(
        personABirthDate,
        timelineStart,
        totalTimeline
    );

    const personALifeEndPosition = calculateTimelinePosition(
        personALifeEnd,
        timelineStart,
        totalTimeline
    );

    // Calculate Friend Bs life on the timeline
    const personBBirthDate = new Date(personBBirthday.value);
    const personBLifeEnd = calculateLifeEnd(personBBirthday.value);

    const personBBirthPosition = calculateTimelinePosition(
        personBBirthDate,
        timelineStart,
        totalTimeline
    );

    const personBLifeEndPosition = calculateTimelinePosition(
        personBLifeEnd,
        timelineStart,
        totalTimeline
    );

    // This section has a bunch of inline CSS manipulation because of the range of options

    // Grab and manipulate the element that becomes the timeline of Friend A (child to the timeline area)
    // And its label
    const personALine = document.getElementById('person-a-line');

    const personALineLabel = document.getElementById('person-a-line-label');

    personALineLabel.textContent = personAName.value;

    // Start the friend A timeline at birth and the label
    personALineLabel.style.left = personABirthPosition + '%';

    personALine.style.left = personABirthPosition + '%';

    // Calculate how wide the friend A timeline should be
    const personALineWidth = personALifeEndPosition - personABirthPosition;

    personALine.style.width = personALineWidth + '%';

    // Grab the element that will show the already lived part of the friend A timeline
    // Its z-index will place it in front of the full friend A timeline
    const personALived = document.getElementById('person-a-lived');

    // Calculate the width from birth until today
    personALived.style.left = personABirthPosition + '%';

    const personALivedWidth = todayPosition - personABirthPosition;

    personALived.style.width = personALivedWidth + '%';


    // Grab and manipulate the element that becomes the timeline of Friend B (child to the timeline area)
    // And its label
    const personBLine = document.getElementById('person-b-line');

    const personBLineLabel = document.getElementById('person-b-line-label');

    personBLineLabel.textContent = personBName.value;

    // Start the friend B timeline at birth and the label

    personBLineLabel.style.left = personBBirthPosition + '%';

    personBLine.style.left = personBBirthPosition + '%';

    // Calculate how wide the friend B timeline should be
    const personBLineWidth = personBLifeEndPosition - personBBirthPosition;

    personBLine.style.width = personBLineWidth + '%';


    // Grab the element that will show the already lived part of the friend B timeline
    // Its z-index will place it in front of the full friend B timeline
    const personBLived = document.getElementById('person-b-lived');

    personBLived.style.left = personBBirthPosition + '%';

    const personBLivedWidth =
        todayPosition - personBBirthPosition;

    // Calculate the width from birth until today
    personBLived.style.width = personBLivedWidth + '%';


});


// 'Close' button on the event and ages information popup closes the popup
const closeEventInfoButton = document.getElementById('close-event-info');

closeEventInfoButton.addEventListener('click', () => {

    const eventInfo = document.getElementById('event-info');

    eventInfo.close();

});

// 'Add event' button sends a new event to the array in the back through POST /api/events
const addEventButton = document.getElementById('add-event');

addEventButton.addEventListener('click', () => {

    const newEventTitle = document.getElementById('new-event-title');
    const newEventDate = document.getElementById('new-event-date');
    const newEventCategory = document.getElementById('new-event-category');

    // Validate that the event name is not empty
    if (newEventTitle.value.trim() === '') {
        alert('Enter a name for the event');
        return;
    }

    // Validate that the date of the new event is not empty and within the timeline
    if (newEventDate.value === '' || newEventDate.value < '1950-01-01' || newEventDate.value > '2099-12-31') {
        alert('The event must be between 1950 and 2100');
        return;
    }

    const newEvent = {
        title: newEventTitle.value,
        date: newEventDate.value,
        category: newEventCategory.value
    };

    fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
    })
        .then(response => response.json())
        .then(result => {

            // The saved event is received from the backend and added to the frontend array 
            // after being extended with calculated positions
            // Duplicate code that should be refactored

            const addedEvent = result.data;

            const eventStartDate = new Date(addedEvent.startDate);
            const eventEndDate = new Date(addedEvent.endDate);

            const startPosition = calculateTimelinePosition(
                eventStartDate,
                timelineStart,
                totalTimeline
            );

            const endPosition = calculateTimelinePosition(
                eventEndDate,
                timelineStart,
                totalTimeline
            );

            const addedEventWithPositions = {
                ...addedEvent,
                startPosition: startPosition,
                endPosition: endPosition
            };

            eventsPositionArray.push(addedEventWithPositions);

            // Refill of the event dropdown selectors because of the new event
            // Duplicate code, should be refactored
            const categorySelect = document.getElementById('event-category');

            const selectedCategory = categorySelect.value;

            if (selectedCategory === 'all') {

                fillEventSelects(eventsPositionArray);

            } else {

                const filteredEvents = eventsPositionArray.filter(event => {
                    return event.category === selectedCategory;
                });

                fillEventSelects(filteredEvents);
            }



        });
});

