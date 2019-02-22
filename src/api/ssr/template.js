const template = (title, initialState = {}, content = "") => {
    let scripts = ''
    let css = ''
    let fontawesome = ''
    if (process.env.NODE_ENV === 'production') {
        scripts = ` <script>
                        window.__STATE__ = ${JSON.stringify(initialState)}
                    </script>
                    <script src="assets/client.js"></script>`
        css = `<link href="assets/client.css" rel="stylesheet">`
    } else {
        scripts = `<script src="assets/bundle.js></script>`
        css = `<link href="assets/bundle.css" rel="stylesheet">`
        fontawesome = `<link href="https://use.fontawesome.com/releases/v5.7.2/css/svg-with-js.css" rel="stylesheet"></link>`
    }
    let page = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${title} </title>
            ${fontawesome}
           ${css}
        </head>
        <body>
            <section id="app">${content}</section>
        </body>
        ${scripts}
        </html>
    `
    return page
}
export {template}