---
title: The perils of third-party JavaScript
date: '2019-02-14'
---
I work in a sector of the web industry where third-parties are particularly heavily relied on. They provide all sorts of functionality - marketing, data analysis, 🤔tracking, social media and more. We should always try to understand the business decisions behind using third-party services. But equally, we should also consider their impact.

## Slower sites

The fact is that even adding one third-party feature, such as a live chat, can significantly affect the performance, functionality, stability and security of your website. For example, I was recently tasked with adding Zendesk live chat to a new client build.

![a graphic showing network requests made to zendesk for their live chat integration](/images/uploads/screen-shot-2019-02-14-at-12.35.06.png)

Unfortunately, this means loading over 800kb of extra resources including over 700kb of JavaScript. Yikes. Worse, this means that the browser struggles to handle just evaluating the JS. In a performance audit in dev tools, the browser raises several red flags. It's worth noting, this is on a 2-year old Macbook Pro, and I'm not throttling the CPU. It's scary to think how poor the performance will be on a mid-range Smartphone.

![a graphic showing a timeline of browser evaluating javascript. red marks indicate where the javascript is causing performance issues.](/images/uploads/screen-shot-2019-02-14-at-12.38.23.png)

It's even scarier to think this is just one third-party script. You can imagine how bad things quickly get when we're pulling in several others. All these scripts, network requests and files considerably slow websites down and create a poorer user experience.

## Solutions?

There are some things we can do to try to mitigate the impact. We can add the \`defer\` attribute to JavaScript files so they don't block page rendering. We can also feedback, often via Github, to the authors of the third-party extensions and help them to improve performance.

But sometimes we'll need a technical solution.
