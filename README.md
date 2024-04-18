<p align="center">
    <a href="https://github.com/less/less-plugin-clean-css/actions?query=branch%3Amaster"><img src="https://github.com/less/less-plugin-clean-css/actions/workflows/build.yml/badge.svg?branch=master" alt="Github Actions CI"/></a>
    <a href="https://www.npmtrends.com/less-plugin-clean-css"><img src="https://img.shields.io/npm/dm/less-plugin-clean-css.svg?sanitize=true" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/less-plugin-clean-css"><img src="https://img.shields.io/npm/v/less-plugin-clean-css.svg?sanitize=true" /></a>
</p>

# less-plugin-clean-css

Compresses the css output from less using [clean-css](https://github.com/jakubpawlowicz/clean-css).

## lessc usage

First of all install less via

```bash
npm install -g less
```

then install the `less-plugin-clean-css`

```bash
npm install -g less-plugin-clean-css
```

and then on the command line,

```bash
lessc file.less --clean-css="--s1 --advanced --compatibility=ie8"
```

See [clean-css](https://github.com/jakubpawlowicz/clean-css/tree/v3.0.1#how-to-use-clean-css-programmatically) for the
available command options - the only differences are `advanced` and `rebase` which we default to false, because it is
not always entirely safe.

## Programmatic usage

```js
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});
less.render(lessString, {plugins: [cleanCSSPlugin]})
    .then(
```

## Browser usage

Browser usage is not supported at this time.
