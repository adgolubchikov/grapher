
function id(e){return document.getElementById(e)}
function cl(e){return document.getElementsByClassName(e)}
function ln(x) { return Math.log(x); }
function lg(x) { return Math.log(x)/Math.log(10); }
function lb(x) { return Math.log(x)/Math.log(2); }



function mkscr() {
    id('screenshot').href = document.getElementsByTagName('canvas')[0].toDataURL();
    id('screenshot').click();
}

function getx(x) {
	return Math.round((x-xmin)*canvas.width/(xmax-xmin));
}

function gety(y) {
	return Math.round((ymax-y)*canvas.height/(ymax-ymin));
}


yx=function(f,color,id)
  {
  eval('func=function(x){ return '+js(f)+';}');
  ctx.beginPath();
  ctx.fillStyle=color;
  ctx.strokeStyle=color;
  ctx.fillRect(25*R,(id*15*R)-3*R,12*R,12*R);
  ctx.font='';
  ctx.fillText('y='+f,45*R,(id*15*R)+5*R);
  
  ctx.lineWidth=R*2;

  x = xmin;

  y=func(x);

  xlast=x;
  ylast=y;
  xprelast=xlast;
  yprelast=ylast;

  for(x = xmin;x <= xmax; x += (xmax-xmin)/canvas.width)
    {              
    y=func(x);
    if ( isNaN(x) || x === false || y === false || isNaN(y)) { continue; }
    pixel_x = getx(x);
    pixel_y = gety(y);
    
    if ( pixel_y < -1e6 || pixel_y > 1e6 || pixel_x < -1e6 || pixel_x > 1e6 ) { continue; }
    
    if (((!isNaN(y)) && (!isNaN(ylast)) && (!isNaN(yprelast))) && (((ylast>y) && (yprelast>ylast)) || ((ylast<y) && (yprelast<ylast))))
      {
	  ctx.moveTo(getx(xlast),gety(ylast));
	  ctx.lineTo(getx(x),gety(y));
      }
    else
      {
	  ctx.fillRect(pixel_x,pixel_y,1,1);
      }
    xprelast=xlast;
    yprelast=ylast;
    xlast=x;
    ylast=y;
    }
  ctx.stroke();
  }

xy=function(f,color,id)
  {
  eval('func=function(y){ return '+js(f,'y')+';}');
  ctx.beginPath();
  ctx.fillStyle=color;
  ctx.strokeStyle=color;
  ctx.fillRect(25*R,(id*15*R)-3*R,12*R,12*R);
  ctx.font='';
  ctx.fillText('x='+f,45*R,(id*15*R+5*R));
  
  ctx.lineWidth=R*2;

  y = ymin;

  x=func(y);

  ylast=y;
  xlast=x;
  yprelast=ylast;
  xprelast=xlast;

  for(y = ymin;y <= ymax; y += (ymax-ymin)/canvas.height)
    {
    x=func(y);
    if ( isNaN(y) || y === false || x === false || isNaN(x)) { continue; }
    pixel_x = getx(x);
    pixel_y = gety(y);
    
    if ( pixel_y < -1e6 || pixel_y > 1e6 || pixel_x < -1e6 || pixel_x > 1e6 ) { continue; }
    
    if (((!isNaN(x)) && (!isNaN(xlast)) && (!isNaN(xprelast))) && (((xlast>x) && (xprelast>xlast)) || ((xlast<x) && (xprelast<xlast))))
      {
	  ctx.moveTo(getx(xlast),gety(ylast));
	  ctx.lineTo(getx(x),gety(y));
      }
    else
      {
	  ctx.fillRect(pixel_x,pixel_y,1,1);
      }
    xprelast=xlast;
    yprelast=ylast;
    xlast=x;
    ylast=y;
    }
  ctx.stroke();
  }

function round(x) {
	let lgx=lg(x);
	let std=x*Math.pow(10,-Math.floor(lgx));

	if (std<=1.5) { return 1*Math.pow(10,Math.floor(lgx)); }
	if ((std>1.5) && (std<=2.5)) { return 2*Math.pow(10,Math.floor(lgx)); }
	if ((std>2.5) && (std<=3.5)) { return 3*Math.pow(10,Math.floor(lgx)); }
	if ((std>3.5) && (std<=4.5)) { return 4*Math.pow(10,Math.floor(lgx)); }
	if ((std>4.5) && (std<=7.5)) { return 5*Math.pow(10,Math.floor(lgx)); }
	if ((std>7.5) && (std<=10)) { return 10*Math.pow(10,Math.floor(lgx)); }
	
}

