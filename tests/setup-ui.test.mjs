import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mountSetup} from '../src/setup-ui.js';
import {render} from '../src/signature.js';

function screen({email='employee@matertec.com', configured=true, read=async()=>({name:'Employee',email,phone:''})}={}) {
  const ids=['connect','status','preview','account','connection-state','preview-empty','next-step'];
  const elements=Object.fromEntries(ids.map(id=>[id,{
    textContent:'',innerHTML:'',hidden:false,disabled:false,attributes:{},
    replaceChildren(){this.innerHTML='';},setAttribute(k,v){this.attributes[k]=v;},
    removeAttribute(k){delete this.attributes[k];},addEventListener(_,fn){this.click=fn;}
  }]));
  let reads=0;
  mountSetup({office:{context:{mailbox:{userProfile:{emailAddress:email}}}},
    readProfile:async(...args)=>{reads++;return read(...args);},isConfigured:()=>configured,render,
    document:{getElementById:id=>elements[id]}});
  return {e:elements,get reads(){return reads;}};
}
test('opening setup makes no profile request and shows an actionable ready state',()=>{
  const s=screen();assert.equal(s.reads,0);assert.equal(s.e.connect.disabled,false);
  assert.equal(s.e.account.textContent,'employee@matertec.com');
  assert.match(s.e.status.textContent,/Connect your work details/);assert.equal(s.e.preview.hidden,true);
});
test('outside Outlook or before administrator setup cannot start profile access',()=>{
  for(const options of [{email:null},{configured:false}]){
    const s=screen(options);assert.equal(s.reads,0);assert.equal(s.e.connect.disabled,true);
    assert.equal(s.e.connect.click,undefined);assert.match(s.e.status.textContent,/Outlook|administrator/);
  }
});
test('connecting uses the signed-in account on click, escapes the preview and prevents concurrent requests',async()=>{
  let finish;const s=screen({read:(email,interactive)=>{
    assert.equal(email,'employee@matertec.com');assert.equal(interactive,true);
    return new Promise(resolve=>finish=resolve);
  }});
  const pending=s.e.connect.click();await s.e.connect.click();
  assert.equal(s.reads,1);assert.equal(s.e.connect.disabled,true);assert.match(s.e.status.textContent,/Connecting/);
  finish({name:'<script>unsafe</script>',email:'employee@matertec.com',phone:''});await pending;
  assert.equal(s.e.connect.disabled,false);assert.equal(s.e.preview.hidden,false);
  assert.match(s.e.preview.innerHTML,/&lt;script&gt;/);assert.doesNotMatch(s.e.preview.innerHTML,/<script>/);
  assert.equal(s.e['next-step'].hidden,false);assert.match(s.e.status.textContent,/check the signature before sending/);
  assert.equal(s.e.connect.attributes['aria-busy'],undefined);
});
test('a failed refresh removes the previous profile preview and offers a retry',async()=>{
  let fail=false;const s=screen({read:async()=>{
    if(fail)throw Error('private diagnostic must not be displayed');
    return {name:'Employee',email:'employee@matertec.com',phone:''};
  }});
  await s.e.connect.click();assert.equal(s.e.preview.hidden,false);fail=true;
  await s.e.connect.click();assert.equal(s.e.preview.innerHTML,'');assert.equal(s.e.preview.hidden,true);
  assert.equal(s.e['preview-empty'].hidden,false);assert.equal(s.e['next-step'].hidden,true);
  assert.equal(s.e.connect.disabled,false);assert.match(s.e.connect.textContent,/Try connecting again/);
  assert.doesNotMatch(s.e.status.textContent,/private diagnostic/);
});
