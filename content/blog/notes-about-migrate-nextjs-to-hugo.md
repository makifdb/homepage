---
title: Notes About Migrate Next.js to Hugo
date: 2022-03-08T16:29:57+03:00
draft: false
image: images/anastasiia-balandina-CMUsC_BW1Ho-unsplash.jpg
---

When I decided to write something on my own blog instead of Medium (although I almost never write), I created my first personal website using Next.js and TailwindCSS. I was keeping my blog on Github and writing my posts in `MDX` format. My only downside was that I had to mess with the JavaScript libraries.

![Photo by Anastasiia Balandina on Unsplash](/images/anastasiia-balandina-CMUsC_BW1Ho-unsplash.jpg "Photo by Anastasiia Balandina on Unsplash")

I wasn't feeling this comfortable with JavaScript and wanted to switch to Hugo,
I postponed this for a long time for reasons such as transferring my blog posts and worrying about transferring the CSS I wrote with TailwindCSS. However, the JavaScript libraries I use have become obsolete over time and have been replaced by others. So I wanted to seize this opportunity and finally decided to switch Hugo.


## Directory Structure

Hugo's directory structure is very clean and simple. I restructure my website easily.

```
.
├── assets/css
│   ├── main.css
│   └── style.css
├── content
│   └── blog
│       ├── my-awesome-blog-post.md
│       └── my-awesome-blog-post-2.md
├── layouts
│   ├── _default
|   |   ├── baseof.html
|   |   ├── list.html    
|   |   └── single.html 
│   ├── partials
|   |   ├── footer.html
|   |   ├── head.html
|   |   └── header.html
│   ├── 404.html
│   └── index.html
├── static
│   ├── images
|   |   └──my_awesome_image.jpg
│   └── favicon.ico
├── config.toml // Hugo's config file
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## Markdown Files

There was no problem in porting the blogs I wrote as Markdown. I just copied and moved it to the other folder. For styling, I used Tailwind's [typography](https://tailwindcss.com/docs/typography-plugin) plugin.

## Code Highlighting

While using Next.js, I was highlighting code blocks inside blog pages with `react-syntax-highlighter`. But when I switched to Hugo, I started using Hugo's own built-in highlighter [chroma](https://github.com/alecthomas/chroma) instead. Written in pure go, chroma is very fast and configurable.

## CSS

I was able to migrate the TailwindCSS + PostCSS binary, which I use in Next.js, to Hugo with very minor changes. In this way, I do not need to write CSS again.

```js {hl_lines=[5,6,9,10]}
// tailwind.config.js
module.exports = {
  content: [
    // HUGO
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",

    // NEXTJS
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
```

## Hosting

I wanted to continue using [Vercel](https://vercel.com) that I used with Next.js, but I ran into a small problem. My blog needed a higher version of Hugo to get the build. I solved this problem by changing the Hugo version to the same version I was using on my PC.

```json
// vercel.json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.93.1"
    }
  }
}
```

If you want to examine it in more detail, my [old website](https://github.com/makifdb/old-homepage) and my [new website](https://github.com/makifdb/homepage) are on Github. You can examine it in more detail from there.