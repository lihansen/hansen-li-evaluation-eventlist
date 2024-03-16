import APIs from "./Modules/APIs.js";

class EventsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.BASE_URL = "http://localhost:3000/events";
        this.api = new APIs(this.BASE_URL);

        // this.init();
        this.addNewEventBtnListener();
        this.showAllEvents();

        //
        // this.addDeleteClickEvents();
        // this.addEditClickEvents();
    }

    addNewEventBtnListener() {
        this.view.addNewEventBtn.addEventListener("click", (e) => {
            console.log("add new event button clicked");

            this.view.renderAddNewEventRow();
            this.view.addNewEventBtn.disabled = true;

            this.submitNewEventListener()
        });
    }

    showAllEvents() {
        this.api.getEvents().then((events) => {
            // model
            this.model.setEvents(events);
            // view
            for (const event of events) {
                this.view.renderEventRow(event);
                console.log(event);
                this.addEditClickListener(event.id);
                this.addDeleteClickListener(event.id);
            }
        });
    }

    remove

    addEditClickListener(eventId) {
        // const eventItem = this.view.getEventRow(eventId);
        // const editBtn = eventItem.querySelector(".edit-btn");
        const editBtn = this.view.getEditBtn(eventId);
        editBtn.addEventListener("click", (e) => {
            console.log("edit clicked");
            // view
            this.view.changeToEditMode(eventId);

            // control, change button actions
            this.addCancelClickListener(eventId);
            this.addSaveClickListener(eventId);
        });
    }

    addCancelClickListener(eventId) {
        // const eventItem = this.view.getEventRow(eventId);
        // const cancelBtn = eventItem.querySelector(".cancel-btn");
        const cancelBtn = this.view.getCancelBtn(eventId);
        cancelBtn.addEventListener("click", (e) => {
            // view
            this.view.recoverToNormalMode(eventId, this.model.findEvent(eventId));

            // control, recover button actions
            this.addEditClickListener(eventId);
            this.addDeleteClickListener(eventId);
        });


    }

    addDeleteClickListener(eventId) {
        // const eventItem = this.view.getEventRow(eventId);
        // const deleteBtn = eventItem.querySelector(".delete-btn");
        const deleteBtn = this.view.getDeleteBtn(eventId);
        deleteBtn.addEventListener("click", (e) => {
            console.log("delete clicked");
            this.api.deleteEvent(eventId).then(() => {
                // model
                this.model.deleteEvent(eventId);
                alert("Event deleted!");
                // view
                this.view.removeEventRow(eventId);
            });
        });
    }

    addSaveClickListener(eventId) {
        const saveBtn = this.view.getSaveBtn(eventId);
        const PrevEvent = this.model.findEvent(eventId);

        // const updatedEvent = {
        //     eventName: this.view.getNameInputValues(eventId),
        //     startDate: this.view.getStartTimeInputValues(eventId),
        //     endDate: this.view.getEndTimeInputValues(eventId),
        // };


        saveBtn.addEventListener("click", (e) => {
            const eventName = this.view.getNameInputValues(eventId);
            const startDate = this.view.getStartTimeInputValues(eventId);
            const endDate = this.view.getEndTimeInputValues(eventId);

            // check any changes in the updatedEvent
            if (eventName === PrevEvent.eventName &&
                startDate === PrevEvent.startDate &&
                endDate === PrevEvent.endDate) {
                alert("No changes made to the event");
                return;
            } else {
                const updatedEvent = {
                    eventName: eventName,
                    startDate: startDate,
                    endDate: endDate,
                }
                this.api.updateEvent(eventId, updatedEvent).then((updatedEvent) => {
                    // model
                    this.model.updateEvent(eventId, updatedEvent);

                    // view, recover to the normal mode
                    this.view.recoverToNormalMode(eventId, updatedEvent);
                    
                    // controller, recover button actions
                    this.addEditClickListener(eventId);
                    this.addDeleteClickListener(eventId);
                    
                    alert("Event updated!");
                });


            }


        });


        //     if (e.target.classList.contains("save-btn")) {
        //         console.log("save clicked");
        //         const btnId = e.target.id;
        //         const eventId = btnId.substring(4);
        //         console.log(btnId);
        //         // console.log("edit event id:", eventId);
        //         const eventName = this.view.getNameInputValues(eventId);
        //         const startDate = this.view.getStartTimeInputValues(eventId);
        //         const endDate = this.view.getEndTimeInputValues(eventId);
        //         const updatedEvent = {
        //             title: eventName,
        //             startDate: new Date(startDate),
        //             endDate: new Date(endDate),
        //         };
        //
        //         console.log(updatedEvent);
        //         // this.api.updateEvent(eventId, updatedEvent).then((updatedEvent) => {
        //         //     this.model.updateEvent(eventId, updatedEvent);
        //         //     this.view.recoverToNormalMode(eventId, updatedEvent);
        //         //     alert("Event updated!");
        //         // });
        //     }
        // });
    }


    submitNewEventListener() {
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

            } else {
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


    // // add edit event for all edit buttons, class="edit-btn"
    // addEditClickEvents() {
    //     this.view.EvenetList.addEventListener("click", (e) => {
    //         if (e.target.classList.contains("edit-btn")) {
    //             console.log("edit clicked");
    //
    //             const btnId = e.target.id;
    //             console.log(btnId);
    //             // console.log("edit event id:", eventId);
    //             this.view.changeToEditMode(btnId);
    //             this.addCancelClickEvents(btnId);
    //             this.addSaveEditEvent();
    //         }
    //     });
    // }


    addCancelClickEvents(btnId) {


        this.view.EvenetList.addEventListener("click", (e) => {
            if (e.target.classList.contains("cancel-btn")) {
                console.log("cancel clicked");
                const btnId = e.target.id;
                const eventId = btnId.substring(6);
                console.log(btnId);
                // console.log("edit event id:", eventId);
                this.view.recoverToNormalMode(eventId, this.model.findEvent(eventId));
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