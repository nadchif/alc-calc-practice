MWS Study Notes
=====

## Basic website layout and styling
 <details>
    <summary>Appropriate document type declaration and viewport tags
    </summary>
    
```
<!DOCTYPE HTML>
<html lang="en">
```
within `<head>`:
```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Simple PWA Calculator for practice lab">
```
</details>
    
 <details>
    <summary>A responsive grid-based layout using CSS
    </summary>
    
* Use [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

    - Utilize media queries and change `flex-flow:` css attribute as needed. 

         A: `flex-flow: column` , B: `flex-flow: row` (default)
         ```  
             A           B
             |------|    |      |      |      |  
             | text |    | text | text | text |
             |------|    |      |      |      |
             | text |
             |------|
             | text |
        ```

    - Utilize query selector to target specific children in  a flex container `.container .col:nth-child(1)`
</details>
    
    
 <details>
    <summary>Media queries that provide fluid breakpoints across different screen sizes
    </summary>

* Set the viewport
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

**When using the viewport meta tag, make sure you don't set `maximum-scale=1` or set `user-scaleable=no`. Let users zoom if they need to!**

* Use Media Queries. 

    - Within same CSS file:
    ```
    @media screen and (max-width: 48rem) {
    .container .col {
        width: 95%;
    }
    }
    ```
    *NOTE: 48rem: (768 pixels at browser's default font size or 48 times the default font size in the user's browser))*

    - Separate CSS files:
    ```
    <link rel="stylesheet" media="(max-width: 640px)" href="max-640px.css">
    <link rel="stylesheet" media="(min-width: 640px)" href="min-640px.css">
    <link rel="stylesheet" media="(orientation: portrait)" href="portrait.css">
    <link rel="stylesheet" media="(orientation: landscape)" href="landscape.css">
    ```
* It is also possible to create queries based on min-device-width, though **this practice is strongly discouraged**.

* Do not use large fixed width elements. **Use relative units**

    *"Consider using relative units like em or rem for things like text size, instead of pixel values. Some browsers support resizing text only in user preferences, and if you're using a pixel value for text, this setting will not affect your copy. If, however, you've used relative units throughout, then the site copy will update to reflect the user's preference."*

* Content should not rely on a particular viewport width to render well.
</details>

    
 <details>
    <summary>Multimedia tags to display video or play audio</summary>

* Use video with multiple formats where possible. 
    ```
    <video controls>
         <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
        <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
        <p>This browser does not support the video element.</p>
    </video>
    ```
</details>

    
 <details>
    <summary>Responsive images that adjust for the dimensions and resolution of any mobile device</summary>

* Remember to prevent responsive images from overflowing the screen
    ```
    img {
        max-width: 100%;
    }
    ```
    *NOTE: You can also Utilize the `vw` and `vh` for this `100vw` = 100 view port width*
    
* Use `srcset`
    ```
    srcset="images/sfo-1600_large.jpg 1600w, images/sfo-1000_large.jpg 1000w, images/sfo-800_medium.jpg 800w, images/sfo-500_small.jpg 500w"
    ```
    *In the above code, "On a 1x display, the browser fetches sfo-500_small.jpg when the window is narrower than 500px, sfo-800_medium.jpg when it is narrower than 800px, and so forth."*