function axis() {
  ctx.font=15*R+'px Arial black';
  let basex,basey,unit_x,unit_y,pixel_x,pixel_y;
  
  ctx.fillStyle='#ffffff';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#cccccc';
  ctx.strokeStyle='#cccccc';
  ctx.beginPath();

ctx.lineWidth=R;

    basex=Math.min((xmax-xmin)/5,(ymax-ymin)/5);
    basex=round(basex);


  basey=basex;


  for (unit_x=0;unit_x<xmax;unit_x+=basex)
    {
    pixel_x=getx(unit_x);
    ctx.moveTo(pixel_x,0);
    ctx.lineTo(pixel_x,canvas.height);
    } 
  for (unit_x=0;unit_x>xmin;unit_x-=basex)
    {
    pixel_x=getx(unit_x);
    ctx.moveTo(pixel_x,0);
    ctx.lineTo(pixel_x,canvas.height);
    } 
	
	

  for (unit_y=0;unit_y<ymax;unit_y+=basey)
    {
    pixel_y=gety(unit_y);
    ctx.moveTo(0, pixel_y);
    ctx.lineTo(canvas.width, pixel_y);
    }
  for (unit_y=0;unit_y>ymin;unit_y-=basey)
    {
    pixel_y=gety(unit_y);
    ctx.moveTo(0, pixel_y);
    ctx.lineTo(canvas.width, pixel_y);
    }
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle='#000000';
  ctx.strokeStyle='#000000';


  ctx.rect(0,0,canvas.width-1,canvas.height-1);
  ctx.moveTo(0,gety(0));
  ctx.lineTo(canvas.width,gety(0));
  ctx.moveTo(getx(0),0);
  ctx.lineTo(getx(0),canvas.height);



  for (unit_x=0;unit_x<xmax;unit_x+=basex)
    {
    pixel_x=getx(unit_x);
    ctx.fillText(prettify(unit_x),pixel_x,15*R);
    ctx.fillText(prettify(unit_x),pixel_x,canvas.height-10);
    }
  for (unit_x=0;unit_x>xmin;unit_x-=basex)
    {
    pixel_x=getx(unit_x);
    ctx.fillText(prettify(unit_x),pixel_x,15*R);
    ctx.fillText(prettify(unit_x),pixel_x,canvas.height-10);
    }

  for (unit_y=0;unit_y<ymax;unit_y+=basey)
    {
    pixel_y=gety(unit_y);
    ctx.fillText(prettify(unit_y),5*R, pixel_y);
    ctx.fillText(prettify(unit_y),canvas.width-5*R-(R*8*prettify(unit_y).toString().length), pixel_y);
    }
  for (unit_y=0;unit_y>ymin;unit_y-=basey)
    {
    pixel_y=gety(unit_y);
    ctx.fillText(prettify(unit_y),5*R, pixel_y);
    ctx.fillText(prettify(unit_y),canvas.width-5*R-(R*8*prettify(unit_y).toString().length), pixel_y);
    }

  ctx.stroke();
  }

function prettify(x) {
  if ((x<1e-10) && (x>-1e-10)) return 0;
  if ((x>-0.001) && (x<0.001) && (x!=0)) return x.toPrecision(3);
  if ((x>1000) || (x<-1000)) return x.toPrecision(2);
  return Math.round(x*1000)/1000;
  }



