


async function phoneValidation(phone){
   
   
    if(phone.length==10){
        return true;
    }
    else{
        return false;
    }


}



module.exports.phoneValidation = phoneValidation;