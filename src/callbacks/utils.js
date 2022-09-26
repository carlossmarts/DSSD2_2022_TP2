
const serverError = (error)=> {
    return{
        status: 500,
        error: error
    }
}

const serverOK = (data)=>{
    return {
        status: 200,
        data: data
    }
}

module.exports ={
    serverError,
    serverOK
}