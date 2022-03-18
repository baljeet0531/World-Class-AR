
// set --vh as window inner height
document.documentElement.style.setProperty(
    '--vh',
    window.innerHeight * 0.01 + 'px'
)

myInterval = setInterval(getvideo, 1000);
var video;
function getvideo() {
    video = document.querySelector('video');
    if (video) {
        document.querySelector(".lds-roller").style.display = "none";
        bgmusic = document.querySelector('audio');
        bgmusic.play();
        clearInterval(myInterval);
    }
}

AFRAME.registerComponent('model-relative-opacity', {
    schema: { opacityFactor: { default: 1.0 } },
    init: function () {
        this.nodeMap = {}
        this.prepareMap.bind(this)
        this.traverseMesh.bind(this)

        this.el.addEventListener('model-loaded', e => {
            this.prepareMap()
            this.update()
        });
    },
    prepareMap: function () {
        this.traverseMesh(node => {
            this.nodeMap[node.uuid] = node.material.opacity
        })
    },
    update: function () {
        this.traverseMesh(node => {
            node.material.opacity = this.nodeMap[node.uuid] * this.data.opacityFactor
            node.material.transparent = node.material.opacity < 1.0; node.material.needsUpdate = true;
        })
    }, remove: function () {
        this.traverseMesh(node => {
            node.material.opacity = this.nodeMap[node.uuid]
            node.material.transparent = node.material.opacity < 1.0; node.material.needsUpdate = true;
        })
    }, traverseMesh:
        function (func) {
            var mesh = this.el.getObject3D('mesh'); if (!mesh) { return; } mesh.traverse(node => {
                if (node.isMesh) {
                    func(node)
                }
            });
        }
});

var loaded = false;
var first_markerfound = false;

AFRAME.registerComponent('markerhandler', {
    init: function () {
        let aim = document.querySelector(".aim");
        var mars = document.querySelector("#mars");


        this.el.addEventListener('markerFound', () => {
            // alert("marker found!!");
            aim.setAttribute('visible', true);

            if (!first_markerfound) {
                first_markerfound = true;
            }

            if (first_markerfound && loaded) {
                mars.emit("fadein");
            }

        })
    }
});

AFRAME.registerComponent('marsmodel', {
    init: function () {
        let walker = document.querySelectorAll(".clickable");

        this.el.addEventListener('animationcomplete', () => {
            for (i = 0; i < walker.length; i++) {
                walker[i].setAttribute('visible', true);
                loaded = false;
            }
        })

        this.el.addEventListener('model-loaded', () => {
            // alert("loaded!!");
            if (!loaded) {
                loaded = true;
            }
            if (loaded && first_markerfound) {
                mars.emit("fadein");
            }
        })
    }
});

AFRAME.registerComponent('walker', {
    schema: { index: { default: 0 } },
    init: function () {
        let walker_img = document.querySelectorAll("a-image");
        let img_component = document.querySelectorAll(".img_component");
        let blank = document.querySelector("#blank");
        let component_page = document.querySelector("#component-page");

        this.el.addEventListener('click', () => {
            // alert(`${this.data.index} Click!!`);
            mars.emit("walker-clicked");
            walker_img[this.data.index].emit("clicked");
            component_page.style.display = "block";
            img_component[this.data.index].style.display = "block";
        })

        blank.addEventListener('click', () => {
            mars.emit("blank-clicked");
            component_page.style.display = "none";
            img_component[this.data.index].style.display = "none";

        })
    }
});
