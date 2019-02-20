const Joi = require('joi');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

interface Course {
  id: number;
  name: string;
}

const validateCourse = (course: Course): Course => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
};

app.use(express.json());
const courses: Course[] = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course: Course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put(
  '/api/courses/:id',
  (req, res): Course => {
    const course: Course = courses.find(
      (course: Course) => course.id === parseInt(req.params.id)
    );
    if (!course) {
      res.status(404).send('No course was found with that id.');
    }
    const { error } = validateCourse(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    course.name = req.body.name;
    return res;
  }
);

app.get('/api/courses/:id', (req: Course['id'], res) => {
  const course: Course['id'] = courses.find(
    course => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send('No course was found with that id.');
  }
  res.send(course);
});

app.listen(PORT, (err, success) => {
  if (err) {
    console.log(`There was an error connecting to Port ${PORT}`);
  }
  console.log(`Connected on Port ${PORT}`);
});
