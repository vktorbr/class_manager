const fs = require('fs');
const data = require('./data.json');
const {age, graduation, date} = require('./utils');
//create
exports.post = function(req, res){
    //return res.send(req.body);
    const keys = Object.keys(req.body);
    //verificacao para todos elementos do form
    for (const key of keys) {
        if(req.body[key] == ''){
            return res.send('Please, fill all fields!');
        }
    }

    let {avatar_url, name, birth, education_level, class_type, services} = req.body;

    const id = Number(data.teachers.length + 1);
    const create_at = Date.now();
    birth = Date.parse(birth);

    data.teachers.push({
        id,
        name,
        avatar_url,
        birth,
        education_level,
        class_type,
        services,
        create_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file error!');

        return res.redirect('/teachers');
    })
}
//show
exports.show = function(req, res){
    const {id} = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id;
    })

    if(!foundTeacher){
        return res.send('Teacher not found');
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        education_level: graduation(foundTeacher.education_level),
        services: foundTeacher.services.split(','),
        create_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.create_at),
    }

    return res.render('teachers/show', {teacher});
}
//edit
exports.edit = function(req, res){
    const {id} = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id;
    })

    if(!foundTeacher){
        return res.send('Teacher not found');
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', {teacher});
}
//put
exports.put = function(req, res){
    const {id} = req.body;
    let indexFound = 0;
    const foundTeacher = data.teachers.find(function(teacher, index){
        if(teacher.id == id){
            indexFound = index;
            return true;
        }
    })

    if(!foundTeacher) return res.send('Teacher not found!');

    const teacher = {
        ...foundTeacher,
        ...req.body,
        id: Number(id),
        birth: Date.parse(req.body.birth),
    }

    data.teachers[indexFound] = teacher;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file error!');

        return res.redirect(`/teachers/${id}`);
    })
}
//delete
exports.delete = function(req, res){
    const {id} = req.body;

    const newTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id;
    })

    data.teachers = newTeachers;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file error!');

        return res.redirect('/teachers');
    })
}