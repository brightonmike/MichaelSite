---
title: 'Speeding up Magento: Part 1'
date: 2018-03-16T11:17:53.689Z
---
Somehow…I have found myself working as a front-end developer at a Magento agency. After years of working with WordPress, my interest in creating brochure CMS sites had waned. I’ll always love it, and love working with it, but the challenge aspect had gone from my role. It had kinda become a bit too routine.

One of the biggest criticisms of Magento is how slow it is. By default, Magento (2) dishes up dozens of CSS and JS files as well as a mark-up structure that can be difficult to extend without increasing the level of complexity exponentially. You can quickly lose control, and use of the Bluefoot CMS module adds more layers of complexity to the front-end.

Magento 2 does allow you to bundle your JS, but if you do, the resulting file will be large, usually over 1mb. Loading 1mb of render blocking JS in your head is a pretty bad idea. It will minify, cache and bundle much of your styles, which helps, but loading all your styles up front for a fairly complicated system in a render blocking manner is again not brilliant for performance.

Magento 2 also doesn't optimise images out of the box, and does not have any lazy loading functionality. Considering how many un-avoidable images you may be loading on product pages and category pages, this is frustrating for performance.

The end result is many pages weighing in at several MB. On some builds we have inherited, page weight has been as high as 8/9MB. This is even on mobile. Not only is the end result a slow site, but a site which rinses it's visitors data usage. Overall, things are not looking great for performance, and many Magento 2 sites feel sluggish when loading.

But a challenge laid down is a challenge accepted. So let's find ways of trimming down the fat. Magento is going on a diet.

## Lazy-loading

Part one of this series is about lazy loading. It's a technique that's helpful for reducing what we can call "initial" page load. Effectively, images, iframes and videos that sit outside of the visible viewport on page load, are not loaded. Instead, they are only loaded when the user scrolls down to where this content resides. As a result, lazy loading can speed up initial page loads, delivering content to the user more quickly. They also won't lose data spent downloading any images or other media that they never actually see - so there are data savings too.

But - lazy loading has always been a bit of an issue as it usually hooks onto scrolling. As we know, attaching too many events to scrolling, firing too often, has a negative effect on in-browser performance. Websites can start suffering from [jank](http://jankfree.org/). Additionally, lazy loading can cause computationally expensive reflows as images load in to the page on scroll. Reflows are also a UX issue, as it can be irritating to the use when the page jumps around. So we need a solution that solves both these problems. If you're thinking about using getBoundingClientRect() instead, this is also bad news for performance as it causes the browser to re-layout the entire page.

Enter IntersectionObserver API (referenced as IO). This new HTML API lets us "poll" elements to check if they're within the visible viewport. IO can also let us specify a parent element, so we can also check if elements are visible within a parent - potentially useful for sliders, iframes and more. This behaviour does not run in the browsers main thread, so there's much less of a performance hit. That said, we still should be picky about how often and why we are using IO. 

**A note on IO use:**

Google's advice is not to use Intersection Observer for triggering animations. Yet, they recommend it for Advertising purposes. This could be interpreted as a stance in favour on Google
