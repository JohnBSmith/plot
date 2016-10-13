
// "use strict";
cpx=1;
gv1id="z";
var gcv1;
var fplot = cabs;
var afunf;
var afung;
var afunh;

var cvtab = {
  "pi": {value: {re: Math.PI, im: 0}},
  "tau": {value: {re: 2*Math.PI, im: 0}},
  "e": {value: {re: Math.E, im: 0}},
  "gc": {value: {re: gc, im: 0}},
  "deg": {value: {re: Math.PI/180, im: 0}},
  "grad": {value: {re: Math.PI/180, im: 0}},
  "i": {value: {re: 0, im: 1}},
  "j": {value: {re: 0, im: 1}}
};

var cftab = {
  "not": cfnot, "abs": ccabs, "re": creal, "im": cimag,
  "arg": arg, "conj": conj, "sgn": csgn,
  "floor": cfloor, "ceil": cceil, "rd": crd,
  "exp": cexp, "sqrt": csqrt,
  "ln": cln, "lg": clg, "log": clog,
  "sin": csin, "cos": ccos, "tan": ctan, "cot": ccot,
  "asin": casin, "acos": cacos, "atan": catan, "acot": cacot,
  "arcsin": casin, "arccos": cacos, "arctan": catan, "arccot": cacot,
  "sinh": csinh, "cosh": ccosh, "tanh": ctanh, "coth": ccoth,
  "asinh": casinh, "acosh": cacosh, "atanh": catanh, "acoth": cacoth,
  "gamma": cgamma, "fac": cfac, "digamma": cdigamma,
  "f": funf, "g": fung, "h": funh,
  "next": next, "rand": pick,
  "sum": csumlist, "prod": cprodlist,
  "zeta": czeta, "B": cbn,
  "erf": cerf, "erfc": cerfc, "Ei": cEi,
  "K": eiK, "E": eiE,
  "G": cBarnesG, "hyperK": chyperK,
  "compose": compose, "rev": rev,
  "size": csize, "isprime": cisprime
};

var cftab2 = {
  "mod": cmod, "diff": cdiff, "root": croot,
  "log": clog, "apply": fapply,
  "cint": ccint, "vint": vint,
  "gamma": cigamma, "Gamma": ciGamma,
  "En": cEn, "zeta": chzeta,
  "theta1": theta1, "theta2": theta2,
  "theta3": theta3, "theta4": theta4,
  "sn": sn, "cn": cn, "dn": dn,
  "range": crange, "table": table,
  "map": map, "filter": cfilter, "reduce": reduce,
  "rand": crand, "get": cfget, "cat": cat,
  "count": ccount, "forall": cforall, "exists": cexists,
  "L": cLaplace, "agm": cagm
};

var cftab3 = {
  "pow": cfpow, "range": cranged,
  "sum": csum, "prod": cprod,
  "int": cint, "if": cfif,
  "diff": cdiffn, "Phi": cLerch,
  "fc": fc
};

var cftab4 = {
};

var cftabn = {
  "list": list, "setw": csetw,
  "sp": cspsys, "grid": csetgridtype,
  "save": save, "vline": cfvline, "hline": cfhline,
  "color": ccolor, "bcolor": cbcolor,
  "ani": animate, "scatter": cscatter, "box": cbox
};

function complex(a,b){
  return {re: a, im: b};
}

function add(a,b){
  var y = {};
  y.re = a.re+b.re;
  y.im = a.im+b.im;
  return y;
}

function sub(a,b){
  var y = {};
  y.re = a.re-b.re;
  y.im = a.im-b.im;
  return y;
}

function mpy(a,b){
  var y = {};
  y.re = a.re*b.re-a.im*b.im;
  y.im = a.re*b.im+b.re*a.im;
  return y;
}

function neg(a){
  return {re: -a.re, im: -a.im};
}

function addr(x,r){
  return {re: x.re+r, im: x.im};
}

function subr(x,r){
  return {re: x.re-r, im: x.im};
}

function rsub(r,x){
  return {re: r-x.re, im: -x.im};
}

function mpyr(x,r){
  return {re: x.re*r, im: x.im*r};
}

function divr(x,r){
  return {re: x.re/r, im: x.im/r};
}

function div(a,b){
  var s = b.re*b.re+b.im*b.im;
  var y = {};
  if(s==0){
    if(a.re!=0 || a.im!=0){
      return {re: Infinity, im: 1};
    }
  }
  y.re = (a.re*b.re+a.im*b.im)/s;
  y.im = (a.im*b.re-a.re*b.im)/s;
  return y;
}

function cfnot(x){
  return sub(complex(1,0),x);
}

function cabs(a){
  return Math.sqrt(a.re*a.re+a.im*a.im);
}

function conj(a){
  return {re: a.re, im: -a.im};
}

function phase(a,r){
  if(r==0) return 0;
  if(a.im==0 && a.re<0) return Math.PI;
  return sgn(a.im)*Math.acos(a.re/r);
}

function arg(a){
  var phi = phase(a,cabs(a));
  return complex(phi,0);
}

function ccabs(x){
  return complex(cabs(x),0);
}

function csgn(x){
  var r = cabs(x);
  if(r==0) return complex(0,0);
  return div(x,complex(r,0));
}

function creal(x){
  return complex(x.re,0);
}

function cimag(x){
  return complex(x.im,0);
}

function cfloor(x){
  return complex(Math.floor(x.re),0);
}

function cceil(x){
  return complex(Math.ceil(x.re),0);
}

function crd(x){
  return complex(Math.round(x.re),0);
}

function cmod(x,m){
  return complex(mod(x.re,m.re),0);
}

