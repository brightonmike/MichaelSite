---
title: Clear Site Data through Node.js
date: '2019-01-21 03:07pm'
---
Sometimes, we need ways to clear browser data. Currently, this is a bit of a mess. Some browser data such as localStorage has defined methods for clearing. Other browser data, such as cookies, gets a bit more tricky. For example, HTTP cookies cannot be cleared through JavaScript.

Thankfully, a new HTTP header is on it's way to make life a little easier. It's defined as \`Clear-Site-Data\` and we can pass parameters as a comma-separate string to dictate what we want to clear.

In Node.js, this is pretty easily done. For example:

\`res.setHeader('Clear-Site-Data', '"cache", "cookies"');\`

This is a neat way of handling clearing of browser data under situations such as token expiry or logging out. It won't work in Edge or Safari yet, and the spec may still change. But Clear-Site-Data looks like a promising new way to more elegantly handle deletion of browser data.
