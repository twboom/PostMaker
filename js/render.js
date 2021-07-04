// Renderer for exporting and for rendering to page
class Renderer {

    constructor(post, canvas, width, height) {

        this.post = post;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.width = width;
        this.height = height;

    }

    // Rendering
    render() {

        const html = this.post;
        const ctx = this.context

        // Following code comes from https://stackoverflow.com/a/43724114/14445654

        const data = "data:image/svg+xml;charset=utf-8," + '<svg xmlns="http://www.w3.org/2000/svg" width="' + this.width + '" height="' + this.height + '">' +
                    '<foreignObject width="100%" height="100%">' +
                    this.html_to_xml(html) +
                    '</foreignObject>' +
                    '</svg>';

        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
        img.src = data;
    }

    // Export it as an image
    export(type) {

        let download;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')

        const html = this.post;

        // Fill background with background
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0, this.canvas.width, this.canvas.height)

        // Following code comes from https://stackoverflow.com/a/43724114/14445654

        const data = "data:image/svg+xml;charset=utf-8," + '<svg xmlns="http://www.w3.org/2000/svg" width="' + this.width + '" height="' + this.height + '">' +
                    '<foreignObject width="100%" height="100%">' +
                    this.html_to_xml(html) +
                    '</foreignObject>' +
                    '</svg>';

        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            download = document.createElement('a');
            download.href = canvas.toDataURL(`image/${type}`)
            download.download = 'PostMaker';
            download.innerText = 'Download!'
            document.body.appendChild(download)
        }
        img.src = data;
        
        canvas.remove()

        return download;
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