// EVENT HANDLERS

  id('canvas').onmouseover=function(e)
    {
    e.preventDefault();
	
    }
  
  id('canvas').onmousedown=function(e)
    {
    e.preventDefault();
	
    startx=e.pageX*R;
    starty=(e.pageY-H)*R;
	move=true;
    }

  id('canvas').onmousemove=function(e)
    {
    e.preventDefault();
    if (move)
	  {
	  dx=xmax-xmin;
      dy=ymax-ymin;
      xmin-=((e.pageX*R-startx)/canvas.width)*dx;
      xmax-=((e.pageX*R-startx)/canvas.width)*dx;
      ymin+=(((e.pageY-H)*R-starty)/canvas.height)*dy;
      ymax+=(((e.pageY-H)*R-starty)/canvas.height)*dy;
      setTimeout(draw(),15);
      startx=e.pageX*R;
      starty=(e.pageY-H)*R;
	  }
    }
  
  id('canvas').onmousewheel=function(e)
    {
	var delta = 0;
    if(e.wheelDelta)
      { // IE/Opera. 
      delta = e.wheelDelta/120;
      }
    else
      {
      if (e.detail)
        { // Mozilla case. 
        delta = -e.detail/3;
        }
      }
      if(delta>0)
        {
        zoom(1.1);
        }
      else
        {
        if(delta<0)
          {
          zoom(0.9);
          }
        else
          {
          if(delta)
            {
            zoom(1);
            }
          }
        }
	}
  
  id('canvas').onmouseup=function(e)
    {
    e.preventDefault();
	move=false;
    
    }




  id('canvas').ontouchstart=function(e)
    {
    e.preventDefault();

    startx=e.targetTouches[0].pageX*R;
    starty=(e.targetTouches[0].pageY-H)*R;
    move=true;
	if (e.targetTouches.length==2)
	  {
      dx=event.targetTouches[0].pageX*R-event.targetTouches[1].pageX*R;
      dy=(event.targetTouches[0].pageY-H)*R-(event.targetTouches[1].pageY-H)*R;
      window.d0=Math.sqrt(dx*dx+dy*dy);
      }
    }
  
  id('canvas').ontouchmove=function(e)
    {
    e.preventDefault();
	switch (e.targetTouches.length)
	  {
	  case 1:
	  if (move)
	    {
	    dx=xmax-xmin;
        dy=ymax-ymin;
        xmin-=((e.targetTouches[0].pageX*R-startx)/canvas.width)*dx;
        xmax-=((e.targetTouches[0].pageX*R-startx)/canvas.width)*dx;
        ymin+=(((e.targetTouches[0].pageY-H)*R-starty)/canvas.width)*dy;
        ymax+=(((e.targetTouches[0].pageY-H)*R-starty)/canvas.width)*dy;
        
        draw();


        startx=e.targetTouches[0].pageX*R;
        starty=(e.targetTouches[0].pageY-H)*R;
	    }
      else
	    {
	  
	    }
	  break;
	  case 2:
	  if (typeof(d0)=='undefined')
	    {
        dx=event.targetTouches[0].pageX*R-event.targetTouches[1].pageX*R;
        dy=(event.targetTouches[0].pageY-H)*R-(event.targetTouches[1].pageY-H)*R;
        window.d0=Math.sqrt(dx*dx+dy*dy);
		}
	  else
		{
	    dx=e.targetTouches[0].pageX*R-e.targetTouches[1].pageX*R;
        dy=(e.targetTouches[0].pageY-H)*R-(e.targetTouches[1].pageY-H)*R;
        d=Math.sqrt(dx*dx+dy*dy);
        zoom(d/d0);

        d0=d;
	    }
	  break;
	  default:
	  }
	}
  
  id('canvas').ontouchend=function(e)
    {
    e.preventDefault();
    draw();
    }
// END EVENT HANDLERS


function draw() {
	let active=[], colour=[];
	let formulas=document.querySelectorAll('.formula')
    for (i = 0; i < formulas.length; i++) {
	    active.push(formulas[i].children[0].innerHTML);
		colour.push(formulas[i].children[2].value);
	}
	axis();

    for (i=0;i<active.length;i++) {
		if (active[i].substr(0,4)=='f(x)') {
			yx(active[i].substr(5,active[i].length-5),colour[i],i+1);
		}
		else {			
			xy(active[i].substr(5,active[i].length-5),colour[i],i+1);
		}
	}
}


function zoom(x){
  dx=xmax-xmin;
  dy=ymax-ymin;
  if ((dx<0.1) && (x>1)) return false;
  if ((dx>1e6) && (x<1)) return false;
  xmin+=dx*((1-1/x)/2);
  xmax-=dx*((1-1/x)/2);
  ymin+=dy*((1-1/x)/2);
  ymax-=dy*((1-1/x)/2);

  draw();
  }


function remove(child) {
    let formulas=cl('formula');
    for (i = 0; i < formulas.length; i++) {
        if (formulas[i] === child.parentNode) {
            formulas[i].parentNode.removeChild(formulas[i]);
        }
    }
    draw();
}

