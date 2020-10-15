const {grade, date} = require('../../lib/utils');
const Student = require('../model/Student');

module.exports = {
    index(req, res){
        let {filter, limit, page} = req.query;

        page = page || 1;
        limit = limit || 2;
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students){
                let totalAux = 0;
                if(students[0]){
                    totalAux = students[0].total;
                }else{
                    totalAux = 1;
                }
                const pagination = {
                    total: Math.ceil(totalAux / limit),
                    page
                }
                return res.render('students/index', {students, filter, pagination});
            }
        }

        Student.paginate(params);
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