* Use `sizes` attribute to tell the browser the display size of the image before it is fetched.
    ```
    sizes="(max-width: 700px) 90vw, 50vw"
    ```
    *REASON: Unless we tell it otherwise, the browser assumes the images will be displayed at 100% of the viewport width and fetches the images based on this. We need a way to tell the browser beforehand if the images will be displayed at a different size.*
    ```
    <img src="400.png" 
     sizes="(min-width: 600px) 25vw, (min-width: 500px) 50vw, 100vw"
     srcset="100.png 100w, 200.png 200w, 400.png 400w,
             800.png 800w, 1600.png 1600w, 2000.png 2000w" alt="an example image">
    ```
    *The sizes attribute, in the above example, uses several media queries to specify the size of the image. When the browser width is greater than 600px, the image is 25% of the viewport width; when it is between 500px and 600px, the image is 50% of the viewport width; and below 500px, it is full width.*


    [[Read More...](https://ericportis.com/posts/2014/srcset-sizes/)]

* Use `<picture>`
    ```
    <picture>
        <source media="(min-width: 800px)" srcset="head.jpg, head-2x.jpg 2x">
        <source media="(min-width: 450px)" srcset="head-small.jpg, head-small-2x.jpg 2x">
        <img src="head-fb.jpg" srcset="head-fb-2x.jpg 2x" alt="a head carved out of wood">
    </picture>
    ```
    *In the above example, if the browser width is at least 800px then either head.jpg or head-2x.jpg is used, depending on the device resolution. If the browser is between 450px and 800px, then either head-small.jpg or head-small- 2x.jpg is used, again, depending on the device resolution. For screen widths less than 450px and backward compatibility where the picture element isn’t supported, the browser renders the img element instead, and should always be include*
</details>

    
 <details>
    <summary>Touch and mouse events that contain large hit targets on the front end and work regardless of platform</summary>

* When your design is displayed on a mobile device, you should ensure that interactive elements like buttons or links are large enough, and have enough space around them, to make them easy to press without accidentally overlapping onto other elements. This benefits all users, but is especially helpful for anyone with a motor impairment.

* A minimum recommended touch target size is around 48 device independent pixels on a site with a properly set mobile viewport. For example, while an icon may only have a width and height of 24px, you can use additional padding to bring the tap target size up to 48px. The 48x48 pixel area corresponds to around 9mm, which is about the size of a person's finger pad area.

* Touch targets should also be spaced about 8 pixels apart, both horizontally and vertically, so that a user's finger pressing on one tap target does not inadvertently touch another tap target.

* Elements should respond to touch and give visual feedback
    ```
    .btn {
    background-color: #4285f4;
    }

    .btn:hover {
    background-color: #296CDB;
    }

    .btn:focus {
    background-color: #0F52C1;

    /* The outline parameter suppresses the border
    color / outline when focused */
    outline: 0;
    }

    .btn:active {
    background-color: #0039A8;
    }
    ```

*Only suppress the default `outline` styles mentioned above if you have pseudo classes for `:hover`, `:active` and `:focus`!*

**Never set outline to 0 or none without providing a focus alternative!**

* For touch events and gestures: In Chrome (version 55 and later), Internet Explorer & Edge, `PointerEvents` are the recommended approach for implementing custom gestures. In other browsers `TouchEvents` and `MouseEvents` are the correct approach. ie:
    ```
    // Check if pointer events are supported.
    if (window.PointerEvent) {
    swipeFrontElement.addEventListener('pointermove', this.handleGestureMove, true);
    } else {
    swipeFrontElement.addEventListener('touchmove', this.handleGestureMove, true);
    }
    ```
    [[Read More...](https://developers.google.com/web/fundamentals/design-and-ux/input/touch)]

</details>

## Front end networking

    
 <details>
    <summary>Requesting data using `fetch()`</summary>

Basic syntax:
```
fetch('examples/animals.json')
    .then(logResult)
    .catch(logError);
```
</details>

    
 <details>
    <summary>Checking response status, then parsing the data into usable format</summary>

```
fetch('examples/non-existent.json')
.then(response => {
    // check response status
    if (!response.ok) {
    throw Error(response.statusText);
    }
    return response;
})
.then(logResult)
.catch(logError);
```
</details>

    
 <details>
    <summary>Rendering response data to a page</summary>

While it may be tempting to fetch HTML and append it using the innerHTML attribute, **be careful**. This can expose your site to cross-site scripting attacks! Recommended approach:
```
fetch('examples/car-description.txt')
.then(response => {
    // check response status
    if (!response.ok) {
    throw Error(response.statusText);
    }
    return response.text();
})
.then(data => {
    // using existing element
    const message = document.getElementById('message');
    message.textContent = data;


    // To create new elements:
    const message = document.getElementById('contentScreen');
    const card = document.createElement('div')
    card.textContent = data;
    contentScreen.appendChild(card);
})
.catch(logError);
```
</details>
    
 <details>
    <summary>Configuring POST requests to a database with method and body parameters</summary>

* Basic syntax:
    ```
    fetch('examples/login', {
        method: 'POST',
        body: 'name=david&password=hello'
    })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
    ```
* Utilize the [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) interface:
    ```
    const formData = new FormData(document.getElementById('msg-form'));
    ```
</details>
    
 <details>
    <summary>Using correctly configured cross-origin resource sharing protocol (CORS) fetch requests, depending on the server’s response headers</summary>

```
fetch('http://localhost:5001/', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
})
```

* `same-origin` — If a request is made to another origin with this mode set, the result is simply an error. You could use this to ensure that a request is always being made to your origin.
* `no-cors` — Prevents the method from being anything other than HEAD, GET or POST, and the headers from being anything other than simple headers. 
* `cors` — Allows cross-origin requests, for example to access various APIs offered by 3rd party vendors. These are expected to adhere to the CORS protocol. Only a limited set of headers are exposed in the Response, but the body is readable.

</details>

 <details>
    <summary>Handling fetch() request errors with promise chaining</summary>

Basic syntax:
```
fetch('examples/car-description.txt')
.then(validateResponse)
.then(readResponseAsText)
.then(showText)
.catch(error=>{
    // handle errors here
});
```
</details>
    
 <details>
    <summary>Diagnosing network issues using debugging and development tools</summary>

https://developers.google.com/web/tools/chrome-devtools/network

</details>

## Accessibility

 <details>
    <summary>Using a logical tab order for tabbed navigation</summary>

* It's important to note that, using CSS, it's possible to have things exist in one order in the DOM but appear in a different order on screen. For example, if you use a CSS property like `float` to move one button to the right, the buttons appear in a different order on screen. But, because their order in the DOM remains the same, so does their tab order.

    **Be careful when changing the visual position of elements on screen using CSS. This can cause the tab order to jump around, seemingly at random, confusing users who rely on the keyboard.**


* Use `tabindex`
    
    - `tabindex="0"`: Inserts an element into the natural tab order. The element can be focused by pressing the Tab key, and the element can be focused by calling its focus() method
        ```
        <custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
        ```
    - `tabindex="-1"`: Removes an element from the natural tab order, but the element can still be focused by calling its focus() method
        ```
        <button id="foo" tabindex="-1">I'm not keyboard focusable</button>
        <button onclick="foo.focus();">Focus my sibling</button>
        ```
    - `tabindex="5"`: Any tabindex greater than 0 jumps the element to the front of the natural tab order. If there are multiple elements with a tabindex greater than 0, the tab order starts from the lowest value that is greater than zero and works its way up. **Using a tabindex greater than 0 is considered an anti-pattern.**
        ```
        <button>I should be first</button>
        <button>And I should be second</button>
        <button tabindex="5">But I jumped to the front!</button>
        ```
* Utilize `aria-hidden` attribute. Applying this attribute to an element effectively removes it and all of its descendants from the accessibility tree. The only exceptions are elements referred to by an aria-labelledby or aria-describedby attribute.

* When making your own control elements refer to https://www.w3.org/TR/wai-aria-practices/
</details>

 <details>
    <summary>Using skip navigation links to bypass navbars and asides</summary>

* Example
    ```
    <body>
    <a href="#maincontent">Skip to main content</a>
    ...
    <main id="maincontent">
    <h1>Heading</h1>
    <p>This is the first paragraph</p>
    ```
</details>

 <details>
    <summary>Avoiding hidden content on the page that impedes tab navigation</summary>

* *When you have elements like this that receive focus when they're off screen, it can seem as if the focus is disappearing and reappearing as the user tabs through the page — clearly an undesirable effect. Ideally, we should prevent the panel from gaining focus when it's off screen, and only allow it to be focused when the user can interact with it.*

* Sometimes you need to do a bit of detective work to figure out where focus has gone. You can use `document.activeElement` from the console to figure out which element is currently focused

</details>

 <details>
    <summary>Using heading tags that provide a logical page structure</summary>

* Heading list follows the DOM order rather than the visual order.

* Not all headings have to be visible on-screen. Wikipedia, for instance, uses a technique that deliberately places some headings off-screen to specifically make them accessible only to screen readers and other assistive technology.
    ```
    <style>
    .sr-only {
        position:absolute;
        left:-10000px;
        top:auto;
        width:1px;
        height:1px;
        overflow:hidden;
    }
    </style>

    <h2 class="sr-only">This heading is offscreen.</h2>
    ```
</details>

 <details>
    <summary>Using text alternatives to visual content, such as alt, <label>, aria-label, and aria-labelledby</summary>

* Clickable text such as "learn more" or "click here" provides no semantic information about where the link goes. Instead, **use descriptive text like "learn more about responsive design" or "see this canvas tutorial" to help screen readers provide meaningful context about links.**

    ```
    <a href="moreinfo.html" aria-label="learn more about responsive design">Learn More</a>
    ```
* `alt` - use the alt attribute to provide a useful text alternative to this image. *`alt` differs from `title`, or any type of `caption`, in that it is **only used if the image is not available.***
    ```
    <img src="example.jpg" alt="An example"/>
    ```

    Writing useful alt text is a bit of an art. In order for a string to be a usable text alternative, it needs to convey the same concept as the image, in the same context.

    It's not always useful to describe an image. For example, consider a magnifying glass image inside a search button that has the text "Search". If the text wasn't there, you would definitely give that image an alt value of "search". But because we have the visible text, the screen reader will pick up and read aloud the word "search"; thus, an identical alt value on the image is redundant.

    However, we know that if we leave the alt text out, we'll probably hear the image file name instead, which is both useless and potentially confusing. In this case you can just use an empty alt attribute, and the screen reader will skip the image altogether.

    **All images should have an alt attribute, but they need not all have text.**

* `aria-label` - allows us to specify a string to be used as the accessible label.
    ```
    <button aria-label="menu" class="hamburger"></button>
    ```

* `aria-labelledby` - allows us to specify the ID of another element in the DOM as an element's label.
    ```
    <span id="rg-label">Drink Options</span>
    <div role="radiogroup" aria-labelledby="rg-label">
        ...
    </div>
    ```

* `aria-owns` - This attribute allows us to tell assistive technology that an element that is separate in the DOM should be treated as a child of the current element, or to rearrange existing child elements into a different order. For example, if a pop-up sub-menu is visually positioned near its parent menu, but cannot be a DOM child of its parent because it would affect the visual presentation, you can use aria-owns to present the sub-menu as a child of the parent menu to a screen reader.

* `label`
    ```
    <label>
        <input type="checkbox">Receive promotional offers?
    </label>
    ``` 
    or
    ```
    <input id="promo" type="checkbox">
    <label for="promo">Receive promotional offers?</label>
    ```
https://developers.google.com/web/fundamentals/accessibility/semantics-aria/aria-labels-and-relationships

</details>

 <details>
    <summary>Applying color contrast to all elements and following accessibility best practices</summary>

* The contrast ratio of `4.5:1` was chosen for level AA because it compensates for the loss in contrast sensitivity...For users with low vision impairments or color deficiencies, we can increase the contrast up to `7:1` for body text.

* Use the [Chrome Accessibility tools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb) to identify low contrast issues

* The WebAIM checklist states...**"color should not be used as the sole method of conveying content or distinguishing visual elements...color alone should not be used to distinguish links from surrounding text"** unless they meet certain contrast requirements. The checklist recommends adding an additional indicator such as an underscore (using the CSS text-decoration property) to indicate when the link is active. 

* A useful exercise is to turn on high-contrast settings and verify that all of the UI in your application is still visible and usable.
</details>

 <details>
    <summary>Sending timely alerts for urgent messages using `aria-live`</summary>

* `aria-live `lets developers mark a part of the page as "live" in the sense that updates should be communicated to users immediately regardless of the page position, rather than if they just happen to explore that part of the page. When an element has an aria-live attribute, the part of the page containing it and its descendants is called a live region.

    * `aria-live="polite"` tells assistive technology to alert the user to this change when it has finished whatever it is currently doing. It's great to use if something is important but not urgent, and accounts for the majority of aria-live use.
    * `aria-live="assertive"` tells assistive technology to interrupt whatever it's doing and alert the user to this change immediately. This is only for important and urgent updates, such as a status message like "There has been a server error and your changes are not saved; please refresh the page", or updates to an input field as a direct result of a user action, such as buttons on a stepper widget.
    * `aria-live="off"` tells assistive technology to temporarily suspend aria-live interruptions.

* `aria-relevant` indicates what types of changes should be presented to the user. There are some options that may be used separately or as a token list.

    * `additions`, meaning that any element being added to the live region is significant. For example, appending a span to an existing log of status messages would mean that the span would be announced to the user (assuming that aria-atomic was false).
    * `text`, meaning that text content being added to any descendant node is relevant. For example, modifying a custom text field's textContent property would read the modified text to the user.
    * `removals`, meaning that the removal of any text or descendant nodes should be conveyed to the user.
    * `all`, meaning that all changes are relevant. However, the default value for aria-relevant is additions text, meaning that if you don't specify aria-relevant it will update the user for any addition to the element, which is what you are most likely to want.

</details>

 <details>
    <summary>Using semantic markup to keep content and presentation separate when appropriate</summary>

* HTML5 introduced some new elements that help define the semantic structure of the page, including `header`, `footer`, `nav`, `article`, `section`, `main`, and `aside`. These elements specifically provide structural clues in the page without forcing any built-in styling (which you should do with CSS anyway).
    ```
    |-----------------------------------|
    | Header                            |
    | | Logo   | Nav                    |
    |-----------------------------------|
    | Main                              |
    ||---------------------------------||
    || Article                         ||
    |||--------------------------------||
    ||| Section           | Aside      ||
    |||-------------------|------------||
    ||| Section           | Aside      ||
    |||-------------------|            ||
    ||| Section           |            ||
    |-----------------------------------|
    | Footer                            |
    || Nav                    | Nav     |

    ```
    See also https://www.semrush.com/blog/semantic-html5-guide/

* Avoid using `div`,`span`, `a` as buttons etc. Style the `button` instead

    *When we don't use an actual button element, the screen reader has no way to know what it has landed on. Also, we would have to do the extra work of adding tabindex to make it usable to keyboard-only users because, as it is coded now, it can only be used with a mouse.*

* Avoid using `<br/>`. Use more css or more semantic tags to seperate content

* Avoid using `<b>`, If its purely presentational, styles like `font-weight:bold`. If it is for emphasis use `<strong>` or `<em>`, this will be empahsized by the Accesibility Readers

</details>

## Progressive Web Apps

**[Lighthouse](https://developers.google.com/web/tools/lighthouse/) is your friend here**

 <details>
    <summary>Creating a web app that is available offline, and that caches elements by routing requests through a service worker</summary>

1. Register a service worker
    ```
    if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
        .then(reg => {
            console.log('Service worker registered! 😎', reg);
        })
        .catch(err => {
            console.log('😥 Service worker registration failed: ', err);
        });
    });
    }
    ```

2. Precache resources. (This code is in your service worker)
    ```
    const cacheName = 'cache-v1';
    const precacheResources = [
    '/',
    'index.html',
    'styles/main.css',
    'images/logo.jpg',
    ];

    self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(precacheResources);
        })
    );
    });

    self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
    });

    self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            if (cachedResponse) {
            return cachedResponse;
            }
            return fetch(event.request);
        })
        );
    });
    ```
    **TIP: Remember The service worker must be on the same origin as the document that registers the ServiceWorker**

</details>

 <details>
    <summary>Storing the default display orientation, theme color, display icon (add to home screen), and splash screen in the web application manifest (or using meta tags)</summary>

* The `manifest.json` file tells the browser how to style and format some of the progressive aspects your app, such as the browser chrome, home screen icon, and splash screen. It can also be used to configure your web app to open in standalone mode, like a native app does (in other words, outside of the browser).

    Support is still under development for some browsers as of the time of this writing, and the `<meta>` tags configure a subset of these features for certain browsers that don't yet have full support.

* Manifest must be in the root of web app `/manifest.json`

* Manifest boilerplate:
    ```
    {
    "name": "Space Missions",
    "short_name": "Space Missions",
    "lang": "en-US",
    "start_url": "/index.html",
    "display": "standalone",
    "theme_color": "#FF9800",
    "background_color": "#FF9800",
    "icons": [
        {
        "src": "images/touch/icon-128x128.png",
        "sizes": "128x128"
        },
        {
        "src": "images/touch/icon-192x192.png",
        "sizes": "192x192"
        },
        {
        "src": "images/touch/icon-256x256.png",
        "sizes": "256x256"
        },
        {
        "src": "images/touch/icon-384x384.png",
        "sizes": "384x384"
        },
        {
        "src": "images/touch/icon-512x512.png",
        "sizes": "512x512"
        }
    ]
    }
    ```

* PWA Meta tags ( needless to say these are part of the `<head>` ):
    ```
    <link rel="manifest" href="manifest.json">

    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="Space Missions">
    <meta name="apple-mobile-web-app-title" content="Space Missions">
    <meta name="theme-color" content="#FF9800">
    <meta name="msapplication-navbutton-color" content="#FF9800">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="/index.html">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="icon" sizes="128x128" href="/images/touch/icon-128x128.png">
    <link rel="apple-touch-icon" sizes="128x128" href="/images/touch/icon-128x128.png">
    <link rel="icon" sizes="192x192" href="icon-192x192.png">
    <link rel="apple-touch-icon" sizes="192x192" href="/images/touch/icon-192x192.png">
    <link rel="icon" sizes="256x256" href="/images/touch/icon-256x256.png">
    <link rel="apple-touch-icon" sizes="256x256" href="/images/touch/icon-256x256.png">
    <link rel="icon" sizes="384x384" href="/images/touch/icon-384x384.png">
    <link rel="apple-touch-icon" sizes="384x384" href="/images/touch/icon-384x384.png">
    <link rel="icon" sizes="512x512" href="/images/touch/icon-512x512.png">
    <link rel="apple-touch-icon" sizes="512x512" href="/images/touch/icon-512x512.png">
    ```
</details>

 <details>
    <summary>Separating critical application functionality and UI into an application shell that can be loaded independently from the content</summary>

* An App Shell should: 
    - Load fast
    - Use as little data as possible
    - Use static assets from a local cache
    - Separate content from navigation
    - Retrieve and display page-specific content (HTML, JSON, etc.)
    - Optionally, cache dynamic content

* Sample App Shell Boilerplate:
    ```
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>App Shell</title>
    <link rel="manifest" href="/manifest.json">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles/inline.css">
    </head>

    <body>
    <header class="header">
        <h1 class="header__title">App Shell</h1>
    </header>

    <nav class="nav">
    ...
    </nav>

    <main class="main">
    ...
    </main>

    <div class="dialog-container">
    ...
    </div>

    <div class="loader">
        <!-- Show a spinner or placeholders for content -->
    </div>

    <script src="app.js" async></script>
    <script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(registration => {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(err => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
        });
    }
    </script>
    </body>
    </html>
    ```
</details>

## Performance optimization and caching

**[Lighthouse](https://developers.google.com/web/tools/lighthouse/) is your friend here**

 <details>
    <summary>Preventing main thread blocking with a dedicated web worker</summary>

* Basic Syntax
    ```
    if (!window.Worker) {
        console.log('Your browser doesn\'t support web workers.')
        return;
    }
	const myWorker = new Worker("worker.js");
    ```
* Setup listener for data from worker
    ```
	myWorker.onmessage = (event) => {
      // receive data from worker
	}
    ```
* Send data to Worker
    ```
	const myWorker = new Worker("worker.js");
	const sendMessage = () => {
	  myWorker.postMessage(values);
	}
    ```
* Inside worker: Handle received data
    ```
    onmessage = (event) => {
        console.log('Worker: Message received', event);
    }
    ```
    or
    ```
    self.addEventListener('message', (event) => {
        console.log('Worker: Message received', event);
    })
    ```
* Inside worker: Post data back 
    ```
    postMessage(workerResult);
    ```
</details>

|> Providing an optimized critical rendering path 
* using:
    <details>
        <summary>Compressed or minified JavaScript, HTML and CSS files to reduce render blocking</summary>

    * `Minification` is the removal of unnecessary whitespace, comments and other content in text-based resources. It significantly reduces the amount of data you send to users without impacting functionality. Use *uglification* in JavaScript to get more savings through shortening variable and method names. Since SVG is a text-based image format, *it can be optimized with SVGO*.
    </details>


    <details>
            <summary>Inline CSS for essential styles on a specific page, with asynchronous loading for additional styles as necessary</summary>

    * `<link rel="preload">` informs the browser that a resource is needed as part of the current navigation, and that it should start getting fetched as soon as possible.
        ```
        <link rel="preload" as="script" href="super-important.js">
        <link rel="preload" as="style" href="critical.css">
        ```
        - Resources that are fetched using `<link rel="preload">`, but not used by the current page within 3 seconds will trigger a warning in the Console in Chrome Developer Tools, so be sure to keep an eye out for these!*

        - In order to reduce the amount of time the user has to wait for the text content of your site, as well as avoid jarring flashes between system fonts and your preferred ones, you can use <link rel="preload"> in your HTML to let the browser know immediately that a font is needed.

            ```
            <link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="myfont.woff2">
            ```
            *Note that the use of `crossorigin` here is important; without this attribute, the preloaded font is ignored by the browser, and a new fetch takes place. This is because fonts are expected to be fetched anonymously by the browser, and the preload request is only made anonymous by using the `crossorigin` attribute.*

        - **Use-case:** Critical Path CSS and JavaScript

    * `<link rel="preconnect">` informs the browser that your page intends to establish a connection to another origin, and that you’d like the process to start as soon as possible.
        ```
        <link rel="preconnect" href="https://example.com">
        ```
        - **Use-case:** Knowing *Where From*, but not *What* You're Fetching. ie fonts that may change version

        - **Use-case:** Streaming Media

    </details>

    <details>
        <summary>Inline JavaScript files for initial rendering only where necessary (or otherwise eliminated, deferred, or marked as async)</summary>
    
    * Important JS :
    
         The script is fetched and executed immediately, before the browser continues parsing the page
        ```
        <head>
        <link rel="preload" as="script" href="super-important.js">
        ```
    * all other JS: 
        `async` - A script that will be run asynchronously as soon as it is available
        ```
        <script src="demo_async.js" async></script>
        </body>
        ```
        ```
        -------------------+---------+---------------------
          parsing HTML     | Wait... |  resume parsing html
        --------+----------+---------+---------------------
                | fetching | execute |
                | script   | script  |
        ```
        or 
        `defer` - A script that will not run until after the page has loaded:
        ```
        <script src="demo_defer.js" defer></script>
        </body>
        ```
        ```
        -----------------------------------+---------------
          parsing HTML                     | execute script
        --------+----------+---------------+---------------
                | fetching |
                | script   | 
        ```

    </details>

    <details>
        <summary>Ordered loading of remaining critical resources and early download of all critical assets to shorten the critical path length</summary>

    * The browser's steps when rendering: 
        1. Process HTML markup and build the DOM tree.
        2. Process CSS markup and build the CSSOM tree.
        3. Combine the DOM and CSSOM into a render tree.
        4. Run layout on the render tree to compute geometry of each node.
        5. Paint the individual nodes to the screen.

        **Optimizing the critical rendering path is the process of minimizing the total amount of time spent performing steps 1 through 5 in the above sequence. Doing so renders content to the screen as quickly as possible and also reduces the amount of time between screen updates after the initial render; that is, achieve higher refresh rates for interactive content.**

    * *Optimizing the critical rendering path* refers to prioritizing the display of content that relates to the current user action. It includes
        - Minimizing the number of critical resources: eliminating them, deferring their download, marking them as async, and so on.
        - Optimizing the number of critical bytes to reduce the download time (number of roundtrips).
        - Optimizing the order in which the remaining critical resources are loaded: downloading all critical assets as early as possible to shorten the critical path length.

    * **CSS is a render blocking resource. Get it to the client as soon and as quickly as possible to optimize the time to first render.**.

    * Let's consider some hands-on examples:
        ```
        <link href="style.css"    rel="stylesheet">
        <link href="style.css"    rel="stylesheet" media="all">
        <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
        <link href="print.css"    rel="stylesheet" media="print">
        ```

        * The first declaration is render blocking and matches in all conditions.
        * The second declaration is also render blocking: "all" is the default type so if you don’t specify any type, it’s implicitly set to "all". Hence, the first and second declarations are actually equivalent.
        * The third declaration has a dynamic media query, which is evaluated when the page is loaded. Depending on the orientation of the device while the page is loading, portrait.css may or may not be render blocking.
        * The last declaration is only applied when the page is being printed so it is not render blocking when the page is first loaded in the browser.

    * `<link rel="prefetch">` doesn’t try to make something critical happen faster; instead, it tries to make something non-critical happen earlier, if there’s a chance.
        ```
        <link rel="prefetch" href="page-2.html">
        ```
    </details>

    <details>
        <summary>Reduced DOM depth to minimize browser layout/reflow</summary>
    </details>

    <details>
        <summary>Your browser's developer tools to diagnose performance issues on mobile devices</summary>

    * `Coverage tab` - can help you find unused JavaScript and CSS code. Removing unused code can speed up your page load and save your mobile users cellular data. 
        https://developers.google.com/web/tools/chrome-devtools/coverage

    * `Network tab` - https://developers.google.com/web/tools/chrome-devtools/network

    * `Audits tab` (the best in my opinion)- https://developers.google.com/web/tools/lighthouse

    </details>



 <details>
    <summary>Prefetching files that load when resources are available, reducing the time to meaningful interaction</summary>

* Use `<link rel="prefetch">`
    ```
    <link rel="prefetch" href="page-2.html">
    ```
* Use `serviceWorker` to cache resources

 </details>

|> Providing client storage that is appropriate to a web application’s data persistence needs, 
* including:

    <details>
        <summary>Session state management</summary>
    </details>

    <details>
        <summary>Asset caching based on their impact on load time and offline functionality</summary>
    </details>
    <details>
        <summary>Using IndexedDB to store dynamic content in offline mode</summary>

    **IMPORTANT ! The google tutorials use `idb`, I'm not sure whether we will be allowed to use the idb wrapper during the exam. I've also included the method of doing tasks directly without the idb wrapper.**

    * Because IndexedDB isn't supported by all browsers, we need to check that the user's browser supports it before using it. 
        ```
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }
        ```
    * Opening a database
        - default
            ```
            const DBOpenRequest = window.indexedDB.open('developer-books', 1);
            ```
        - idb
            ```
            dbPromise = idb.open('developer-books', 1);
            ```
            `idb.open` takes a database name, version number, and optional callback function for performing database updates (not included in the above code).

    * Upgrading the database:
        - default

            ```
            let db;
            const DBOpenRequest = window.indexedDB.open('developer-books', 2);

            DBOpenRequest.onupgradeneeded = (event) => {
                //handle upgrade logic
                db = DBOpenRequest.result;
                switch (event.oldVersion) {
                case 0:
                // a placeholder case so that the switch block will
                // execute when the database is first created
                // (oldVersion is 0)
                case 1:
                    // handle update logic
                    console.log("upgrading...")
                    console.log('Creating the products object store');
                    db.createObjectStore('products', { keyPath: 'id' });
                }
            }
            ```
        - idb 
            ```
            var dbPromise = idb.open('developer-books', 2, function(upgradeDb) {
            switch (upgradeDb.oldVersion) {
                case 0:
                // a placeholder case so that the switch block will 
                // execute when the database is first created
                // (oldVersion is 0)
                case 1:
                // handle update logic
                console.log("upgrading...")
                console.log('Creating the products object store');
                upgradeDb.createObjectStore('products', {keyPath: 'id'});
                }
            });
            ```
            *`2` represents the version number of your database (it can be any number you want)*

            *`upgradeDb.oldVersion` is the version number of the existing database. Use that in a switch block to handle different DB Version upgrades. Note that no `break` statements are included in the switch block, this is intentional, so that the script runs through all the blocks*

    * All database operations must be carried out within a transaction. 

    * For multiple items, leverage `Promise.all` to catch errors within the transaction:
        ```
        dbPromise.then(function(db) {
        var tx = db.transaction('products', 'readwrite');
        var store = tx.objectStore('products');
        var items = [
            {
            title: 'MWS guide',
            author: 'nadchif'
            published: '12/12/2019',
            },
            // ... more items here ....
        ];
        return Promise.all(items.map(item => {
            console.log('Adding item: ', item);
            return store.add(item);
            })
        ).catch(e => {
            tx.abort();
            console.log(e);
        }).then(() => {
            console.log('All items added successfully!');
        });
        });
        ```
</details>

## Testing and debugging

<details>
        <summary>Writing unit tests that first verify a function’s intended behavior, and then iteratively modifying its code until it passes those tests</summary>

**IMPORTANT: I couldn't find details on how exactly the Google Study Guide expects us to write our unit tests. So these are methods I thought of**

* Using my own custom test runner that wraps console.asserts
    ```
    const MyTestRunner = () =>{
        const tests = []
        const test = (name, fn) => {
            tests.push({ name, fn })
        }
        const reset = () => {
            tests = [];
        }
        const run = () => {
            tests.forEach(t => {
                console.group(`Testing...${t.name}`);
                console.assert((function () {
                return t.fn();
                }()), t.name);
                console.groupEnd();
            });
        }
        return {
            reset,
            run,
            test
        }
    }
    // Example usage:

    const myTestRunner = MyTestRunner();
    const n = 3

    // add tests. Test must be a function that returns a boolean
    myTestRunner.test('n should be greater than 2', () => {
        return n > 4;
    });
    // run tests
    myTestRunner.run();

    ```
* Doing it manually in the console
    ```
    const n = 3;

    console.group('Testing ... n should be greater than 2');
    console.assert((n > 2), `${n} is not greater than 2`);
    console.groupEnd();

    console.group('Testing ... n + 1 should be greater than 5');
    console.assert((function () {
    const result = n + 1;
    return (result > 5);
    }()), `${n} is not greater than 5`);
    console.groupEnd();
    ```

    
</details>


<details>
        <summary>Setting breakpoints within a complicated function to determine exactly where it deviates from expected behavior</summary>

        https://developers.google.com/web/tools/chrome-devtools/javascript

</details>

<details>
        <summary>Using console logs to output relevant debugging information</summary>
        
* Use `console.log()` for basic logging
* Use `console.error()` and `console.warn()` for eye-catching stuff
* Use `console.group()` and `console.groupEnd()` to group related messages and avoid clutter
    ```
    console.group("Authentication phase");
    console.log("Authenticating user", user);
    // authentication code here...
    if (!authenticated) {
        console.log("User not authenticated.", user)
    }
    console.groupEnd();
    ```
    *When using groups heavily, it can be very useful to not see everything as it happens. For these times you can automatically collapse groups by calling `console.groupCollapsed()` instead of `console.group()`*

* Use `console.assert()` to show conditional error messages
    ```
    console.assert(list.childNodes.length <= 500, "Node count is > 500");
    ```
* Formatting:
    - `%s`	Formats the value as a string
    - `%i` or `%d`	Formats the value as an integer
    - `%f`	Formats the value as a floating point value
    - `%o`	Formats the value as an expandable DOM element. As seen in the Elements panel
    - `%O`	Formats the value as an expandable JavaScript object
    - `%c`	Applies CSS style rules to the output string as specified by the second parameter
        ```
        console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
        ```
    https://developers.google.com/web/tools/chrome-devtools/console/console-write
</details>

<details>
        <summary>Reproducing and fixing bugs based on user reported issues</summary>
</details>

## ES2015 concepts and syntax

<details>
        <summary>JavaScript promises with ES2015 syntax that create asynchronous functions and incorporate graceful error handling</summary>

* Basic syntax
    ```
    const getPromisedData = (param) => {
    const promiseOfData = new Promise((resolve, reject) => {
            if(successful)
                resolve(successObject)
            } else {
                reject(Error('Your error description here'));
            }
        });
    return promiseOfData;    
    }
    ```
 * Chaining and handling errors
    ```
    const promiseRunChain = () => {
    return getPromisedData(param)
    .then(doStuff)
    .then(doMoreStuff)
    .catch(handleError); 
    }
    ```
* Multiple Promises

    `Promise.all`
    ```
    const promises = [
    getPromisedData(param),
    getPromisedData(param),
    getPromisedData(param)
    ];

    Promise.all(promises).then((values) => {
        console.log(values);
    });
    // expected output: Array [value, value1, value3]
    ```
    `Promise.race`
    ```
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 500, 'one');
    });

    const promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, 'two');
    });

    Promise.race([promise1, promise2]).then((value) => {
        console.log(value);
        // Both resolve, but promise2 is faster
    });
    // expected output: "two"
    ```
</details>

<details>
        <summary>Variables that can be used with block scope, function scope, and made immutable depending on context using `let`, `var`, and `const`</summary>

TIP: use `const` by default, only fall to `let` if you're sure the variable will change;

</details>

<details>
        <summary>String literals that include string interpolation and multi-line strings</summary>

DO
```
const name = 'John';
const age = 21;
console.log(`His name is ${name}, he is ${age} years old`);
```
AVOID
```
console.log('His name is' + name + ', he is ' + age + ' years old');
```
---
DO
```
console.log(`I would like to 
Log this message
in more than just one line`);
```
AVOID
```
console.log('I would like to');
console.log('Log this message');
console.log('in more than just one line');
```

</details>

<details>
        <summary>Arrow functions that create anonymous functions and use an unbounded this</summary>

```
(param1, param2) => {
    // process function here
    return result;
}
```

```
param1 => param1 * 2;
```
</details>


<details>
        <summary>Default function parameters that initialize default values for a function when no argument or undefined is provided</summary>

```
const add = (a=3, b=5) => {
        return a + b; 
}
```
* Earlier parameters are available to later default parameters. If `b` was a function, it could use `a`

</details>

<details>
        <summary>`for...of` loops that can iterate over any iterable object while running a custom function on each</summary>

* **DON'T confuse `for...in` with `for...of`**

    DON'T USE
    ```
    for (var index in myArray) {   
    console.log(myArray[index]);
    }
    ```
    `for–in` was designed to work on plain old Objects with string keys. For Arrays, it’s not so great.

    DO
    ```
    for (var value of myArray) {
    console.log(value);
    }
    ```

* Unlike `forEach()`, `for...of` works with break, continue, and return.

* It also works on `Map` and `Set` objects.
</details>

<details>
        <summary>Maps that allow for arbitrary key and value pairs that are iterable and include non-string keys</summary>

* `Map` is a collection of keyed data items, just like an Object. But the main difference is that **Map allows keys of any type**.

    *Maps can be very flexible in places where objects can be a bit annoying, and it strongly serves the purpose in some specific scenarios, like adding and deleting key-pairs frequently.*

* Although `map[key]` also works, e.g. we can set `map[key] = 2`, this is treating map as a plain JavaScript object, so it implies all corresponding limitations (no object keys and so on). **We should use map methods: set, get and so on.**

* Iterating:
    ```
    // iterate over keys (vegetables)
    for (let vegetable of recipeMap.keys()) {
        alert(vegetable); // cucumber, tomatoes, onion
    }

    // iterate over values (amounts)
    for (let amount of recipeMap.values()) {
        alert(amount); // 500, 350, 50
    }

    // iterate over [key, value] entries
    for (let entry of recipeMap) { // the same as of recipeMap.entries()
        alert(entry); // cucumber,500 (and so on)
    }
    ```
    *The iteration goes in the same order as the values were inserted. Map preserves this order, unlike a regular Object.*
</details>

<details>
        <summary>Sets that contain only unique, iterable elements where an array would degrade performance</summary>

* A `Set` is a special type collection – “set of values” (without keys), where each value may occur only once.

* Iterating:
    ```
    let set = new Set(['red', 'green', 'blue']);
    for (let x of set) {
        console.log(x);
    }
    ```
</details>

See also: 
* https://javascript.info/map-set

## Mobile web forms

<details>
        <summary>Appropriate label tags associated with inputs</summary>

The `label` element provides direction to the user, telling them what information is needed in a form element. Each `label` is associated with an input element by placing it inside the `label` element, or by using the "for" attribute. Applying labels to form elements also helps to improve the touch target size: the user can touch either the `label` or the input in order to place focus on the input element.

```
<label>
    <input type="checkbox">Receive promotional offers?
</label>
``` 
or
```
<input id="promo" type="checkbox">
<label for="promo">Receive promotional offers?</label>
```

* `Placeholder`s disappear as soon as the user starts typing in an element, thus **they are not a replacement for labels**. They should be used as an aid to help guide users on the required format and content.
</details>

<details>
        <summary>Inputs with appropriate type, name and autocomplete attributes</summary>

* Input Types
    - `url` - For entering a URL. It must start with a valid URI scheme, for example http://, ftp:// or mailto:.
    - `tel` - For entering phone numbers. It does not enforce a particular syntax for validation, so if you want to ensure a particular format, you can use pattern.
    - `email` - For entering email addresses, and hints that the @ should be shown on the keyboard by default. You can add the multiple attribute if more than one email address will be provided.
    - `search` - A text input field styled in a way that is consistent with the platform's search field.
    - `number` - For numeric input, can be any rational integer. Additionally, iOS requires using pattern="\d*" to show the numeric keyboard.
    - `range` - For number input, but unlike the number input type, the value is less important. It is displayed to the user as a slider control.
    - `datetime-local` - For entering a date and time value where the time zone provided is the local time zone.
    - `date` - For entering a date (only) with no time zone provided.
    - `time` - For entering a time (only) with no time zone provided.
    - `week` - For entering a week (only) with no time zone provided.
    - `month` - For entering a month (only) with no time zone provided.
    - `color` - For picking a color.

 * Use `placeholder`s to provide guidance about what you expect.

 * To help the browser auto-complete the form, use established name's for elements and include the `autocomplete` attribute.

    *Chrome requires input elements to be wrapped in a `<form>` tag to enable auto-complete. If they're not wrapped in a form tag, Chrome will offer suggestions, but will not complete the form.*

 * Autocomplete types and name (for `<input name="">`)

    - Name - `name`, `fname`, `mname`, `lname`
    - Email	- `email`
    - Address - `address`, `city`, `region`, ` province`, `state`, `zip`, `zip2`, `postal`, `country`
    - Phone	- `phone`, `mobile`, `country-code`, `area-code`, `exchange`, `suffix ext`
    - Credit Card - `ccname`, `cardnumber`, `cvc`, `ccmonth`, `ccyear`, `exp-date`, `card-type`
    - Usernames - `username`
    - Passwords - `password`

* Tips for autocomplete:
    - DO NOT use javascript to truncate input on "invalid" fields

    - DO NOT create your own form controls, especially custom dropdowns that replace `<select>` elements. This works poorly with accessibility frameworks as well as with Chrome Autofill. Instead, use standard dropdowns and other elements that can be easily modified through modern CSS.

    - DO NOT use fake placeholder by setting the placeholder text as the value of the field (e.g., value="First Name") and using JavaScript to remove the value when the field gains focus. Autofill interprets such values as user-entered and doesn't replace the placeholder text with actual values, resulting in a poor Autofill experience. Instead, use floating field labels or placeholder="First Name" to guide users.
</details>

<details>
        <summary>Inputs with large touch targets for mobile forms</summary>

* `Labels` and `input`s should be large enough to be easy to press. In portrait viewports, field `label`s should be above `input` elements, and beside them in landscape. Ensure field `label`s and the corresponding `input` boxes are visible at the same time.

* A minimum recommended touch target size is around 48 device independent pixels on a site with a properly set mobile viewport. For example, while an icon may only have a width and height of 24px, you can use additional padding to bring the tap target size up to 48px. The 48x48 pixel area corresponds to around 9mm, which is about the size of a person's finger pad area.
</details>

<details>
        <summary>Suggestions for user input using the datalist element</summary>


* The `datalist` element isn't an input type, but a list of suggested input values to associated with a form field. It lets the browser suggest autocomplete options as the user types. Unlike select elements where users must scan long lists to find the value they're looking for, and limiting them only to those lists, `datalist` element provides hints as the user types.

    ```
    <label for="frmFavChocolate">Favorite Type of Chocolate</label>
    <input type="text" name="fav-choc" id="frmFavChocolate" list="chocType">
    <datalist id="chocType">
        <option value="white">
        <option value="milk">
        <option value="dark">
    </datalist>
    ```
</details>

|> Front-end validation of inputs (e.g., pattern, maxlength, required) and DOM elements,
 * including:

    <details>
            <summary>Checking validation errors in real-time with pseudo-classes on inputs</summary>

    CSS:
    ```
    input.dirty:not(:focus):invalid {
        background-color: #FFD9D9;
    }
    input.dirty:not(:focus):valid {
        background-color: #D9FFD9;
    }
    ```
    JS:
    ```
    const inputs = document.getElementsByTagName("input");
    const inputs_len = inputs.length;
    const validateInput = (evt) => {
        //validate input here
        if(!isValid){
            evt.srcElement.classList.addClass("dirty");
            return;
        }
        evt.srcElement.classList.removeClass("dirty");
    };

    for (let i = 0; i < inputs_len; i++) {
        const input = inputs[i];
        input.addEventListener("blur", validateInput);
        input.addEventListener("invalid", validateInput);
        input.addEventListener("valid", validateInput);
    }
    ```

    </details>

    <details>
            <summary>Form validation prior to submission (Constraint Validation API)</summary>

    ```
    form.addEventListener("submit", (evt) => {
        if (form.checkValidity() === false) {
            evt.preventDefault();
            alert("Form is invalid - submission prevented!");
            return false;
        } else {
            // submit form. you can actually remove this block altogether
        }
    });
    ```
    </details>
