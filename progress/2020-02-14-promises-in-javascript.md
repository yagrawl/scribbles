---
title: Promises in Javascript
date: "2020-02-14"
time: "5 mins"
description: What exactly is a callback hell and why we don't need to deal with it anymore.
category: Code
tags: Frontend, Basics
path: /promises-in-javascript
---

A promise is exactly what its name suggests -- it is an assurance of a value
(for an asynchronous operation). Javascript is a single threaded execution model
and asynchronous events like API calls, for example, block the execution of code
succeeding it. A promise acts like a proxy for the value that is to be expected
from the completion of the asynchronous event so the thread doesn't have to wait
for it to finish.

When I started getting into Javascript, promises had already been introduced but
its often important to know where the need stemmed for a particular feature to
truly appreciate it.

## The Need for Promises

Before promises were introduced, asynchronous javascript was handled by
callbacks. A callback is essentially a function passed as an argument to another
function, meant to be called after an async operation completes so as to not
block the thread.

Consider a simple async call to an [xkcd](https://xkcd.com/) API endpoint to get
a random comic using the request library, implemented with callbacks.

```javascript
const request = require('request');

console.log('Init');
let getComics = () => {
  let id = Math.floor((Math.random() * 30) + 1);
  request({
    method: 'GET',
    url: `https://xkcd.com/${id}/info.0.json`
  },
  function (error, response, body) {
    let { safe_title } = JSON.parse(body);
    console.log(safe_title);
  });
};

getComics();
console.log('End');
```

As is clear from the snippet, we log 'Init', then call `getComics()` and
finally log 'End'. If every action was synchronous, we would expect the
following log:

```bash
Init
Serenity is coming out tomorrow #RANDOM COMIC NAME
End
```

But since the call to the XKCD Api is asynchronous, the `getComics()` method
gets called and the execution continues -- logging 'End'. When a value is
received from the API, the callback method gets executed and logs out the comic
name. Here's the actual output:

```bash
Init
End
Serenity is coming out tomorrow #RANDOM COMIC NAME
```

Callbacks seem straightforward enough for simple things but as the codebase gets
complicated, it more often that not turns into a callback hell.

Here's a callback hell example from <http://callbackhell.com/>

```javascript
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```

I don't think it needs any explanation as to how hard to read the above snippet
is and why we would generally like to avoid this kind of thing in our codebase.

Enter **promises**.

## Introduction to Promises
