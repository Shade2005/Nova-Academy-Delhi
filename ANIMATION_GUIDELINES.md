# Nova Academy Animation & Transition Guidelines

To keep the website feeling premium, dynamic, and consistent, we use a custom JavaScript and CSS engine (`premium.js` and `premium.css`). You do not need to write complex CSS to animate elements. Simply add the following utility classes to your HTML elements.

## 1. Scroll Revealing (`reveal`, `reveal-left`, `reveal-right`)
These classes hide the element until the user scrolls it into view, at which point they smoothly fade and slide into place.

*   `reveal`: Fades in and slides up from the bottom. Good for paragraphs, headers, and images.
*   `reveal-left`: Fades in and slides in from the left. Good for left-aligned text blocks.
*   `reveal-right`: Fades in and slides in from the right. Good for right-aligned images or alternating layouts.

**Example usage:**
```html
<h1 class="reveal">Welcome to Nova Academy</h1>
<img src="asset.png" class="reveal-right">
```

## 2. Staggered Group Revealing (`reveal-group`)
Instead of applying `reveal` to 5 different cards inside a grid, apply `reveal-group` to the **parent container**. As the parent scrolls into view, each of its direct children will animate in sequentially with a slight delay (staggered effect).

**Example usage:**
```html
<div class="grid grid-cols-3 reveal-group">
  <div class="card">Card 1 appears first</div>
  <div class="card">Card 2 appears 0.1s later</div>
  <div class="card">Card 3 appears 0.2s later</div>
</div>
```

## 3. Card Hover Effects (`hover-lift`)
Apply this class to any `<article>`, `<div>`, or card that a user might interact with or click. When they hover over it, the card will smoothly lift off the page and cast a larger shadow.

**Example usage:**
```html
<div class="p-8 bg-white rounded-xl hover-lift">
   <h3>Digital Marketing</h3>
</div>
```

## 4. Magnetic Buttons (`magnetic`)
Apply this to prominent call-to-action buttons. When the user moves their mouse near the button, the button will physically get "pulled" toward the cursor, creating a highly premium, interactive feel.

**Example usage:**
```html
<button class="magnetic bg-primary text-white p-4 rounded-full">
   Apply Now
</button>
```

---

### Implementation Checklist for Blogs:
When you create a new blog post using the template, ensure you have:
1.  `<header class="reveal">` on the top title section.
2.  `<figure class="reveal">` on your main image.
3.  `<div class="prose ... reveal">` on your main text wrapper.
4.  `<div class="not-prose ... reveal-group">` on your FAQ section so the questions load one by one.
5.  `class="... hover-lift reveal"` on your final call-to-action box at the bottom.
