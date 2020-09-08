const Joi = require('joi');
const express = require('express');
const port = 3000
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
    res.send('hello there!')

});

app.get('/api/courses', (req, res) => {
    res.send(courses);

});

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('the couse with the given ID is not found');
    res.send(course);

});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.listen(port, function(error) {
    if(error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
})