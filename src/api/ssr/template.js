const template = (title, initialState = {}, content = "") => {
    let scripts = ''
    if (content) {
        scripts = ` <script>
                        window.__STATE__ = ${JSON.stringify(initialState)}
                    </script>
                    <script src="assets/client.js"></script>`
    } else {
        scripts = `<script src="assets/bundle.js></script>`
    }
    let page = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${title} </title>
        </head>
        <body>
            <section id="app">
            ${content}
            </section>
        </body>
        ${scripts}
        </html>
    `
    return page
}
module.exports = template