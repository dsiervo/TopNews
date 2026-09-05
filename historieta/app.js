const panels = [
{alt:'En casa, mamá lee con Tomi un libro abierto. Él atiende por un momento.',speech:['Shemá quiere decir «escucha».']},
{alt:'Mamá guarda el pan para el abuelo en una cesta con tapa. Tomi se ofrece entusiasmado.',speech:['¡Yo se lo llevo al abuelo!']},
{alt:'Mamá señala el camino llano, pero Tomi ya se marcha con el carrito rojo, la cesta cerrada y una cuerda enrollada.',speech:['Ve por el camino llano…','¡Sí, sí!']},
{alt:'Tomi llega a una bifurcación. Un camino rodea la colina y otro baja directamente hacia la casa del abuelo.',speech:[]},
{alt:'Tomi sonríe y elige la cuesta que parece más corta.',speech:['¡Por aquí llego volando!']},
{alt:'El carrito cargado cruza la cima y empieza a bajar la cuesta. Tomi todavía lo sujeta.',speech:[]},
{alt:'Las ruedas se aceleran. El tirón del carrito sorprende a Tomi.',speech:['Eh… despacito…']},
{alt:'El carrito se escapa cuesta abajo. Tomi corre detrás intentando alcanzar el asa.',speech:['¡DESPACITOOO!']},
{alt:'Al pie de la cuesta hay un charco de barro. El carrito se dirige hacia él y Tomi intenta alcanzarlo.',speech:[]},
{alt:'Las ruedas delanteras se hunden en el barro. El carrito se detiene de golpe, con la cesta bien cerrada.',sfx:'¡CHOF!'},
{alt:'Tomi frena junto al carrito. Una salpicadura le ha dejado la cara llena de barro.',speech:[]},
{alt:'Tomi tira con todas sus fuerzas del asa, pero las ruedas no se mueven.',speech:['Vamos… ¡un poquito!']},
{alt:'Sus zapatos también se hunden mientras intenta tirar hacia atrás.',speech:[]},
{alt:'Tomi termina sentado en la orilla seca. Un zapato se ha quedado pegado en el barro.',speech:['Bueno. Yo sí salí.']},
{alt:'Lila llega por el camino llano. Tomi señala con vergüenza la cuesta por la que bajó.',speech:['¿No venías por el camino?','Tomé un… atajo.']},
{alt:'Lila examina las ruedas hundidas. Tomi se acerca para escuchar su idea.',speech:['Así solo se hunde más.']},
{alt:'Lila señala dos tablas sueltas junto a una cerca. Tomi sigue su mirada.',speech:['Con esas tablas podemos sacarlo.']},
{alt:'Los dos colocan las tablas bajo las ruedas delanteras para formar pequeñas rampas.',speech:[]},
{alt:'Con la cuerda atada al carrito, los niños se colocan en terreno seco. Tomi espera la señal de Lila.',speech:['A la de tres. Una… dos…']},
{alt:'Ambos tiran a la vez. El carrito sube por las tablas y sale del barro.',speech:['¡TRES!']},
{alt:'El carrito está a salvo en el camino. Los niños chocan las manos. La cesta sigue cerrada.',speech:[]},
{alt:'El abuelo abre la puerta. Tomi y Lila llegan despacio con el carrito embarrado y el pan.',speech:['¡Llegó el pan!','Y un poquito de camino.']},
{alt:'En la mesa del jardín, el abuelo abre la cesta: el pan está intacto. Los niños sonríen aliviados.',speech:['¿Una rebanada…?']},
{alt:'El abuelo ofrece una rebanada gigantesca con mermelada. Tomi abre mucho los ojos y Lila se ríe.',speech:['…o una REBANADOTA?']}
];
const rowEdges = [[0,369,752,1104,1536],[0,384,768,1152,1536],[0,383,768,1143,1536]];
const comic=document.querySelector('#comic'),reader=document.querySelector('#reader');let current=0;
function content(i){const p=panels[i],cell=i%8,edges=rowEdges[Math.floor(i/8)],row=Math.floor(cell/2),height=edges[row+1]-edges[row];return `<div class="art scene-${i}" role="img" aria-label="${p.alt}" style="aspect-ratio:512/${height};background-image:url('story-${Math.floor(i/8)+1}.webp');background-size:200% ${1536/height*100}%;background-position:${cell%2*100}% ${edges[row]/(1536-height)*100}%">${(p.speech||[]).map((line,n)=>`<span aria-hidden="true" class="bubble bubble-${n} ${n===0&&[1,4,6,11,13].includes(i)?'bubble-right':''}">${line}</span>`).join('')}${p.sfx?`<span class="sfx" aria-hidden="true">${p.sfx}</span>`:''}</div><span class="sr-only">${(p.speech||[]).join(' ')} ${p.sfx||''}</span>`;}
panels.forEach((p,i)=>{const b=document.createElement('button');b.className='panel';b.innerHTML=content(i);b.setAttribute('aria-label',`Ampliar viñeta ${i+1}`);b.addEventListener('click',()=>open(i));comic.append(b);});
function render(){document.querySelector('#focus-panel').innerHTML=`<article class="reader-card">${content(current)}</article>`;document.querySelector('#reader-title').textContent=`${current+1} / ${panels.length}`;document.querySelector('#counter').textContent=`${current+1} / ${panels.length}`;document.querySelector('#prev').disabled=current===0;document.querySelector('#next').textContent=current===panels.length-1?'Volver a la página ✓':'Siguiente →';reader.scrollTop=0;}
function open(i){current=i;render();reader.showModal();document.body.classList.add('reading');}
function close(){reader.close();}
function next(){if(current<panels.length-1){current++;render();}else close();}
document.querySelector('#start').onclick=()=>open(0);document.querySelector('#close').onclick=close;document.querySelector('#prev').onclick=()=>{if(current>0){current--;render();}};document.querySelector('#next').onclick=next;
reader.addEventListener('close',()=>document.body.classList.remove('reading'));
reader.addEventListener('click',e=>{if(e.target===reader){const r=reader.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
document.addEventListener('keydown',e=>{if(!reader.open)return;if(e.key==='ArrowRight'){e.preventDefault();next();}if(e.key==='ArrowLeft'&&current>0){e.preventDefault();current--;render();}});
