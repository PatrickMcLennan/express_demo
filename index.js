"use strict";
var Joi = require('joi');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var validateCourse = function (course) {
    var schema = {
        name: Joi.string()
            .min(3)
            .required()
    };
    return Joi.validate(course, schema);
};
app.use(express.json());
var courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];
app.get('/', function (req, res) {
    res.send('Hello World!!!');
});
app.get('/api/courses', function (req, res) {
    res.send(courses);
});
app.post('/api/courses', function (req, res) {
    var error = validateCourse(req.body).error;
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    var course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
app.put('/api/courses/:id', function (req, res) {
    var course = courses.find(function (course) { return course.id === parseInt(req.params.id); });
    if (!course) {
        res.status(404).send('No course was found with that id.');
    }
    var error = validateCourse(req.body).error;
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    return res;
});
app.get('/api/courses/:id', function (req, res) {
    var course = courses.find(function (course) { return course.id === parseInt(req.params.id); });
    if (!course) {
        res.status(404).send('No course was found with that id.');
    }
    res.send(course);
});
app.listen(PORT, function (err, success) {
    if (err) {
        console.log("There was an error connecting to Port " + PORT);
    }
    console.log("Connected on Port " + PORT);
});
