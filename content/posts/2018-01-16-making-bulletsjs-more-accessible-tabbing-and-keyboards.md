---
title: Making BulletsJS more accessible - tabbing and keyboards
date: 2018-01-16T15:40:44.728Z
image: null
---
Over the past few months I’ve been working on, and using in my projects, a lightweight JavaScript library called Bullets. It works really well, but it’s always lacked quite badly in terms of accessibility and I decided it was time to address this and improve the components to work better for more users.

Making JavaScript accessible can be quite tricky, but it’s worth going through the process of doing it so you can wrap your head around what needs to be done. Having done a fair bit of research, what doesn’t help is how much conflicting information there is on making JavaScript accessible. In particular, aria-roles seem to be surrounded in a mist of confusion and mis-use, of which I’m no doubt guilty of. In general, I think we do need clearer guidelines.

I digress. So how have I gone about making the JavaScript components more accessible? Here are some things I’ve done. I hope they’re right, but they might need tweaking or you might have better ideas on how to do it. If you do, [tweet](https://twitter.com/mmjg2011) me. I want to get this right.

## Tabbing and Keyboard Events

When you’re adding JavaScript components to web pages, they won’t be straight up accessible to keyboard users. HTML elements such as `<div>` and `<ul>` are not accessible to keyboards, because they aren’t tab-able. Luckily, there’s ways around this. For a modal component, I wanted to make sure that keyboard users could tab correctly around the content of the modal when open. Further, I needed to make sure that when they close the modal, the focus would return to where they were when they opened it.

Firstly, we want to be able to grab all the nodes within our modal but only those which are focusable. Thanks to accessibility advocate Heydon Pickering there’s a nice simple way to do this.

<pre><code class="language-javascript">
let content = modal.querySelector('[role="document"]');

let focusable = content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]');
let firstFocusable = focusable[0];
let lastFocusable = focusable[focusable.length - 1];
</code></pre>

We're querying all focusable elements within the `[role="document"]` element inside the modal - which is the container we place our modal content inside of. We're then grabbing the first and last of these elements, so we can attach event handlers to them.

You want the focus to move to the first element when the modal is opened. In the case of this component, this is the close button. But you can just attach it to the `firstFocusable` element. This should sit within your function that opens the modal.

<pre><code class="language-javascript">
firstFocusable.focus();
</code></pre>

Once the modal is open, you want keyboard users to only be able to tab through the focusable elements within the modal. Normally, what will happen is tabbing takes them outside of the modal, without them closing it, which is confusing behaviour.

So, we effectively trap them within the modal when open by focusing back to the first element when the last element is tabbed.

<pre><code class="language-javascript">
lastFocusable.addEventListener('keydown', (e) => {
	if ((e.keyCode || e.which) === 9) {
		firstFocusable.focus();
		e.preventDefault();
	}
});
</code></pre>

What now happens is when the modal is open, tabbing cycles you through the content of the modal. If they want to exit the modal, they can either do so by focusing on the close button and triggering with the space bar - or we can allow them to hit the escape key at any time to exit the modal. 

<pre><code class="language-javascript">
modal.addEventListener('keydown', (e) => {
	if (e.keyCode == 27) {
		this.closeModal();
	}
});
</code></pre>

But what about when we close the modal? We want to take the user's focus back to where it was when they originally opened it. This is pretty simple because this will always be the button they used to open it. So, within our close modal function, we just re-focus the button.

<pre><code class="language-javascript">
button.focus();
</code></pre>

## Aria Roles

Handling keyboard events and tabbing isn't all of it. We also need to dynamically update the aria-roles of the modal. By default, in our mark-up we should let the screen readers know the modal is hidden. We can do this by using the following mark-up.

<pre><code class="language-markup">
	<div class='modal js-modal' aria-hidden='true' role='dialog' aria-labelledby='dialog-title'></div>
</code></pre>

It's helpful too to specify the role of the `<div>` is a dialog, as effectively, that's the behaviour we're creating. When we trigger the modal to open, we can then update the hidden attribute.

<pre><code class="language-javascript">
modal.setAttribute('aria-hidden', 'false');
</code></pre>

When we close it, we set it back to hidden. This helps indicate to screen readers and their users the state of the modal so they know what's going on, and when it is open or closed.

Hopefully, this overview is helpful, but for the sake of keeping it brief I've not included too much code within this post. If you want to check out the full code, head on over to the Github: https://github.com/brightonmike/BulletsJS/blob/master/src/components/Modal.js

Likewise, I'm not entirely convinced this modal component is perfectly accessible, but I think there's a definite improvement. It seems to work nicely via a keyboard now, so hopefully that satisfies those users. If you have any suggestions or feedback - tweet me: https://twitter.com/mmjg2011
