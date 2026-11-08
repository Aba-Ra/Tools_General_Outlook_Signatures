const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('docs/runtime.js', 'utf8');
function harness(options = {}) {
  let handler, timer, completed = 0;
  const inserted = [], senderCallbacks = [];
  let content = options.body || 'My current reply\nQUOTED HISTORY\nMatertec Pty Ltd | Perth WA';
  const item = {
    from: { getAsync(cb) { if (options.delaySender) senderCallbacks.push(cb); else cb(options.senderResult || {status:'ok',value:{emailAddress:options.sender || 'aba.raha@matertec.com'}}); } },
    body: {
      getTypeAsync(cb) { cb(options.typeResult || {status:'ok',value:options.type || 'html'}); },
      setSignatureAsync(value, settings, cb) {
        inserted.push({value, settings});
        if (options.throwSet) throw Error('unsupported');
        if (!options.noSetCallback) cb({status:options.failSet ? 'failed' : 'ok'});
      },
      getAsync() { throw Error('must not read the whole body'); },
      setAsync() { content = 'DESTROYED'; throw Error('must not rewrite the whole body'); }
    }
  };
  const context = {Office:{context:{mailbox:{item}},actions:{associate(name,fn){assert.equal(name,'applyMatertecSignature');handler=fn;}},AsyncResultStatus:{Succeeded:'ok'},CoercionType:{Html:'html',Text:'text'}},setTimeout(fn){timer=fn;return 1;},clearTimeout(){}};
  vm.runInNewContext(source, context);
  return {run(){handler({completed(){completed++;}});},inserted,senderCallbacks,timeout(){timer();},get completed(){return completed;},get content(){return content;}};
}
test('inserts even when quoted history contains a previous signature; never rewrites the body',()=>{
  const h=harness();h.run();assert.equal(h.completed,1);assert.equal(h.inserted.length,1);
  assert.match(h.inserted[0].value,/>Aba Raha<\/strong>/);assert.match(h.inserted[0].value,/Director \| Business Innovation Architect/);
  assert.match(h.inserted[0].value,/width="108" height="150"/);assert.match(h.content,/QUOTED HISTORY/);
});
test('plain text uses a readable signature without HTML markup',()=>{const h=harness({type:'text'});h.run();assert.equal(h.inserted[0].settings.coercionType,'text');assert.doesNotMatch(h.inserted[0].value,/<table/);assert.match(h.inserted[0].value,/Matertec Pty Ltd \| Perth WA/);});
test('unknown senders are outside the pilot',()=>{const h=harness({sender:'unknown@elsewhere.test'});h.run();assert.equal(h.inserted.length,0);assert.equal(h.completed,1);});
test('known shared senders receive their exact role template',()=>{for(const role of ['Info','Admin','Accounts']){const h=harness({sender:role.toLowerCase()+'@matertec.com'});h.run();assert.equal(h.inserted.length,1);assert.match(h.inserted[0].value,new RegExp('>'+role+'</strong><br><br>'));assert.doesNotMatch(h.inserted[0].value,/>Aba Raha<|Business Innovation Architect/);}});
test('Aba to shared From change replaces the previous personal signature region',()=>{for(const role of ['Info','Admin','Accounts']){const h=harness({delaySender:true});h.run();h.senderCallbacks[0]({status:'ok',value:{emailAddress:'aba.raha@matertec.com'}});h.run();h.senderCallbacks[1]({status:'ok',value:{emailAddress:role.toLowerCase()+'@matertec.com'}});assert.equal(h.inserted.length,2);assert.match(h.inserted[0].value,/>Aba Raha<\/strong>/);assert.match(h.inserted[1].value,new RegExp('>'+role+'</strong>'));assert.equal(h.completed,2);}});
test('normalises exact sender identity',()=>{const h=harness({sender:' ABA.RAHA@MATERTEC.COM '});h.run();assert.equal(h.inserted.length,1);});
test('sender lookup failure does not modify the draft',()=>{const h=harness({senderResult:{status:'failed'}});h.run();assert.equal(h.inserted.length,0);assert.equal(h.completed,1);});
test('body type failure does not modify the draft',()=>{const h=harness({typeResult:{status:'failed'}});h.run();assert.equal(h.inserted.length,0);assert.equal(h.completed,1);});
test('unknown body format does not modify the draft',()=>{const h=harness({type:'unknown'});h.run();assert.equal(h.inserted.length,0);});
test('missing signature API completes without modification',()=>{const h=harness();/* independently exercise a minimal unsupported host */let completed=0;vm.runInNewContext(source,{Office:{context:{mailbox:{item:{}}},actions:{associate(_,f){f({completed(){completed++;}});}}},setTimeout(){return 1;},clearTimeout(){}});assert.equal(completed,1);});
test('signature failures finish rather than hang',()=>{for(const options of [{throwSet:true},{failSet:true}]){const h=harness(options);h.run();assert.equal(h.completed,1);}});
test('timeout completes once and ignores a late sender callback',()=>{const h=harness({delaySender:true});h.run();h.timeout();h.senderCallbacks[0]({status:'ok',value:{emailAddress:'aba.raha@matertec.com'}});assert.equal(h.inserted.length,0);assert.equal(h.completed,1);});
test('a newer event prevents a stale sender callback inserting the wrong signature',()=>{const h=harness({delaySender:true});h.run();h.run();h.senderCallbacks[1]({status:'ok',value:{emailAddress:'unknown@elsewhere.test'}});h.senderCallbacks[0]({status:'ok',value:{emailAddress:'aba.raha@matertec.com'}});assert.equal(h.inserted.length,0);assert.equal(h.completed,2);});
test('a stalled signature API still completes at timeout exactly once',()=>{const h=harness({noSetCallback:true});h.run();h.timeout();h.timeout();assert.equal(h.completed,1);});
