import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeHandler} from '../src/handler.js';

// Browser timer functions reject a receiver other than Window or undefined.
// Injected timer objects in the other handler tests cannot catch that failure.
test('default browser timers keep the native receiver on early completion', t => {
  let scheduled, cleared, completed = 0;
  t.mock.method(globalThis, 'setTimeout', function(callback, delay) {
    assert.ok(this === undefined || this === globalThis, 'invalid setTimeout receiver');
    assert.equal(delay, 10000);
    scheduled = callback;
    return 42;
  });
  t.mock.method(globalThis, 'clearTimeout', function(timer) {
    assert.ok(this === undefined || this === globalThis, 'invalid clearTimeout receiver');
    cleared = timer;
  });
  const Office = {context:{mailbox:{item:{}}}};
  makeHandler(Office, () => assert.fail('unexpected profile read'))({completed(){completed++;}});
  assert.equal(cleared, 42);
  assert.equal(completed, 1);
  scheduled();
  assert.equal(completed, 1);
});

test('default browser watchdog completes a stalled event exactly once', t => {
  let scheduled, cleared = 0, completed = 0;
  t.mock.method(globalThis, 'setTimeout', function(callback) {
    assert.ok(this === undefined || this === globalThis);
    scheduled = callback;
    return 43;
  });
  t.mock.method(globalThis, 'clearTimeout', function(timer) {
    assert.ok(this === undefined || this === globalThis);
    assert.equal(timer, 43);
    cleared++;
  });
  const Office = {context:{mailbox:{item:{
    from:{getAsync(){}},
    body:{getTypeAsync(){},setSignatureAsync(){}}
  }}}};
  makeHandler(Office, () => assert.fail('unexpected profile read'))({completed(){completed++;}});
  assert.equal(completed, 0);
  scheduled();
  scheduled();
  assert.equal(cleared, 1);
  assert.equal(completed, 1);
});
