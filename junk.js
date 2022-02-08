let p = [], q = [], dx,dy;
function Point(x, y) {
    this.x = x;
    this.y = y;

    this.add = function(a) {return new Point(this.x+a.x, this.y+a.y);}
    this.sub = function(a) {return new Point(this.x-a.x, this.y-a.y);}
    this.mul = function(a) {return new Point(this.x * a, this.y * a);}
    this.dev = function(a) {return new Point(this.x / a, this.y / a);}

    this.len = function() {
        return sqrt(this.x**2 + this.y**2);
    }

    this.norm = function(n) {
        let l = this.len();
        return new Point(this.x/l*n, this.y/l*n);
    }
}

function Matrix(ar, n = -1, m = -1) {
    this.v = [];
    if (n == -1) {
        this.v = ar;
    } else {
        for (let i = 0; i < n; i++) {
            let pp = [];
            for (let j = 0; j < m; j++) pp.push(ar[i][j]);
            this.v.push(pp);
        }
    }
}

function det(M) {
    const v = M.v;
    let n = v.length;
    let m = v[0].length;

    if (m != n) return 0;
    if (v.length == 1) {
        return v[0][0];
    } else {
        let ans = 0, ng = 1;
        for (let k = 0; k < m; k++) {
            let cnt = [];
            for (let i = 1; i < n; i++) {
                let tmp = [];
                for (let j = 0; j < m; j++) {
                    if (j != k) tmp.push(v[i][j]);
                } cnt.push(tmp);
            }

            ans += v[0][k]*ng*det(new Matrix(cnt));
            ng *= -1;
        }

        return ans;
    }
}

function f(x) {
    let ans = 0;
    for (let i = 0; i < q.length; i++) {
        ans += Math.pow(x, q[i].y)*q[i].x;
    } return ans;
}

function bg() {
    background(255);
    let res = width/10;
    stroke(200);
    for (let i = 0; i <= res; i++) {
        line(res*i, 0, res*i, height);
        line(0, res*i, width, res*i);
    } stroke(0);
    line(0, height/2, width, height/2)
    line(width/2, 0, width/2, height);

    stroke('red');
}

function render() {
    // for (let i = 0; i < q.length; i++) console.log(q[i].x, q[i].y);
    bg();

    if (p && p.length > 1) {
        beginShape();
        for (let i = -width/2; i < width; i++) {
            vertex(i, f(i));
        } endShape();
    }

    fill('red');
    for (let i = 0; i < p.length; i++) {
        ellipse(p[i].x, p[i].y, 5);
    } noFill();
}

function trm() {
    for (let i = 0; i < p.length; i++) {
        for (let j = i+1; j < p.length; j++) if (p[j].x == p[i].x) {p.splice(j, 1);}
    }
}

function update() {
    let v = [];
    for (let i = 0; i < p.length; i++) {
        let x = p[i].x;
        let y = p[i].y;
        let tmp = [];
        for (let j = p.length; j--;) {
            tmp.push(Math.pow(x, j));
        } tmp.push(y);
        v.push(tmp);
    }

    let n = p.length;
    let pp = det(new Matrix(v, n, n));

    q = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < v.length; j++) {
            let tmp = v[j][i];
            v[j][i] = v[j][n];
            v[j][n] = tmp;
        }

        let m = new Matrix(v, n, n);
        q.push(new Point(det(m)/pp, n-i-1));
        for (let j = 0; j < v.length; j++) {
            let tmp = v[j][i];
            v[j][i] = v[j][n];
            v[j][n] = tmp;
        }
    }
}

function setup() {
    cnv = createCanvas(500, 500);
    let canv = document.getElementById(cnv.id());
    canv.style.left = window.innerWidth/2 - width/2 + "px";
    dx = window.innerWidth/2 - width/2;
    canv.style.top = window.innerHeight/2 - height/2 + "px";
    dx = window.innerHeight/2 - height/2;
    // canv.style.position = "absolute";

    document.getElementById("dv").style.height = window.innerHeight-100+"px";
    document.getElementById("dv").style.width = window.innerWidth+"px";
    stroke(0);
    noFill();
    bg();
    frameRate(10);
    translate(width/2, height/2);
}

function mousePressed() {
    if (mouseX < 0 || mouseY < 0 || mouseX  > width || mouseY > height) return;
    if (p.length == 8) return;
    let kra = true;
    for (let i = 0; i < p.length; i++) if (dist(p[i].x, p[i].y, mouseX, mouseY) <= 5) kra = false;
    if (kra) p.push(new Point(mouseX, mouseY));
    trm();
    bg();
    update();
    render();
}

function popo() {
    if (p && p.length > 1) {
        p.pop();
        update();
        render();
    } else {
        p = [];
        q = [];
        render();
    }
}

function keyPressed() {
    if (key == 'x') {
        popo();
    }
}
function draw() {}
