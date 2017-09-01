---
title: Using service workers to better handle going offline
date: 2017-09-01T09:53:45.506Z
image: null
---
What is a service worker? It's not someone who works on services, although I'm sure you probably already had that figured out. Here's a handy explanation of a service worker written by Matt Gaunt, Developer Programs Engineer at Google:

"A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. Today, they already include features like <a href="https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web">push notifications</a> and <a href="https://developers.google.com/web/updates/2015/12/background-sync">background sync</a>."

If you need an example of what a service worker can do, log in to Facebook and accept the box that prompts notifications. You now get notifications about Facebook, without actually needing to be on the website. That's all achievable by creating a service worker. In effect, service workers simply allow websites to do things without the user needing the website tab open.

When wifi or internet drops out, this can lead to a frustrating experience for the user. One of the great uses of a service worker is that it allows developers to "hijack" what happens when connections are lost, giving us some level of control over what we describe as the "offline experience".

It's this ability to improve the offline experience that we're utilising on our builds here at Neptik. Service workers are, thankfully, not too treacherous to get your head around. There's a few pre-requisites:

<ul>

 	<li><strong>Site must be HTTPS</strong> - service workers will only work via SSL encrypted connections. Because service workers hijack the connection between the browser and the server, this is for security purposes. However, when testing locally, you do not need SSL.</li>

 	<li><strong>Browser Support</strong> - improving all the time with solid support across Chrome, Firefox and Opera. For Safari and Edge, service workers are in development.</li>

</ul>

<h3>&#x1f5d2; Register the service worker</h3>

This is your first step, and it involves popping the snippet below within your site's footer, inside script tags.

<iframe style="width: 100%;" title="Register service worker" src="//codepen.io/brightonmike/embed/QMzzyz/?height=265&amp;theme-id=light&amp;default-tab=js&amp;embed-version=2" width="300" height="265" frameborder="no" scrolling="no" allowfullscreen="allowfullscreen"></iframe>

Once you've done so, reload the page and head on over to <code>chrome://inspect/#service-workers</code> in Google Chrome. You should see your service worker show up as registered.

<h3>&#x1f4be; Install Event</h3>

The first thing you want to kick-off within your service worker is an <code>install</code> event. For caching, it's within this event where we want to open the cache, insert our files, and then check if we have cached the required assets. The install event itself looks as follows:

<iframe style="width: 100%;" title="Install service worker" src="//codepen.io/brightonmike/embed/Xaoopm/?height=133&amp;theme-id=light&amp;default-tab=js&amp;embed-version=2" width="300" height="133" frameborder="no" scrolling="no" allowfullscreen="allowfullscreen"></iframe>

You may want to define your required assets within an object:

<iframe style="width: 100%;" title="Install service worker" src="//codepen.io/brightonmike/embed/YxddVr/?height=133&amp;theme-id=light&amp;default-tab=js&amp;embed-version=2" width="300" height="133" frameborder="no" scrolling="no" allowfullscreen="allowfullscreen"></iframe>

For a recent project, we started off with a Google service worker and we adapted the install event as follows:

<iframe style="width: 100%;" title="Install service worker" src="//codepen.io/brightonmike/embed/qXLLPr/?height=350&amp;theme-id=light&amp;default-tab=js&amp;embed-version=2" width="300" height="350" frameborder="no" scrolling="no" allowfullscreen="allowfullscreen"></iframe>

This script in effect grabs an offline page (created in the CMS), caches this, and then caches the fundamental assets required for this page to work.

<h3>&#x1f3c3; Fetch Event</h3>

Now we want our <code>fetch</code> event. The fetch event is where we're returning our requests. In a nutshell, the service worker is checking the cache when a request is made. If the asset is identified in the cache, the cached copy is loaded. Otherwise, the service worker passes up the request to the network.

<iframe style="width: 100%;" title="Install service worker" src="//codepen.io/brightonmike/embed/xLmmYg/?height=350&amp;theme-id=light&amp;default-tab=js&amp;embed-version=2" width="300" height="350" frameborder="no" scrolling="no" allowfullscreen="allowfullscreen"></iframe>

In this example, there's a couple of checks going on. First of all, we only want to call <code>respondWith()</code> if the request is a "navigate" request. This request mode is not widely supported yet, so we double check by checking the request is a <code>GET</code> request. We're then using <code>fetch()</code> to throw a catch callback exception in the event that the server is unreachable (in other words, we're offline). It's at this point we want to check our cache to and dish up our offline experience.

<h3>&#x1f4f8; Activate Event</h3>

Despite using the name activate, what we're really doing here us <em>updating</em> our service worker cache.

<iframe style="width: 100%;" title="Install service worker" src="//codepen.io/brightonmike/embed/KvbbxK/?height=350&amp;theme-id=light&amp;default-tab=js&amp;embed-version=2" width="300" height="350" frameborder="no" scrolling="no" allowfullscreen="allowfullscreen"></iframe>

We're firstly checking our pre-defined cache object to delete anything that doesn't match. We're then looping to delete whole caches that also do not match what we've defined earlier on. We can do this by affixing a version number to our object name for the cached assets like so <code>const CACHE_VERSION = 2;</code>.

Once we have a service worker running, the end result could be something like this:

<img class="alignnone wp-image-3245 size-full" src="https://neptik.com/wp-content/uploads/2017/08/Screen-Shot-2017-08-31-at-15.41.25-e1504193146762.png" alt="image showing what an offline page may look like - it has basic text and a telephone number" width="655" height="339" />

It's pretty basic, but it's a heck of a lot better than an abrupt and irrelevant offline browser page. We could go further, our offline page could contain interesting content that keeps the user engaged until their connection returns.

<h3>Only the beginning</h3>

This is early days for service workers, and what we're seeing is only the beginning of what's achievable. Service workers can not only be used to elegantly handle an offline (or poor connection) experience, but they can also be used to perform other background tasks outside of the tab window. An example of this might be a background sync of data.

Find out more: <a href="https://developers.google.com/web/fundamentals/getting-started/primers/service-workers" target="_blank" rel="noreferrer noopener">Google have a superb article on service workers</a>, complete with code examples.
