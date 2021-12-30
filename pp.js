let p = [], q = [];
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

function render() {
    // for (let i = 0; i < q.length; i++) console.log(q[i].x, q[i].y);
    background(0);
    beginShape();
    for (let i = -width/2; i < width; i++) {
        vertex(i, f(i));
    } endShape();

    fill(255);
    for (let i = 0; i < p.length; i++) {
        ellipse(p[i].x, p[i].y, 5);
    } noFill();
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
    createCanvas(500, 500);
    translate(width/2, height/2);
    stroke(255);
    noFill();
    background(0);
    frameRate(10);
}

function trm() {
    for (let i = 0; i < p.length; i++) {
        for (let j = i+1; j < p.length; j++) if (p[j].x == p[i].x) {p.splice(j, 1);}
    }
}

function mousePressed() {
    if (p.length == 8) return;
    p.push(new Point(mouseX, mouseY));
    trm();
    background(0);
    update();
    render();

}

function keyPressed() {
    if (key == 'x' && p && p.length > 1) {
        p.pop();
        update();
        render();
    } else if (key == 'x') {
        p = [];
        q = [];
        render();
    }
}
function draw() {}
