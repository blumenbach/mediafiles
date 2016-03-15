window.onload = function () {

    'use strict';

    var options = {
        // inline: true,
        url: 'data-original',
        build: function (e) {
            console.log(e.type);
        },
        built:  function (e) {
            console.log(e.type);
        },
        show:  function (e) {
            console.log(e.type);
        },
        shown:  function (e) {
            console.log(e.type);
        },
        hide:  function (e) {
            console.log(e.type);
        },
        hidden:  function (e) {
            console.log(e.type);
        },
        view:  function (e) {
            console.log(e.type);
        },
        viewed:  function (e) {
            console.log(e.type);
            // this.viewer.zoomTo(1).rotateTo(180);
        }
    };
    var pictures = document.querySelector('.photos');
    var viewer = new Viewer(pictures, options);

};

