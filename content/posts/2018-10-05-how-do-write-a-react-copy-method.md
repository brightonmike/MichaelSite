---
title: How do write a React copy method
date: '2018-10-05 10:13am'
---
I recently needed to create a method for React which would copy some text in an input on user click. Turns out this wasn't quite as straightforward as I'd hoped.

My first attempt looked something like this.

<pre><code class="language-js">
  @autobind
  shareWishlist(e) {
    if (document.queryCommandSupported('copy')) {
      const innerText = document.querySelector('.js-copy');
      innerText.select();
      document.execCommand('copy');
      e.target.focus();
      this.setState({
        copied: true
      });
    }
  }
</code></pre>

The mark-up consisted of a button, and a hidden input. This seemed to work okay. But when we tested it, the copy wasn't working. Something was up!

I tried a few ideas - and I decided something was up with the focus. I commented out the target focus and the copy began to work. I suspect that what was happening was the button was being re-focused before the copy method had finished. And it looks like `execCommand` does not have any callbacks. Time for a promise.

<pre><code class="language-js">
  @autobind
  shareWishlist(e) {

    if (document.queryCommandSupported('copy')) {
      const copyText = new Promise((resolve, reject) => {
        const innerText = document.querySelector('.js-copy');
        innerText.select();
        try {
          const result = document.execCommand('copy');
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

      copyText.then(result => {
        e.target.focus();
        this.setState({
          copied: result
        });
      }).catch(err => {
        this.setState({
          copyErr: err
        });
      });
    }
  }
</code></pre>

Unfortunately, something wasn't quite right here either, as `e` was always returning undefined. It turns out that React wraps the browser's native events in a `SyntheticEvent`, and this event is pooled. This means that after the event callback has fired, it's properties are nullified. So when I try to access `e` in the promise then method, it's undefined.

Thankfully, we can use a method called `persist()` to allow us to remove the synthetic event from the pool and maintain our event properties. This needs to be added to the top of the method, and I then passed the event down the promise chain. The resulting code is as follows:

<pre><code class="language-js">
  @autobind
  shareWishlist(e) {
    e.persist();

    if (document.queryCommandSupported('copy')) {
      const copyText = new Promise((resolve, reject) => {
        const innerText = document.querySelector('.js-copy');
        innerText.select();
        try {
          const result = document.execCommand('copy');
          resolve([result, e]);
        } catch (err) {
          reject(err);
        }
      });

      copyText.then(result => {
        result[1].target.focus();
        this.setState({
          copied: result[0]
        });
      }).catch(err => {
        this.setState({
          copyErr: err
        });
      });
    }
  }
</code></pre>

But this wasn't quite the end of my journey. Throughout testing, I had the input visible. As soon as it was hidden - whether using display, visibility, height or width properties - the copy method would cease to work. I suspect there are some security concerns with copying hidden content, so whatever is being copied, must also be visible to the user.

This actually makes sense and I think the end result for the user is better, as they can clearly see what they're copying. If you have any feedback or thoughts on my copy method - give me a shout on [Twitter](https://twitter.com/mmjg2011).
