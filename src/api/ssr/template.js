const template = (title, initialState = {}, content = "") => {
    let scripts = ''
    let css = ''
    let fontawesome = ''
    let page = ''
    if (process.env.NODE_ENV === 'production') {
        page = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${title} </title>
            <link href="assets/client.css" rel="stylesheet">
        </head>
        <body>
            <section id="app">${content}</section>
            <script>
                        window.__STATE__ = ${JSON.stringify(initialState)}
                    </script>
            <script src="assets/client.js"></script>
        </body>
        </html>
    `
    } else {
        page = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${title} </title>
            <link href="assets/bundle.css" rel="stylesheet">
        </head>
        <body>
            <section id="app">${content}</section>
            <script>
                        window.__STATE__ = ${JSON.stringify(initialState)}
                    </script>
        <script src="assets/bundle.js"></script>
        </body>
        </html>
    `
    }
    return page
}
export {template}