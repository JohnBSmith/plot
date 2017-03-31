
// "use strict";
var phi;
var dgrid=false;
click=clickidle;

function evalv2(a,x1,x2){
  var y,tmp1,tmp2;
  tmp1=gv1; tmp2=gv2;
  gv1=x1; gv2=x2;
  y=evalv(a);
  gv1=tmp1; gv2=tmp2;
  return y;
}

function define2(id,s){
  var a = compile(s);
  gva=a;
  var f = function(x,y){
    return evalv2(a,x,y);
  };
  ftab2[id]=f;
  return f;
}

function shiftphim(){
  phi = (getnum("inputphi")-10);
  if(phi<0) phi+=360;
  var input = document.getElementById("inputphi");
  input.value = phi.toFixed(2);
}

function shiftphip(){
  phi = (getnum("inputphi")+10);
  if(phi>=360) phi-=360;
  var input = document.getElementById("inputphi");
  input.value = phi.toFixed(2);
}

function point3d(m,c,s,x,y,z){
  var xt,yt,xp,yp,px,py;
  xt = c*x-s*y;
  yt = s*x+c*y;
  xp = -xt+yt;
  yp = z-xt/2-yt/2;
  // px = getpx(xp*m,0.1);
  // py = getpy(yp*m,0.1);
  // psets(data,px,py);
  px = psx+0.1*360*xp*m;
  py = psy-0.1*360*yp*m;
  fpsets(px,py);
}

function plotfn3d(a){
  var x,y,z;
  var d,n,shift;
  var w,m,c,s;

  pma = getnum("inputa");
  w = getnum("inputw")/10.0;
  m = getnum("inputm")/2;
  n = getnum("inputn");
  phi = -(getnum("inputphi")-90)*Math.PI/180;
  c = Math.cos(phi);
  s = Math.sin(phi);

  shift=10/n;
  if(dgrid) d=0.5; else d=1;
  for(y=-10; y<=10; y+=d){
    for(x=-10; x<=10; x+=shift){
      gv1=w*x; gv2=w*y;
      z = evalv(a);
      point3d(m,c,s,x,y,z/w);
    }
  }
  for(x=-10; x<=10; x+=d){
    for(y=-10; y<=10; y+=shift){
      gv1=w*x; gv2=w*y;
      z = evalv(a);
      point3d(m,c,s,x,y,z/w);
    }
  }
}

function plot3d(){
  var s,a;
  init();

  s = gets("inputg");
  if(s.length>0 && s[0]!='#'){
    define2("g",s);
    a=gva;
    vcr=0xb0; vcg=0xb0; vcb=0xa0;
    plotfn3d(a);
  }

  s = gets("inputf");
  if(s.length>0 && s[0]!='#'){
    define2("f",s);
    a=gva;
    vcr=0x80; vcg=0x90; vcb=0xa0;
    plotfn3d(a);
  }

  context.putImageData(img,0,0);
}

function switchdg(){
  dgrid=!dgrid;
  plot3d();
}

function pplot3d(){
  var u,v,x,y,z;
  var i,d,input,shift;
  var m,c,s;
  var ax,ay,az;
  var nu,nv,u1,u2,v1,v2;
  var mu,mv;

  pma = getnum("inputa");
  m = getnum("inputm")/2;
  u1 = getnum("inputu1");
  u2 = getnum("inputu2");
  v1 = getnum("inputv1");
  v2 = getnum("inputv2");
  mu = getnum("inputmu");
  mv = getnum("inputmv");
  nu = getnum("inputnu");
  nv = getnum("inputnv");
  phi = -(getnum("inputphi")-90)*Math.PI/180;
  c = Math.cos(phi);
  s = Math.sin(phi);

  init();
  input = gets("inputx");
  define2("x",input);
  ax=gva;
  input = gets("inputy");
  define2("y",input);
  ay=gva;
  input = gets("inputz");
  define2("z",input);
  az=gva;
  vcr=0x80; vcg=0x90; vcb=0xa0;

  d=(v2-v1)/mv;
  v=v1;
  shift=(u2-u1)/nv;
  for(i=0; i<=mv; i++){
    for(u=u1; u<=u2; u+=shift){
      gv1=u; gv2=v;
      x = evalv(ax);
      y = evalv(ay);
      z = evalv(az);
      point3d(m,c,s,x,y,z);
    }
    v+=d;
  }
  d=(u2-u1)/mu;
  u=u1;
  shift=(v2-v1)/nu;
  vcr=0x70; vcg=0x70; vcb=0x90;
  for(i=0; i<=mu; i++){
    for(v=v1; v<=v2; v+=shift){
      gv1=u; gv2=v;
      x = evalv(ax);
      y = evalv(ay);
      z = evalv(az);
      point3d(m,c,s,x,y,z);
    }
    u+=d;
  }
  context.putImageData(img,0,0);
}

