---
title: The future of WordPress
date: 2017-11-27T14:00:34.322Z
image: null
---
There are two fascinating ongoing developments with WordPress that look set to shake up how we work with and build WordPress websites.

The first is Calypso, an entirely new dashboard built from the ground up, which is already available to use: https://developer.wordpress.com/calypso/

The second is a re-imagining of the post/page editor, called Gutenberg: https://wordpress.org/plugins/gutenberg/

What's most interesting about both is that they are built as SPAs or Single-Page Applications. They're doing this by being written in JavaScript with React views, and piping data to and from WordPress using the native REST API.

So, what does this mean for the future of WordPress?

Calypso and Gutenberg seem to me to be a strong signal of intent to move WordPress firmly away from it's current PHP based structure (including the current way we build themes), towards an API-powered SPA structure that theoretically allows developers to build onto WordPress using whatever front-end framework they choose. This could be React, but possibly Vue.js or even Angular.

I suspect that in a couple of years time we may reach a point where coding PHP themes and plugins for WordPress no longer works. Instead, we'll be building onto WordPress using the API, React, and only using PHP to manipulate the API endpoints and create new data models.

The bottom line for anyone that builds with WordPress is that you are more than likely going to need to get up to speed with ES6, React and SPA JavaScript in order to be able to continue working with WordPress for the next few years. If you're skeptical of this view, consider that the co-creator of WordPress Matt Mullenweg, who is currently leading the Gutenberg project, has clearly vocalise that WordPress developers should [start more deeply learning JavaScript.](http://wesbos.com/learn-javascript/)

At the agency I work at, we've already started learning how to build WordPress themes in React, which will give us a competitive advantage and help us start building using the new WordPress stack in advance of it potentially becoming forced upon us. I would highly recommend all WordPress developers follow suit and also become as familiar as they can with JavaScript and ES6.
