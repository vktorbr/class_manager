const {age, graduation, date} = require('../../lib/utils');

module.exports = {
    index(req, res){
        return res.render('teachers/index');
    },
    create(req, res){
        return res.render('teachers/create');
    },
    post(req, res){
        const keys = Object.keys(req.body);
        //verificacao para todos elementos do form
        for (const key of keys) {
            if(req.body[key] == ''){
                return res.send('Please, fill all fields!');
            }
        }

        return;
    },
    show(req, res){
        return;
    },
    edit(req, res){
        return;
    },
    put(req, res){
        const keys = Object.keys(req.body);
        //verificacao para todos elementos do form
        for (const key of keys) {
            if(req.body[key] == ''){
                return res.send('Please, fill all fields!');
            }
        }

        return;    
    },
    delete(req, res){
        return;
    },
}