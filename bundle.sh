npm install -g uglify-js browserify

browserify lib/browser.js | uglifyjs > public/bundle.js
