# Install

```bash
npm install tinybird
```

```js
const tinybird = require('tinybird')
```

# tinybird.dev(src, dest, conf)

* src / String. Path to document directory.
* dest / String. Path to build directory.
* conf / Object / {}.
* conf.port / Integer, String / 8080. Port which is listen by web service.
* conf.dist / Boolean / false. Build for distribution.
* conf.page_size / Integer / 16. Number of items in a result of a query.

Build and serve document.

# tinybird.build(src, dest, conf)

* src / String. Path to document directory.
* dest / String. Path to build directory.
* conf / Object / {}.
* conf.dist / Boolean / false. Build for distribution.

Build documents.

# tinybird.serve(dest, conf)

* dest / String. Path to build directory.
* conf / Object / {}.
* conf.port / Integer / 8080. Port to listen.
* conf.page_size / Integer / 16. Number of items in a result of a query.

Serve build document on HTTP.
