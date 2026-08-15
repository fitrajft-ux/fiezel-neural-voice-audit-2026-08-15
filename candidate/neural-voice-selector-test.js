const assert=require('assert');
const fs=require('fs');
const vm=require('vm');
const config=require('./features/neural-voice/fiezel-neural-voice-config.js');
const app=fs.readFileSync('./app.js','utf8');
const bootstrap=fs.readFileSync('./features/neural-voice/fiezel-neural-voice-bootstrap.js','utf8');
const audibility=fs.readFileSync('./features/neural-voice/fiezel-neural-voice-audibility-fix.js','utf8');
const expected=['af_heart','af_bella','af_nicole','am_michael','bf_emma','bm_george'];
let failures=0;
function check(name,fn){try{fn();console.log('  ok  ',name)}catch(e){failures++;console.error('  FAIL',name,'-',e.message)}}
(async()=>{
 console.log('neural-voice-selector-test');
 check('catalog exposes six local voices',()=>assert.deepStrictEqual(config.voiceCatalog.map(v=>v.id),expected));
 check('every catalog voice has local binary',()=>expected.forEach(id=>assert.strictEqual(fs.statSync(`vendor/kokoro-model/voices/${id}.bin`).size,522240)));
 check('UI renders a neural voice selector',()=>assert.ok(app.includes('id="neuralVoiceModel"')&&app.includes('Model suara neural')));
 check('voice preference is persisted and sanitized',()=>assert.ok(app.includes("neuralVoice:'af_heart'")&&app.includes('neuralVoice:normalizeNeuralVoice(raw?.preferences?.neuralVoice)')&&app.includes('setNeuralVoiceChoice')));
 check('general TTS uses selected voice by default',()=>assert.ok(app.includes("voice:normalizeNeuralVoice(state.preferences?.neuralVoice),...options")));
 check('preview is neural-only',()=>assert.ok(app.includes("allowFallback:false")&&app.includes('Neural aktif')));
 check('bootstrap can reject instead of silently falling back',()=>assert.ok(bootstrap.includes("options.allowFallback===false")&&bootstrap.includes("neural_voice_cache_incomplete")));
 check('runtime exposes voice catalog',()=>assert.ok(bootstrap.includes("voices:()=>Array.from(root.FiezelNeuralVoiceConfig?.voiceCatalog||[])")));

 let browserCalls=0,runtimeCalls=0;
 const runtime={__audibilityPatched:false,status:()=>({prepared:true,ready:false}),speak:async(text,options)=>{runtimeCalls++;return{provider:'kokoro-local',voice:options.voice}},stop(){}};
 function Utterance(){this.lang='';this.rate=1;}
 const ctx={console,FIEZEL_VERSION:'5.19.0',FiezelVoiceRuntime:runtime,FiezelWebAudioPlayer:{createPlayer:()=>({warm(){}})},speechSynthesis:{getVoices:()=>[],speak(){browserCalls++},cancel(){},paused:false},SpeechSynthesisUtterance:Utterance,localStorage:{getItem:()=>null,setItem(){}},setTimeout,clearTimeout};
 ctx.globalThis=ctx;
 vm.runInNewContext(audibility,ctx);
 const result=await ctx.FiezelVoiceRuntime.speak('hello',{voice:'af_bella'});
 check('prepared-but-not-ready tries neural first',()=>{assert.strictEqual(result.provider,'kokoro-local');assert.strictEqual(runtimeCalls,1);assert.strictEqual(browserCalls,0)});

 let rejected=false;runtime.status=()=>({prepared:true,ready:false});runtime.speak=async()=>{throw new Error('neural_init_failed')};
 try{await ctx.FiezelVoiceRuntime.speak('hello',{allowFallback:false})}catch(e){rejected=/neural_init_failed/.test(String(e.message));}
 check('neural-only mode does not mask failure with browser TTS',()=>{assert.ok(rejected);assert.strictEqual(browserCalls,0)});

 if(failures){console.error(`${failures} gate GAGAL`);process.exit(1)}
 console.log('semua gate neural-voice-selector LOLOS');
})().catch(e=>{console.error(e);process.exit(1)});
