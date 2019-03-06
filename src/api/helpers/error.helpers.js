export {
    errorHandler
}


const errorParser = (error) => {
    return error
}

const errorHandler = (error, res) => {
    res.status(error.status)
    res.json({
        message: error.message
    })
    res.end()
}