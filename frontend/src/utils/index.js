const isNullOrEmptyOrSpace = (str)=>{
    try{
        if(str === null)
            return true

        if(str.trim() === ""){
            return true
        }
    }
    catch(error){
        return true
    }
    return false
}

const rangeFromTo = (start, end, step = 1) => {
    return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
  };

export {isNullOrEmptyOrSpace, rangeFromTo}