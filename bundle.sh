npm install -g uglify-js browserify

browserify lib/browser.js | uglifyjs --mangle --compress > public/bundle.js
