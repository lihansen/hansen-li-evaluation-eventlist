class EventsView {
    constructor() {
        this.addNewEventBtn = document.getElementById('addNewEvent');
        this.EvenetList = document.getElementById('event_list');


    }
    
    setSubmitForm(){
        this.submitBtn = document.getElementById('add_btn');
        this.eventNameInput = document.getElementById('event_name_input');
        this.startTimeInput = document.getElementById('start_time_input');
        this.endTimeInput = document.getElementById('end_time_input');

    }   


    editEvent(){
        console.log("editEvent");

    }

    // change event item to Edit mode
    changeToEditMode(btnId){
        console.log("changeToEditMode");
        const eventId = btnId.substring(6);
        const eventItem = document.getElementById(eventId);        

        
        // change the child div with class="event" to input
        const eventNameDiv = eventItem.querySelector(".event");
        const eventName = eventNameDiv.innerText;
        eventNameDiv.innerHTML = `<input type="text" id="event_name_input" value="${eventName}"/>`;
        
        // change the child div with class="start" to input
        const startDiv = eventItem.querySelector(".start");
        const startDate = startDiv.innerText;
        startDiv.innerHTML = `<input id="start_time_input" type="date" value="${startDate}"/>`;
        
        // change the child div with class="end" to input
        const endDiv = eventItem.querySelector(".end");
        const endDate = endDiv.innerText;
        endDiv.innerHTML = `<input id="end_time_input" type="date" value="${endDate}"/>`;
        // change the edit button to save button
        const editBtn = document.getElementById(btnId);
        editBtn.innerText = "Save";
        editBtn.setAttribute("id", "save" + eventId);
        
        // change the delete button to cancel button
        const deleteBtn = document.getElementById("delete" + eventId);
        deleteBtn.innerText = "Cancel";
        deleteBtn.setAttribute("id", "cancel" + eventId);
        
    }

    renderEvents(events) {
        console.log("renderEvents");
        events.forEach(event => {
            this.EvenetList.appendChild(this.createExistEventElement(event));
        });
    }


    renderAddNewEvent(event) {
        console.log("renderAddNewEvent");
        this.EvenetList.appendChild(this.createEventItemElement());
    }

    removeEventElement(id) {
        console.log("deleteItem");
        document.getElementById(id).remove();
    }

    createEventItemElement() {
        const eventElement = document.createElement("div");
        // eventElement.classList.add("event");
        console.log("addItem");
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