const nativeProcess=globalThis.process;
Object.defineProperty(globalThis,'process',{value:undefined,configurable:true,writable:true});
Object.defineProperty(globalThis,'window',{value:globalThis,configurable:true,writable:true});
Object.defineProperty(globalThis,'self',{value:globalThis,configurable:true,writable:true});
Object.defineProperty(globalThis,'navigator',{value:{userAgent:'Mozilla/5.0 Chrome/120',hardwareConcurrency:2},configurable:true});
Object.defineProperty(globalThis,'location',{value:new URL('http://127.0.0.1:8768/index.html'),configurable:true});
Object.defineProperty(globalThis,'crossOriginIsolated',{value:false,configurable:true});
Object.defineProperty(globalThis,'document',{value:{},configurable:true,writable:true});
const voices=['af_heart','af_bella','af_nicole','am_michael','bf_emma','bm_george'];
const result={status:'FAIL',voices:[],modelLoadMs:null};
try {
 const {KokoroTTS,env,setVoiceDataUrl}=await import('../vendor/kokoro-js/kokoro.web.js');
 const base='http://127.0.0.1:8768/';
 env.allowRemoteModels=false; env.allowLocalModels=true; env.localModelPath=base+'vendor/';
 env.wasmPaths={mjs:new URL('../vendor/kokoro-js/wasm/ort-wasm-simd-threaded.jsep.mjs',import.meta.url),wasm:base+'vendor/kokoro-js/wasm/ort-wasm-simd-threaded.jsep.wasm'};
 setVoiceDataUrl(base+'vendor/kokoro-model/voices');
 const t0=Date.now(); const tts=await KokoroTTS.from_pretrained('kokoro-model',{dtype:'q8',device:'wasm'}); result.modelLoadMs=Date.now()-t0;
 for (const voice of voices) {
   const t=Date.now();
   const audio=await tts.generate('Voice test.',{voice,speed:1});
   const samples=audio?.audio ?? audio?.data ?? audio?.samples ?? null;
   result.voices.push({voice,generateMs:Date.now()-t,samples:samples?.length??null,sampleRate:audio?.sampling_rate??audio?.sampleRate??24000,status:(samples?.length??0)>0?'PASS':'FAIL'});
 }
 result.status=result.voices.every(x=>x.status==='PASS')?'PASS':'FAIL';
 nativeProcess.stdout.write(JSON.stringify(result,null,2)+'\n'); nativeProcess.exitCode=result.status==='PASS'?0:2;
} catch(error){result.error=String(error?.stack||error);nativeProcess.stdout.write(JSON.stringify(result,null,2)+'\n');nativeProcess.exitCode=1;}
