//crete new router
var express =           require('express'),
    router =            express.Router(),
    mainController =    require('./controllers/main.controller'),
    eventsController =  require('./controllers/events.controller');
//export router
module.exports = router;

// routings
//HOME
router.get('/',                 mainController.showHome);

// EVENTS
router.get('/events',           eventsController.showEvents);

// seed routes
router.get('/events/seed',      eventsController.seedEvents);

// create events
router.get('/events/create',    eventsController.showCreate);
router.post('/events/create',   eventsController.processCreate);

//edit events
router.get('/events/:slug/edit', eventsController.showEdit);
router.post('/events/:slug',     eventsController.processEdit);
//delete events
router.get('/events/:slug/delete', eventsController.deleteEvent);

//single pages
router.get('/events/:slug', eventsController.showSingle);