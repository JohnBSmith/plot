
// Function grapher suite
// By John Smith, 2014
// License: CC0

// "use strict";
// background color
var bcr=0xff, bcg=0xff, bcb=0xff;

// line color 1
var cr1=0, cg1=0, cb1=0x80;

// line color 2
var cr2=0, cg2=0x60, cb2=0;

// line color 3
var cr3=0x80, cg3=0, cb3=0x80;

// font of the scale
var font = "12px \"FreeMono\", \"Courier New\", monospace";

var dw=720, dwh=dw/2;
var dh=480, dhh=dh/2;
var psx=dwh;
var psy=dhh;

var
Tnumber=0,
Tid=1,
Tfid=2,
Top=3,
Tbr=4,
Tsep=5,
Tfun=6,
Targ=8,
Tfapp=9,
Tvapp=10,
Tnfapp=11,
Tif=12,
Tstring=13;

var
ADD=0, SUB=1, MPY=2, DIV=3,
GT=4, LT=5, GE=6, LE=7,
POW=10, NEG=11, AND=12, OR=13,
EQ=20, NE=21, DEF=22, APP=24, MOD=26,
THEN=30, ELSE=31, RANGE=32, RANGED=33, DOT=34;

var canvas,context;
var img,data;
var vcr=0,vcg=0,vcb=0;
var cpx=0;
var pma=0, pmb=0;
var pmx=0, pmy=0;
var gv1,gv2,gv3;
var gv1id="x";
var gv2id="y";
var gv3id="z";
var wx,wy,x1,y1;
var eqepsilon=0.01;
var precision=10;
var shortmode=0;
var gc=0.57721566490153286;
var animation=false;
var plot=fplot;

var recid;
var recfn;

var vtab={
  "pi": {value: Math.PI},
  "tau": {value: 2*Math.PI},
  "e": {value: Math.E},
  "gc": {value: gc},
  "deg": {value: Math.PI/180},
  "grad": {value: Math.PI/180}
};

var ftab = {
  "not": fnot, "abs": Math.abs, "sgn": sgn, "frac": frac,
  "floor": Math.floor, "ceil": Math.ceil, "rd": Math.round,
  "exp": Math.exp, "sqrt": Math.sqrt,
  "ln": Math.log, "lg": lg, "ld": ld,
  "sin": Math.sin, "cos": Math.cos, "tan": Math.tan, "cot": cot,
  "sec": sec, "csc": csc, "sinc": sinc,
  "sinh": sinh, "cosh": cosh, "tanh": tanh, "coth": coth,
  "sech": sech, "csch": csch,
  "asin": Math.asin, "acos": Math.acos, "atan": Math.atan, "acot": acot,
  "asec": asec, "acsc": acsc,
  "arcsin": Math.asin, "arccos": Math.acos,
  "arctan": Math.atan, "arccot": acot,
  "arcsec": asec, "arccsc": acsc,
  "asinh": asinh, "acosh": acosh, "atanh": atanh, "acoth": acoth,
  "asech": asech, "acsch": acsch,
  "arsinh": asinh, "arcosh": acosh, "artanh": atanh, "arcoth": acoth,
  "arsech": asech, "arcsch": acsch,
  "gamma": gamma, "fac": fac, "digamma": digamma,
  "erf": erf, "erfc": erfc, "norm": norm, "gd": gd,
  "K": eiK, "E": eiE,
  "H": step, "W": lambertw, "Wm1": lambertwm1,
  "d": fnan, "Ei": Ei, "li": li, "Li": Li,
  "Si": Si, "Ci": Ci, "Ai": Ai, "Bi": Bi,
  "G": BarnesG, "hyperK": hyperK,
  "rand": pick, "next": next,
  "sum": sumlist, "prod": prodlist,
  "compose": compose, "zeta": zeta,
  "B": bn, "Bm": bnm, "mean": mean, "sd": sd,
  "gcd": gcd_list, "lcm": lcm_list,
  "isprime": isprime, "phi": eulerphi,
  "min": fmin, "max": fmax,
  "factor": factor, "lambda": carmichael,
  "pcf": pcf, "fix": fix, "rev": rev, "size": size,
  "ipp": ipp, "fn": interpolate, "rl": reg_linear
};

var ftab2 = {
  "root": root, "log": log, "Delta": Delta,
  "diff": diff, "map": map, "filter": filter, "reduce": reduce,
  "count": count, "forall": forall, "exists": exists, "cat": cat,
  "rand": rand, "range": range, "hypot": hypot, "angle": angle,
  "mod": mod, "agm": agm, "magm": magm,
  "twave": twave, "sqwave": sqwave, "stwave": stwave,
  "ptwave": ptwave, "psqwave": psqwave, "pstwave": pstwave,
  "apply": fapply, "F": eiF, "E": eiE2,
  "RC": RC, "Gamma": iGamma, "gamma": igamma,
  "ff": ffac, "rf": rfac,
  "BJ": BesselJ, "Bj": Besselj,
  "BY": BesselY, "By": Bessely,
  "BI": BesselI, "BK": BesselK,
  "bc": bc, "get": fget,
  "table": table, "pgamma": pgamma, "gpgamma": gpgamma,
  "zeta": hzeta, "Li": pLi, "B": Beta,
  "inv": inv, "En": En,
  "PT": ChebyshevT, "PU": ChebyshevU, "PH": Hermite,
  "cdf": cdf, "s1": s1, "s2": s2, "bracket": s1, "brace": s2,
  "gcd": gcd, "lcm": lcm,
  "sigma": sigma,
  "min": Math.min, "max": Math.max,
  "delta": delta, "L": Laplace,
  "Fc": Fc, "Fs": Fs, "pmf": pmf,
  "pmfG": pmfG, "cdfG": cdfG,
  "pmfP": pmfP, "cdfP": cdfP,
  "pmfLog": pmfLog, "cdfLog": cdfLog,
  "pdfExp": pdfExp, "cdfExp": cdfExp,
  "pdfchisq": pdfchisq, "cdfchisq": cdfchisq,
  "pdfst": pdfst, "cdfst": cdfst,
  "primes": primes, "cprod": cartesian_prod
};

var ftab3 = {
  "int": int, "diff": diffn,
  "pow": fpow, "Delta": Deltan,
  "sum": sum, "prod": prod,
  "RF": RF, "RD": RD,
  "range": ranged, "if": fif,
  "Phi": Lerch,
  "PP": Legendre, "PL": Laguerre,
  "Pi": eiPi, "pm": powmod,
  "M": F11, "U": hypergeometricU, "F": Fmn,
  "B": iBeta, "I": riBeta, "D": fdiff,
  "E": MLE, "pmfB": pmfB, "cdfB": cdfB,
  "pdfN": pdfN, "cdfN": cdfN,
  "pdfLogN": pdfLogN, "cdfLogN": cdfLogN,
  "pdfF": pdfF, "cdfF": cdfF,
  "pdfW": pdfW, "cdfW": cdfW,
  "pdfGamma": pdfGamma, "cdfGamma": cdfGamma,
  "pdfBeta": pdfBeta, "cdfBeta": cdfBeta,
  "fs": fsa, "fa": fa, "fb": fb,
  "comb": comb, "clamp": clamp,
  "fn": interpolate_equidistant
};

var ftab4 = {
  "RJ": RJ, "int": gauss,
  "inv": invab, "gauss6": gauss6,
  "J": fint, "J2": fint2,
  "pmfH": pmfH, "cdfH": cdfH,
  "pow": frac_pow_fix,
  "interpolate": interpolate_fn,
  "fs": fs, "sma": sma
};

var ftabn = {
  "list": list,
  "color": color, "bcolor": bcolor,
  "setw": setw, "sp": spsys,
  "vline": fvline, "hline": fhline,
  "grid": setgridtype, "setp": setp,
  "short": short, "save": save,
  "ani": animate, "hsl": colorHSL,
  "scatter": scatter, "box": box,
  "font": setfont
};

function isalpha(s){
  return /^[a-z]+$/i.test(s);
}

function isdigit(s){
  return /^\d+$/.test(s);
}

function isspace(s){
  return s==' ' || s=='\t' || s=='\n';
}

function unspace(s){
  return s.replace(/\s/g,"");
}

function error(s){
  if(!animation){
    alert(s);
  }
  throw "error";
}

function compose_pow(f,n,x){
  for(var i=0; i<n; i++){
    x=f(x);
  }
  return x;
}

function frac_pow(f,n,x){
  var s=0, m=10, y=x;
  for(var k=0; k<=m; k++){
    s+=(n-m)/(n-k)*bc(m,k)*Math.cos(Math.PI*(m-k))*y;
    y=f(y);
  }
  return bc(n,m)*s;
}

function fpow(f,n,x){
  if(n>=0 && n==Math.round(n)){
    return compose_pow(f,n,x);
  }else{
    return frac_pow(f,n,x);
  }
}

// a is a fixed point of f
function frac_pow_fix(f,n,x,u){
  var a = diff(f,u);
  var b = diff2(f,u);
  var c = diff3(f,u);
  var an,a2=a*a;
  var d=x-u;
  if(a<0){
    an=Math.cos(Math.PI*n)*Math.pow(-a,n);
  }else{
    an=Math.pow(a,n);
  }
  var s2=d*d/2*b*an/a*(an-1)/(a-1);
  var t1=3*b*b*an/a2*(an-1)*(an-a)/(a-1)/(a-1)/(a+1);
  var t2=c*an/a*(an*an-1)/(a*a-1);
  var s3=d*d*d/6*(t1+t2);
  return u+d*an+s2+s3;
}

function sum(f,a,b){
  var s=0;
  for(var k=a; k<=b; k++){
    s+=f(k);
  }
  return s;
}

function prod(f,a,b){
  var p=1;
  for(var k=a; k<=b; k++){
    p*=f(k);
  }
  return p;
}

function diff(f,x){
  var h=0.0001;
  return (f(x+h)-f(x-h))/(2*h);
}

function diff2(f,x){
  var h=0.0001;
  return (f(x-h)-2*f(x)+f(x+h))/(h*h);
}

function diff3(f,x){
  var h=0.001;
  return (-0.5*f(x-2*h)+f(x-h)-f(x+h)+0.5*f(x+2*h))/(h*h*h);
}

function diff4(f,x){
  var h=0.01;
  return (f(x-2*h)-4*f(x-h)+6*f(x)-4*f(x+h)+f(x+2*h))/(h*h*h*h);
}

function diffn(f,x,n){
  n=Math.round(n);
  var h=0.1;
  if(n<=0){
    return f(x);
  }else if(n<=1){
    return diff(f,x);
  }else if(n<=2){
    return diff2(f,x);
  }else if(n<=3){
    return diff3(f,x);
  }else if(n<=4){
    return diff4(f,x);
  }else{
    return (diffn(f,x+h,n-1)-diffn(f,x-h,n-1))/(2*h);
  }
}

function simpson(f,a,b,n){
  var i,y,h,h1,a1;
  h = (b-a)/n;
  h1 = 0.5*h;
  y=0;
  for(i=0; i<n; i++){
    a1 = a+h*i;
    y += f(a1) + 4*f(a1+h1) + f(a1+h);
  }
  y = y*h/6;
  return y;
}

function gauss6(f,a,b,n){
  var j,aj,bj,h,p,q,y;
  var
  x1 = 0.238619186083, w1 = 0.467913934573,
  x2 = 0.661209386466, w2 = 0.360761573048,
  x3 = 0.932469514203, w3 = 0.171324492379;
  h = (b-a)/n;
  y=0;
  for(j=0; j<n; j++){
    aj=a+h*j; bj=a+(j+1)*h;
    p=0.5*(bj-aj); q=0.5*(aj+bj);
    y+=p*(w3*f(q-p*x3)+w2*f(q-p*x2)+w1*f(q-p*x1)+
    w1*f(q+p*x1)+w2*f(q+p*x2)+w3*f(q+p*x3));
  }
  return y;
}

