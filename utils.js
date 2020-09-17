module.exports = {
    age: function(timestamp){
        const today = new Date();

        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();

        const day = today.getDate() - birthDate.getDate();

        if(month < 0 || month == 0 && day < 0){
            age = age - 1;
        }

        return age;
    },
    graduation: function(level){
        let education_level = '';
        switch (level) {
            case 'medium':
                education_level = 'Ensino Médio Completo';
                break;
            case 'high':
                education_level = 'Ensino Superior Completo';
                break;
            case 'master':
                education_level = 'Mestrado';
                break;
            case 'doctor':
                education_level = 'Doutorado';
                break;
            default:
                break;        
        }

        return education_level;

    },
    date: function(timestamp){
        const birthDate = new Date(timestamp);

        const year = birthDate.getUTCFullYear();
        const month = `0${birthDate.getUTCMonth() + 1}`.slice(-2);
        const day = `0${birthDate.getUTCDate()}`.slice(-2);

        return (`${year}-${month}-${day}`);
    }
}