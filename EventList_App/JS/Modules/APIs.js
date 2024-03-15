class APIs{
    constructor(BaseURL) {
        this.baseUrl = BaseURL;
    }

    async getEvents() {
        const url = `${this.baseUrl}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("getdatafrom", this.baseUrl)
        return data;
    }
    
    
    async deleteEvent(id) {
        const url = `${this.baseUrl}/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
        });
        return await response.json();
    }
    
    async addEvent(newEvent) {
        const url = `${this.baseUrl}`;
        // check if eventName is in the newEvent

        
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        });
        return await response.json();
    }
    
    async updateEvent(id, updatedEvent) {
        const url = `${this.baseUrl}/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEvent),
        });
        return await response.json();
    }

}

export default APIs;   // export the class to be used in other files
// const BASE_URL = "http://localhost:3000/events";
// export default APIs;   // export the class to be used in other files
// const apis = new APIs(BASE_URL);
// apis.getEvents().then(data => console.log(data));


// const newEvent = {
//     title: "neww event",
//     startDate: new Date(),
//     endDate: new Date()
// };
// apis.addEvent(newEvent).then(data => console.log(data));


// apis.updateEvent("MOWbCfA", {title: "updated event"}).then(data => console.log(data));
// apis.deleteEvent("MOWbCfA").then(data => console.log(data));