import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const TI=new Int8Array(256).fill(-1),TP=new Int8Array(256),TQ=new Int8Array(256);
const set=(o,i,a,b)=>{TI[o]=i;TP[o]=a;TQ[o]=b;};
set(0,0,0,0);set(1,1,0,1);set(2,4,0,1);set(3,0,1,0);set(4,0,1,2);set(5,0,2,2);set(6,0,2,3);set(7,0,3,3);
for(let o=16;o<=34;o++)if(o!==23&&o!==27)set(o,0,2,1);
set(23,0,1,1);set(27,0,1,1);
set(48,2,0,0);set(49,2,1,0);set(50,2,1,0);set(51,2,0,0);set(52,0,0,0);
set(64,0,1,1);set(65,0,2,0);set(80,0,1,0);set(81,0,1,0);set(82,0,0,1);set(83,0,1,0);
function run(p,q){
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
 let s=0,c=0,ol=0,ip=0,pc=0,n=0;
 const L=p.length;
 const end=e=>[O.slice(0,ol),e];
 for(;;){
  if(n===1e6)return end(10);
  if(pc<0||pc>=L)return end(9);
  const op=p[pc],im=TI[op];
  if(im<0)return end(5);
  if(pc+im>=L)return end(9);
  n++;
  const nx=pc+1+im,po=TP[op],pu=TQ[op];
  if(s<po)return end(2);
  if(s-po+pu>256)return end(3);
  pc=nx;
  switch(op){
   case 0:return end(0);
   case 1:D[s++]=(p[nx-1]<<24)>>24;break;
   case 2:D[s++]=p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24);break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;}
   case 6:D[s]=D[s-2];s++;break;
   case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 48:case 49:case 50:{
    const r=((p[nx-2]|(p[nx-1]<<8))<<16)>>16;
    let k=op===48;
    if(op!==48){const v=D[--s];k=op===49?v===0:v!==0;}
    if(k)pc=nx+r;
    break;}
   case 51:
    if(c===64)return end(7);
    C[c++]=nx;pc=p[nx-2]|(p[nx-1]<<8);break;
   case 52:
    if(c===0)return end(8);
    pc=C[--c];break;
   case 64:{const a=D[s-1];if(a<0||a>=256)return end(6);D[s-1]=M[a];break;}
   case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>=256)return end(6);s-=2;M[a]=v;break;}
   case 80:{const t=String(D[s-1]);if(ol+t.length>65536)return end(11);s--;for(let i=0;i<t.length;i++)O[ol++]=t.charCodeAt(i);break;}
   case 81:if(ol+1>65536)return end(11);O[ol++]=D[--s]&255;break;
   case 82:D[s++]=ip<q.length?q[ip++]:-1;break;
   case 83:return end(D[--s]&255);
   default:{
    const b=D[s-1],a=D[s-2];
    let r;
    if(op===16)r=(a+b)|0;
    else if(op===17)r=(a-b)|0;
    else if(op===18)r=Math.imul(a,b);
    else if(op===19){if(b===0)return end(4);r=a===-2147483648&&b===-1?a:(a/b)|0;}
    else if(op===20){if(b===0)return end(4);r=b===-1?0:a%b|0;}
    else if(op===21){if(b===0)return end(4);r=Math.floor((a>>>0)/(b>>>0))|0;}
    else if(op===22){if(b===0)return end(4);r=(a>>>0)%(b>>>0)|0;}
    else if(op===24)r=a&b;
    else if(op===25)r=a|b;
    else if(op===26)r=a^b;
    else if(op===28)r=a<<(b&31);
    else if(op===29)r=a>>(b&31);
    else if(op===30)r=(a>>>(b&31))|0;
    else if(op===32)r=a===b?1:0;
    else if(op===33)r=a<b?1:0;
    else r=(a>>>0)<(b>>>0)?1:0;
    s-=2;D[s++]=r;
   }
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input';
const O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
 let o=new Uint8Array(0),e=0;
 try{
  [o,e]=run(new Uint8Array(readFileSync(join(I,id,'program.bin'))),new Uint8Array(readFileSync(join(I,id,'input.bin'))));
 }catch{}
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),o);
 writeFileSync(join(O,id,'exit.txt'),e+'\n');
}
