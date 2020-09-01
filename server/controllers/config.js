const config = {
    "max_teams": 5,
    "max_perTeam": 5,
    "privateRoom": false,
    "max_perRoom": 8,
};

const configNew = () => {
    try{
        return config;
    }
    catch(err)
    {
       return err.message;
    }
}

module.exports = {configNew};