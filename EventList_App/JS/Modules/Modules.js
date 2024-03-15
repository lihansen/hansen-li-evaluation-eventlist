// import APIs from './API.js';
class EventsModules {
    #events;
    constructor(BaseURL) {
        this.baseUrl = BaseURL;
        this.#events = [];
    }
    setEvents(events) {
        this.#events = events;
    }
    getEvents() {
        return this.#events;
    }

    addEvent(newEvent) {
        this.#events.push(newEvent);
    }

    deleteEvent(id) {
        this.#events = this.#events.filter((event) => event.id !== id);
    }
    //  getEvents() {
    //    
    //     return [
    //         {
    //             "eventName": "Music Festival",
    //             "startDate": "2023-01-20",
    //             "endDate": "2023-01-21",
    //             "id": "30a1"
    //         },
    //         {
    //             "eventName": "Food Festival",
    //             "startDate": "2023-02-01",
    //             "endDate": "2023-02-02",
    //             "id": "30a8"
    //         },
    //         {
    //             "id": "8mgAO1T"
    //         },
    //         {
    //             "title": "new event",
    //             "id": "_ctONL0"
    //         },
    //         {
    //             "title": "neww event",
    //             "startDate": "2024-03-15T18:14:11.611Z",
    //             "endDate": "2024-03-15T18:14:11.611Z",
    //             "id": "1oLXqHT"
    //         }
    //     ]
    //
    //
    //
    // }

}


// BaseURL = "http://localhost:3000/events";

export default EventsModules;



