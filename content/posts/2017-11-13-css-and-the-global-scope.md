---
title: CSS and the Global scope
date: 2017-11-13T13:51:10.532Z
image: null
---
Over the past few weeks, I’ve been reading and hearing a lot about the CSS in JS methodology. This approach involves writing CSS within the components of a JavaScript project built using frameworks such as React or Angular, as opposed to writing standard CSS/Sass in a separate file that is then globally accessible.

Proponents give a variety of reasons, but the most common is the global scope. In JavaScript and other programming languages, not scoping variables and functions (i.e. they are global) is pretty much universally considered a bad idea.

This is then fed into CSS, where apparently it’s a bad idea there too. The problem with this thought process is that CSS isn’t a programming language. CSS is a language of declaration, it is quite literally just telling the browser “make these elements red and underlined”. So, it doesn’t strike me as particularly wise to bluntly apply the same principles we use for programming to CSS, without paying respect to the fact that on a fundamental level they behave in a completely different manner. With CSS, I feel that  styles ***should*** be global unless they are specific to the component, in which case a simple naming methodology such as BEM seems to serve the purpose well enough.

When I first started using BEM, I was guilty of doing things such as `.header__logo` and `.footer__logo` when the reality is both logo’s were styled exactly the same and I was repeating myself for the sake of a methodology. This is a prime example of understanding scoping in CSS - scope when styles are specific to the component - but when they’re used elsewhere, they should be global.

The CSS in JS methodology instead proposes scoping CSS to each component of a web app. This is applied in various ways. Out of them all, CSS Modules seem nicest as they keep the styles separate from the JavaScript. I’m not keen on directly writing CSS within a JavaScript file, the examples I’ve seen look messy and complicated.

The problem with this approach is, much like my first dealings with BEM class names, you're going to end up with very "wet" (i.e. not DRY!) CSS where you are endlessly repeating the same styles.

I’m aware that the techniques used to achieve CSS in JS do not force all styles to be scoped to a component, but when advocacy against the use of global scope is cited as a primary reason for CSS in JS, I’m worried where that leads us and that many developers will completely ignore the global scope in CSS.
