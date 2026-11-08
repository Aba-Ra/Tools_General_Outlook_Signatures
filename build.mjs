// Copyright (c) 2026 Matertec Pty Ltd. All rights reserved. See LICENSE.
import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';
const target = 'docs/employee-pilot';
await mkdir(target, {recursive:true});
for (const name of ['runtime', 'setup']) await build({entryPoints:[`src/${name}.js`],outfile:`${target}/${name}.js`,bundle:true,banner:{js:'/*! Copyright (c) 2026 Matertec Pty Ltd. All rights reserved. Third-party components: see THIRD_PARTY_NOTICES.txt. */'},format:'iife',target:'es2020',minify:false,legalComments:'eof'});
