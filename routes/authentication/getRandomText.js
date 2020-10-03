function genRandomText(n){
    //This function returns a string of random characters with a given n number of characters

    let randomText = '';
    let charactersString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+/-+.,?<}{;"`';
    let characters = charactersString.split('');
    const pick = ()=>{
        let l = characters.length;
        return Math.round(Math.random()*l);
    }
    for(i=0; i<n; i++){
        randomText += characters[pick()];
    }
    return randomText;
}

module.exports =  genRandomText;