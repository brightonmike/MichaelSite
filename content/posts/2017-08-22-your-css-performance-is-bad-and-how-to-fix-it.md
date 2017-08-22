---
title: 'Your CSS performance is bad, and how to fix it'
date: 2017-08-21T13:18:12.455Z
image: null
---
If you’re active in the developer community, you’ll know that performance is a hotly discussed topic. When it comes to JavaScript, there’s plenty of chatter online about how to improve performance. It’s also interesting to note that on the home pages for Angular.js and Vue.js, performance is one of the key features of the particular framework.

But CSS performance is critical too. Much like JavaScript, changes in CSS can affect the smoothness of interaction between your website or app and your users. We all hate laggy interfaces that get in the way of what we’re trying to do, so delivering high-performant front-end is a critical part of your role.

In order to optimise effectively, we need to understand how a browser takes our code and renders the page on the users screen. It does so following a process of a “pixels-to-screen” pipeline: JavaScript, Styles, Layout, Paint, Composite. A detailed explanation of the pixels-to-screen pipeline is written by Paul Lewis: https://developers.google.com/web/fundamentals/performance/rendering/

As explained in the article, there are three common reasons we may require the page to re-run through the pixels-to-screen pipeline. Each one is a performance consideration. We are primarily either requiring a change in layout, a re-paint of elements as a result of changing aesthetic styles, or a re-composite as a result of multiple layers or scrolling.
