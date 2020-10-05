module.exports = {
    age(timestamp){
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
    graduation(level){
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
    grade(level){
        let school_year = '';
        switch (level) {
            case '5f':
                school_year = '5° ano do ensino fundamental';
                break;
            case '6f':
                school_year = '6° ano do ensino fundamental';
                break;
            case '7f':
                school_year = '7° ano do ensino fundamental';
                break;
            case '8f':
                school_year = '8° ano do ensino fundamental';
                break;
            case '1m':
                school_year = '1° ano do ensino médio';
                break;
            case '2m':
                school_year = '2° ano do ensino médio';
                break;
            case '3m':
                school_year = '3° ano do ensino médio';
                break;
            default:
                break;        
        }

        return school_year;

    },
    date(timestamp){
        const birthDate = new Date(timestamp);

        const year = birthDate.getUTCFullYear();
        const month = `0${birthDate.getUTCMonth() + 1}`.slice(-2);
        const day = `0${birthDate.getUTCDate()}`.slice(-2);

        return{
            year,
            month,
            day,
            birthdate: `${day}/${month}`,
            iso: `${year}-${month}-${day}`,
            format: `${day}-${month}-${year}`
        }
    }
}