function isoplot(){
  var x,y,px,py,z,n;
  var a,c,K,s,dwq,dhq;
  x1=0; y1=0;

  pma = getnum("inputa");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputwx");
  wy = getnum("inputwy");
  n = getnum("inputn")/10;

  init();
  s = gets("inputf");
  define2("f",s);
  a=gva;
  vcr=0; vcg=0; vcb=0x80;
  dwq=dw/4; dhq=dh/4;
  var psxh=psx/2, psyh=psy/2;
  for(px=0; px<dwh; px++){
    for(py=0; py<dhh; py++){
      x = x1+(px-psxh)*wx/dwq;
      y = y1-(py-psyh)*wy/dwq;
      gv1=x; gv2=y;
      z = evalv(a);
      c = 1-Math.pow((1+Math.cos(2*n*Math.PI*z))/2,4);
      K = Math.floor(255*(2*c+1)/3);
      vcr=Math.floor(255*c);
      vcb=K; vcg=K;
      pset4(data,2*px,2*py,180);
    }
  }
  vcr=0x20; vcg=0x20; vcb=0x20;
  hlinea(data,psy,200);
  hlinea(data,psy-1,200);
  vlinea(data,psx,200);
  vlinea(data,psx-1,200);
  context.putImageData(img,0,0);
  axiscolor = "#202020";
  axisx(context,x1,0.1*wx);
  axisy(context,y1,0.1*wy);
}

function clickiso(event){
  var canvas = document.getElementById("canvas1");
  var px,py,z;
  px = event.pageX - canvas.offsetLeft - 2,
  py = event.pageY - canvas.offsetTop - 2;
  eventx = getx(px,1/wx)+x1;
  eventy = gety(py,1/wy)+y1;  
  var xy = document.getElementById("xy");
  z = ftab2.f(eventx,eventy);
  xy.innerHTML = "x=" + ftos(eventx,6) + " | y=" + ftos(eventy,6)
  + " | f(x,y)="+ftos(z,6);
}

function color_from_to(x,c1,c2){
  if(x<0) x=0;
  else if(x>1) x=1;
  vcr=c1[0]*(1-x)+c2[0]*x;
  vcg=c1[1]*(1-x)+c2[1]*x;
  vcb=c1[2]*(1-x)+c2[2]*x;
}

function line(a,x1,y1,x2,y2){
  var x,y,t;
  var dx,dy,r,d;
  dx = x2-x1; dy=y2-y1;
  r = Math.sqrt(dx*dx+dy*dy);
  d=0.01/r;
  for(t=0; t<1; t+=d){
    x=(x2-x1)*t+x1;
    y=(y2-y1)*t+y1;
    a.push([x,y]);
  }
}

function arrow(data,xp,yp,phi){
  var x,y,px,py,c,s;
  var a=[];
  line(a,0,0,0.34,0);
  line(a,0.34,0,0.24,0.07);
  line(a,0.34,0,0.24,-0.07);
  c = Math.cos(phi);
  s = Math.sin(phi);
  for(var i=0; i<a.length; i++){
    x = c*a[i][0]-s*a[i][1]+xp;
    y = s*a[i][0]+c*a[i][1]+yp;
    px = getpx(x,0.1);
    py = getpy(y,0.1);
    psets(data,px,py);
  }
}

function getphi(x,y,r){
  if(y==0 && x<0){
    return Math.PI;
  }
  return sgn(y)*Math.acos(x/r);
}

var afx,afy;

function vplot(){
  var fx,fy,r,c,m;
  var s,phi;
  
  pma = getnum("inputa");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputwx");
  wy = getnum("inputwy");
  m = getnum("inputm");
  getgridtype();
  getgridpos();

  init();
  system();
  s = gets("input1");
  define2("fx",s);
  afx=gva;
  s = gets("input2");
  define2("fy",s);
  afy=gva;
  vcr=40; vcg=40; vcb=40;

  var x,y;
  for(y=-10; y<10; y+=0.5){
    for(x=-10; x<10; x+=0.5){
      gv1=0.1*wx*x+x1;
      gv2=0.1*wy*y+y1
      fx = evalv(afx);
      fy = evalv(afy);
      r = Math.sqrt(fx*fx+fy*fy);
      phi = getphi(fx,fy,r);
      color_from_to(0.1*m*r,[200,200,255],[255,100,100]);
      arrow(data,x,y,phi);
    }
  }
  
  vcr=0; vcg=0; vcb=0;
  flush();
  axiscolor="#000000";
  axiscolor2="#000000";
  context.putImageData(img,0,0);
  axisx(context,x1,0.1*wx);
  axisy(context,y1,0.1*wy);
}