function cexp(x){
  var r = Math.exp(x.re);
  var y={};
  y.re = r*Math.cos(x.im);
  y.im = r*Math.sin(x.im);
  return y;
}

function cln(x){
  var r = cabs(x);
  var phi = phase(x,r);
  return {re: Math.log(r), im: phi};
}

function clg(x){
  return div(cln(x),complex(2.302585093,0));
}

function clog(x,b){
  return div(cln(x),cln(b));
}

function csqrt(x){
  var r = cabs(x);
  var phi = phase(x,r);
  var y = {};
  var ry = Math.sqrt(r);
  y.re = ry*Math.cos(phi/2);
  y.im = ry*Math.sin(phi/2);
  return y;
}

function croot(n,x){
  return cpow(x,div(complex(1,0),n));
}

function csin(x){
  var n = mpy(x,{re: 0, im: 1});
  var y = sub(cexp(n),cexp(neg(n)));
  return div(y,{re: 0, im: 2});
  return y;
}

function ccos(x){
  var n = mpy(x,{re: 0, im: 1});
  var y = add(cexp(n),cexp(neg(n)));
  return div(y,{re: 2, im: 0});
}

function ctan(x){
  return div(csin(x),ccos(x));
}

function ccot(x){
  return div(ccos(x),csin(x));
}

function csinh(x){
  return mpyr(sub(cexp(x),cexp(neg(x))),0.5);
}

function ccosh(x){
  return mpyr(add(cexp(x),cexp(neg(x))),0.5);
}

function ctanh(x){
  return div(csinh(x),ccosh(x));
}

function ccoth(x){
  return div(ccosh(x),csinh(x));
}

function casin(x){
  var a = csqrt(sub(complex(1,0),mpy(x,x)));
  var b = add(mpy(complex(0,1),x),a);
  return mpy(complex(0,-1),cln(b));
}

function cacos(x){
  var a = csqrt(sub(complex(1,0),mpy(x,x)));
  var b = add(x,mpy(complex(0,1),a));
  return mpy(complex(0,-1),cln(b));
}

function catan(x){
  var a = mpy(complex(0,1),x);
  var b = sub(cln(sub(complex(1,0),a)),cln(add(complex(1,0),a)));
  return mpy(complex(0,1/2),b);
}

function cacot(x){
  var a = div(complex(0,1),x);
  var b = sub(cln(sub(complex(1,0),a)),cln(add(complex(1,0),a)));
  return mpy(complex(0,1/2),b);
}

function casinh(x){
  var a = csqrt(add(mpy(x,x),complex(1,0)));
  return cln(add(x,a));
}

function cacosh(x){
  var a = csqrt(add(x,complex(1,0)));
  var b = csqrt(sub(x,complex(1,0)));
  return cln(add(x,mpy(a,b)));
}

function catanh(x){
  var a = div(add(complex(1,0),x),sub(complex(1,0),x));
  return mpy(complex(1/2,0),cln(a));
}

function cacoth(x){
  var a = div(add(x,complex(1,0)),sub(x,complex(1,0)));
  return mpy(complex(1/2,0),cln(a));
}

function cpow(x,n){
  if(x.re==0 && x.im==0){
    if(n.re==0 && n.im==0) return complex(1,0);
    return complex(0,0);
  }
  return cexp(mpy(cln(x),n));
}

function cdiff(f,x){
  var h = complex(0.0001,0);
  var a = sub(f(add(x,h)),f(sub(x,h)));
  var b = mpyr(h,2);
  return div(a,b);
}

function cdiff2(f,x){
  var h = complex(0.0001,0);
  var a = sub(add(f(add(x,h)),f(sub(x,h))),mpyr(f(x),2));
  var b = mpy(h,h);
  return div(a,b);
}

function cdiffn(f,x,n){
  var m=Math.round(n.re);
  var h,a,b;
  if(m<=0){
    return f(x);
  }else if(m==1){
    return cdiff(f,x);
  }else if(m==2){
    return cdiff2(f,x);
  }else{
    h=complex(0.1,0);
    a = sub(cdiffn(f,add(x,h),addr(n,-1)),cdiffn(f,sub(x,h),addr(n,-1)));
    b = mpyr(h,2);
    return div(a,b);
  }
}

