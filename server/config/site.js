const config = {

    title: 'Web',
    keywords: '',
    description: '',

    navId: '01',
    page: {
        index: 0,
        size: 10
    },
    nav: [{
        id: '01',
        text: 'Home',
        link: '/'
    }, {
        id: '02',
        text: 'Article',
        link: '/item'
    }, {
        id: '03',
        text: 'About',
        link: '/about'
    }, {
        id: '04',
        text: 'Contact',
        link: '/contact'
    }],
    cdn: {
        js: '',
        css: '',
        img: ''
    },
    weixin: {
        gzh: {},
        app: {}
    }
};
module.exports = config;