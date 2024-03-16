class EventsView {
    constructor() {
        this.addNewEventBtn = document.getElementById('addNewEvent');
        this.EvenetList = document.getElementById('event_list');
    }

    getEventRow(eventId) {
        return this.EvenetList.querySelector(`#${eventId}`);
    }

    getCancelBtn(eventId) {
        return this.getEventRow(eventId).querySelector(".cancel-btn");
    }

    getSaveBtn(eventId) {
        return this.getEventRow(eventId).querySelector(".save-btn");
    }

    getEditBtn(eventId) {
        return this.getEventRow(eventId).querySelector(".edit-btn");
    }

    getDeleteBtn(eventId) {
        return this.getEventRow(eventId).querySelector(".delete-btn");
    }


    getNameInputValues(eventId) {
        const nameInput = this.getEventRow(eventId).querySelector(".name_input");
        return nameInput.value;
    }

    getStartTimeInputValues(eventId) {
        const startTimeInput = this.getEventRow(eventId).querySelector(".start_input");
        return startTimeInput.value;
    }

    getEndTimeInputValues(eventId) {
        const endTimeInput = this.getEventRow(eventId).querySelector(".end_input");
        return endTimeInput.value;
    }

    removeEventRow(eventId) {
        console.log("deleteItem");
        // document.getElementById(eventId).remove();
        this.getEventRow(eventId).remove();
    }

    renderAddNewEventRow() {
        console.log("append to the event list");
        this.EvenetList.appendChild(this.createEventItemElement());
    }

    renderEventRow(event) {
        this.EvenetList.appendChild(this.createExistEventElement(event));
    }

    setSubmitForm() {
        this.submitBtn = document.getElementById('add_btn');
        this.eventNameInput = document.getElementById('event_name_input');
        this.startTimeInput = document.getElementById('start_time_input');
        this.endTimeInput = document.getElementById('end_time_input');
    }


    recoverToNormalMode(eventId, eventObj) {

        console.log("recoverToNormalMode");
        const eventItem = this.getEventRow(eventId);
        console.log(eventObj);
        const eventNameDiv = eventItem.querySelector(".event");
        const startDiv = eventItem.querySelector(".start");
        const endDiv = eventItem.querySelector(".end");
        //
        const saveBtn = eventItem.querySelector(".save-btn");
        const cancelBtn = eventItem.querySelector(".cancel-btn");


        eventNameDiv.innerHTML = eventObj.eventName;
        startDiv.innerHTML = eventObj.startDate;
        endDiv.innerHTML = eventObj.endDate;

        // remove save button
        saveBtn.remove();

        // remove cancel button
        cancelBtn.remove();

        // create edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.setAttribute("class", "edit-btn");
        editBtn.setAttribute("id", "update" + eventId);
        eventItem.querySelector(".actions").appendChild(editBtn);

        // create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.setAttribute("class", "delete-btn");
        deleteBtn.setAttribute("id", "delete" + eventId);
        eventItem.querySelector(".actions").appendChild(deleteBtn);

    }


    // change event item to Edit mode
    changeToEditMode(eventId) {

        console.log(eventId, "changeToEditMode");

        const eventItem = document.getElementById(eventId);

        // change the child div with class="event" to input
        const eventNameDiv = eventItem.querySelector(".event");
        const eventName = eventNameDiv.innerText;
        eventNameDiv.innerHTML = `<input type="text" class="name_input" id="event_name_input${eventId}" value="${eventName}"/>`;

        // change the child div with class="start" to input
        const startDiv = eventItem.querySelector(".start");
        const startDate = startDiv.innerText;
        startDiv.innerHTML = `<input class="start_input" id="start_time_input${eventId}" type="date" value="${startDate}"/>`;

        // change the child div with class="end" to input
        const endDiv = eventItem.querySelector(".end");
        const endDate = endDiv.innerText;
        endDiv.innerHTML = `<input class="end_input" id="end_time_input${eventId}" type="date" value="${endDate}"/>`;


        // change the edit button to save button
        const editBtn = eventItem.querySelector(".edit-btn");
        const deleteBtn = eventItem.querySelector(".delete-btn");
        // remove editbutton
        editBtn.remove();
        deleteBtn.remove();

        // create save button   
        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.setAttribute("class", "save-btn");
        saveBtn.setAttribute("id", "save" + eventId);
        eventItem.querySelector(".actions").appendChild(saveBtn);


        // create cancel button
        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.setAttribute("class", "cancel-btn");
        cancelBtn.setAttribute("id", "cancel" + eventId);
        eventItem.querySelector(".actions").appendChild(cancelBtn);
    }


    createEventItemElement() {
        const eventElement = document.createElement("div");
        // eventElement.classList.add("event");
        console.log("createEventItemElement");
        eventElement.setAttribute("class", "event_item");
        eventElement.innerHTML = `
            <div class="event">
                <input type="text" id="event_name_input"placeholder="Event Name"/>
            </div>
            <div class="start">
                <input id="start_time_input" type="date"/>
            </div>
            <div class="end">
                <input id="end_time_input" type="date"/>
            </div>
            <div class="actions">
                <button id="add_btn" class="edit">Add</button>
<!--                <button class="delete">Delete</button>-->
            </div>
        `;
        return eventElement;
    }

    createExistEventElement(event) {
        const eventElement = document.createElement("div");
        eventElement.setAttribute("class", "event_item");
        eventElement.setAttribute("id", event.id);

        eventElement.innerHTML = `
<!--            <div class="event_id" style="display: none">${event.id}</div>-->
            <div class="event">${event.eventName}</div>
            <div class="start">${event.startDate}</div>
            <div class="end">${event.endDate}</div>
            <div class="actions">
                <button class="edit-btn" id=${"update" + event.id}>Edit</button>
                <button class="delete-btn" id=${"delete" + event.id}>Delete</button>
            </div>
        `;
        return eventElement;
    }

}

export default EventsView;