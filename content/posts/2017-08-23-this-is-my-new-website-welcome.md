---
title: 'New website!'
date: 2017-08-23T15:36:07.516Z
image: null
---
Over the past few weeks I’ve been dipping in and out of working on a simple new personal site, and this is it. I hope you like it. During the process, I experimented with some new ideas and technologies, here’s a brief run through.

CSS Variables
-------------

I've only used them a little bit for some font-sizing, but it works as follows:

<pre><code class="language-scss">:root {
--body-font-size: 16px;
}</code></pre>

I can then use the variables in my CSS like so:

<pre><code class="language-scss">p {
	font-size: var(--body-font-size);
}</code></pre>

For variables that I want to be able to easily re-define such as font-sizes, CSS variables seem really helpful. Sass variables are immutable, whereas CSS variables are not. I think that really, both still have an important role and there doesn't need to be a discussion on using one or the other - they're not mutually exclusive.

Service Worker
-------------

This site uses a basic service worker. I confess I didn't write the code for this one, but when I have more time, I'm going to delve into it and get a clearer idea of the nuts and bolts. For now, it dishes up a nice "offline" page and helps the site perform better, especially across flaky connections.

CSS Scroll Behaviour
-------------

We all need smooth scroll sometimes, especially for jump links. Normally we do this using JavaScript which can be a chore on performance. Sadly though, this only works on Firefox. However, it can be enabled in Chrome under experimental web features, so the future for this property looks good.

<pre><code class="language-scss">body {
	scroll-behavior: smooth;
}</code></pre>

CSS Grid
-------------

And lastly, CSS Grid! I've used CSS Grid to layout some of the home page. It's been a great learning exercise and thus far I'm enjoying using it. That said, it takes some getting used to, and how it behaves with variable content can take a bit of getting your head around. Check out [this](https://michaelgunner.co.uk/posts/2017-08-23-a-fully-responsive-grid-system-with-four-lines-of-css/) blog post for an example.

So I hope you like the site. Some stuff probably won't work in Internet Explorer or other browsers. I'll build in some fallbacks when I get more time. Meanwhile, here are my Lighthouse scores which show the site scores really well as a progressive web app, as well as for accessibility and performance.

![Image shows how the site scored in a lighthouse performance test. It scored 91/100 for progressive web app, 99/100 for performance, 100/100 for accessibility and 92/100 for best practices.](/images/uploads/Screen Shot 2017-08-23 at 16.32.02.png)


