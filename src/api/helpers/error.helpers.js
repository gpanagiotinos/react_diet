export {
    errorHandler
}


const errorParser = (error) => {
    return error
}

const errorHandler = (error, res) => {
    console.log('error')
    res.status(500)
    res.json({
        message: error
    })
    res.end()
}