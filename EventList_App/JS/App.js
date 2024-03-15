import EventsView from './View.js';
import EventsModules from './Modules/Modules.js';
import EventsController from './Controller.js';


const BaseURL = "http://localhost:3000/events";
const eventsModules = new EventsModules(BaseURL);
const eventsView = new EventsView();
const eventsController = new EventsController(eventsView, eventsModules );
// eventsController.addEventItem();
// console.log(eventsController);