var g64=[
[0.0486909570091397, -0.0243502926634244],
[0.0486909570091397, 0.0243502926634244],
[0.0485754674415034, -0.0729931217877990],
[0.0485754674415034, 0.0729931217877990],
[0.0483447622348030, -0.1214628192961206],
[0.0483447622348030, 0.1214628192961206],
[0.0479993885964583, -0.1696444204239928],
[0.0479993885964583, 0.1696444204239928],
[0.0475401657148303, -0.2174236437400071],
[0.0475401657148303, 0.2174236437400071],
[0.0469681828162100, -0.2646871622087674],
[0.0469681828162100, 0.2646871622087674],
[0.0462847965813144, -0.3113228719902110],
[0.0462847965813144, 0.3113228719902110],
[0.0454916279274181, -0.3572201583376681],
[0.0454916279274181, 0.3572201583376681],
[0.0445905581637566, -0.4022701579639916],
[0.0445905581637566, 0.4022701579639916],
[0.0435837245293235, -0.4463660172534641],
[0.0435837245293235, 0.4463660172534641],
[0.0424735151236536, -0.4894031457070530],
[0.0424735151236536, 0.4894031457070530],
[0.0412625632426235, -0.5312794640198946],
[0.0412625632426235, 0.5312794640198946],
[0.0399537411327203, -0.5718956462026340],
[0.0399537411327203, 0.5718956462026340],
[0.0385501531786156, -0.6111553551723933],
[0.0385501531786156, 0.6111553551723933],
[0.0370551285402400, -0.6489654712546573],
[0.0370551285402400, 0.6489654712546573],
[0.0354722132568824, -0.6852363130542333],
[0.0354722132568824, 0.6852363130542333],
[0.0338051618371416, -0.7198818501716109],
[0.0338051618371416, 0.7198818501716109],
[0.0320579283548516, -0.7528199072605319],
[0.0320579283548516, 0.7528199072605319],
[0.0302346570724025, -0.7839723589433414],
[0.0302346570724025, 0.7839723589433414],
[0.0283396726142595, -0.8132653151227975],
[0.0283396726142595, 0.8132653151227975],
[0.0263774697150547, -0.8406292962525803],
[0.0263774697150547, 0.8406292962525803],
[0.0243527025687109, -0.8659993981540928],
[0.0243527025687109, 0.8659993981540928],
[0.0222701738083833, -0.8893154459951141],
[0.0222701738083833, 0.8893154459951141],
[0.0201348231535302, -0.9105221370785028],
[0.0201348231535302, 0.9105221370785028],
[0.0179517157756973, -0.9295691721319396],
[0.0179517157756973, 0.9295691721319396],
[0.0157260304760247, -0.9464113748584028],
[0.0157260304760247, 0.9464113748584028],
[0.0134630478967186, -0.9610087996520538],
[0.0134630478967186, 0.9610087996520538],
[0.0111681394601311, -0.9733268277899110],
[0.0111681394601311, 0.9733268277899110],
[0.0088467598263639, -0.9833362538846260],
[0.0088467598263639, 0.9833362538846260],
[0.0065044579689784, -0.9910133714767443],
[0.0065044579689784, 0.9910133714767443],
[0.0041470332605625, -0.9963401167719553],
[0.0041470332605625, 0.9963401167719553],
[0.0017832807216964, -0.9993050417357722],
[0.0017832807216964, 0.9993050417357722]]

function gauss(f,a,b,n){
  var s,sj,h,i,j,aj,bj,p,q;
  var g=g64;
  var m=g64.length;
  h = (b-a)/n;
  s=0;
  for(j=0; j<n; j++){
    aj=a+j*h;
    bj=a+(j+1)*h;
    p=0.5*(bj-aj);
    q=0.5*(aj+bj);
    sj=0;
    for(i=0; i<m; i++){
      sj+=g[i][0]*f(p*g[i][1]+q);
    }
    s+=p*sj;
  }
  return s;
}

// Riemann-Liouville integral.
// Use substitution x-t=exp(x-x/u)
// in (x-t)^(a-1)*f(t) dt.
function fint(f,x0,x,a){
  if(a<0) return NaN;
  if(a==0) return f(x);
  if(a>0 && a<0.01) a=0.01;
  var g = function(u){
    var p = Math.exp(x-x/u);
    return Math.pow(p,a)*x/(u*u)*f(x-p);
  };
  return -1/gamma(a)*gauss(g,x/(x-Math.log(x-x0)),0,1);
}

function fint2(f,x0,x,a){
  var g = function(t){return Math.pow(x-t,a-1)*f(t);};
  return 1/gamma(a)*gauss(g,x0,x,1);
}

function fdiff(f,x,a){
  if(a<0) return fint(f,0,x,-a);
  if(a==Math.floor(a)) return diffn(f,x,a); 
  var p = Math.floor(a+1);
  var g = function(t){return fint(f,0,t,p-a);};
  return diffn(g,x,p);
}

function MLEA(a,b,x){
  var s=0;
  for(var k=1; k<10; k++){
    s+=1/(gamma(b-a*k)*Math.pow(x,k));
  }
  return 1/a*Math.pow(x,(1-b)/a)*Math.exp(Math.pow(x,1/a))-s;
}

function MLE(a,b,x){
  if(x>4 && a>0.4 && a<1){
    return MLEA(a,b,x);
  }
  var s=0;
  for(var k=0; k<100; k++){
    s+=Math.pow(x,k)/gamma(a*k+b);
  }
  return s;
}

function fnot(x){
  return 1-x;
}

function clamp(x,a,b){
  return Math.min(Math.max(x,a),b);
}

function int(f,a,b){
  return gauss(f,a,b,1);
}

function rand(a,b){
  return Math.random()*(b-a)+a;
}

function root(n,x){
  return Math.pow(x,1/n);
}

function sgn(x){
  if(x==0) return 0;
  return Math.abs(x)/x;
}

function frac(x){
  return x-Math.floor(x);
}

function hypot(x,y){
  return Math.sqrt(x*x+y*y);
}

function angle(x,y){
  return Math.atan2(y,x);
}

function polar(x,y){
  return [hypot(x,y),angle(x,y)];
}

function mod(x,m){
  return x-m*Math.floor(x/m);
}

function step(x){
  return x>0? 1: 0;
}

function twave(x,p){
  return Math.abs(mod(4*x/p-1,4)-2)-1;
}

function ptwave(x,p){
  return 1-Math.abs(mod(2*x/p,2)-1);
}

function sqwave(x,p){
  return sgn(0.5-mod(x,p)/p);
}

function psqwave(x,p){
  return mod(x,p)<p/2?1:0;
}

function stwave(x,p){
  return 2*mod(x-p/2,p)/p-1;
}

function pstwave(x,p){
  return mod(x,p)/p;
}

function Delta(f,x){
  return f(x+1)-f(x);
}

function Deltan(f,x,n){
  n=Math.round(n);
  if(n<1){
    return f(x);
  }else{
    return Deltan(f,x+1,n-1)-Deltan(f,x,n-1);
  }
}

function lg(x){
  return Math.log(x)/Math.log(10);
}

function ld(x){
  return Math.log(x)/Math.log(2);
}

function log(x,b){
  return Math.log(x)/Math.log(b);
}

function cot(x){
  return Math.cos(x)/Math.sin(x);
}

function sec(x){
  return 1/Math.cos(x);
}

function csc(x){
  return 1/Math.sin(x);
}

function acot(x){
  return Math.PI/2-Math.atan(x);
}

function asec(x){
  return Math.acos(1/x);
}

function acsc(x){
  return Math.asin(1/x);
}

function sinh(x){
  return 0.5*(Math.exp(x)-Math.exp(-x));
}

function cosh(x){
  return 0.5*(Math.exp(x)+Math.exp(-x));
}

function tanh(x){
  if(x>24) return 1;
  if(x<-24) return -1;
  return 1-2/(Math.exp(2*x)+1);
}

function coth(x){
  return 1/tanh(x);
}

function sech(x){
  return 1/cosh(x);
}

function csch(x){
  return 1/sinh(x);
}

function asinh(x){
  return Math.log(x+Math.sqrt(x*x+1));
}

function acosh(x){
  return Math.log(x+Math.sqrt(x*x-1));
}

function atanh(x){
  return 0.5*Math.log((1+x)/(1-x));
}

function acoth(x){
  return 0.5*Math.log((x+1)/(x-1));
}

function asech(x){
  return acosh(1/x);
}

function acsch(x){
  return asinh(1/x);
}

function gd(x){
  return Math.atan(sinh(x));
}

function sinc(x){
  return x==0?1:Math.sin(Math.PI*x)/(Math.PI*x);
}

