let canvas=id('canvas');
canvas.height=(innerHeight-id('header').clientHeight)*window.devicePixelRatio;
canvas.width=innerWidth*window.devicePixelRatio;

const R=window.devicePixelRatio;
const H=id('header').clientHeight;

canvas.style.height=(innerHeight-id('header').clientHeight)+'px';
canvas.style.width=innerWidth+'px';

let xmin=-5, xmax=5, ymin=-5*(canvas.height/canvas.width), ymax=5*(canvas.height/canvas.width);

let ctx=canvas.getContext('2d');

draw();


let move = false;
let dialog = document.querySelector('dialog');
dialogPolyfill.registerDialog(dialog);



function add() {
	let html='';
	html+='<span class="function">';
	html+='f'+id('formulatype').innerHTML.substr(1,4)+id('userinput').value.toLowerCase();
	html+='</span>\
		<i class="material-icons remove" onclick="remove(this)">cancel</i>\
        <input type="color" class="edit" value="';
    html+=id('colorpicker').value;
    html+='" style="width:10%;" onchange="draw()">';
	let newf=document.createElement('span');
	newf.className='mdl-layout-title formula';
	newf.innerHTML=html;
	id('list').appendChild(newf);
	dialog.close();
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


function setxy() {
	id('formulatype').innerHTML='x(y)=';
}

function setyx() {
	id('formulatype').innerHTML='y(x)=';
}
