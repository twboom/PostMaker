// Renderer for exporting
class Renderer {

    constructor(post) {}

    // Rendering
    render(html, ctx, x, y, width, height) {
        var data = "data:image/svg+xml;charset=utf-8," + '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
            '<foreignObject width="100%" height="100%">' +
            html_to_xml(html) +
            '</foreignObject>' +
            '</svg>';

        var img = new Image();
        img.onload = function() {
        ctx.drawImage(img, x, y);
        }
        img.src = data;
    }

    // Utitlity code
    html_to_xml(html) {
        // This code comes from https://stackoverflow.com/a/43724114/14445654

        const doc = document.implementation.createHTMLDocument('');
        doc.write(html);

        // You must manually set the xmlns if you intend to immediately serialize     
        // the HTML document to a string as opposed to appending it to a
        // <foreignObject> in the DOM
        doc.documentElement.setAttribute('xmlns', doc.documentElement.namespaceURI);

        // Get well-formed markup
        html = (new XMLSerializer).serializeToString(doc.body);
        return html;
    }

}