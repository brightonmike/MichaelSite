---
title: 'Babel, Webpack and Gulp, all together now...'
date: 2018-01-29T14:37:38.453Z
image: null
---
On some projects, we might find ourselves using both Gulp and Webpack. But why would you want to do that? It’s important to remember that Webpack is a _bundler_ whereas Gulp is a _task runner_. This is a key difference.

Webpack exists primarily because we often build applications and websites now using frameworks such as React or Angular. These frameworks require us to create our applications out of dozens of different files, usually grouped together in some sort of component structure. That’s all well and good, but things can get messy and hard to maintain. The old way was to stick lots of script tags in our site footers, but this makes managing all these different scripts difficult. We can’t yet reliably depend on native import/exports either, so this is where bundlers come in.

Bundlers take all our JavaScript files and dependancies and roll them together into a single file. At the same time, the file is compressed and we can ensure browser compatibility to suit our project. Although Webpack could be compared to using a concatenation task in Gulp or Grunt, it’s often preferred because it reduces the number of tasks you have to write. For many developers, Webpack also makes managing dependancies and imports much easier.

That said - Webpack does not eliminate entirely the need to use a task runner. For example, if we’re working on a WordPress theme, Webpack is great for the JavaScript but we may still need Gulp for handling other tasks such as image compression, Sass compilation and linting. 

So how do we use them together? Thankfully, webpack-stream is on hand to help. You can install it by running `npm install webpack-stream` and then import it into your Gulpfile as so:

```
webpack = require('webpack-stream')
```
Within our Gulpfile, we can add a simple task like this:
```
gulp.task('build-js', function() {
return gulp.src(path.resolve(__dirname, './assets/app/app.js'))
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('assets/js/'));
});
```
As for the Webpack config file itself, this is pretty simple too.

```
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ["./assets/app/app.js"],
    output: { 
        path: __dirname + "/assets/js",
        filename: 'bullets.js' 
    },
    devtool: "sourcemap",
    externals: {
        "jquery": "jQuery"
    },    
    module: {   
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!bullets-js)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        }
      ]
    }
}
```

It's worth noting I've deliberately left in the exclude parameter. You may not need this, but I found it useful as it allowed me to exclude the `node_modules` folder whilst at the same time bundling any JavaScript libraries I actually needed.

I also found using `babel-preset-env` much more painless than `babel-preset-2015`. The former also allows you to more cleverly specify the browser support you need for your bundle by passing in values to your `.babelrc` file. An example is as follows:

```
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": [
          "last 2 versions",
          "Explorer 10"
        ]
      },
      "debug": true
    }]
  ]
}
```
So there you have it - an example configuration for using Webpack and Gulp together. You can now bundle your JavaScript with Webpack but use Gulp for other tasks you might need for your project.
