// Renderer for exporting
class Renderer {

    constructor(post, canvas) {

        this.post = post;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

    }

    // Rendering
    render(x, y, width, height) {

        const html = this.post;
        const ctx = this.context

        // Following code comes from https://stackoverflow.com/a/43724114/14445654

        var data = "data:image/svg+xml;charset=utf-8," + '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
            '<foreignObject width="100%" height="100%">' +
            this.html_to_xml(html) +
            '</foreignObject>' +
            '</svg>';

        var img = new Image();
        img.onload = function() {
        ctx.drawImage(img, x, y);
        }
        img.src = data;
    }

    // Export it as an image
    export(type) {

        const canvas = this.canvas
        console.log(canvas.toDataURL('image/jpeg'))

        const download = document.createElement('a');
        download.href = canvas.toDataURL(`image/${type}`)
        download.download = 'PostMaker';
        download.innerText = 'Donwload!'
        document.body.appendChild(download)
        
    }

    // Utitlity code
    html_to_xml(html) {

        html = html.innerHTML;

        // Following code comes from https://stackoverflow.com/a/43724114/14445654

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