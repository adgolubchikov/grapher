//Mathematical parser
let fsys=/^(sin|cos|tan|asin|acos|atan|abs|floor|ceil|exp|sqrt)$/i;
let fmy=/^(sec|csc|cot|sech|csch|coth|sinh|cosh|tanh|asinh|acosh|atanh|asec|acsc|acot|asech|acsch|acoth|ln|log|u)$/i;

function sec(x) { return 1/Math.cos(x); }
function csc(x) { return 1/Math.sin(x); }
function cot(x) { return 1/Math.tan(x); }
function asec(x) { return Math.acos(1/x); }
function acsc(x) { return Math.asin(1/x); }
function acot(x) { return Math.atan(1/x); }
function ln(x) { return Math.log(x); }
function log(x) { return Math.log(x)/Math.log(10); }
function sinh(x) { return (Math.exp(x)-Math.exp(-x))/2; }
function cosh(x) { return (Math.exp(x)+Math.exp(-x))/2; }
function tanh(x) { return (Math.exp(x)-Math.exp(-x))/(Math.exp(x)+Math.exp(-x)); }
function asinh(x) { return Math.log(x+Math.sqrt(x*x+1)); }
function acosh(x) { return Math.log(x+Math.sqrt(x*x-1)); }
function atanh(x) { return 0.5*Math.log((1+x)/(1-x)); }
function sech(x) { return 2/(Math.exp(x)+Math.exp(-x)); }
function csch(x) { return 2/(Math.exp(x)-Math.exp(-x)); }
function coth(x) { return (Math.exp(x)+Math.exp(-x))/(Math.exp(x)-Math.exp(-x)); }
function asech(x) { return Math.log(1/x+Math.sqrt(1/x/x-1)); }
function acsch(x) { return Math.log(1/x+Math.sqrt(1/x/x+1)); }
function acoth(x) { return 0.5*Math.log((1+x)/(1-x)); }
function u(x) { return (x>=0); }

function haselement(v,e) {for(let i=0;i<v.length;i++) if(v[i]==e) return true;return false;}

function fixpowers(v) {
  if(v==null) { return null; }
  for(i=0;i<v.length;i++) {
    if(Array.isArray(v[i])) { v[i]=fixpowers(v[i]); if(v[i]==null) { return null; } }
  }
  for(var i=0;i<v.length;i++) {
    if(v[i]=='^') {
      if(v[i-1]==null||v[i+1]==null) { return null; }
      v.splice(i-1,3,new Array('Math.pow',new Array('(',v[i-1],',',v[i+1],')')));
      i-=2;
    }
  }
  return v;
}
function fixfunctions(v) {
  if(v==null) { return null;}
  for(i=0;i<v.length;i++) {
    if(Array.isArray(v[i])) {
      v[i]=fixfunctions(v[i]);
      if(v[i]==null) {return null;} 
    }
  }
  for(var i=0;i<v.length;i++) {
    if(!Array.isArray(v[i])) {
      if(v[i].match(fsys)) {
        if(v[i+1]==null) {return null;}
        v[i]='Math.'+v[i].toLowerCase();
        v.splice(i,2,new Array('(',v[i],v[i+1],')'));
        i--;
      } else if(!(v[i]==null) && v[i].match(fmy)) {
        if(v[i+1]==null) {return null;}
        v[i]=v[i].toLowerCase();
        v.splice(i,2,new Array('(',v[i],v[i+1],')'));
        i--;
      }
    }
  }
  return v;
}

function js(eq,vars) {
  let tokens;
  let e,i;
  let pstart=-1,pend;
  if(vars==""||vars==null) vars="x";
  if(vars=="-") vars="__NONE__";
  e=eq.replace(/ /g,"");
  e=e.replace(/([0-9])([a-df-z]|[a-z][a-z]|\()/ig,"$1*$2");
  e=e.replace(/(\))([0-9a-df-z]|[a-z][a-z]|\()/ig,"$1*$2");
  e=e.replace(/([a-z0-9\.])([^a-z0-9\.])/ig,"$1 $2");
  e=e.replace(/([^a-z0-9\.])([a-z0-9\.])/ig,"$1 $2");
  e=e.replace(/(\-|\)|\()/g," $1 ");
  tokens=e.split(/ +/);
  for(i=0;i<tokens.length;i++) {
    tokens[i]=tokens[i].replace(/ /g,"");
    tokens[i]=tokens[i].replace(/_/g,".");
    if(tokens[i]=='') { tokens.splice(i,1);i--; }
    else if(tokens[i]=='pi') { tokens[i]='3.14159265358979'; }
    else if(tokens[i]=='e') { tokens[i]='2.718281828459045'; }
    else if(tokens[i].length>0 && tokens[i].match(/^[a-z][a-z0-9]*$/i) && !tokens[i].match(new RegExp("^"+vars+"$","i")) && !tokens[i].match(fsys) && !tokens[i].match(fmy)) { return null; }
  }
  while(haselement(tokens,'(')||haselement(tokens,')')) {
    pstart=-1;
    for(i=0;i<tokens.length;i++) {
      if(tokens[i]=='(') pstart=i;
      if(tokens[i]==')'&&pstart==-1) { return null; }
      if(tokens[i]==')'&&pstart!=-1) {
        tokens.splice(pstart,i-pstart+1,tokens.slice(pstart,i+1));
        i=-1;
        pstart=-1;
      }
    }
    if(pstart!=-1) { return null; }
  }
  tokens=fixfunctions(tokens);
  tokens=fixpowers(tokens);
  if(tokens==null) { return null; }
  return joinarray(tokens);
}


function joinarray(v) {var t="";for(var i=0;i<v.length;i++){if(Array.isArray(v[i])){ t+=joinarray(v[i]);}else{t+=v[i];}}return t;}


//END Mathematical parser
