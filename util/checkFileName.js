exports.validateFileExtension = async (filename,extension) => {  
    try{
        let validExtension = false;
        if(filename.split('.')[1].toString().trim().toLowerCase() === extension){
            validExtension = true;
        } else{
            validExtension = false;
        }
        return validExtension;
     
    }catch(err){
        return false;
    }
}

