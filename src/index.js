import sanitizeHtml from 'sanitize-html';
import {minify} from 'html-minifier';


export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function toSlug(str) {
    str = str.toLowerCase();
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/([^0-9a-z-\s])/g, '');
    str = str.replace(/(\s+)/g, '-');
    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');

    return str;
}


export function sanitize(content) {
    content = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span', 'h2', 'article']),
        allowedAttributes: {
            a: ['href', 'name', 'target'],
            img: ['src', 'alt', 'title'],
            iframe: ['src'],
            '*': ['style', 'itemprop', 'itemtype', 'itemscope'],
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
        allowedSchemesAppliedToAttributes: ['href', 'src'],
        allowedStyles: {
            '*': {
                // Match HEX and RGB
                'color': [/^\#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                'text-align': [/^left$/, /^right$/, /^center$/],
                // Match any number with px, em, or %
                'font-size': [/^\d+(?:px|em|%)$/],
                'font-style': [/^.*$/],
                'font-weight': [/^bold$/],
                'width': [/^\d+(?:px|em|%)$/],
                'height': [/^\d+(?:px|em|%)$/],
            }
        },
        allowedIframeHostnames: ['www.youtube.com']
    });
    return minify(content.trim(), {
        collapseWhitespace: true
    });
}