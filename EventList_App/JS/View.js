class EventsView {
    constructor() {
        this.addNewEventBtn = document.getElementById('addNewEvent');
        this.EvenetList = document.getElementById('event_list');
        // this.newEventRow = document.getElementById('new-event-row');
        
        this.saveIcon = "<svg focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z\"/></svg>";
        this.deleteIcon = "<svg focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" data-testid=\"DeleteIcon\" aria-label=\"fontSize small\"><path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"></path></svg>";
        this.editIcon = "<svg focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" data-testid=\"EditIcon\" aria-label=\"fontSize small\"><path d=\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\"></path></svg>";
        this.cancelIcon = "<svg focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z\"></path></svg>";
        this.addIcon = "<svg focusable viewBox=\"0 0 24 24\" aria-hidden=\"true xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 6V18M18 12H6\" stroke=\"#FFFFFF\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>";
        
    }
    
    setNewButtonAvaliable(){
        this.addNewEventBtn.disabled = false;
    }
    setNewButtonDisable(){
        this.addNewEventBtn.disabled = true;
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
    
    getAddBtn(eventId) {
        return this.getEventRow(eventId).querySelector(".add-btn");
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
        this.getEventRow(eventId).remove();
    }

    renderAddNewEventRow() {
        // console.log("append to the event list");
        this.EvenetList.appendChild(this.createNewEventRow());
    }

    // getNewEventRowCancelBtn() {
    //     console.log(this.newEventRow);
    //     return this.newEventRow.querySelector(".cancel-btn");
    // }
    //
    // removeNewEventRow() {
    //     this.newEventRow.remove();
    // }

    renderEventRow(event, placeholder=false) {
        if (placeholder) {
            this.removeEventRow("placeholder");
        }
        
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
        editBtn.innerHTML = this.editIcon;
        editBtn.setAttribute("class", "edit-btn");
        editBtn.setAttribute("id", "update" + eventId);
        eventItem.querySelector(".actions").appendChild(editBtn);

        // create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = this.deleteIcon;
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
        saveBtn.innerHTML = this.saveIcon;
        saveBtn.setAttribute("class", "save-btn");
        saveBtn.setAttribute("id", "save" + eventId);
        eventItem.querySelector(".actions").appendChild(saveBtn);


        // create cancel button
        const cancelBtn = document.createElement("button");
        cancelBtn.innerHTML = this.cancelIcon;
        cancelBtn.setAttribute("class", "cancel-btn");
        cancelBtn.setAttribute("id", "cancel" + eventId);
        eventItem.querySelector(".actions").appendChild(cancelBtn);
    }

    createNewEventRow() {
        const eventElement = document.createElement("div");
        // eventElement.classList.add("event");
        console.log("createEventItemElement");
        eventElement.setAttribute("class", "event_item");
        eventElement.setAttribute("id", "placeholder");
        eventElement.innerHTML = `
            <div class="event" >
                <input type="text" id="event_name_input" placeholder="Event Name"/>
            </div>
            <div class="start">
                <input id="start_time_input" type="date"/>
            </div>
            <div class="end">
                <input id="end_time_input" type="date"/>
            </div>
            <div class="actions">
                <button id="add_btn" class="edit-btn">
                    ${this.addIcon}
                </button>
                <button class="cancel-btn">
                    ${this.cancelIcon}
                </button>
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
                <button class="edit-btn" id=${"update" + event.id}>${this.editIcon}</button>
                <button class="delete-btn" id=${"delete" + event.id}>${this.deleteIcon}</button>
            </div>
        `;
        return eventElement;
    }

}

export default EventsView;