function clickvplot(event){
  var canvas = document.getElementById("canvas1");
  var px,py,fx,fy;
  px = event.pageX - canvas.offsetLeft - 2,
  py = event.pageY - canvas.offsetTop - 2;
  eventx = getx(px,1/wx)+x1;
  eventy = gety(py,1/wy)+y1;  
  var xy = document.getElementById("xy");
  fx = ftab2.fx(eventx,eventy);
  fy = ftab2.fy(eventx,eventy);
  xy.innerHTML = "(x,y)=("+ftos(eventx,4)+"|"+ftos(eventy,4)
  + "), f(x,y)=("+ftos(fx,4)+"|"+ftos(fy,4)+")";
}

var ODEn=1;

function solve(data,s,m,h){
  var n=ODEn;
  var i,j,px,py,adg;
  var x0,vx={};
  var vy=[],vy0=[],v=[];
  vtab.x=vx;
  vy.push({});
  vtab.y=vy[0];
  for(i=1; i<n; i++){
    vy.push({});
    vtab["y"+i]=vy[i];
  }
  x0=getnum("inputx0");
  vy0.push(getnum("inputy0"));
  v.push(0);
  for(i=1; i<n; i++){
    vy0.push(getnum("inputy"+i+"0"));
    v.push(0);
  }
  adg = compile(s);
  vcr=cr1; vcg=cg1; vcb=cb1;
  vx.value=x0;
  var a=[], b=[];
  for(i=0; i<n; i++){
    vy[i].value=vy0[i];
  }
  for(i=1; i<m; i++){
    spoint(vx.value,vy[0].value);
    a.push(vy[0].value);
    vx.value=x0+h*i;
    v[n-1] = evalv(adg)*h+vy[n-1].value;
    for(j=n-2; j>=0; j--){
      v[j] = vy[j+1].value*h+vy[j].value;
    }
    for(j=0; j<n; j++){
      vy[j].value=v[j];
    }
  }
  for(i=0; i<n; i++){
    vy[i].value=vy0[i];
  }
  for(i=1; i<m; i++){
    b.push(vy[0].value);
    vx.value=x0-h*i;
    v[n-1] = -evalv(adg)*h+vy[n-1].value;
    for(j=n-2; j>=0; j--){
      v[j] = -vy[j+1].value*h+vy[j].value;
    }
    for(j=0; j<n; j++){
      vy[j].value=v[j];
    }
    spoint(vx.value,vy[0].value);
  }
  delete vtab.x;
  delete vtab.y;
  for(i=1; i<n; i++){
    delete vtab["y"+i];
  }
  var yplus = interpolate_equidistant(x0,h,a);
  var yminus = interpolate_equidistant(x0,-h,b);
  return function(x){
    return x<0? yminus(x): yplus(x);
  };
}

function setn(){
  ODEn = Math.round(getnum("inputn"));
  if(ODEn<1) ODEn=1;
  var yn = document.getElementById("yn");
  yn.innerHTML = "y"+ODEn+" = ";
}

