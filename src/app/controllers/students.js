const {grade, date} = require('../../lib/utils');
const Student = require('../model/Student');

module.exports = {
    index(req, res){
        Student.all(function(students){
            return res.render('students/index', {students});
        })
    },
    create(req, res){
        Student.teachersSelectOptions(function(option){
            return res.render('students/create', {teachersSelectOptions: option});
        })
    },
    post(req, res){
        const keys = Object.keys(req.body);
        //verificacao para todos elementos do form
        for (const key of keys) {
            if(req.body[key] == ''){
                return res.send('Please, fill all fields!');
            }
        }

        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        });
    },
    show(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send('Student not found!');
            student.birth = date(student.birth).birthdate;
            student.school_year = grade(student.school_year);
            return res.render('students/show', {student});
        });
    },
    edit(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send('Student not found!');
            student.birth = date(student.birth).iso;

            Student.teachersSelectOptions(function(option){
                return res.render('students/edit', {teachersSelectOptions: option, student});
            })
        })
    },
    put(req, res){
        const keys = Object.keys(req.body);
        //verificacao para todos elementos do form
        for (const key of keys) {
            if(req.body[key] == ''){
                return res.send('Please, fill all fields!');
            }
        }

        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`);
        })
    },
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`);
        })
    },
}