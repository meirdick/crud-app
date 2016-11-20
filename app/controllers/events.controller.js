// require model events
const Event = require('../models/event');

module.exports = {
    showEvents:     showEvents,
    showSingle:     showSingle,
    seedEvents:     seedEvents,
    showCreate:     showCreate,
    processCreate:  processCreate,
    showEdit:       showEdit,
    processEdit:    processEdit,
    deleteEvent:    deleteEvent
}

    //show all events
    function showEvents(req, res) {
        // get all events
        Event.find({}, (err, events) => {
            if (err) {
                res.status(404);
                res.send('Events not Found');
            }
        // return view with data
            res.render('pages/events', {
                events: events,
                success: req.flash('success')
            });
        });
    }

        // show single event
    function showSingle(req, res) {
        Event.findOne({ slug: req.params.slug }, (err, event) => {
            if (err) {
                res.status(404);
                res.send('Events not Found');
            }
            res.render('pages/single', {
                event: event,
                success: req.flash('success')
            });
        });
    }


    // create some events
    function seedEvents(req, res) {
        var events = [
            {name: 'Basketball', description: 'throwing balls'},
            {name: 'swiiming', description: 'foshing'},
            {name: 'weightlifting', description: 'like heavy stuff'},
            {name: 'weightl', description: 'do not like heavy stuff'}
        ];

        // use events model to insert
        Event.remove({}, () => {
            for (event of events) {
                var newEvent = new Event(event);
                newEvent.save();
            }
        });
            // log that has beeen seeded
            res.send('Data Seeded');
    }

        // create event form
// render page
    function showCreate(req, res) {
        res.render('pages/edit', {
            errors: req.flash('errors')
        });
    }

        //process create form
    function processCreate(req, res) {
        //validate form
        req.checkBody('name', 'Name is required.').notEmpty();
        req.checkBody('description', 'Description is required').notEmpty();
        // if errors redirect back, save and show errors
        var errors = req.validationErrors();
        if (errors) {
            req.flash('errors', errors.map(err => err.msg));
            return res.redirect('/events/create');
        }


        var event = new Event({
            name:           req.body.name,
            description:    req.body.description
        });

// save event
        event.save((err) => {
            if (err)
                    throw err;

                // send succesful flash message
            req.flash('success', 'Succesfulyy created event');
                // redirect to newly created page
            res.redirect(`/events/${event.slug}`);
        });
    }

// show edit page
    function showEdit(req, res) {
        // need to pass slug and  errors
        Event.findOne({ slug: req.params.slug }, (err, event) => {
            res.render('pages/edit', {
                event: event,
                errors: req.flash('errors')
            });
        });
    }

// process edit
    function processEdit(req, res) {
                //validate form
        req.checkBody('name', 'Name is required.').notEmpty();
        req.checkBody('description', 'Description is required').notEmpty();
        // if errors redirect back, save and show errors
        var errors = req.validationErrors();
        if (errors) {
            req.flash('errors', errors.map(err => err.msg));
            return res.redirect(`/events/${req.params.slug}/edit`);
        }
// find current event, and update
        Event.findOne({ slug: req.params.slug }, (err, event) => {
            event.name = req.body.name;
            event.description = req.body.description;

            event.save((err) => {
                if (err)
                    throw err;
// add flash message success
                req.flash('success', 'Successfully updated event.');
// then redirect user
                res.redirect('/events');
            });
        });
    }

//  delete event
    function deleteEvent(req, res) {
        Event.remove({ slug: req.params.slug }, (err) => {
            // set flash
            req.flash('success', 'event deleted');
            // redirect back
            res.redirect('/events');
        });
    }