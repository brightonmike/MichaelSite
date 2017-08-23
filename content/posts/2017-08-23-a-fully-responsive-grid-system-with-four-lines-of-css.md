---
title: A fully responsive grid system with four lines of CSS
date: 2017-08-23T10:05:21.242Z
image: null
---
Impossible! Hacky! Nope, neither of these things. With the emergence of CSS Grid, we can now create complex grid based layouts with the minimal amount of CSS *and* markup.

Here's an example:

<iframe height='265' scrolling='no' title='YxvZZP' src='//codepen.io/brightonmike/embed/preview/YxvZZP/?height=265&theme-id=dark&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/brightonmike/pen/YxvZZP/'>YxvZZP</a> by brightonmike (<a href='https://codepen.io/brightonmike'>@brightonmike</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

As you'll see, there's just four declarations on the parent:

<pre><code class="language-scss">
section {
  display: grid;
  grid-gap: $grid-gap/2;
  grid-template-columns: repeat(auto-fill, minmax($column-min, $column-max));
  grid-auto-rows: minmax($row-min, $row-max);
}
</code></pre>

And that's it - you have a fully responsive grid. If you drag the handles of the browser and resize, you'll see how the grid automatically flows.

If you'd like to learn CSS Grid (and I strongly advise you do) then check out the following resources:

Grid by Example: https://gridbyexample.com/patterns/
CSS Grid Garden: http://cssgridgarden.com/