// Lanczos approximation
function cgammapx(x){
  var p=[0.99999999999980993, 676.5203681218851, -1259.1392167224028,
  771.32342877765313, -176.61502916214059, 12.507343278686905,
  -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  x=addr(x,-1);
  var y={re:p[0], im:0};
  for(var i=1; i<9; i++){
    y=add(y,div({re:p[i], im:0},addr(x,i)));
  }
  var t=addr(x,7.5);
  var a = mpy(cpow(t,addr(x,0.5)),cexp(neg(t)));
  return mpyr(mpy(a,y),Math.sqrt(2*Math.PI));
}

function cgamma(x){
  if(x.re<0.5){
    var a = mpy(csin(mpyr(x,Math.PI)),cgammapx(sub({re:1, im:0},x)));
    return div({re:Math.PI, im:0},a);
  }else{
    return cgammapx(x);
  }
}

function cfac(x){
  return cgamma(add(x,complex(1,0)));
}

function ccfGamma(a,x,n){
  var y=complex(0,0);
  for(var k=n; k>=1; k--){
    y=div(mpyr(sub(complex(k,0),a),k),addr(sub(sub(x,y),a),2*k+1));
  }
  return div(mpy(cexp(neg(x)),cpow(x,a)),addr(sub(sub(x,y),a),1));
}

function cpsgamma(a,x,n){
  var y=complex(0,0);
  var p=div(complex(1,0),a);
  for(var k=1; k<n; k++){
    y=add(y,p);
    p=div(mpy(p,x),addr(a,k));
  }
  return mpy(mpy(y,cexp(neg(x))),cpow(x,a));
}

function ciGamma(a,x){
  if(cabs(x)>cabs(a)+1){
    if(x.re>0 || Math.abs(x.im)>0){
      return ccfGamma(a,x,20);
    }
  }
  if(a.im==0 && a.re<=0 && a.re==Math.round(a.re)){
    a=add(a,complex(0,1E-5));
  }
  return sub(cgamma(a),cpsgamma(a,x,20));
}

function cigamma(a,x){
  if(cabs(x)>cabs(a)+1){
    if(x.re>0 || Math.abs(x.im)>0){
      return sub(cgamma(a),ccfGamma(a,x,20));
    }
  }
  return cpsgamma(a,x,20);
}

function cerf(x){
  var a=complex(0.5,0);
  var b=mpy(x,x);
  var y;
  if(cabs(x)<1.7){
    y=mpyr(cpsgamma(a,b,24),1/Math.sqrt(Math.PI));
  }else if(Math.abs(x.re)<1 && Math.abs(x.im)<4){
    y=mpyr(cpsgamma(a,b,60),1/Math.sqrt(Math.PI));
  }else{
    y=mpyr(sub(cgamma(a),ccfGamma(a,b,24)),1/Math.sqrt(Math.PI));
  }
  if(x.re==0 && x.im<0){
    return neg(y);
  }else if(x.re<0){
    return neg(y);
  }else{
    return y;
  }
}

function cerfc(x){
  return rsub(1,cerf(x));
}

function cEn(n,x){
  return mpy(cpow(x,addr(n,-1)),ciGamma(sub(complex(1,0),n),x));
}

function cEi(x){
  return neg(ciGamma(complex(0,0),neg(x)));
}

function cbn(x){
  return {re: bn(Math.round(x.re)), im: 0};
}

function cdigamma(x){
  return div(cdiff(cgamma,x),cgamma(x));
}

function czetam(s,N){
  var y=complex(1,0);
  var ms = neg(s);
  for(var k=2; k<N; k++){
    y=add(y,cpow(complex(k,0),ms));
  }
  N=complex(N,0);
  var a=mpy(s,mpy(addr(s,1),addr(s,2)));
  var b=mpy(a,mpy(addr(s,3),addr(s,4)));
  var c=mpy(b,mpy(addr(s,5),addr(s,6)));
  y=add(y,div(cpow(N,addr(ms,1)),addr(s,-1)));
  y=add(y,mpyr(cpow(N,ms),0.5));
  y=add(y,divr(mpy(s,cpow(N,addr(ms,-1))),12));
  y=sub(y,mpy(a,divr(cpow(N,addr(ms,-3)),720)));
  y=add(y,mpy(b,divr(cpow(N,addr(ms,-5)),30240)));
  y=sub(y,mpy(c,divr(cpow(N,addr(ms,-7)),1209600)));
  return y;
}

function czeta(s){
  if(s.re>-1){
    return czetam(s,20);
  }else{
    var a = mpy(cpow(complex(2*Math.PI,0),addr(s,-1)),csin(mpyr(s,Math.PI/2)));
    var b = addr(neg(s),1);
    return mpy(mpy(mpyr(a,2),cgamma(b)),czetam(b,20));
  }
}

function cLerch(z,s,x){
  var y={re: 0, im: 0}, p={re: 1, im: 0};
  for(var k=0; k<200; k++){
    y=add(y,div(p,cpow(addr(x,k),s)));
    p=mpy(p,z);
  }
  return y;
}

function chzetam(s,x,N){
  var y={re: 0, im: 0};
  for(var k=0; k<N; k++){
    y = add(y,div({re: 1, im: 0},cpow(addr(x,k),s)));
  }
  var xpN = addr(x,N);
  var s2 = mpy(mpy(s,addr(s,1)),addr(s,2));
  y = add(y,div(cpow(xpN,sub({re: 1, im: 0},s)),addr(s,-1)));
  y = add(y,div({re: 1/2, im: 0},cpow(xpN,s)));
  y = add(y,div(mpyr(s,1/12),cpow(xpN,addr(s,1))));
  y = sub(y,div(mpyr(s2,1/720),cpow(xpN,addr(s,3))));
  return y;
}

function chzeta(s,x){
  return chzetam(s,x,10);
}

function chyperK(x){
  var f = function(s){return chzeta(s,x);};
  return cexp(addr(cdiff(f,{re: -1, im: 0}),0.1654211444));
}

function cBarnesG(x){
  return div(cpow(cgamma(x),addr(x,-1)),chyperK(x));
}

function csum(f,a,b){
  var s=complex(0,0);
  a=a.re; b=b.re;
  for(var k=a; k<=b; k++){
    s=add(s,f(complex(k,0)));
  }
  return s;
}

function cprod(f,a,b){
  var s=complex(1,0);
  a=a.re; b=b.re;
  for(var k=a; k<=b; k++){
    s=mpy(s,f(complex(k,0)));
  }
  return s;
}

function cbc(n,k){
  var a = cgamma(addr(k,1));
  var b = cgamma(addr(sub(n,k),1));
  return div(cgamma(addr(n,1)),mpy(a,b));
}

function ccompose_pow(f,n,x){
  return compose_pow(f,n.re,x);
}

function cfrac_pow(f,n,x){
  var s=complex(0,0), m=10, y=x;
  var a,b;
  if(n.re<0.5 && n.re==Math.round(n.re)){
    n.re+=0.001;
  }
  for(var k=0; k<=m; k++){
    a=bc(m,k)*Math.cos(Math.PI*(m-k));
    b=mpyr(div(sub(n,complex(m,0)),sub(n,complex(k,0))),a);
    s=add(s,mpy(b,y));
    y=f(y);
  }
  return mpy(cbc(n,complex(m,0)),s);
}

function cfpow(f,n,x){
  if(n.im==0 && n.re>=0 && n.re==Math.round(n.re)){
    return compose_pow(f,n.re,x);
  }else{
    return cfrac_pow(f,n,x);
  }
}

function csize(a){
  return complex(a.length,0);
}

function crange(a,b){
  a=a.re; b=b.re;
  var v=[];
  for(var k=a; k<=b; k++){
    v.push(complex(k,0));
  }
  return v;
}

function cranged(a,b,d){
  var v = ranged(a.re,b.re,d.re);
  for(var i=0; i<v.length; i++){
    v[i]=complex(v[i],0);
  }
  return v;
}

function evalv1c(a,x){
  var y,tmp;
  tmp=gcv1; gcv1=x;
  y=evalvc(a);
  gcv1=tmp;
  return y;
}

function funf(x){
  return evalv1c(afunf,x);
}

function fung(x){
  return evalv1c(afung,x);
}

function funh(x){
  return evalv1c(afunh,x);
}

function cintN(f,a,b,N){
  var re = function(t){
    return f(complex(t,0)).re;
  };
  var im = function(t){
    return f(complex(t,0)).im;
  };
  var x,y;
  x=gauss6(re,a.re,b.re,N);
  y=gauss6(im,a.re,b.re,N);
  return complex(x,y);
}

function cint(f,a,b){
  return cintN(f,a,b,10);
}

function ccintN(f,gamma,N){
  var re = function(t){
    t=complex(t,0);
    return mpy(f(gamma(t)),cdiff(gamma,t)).re;
  };
  var im = function(t){
    t=complex(t,0);
    return mpy(f(gamma(t)),cdiff(gamma,t)).im;
  };
  var x,y;
  x=gauss6(re,0,1,N);
  y=gauss6(im,0,1,N);
  // x=gauss(re,0,1,N);
  // y=gauss(im,0,1,N);
  return complex(x,y);
}

function ccint(f,gamma){
  return ccintN(f,gamma,10);
}

var vint_a, vint_d;
function vintN(f,a,N){
  var g = function(t){
    return f(add(vint_a,mpy(vint_d,t)));
  }
  var y=complex(0,0);
  var t0=complex(0,0);
  var t1=complex(1,0);
  for(var k=0; k+1<a.length; k++){
    vint_a=a[k]; vint_d=sub(a[k+1],a[k]);
    y=add(y,mpy(vint_d,cintN(g,t0,t1,N)));
  }
  return y;
}

function vint(f,a){
  return vintN(f,a,10);
}

function cagm(a,b){
  var ah,bh;
  for(var i=0; i<20; i++){
    ah = mpyr(add(a,b),0.5);
    bh = csqrt(mpy(a,b));
    a=ah; b=bh;
    if(cabs(sub(a,b))<1E-15) break;
  }
  return a;
}

// Branch cut Re(z)>0, Im(z)=0
function csqrta(z){
  return z.im>=0? csqrt(z): neg(csqrt(z));
}

// Branch cut Re(z)>0, Im(z)=0
function csqrtb(z){
  return z.im<=0? csqrt(z): neg(csqrt(z));
}

function cmagm(x,y){
  var z={re:0,im:0};
  var xh,yh,zh,r;
  if(y.im<0){
    root = csqrtb;
  }else{
    root = csqrta;
  }
  for(var i=0; i<20; i++){
    xh=mpyr(add(x,y),0.5);
    r=root(mpy(sub(x,z),sub(y,z)));
    yh=add(z,r); zh=sub(z,r);
    x=xh; y=yh; z=zh;
    if(cabs(sub(x,y))<2E-15) break;
  }
  return x;
}

function eiK(m){
  return div({re:0.5*Math.PI,im:0},cagm({re:1,im:0},csqrt(rsub(1,m))));
}

function eiE(m){
  var a={re:1,im:0}
  var b=rsub(1,m);
  var M=cagm(a,csqrt(b));
  var N=cmagm(a,b);
  return div(mpyr(N,0.5*Math.PI),M);
}

function theta1(z,q){
  var k,a;
  var y=complex(0,0);
  for(k=0; k<10; k++){
    a = mpy(cpow(q,{re: Math.pow(k+0.5,2), im: 0}),csin(mpyr(z,2*k+1)));
    y = add(y,mpyr(a,Math.cos(Math.PI*k)));
  }
  return mpyr(y,2);
}

function theta2(z,q){
  var k,a;
  var y=complex(0,0);
  for(k=0; k<10; k++){
    a = mpy(cpow(q,{re: Math.pow(k+0.5,2), im: 0}),ccos(mpyr(z,2*k+1)));
    y = add(y,a);
  }
  return mpyr(y,2);
}

function theta3(z,q){
  var k,a;
  var y=complex(0,0);
  for(k=1; k<10; k++){
    a = mpy(cpow(q,{re: k*k, im: 0}),ccos(mpyr(z,2*k)));
    y = add(y,a);
  }
  return addr(mpyr(y,2),1);
}

function theta4(z,q){
  var k,a;
  var y=complex(0,0);
  for(k=1; k<10; k++){
    a = mpy(cpow(q,{re: k*k, im: 0}),ccos(mpyr(z,2*k)));
    y = add(y,mpyr(a,Math.cos(Math.PI*k)));
  }
  return addr(mpyr(y,2),1);
}

function sn(z,k){
  var k1,K,K1,q,w;
  k=k.re;
  k1=Math.sqrt(1-k*k);
  K=eiK(k);
  K1=eiK(k1);
  q={re: Math.exp(-Math.PI*K1/K), im: 0};
  w=div(mpyr(z,Math.PI),{re: 2*K, im: 0});
  return mpyr(div(theta1(w,q),theta4(w,q)),1/Math.sqrt(k));
}

function cn(z,k){
  var k1,K,K1,q,w;
  k=k.re;
  k1=Math.sqrt(1-k*k);
  K=eiK(k);
  K1=eiK(k1);
  q={re: Math.exp(-Math.PI*K1/K), im: 0};
  w=div(mpyr(z,Math.PI),{re: 2*K, im: 0});
  return mpyr(div(theta2(w,q),theta4(w,q)),Math.sqrt(k1/k));
}

function dn(z,k){
  var k1,K,K1,q,w;
  k=k.re;
  k1=Math.sqrt(1-k*k);
  K=eiK(k);
  K1=eiK(k1);
  q={re: Math.exp(-Math.PI*K1/K), im: 0};
  w=div(mpyr(z,Math.PI),{re: 2*K, im: 0});
  return mpyr(div(theta3(w,q),theta4(w,q)),Math.sqrt(k1));
}

function chyperK(x){
  var f = function(s){return chzeta(s,x);};
  return cexp(sub(cdiff(f,{re: -1, im: 0}),{re: -0.1654211444, im: 0}));
}

function BarnesG(x){
  return div(cpow(cgamma(x),addr(x,-1)),chyperK(x));
}

function cLaplace(f,x){
  var g = function(t){return mpy(f(t),cexp(neg(mpy(x,t))));};
  return vint(g,[complex(0,0),complex(40,0)]);
}

function cfif(c,a,b){
  if(c.re!=0) return a;
  return b;
}

function cfilter(f,a){
  var i;
  var b=[];
  for(i=0; i<a.length; i++){
    if(Math.round(f(a[i]).re)>0){
      b.push(a[i]);
    }
  }
  return b;
}

function crand(a,b){
  return complex(rand(a.re,b.re),0);
}

function ccount(f,a){
  var k=0;
  for(var i=0; i<a.length; i++){
    if(f(a[i]).re>=0.5) k++;
  }
  return complex(k,0);
}

function cforall(f,a){
  for(var i=0; i<a.length; i++){
    if(f(a[i]).re<0.5) return complex(0,0);
  }
  return complex(1,0);
}

function cexists(f,a){
  for(var i=0; i<a.length; i++){
    if(f(a[i]).re>=0.5) return complex(1,0);
  }
  return complex(0,0);
}

function csumlist(a){
  var s=complex(0,0);
  for(var i=0; i<a.length; i++){
    s=add(s,a[i]);
  }
  return s;
}

function cprodlist(a){
  var p=complex(1,0);
  for(var i=0; i<a.length; i++){
    p=mpy(p,a[i]);
  }
  return p;
}

function cfget(a,i){
  return fget(a,i.re);
}

function cisprime(x){
  return complex(isprime(x.re),0);
}

function fc(f,i,j){
  var pi=Math.PI;
  var a=[];
  var y;
  i=i.re; j=j.re;
  for(var k=i; k<=j; k++){
    y=cintN(function(t){
      return mpy(f(t),cexp({re:0,im:-k*t.re}));
    },{re:-pi,im:0},{re:pi,im:0},4);
    a.push(mpyr(y,1/(2*pi)));
  }
  return a;
}

function ccolor(stack,argc){
  if(argc!=3){
    error("Error: color(r,g,b) takes exactly three arguments.");
  }
  vcb=color256(stack.pop().re);
  vcg=color256(stack.pop().re);
  vcr=color256(stack.pop().re);
}

function cbcolor(stack,argc){
  if(argc!=3){
    error("Error: bcolor(r,g,b) takes exactly three arguments.");
  }
  bcb=color256(stack.pop().re);
  bcg=color256(stack.pop().re);
  bcr=color256(stack.pop().re);
}

function csetw(stack,argc){
  var n = stack.length;
  stack[n-1]=stack[n-1].re;
  if(argc==2){
    stack[n-2]=stack[n-2].re;
  }
  setw(stack,argc);
}

function cspsys(stack,argc){
  psy=Math.round(stack.pop().re);
  psx=Math.round(stack.pop().re);
}

function csetgridtype(stack,argc){
  gridtype = Math.round(stack.pop().re);
}

function cfvline(stack,argc){
  var x,px;
  for(var k=0; k<argc; k++){
    x = stack.pop().re;
    px = getpx(x,1/wx);
    vlinea(data,px,200);
    vlinea(data,px+1,200);
  }
}

function cfhline(stack,argc){
  var y,py;
  for(var k=0; k<argc; k++){
    y = stack.pop().re;
    py = getpy(y,1/wy);
    hlinea(data,py,200);
    hlinea(data,py+1,200);
  }
}

function cscatter(stack,argc){
  var i,j,t;
  for(i=0; i<argc; i++){
    t=stack.pop();
    if(Array.isArray(t[0])){
      for(j=0; j<t.length; j++){
        scatter_list.push([t[j][0].re,t[j][1].re]);
      }
    }else{
      scatter_list.push([t[0].re,t[1].re]);
    }
  }
}

function cbox(stack,argc){
  var i,j,t;
  for(i=0; i<argc; i++){
    t=stack.pop();
    if(Array.isArray(t[0])){
      for(j=0; j<t.length; j++){
        box_list.push([t[j][0].re,t[j][1].re]);
      }
    }else{
      box_list.push([t[0].re,t[1].re]);
    }
  }
}

function calc_cop(stack,t){
  var x,y;
  var c=t.s;
  if(c==ADD){
    y = stack.pop();
    x = stack.pop();
    stack.push(add(x,y));
  }else if(c==SUB){
    y = stack.pop();
    x = stack.pop();
    stack.push(sub(x,y));
  }else if(c==MPY){
    y = stack.pop();
    x = stack.pop();
    stack.push(mpy(x,y));
  }else if(c==DIV){
    y = stack.pop();
    x = stack.pop();
    stack.push(div(x,y));
  }else if(c==NEG){
    x = stack.pop();
    stack.push({re: -x.re, im: -x.im});
  }else if(c==POW){
    y = stack.pop();
    x = stack.pop();
    stack.push(cpow(x,y));
  }else if(c==MOD){
    y = stack.pop();
    x = stack.pop();
    stack.push(cmod(x,y));
  }else if(c==LT){
    y = stack.pop();
    x = stack.pop();
    stack.push(complex(x.re<y.re?1:0,0));
  }else if(c==GT){
    y = stack.pop();
    x = stack.pop();
    stack.push(complex(x.re>y.re?1:0,0));
  }else if(c==LE){
    y = stack.pop();
    x = stack.pop();
    stack.push(complex(x.re<=y.re?1:0,0));
  }else if(c==GE){
    y = stack.pop();
    x = stack.pop();
    stack.push(complex(x.re>=y.re?1:0,0));
  }else if(c==EQ){
    y = stack.pop();
    x = stack.pop();
    stack.push(complex(cabs(sub(x,y))<eqepsilon?1:0,0));
  }else if(c==NE){
    y = stack.pop();
    x = stack.pop();
    stack.push(complex(cabs(sub(x,y))>=eqepsilon?1:0,0));
  }else if(c==AND){
    y = stack.pop();
    x = stack.pop();
    stack.push(complex(Math.min(x.re,y.re),0));
  }else if(c==OR){
    y = stack.pop();
    x = stack.pop();
    stack.push(complex(Math.max(x.re,y.re),0));
  }else if(c==DEF){
    x = stack.pop();
    cvtab[t.id].value=x;
  }else if(c==APP){
    y = stack.pop();
    x = stack.pop();
    stack.push(x(y));
  }else if(c==RANGE){
    y = stack.pop();
    x = stack.pop();
    stack.push(crange(x,y));
  }
}

function evalvc(a){
  var i,t,stack,type;
  var x,y,z,n;
  stack = [];
  n = a.length;
  for(i=0; i<n; i++){
    t=a[i];
    type=t.type;
    if(type==Tnumber){
      stack.push({re: t.s, im: 0});
    }else if(type==Tid){
      if(t.s==1) stack.push(gcv1);
      else if(t.s==2) stack.push(gcv2);
      else stack.push(0);
    }else if(type==Top){
      calc_cop(stack,t);
    }else if(type==Tfun){
      if(t.c){
        stack.push(construct_closure(t,evalvc));
      }else{
        stack.push(t.s);
      }
    }else if(type==Tfapp){
      if(t.argc==1){
        x = stack.pop();
        stack.push(t.s(x));
      }else if(t.argc==2){
        y = stack.pop();
        x = stack.pop();
        stack.push(t.s(x,y));
      }else if(t.argc==3){
        z = stack.pop();
        y = stack.pop();
        x = stack.pop();
        stack.push(t.s(x,y,z));
      }else{
        error("Error: cannot evaluate functions with "+t.argc+" arguments.");
      }
    }else if(type==Tnfapp){
      t.s(stack,t.argc);
    }else if(type==Targ){
      stack.push(t.s.value);
    }else if(type==Tvapp){
      if(t.argc==1){
        x = stack.pop();
        stack.push(t.s.value(x));
      }else{
        t.s.value(stack,t.argc);
      }
    }else if(type==Tif){
      if(t.s==THEN){
        x = stack.pop();
        if(x.re<0.5) i=t.a-1;
      }else if(t.s==ELSE){
        i=t.a-1;
      }
    }else{
      error("Unknown token type: type number "+t.type);
    }
  }
  if(stack.length>1){
    error("Error: too few operators.");
  }
  return stack.pop();
}

function evalsc(s){
  var a = compile(s);
  return evalvc(a);
}

function sigmoid(x){
  if(x==Infinity) return 1;
  return x/Math.sqrt(x*x+1);
}

function light(x,m,h){
  return (sigmoid(Math.abs(x)*h)+1)/2*sigmoid(Math.abs(x)/m);
}

function cplot(){
  var x,y,px,py,h,z,w,m,h1;
  var shiftx,shifty;
  var a,s,dwq,dhq;
  var r,g,b,color;
  var H,L,phi,rw;
  x1=0; y1=0;

  pma = getnum("inputa");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputwx");
  wy = getnum("inputwy");
  h1 = getnum("inputh");
  m = getnum("inputm");
  getgridtype();
  getgridpos();

  shiftx=0.1*wx;
  shifty=0.1*wy;

  init();
  s = gets("inputf");
  a = compile(s);
  afunf = a;
  vcr=0; vcg=0; vcb=0x80;
  dwq=dw/4; dhq=dh/4;
  var psxh=psx/2, psyh=psy/2;
  for(px=0; px<dwh; px++){
    for(py=0; py<dhh; py++){
      x = x1+(px-psxh)*wx/180;
      y = y1-(py-psyh)*wy/180;
      z = {re: x, im: y};
      gcv1=z;
      w = evalvc(a);

      if(w.re==Infinity || w.im==Infinity || isNaN(w.re)){
        color = {r: 1, g: 1, b: 1};
      }else{
        rw = cabs(w);
        phi = phase(w,rw);
        if(phi<0) phi+=2*Math.PI;
        color = get_rgb(phi,1,light(rw/4,m,0.1*h1));
      }
      vcr = Math.floor(color.r*255);
      vcg = Math.floor(color.g*255);
      vcb = Math.floor(color.b*255);
      pset4(data,2*px,2*py,220);
    }
  }
  system();
  context.putImageData(img,0,0);
  axisx(context,x1,shiftx);
  axisy(context,y1,shifty);
}

function real(x){
  return x.re;
}

function imag(x){
  return x.im;
}

var zbuffer={};
function set_point(data,w,x,y,c,s,m,wxy){
  var xt,yt,xp,yp,px,py;
  var r,g,b,color;
  var H,L,phi,rw;
  xt = c*x-s*y;
  yt = s*x+c*y;
  xp = -xt+yt;
  yp = fplot(w)/wxy-xt/2-yt/2;
  px = getpx(xp*m,0.1);
  py = getpy(yp*m,0.1);

  if(w.re==Infinity || w.im==Infinity || isNaN(w.re)){
    color = {r: 1, g: 1, b: 1};
  }else{
    rw = cabs(w);
    phi = phase(w,rw);
    if(phi<0) phi+=2*Math.PI;
    color = get_rgb(phi,1,0.3);
  }
  vcr = Math.floor(color.r*255);
  vcg = Math.floor(color.g*255);
  vcb = Math.floor(color.b*255);
  if(!(yt<zbuffer[[px,py]])){
    pset4(data,px,py,220);
    zbuffer[[px,py]]=yt;
  }
}

function cplot3d(){
  var x,y,z,w,m,h;
  var x1,y1,wxy;
  var mx,my,nx,ny;
  var phi,c,s;
  var i,d,shift;
  var a,input;

  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wxy = getnum("inputw")/10;
  m = getnum("inputm");
  phi = -(getnum("inputphi")-90)*Math.PI/180;
  c = Math.cos(phi);
  s = Math.sin(phi);
  mx = getnum("inputmx");
  my = getnum("inputmy");
  nx = getnum("inputnx");
  ny = getnum("inputny");

  init();
  zbuffer={};
  input = gets("inputf");
  a = compile(input);
  afunf = a;
  shift = 20/ny;
  d = 20/my;
  y=-10;
  for(i=0; i<=my; i++){
    for(x=-10; x<10; x+=shift){
      z = {re: wxy*x+x1, im: wxy*y+y1};
      gcv1=z;
      w = evalvc(a);
      set_point(data,w,x/2,y/2,c,s,m,wxy);
    }
    y+=d;
  }
  shift = 20/nx;
  d = 20/mx;
  x=-10;
  for(i=0; i<=mx; i++){
    for(y=-10; y<10; y+=shift){
      z = {re: wxy*x+x1, im: wxy*y+y1};
      gcv1=z;
      w = evalvc(a);
      set_point(data,w,x/2,y/2,c,s,m,wxy);
    }
    x+=d;
  }
  context.putImageData(img,0,0);
}

function cplotimg(){
  var x,y,z,w,m,h;
  var x1,y1,wxy;
  var mx,my,nx,ny;
  var phi;
  var i,d,shift;
  var a,s;
  var px,py;

  pma = getnum("inputa");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wxy = getnum("inputw")/10;
  m = getnum("inputm");
  mx = getnum("inputmx");
  my = getnum("inputmy");
  nx = getnum("inputnx");
  ny = getnum("inputny");

  init();
  s = gets("inputf");
  a = compile(s);
  afunf = a;
  shift = 20/nx;
  d = 20/mx;
  x=-10;
  vcr=cr3; vcg=cg3; vcb=cb3;
  for(i=0; i<=mx; i++){
    for(y=-10; y<10; y+=shift){
      z = {re: wxy*x+x1, im: wxy*y+y1};
      gcv1=z;
      w = evalvc(a);
      px = getpx(w.re*m,0.1);
      py = getpy(w.im*m,0.1);
      pset4(data,px,py,220);
    }
    x+=d;
  }
  shift = 20/ny;
  d = 20/my;
  y=-10;
  vcr=cr1; vcg=cg1; vcb=cb1;
  for(i=0; i<=my; i++){
    for(x=-10; x<10; x+=shift){
      z = {re: wxy*x+x1, im: wxy*y+y1};
      gcv1=z;
      w = evalvc(a);
      px = getpx(w.re*m,0.1);
      py = getpy(w.im*m,0.1);
      pset4(data,px,py,220);
    }
    y+=d;
  }
  context.putImageData(img,0,0);
}

function cfplot(){
  var x,y,px,py;
  var x0,x2,dx;
  var shiftx,shifty;
  var a,n,s;
  x1=0; y1=0;
  x2=10;
  pma = getnum("inputa");
  pmb = getnum("inputb");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputwx");
  wy = getnum("inputwy");
  n = getnum("inputn");
  getgridtype();
  getgridpos();  

  x0 = x1+getx(0,1/wx);
  x2 = x1+getx(dw,1/wx);
  if(x2<x0){
    var tmp=x0;
    x0=x2; x2=tmp;
  }
  dx=Math.abs(wx)/n;
  shiftx=0.1*wx;
  shifty=0.1*wy;

  init();
  system();

  s = gets("inputf");
  if(s.length>0){
    a = compile(s);
    afunf=a;
    vcr=cr1; vcg=cg1; vcb=cb1;
    if(s[0]!='#'){
      for(x=x0; x<x2; x+=dx){
        gcv1=complex(x,0);
        y=evalvc(a).re;
        spoint(x,y);
      }
    }
    flush();
  }

  s = gets("inputg");
  if(s.length>0){
    a = compile(s);
    afung=a;
    vcr=cr2; vcg=cg2; vcb=cb2;
    if(s[0]!='#'){
      for(x=x0; x<x2; x+=dx){
        gcv1=complex(x,0);
        y=evalvc(a).re;
        spoint(x,y);
      }
    }
    flush();
  }

  s = gets("inputh");
  if(s.length>0){
    a = compile(s);
    afunh=a;
    vcr=cr3; vcg=cg3; vcb=cb3;
    if(s[0]!='#'){
      for(x=x0; x<x2; x+=dx){
        gcv1=complex(x,0);
        y=evalvc(a).re;
        spoint(x,y);
      }
    }
    flush();
  }

  context.putImageData(img,0,0);
  axisx(context,x1,shiftx);
  axisy(context,y1,shifty);
}

function cpplot(){
  var x,y,px,py,w;
  var shiftx,shifty;
  var s,af;
  var t,t1,t2,n,dt;
  x1=0; y1=0;

  pma = getnum("inputa");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputwx");
  wy = getnum("inputwy");
  t1 = getnum("inputt1");
  t2 = getnum("inputt2");
  n = getnum("inputn");
  getgridtype();
  getgridpos();

  dt=(t2-t1)/n;
  shiftx=0.1*wx;
  shifty=0.1*wy;

  init();
  system();

  s = gets("inputf");
  if(s.length>0){
    define("f",s);
    af=gva;
    vcr=cr1; vcg=cg1; vcb=cb1;
    for(t=t1; t<t2; t+=dt){
      gcv1=complex(t,0);
      w=evalvc(af);
      spoint(w.re,w.im);
    }
    flush();
  }

  context.putImageData(img,0,0);
  axisx(context,x1,shiftx);
  axisy(context,y1,shifty);
}

function interpolate_color(x){
  var r1,g1,b1,r2,g2,b2;
  var r,g,b;
  r1=0.9; g1=0.8; b1=0.4;
  r2=0; g2=0; b2=0.4;
  r = x*r1+(1-x)*r2;
  g = x*g1+(1-x)*g2;
  b = x*b1+(1-x)*b2;
  vcr = Math.floor(r*255);
  vcg = Math.floor(g*255);
  vcb = Math.floor(b*255);
}

function fractal_color(r){
  if(r>1){
    interpolate_color(2-r);
  }else{
    interpolate_color(r);
  }
}

var plot_hd=0;

function fractalplot(){
  var s,z,c,a,az0,r;
  var x,y,n;
  var px,py;
  c = {value: complex(0,0)};
  cvtab.c=c;
  pma = getnum("inputa");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputw");
  wy = wx;
  r = getnum("inputr");
  n = getnum("inputn");
  s = gets("inputf");
  a = compile(s);
  afunf = a;
  az0 = compile(gets("inputz0"));

  bcr=0, bcg=0, bcb=0;
  getgridtype();
  getgridpos();
  init();

  var fpset,m,pw,ph;
  var pwh,psxh,psyh;
  if(plot_hd==1){
    plot_hd=0;
    fpset=pset;
    m=1; pw=dw; ph=dh;
    psxh=psx; psyh=psy;
    pwh=360;
  }else{
    fpset=pset4;
    m=2; pw=dwh; ph=dhh;
    psxh=psx/2; psyh=psy/2;
    pwh=180;
  }

  for(px=0; px<pw; px++){
    for(py=0; py<ph; py++){
      x = x1+(px-psxh)*wx/pwh;
      y = y1-(py-psyh)*wy/pwh;
      c.value = {re: x, im: y};
      z=evalvc(az0);
      vcr=0; vcg=0; vcb=0;
      fpset(data,m*px,m*py,255);
      for(var i=0; i<n; i++){
        gcv1=z;
        z = evalvc(a);
        if(cabs(z)>r){
          fractal_color(i%40/20);
          fpset(data,m*px,m*py,255);
          break;
        }
      }
    }
  }
  system();
  context.putImageData(img,0,0);
  axisx(context,x1,0.1*wx);
  axisy(context,y1,0.1*wy);
}

function fractalplot_hd(){
  plot_hd=1;
  fractalplot();
}

function clickc(event){
  var canvas = document.getElementById("canvas1");
  var px,py,w;
  px = event.pageX - canvas.offsetLeft - 2,
  py = event.pageY - canvas.offsetTop - 2;
  eventx = getx(px,1/wx)+x1;
  eventy = gety(py,1/wy)+y1;
  pmx = eventx;
  pmy = eventy;
  var xy = document.getElementById("xy");
  w = cftab.f(complex(eventx,eventy));
  xy.innerHTML = 'z=(' + ftos(eventx,4) + '|' + ftos(eventy,4)
  + '), f(z)=(' + ftos(w.re,4) + '|' + ftos(w.im,4) + ')';
}
click=clickc;

function calc(){
  var input = document.getElementById("inputc");
  var ans = document.getElementById("ans");
  if(unspace(input.value)==""){
    ans.innerHTML = "ans = ";
  }else{
    var a = compile(input.value);
    var y = evalvc(a);
    if(y!=null){
      if(Array.isArray(y)){
        ans.innerHTML = ["ans =<br>[",tabtos(y),"]"].join("");
      }else{
        ans.innerHTML = "ans = "+str(y);
        cvtab["ans"]={value: y};
      }
    }else{
      ans.innerHTML = "ans = ";
    }
  }
}
