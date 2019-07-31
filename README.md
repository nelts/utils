# @nelts/utils

utils for nelts

# Usage

```bash
npm i @nelts/utils
```

by ts:

```ts
import * as utils from '@nelts/utils';
```

## utils.LRU

```ts
import { LRU, LRU_OPTIONS, LRU_VALUE } from '@nelts/utils';
const lru = new LRU<string>(1000);
lru.set('abc', 123, { maxAge: 10000 });
lru.get('abc', { maxAge: 10000 });
lru.keys();
```

## utils.IsJson

```ts
import { IsJson } from '@nelts/utils';
IsJson('abc'); // false
IsJson({ a: 1 }); // true
```

## utils.Compose

```ts
import { Context } from '@nelts/netls';
import { Compose, ComposeNextCallback, ComposeMiddleware, ComposedMiddleware } from '@nelts/utils';
const ctx = new Context();
const stacks: ComposeMiddleware<Context>[] = [];
stacks.push(async (ctx: Context, next: ComposeNextCallback) => await next());
stacks.push(async (ctx: Context, next: ComposeNextCallback) => await next());
stacks.push(async (ctx: Context, next: ComposeNextCallback) => await next());
const fnMiddleware = Compose<Context>(stacks);
fnMiddleware(ctx[, fn: ComposeMiddleware]).then(() => {}).catch(e => {});
```

## utils.Require

abc.ts

```ts
export const a = 1;
export default () => {}
```

```ts
import { Require, RequireDefault } from '@nelts/utils';
const { a, default } = Require<{ a: number, default: () => {} }>('abc.ts');
const fn = RequireDefault<() => {}>('abc.ts'); // fn == () => {}
```

## utils.Collect

```ts
import { Collect, COLLECT_OPTIONS, DEFINE_PLUGIN_OPTIONS, PLUGIN_COLLECT_RESULT, NELTS_PACKAGE_JSON_INTERFACE } from '@nelts/utils';
Collect(cwd: string, node_module_path: string, options: COLLECT_OPTIONS): PLUGIN_COLLECT_RESULT;
```

## utils.AjvChecker

```ts
import { AjvChecker } from '@nelts/utils';
AjvChecker({
  type: 'object',
  properties: {
    a: {
      type: 'integer',
      default: 1
    }
  }
}, { a: 2 });
```

## utils.ErrorInject

```ts
import { ErrorInject } from '@nelts/utils';
ErrorInject(stream: Stream, error: (err: Error) => void): Stream;
```

## utils.EventEmitter

```ts
import { EventEmitter } from '@nelts/utils';
const e = new EventEmitter();
e.on('abc', async (c: string) => console.log(c));
e.emit('abc', 'x').then(() => {}).catch(e => {});
```

# License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, yunjie (Evio) shen
