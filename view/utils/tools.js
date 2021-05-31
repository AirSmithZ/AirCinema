 const getMaxdata=(a,b)=>{
    if(a<=0){
       return 0
    }
    if(a>=b){
        return b  
    }
    return a
}
 const formatSeconds = (value) => {
    let result = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    if (Math.floor(result / 3600) === 0) {
        result = `${m}:${s}`
    } else {
        result = `${h}:${m}:${s}`
    }

    return result
}

export {
    getMaxdata , formatSeconds
}