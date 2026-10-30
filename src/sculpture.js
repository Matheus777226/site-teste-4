// Lightweight 3D surface, projected onto canvas. No WebGL or external assets required.
export function createSculpture(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width, height, frame, active = true, pointer = 0, scroll = 0;
  const rings = 88, segments = 80;
  const vertices = [];
  for (let i = 0; i <= rings; i++) {
    const v = i / rings * Math.PI;
    const row = [];
    for (let j = 0; j <= segments; j++) {
      const u = j / segments * Math.PI * 2;
      const y = Math.cos(v);
      const profile = Math.sin(v);
      const front = Math.exp(-Math.pow((u - Math.PI / 2) / .43, 2));
      const nose = .34 * Math.exp(-Math.pow((y - .04) / .18, 2)) * front;
      const lips = .09 * Math.exp(-Math.pow((y + .28) / .06, 2)) * front;
      const eye = -.08 * Math.exp(-Math.pow((y - .28) / .1, 2)) * front;
      const groove = 1 + .014 * Math.sin(v * 108);
      row.push([Math.cos(u) * profile * (.61 + y * .08) * groove, y * 1.2, Math.sin(u) * profile * .58 * groove + nose + lips + eye]);
    }
    vertices.push(row);
  }
  const normalize = a => { const l = Math.hypot(...a) || 1; return a.map(v=>v/l); };
  function draw(time=0) {
    ctx.clearRect(0,0,width,height);
    const angle = -.5 + pointer * .12 + (reduced.matches ? 0 : Math.sin(time*.00019)*.09) + scroll*.00012;
    const scale = Math.min(width*.43,height*.36);
    const centerX = width*.50, centerY = height*.49;
    const projected = vertices.map(row => row.map(([x,y,z]) => {
      const X=x*Math.cos(angle)+z*Math.sin(angle), Z=-x*Math.sin(angle)+z*Math.cos(angle);
      const tilt=-.12, Y=y*Math.cos(tilt)-X*Math.sin(tilt), XX=y*Math.sin(tilt)+X*Math.cos(tilt);
      return [centerX+XX*scale,centerY-Y*scale,Z,XX,Y];
    }));
    const faces=[];
    for(let i=0;i<rings;i++) for(let j=0;j<segments;j++) {
      const a=projected[i][j],b=projected[i+1][j],c=projected[i+1][j+1],d=projected[i][j+1];
      faces.push({a,b,c,d,z:(a[2]+b[2]+c[2]+d[2])/4,i});
    }
    faces.sort((a,b)=>a.z-b.z);
    ctx.shadowBlur=0;
    for(const {a,b,c,d,i} of faces){
      const u=[b[3]-a[3],b[4]-a[4],b[2]-a[2]],v=[d[3]-a[3],d[4]-a[4],d[2]-a[2]];
      const n=normalize([u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]);
      const diffuse=Math.abs(n[0]*-.6+n[1]*.55+n[2]*.55);
      const spec=Math.pow(Math.abs(n[0]*-.5+n[1]*.2+n[2]*.84),22);
      const bands=i%3===0?.77:1;
      const light=(.15+diffuse*.57+spec*.6)*bands;
      ctx.fillStyle=`rgb(${Math.min(255,211*light)},${Math.min(255,178*light)},${Math.min(255,128*light)})`;
      ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.lineTo(c[0],c[1]);ctx.lineTo(d[0],d[1]);ctx.closePath();ctx.fill();
      ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=.45;ctx.stroke();
    }
  }
  let last=0;
  function animate(t){if(!active||reduced.matches)return;if(t-last>45){draw(t);last=t;}frame=requestAnimationFrame(animate);}
  function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio,1.5);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  new ResizeObserver(resize).observe(canvas);
  const observer = new IntersectionObserver(([entry])=>{active=entry.isIntersecting;cancelAnimationFrame(frame);if(active&&!reduced.matches)frame=requestAnimationFrame(animate);});observer.observe(canvas);
  window.addEventListener('pointermove',e=>{pointer=e.clientX/innerWidth-.5;},{passive:true});
  window.addEventListener('scroll',()=>{scroll=window.scrollY;},{passive:true});
  reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);draw();if(active&&!reduced.matches)frame=requestAnimationFrame(animate);});
  document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);if(!document.hidden&&active&&!reduced.matches)frame=requestAnimationFrame(animate);});
  resize();
}