function dplot(){
  var s,x2,dx,x,y;
  var n,h,x0,a,m;
  pma = getnum("inputa");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputwx");
  wy = getnum("inputwy");
  n = getnum("inputn");
  h = getnum("inputh");
  m = getnum("inputm");
  getgridtype();
  getgridpos();

  x0=x1+getx(0,1/wx);
  x2=x1+getx(dw,1/wx);
  if(x2<x0){
    var tmp=x0;
    x0=x2; x2=tmp;
  }
  dx=Math.abs(wx)/1000;
  init();
  system();

  s = gets("input1");
  if(s.length>0 && s[0]!='#'){
    ftab["y"] = solve(data,s,m,h);
    flush();
  }

  s = gets("inputf");
  if(s.length>0){
    define("f",s);
    a = gva;
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

function evalv3(a,x1,x2,x3){
  var y,tmp1,tmp2,tmp3;
  tmp1=gv1; tmp2=gv2; tmp3=gv3;
  gv1=x1; gv2=x2; gv3=x3;
  y=evalv(a);
  gv1=tmp1; gv2=tmp2; gv3=tmp3;
  return y;
}

function define3(id,s){
  var a = compile(s);
  gva=a;
  var f = function(x,y,z){
    return evalv3(a,x,y,z);
  };
  ftab3[id]=f;
  return f;
}

function drand(a,b){
  return Math.round(rand(a,b));
}

function pset16(data,x,y,a){
  x+=drand(-2,2);
  y+=drand(-2,2);
  pset4(data,x,y,a);
  pset4(data,x,y+2,a);
  pset4(data,x+2,y,a);
  pset4(data,x+2,y+2,a);
}

function iplot3d(){
  var x,y,z,xt,yt,px,py;
  var a,d,input,h,n,shift;
  var xp,yp;
  var w,m,c,s,u;

  pma = getnum("inputa");
  w = getnum("inputw")/10.0;
  m = getnum("inputm")/2;
  phi = -(getnum("inputphi")-90)*Math.PI/180;
  n = getnum("inputn");
  h = getnum("inputh");
  eqepsilon=h;
  c = Math.cos(phi);
  s = Math.sin(phi);

  init();
  input = gets("inputf");
  define3("f",input);
  a=gva;

  shift=40/n;
  if(dgrid) d=0.5; else d=1;
  for(z=-10; z<=10; z+=shift){
    for(x=-10; x<=10; x+=shift){
      for(y=-10; y<=10; y+=shift){
        gv1=w*x; gv2=w*y; gv3=w*z;
        vcr=color256(40*z);
        vcg=color256(40*z);
        vcb=color256(-40*z);
        u = evalv(a);
        if(u!=0){
          xt = c*x-s*y;
          yt = s*x+c*y;
          xp = -xt+yt;
          yp = z-xt/2-yt/2;
          px = getpx(xp*m,0.1);
          py = getpy(yp*m,0.1);
          pset16(data,px,py,100);
        }
      }
    }
  }

  context.putImageData(img,0,0);
}


var dsplot_type=0;

function solve_system(data,s1,s2,m,h){
  var x0,y0,v0;
  x0=getnum("inputx0");
  y0=getnum("inputy0");
  v0=getnum("inputv0");
  if(Array.isArray(y0)){
    for(var i=0; i<y0.length; i++){
      euler_system(data,s1,s2,m,h,x0,y0[i],v0);
    }
  }else if(Array.isArray(v0)){
    for(var i=0; i<v0.length; i++){
      euler_system(data,s1,s2,m,h,x0,y0,v0[i]);
    }
  }else{
    euler_system(data,s1,s2,m,h,x0,y0,v0);
  }
}

function euler_system(data,s1,s2,m,h,x0,y0,v0){
  var i,px,py,ay,av;
  var ty,tv;
  var vx={},vy={},vv={};
  vtab.x=vx; vtab.y=vy; vtab.v=vv;

  ay = compile(s1);
  av = compile(s2);
  vx.value=x0;
  vy.value=y0;
  vv.value=v0;
  for(i=1; i<m; i++){
    if(dsplot_type=="yx"){
      spoint(vx.value,vy.value);
    }else if(dsplot_type=="vx"){
      spoint(vx.value,vv.value);
    }else{
      spoint(vy.value,vv.value);
    }
    vx.value=x0+h*i;
    ty = evalv(ay)*h+vy.value;
    tv = evalv(av)*h+vv.value;
    vy.value=ty; vv.value=tv;
  }
  vy.value=y0;
  vv.value=v0;
  for(i=1; i<m; i++){
    vx.value=x0-h*i;
    ty = -evalv(ay)*h+vy.value;
    tv = -evalv(av)*h+vv.value;
    vy.value=ty; vv.value=tv;
    if(dsplot_type=="yx"){
      spoint(vx.value,vy.value);
    }else if(dsplot_type=="vx"){
      spoint(vx.value,vv.value);
    }else{
      spoint(vy.value,vv.value);
    }
  }
  delete vtab.x;
  delete vtab.y;
  delete vtab.v;
}

function dsplot(){
  var s,s1,s2;
  var x2,dx,shiftx,shifty;
  var n,h;
  pma = getnum("inputa");
  x1 = getnum("inputx");
  y1 = getnum("inputy");
  wx = getnum("inputwx");
  wy = getnum("inputwy");
  h = getnum("inputh");
  var m = getnum("inputm");
  dsplot_type = gets("type");
  getgridtype();
  getgridpos();

  x2=wx+x1;
  dx=wx/1000;
  shiftx=0.1*wx;
  shifty=0.1*wy;

  init();
  system();

  s1 = gets("input1");
  s2 = gets("input2");
  vcr=cr1; vcg=cg1; vcb=cb1;
  if(s1.length>0){
    if(s2.length==0){
      solve_system(data,s1,"",m,h);
    }else{
      solve_system(data,s1,s2,m,h);
    }
  }

  s = gets("inputf");
  if(s.length>0){
    define("f",s);
    a = gva;
    vcr=cr3; vcg=cg3; vcb=cb3;
    if(s[0]!='#'){
      for(x=x1-wx; x<x2; x+=dx){
        gv1=x;
        y=evalv(a);
        spoint(x,y);
      }
    }
  }

  context.putImageData(img,0,0);
  axisx(context,x1,shiftx);
  axisy(context,y1,shifty);
}

