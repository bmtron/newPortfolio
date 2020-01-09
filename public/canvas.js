Pts.namespace(window);

var space = new CanvasSpace("#hello");
space.setup({bgcolor: "#0D0B14"});
let form = space.getForm();

let pts = new Group();

space.add({
    start: (bound) => {
        
        pts = Create.distributeRandom(space.innerBound, 150);
        
    },
    animate: (time, ftime) => {

        pts.rotate2D(0.0002, space.center);
        pts.sort( (a,b) => 
            a.$subtract(space.pointer).magnitudeSq() - b.$subtract(space.pointer).magnitudeSq()
        );
        pts.forEach( (p, i) => {
            let ratio = Math.min( 1, 1 - (space.pointer).$subtract(p).magnitude()/(space.size.x / 8) );

           
            let c = Circle.fromCenter(p, 1);
            let c2 = Circle.fromCenter(p, 4);
            if (ratio > .7) {
                form.stroke(`rgba(255,255,255, ${1 - ratio})`).line( [p, pts[i + 1]]);
                form.stroke(`rgba(255,255,255, ${1 - ratio})`).line( [pts[i + 1], pts[i + 2]]);
                form.stroke(`rgba(255,255,255, ${1 - ratio})`).line( [pts[i+2], pts[i + 3]]);

            }
            form.fillOnly(`rgba(255,255,255,${1 + ratio})`, ratio * 2).circle(c);
            form.fill(`rgba(255,255,255,${ratio})`).circle(c2);
            //form.stroke("rgba(255,255,255, .2").line([c])
        })
        
    }
})
space.bindTouch().bindMouse().play();

window.onresize = space.bindTouch().bindMouse().play();