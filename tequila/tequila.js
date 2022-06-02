
// set --vh as window inner height
document.documentElement.style.setProperty(
    '--vh',
    window.innerHeight * 0.01 + 'px'
)


AFRAME.registerComponent('tequila-model', {
    schema: {
        index: { type: 'int', default: 0 },
        origin_x: { type: 'number', default: 0 },
        origin_z: { type: 'number', default: 0 },
    },

    init: function () {
        var data = this.data;
        this.el.addEventListener('grab-end', function (evt) {
            let yy = Object.entries(evt.target.getAttribute('position'))[1]

            if (yy[1] > 0) {
                yy[1] = 0;
                let img_component = document.querySelectorAll(".img_component");
                let component_page = document.querySelector("#component-page");
                component_page.style.display = "block";
                img_component[data.index].style.display = "block";
            }
            else if (yy[1] < -0.4) {
                yy[1] = -0.4;
            }
            evt.target.setAttribute('position', { x: data.origin_x, y: yy[1], z: data.origin_z });
        })

        // this.el.addEventListener('componentchanged', function (evt) {
        //     if (evt.detail.name === "position") {
        //         let xx = Object.entries(evt.target.getAttribute('position'))[0]
        //         let yy = Object.entries(evt.target.getAttribute('position'))[1]
        //         let zz = Object.entries(evt.target.getAttribute('position'))[2]
        //         if ((xx[1] != data.origin_x) || (zz[1] != data.origin_z)) {
        //             if (yy[1] >= 0) {
        //                 yy[1] = 0;
        //                 evt.target.setAttribute('position', { x: data.origin_x, y: yy[1], z: data.origin_z });

        //                 let img_component = document.querySelectorAll(".img_component");
        //                 let component_page = document.querySelector("#component-page");
        //                 component_page.style.display = "block";
        //                 img_component[data.index].style.display = "block";
        //             }
        //         }
        //     }
        // })
    }
});

AFRAME.registerComponent('lastmodel', {
    init: function () {

        this.el.addEventListener('model-loaded', () => {


            // alert("loaded!!");
            document.querySelector("a-scene").setAttribute('visible', true);

            document.querySelector("#whitebg").style.display = "none";
            document.querySelector(".lds-roller").style.display = "none";
        })


    }
});

window.onload = function () {
    const video = document.querySelector('video');
    const constraints = {
        video: {
            facingMode: { exact: "environment" }
        }
    };

    navigator.mediaDevices.getUserMedia(constraints).
        then((stream) => { video.srcObject = stream });

    let img_component = document.querySelectorAll(".img_component");
    let blank = document.querySelector("#blank");
    let component_page = document.querySelector("#component-page");

    blank.addEventListener('click', () => {
        component_page.style.display = "none";
        for (i = 0; i < img_component.length; i++) {
            img_component[i].style.display = "none";
        }
    })
}
