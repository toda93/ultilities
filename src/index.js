import sanitizeHtml from 'sanitize-html';
import { minify } from 'html-minifier';


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
        allowedTags: [
            'img',
            'span',
            'address',
            'article',
            'aside',
            'footer',
            'header',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'nav',
            'section',
            'blockquote',
            'figcaption',
            'figure',
            'hr',
            'li',
            'main',
            'ol',
            'p',
            'pre',
            'ul',
            'a',
            'b',
            'br',
            'code',
            'em',
            'i',
            'kbd',
            'mark',
            'q',
            's',
            'small',
            'span',
            'strong',
            'sub',
            'sup',
            'time',
            'u',
            'wbr',
            'caption',
            'col',
            'colgroup',
            'table',
            'tbody',
            'td',
            'tfoot',
            'th',
            'thead',
            'tr',
            'video',
            'iframe',
            'svg',
        ],
        allowedAttributes: {
            a: ['href', 'name', 'target', 'rel'],
            img: ['src', 'alt', 'title'],
            iframe: ['src'],
            '*': ['style', 'itemscope', 'itemtype', 'itemprop'],
        },
        allowedStyles: {
            '*': {
                // Match HEX and RGB
                // eslint-disable-next-line
                color: [/^\#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
                // Match any number with px, em, or %
                'font-size': [/^\d+(?:px|em|%)$/],
                'font-style': [/^.*$/],
                'font-weight': [/^bold$/],
                'font-family': [/^.*$/],
                width: [/^\d+(?:px|em|%)$/],
                height: [/^\d+(?:px|em|%)$/],
                padding: [/^\d+(?:px|em|%)$/],
                'padding-left': [/^\d+(?:px|em|%)$/],
                'padding-right': [/^\d+(?:px|em|%)$/],
                'padding-top': [/^\d+(?:px|em|%)$/],
                'padding-bottom': [/^\d+(?:px|em|%)$/],
                margin: [/^\d+(?:px|em|%)$/],
                'margin-top': [/^\d+(?:px|em|%)$/],
                'margin-left': [/^\d+(?:px|em|%)$/],
                'margin-right': [/^\d+(?:px|em|%)$/],
                'margin-bottom': [/^\d+(?:px|em|%)$/],
                'border-radius': [/^\d+(?:px|em|%)$/],
                'vertical-align': [
                    /^length$/,
                    /^%$/,
                    /^sub/,
                    /^super$/,
                    /^top$/,
                    /^text-top$/,
                    /^middle/,
                    /^bottom$/,
                    /^text-bottom$/,
                    /^initial$/,
                    /^inherit$/,
                ],
                colspan: [/^\d+/],
            },
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
        allowedSchemesAppliedToAttributes: ['href', 'src'],
        allowedIframeHostnames: ['www.youtube.com'],
    });
    return minify(content.trim(), {
        collapseWhitespace: true
    });
}