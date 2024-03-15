import APIs from "./Modules/APIs.js";
class EventsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.BASE_URL = "http://localhost:3000/events";
        this.api = new APIs(this.BASE_URL);
        console.log(this.view);
        // this.init();
        this.addEventItem();
        this.showAllEvents();
        this.addDeleteClickEvents();
        this.addEditClickEvents();
    }

    addEventItem(event) {
        this.view.addNewEventBtn.addEventListener("click", (e) => {
            console.log("clicked");
            // get events from API

            this.view.renderAddNewEvent(event);
            this.view.addNewEventBtn.disabled = true;
            this.submitNewEvent()   
        });
    }

    showAllEvents() {
        // const events = this.model.getEvents();
        this.api.getEvents().then((events) => {
            this.model.setEvents(events);
            this.view.renderEvents(events);
            console.log("model events:", this.model.getEvents());
        });
    }

    submitNewEvent() {
        // add event listener for the submit button, button id="add_btn"
        this.view.setSubmitForm();
        // console.log(this.view.submitBtn);
        this.view.submitBtn.addEventListener("click", (e) => {
            console.log("submit clicked");

            const eventName = this.view.eventNameInput.value;
            const startDate = this.view.startTimeInput.value;
            const endDate = this.view.endTimeInput.value;
            const newEvent = {
                title: eventName,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            };
            
            // location.reload();
            //
            // // pop alert
            if (!newEvent.title || !newEvent.startDate || !newEvent.endDate) {
                alert("Please provide valid event name, start date and end date for the event");

            }else{
                // this.model.addEvent({eventName, startDate, endDate});
                this.api.addEvent({eventName, startDate, endDate}).then((newEvent) => {
                    this.model.addEvent(newEvent);
                    // this.view.renderAddNewEvent(newEvent);
                    // this.view.eventNameInput.value = "";
                    // this.view.startTimeInput.value = "";
                    // this.view.endTimeInput.value = "";
                    //refresh the event list
                    alert("add new event successfully");
                    location.reload();
                });


            }

            // // check if the startDate, endDate is in the newEvent,
            // if (!newEvent.startDate || !newEvent.endDate) {
            //     alert("Please provide a start date and end date for the event");
            //     return
            // }
            //
            //
            // // and check if the startDate is before the endDate
            // else if (newEvent.startDate > newEvent.endDate) {
            //     alert("The start date must be before the end date")
            //     return
            // }
            // // and check if the startDate is Date type
            // else if (! newEvent.startDate instanceof Date || ! newEvent.endDate instanceof Date) {
            //     alert("The start date and end date must be a date type")
            // }

            // console.log(eventName, startDate, endDate);
            // add event to the model

        });
    }
    // add edit event for all edit buttons, class="edit-btn"
    addEditClickEvents() {
        this.view.EvenetList.addEventListener("click", (e) => {
            if (e.target.classList.contains("edit-btn")) {
                console.log("edit clicked");

                const btnId = e.target.id;
                console.log(btnId);
                // console.log("edit event id:", eventId);
                this.view.changeToEditMode(btnId);
            }
        });
    }


    // add delete event for all delete buttons, class="delete-btn"
    addDeleteClickEvents() {
        this.view.EvenetList.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) {
                console.log("delete clicked");
                // get event id from the button id
                const btnId = e.target.id;
                const eventId = btnId.substring(6);
                // console.log("delete event id:", eventId);
                // this.view.removeEventElement(eventId);
                this.api.deleteEvent(eventId).then(() => {
                    this.model.deleteEvent(eventId);
                    console.log("delete event id:", eventId);
                    alert("Event deleted!");
                    this.view.removeEventElement(eventId);
                });
            }
        });
    }
}

export default EventsController;