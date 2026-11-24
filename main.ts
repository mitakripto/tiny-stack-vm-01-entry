// Tiny stack VM for make.fun's tiny ISA (kit: generator/subject/ISA.md).
// Faithful to the reference VM: wrapping 32-bit arithmetic, all ten traps
// with their own exit codes, 1M step limit, 64K output limit.
import{mkdirSync as A,readdirSync as B,readFileSync as F,writeFileSync as W}from"node:fs";
function run(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
let s=0,c=0,o=0,i=0,x=0,t=0,z=0,w=0,u="";
const P=()=>{if(!s)throw 2;return D[--s]},U=v=>{if(s>255)throw 3;D[s++]=v};
try{for(;;){
if(t===1e6)throw 10;
if(x<0||x>=p.length)throw 9;
const g=p[x],m=g===1?1:g===2?4:g>=48&&g<52?2:0,n=x+1+m;
if(n>p.length)throw 9;
t++;x=n;
if(g>15&&g<35&&g!==23&&g!==27&&g!==31){
const y=P(),a=P();let r;
if(g<19)r=g<17?a+y:g<18?a-y:Math.imul(a,y);
else if(g<23){if(!y)throw 4;r=g<20?a/y:g<21?a%y:g<22?(a>>>0)/(y>>>0):(a>>>0)%(y>>>0)}
else if(g<27)r=g<25?a&y:g<26?a|y:a^y;
else if(g<31)r=g<29?a<<(y&31):g<30?a>>(y&31):a>>>(y&31);
else r=g<33?(a===y?1:0):g<34?(a<y?1:0):(a>>>0)<(y>>>0)?1:0;
D[s++]=r;
}else switch(g){
case 0:return[O.subarray(0,o),0];
case 1:U((p[n-1]<<24)>>24);break;
case 2:U(p[n-4]|p[n-3]<<8|p[n-2]<<16|p[n-1]<<24);break;
case 3:P();break;
case 4:if(!s)throw 2;U(D[s-1]);break;
case 5:if(s<2)throw 2;z=D[s-1];D[s-1]=D[s-2];D[s-2]=z;break;
case 6:if(s<2)throw 2;U(D[s-2]);break;
case 7:if(s<3)throw 2;z=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=z;break;
case 23:if(!s)throw 2;D[s-1]=-D[s-1];break;
case 27:if(!s)throw 2;D[s-1]=~D[s-1];break;
case 48:case 49:case 50:z=((p[n-2]|p[n-1]<<8)<<16)>>16;if(g===48||(g===49)===(P()===0))x=n+z;break;
case 51:if(c>63)throw 7;C[c++]=n;x=p[n-2]|p[n-1]<<8;break;
case 52:if(!c)throw 8;x=C[--c];break;
case 64:if(!s)throw 2;z=D[s-1];if(z<0||z>255)throw 6;D[s-1]=M[z];break;
case 65:z=P();w=P();if(z<0||z>255)throw 6;M[z]=w;break;
case 80:u=String(P());if(o+u.length>65536)throw 11;for(let k=0;k<u.length;)O[o++]=u.charCodeAt(k++);break;
case 81:z=P();if(o>65535)throw 11;O[o++]=z&255;break;
case 82:U(i<q.length?q[i++]:-1);break;
case 83:return[O.subarray(0,o),P()&255];
default:throw 5;
}
}}catch(e){return[O.subarray(0,o),+e||0]}
}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",V=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const id of B(I).sort()){
const[r,e]=run(F(I+"/"+id+"/program.bin"),F(I+"/"+id+"/input.bin"));
A(V+"/"+id,{recursive:true});
W(V+"/"+id+"/stdout.bin",r);
W(V+"/"+id+"/exit.txt",e+"\n");
}
