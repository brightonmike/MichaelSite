---
title: Every tiny change matters
date: 2018-12-12T16:58:43.961Z
image: null
---
Before I moved to e-commerce development, I predominantly worked on websites that didn't really _do_ anything tangible. It would be unfair to say they didn't generate revenue for their businesses, they definitely did just that, but without figures and statistics it was always hard to quantify. I never really fully understood the gravity of the effects of my work on a business.

Since moving to e-commerce, it sounds obvious, but the hard reality is that every little HTML tag suddenly takes on a whole new level of importance. Take this humble line of code from a React component:

```
<button styleName="js-action__button" id={elId} />
```

There's nothing really wrong with it. It's an empty div tag which a bunch of JS hooks on to. But in Firefox, it didn't work. The following, however, did:

```
<div styleName="js-action__button" id={elId} />
```

This seems kinda strange. But what was happening is that the JS hooking onto the element was creating a button within an iframe. In Firefox, the events attached to the button within the iframe were being cancelled. This is technically correct - you shouldn't have buttons within buttons. 

Unfortunately for us, or rather me... this small mistake meant a payment processor wouldn't work on a client site, potentially costing them revenue from missed sales. It's a really tough thing to confront a mistake where you know it cost a client. And it's not easy to be putting this out there, but I want to fess up, because I see a greater value in sharing this story as a healthy reminder that no matter how small your change, you should test thoroughly. Even if it does make me look bad.

I didn't test properly and I assumed my change was so small and insignificant that it couldn't possibly go wrong. _But it was me that was wrong. _

The good news is... it's of course fixed now, and a hard but valuable lesson has been learned.