// Lanczos approximation
function gammapx(x){
  var p=[0.99999999999980993, 676.5203681218851, -1259.1392167224028,
  771.32342877765313, -176.61502916214059, 12.507343278686905,
  -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  x--;
  var y=p[0];
  for(var i=1; i<9; i++){
    y+=p[i]/(x+i);
  }
  var t=x+7.5;
  return Math.sqrt(2*Math.PI)*Math.pow(t,(x+0.5))*Math.exp(-t)*y;
}

function gamma(x){
  if(x<0.5){
    return Math.PI/Math.sin(x*Math.PI)/gammapx(1-x);
  }else{
    return gammapx(x);
  }
}

// Lanczos approximation
function lngammapx(x){
  var p=[0.99999999999980993, 676.5203681218851, -1259.1392167224028,
  771.32342877765313, -176.61502916214059, 12.507343278686905,
  -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  x--;
  var y=p[0];
  for(var i=1; i<9; i++){
    y+=p[i]/(x+i);
  }
  var t=x+7.5;
  return 0.5*Math.log(2*Math.PI)+(x+0.5)*Math.log(t)-t+Math.log(y);
}

var factab = [1,1,2,6,24,120,720,5040,
40320,362880,3628800,39916800];
function fac(x){
  if(x==Math.round(x) && x>=0 && x<12){
    return factab[x];
  }
  return gamma(x+1);
}

function digamma(x){
  var h = 0.0001;
  return (Math.log(gamma(x+h))-Math.log(gamma(x-h)))/(2*h);
}

function Beta(x,y){
  if(x<0 || y<0){
    return gamma(x)*gamma(y)/gamma(x+y);
  }else{
    return Math.exp(lngammapx(x)+lngammapx(y)-lngammapx(x+y));
  }
}

function ffac(n,k){
  return gamma(n+1)/gamma(n-k+1)
}

function rfac(n,k){
  return gamma(n+k)/gamma(n);
}

// Arithmetic-geometric mean
function agm(a,b){
  var ah,bh;
  for(var i=0; i<20; i++){
    ah = (a+b)/2;
    bh = Math.sqrt(a*b);
    a=ah; b=bh;
    if(Math.abs(a-b)<1E-15) break;
  }
  return a;
}

// Modified arithmetic-geometric mean, see
// Semjon Adlaj: "An eloquent formula for the perimeter
// of an ellipse", Notices of the AMS 59(8) (2012), p. 1094-1099
function magm(x,y){
  var z=0;
  var xh,yh,zh,r;
  for(var i=0; i<20; i++){
    xh=0.5*(x+y);
    r=Math.sqrt((x-z)*(y-z));
    yh=z+r; zh=z-r;
    x=xh; y=yh; z=zh;
    if(Math.abs(x-y)<2E-15) break;
  }
  return x;
}

function eiK(m){
  return 0.5*Math.PI/agm(1,Math.sqrt(1-m));
}

function eiE(m){
  var M=agm(1,Math.sqrt(1-m));
  var N=magm(1,1-m);
  return 0.5*Math.PI*N/M;
}

function RF(x,y,z){
  var xk=x, yk=y, zk=z;
  var a;
  for(var k=0; k<26; k++){
    a = Math.sqrt(xk*yk)+Math.sqrt(xk*zk)+Math.sqrt(yk*zk);
    xk=(xk+a)/4; yk=(yk+a)/4; zk=(zk+a)/4;
  }
  return 1/Math.sqrt(xk);
}

function RC(x,y){
  return RF(x,y,y);
}

function RJ(x,y,z,p){
  var xk=x, yk=y, zk=z, pk=p;
  var n,s,a,d,e,sx,sy,sz,sp,delta;
  delta=(p-x)*(p-y)*(p-z);
  s=0; n=12;
  for(var k=0; k<n; k++){
    sx=Math.sqrt(xk); sy=Math.sqrt(yk);
    sz=Math.sqrt(zk); sp=Math.sqrt(pk);
    a = sx*sy+sx*sz+sy*sz;
    d=(sp+sx)*(sp+sy)*(sp+sz);
    e=Math.pow(4,-3*k)/(d*d)*delta;
    xk=(xk+a)/4; yk=(yk+a)/4; zk=(zk+a)/4; pk=(pk+a)/4;
    s+=Math.pow(4,-k)/d*RC(1,1+e);
  }
  return Math.pow(xk,-3/2)*Math.pow(4,-n)+6*s;
}

function RD(x,y,z){
  return RJ(x,y,z,z);
}

function eiF(phi,m){
  var s=Math.sin(phi), c=Math.cos(phi);
  return s*RF(c*c,1-m*s*s,1);
}

function eiE2(phi,m){
  var s=Math.sin(phi), c=Math.cos(phi);
  return s*RF(c*c,1-m*s*s,1)-1/3*m*s*s*s*RJ(c*c,1-m*s*s,1,1);
}

function eiPi(phi,n,m){
  var s=Math.sin(phi), c=Math.cos(phi);
  return s*RF(c*c,1-m*s*s,1)+1/3*n*s*s*s*RJ(c*c,1-m*s*s,1,1-n*s*s);
}

function lambertw(x){
  var y;
  if(x>=74){
    y = Math.log(x/Math.log(x/Math.log(x/Math.log(x/Math.log(x)))));
  }else if(x>=1.14){
    y = x/Math.pow(x+1,0.73);
  }else if(x>=-0.3455){
    y = x/Math.exp(x/Math.exp(x/Math.exp(x/Math.exp(x/Math.exp(x)))));
  }else if(x>=-1/Math.E){
    y = Math.sqrt(2*(Math.E*x+1))-1;
  }else{
    return NaN;
  }
  y = y-(y-x*Math.exp(-y))/(y+1);
  y = y-(y-x*Math.exp(-y))/(y+1);
  y = y-(y-x*Math.exp(-y))/(y+1);
  y = y-(y-x*Math.exp(-y))/(y+1);
  return y;
}

function lambertwm1(x){
  var y;
  if(x<-1/Math.E){
    return NaN;
  }else if(x<-0.33469524){
    y = -Math.sqrt(Math.E*x+1)-1;
  }else if(x<0){
    y = Math.log(x/Math.log(x/Math.log(x/Math.log(x/Math.log(-x)))));
  }else{
    return NaN;
  }
  y = y-(y-x*Math.exp(-y))/(y+1);
  y = y-(y-x*Math.exp(-y))/(y+1);
  y = y-(y-x*Math.exp(-y))/(y+1);
  y = y-(y-x*Math.exp(-y))/(y+1);
  return y;
}

function ChebyshevT(n,x){
  if(Math.abs(x)<1){
    return Math.cos(n*Math.acos(x));
  }else if(x>=1){
    return cosh(n*acosh(x));
  }else{
    return Math.cos(Math.PI*n)*cosh(n*acosh(-x));
  }
}

function ChebyshevU(n,x){
  return (ChebyshevT(n+2,x)-x*ChebyshevT(n+1,x))/(x*x-1);
}

function Hermite(n,x){
  var y=0, m=Math.floor(n/2);
  for(var k=0; k<=m; k++){
    y+=Math.cos(k*Math.PI)/fac(k)/fac(n-2*k)*Math.pow(2*x,n-2*k);
  }
  return y*fac(n);
}

function Laguerre(n,a,x){
  var y=0;
  for(var k=0; k<=n; k++){
    y+=Math.cos(k*Math.PI)*bc(n+a,n-k)/fac(k)*Math.pow(x,k);
  }
  return y;
}

function ALP(n,m,x){
  if(n==m){
    return Math.sqrt(Math.PI)/gamma(0.5-n)*Math.pow(2*Math.sqrt(1-x*x),n);
  }else if(n-1==m){
    return x*(2.0*n-1)*ALP(m,m,x);
  }else{
    var a=ALP(m,m,x);
    var b=ALP(m+1,m,x);
    var h;
    for(var k=m+2; k<=n; k++){
      h=((2.0*k-1)*x*b-(k-1.0+m)*a)/(k-m);
      a=b; b=h;
    }
    return b;
  }
}

function Legendre(n,m,x){
  n=Math.round(n);
  m=Math.round(m);
  if(n<0) n=-n-1;
  if(Math.abs(m)>n){
    return 0;
  }else if(m<0){
    m=-m;
    return((m%2<0.5?1:-1)*
      Math.exp(lngammapx(n-m+1)-lngammapx(n+m+1))*
      ALP(n,m,x)
    );
  }else{
    return ALP(n,m,x);
  }
}

function cfGamma(a,x,n){
  var y=0;
  for(var k=n; k>=1; k--){
    y=k*(k-a)/(x-y-a+2*k+1);
  }
  return Math.exp(-x)*Math.pow(x,a)/(x-y-a+1);
}

function psgamma(a,x,n){
  var y=0;
  var p=1/a;
  for(var k=1; k<n; k++){
    y+=p;
    p=p*x/(a+k);
  }
  return y*Math.exp(-x)*Math.pow(x,a);
}

function igamma(a,x){
  if(x>a+1){
    return gamma(a)-cfGamma(a,x,20);
  }else{
    return psgamma(a,x,20);
  }
}

function iGamma(a,x){
  if(x>a+1){
    return cfGamma(a,x,20);
  }else{
    if(a==0) a=1E-6;
    return gamma(a)-psgamma(a,x,20);
  }
}

function erf(x){
  if(Math.abs(x)>8) return sgn(x);
  var y;
  if(Math.abs(x)>1.7){
    y=Math.sqrt(Math.PI)-cfGamma(0.5,x*x,26);
  }else{
    y=psgamma(0.5,x*x,26);
  }
  return sgn(x)*y/Math.sqrt(Math.PI);
}

function erfc(x){
  return 1-erf(x);
}

function norm(x){
  return 0.5+0.5*erf(x/Math.SQRT2);
}

function En(n,x){
  return Math.pow(x,n-1)*iGamma(1-n,x);
}

function Ei(x){
  var s=0,p=1;
  for(var k=1; k<80; k++){
    p=p*x/k;
    s+=p/k;
  }
  return gc+Math.log(Math.abs(x))+s;
}

function li(x){
  return Ei(Math.log(x));
}

function Li(x){
  return li(x)-li(2);
}

// Abramowitz and Stegun: "Handbook of Mathematical Functions
// [...]", Chapter 5: "Exponential Integral and Related Functions",
// "Asymptotic Expansions" (5.2.34-35),
// "Rational Approximations" (5.2.36-39)
function hf(x){
  var a1,a2,b1,b2;
  a1=7.241163; b1=9.068580;
  a2=2.463936; b2=7.157433;
  var x2=x*x, x4=x2*x2;
  return (x4+a1*x2+a2)/(x4+b1*x2+b2)/x;
}

function hg(x){
  var a1,a2,b1,b2;
  a1=7.547478; b1=12.723684;
  a2=1.564072; b2=15.723606;
  var x2=x*x, x4=x2*x2;
  return (x4+a1*x2+a2)/(x4+b1*x2+b2)/x2;
}

function Si(x){
  var s=sgn(x);
  x=Math.abs(x);
  if(x<1){
    var x2=x*x, x3=x2*x, x5=x2*x3, x7=x2*x5;
    return s*(x-x3/18+x5/600-x7/35280);
  }else{
    return s*(Math.PI/2-hf(x)*Math.cos(x)-hg(x)*Math.sin(x));
  }
}

function Ci(x){
  if(x<0) return NaN;
  if(x<1){
    var x2=x*x, x4=x2*x2, x6=x2*x4;
    return gc+Math.log(x)-x2/4+x4/96-x6/4320;
  }else{
    return hf(x)*Math.sin(x)-hg(x)*Math.cos(x);
  }
}

function F01(b,x){
  var s=1,p=1;
  for(var k=0; k<80; k++){
    p=p*x/(b+k)/(k+1);
    s+=p;
  }
  return s;
}

function F11(a,b,x){
  var s=1,p=1;
  for(var k=0; k<80; k++){
    p=p*x*(a+k)/(b+k)/(k+1);
    s+=p;
  }
  return s;
}

function hypergeometricU(a,b,x){
  if(b==Math.round(b)) b+=1E-4;
  return gamma(1-b)/gamma(a-b+1)*F11(a,b,x)+
  gamma(b-1)/gamma(a)*Math.pow(x,1-b)*F11(a-b+1,2-b,x);
}

function F21(a1,a2,b,x){
  var s=1,p=1;
  for(var k=0; k<80; k++){
    p=p*x*(a1+k)*(a2+k)/(b+k)/(k+1);
    s+=p;
  }
  return s;
}

function Fmn(a,b,x){
  var i,k,m,n;
  m=a.length; n=b.length;
  var s=1,p=1;
  for(k=0; k<80; k++){
    p=p*x/(k+1);
    for(i=0; i<m; i++) p=p*(a[i]+k);
    for(i=0; i<n; i++) p=p/(b[i]+k);
    s+=p;
  }
  return s;
}

function BesselJ(a,x){
  return Math.pow(x/2,a)/gamma(a+1)*F01(a+1,-1/4*x*x);
}

function Besselj(a,x){
  return BesselJ(a+1/2,x)*Math.sqrt(Math.PI/(2*x));
}

function BesselY(a,x){
  if(a==Math.round(a)) a+=0.0001;
  return (BesselJ(a,x)*Math.cos(a*Math.PI)-BesselJ(-a,x))/Math.sin(a*Math.PI);
}

function Bessely(a,x){
  return BesselY(a+1/2,x)*Math.sqrt(Math.PI/(2*x));
}

function BesselI(a,x){
  return Math.pow(x/2,a)/gamma(a+1)*F01(a+1,x*x/4);
}

function BesselK(a,x){
  if(a==Math.round(a)) a+=0.0001;
  return Math.PI/2*(BesselI(-a,x)-BesselI(a,x))/Math.sin(a*Math.PI);
}

function Ai(x){
  if(x>6.25){
    return Math.exp(-2/3*Math.pow(x,3/2))/2/Math.sqrt(Math.PI)/Math.pow(x,1/4);
  }else if(x<-13.27){
    var a = Math.sin(2/3*Math.pow(-x,3/2)+Math.PI/4);
    return a/Math.sqrt(Math.PI)/Math.pow(-x,1/4);
  }else{
    return 0.35502805388*F01(2/3,1/9*x*x*x)
    -0.25881940379*x*F01(4/3,1/9*x*x*x);
  }
}

function Bi(x){
  if(x>32.538){
    return Math.exp(2/3*Math.pow(x,3/2))/Math.sqrt(Math.PI)/Math.pow(x,1/4);
  }else if(x<-11.94){
    var a = Math.cos(2/3*Math.pow(-x,3/2)+1/4*Math.PI);
    return a/Math.sqrt(Math.PI)/Math.pow(-x,1/4);
  }else{
    return 0.61492662744*F01(2/3,1/9*x*x*x)
    +0.44828835735*x*F01(4/3,1/9*x*x*x);
  }
}

function bc(x,k){
  if(k!=Math.round(k)){
    return gamma(x+1)/gamma(k+1)/gamma(x-k+1);
  }else if(k<0){
    return 0;
  }
  var y=1;
  for(var i=1; i<=k; i++){
    y=y*(x-i+1)/i;
  }
  return y;
}

function stirling1(n,k){
  if(n==k){
    return 1;
  }else if(n<=0 || k<=0){
    return 0;
  }else{
    return (n-1)*stirling1(n-1,k)+stirling1(n-1,k-1);
  }
}

function stirling2(n,k){
  if(n==k){
    return 1;
  }else if(n<=0 || k<=0){
    return 0;
  }else{
    return k*stirling2(n-1,k)+stirling2(n-1,k-1);
  }
}

function s1(n,k){
  n = Math.round(n);
  k = Math.round(k);
  if(n<0 && k<0){
    return s2(-k,-n);
  }else{
    return n<k? 0: stirling1(n,k);
  }
}

function s2(n,k){
  n = Math.round(n);
  k = Math.round(k);
  if(n<0 && k<0){
    return s1(-k,-n);
  }else{
    return n<k? 0: stirling2(n,k);
  }
}

function Lerch(z,s,x){
  var y=0, p=1;
  for(var k=0; k<200; k++){
    y+=p/Math.pow(x+k,s);
    p=p*z;
  }
  return y;
}

// Fredrik Johansson: "Rigorous high-precision computation of the
// Hurwitz zeta function and its derivatives", Sep. 2013,
// arXiv:1309.2877 [cs.SC]
function hzeta(s,a){
  var y=0, N=18, Npa=N+a;
  for(var k=a; k<Npa; k++){
    y+=Math.pow(k,-s);
  }
  var s2=s*(s+1)*(s+2);
  var s4=s2*(s+3)*(s+4);
  y+=Math.pow(Npa,1-s)/(s-1)+0.5*Math.pow(Npa,-s);
  y+=s*Math.pow(Npa,-s-1)/12;
  y-=s2*Math.pow(Npa,-s-3)/720;
  y+=s4*Math.pow(Npa,-s-5)/30240;
  y-=s4*(s+5)*(s+6)*Math.pow(Npa,-s-7)/1209600;
  return y;
}

function zeta(s){
  if(s>-1){
    return hzeta(s,1);
  }else{
    var a = 2*Math.pow(2*Math.PI,s-1)*Math.sin(Math.PI*s/2);
    return a*gamma(1-s)*hzeta(1-s,1);
  }
}

function pLi(s,x){
  return x*Lerch(x,s,1);
}

function gpgamma(s,x){
  var f = function(s){return Math.exp(gc*s)*hzeta(s+1,x)/gamma(-s);};
  return Math.exp(-gc*s)*diff(f,s);
}

function pgamma(n,x){
  var f = function(x){return Math.log(gamma(x));};
  if(n==Math.round(n) && n<6){
    if(x<0 || n<2) return diffn(f,x,n+1);
  }
  return gpgamma(n,x);
}

function bn(n){
  n = Math.round(n);
  if(n==0) return 1;
  return -n*zeta(1-n);
}

function bnm(n){
  n = Math.round(n);
  if(n==1) return -0.5;
  else return bn(n);
}

function iBeta(x,a,b){
  return Math.pow(x,a)/a*F21(a,1-b,a+1,x);
}

function riBeta(x,a,b){
  return iBeta(x,a,b)/Beta(a,b);
}

function hyperK(x){
  var f = function(s){return hzeta(s,x);};
  return Math.exp(diff(f,-1)+0.1654211437004509);                             
}

function BarnesG(x){
  return Math.pow(gamma(x),x-1)/hyperK(x);
}

function delta(x,a){
  var t=Math.sqrt(Math.PI)*a*x;
  return a*Math.exp(-t*t);
}

function comb(x,a,T){
  return delta(mod(x+0.5*T,T)-0.5*T,a);
}

function fnan(x){
  if(x==0) return NaN;
  return 1;
}

function fapply(f,x){
  return f(x);
}

function list(stack,argc){
  var a=[];
  for(var k=0; k<argc; k++){
    a.push(stack.pop());
  }
  a.reverse();
  stack.push(a);
}

function size(a){
  return a.length;
}

function cat(a,b){
  return a.concat(b);
}

function range(a,b){
  var v=[];
  for(var k=a; k<=b; k++){
    v.push(k);
  }
  return v;
}

function ranged(a,b,d){
  var v=[];
  var n = Math.round((b-a)/d);
  var r = Math.abs(d);
  var c = 1E-9<=r && r<1E6;
  var m = Math.pow(10,Math.round(12-lg(r)));
  var x;
  for(var k=0; k<=n; k++){
    x=a+d*k;
    if(c){
      v.push(Math.round(x*m)/m);
    }else{
      v.push(x);
    }
  }
  return v;
}

function rev(a){
  return a.reverse();
}

function pick(a){
  var k = Math.floor(Math.random()*a.length);
  return a[k];
}

var nextk=0;
function next(a){
  var k = nextk%a.length;
  nextk++;
  return a[k];
}

function map(f,a){
  return a.map(f);
}

function filter(f,a){
  var i;
  var b=[];
  for(i=0; i<a.length; i++){
    if(Math.round(f(a[i]))>0){
      b.push(a[i]);
    }
  }
  return b;
}

function reduce(f,a){
  var g = function(x,y){
    var stack=[x,y];
    f(stack,2);
    return stack.pop();
  };
  return a.reduce(g);
}

function count(f,a){
  var k=0;
  for(var i=0; i<a.length; i++){
    if(f(a[i])>=0.5) k++;
  }
  return k;
}

function forall(f,a){
  for(var i=0; i<a.length; i++){
    if(f(a[i])<0.5) return 0;
  }
  return 1;
}

function exists(f,a){
  for(var i=0; i<a.length; i++){
    if(f(a[i])>=0.5) return 1;
  }
  return 0;
}

function sumlist(a){
  var s=0;
  for(var i=0; i<a.length; i++){
    s+=a[i];
  }
  return s;
}

function prodlist(a){
  var p=1;
  for(var i=0; i<a.length; i++){
    p=p*a[i];
  }
  return p;
}

function cartesian_prod(a,b){
  var p=[];
  for(var i=0; i<a.length; i++){
    for(var j=0; j<a.length; j++){
      p.push([a[i],b[j]]);
    }
  }
  return p;
}

function compose(a){
  var f = function(x){
    var y=x;
    for(var i=a.length-1; i>=0; i--){
      y = a[i](y);
    }
    return y;
  }
  return f;
}

function fget(a,i){
  i=Math.round(i);
  if(i<1 || i>a.length){
    return 0;
  }
  return a[i-1];
}

function fif(c,a,b){
  if(c!=0) return a;
  return b;
}

function table(f,a){
  var b=[];
  for(var i=0; i<a.length; i++){
    b[i]=[a[i],f(a[i])];
  }
  return b;
}

function pmf(a,k){
  k=Math.round(k);
  var s=0;
  var n=a.length;
  for(var i=0; i<n; i++){
    if(k==Math.round(a[i])) s++;
  }
  return s/n;
}

function pmfB(n,p,k){
  k=Math.round(k);
  if(k<0 || k>n) return 0;
  return bc(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k);
}

function cdfB(n,p,x){
  var s=0;
  x=Math.round(x);
  for(var k=0; k<=x; k++){
    s+=bc(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k);
  }
  return s;
}

function pmfG(p,k){
  k=Math.round(k);
  if(k<1) return 0;
  return p*Math.pow(1-p,k-1);
}

function cdfG(p,x){
  x=Math.round(x);
  if(x<1) return 0;
  return 1-Math.pow(1-p,x);
}

function pmfH(N,K,n,k){
  N=Math.round(N); K=Math.round(K);
  n=Math.round(n); k=Math.round(k);
  if(k<Math.max(0,n+K-N) || k>Math.min(n,K)) return 0;
  return bc(K,k)*bc(N-K,n-k)/bc(N,n);
}

function cdfH(N,K,n,x){
  var s=0;
  for(var k=0; k<=x; k++){
    s+=pmfH(N,K,n,k);
  }
  return s;
}

function pmfP(lambda,k){
  k=Math.round(k);
  if(k<0) return 0;
  return Math.exp(-lambda)*Math.pow(lambda,k)/fac(k);
}

function cdfP(lambda,x){
  x=Math.round(x);
  var s=0;
  for(var k=0; k<=x; k++){
    s+=pmfP(lambda,k);
  }
  return s;
}

function pmfLog(p,k){
  k=Math.round(k);
  if(k<1) return 0;
  return -Math.pow(p,k)/(k*Math.log(1-p));
}

function cdfLog(p,x){
  x=Math.round(x);
  var s=0;
  for(var k=1; k<=x; k++){
    s+=pmfLog(p,k);
  }
  return s;
}

function pdfN(mu,sigma,x){
  var a = 1/(sigma*Math.sqrt(2*Math.PI));
  return a*Math.exp(-0.5*Math.pow((x-mu)/sigma,2));
}

function cdfN(mu,sigma,x){
  return 0.5+0.5*erf((x-mu)/Math.sqrt(2*sigma*sigma));
}

function pdfLogN(mu,sigma,x){
  var a = 1/(x*sigma*Math.sqrt(2*Math.PI));
  return a*Math.exp(-0.5*Math.pow((Math.log(x)-mu)/sigma,2));
}

function cdfLogN(mu,sigma,x){
  return 0.5+0.5*erf((Math.log(x)-mu)/(sigma*Math.sqrt(2)));
}

function pdfExp(lambda,x){
  if(x<0) return 0;
  return lambda*Math.exp(-lambda*x);
}

function cdfExp(lambda,x){
  if(x<0) return 0;
  return 1-Math.exp(-lambda*x);
}

function pdfchisq(n,x){
  return Math.pow(x,n/2-1)*Math.exp(-x/2)/(Math.pow(2,n/2)*gamma(n/2));
}

function cdfchisq(n,x){
  if(x<=0) return 0;
  return 1-igamma(n/2,x/2)/gamma(n/2);
}

function pdfst(n,x){
  var a = gamma((n+1)/2)/(gamma(n/2)*Math.sqrt(n*Math.PI));
  return a*Math.pow(1+x*x/n,-(n+1)/2);
}

function cdfst(n,x){
  var a = Math.sqrt(x*x+n);
  return riBeta((x+a)/(2*a),n/2,n/2);
}

function pdfF(m,n,x){
  if(x<0) return 0;
  var a = Math.pow(m,0.5*m)*Math.pow(n,0.5*n)/Beta(0.5*m,0.5*n);
  return a*Math.pow(x,0.5*m-1)/Math.pow(m*x+n,0.5*(m+n));
}

function cdfF(m,n,x){
  if(x<=0) return 0;
  return riBeta(m*x/(m*x+n),0.5*m,0.5*n);
}

function pdfW(a,b,x){
  if(x<0) return 0;
  return a/b*Math.pow(x/b,a-1)*Math.exp(-Math.pow(x/b,a));
}

function cdfW(a,b,x){
  if(x<0) return 0;
  return 1-Math.exp(-Math.pow(x/b,a));
}

function pdfGamma(b,p,x){
  if(x<=0) return 0;
  return Math.pow(b,p)/gamma(p)*Math.pow(x,p-1)*Math.exp(-b*x);
}

function cdfGamma(b,p,x){
  if(x<0) return 0;
  return igamma(p,b*x)/gamma(p);
}

function pdfBeta(p,q,x){
  if(x<0 || x>1) return 0;
  return Math.pow(x,p-1)*Math.pow(1-x,q-1)/Beta(p,q);
}

function cdfBeta(p,q,x){
  if(x<0) return 0;
  if(x>1) return 1;
  return riBeta(x,p,q);
}

function reg_linear(a){
  var mx,my,sx,sy;
  var qx,qy,qxy,rxy;
  var i;
  sx=0; sy=0;
  for(i=0; i<a.length; i++){
    sx+=a[i][0]; sy+=a[i][1];
  }
  mx=sx/a.length;
  my=sy/a.length;
  qx=0; qy=0; qxy=0;
  for(i=0; i<a.length; i++){
    qx+=(a[i][0]-mx)*(a[i][0]-mx);
    qy+=(a[i][1]-my)*(a[i][1]-my);
    qxy+=(a[i][0]-mx)*(a[i][1]-my);
  }
  rxy = qxy/Math.sqrt(qx*qy);
  return {
    "mx": mx, "my": my, "c": [mx,my],
    "ax": qxy/qx, "ay": qxy/qy,
    "bx": my-qxy/qx*mx, "by": mx-qxy/qy*my,
    "r": rxy
  };
}

function color256(x){
  x=Math.round(x);
  if(x<0) x=0;
  if(x>255) x=255;
  return x;
}

function color(stack,argc){
  if(argc!=3){
    error("Error: color(r,g,b) takes exactly three arguments.");
  }
  vcb=color256(stack.pop());
  vcg=color256(stack.pop());
  vcr=color256(stack.pop());
}

function bcolor(stack,argc){
  if(argc!=3){
    error("Error: bcolor(r,g,b) takes exactly three arguments.");
  }
  bcb=color256(stack.pop());
  bcg=color256(stack.pop());
  bcr=color256(stack.pop());
}

function get_rgb(H,S,L){
  var C = (1-Math.abs(2*L-1))*S;
  var R1,G1,B1,Hp,X,m;
  Hp = 3*H/Math.PI;
  X = C*(1-Math.abs(Hp%2-1));
  if(0<=Hp && Hp<=1){
    R1=C; G1=X; B1=0;
  }else if(1<=Hp && Hp<2){
    R1=X; G1=C; B1=0;
  }else if(2<=Hp && Hp<3){
    R1=0; G1=C; B1=X;
  }else if(3<=Hp && Hp<4){
    R1=0; G1=X; B1=C;
  }else if(4<=Hp && Hp<5){
    R1=X; G1=0; B1=C;
  }else if(5<=Hp && Hp<6){
    R1=C; G1=0; B1=X;
  }else{
    R1=0; G1=0; B1=0;
  }
  m = L-C/2;
  return {r: R1+m, g: G1+m, b: B1+m};
}

function colorHSL(stack,argc){
  var H,S,L,c;
  L=stack.pop();
  S=stack.pop();
  H=stack.pop();
  H=mod(H,2*Math.PI);
  c=get_rgb(H,S,L);
  vcr=color256(256*c.r);
  vcg=color256(256*c.g);
  vcb=color256(256*c.b);
}

function evalv1(a,x){
  var y,tmp;
  tmp=gv1; gv1=x;
  y=evalv(a);
  gv1=tmp;
  return y;
}

var gva;
function define(id,s){
  recid=id;
  recfn={};
  var a = compile(s);
  var f = function(x){return evalv1(a,x);};
  gva=a;
  recfn.value=f;
  ftab[id]=f;
  return f;
}

function setw(stack,argc){
  var w,h;
  if(argc==2){
    h=Math.round(stack.pop()/4)*4;
    w=Math.round(stack.pop()/4)*4;
  }else if(argc==1){
    w=Math.round(stack.pop()/4)*4;
    h=Math.round(w*2/3/4)*4;
  }else{
    error("Error: setw takes one or two arguments.");
  }
  dw=w; dwh=w/2;
  dh=h; dhh=h/2;
  psx=dwh; psy=dhh;
  var canvas = document.getElementById("canvas1");
  canvas.width=w;
  canvas.height=h;
}

function setp(stack,argc){
  if(argc!=1){
    error("Error: setp(n) takes exactly one argument.");
  }
  precision=Math.round(stack.pop());
}

function short(stack,argc){
  if(argc!=1){
    error("Error: short(n) takes exactly one argument.");
  }
  shortmode=Math.round(stack.pop());
}

function setfont(stack,argc){
  if(argc!=1){
    error("Error: short(n) takes exactly one argument.");
  }
  font = Math.round(stack.pop())+"px \"DejaVu Sans\", monospace";
}

function save(stack,argc){
	var s = canvas.toDataURL("image/png");
  var img = "<img src=\""+s+"\"/>";
  body = document.getElementsByTagName("body");
  body[0].innerHTML+=img;
}

var scatter_list=[];
var box_list=[];

function scatter(stack,argc){
  var i,j,t;
  for(i=0; i<argc; i++){
    t=stack.pop();
    if(Array.isArray(t[0])){
      for(j=0; j<t.length; j++){
        scatter_list.push(t[j]);
      }
    }else{
      scatter_list.push(t);
    }
  }
}

function box(stack,argc){
  var i,j,t;
  for(i=0; i<argc; i++){
    t=stack.pop();
    if(Array.isArray(t[0])){
      for(j=0; j<t.length; j++){
        box_list.push(t[j]);
      }
    }else{
      box_list.push(t);
    }
  }
}

function flush(){
  var i,t;
  if(scatter_list.length>0){
    for(i=0; i<scatter_list.length; i++){
      t=scatter_list[i];
      scatter_point(t[0],t[1]);
    }
    scatter_list=[];
  }
  if(box_list.length>0){
    for(i=0; i<box_list.length; i++){
      t=box_list[i];
      box_draw(t[0],t[1]);
    }
    box_list=[];
  }
}

function invab(f,x,a,b){
  var m,s,a1=a,b1=b;
  s = sgn(f(b)-f(a));
  if(s==0 || isNaN(s)) s=1;
  for(var k=0; k<60; k++){
    m=(a+b)/2;
    if(s*(f(m)-x)<0) a=m;
    else b=m;
  }
  if(Math.abs(m-a1)<1E-8) return NaN;
  if(Math.abs(m-b1)<1E-8) return NaN;
  return m;
}

function inv(f,x){
  return invab(f,x,-1000,1000);
}

function spsys(stack,argc){
  psy=Math.round(stack.pop());
  psx=Math.round(stack.pop());
}

function fmin(a){
  if(a.length==0) return NaN;
  var  y = a[0];
  for(var i=1; i<a.length; i++){
    y = Math.min(y,a[i]);
  }
  return y;
}

function fmax(a){
  if(a.length==0) return NaN;
  var  y = a[0];
  for(var i=1; i<a.length; i++){
    y = Math.max(y,a[i]);
  }
  return y;
}

function mean(a){
  var y=0;
  for(var k=0; k<a.length; k++){
    y+=a[k];
  }
  return y/a.length;
}

function sd(a){
  var y,m;
  m = mean(a);
  y = 0;
  for(var k=0; k<a.length; k++){
    y+=Math.pow(a[k]-m,2);
  }
  return Math.sqrt(y/(a.length-1));
}

function cdf(a,x){
  var y=0;
  for(var k=0; k<a.length; k++){
    if(a[k]<=x) y++;
  }
  return y/a.length;
}

function Laplace(f,x){
  var g = function(t){return f(t)*Math.exp(-x*t);};
  return gauss(g,0,40,2);
}

function Fc(f,x){
  var g = function(t){return f(t)*Math.cos(2*Math.PI*x*t);};
  return gauss(g,-10,10,6);
}

function Fs(f,x){
  var g = function(t){return f(t)*Math.sin(2*Math.PI*x*t);};
  return gauss(g,-10,10,6);
}

// Fourier series
function fs(x,a0,a,b){
  var s=0.5*a0;
  for(k=1; k<=a.length; k++){
    s+=a[k-1]*Math.cos(k*x);
  }
  for(k=1; k<=b.length; k++){
    s+=b[k-1]*Math.sin(k*x);
  }
  return s;
}

function fsa(x,a0,a){
  var s=0.5*a0;
  var t;
  for(k=1; k<=a.length; k++){
    t=a[k-1];
    s+=t[0]*Math.cos(k*x-t[1]);
  }
  return s;
}

function fa(f,i,j){
  var pi=Math.PI;
  var a=[];
  for(var k=i; k<=j; k++){
    a.push(1/pi*gauss(function(t){
      return f(t)*Math.cos(k*t);
    },-pi,pi,2));
  }
  return a;
}

function fb(f,i,j){
  var pi=Math.PI;
  var b=[];
  for(var k=i; k<=j; k++){
    b.push(1/pi*gauss(function(t){
      return f(t)*Math.sin(k*t);
    },-pi,pi,4));
  }
  return b;
}



// Interpolate piecwise linear
function interpolate(t){
  return function(x){
    if(t.length==0) return NaN;
    var a=0;
    var b=t.length-1;
    var i,p1,p2;
    if(x<t[a][0] || x>t[b][0]){
      return NaN;
    }
    while(a<=b){
      i = a+Math.round((b-a)/2);
      if(x<t[i][0]){
        b=i-1;
      }else{
        a=i+1;
      }
    }
    i=a;
    if(i>0){
      p1=t[i-1]; p2=t[i];
      return (p2[1]-p1[1])/(p2[0]-p1[0])*(x-p2[0])+p2[1];
    }else{
      return NaN;
    }
  };
}

function interpolate_fn(f,a,b,d){
  var a = ranged(a,b,d).map(function(x){
    return [x,f(x)];
  });
  return interpolate(a);
}

// Interpolate piecewise linear,
// equidistant nodes
function interpolate_equidistant(x0,d,t){
  return function(x){
    var k = Math.floor((x-x0)/d);
    if(k<0 || k+1>=t.length){
      return NaN;
    }
    return (t[k+1]-t[k])/d*(x-x0-k*d)+t[k];
  };
}

// Interpolation polynomial
function ipp(a){
  var i,j,d=[];
  var n=a.length;
  for(i=0; i<n; i++){
    d.push(a[i][1]);
  }
  for(i=1; i<n; i++){
    for(j=n-1; j>=i; j--){
      d[j]=(d[j]-d[j-1])/(a[j][0]-a[j-i][0]);
    }
  }
  return function(x){
    var y=d[n-1];
    for(var i=n-2; i>=0; i--){
      y=d[i]+(x-a[i][0])*y;
    }
    return y;
  };
}

function powmod(x,n,m){
  if(x>1E9 || n>1E9 || m>1E9){
    return NaN;
  }
  x=Math.round(x);
  n=Math.round(n);
  m=Math.round(m);
  if(x<0 || n<0 || m<0){
    return NaN;
  }
  var y=1;
  x=x%m;
  while(n>0){
    if(x*x>1E9 || y*x>1E9) return NaN;
    if(n%2==1) y=(y*x)%m;
    x=(x*x)%m; n=Math.floor(n/2);
  }
  return y;
}

function gcd(a,b){
  a=Math.round(Math.abs(a));
  b=Math.round(Math.abs(b));
  var h;
  while(b>0){
    h = a%b; a=b; b=h;
  }
  return a;
}

function lcm(a,b){
  a=Math.abs(a); b=Math.abs(b);
  return a/gcd(a,b)*b;
}

function gcd_list(a){
  if(a.length==0) return 0;
  var y=a[0];
  for(var i=1; i<a.length; i++){
    y=gcd(y,a[i]);
  }
  return y;
}

function lcm_list(a){
  if(a.length==0) return 0;
  var y=a[0];
  for(var i=1; i<a.length; i++){
    y=lcm(y,a[i]);
  }
  return y;
}

function isprime(n){
  n=Math.round(n);
  if(n<2) return 0;
  var m = Math.floor(Math.sqrt(n))+1;
  for(var k=2; k<m; k++){
    if(n%k==0) return 0;
  }
  return 1;
}

function primes(m,n){
  var a = [];
  for(var i=m; i<=n; i++){
    if(isprime(i)) a.push(i);
  }
  return a;
}

function pcf(x){
  var y=0;
  for(var k=1; k<=x; k++){
    y+=isprime(k);
  }
  return y;
}

function eulerphi(n){
  n = Math.round(n);
  if(n<1) return NaN;
  var y=1;
  for(var p=2; p<=n; p++){
    if(isprime(p) && n%p==0){
      y=y*(1-1/p);
    }
  }
  return n*y;
}

function sigma(n,k){
  var y=0;
  k=Math.round(k);
  n=Math.round(n);
  if(n<1) return NaN;
  for(var d=1; d<=n; d++){
    if(n%d==0) y+=Math.pow(d,k);
  }
  return y;
}

function nextprime(n){
  while(!isprime(n))n++;
  return n;
}

function factor(n){
  var m,k=2;
  var a=[];
  n=Math.round(n);
  while(k<=n){
    m=0;
    while(n%k==0){n=n/k; m++;}
    if(m!=0) a.push([k,m]);
    k=nextprime(k+1);
  }
  return a;
}

function carmichael(n){
  if(n<1) return NaN;
  if(n==1) return 1;
  var a = factor(n);
  var i,y;
  for(i=0; i<a.length; i++){
    y=a[i];
    if(y[0]==2){
      if(y[1]==1) y=1;
      else if(y[1]==2) y=2;
      else y=Math.pow(2,y[1]-2);
    }else{
      y=Math.pow(y[0],y[1]-1)*(y[0]-1);
    }
    a[i]=y;
  }
  return lcm_list(a);
}

function tofn(F){
  return function(x,y){
    var stack=[x,y];
    F(stack,2);
    return stack.pop();
  }
}

function fix(F){
  F=tofn(F);
  var m={};
  return function f(n){
    var y;
    if(n in m){
      return m[n];
    }else{
      y=F(f,n); m[n]=y;
      return y;
    }
  };
}

function sma(f,x,n,h){
  var y=0;
  for(var k=-n; k<=n; k++){
    y+=f(x+k*h);
  }
  return y/(2*n+1);
}

function type_tos(type){
  if(type==Tnumber) return "number";
  else if(type==Tid) return "id";
  else if(type==Tfid) return "fid";
  else if(type==Top) return "op";
  else if(type==Tbr) return "br";
  else if(type==Tsep) return "sep";
  else if(type==Tfun) return "fun";
  else if(type==Targ) return "arg";
  else if(type==Tfapp) return "fapp";
  else if(type==Tvapp) return "vapp";
  else if(type==Tnfapp) return "nfapp";
  else if(type==Tif) return "if";
  else if(type==Tstring) return "string";
  else return "?";
}

function tvec_tos(a,n){
  var i,s;
  s="";
  if(n==1){
    for(i=0; i<a.length; i++){
      s+="["+a[i].s+"]";
    }
  }else{
    for(i=0; i<a.length; i++){
      s+="["+a[i].s+","+type_tos(a[i].type)+"]";
    }
  }
  return s;
}

function isop(c){
  return c=='+' || c=='-' || c=='*' || c=='/' || c=='%' ||
    c=='^' || c=='<' || c=='>' || c=='=' || c=='|' || c=='&' ||
    c=='\\' || c==':';
}

function push_token(a,type,s){
  a.push({"type": type, "s": s});
}

// arg.value needs not to be saved,
// because recursion is not possible
// with one argument anonymous functions.
function create_fn(arg,a,vevalv){
  var f = function(x){arg.value=x; return vevalv(a);};
  return f;
}

function create_fn_nargs(argv,a,vevalv){
  var f = function(stack,argc){
    var n = argv.length;
    var t = Array(n);
    var k;
    for(k=0; k<n; k++){
      t[k]=argv[n-1-k].value;
      argv[n-1-k].value=stack.pop();
    }
    stack.push(vevalv(a));
    for(k=0; k<n; k++){
      argv[n-1-k].value=t[k];
    }
  }
  return f;
}

function construct_closure(t,vevalv){
  var a = t.a.slice(0);
  var clist = t.clist;
  var index;
  for(var i=0; i<clist.length; i++){
    index = clist[i];
    a[index] = {"type": Targ, "s": {"value": a[index].s.value}};
  }
  if(t.argv.length==1){
    return create_fn(t.argv[0],a,vevalv);
  }else{
    return create_fn_nargs(t.argv,a,vevalv);
  }
}

function fargs(p,s,i){
  var id,argv,x;
  argv=[];
  p.c=false;
  while(i<s.length){
    if(isspace(s[i]) || s[i]==','){
      i++;
    }else if(isalpha(s[i])){
      id="";
      while(i<s.length && (isalpha(s[i]) || isdigit(s[i]))){
        id+=s[i];
        i++;
      }
      x={};
      argv.push(x);
      p.d[id]=x;
    }else if(s[i]=='|' || s[i]==';' || s[i]=='.'){
      if(s[i]==';') p.c=true;
      break;
    }else{
      error("Syntax error in function definition.");
    }
  }
  p.argv=argv;
  p.i=i;
}

function superscript(c){
  if(c=='\u2070') return "0";
  else if(c=='\u00b9') return "1";
  else if(c=='\u00b2') return "2";
  else if(c=='\u00b3') return "3";
  else if(c=='\u2074') return "4";
  else if(c=='\u2075') return "5";
  else if(c=='\u2076') return "6";
  else if(c=='\u2077') return "7";
  else if(c=='\u2078') return "8";
  else if(c=='\u2079') return "9";
  else{
    return undefined;
  }
}

function scan(s,d){
  var a,i,j,s2,p,vid,args,argv;
  var stack=[];
  var bind;
  var str=false;
  a = [];
  i=0;
  while(i<s.length){
    if(isdigit(s[i]) || s[i]=='.'){
      s2="";
      while(i<s.length && (isdigit(s[i]) || s[i]=='.')){
        s2+=s[i];
        i++;
        if(i<s.length && s[i]=='E'){
          s2+=s[i];
          i++;
          if(i<s.length && (s[i]=='+' || s[i]=='-')){
            s2+=s[i];
            i++;
          }
        }
      }
      push_token(a,Tnumber,s2);
      while(i<s.length && isspace(s[i])) i++;
      if(i<s.length && (isalpha(s[i]) || s[i]=='(' || s[i]=='[')){
        push_token(a,Top,"*");
      }
    }else if(isalpha(s[i])){
      s2="";
      while(i<s.length && (isalpha(s[i]) || isdigit(s[i]))){
        s2+=s[i];
        i++;
      }
      if(a.length>0 && a[a.length-1].s==")"){
        push_token(a,Top,"*");
      }
      while(i<s.length && isspace(s[i])) i++;
      if(i<s.length && s[i]=='('){
        if(s2=="if"){
          push_token(a,Tbr,"(");
          stack.push(1);
        }else{
          push_token(a,Tfid,s2);
          push_token(a,Tbr,"(");
          stack.push(0);
        }
        i++;
      }else{
        if(str){
          push_token(a,Tstring,s2);
          str=false;
        }else{
          push_token(a,Tid,s2);
        }
      }
      if(i<s.length && s[i]=='.'){
        push_token(a,Top,".");
        str=true;
        i++;
      }
    }else if((s[i]=='+' || s[i]=='-') && (a.length==0 ||
      a[a.length-1].s=='(' || a[a.length-1].type==Top ||
      a[a.length-1].type==Tsep || a[a.length-1].s=="{")
    ){
      if(s[i]=='-') push_token(a,Top,"um");
      i++;
    }else if(i+1<s.length && s[i]=='<' && s[i+1]=='='){
      push_token(a,Top,"<=");
      i+=2;
    }else if(i+1<s.length && s[i]=='>' && s[i+1]=='='){
      push_token(a,Top,">=");
      i+=2;
    }else if(i+1<s.length && s[i]==':' && s[i+1]=='='){
      push_token(a,Top,":=");
      i+=2;
    }else if(i+1<s.length && s[i]=='!' && s[i+1]=='='){
      push_token(a,Top,"!=");
      i+=2;
    }else if(isop(s[i])){
      push_token(a,Top,s[i]);
      i++;
    }else if(s[i]=='('){
      if(a.length>0 && a[a.length-1].s==")"){
        push_token(a,Top,"*");
      }
      push_token(a,Tbr,s[i]);
      stack.push(0);
      i++;
    }else if(s[i]==')'){
      if(stack.length>0 && stack[stack.length-1]>0){
        push_token(a,Tsep,"");
        push_token(a,Tif,"end");
        push_token(a,Tbr,")");
      }else{
        push_token(a,Tbr,s[i]);
      }
      if(stack.length>0) stack.pop();
      i++;
    }else if(s[i]==','){
      if(stack.length>0 && stack[stack.length-1]>0){
        if(stack[stack.length-1]==1){
          push_token(a,Tsep,"");
          push_token(a,Tif,"then");
          push_token(a,Tsep,"");
          stack[stack.length-1]=2;
        }else{
          push_token(a,Tsep,"");
          push_token(a,Tif,"else");
          push_token(a,Tsep,"");
        }
      }else{
        push_token(a,Tsep,s[i]);
      }
      i++;
    }else if(isspace(s[i]) || s[i]=='#'){
      i++;
    }else if(s[i]=='{'){
      i++;
      p={"d": {}};
      for(var key in d){
        p.d[key]=d[key];
        p.d["*"+key]=1;
      }
      fargs(p,s,i);
      i=p.i; argv=p.argv;
      i++; s2="";
      var k=0;
      while(i<s.length && (s[i]!='}' || k!=0)){
        if(s[i]=='{') k++;
        if(s[i]=='}') k--;
        s2+=s[i]; i++;
      }
      var t = compile_env(s2,p.d);
      var f, fevalv;
      if(cpx>0){
        fevalv=evalvc;
      }else{
        fevalv=evalv;
      }
      if(argv.length==1){
        f = create_fn(argv[0],t.a,fevalv);
      }else{
        f = create_fn_nargs(argv,t.a,fevalv);
      }
      i++;
      while(i<s.length && isspace(s[i])) i++;
      if(i<s.length && s[i]=='('){
        push_token(a,Tfid,f);
        if(argv.length!=1) a[a.length-1].n=1;
      }else{
        push_token(a,Tfun,f);
        a[a.length-1].c=p.c;
        if(t.clist.length>0){
          a[a.length-1].clist=t.clist;
          a[a.length-1].alist=t.alist;
          a[a.length-1].a=t.a;
          a[a.length-1].argv=argv;
        }
      }
    }else if(s[i]==';'){
      if(a.length==0){
        push_token(a,Tid,"nan");
      }
      s2=""; i++;
      while(i<s.length){
        s2+=s[i];
        i++;
      }
      statements(s2);
      break;
    }else if(superscript(s[i])!=undefined){
      s2="";
      var c;
      while(1){
        c=superscript(s[i]);
        if(c==undefined) break;
        s2+=c;
        i++;
      }
      push_token(a,Top,"^");
      push_token(a,Tnumber,s2);
    }else if(s[i]=='['){
      push_token(a,Tfid,"list");
      push_token(a,Tbr,"(");
      i++;
    }else if(s[i]==']'){
      push_token(a,Tbr,")");
      i++;
    }else if(s[i]=='"'){
      i++; j=i;
      while(i<s.length && s[i]!='"') i++;
      push_token(a,Tstring,s.slice(j,i));
      i++;
    }else{
      error("Unexpected character: \""+s[i]+"\"");
    }
  }
  return a;
}

function precedence(op){
  if(op==":=") return 0;
  if(op=="|") return 10;
  if(op=="&") return 20;
  if(op=="=" || op=="!=") return 24;
  if(op==">" || op=="<") return 30;
  if(op==">=" || op=="<=") return 30;
  if(op==":" || op=="::") return 34;
  if(op=="+" || op=="-") return 40;
  if(op=="*" || op=="/" || op=="%") return 50;
  if(op=="um") return 60;
  if(op=="^") return 70;
  if(op=="\\") return 80;
  if(op==".") return 90;
}

function postfix(a){
  var i,stack,a2,type;
  var argc,jstack;
  a2=[];
  stack=[];
  argc=[];
  jstack=[];
  for(i=0; i<a.length; i++){
    type=a[i].type;
    if(type==Tid || type==Tnumber || type==Tfun || type==Tstring){
      if(type==Tid && i+1<a.length && a[i+1].s==":="){
        a[i+1].id = a[i].s;
        stack.push(a[i+1]);
        i++;
      }else{
        a2.push(a[i]);
      }
    }else if(type==Tif){
      if(a[i].s=="then"){
        a[i].s=THEN;
        a2.push(a[i]);
        jstack.push(a[i]);
      }else if(a[i].s=="else"){
        a[i].s=ELSE;
        a2.push(a[i]);
        jstack[jstack.length-1].a=a2.length;
        jstack[jstack.length-1]=a[i];
      }else if(a[i].s=="end"){
        jstack[jstack.length-1].a=a2.length;
        jstack.pop();
      }
    }else if(type==Top){
      while(stack.length>0 && stack[stack.length-1].type==Top){
        if(precedence(a[i].s) > precedence(stack[stack.length-1].s)){
          break;
        }
        a2.push(stack.pop());
      }
      if(a[i].s==':'){
        var m = a2.length;
        if(m>0 && a2[m-1].type==Top && a2[m-1].s==':'){
          a2.pop();
          a[i].s="::";
        }
      }
      stack.push(a[i]);
    }else if(type==Tfid){
      stack.push(a[i]);
      if(i+2<a.length && a[i+2].s==")"){
        argc.push(0);
      }else{
        argc.push(1);
      }
    }else if(a[i].s=="("){
      stack.push(a[i]);
    }else if(a[i].s==")"){
      while(stack.length>0 && stack[stack.length-1].s!="("){
        a2.push(stack.pop());
      }
      if(stack.length>0) stack.pop();
      else{
        error("Syntax error: unmatched brackets.");
      }
      if(stack.length>0 && stack[stack.length-1].type==Tfid){
        a2.push(stack.pop());
        a2[a2.length-1].argc = argc.pop();
      }
    }else if(type==Tsep){
      while(stack.length>0 && stack[stack.length-1].s!="("){
        a2.push(stack.pop());
      }
      if(a[i].s==","){
        if(argc.length>0) argc[argc.length-1]++;
      }
    }
  }
  while(stack.length>0){
    if(stack[stack.length-1].s=="("){
      error("Syntax error: unmatched brackets.");
    }
    a2.push(stack.pop());
  }
  return a2;
}

function encode(a,d,bcpx){
  var i,t;
  var tab,tab2,tab3,tab4,tabn;
  var pvtab;
  var clist=[];
  var alist=[];
  if(bcpx>0){
    tab=cftab; tab2=cftab2; tab3=cftab3;
    tab4=cftab4; tabn=cftabn;
    pvtab=cvtab;
  }else{
    tab=ftab; tab2=ftab2; tab3=ftab3;
    tab4=ftab4; tabn=ftabn;
    pvtab=vtab;
  }
  for(i=0; i<a.length; i++){
    t=a[i];
    if(t.type==Top){
      if(t.s=="+") t.s=ADD;
      else if(t.s=="-") t.s=SUB;
      else if(t.s=="*") t.s=MPY;
      else if(t.s=="/") t.s=DIV;
      else if(t.s=="%") t.s=MOD;
      else if(t.s=="um") t.s=NEG;
      else if(t.s=="^") t.s=POW;
      else if(t.s=="<") t.s=LT;
      else if(t.s==">") t.s=GT;
      else if(t.s=="<=") t.s=LE;
      else if(t.s==">=") t.s=GE;
      else if(t.s=="=") t.s=EQ;
      else if(t.s=="!=") t.s=NE;
      else if(t.s=="&") t.s=AND;
      else if(t.s=="|") t.s=OR;
      else if(t.s=="\\") t.s=APP;
      else if(t.s==":") t.s=RANGE;
      else if(t.s=="::") t.s=RANGED;
      else if(t.s==".") t.s=DOT;
      else if(t.s==":="){
        t.s=DEF;
        if(!pvtab.hasOwnProperty(t.id)){
          pvtab[t.id]={};
        }
      }
      else t.s=-1;
    }else if(t.type==Tfid){
      if(typeof t.s=="function"){
        t.type = Tfapp;
        if(t.n==1){
          t.type = Tvapp;
          t.s = {value: t.s};
        }
      }else if(d.hasOwnProperty(t.s)){
        t.type = Tvapp;
        t.s = d[t.s];
      }else if(t.s==recid){
        t.type = Tvapp;
        t.s = recfn;
      }else if(t.s in pvtab){
        t.type = Tvapp;
        t.s = pvtab[t.s];
      }else if(t.argc==1 && tab.hasOwnProperty(t.s)){
        t.type = Tfapp;
        t.s = tab[t.s];
      }else if(t.argc==2 && tab2.hasOwnProperty(t.s)){
        t.type = Tfapp;
        t.s = tab2[t.s];
      }else if(t.argc==3 && tab3.hasOwnProperty(t.s)){
        t.type = Tfapp;
        t.s = tab3[t.s];
      }else if(t.argc==4 && tab4.hasOwnProperty(t.s)){
        t.type = Tfapp;
        t.s = tab4[t.s];
      }else if(tabn.hasOwnProperty(t.s)){
        t.type = Tnfapp;
        t.s = tabn[t.s];
      }else{
        error("Unknown function: "+t.s+", number of arguments: "+t.argc+".");
      }
    }else if(t.type==Tnumber){
      a[i].s = parseFloat(t.s);
    }else if(t.type==Tid){
      if(d.hasOwnProperty(t.s)){
        if(d.hasOwnProperty("*"+t.s)){
          clist.push(i);
        }
        t.type = Targ;
        t.s = d[t.s];
        alist.push(i);
      }else if(pvtab.hasOwnProperty(t.s)){
        t.type = Targ;
        t.s = pvtab[t.s];
      }else if(tab.hasOwnProperty(t.s)){
        t.type = Tfun;
        t.s = tab[t.s];
      }else if(t.s=="a"){
        t.type=Tnumber;
        t.s=pma;
      }else if(t.s=="b"){
        t.type=Tnumber;
        t.s=pmb;
      }else if(t.s=="mx"){
        t.type=Tnumber;
        t.s=pmx;
      }else if(t.s=="my"){
        t.type=Tnumber;
        t.s=pmy;
      }else if(t.s=="f"){
        t.type=Tfun;
        t.s=funf;
      }else if(t.s=="g"){
        t.type=Tfun;
        t.s=fung;
      }else if(t.s=="nan"){
        t.type=Tnumber;
        t.s=NaN;
      }
      else if(t.s==gv1id) t.s=1;
      else if(t.s==gv2id) t.s=2;
      else if(t.s==gv3id) t.s=3;
      else{
        error("Undefined identifier: "+t.s+".");
      }
    }else if(t.type==Tstring){
      t.type=Tnumber;
    }
  }
  return {"clist": clist, "alist": alist};
}

function calc_op(stack,t){
  var x,y;
  var c=t.s;
  if(c==ADD){
    y = stack.pop();
    x = stack.pop();
    stack.push(x+y);
  }else if(c==SUB){
    y = stack.pop();
    x = stack.pop();
    stack.push(x-y);
  }else if(c==MPY){
    y = stack.pop();
    x = stack.pop();
    stack.push(x*y);
  }else if(c==DIV){
    y = stack.pop();
    x = stack.pop();
    stack.push(x/y);
  }else if(c==NEG){
    x = stack.pop();
    stack.push(-x);
  }else if(c==POW){
    y = stack.pop();
    x = stack.pop();
    stack.push(Math.pow(x,y));
  }else if(c==MOD){
    y = stack.pop();
    x = stack.pop();
    stack.push(mod(x,y));
  }else if(c==LT){
    y = stack.pop();
    x = stack.pop();
    stack.push(x<y?1:0);
  }else if(c==GT){
    y = stack.pop();
    x = stack.pop();
    stack.push(x>y?1:0);
  }else if(c==LE){
    y = stack.pop();
    x = stack.pop();
    stack.push(x<=y?1:0);
  }else if(c==GE){
    y = stack.pop();
    x = stack.pop();
    stack.push(x>=y?1:0);
  }else if(c==EQ){
    y = stack.pop();
    x = stack.pop();
    stack.push(Math.abs(x-y)<eqepsilon?1:0);
  }else if(c==NE){
    y = stack.pop();
    x = stack.pop();
    stack.push(Math.abs(x-y)>=eqepsilon?1:0);
  }else if(c==AND){
    y = stack.pop();
    x = stack.pop();
    stack.push(Math.min(x,y));
  }else if(c==OR){
    y = stack.pop();
    x = stack.pop();
    stack.push(Math.max(x,y));
  }else if(c==DEF){
    x = stack.pop();
    vtab[t.id].value=x;
  }else if(c==APP){
    y = stack.pop();
    x = stack.pop();
    stack.push(x(y));
  }else if(c==RANGE){
    y = stack.pop();
    x = stack.pop();
    stack.push(range(x,y));
  }else if(c==RANGED){
    y = stack.pop();
    x = stack.pop();
    stack.push(ranged(stack.pop(),x,y));
  }else if(c==DOT){
    y = stack.pop();
    x = stack.pop();
    if(x.hasOwnProperty(y)){
      stack.push(x[y]);
    }else{
      error("Error in x."+y+": "+y+" is not in x.");
    }
  }
}

function evalv(a){
  var i,t,stack,type;
  var x,y,z,p,n;
  stack = [];
  n = a.length;
  for(i=0; i<n; i++){
    t=a[i];
    type=t.type;
    if(type==Tnumber){
      stack.push(t.s);
    }else if(type==Tid){
      if(t.s==1) stack.push(gv1);
      else if(t.s==2) stack.push(gv2);
      else if(t.s==3) stack.push(gv3);
      else stack.push(0);
    }else if(type==Top){
      calc_op(stack,t);
    }else if(type==Tfun){
      if(t.c){
        stack.push(construct_closure(t,evalv));
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
      }else if(t.argc==4){
        p = stack.pop();
        z = stack.pop();
        y = stack.pop();
        x = stack.pop();
        stack.push(t.s(x,y,z,p));
      }else{
        error("Error: cannot evaluate function with more than four arguments.");
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
        if(x==0) i=t.a-1;
      }else if(t.s==ELSE){
        i=t.a-1;
      }
    }else{
      error("Unknown token type: type number "+t.type);
    }
  }
  if(stack.length>1){
    error("Error: expected more operators.");
  }
  if(stack.length>0){
    return stack.pop();
  }else{
    return null;
  }
}

function clear(data,r,g,b){
  var i;
  for(i=0; i<data.length; i+=4){
    data[i]=r;
    data[i+1]=g;
    data[i+2]=b;
    data[i+3]=255;
  }
}

function pset(data,x,y,a){
  var r,g,b,i;
  if(x>=0 && x<dw && y>=0 && y<dh){
    i=(x+y*dw)*4;
    r = data[i+0];
    g = data[i+1];
    b = data[i+2];
    data[i+0]=(vcr-r)*a/255+r;
    data[i+1]=(vcg-g)*a/255+g;
    data[i+2]=(vcb-b)*a/255+b;
  }
}

function pset4(data,x,y,a){
  pset(data,x,y,a);
  pset(data,x+1,y,a);
  pset(data,x,y+1,a);
  pset(data,x+1,y+1,a);
}

function psets(data,x,y){
  pset(data,x,y,240);
  pset(data,x-1,y,120);
  pset(data,x+1,y,120);
  pset(data,x,y-1,120);
  pset(data,x,y+1,120);
  pset(data,x-1,y-1,60);
  pset(data,x+1,y-1,60);
  pset(data,x-1,y+1,60);
  pset(data,x+1,y+1,60);
}

function getpx(x,m){
  return psx+Math.floor(m*360*x);
}

function getpy(y,m){
  return psy-Math.floor(m*360*y);
}

function getx(px,m){
  return (px-psx)/(360*m);
}

function gety(py,m){
  return -(py-psy)/(360*m);
}

function pseta(data,x,y,a){
  var r,g,b,i;
  if(x>=0 && x<dw && y>=0 && y<dh){
    i=(x+y*dw)*4;
    r = data[i+0];
    g = data[i+1];
    b = data[i+2];
    data[i+0]=Math.min((vcr-255)*a/255+255,r);
    data[i+1]=Math.min((vcg-255)*a/255+255,g);
    data[i+2]=Math.min((vcb-255)*a/255+255,b);
  }
}

function pseta2(data,x,y,a){
  var r,g,b,i,m;
  if(x>=0 && x<dw && y>=0 && y<dh){
    i=(x+y*dw)*4;
    r = data[i+0];
    g = data[i+1];
    b = data[i+2];
    m = a/10;
    if((vcr-255)*a/255+255<r){
      data[i+0]=(vcr-r)*m/255+r;
    }
    if((vcg-255)*a/255+255<g){
      data[i+1]=(vcg-g)*m/255+g;
    }
    if((vcb-255)*a/255+255<b){
      data[i+2]=(vcb-b)*m/255+b;
    }
  }
}

function fade(x){
  return Math.exp(-0.4*x*x*x);
}

function psetdiff(rx,ry,px,py){
  var dx = Math.abs(px-rx);
  var dy = Math.abs(py-ry);
  var d = Math.sqrt(dx*dx+dy*dy);
  pseta(data,px,py,255*fade(d));
}

function fpsets(rx,ry){
  var i,j,px,py;
  px = Math.floor(rx);
  py = Math.floor(ry);
  for(i=-2; i<=2; i++){
    for(j=-2; j<=2; j++){
      psetdiff(rx,ry,px+i,py+j);
    }
  }
}

// Set a smooth point by overwriting.
function point(x,y){
  var px,py;
  px = getpx(x-x1,1/wx);
  py = getpy(y-y1,1/wy);
  psets(data,px,py);
}

// Set a smooth point by subtractive color mixing.
// This one has a much better antialiasing algorithm
// than 'point', but does not work on dark background.
function spoint(x,y){
  var rx,ry;
  rx=psx+1/wx*360*(x-x1);
  ry=psy-1/wy*360*(y-y1);
  fpsets(rx,ry);
}

function cpoint(x,y){
  var px,py;
  px = getpx(x-x1,1/wx);
  py = getpy(y-y1,1/wy);
  pset(data,px,py,255);
  pset(data,px-1,py,255);
  pset(data,px-1,py-1,255);
  pset(data,px-1,py+1,255);
  pset(data,px+1,py,255);
  pset(data,px+1,py-1,255);
  pset(data,px+1,py+1,255);
  pset(data,px,py+1,255);
  pset(data,px,py-1,255);
  psets(data,px-2,py);
  psets(data,px-2,py-1);
  psets(data,px-2,py+1);
  psets(data,px+2,py);
  psets(data,px+2,py-1);
  psets(data,px+2,py+1);
  psets(data,px,py-2);
  psets(data,px-1,py-2);
  psets(data,px+1,py-2);
  psets(data,px,py+2);
  psets(data,px-1,py+2);
  psets(data,px+1,py+2);
}

function scatter_fade(x){
  var a=3;
  return x<a?1:Math.exp(-0.2*(x-a)*(x-a)*(x-a));
}

function scatter_diff(rx,ry,px,py){
  var dx = Math.abs(px-rx);
  var dy = Math.abs(py-ry);
  var d = Math.sqrt(dx*dx+dy*dy);
  pseta(data,px,py,255*scatter_fade(d));
}

function scatter_pset(rx,ry){
  var i,j,px,py;
  px = Math.floor(rx);
  py = Math.floor(ry);
  for(i=-5; i<=5; i++){
    for(j=-5; j<=5; j++){
      scatter_diff(rx,ry,px+i,py+j);
    }
  }
}

function scatter_point(x,y){
  var rx,ry;
  rx=psx+1/wx*360*(x-x1);
  ry=psy-1/wy*360*(y-y1);
  scatter_pset(rx,ry);
}

function erase(px,py,w,h){
  var i,j,r,g,b;
  px = Math.floor(px);
  py = Math.floor(py);
  r=vcr; g=vcg; b=vcb;
  vcr=bcr; vcg=bcg; vcb=bcb;
  for(i=0; i<w; i++){
    for(j=0; j<h; j++){
      pset(data,px+i,py+j,255);
    }
  }
  vcr=r; vcg=g; vcb=b;
}

function box_draw(x,y){
  var rx,ry;
  rx=psx+1/wx*360*(x-x1);
  ry=psy-1/wy*360*(y-y1);
  erase(rx-3,ry-3,7,7);
  var i;
  for(i=-4; i<=4; i++){
    fpsets(rx+4,ry+i);
    fpsets(rx-4,ry+i);
    fpsets(rx+i,ry+4);
    fpsets(rx+i,ry-4);
  }
}

function format(x,w){
  w=Math.abs(w);
  var sgn="";
  var y;
  if(x<0){
    sgn="\u2212";
    x=-x;
  }
  if(x<0.1 || x>=100){
    if(w>1E-12 && Math.round(x*1E14)==0){
      y=x.toFixed(2);
    }else{
      y = x.toExponential(2).toUpperCase();
    }
  }else{
    if(w<0.09){
      if(w<0.0009){
        if(w<0.00009){
          y = x.toFixed(6);
        }else{
          y = x.toFixed(5);
        }
      }else{
        y = x.toFixed(4);
      }
    }else{
      y = x.toFixed(2);
    }
  }
  return sgn+y;
}

function xbar(x,a,context){
  var px = getpx(x,0.1);
  if(px>10 && px<dw-10){
    context.fillRect(px,psy-4,2,8);
  }
}

function ybar(y,a,context){
  var py = getpy(y,0.1);
  if(py>10 && py<dh-10){
    context.fillRect(psx-4,py,8,2);
  }
}

function xlabel(x,a,context){
  var px = getpx(x,0.1);
  if(px>44 && px<dw-44){
    var s = format(a,wx);
    context.fillText(s,px-10,psy+20);
  }
}

function ylabel(y,a,context){
  var py = getpy(y,0.1);
  if(py>16 && py<dh-16){
    var s = format(a,wy);
    context.fillText(s,psx+10,py);
  }
}

// d is the dictionary
// of local variables
function compile_env(s,d){
  var a,clist;
  s = unspace(s);
  a = scan(s,d);
  a = postfix(a);
  var t = encode(a,d,cpx);
  return {"clist": t.clist, "alist": t.alist, "a": a};
}

function compile(s){
  return compile_env(s,{}).a;
}

function compileRe(s){
  var a;
  s = unspace(s);
  a = scan(s,{});
  a = postfix(a);
  encode(a,{},0);
  return a;
}

function evals(s){
  var a = compileRe(s);
  return evalv(a);
}

function gets(id){
  var input = document.getElementById(id);
  if(input==null){
    throw "Error in gets: input of "+id+" is null.";
  }
  return input.value.trim();
}

function getnum(id){
  var input = document.getElementById(id);
  if(input==null){
    throw "Error in getnum: input of "+id+" is null.";
  }
  var y=evals(input.value);
  return y;
}

function statements(s){
  var a = compile(s);
  vcr=0x80; vcg=0x20; vcb=0x80;
  if(cpx>0){
    evalvc(a);
  }else{
    evalv(a);
  }
}

var axiscolor="#909080";
var axiscolor2="#404020";
function axisx(context,x1,shiftx){
  if(gridtype<0) return;
  context.fillStyle = axiscolor;
  var i;
  for(i=1; true; i+=1){
    xbar(i,x1+i*shiftx,context);
    xbar(-i,y1-i*shiftx,context);
    if(getpx(i,0.1)>dw && getpx(-i,0.1)<0) break;
  }
  if(gridtype>0 && bcr>120){
    context.fillStyle = axiscolor2;
  }
  for(i=2; true; i+=2){
    xlabel(i,x1+i*shiftx,context);
    xlabel(-i,x1-i*shiftx,context);
    if(getpx(i,0.1)>dw && getpx(-i,0.1)<0) break;
  }
}

function axisy(context,y1,shifty){
  if(gridtype<0) return;
  context.fillStyle = axiscolor;
  var i;
  for(i=1; true; i++){
    ybar(i,y1+i*shifty,context);
    ybar(-i,y1-i*shifty,context);
    if(getpy(i,0.1)<0 && getpy(-i,0.1)>dh) break;
  }
  if(gridtype>0 && bcr>120){
    context.fillStyle = axiscolor2;
  }
  for(i=1; true; i++){
    ylabel(i,y1+i*shifty,context);
    ylabel(-i,y1-i*shifty,context);
    if(getpy(i,0.1)<0 && getpy(-i,0.1)>dh) break;
  }
}

function hlinea(data,py,a){
  if(py<0 || py>=dh) return;
  for(var i=0; i<dw; i++){
    pset(data,i,py,a);
  }
}

function vlinea(data,px,a){
  if(px<0 || px>=dw) return;
  for(var i=0; i<dh; i++){
    pset(data,px,i,a);
  }
}

function fvline(stack,argc){
  var x,px;
  for(var k=0; k<argc; k++){
    x = stack.pop();
    px = getpx(x,1/wx);
    vlinea(data,px,200);
    vlinea(data,px+1,200);
  }
}

function fhline(stack,argc){
  var y,py;
  for(var k=0; k<argc; k++){
    y = stack.pop();
    py = getpy(y,1/wy);
    hlinea(data,py,200);
    hlinea(data,py+1,200);
  }
}

var gridtype=0;

function setgridtype(stack,argc){
  gridtype = Math.round(stack.pop());
}

function grid(a){
  var px,py;
  var k;
  for(k=1; true; k++){
    px = getpx(k,0.1);
    vlinea(data,px-1,a);
    vlinea(data,px,a);
    if(px>dw) break;
  }
  for(k=1; true; k++){
    px = getpx(-k,0.1);
    vlinea(data,px-1,a);
    vlinea(data,px,a);
    if(px<0) break;
  }
  for(k=1; true; k++){
    py = getpy(k,0.1);
    hlinea(data,py,a);
    hlinea(data,py+1,a);
    if(py<0) break;
  }
  for(k=1; true; k++){
    py = getpy(-k,0.1);
    hlinea(data,py,a);
    hlinea(data,py+1,a);
    if(py>dh) break;
  }
}

function mgrid(){
  var px,py;
  var k;
  grid(100);
  var a=40;
  for(k=1; true; k++){
    px = getpx(k,0.02);
    vlinea(data,px,a);
    if(px>dw) break;
  }
  for(k=1; true; k++){
    px = getpx(-k,0.02);
    vlinea(data,px,a);
    if(px<0) break;
  }
  for(k=1; true; k++){
    py = getpy(k,0.02);
    hlinea(data,py,a);
    if(py<0) break;
  }
  for(k=1; true; k++){
    py = getpy(-k,0.02);
    hlinea(data,py,a);
    if(py>dh) break;
  }
}

function system(){
  if(gridtype<0) return;
  var a=160;
  if(gridtype==1){
    vcr=0xb0; vcg=0xb0; vcb=0x70;
    grid(60); a=220;
  }else if(gridtype==2){
    vcr=0xa0; vcg=0xa0; vcb=0x8a;
    mgrid(); a=220;
  }
  vcr=0x90; vcg=0x90; vcb=0x8a;
  hlinea(data,psy,a);
  hlinea(data,psy-1,a);
  vlinea(data,psx,a);
  vlinea(data,psx-1,a);
}

function getgridtype(){
  var a = document.getElementById("gt");
  gridtype = a.value;
}

function getgridpos(){
  var x = document.getElementById("spsx").value;
  var y = document.getElementById("spsy").value;
  if(x==1) psx=35;
  else if(x==2) psx=dwh;
  else if(x==3) psx=dw-73;
  if(y==1) psy=35;
  else if(y==2) psy=dhh;
  else if(y==3) psy=dh-37;
}

function init(){
  canvas = document.getElementById("canvas1");
  context = canvas.getContext("2d");
  context.font = font;
  context.clearRect(0,0,dw,dh);
  img = context.createImageData(dw,dh);
  data = img.data;
  clear(data,bcr,bcg,bcb);
}

function fplot(){
  var x,y,x0,x2,dx;
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

  init();
  system();

  s = gets("inputf");
  if(s.length>0){
    define("f",s);
    a=gva;
    vcr=cr1; vcg=cg1; vcb=cb1;
    if(s[0]!='#'){
      for(x=x0; x<x2; x+=dx){
        gv1=x;
        y=evalv(a);
        spoint(x,y);
      }
    }
    flush();
  }

  s = gets("inputg");
  if(s.length>0){
    define("g",s);
    a=gva;
    vcr=cr2; vcg=cg2; vcb=cb2;
    if(s[0]!='#'){
      for(x=x0; x<x2; x+=dx){
        gv1=x;
        y=evalv(a);
        spoint(x,y);
      }
    }
    flush();
  }

  s = gets("inputh");
  if(s.length>0){
    define("h",s);
    a=gva;
    vcr=cr3; vcg=cg3; vcb=cb3;
    if(s[0]!='#'){
      for(x=x0; x<x2; x+=dx){
        gv1=x;
        y=evalv(a);
        spoint(x,y);
      }
    }
    flush();
  }

  context.putImageData(img,0,0);
  axisx(context,x1,0.1*wx);
  axisy(context,y1,0.1*wy);
}

function pplot(){
  var x,y,px,py;
  var sx,sy,ax,ay;
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
  init();
  system();

  sx = gets("inputfx");
  if(sx.length>0){
    define("fx",sx);
    ax=gva;
    sy = gets("inputfy");
    define("fy",sy);
    ay=gva;
    vcr=cr1; vcg=cg1; vcb=cb1;
    if(sx[0]!='#'){
      for(t=t1; t<t2; t+=dt){
        gv1=t;
        x=evalv(ax);
        y=evalv(ay);
        spoint(x,y);
      }
    }
    flush();
  }

  sx = gets("inputgx");
  if(sx.length>0){
    define("gx",sx);
    ax=gva;
    sy = gets("inputgy");
    define("gy",sy);
    ay=gva;
    vcr=cr2; vcg=cg2; vcb=cb2;
    if(sx[0]!='#'){
      for(t=t1; t<t2; t+=dt){
        gv1=t;
        x=evalv(ax);
        y=evalv(ay);
        spoint(x,y);
      }
    }
    flush();
  }

  context.putImageData(img,0,0);
  axisx(context,x1,0.1*wx);
  axisy(context,y1,0.1*wy);
}

function iplot_rec(a,x,y,w,h,n){
  var z;
  eqepsilon=h;
  gv1=x; gv2=y;
  z=evalv(a);
  w=w/2;
  if(z!=0){
    if(n==0){
      spoint(x,y);
    }else{
      h=h/3.2;
      iplot_rec(a,x,y,w,h,n-1);
      iplot_rec(a,x+w,y,w,h,n-1);
      iplot_rec(a,x,y+w,w,h,n-1);
      iplot_rec(a,x+w,y+w,w,h,n-1);
    }
  }
}

function iplot_fast(h){
  var x,y,z,px,py,a;
  var dwq,dhq;
  var psxh=psx/2, psyh=psy/2;
  a=gva; dwq=dw/4; dhq=dh/4;
  eqepsilon=h;
  for(px=0; px<dwh; px++){
    for(py=0; py<dhh; py++){
      x = x1+(px-psxh)*wx/dwq;
      y = y1-(py-psyh)*wy/dwq;
      gv1=x; gv2=y;
      z = evalv(a);
      if(z!=0){
        pset4(data,2*px,2*py,200);
      }
    }
  }  
}

function iplot_smooth(h){
  var x,y,z,px,py,a;
  var dwq,dhq;
  var psxh=psx/2, psyh=psy/2;
  a=gva; dwq=dw/4; dhq=dh/4;
  eqepsilon=h;
  for(px=0; px<dwh; px+=0.5){
    for(py=0; py<dhh; py+=0.5){
      x = x1+(px-psxh)*wx/dwq;
      y = y1-(py-psyh)*wy/dwq;
      gv1=x; gv2=y;
      z = evalv(a);
      if(z!=0){
        spoint(x,y);
      }
    }
  }
}

function iplot_hq(h,n){
  var x,y,z,px,py,a;
  var dwq,dhq;
  var psxh=psx/2, psyh=psy/2;
  a=gva; dwq=dw/4; dhq=dh/4;
  var w=wx/dwq;
  
  for(px=0; px<dwh; px++){
    for(py=0; py<dhh; py++){
      x = x1+(px-psxh)*wx/dwq;
      y = y1-(py-psyh)*wy/dwq;
      iplot_rec(a,x,y,w,h,n);
    }
  }  
}

function iplot(){
  var ptype,h;
  x1=0; y1=0;
  pma = getnum("inputa");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputwx");
  wy = getnum("inputwy");
  h = getnum("inputh");
  ptype = document.getElementById("ptype").value;
  getgridtype();
  getgridpos();

  init();
  system();

  define("f",gets("inputf"));
  vcr=cr1; vcg=cg1; vcb=cb1;

  if(ptype=="fast"){
    iplot_fast(h);
  }else if(ptype=="smooth"){
    iplot_smooth(h);
  }else if(ptype=="better"){
    iplot_hq(10*h,4);
  }else if(ptype=="best"){
    iplot_hq(20*h,6);
  }

  flush();
  context.putImageData(img,0,0);
  axisx(context,x1,0.1*wx);
  axisy(context,y1,0.1*wy);
}

function splot(){
  var x,y,x0,x2;
  var a,n1,n2,s;
  pma = getnum("inputa");
  pmb = getnum("inputb");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputwx");
  wy = getnum("inputwy");
  n1 = getnum("inputn1");
  n2 = getnum("inputn2");
  getgridtype();
  getgridpos();

  x0 = x1+getx(0,1/wx);
  x2 = x1+getx(dw,1/wx);
  if(x2<x0){
    var tmp=x0;
    x0=x2; x2=tmp;
  }

  init();
  system();

  s = gets("inputf");
  if(s.length>0){
    define("f",s);
    a=gva;
    vcr=cr1; vcg=cg1; vcb=cb1;
    if(s[0]!='#'){
      for(x=n1; x<=n2; x++){
        gv1=x;
        y=evalv(a);
        cpoint(x,y);
      }
    }
  }

  s = gets("inputg");
  if(s.length>0){
    define("g",s);
    a=gva;
    vcr=cr2; vcg=cg2; vcb=cb2;
    if(s[0]!='#'){
      for(x=n1; x<n2; x++){
        gv1=x;
        y=evalv(a);
        cpoint(x,y);
      }
    }
  }

  s = gets("inputh");
  if(s.length>0){
    define("h",s);
    a=gva;
    vcr=cr3; vcg=cg3; vcb=cb3;
    if(s[0]!='#'){
      for(x=n1; x<n2; x++){
        gv1=x;
        y=evalv(a);
        cpoint(x,y);
      }
    }
  }

  context.putImageData(img,0,0);
  axisx(context,x1,0.1*wx);
  axisy(context,y1,0.1*wy);
}

function shiftam(){
  if(animation){
    shiftani=aniam;
  }else{
    pma=getnum("inputa")-getnum("inputd");
    var inputa = document.getElementById("inputa");
    inputa.value = pma.toFixed(6);
  }
}

function shiftap(){
  if(animation){
    shiftani=aniap;
  }else{
    pma=getnum("inputa")+getnum("inputd");
    var inputa = document.getElementById("inputa");
    inputa.value = pma.toFixed(6);
  }
}

function shiftbm(){
  pma=getnum("inputb")-getnum("inputdb");
  var inputa = document.getElementById("inputb");
  inputa.value = pma.toFixed(6);
}

function shiftbp(){
  pma=getnum("inputb")+getnum("inputdb");
  var inputa = document.getElementById("inputb");
  inputa.value = pma.toFixed(6);
}

function aniam(){
  pma=getnum("inputa")-getnum("inputd");
  var inputa = document.getElementById("inputa");
  inputa.value = pma.toFixed(6);
}

function aniap(){
  pma=getnum("inputa")+getnum("inputd");
  var inputa = document.getElementById("inputa");
  inputa.value = pma.toFixed(6);
}

var shiftani=aniap;
function fani(){
  plot();
  shiftani();
}

var ani_id;
function animate(){
  if(animation){
    animation=false;
    clearInterval(ani_id);
  }else{
    animation=true;
    ani_id = setInterval(fani,100);
  }
}

function ftos(x,n){
  if(typeof(x)=="boolean"){
    error("Error in ftos(x,n): x is of type boolean.");
  }else if(typeof(x)=="function"){
    return "function";
  }else if(typeof(x)=="object"){
    return "("+ftos(x.re,n)+"|"+ftos(x.im,n)+")";
  }
  if(shortmode>0 && x==Math.round(x)){
    return x.toFixed(0);
  }else if(Math.abs(x)<0.01 || Math.abs(x)>=100000){
    return x.toExponential(n).toUpperCase();
  }else{
    return x.toFixed(n);
  }
}

function str(x){
  var type=typeof x;
  if(type=="boolen"){
    error("Error in str(x): x is of type boolen.");
  }else if(type=="function"){
    return "function";
  }else if(type=="string"){
    return '"'+x+'"';
  }else if(type=="object"){
    if(x.im<0){
      return str(x.re)+"-"+str(-x.im)+"i";
    }else{
      return str(x.re)+"+"+str(x.im)+"i";
    }
  }else{
    return x.toString().toUpperCase();
  }
}

function clickidle(event){
  return;
}

function clickxy(event){
  var canvas = document.getElementById("canvas1");
  var px,py;
  px = event.pageX - canvas.offsetLeft - 2,
  py = event.pageY - canvas.offsetTop - 2;
  pmx = getx(px,1/wx)+x1;
  pmy = gety(py,1/wy)+y1;
  var xy = document.getElementById("xy");
  var xdigits=6, ydigits=6;
  if(wx<0.001 || Math.abs(pmx)>=100000) xdigits=12;
  if(wy<0.001 || Math.abs(pmy)>=100000) ydigits=12;
  xy.innerHTML = ftos(pmx,xdigits) + ' | ' + ftos(pmy,ydigits);
}

var click=clickxy;
function clickEvent(event){
  click(event);
}

function initclick(){
  var canvas = document.getElementById("canvas1");
  if(canvas!=null){
    canvas.addEventListener("mousedown", clickEvent, false);
  }
}

function listtos(a){
  var s,i;
  s="[";
  if(a.length>0){
    if(Array.isArray(a[0])){
      s+=listtos(a[0]);
    }else{
      s+=str(a[0]);
    }
  }
  for(i=1; i<a.length; i++){
    if(Array.isArray(a[i])){
      s+=", "+listtos(a[i]);
    }else{
      s+=", "+str(a[i]);
    }
  }
  s+="]";
  return s;
}

function tabtos(a){
  var i,v;
  v=[];
  for(i=0; i<a.length; i++){
    if(Array.isArray(a[i])){
      v.push(listtos(a[i]));
    }else{
      v.push(str(a[i]));
    }
  }
  return v.join("<br>,");
}

function calc(){
  var input = document.getElementById("inputc");
  var ans = document.getElementById("ans");
  if(unspace(input.value)==""){
    ans.innerHTML = "ans = ";
  }else{
    var y = evals(input.value);
    if(y!=null){
      if(Array.isArray(y)){
        ans.innerHTML = ["ans = <br>[",tabtos(y),"]"].join("");
      }else{
        ans.innerHTML = "ans = "+str(y);
        vtab["ans"]={value: y};
      }
    }else{
      ans.innerHTML = "ans = ";
    }
  }
}

function handle_keys(event){
  if(event.keyCode==13){
    plot();
  }
}

function calc_keys(event){
  if(event.keyCode==13){
    calc();
  }
}

window.onload = initclick;


