---
title: How I fixed `htmx` `redeclaration of let element` with `hx-boost=true`
date: 2023-2-22
tags: HTMX, Django, Single Page Router
---

`htmx` is gaining popularity in `django` ecosystem. For example, I have created my latest [project](https://github.com/baseplate-admin/CoreProject/) with `django` + `htmx`. The sites user page was previously written using [`svelte`](https://github.com/baseplate-admin/CoreProject/tree/dbe619fe24f786042a23d77a7025fcf28bdc5242/frontend/User) but I was not using `django` to it's full capability. ( `django templating language` is such a blessing | I dont even have to deal with tokens and refresh and all other nonsenses )

Thats when I started rewriting [`user`](https://github.com/baseplate-admin/CoreProject/tree/dbe619fe24f786042a23d77a7025fcf28bdc5242/frontend/User) from `svelte` to `django` + `django_cripsy_forms`

# The problem

When I was writing the user code in django I planned to do realtime lookup of username availablity. So thats what I did.

Heres the django code :

```html
<!--signup.html-->
<!--Bunch-of-code-rendered-by-django-crispy-forms-->

<!--This is the problematic code block-->
<script>
  let el = document.querySelector('#id_username')

  el.addEventListener('input', async () => {
    // Do a bunch of works here
  })
</script>
```

Soon enough I was running into this error ( with `hx-boost=true` in the div after body tag ) whenever I revisited the page.

```typescript
Uncaught SyntaxError: redeclaration of let el
    <anonymous> http://127.0.0.1:8000/user/login/ line 1 > injectedScript:1
    ct http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ht http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ht http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    o http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    o http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    setTimeout handler*o http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    fr http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    onload http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    lr http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    I http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ze http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ze http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    pt http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    mt http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    mt http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    o http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    o http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    setTimeout handler*o http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    fr http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    onload http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    lr http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    I http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ze http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ze http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    pt http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    mt http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    mt http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    o http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    o http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    setTimeout handler*o http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    fr http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    onload http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    lr http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    I http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ze http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    ze http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Ue http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    pt http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    mt http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    Y http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    mt http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    <anonymous> http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    pr http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    <anonymous> http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    <anonymous> http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    <anonymous> http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
    <anonymous> http://127.0.0.1:8000/static/js/htmx/htmx.min.js:1
line 1 > injectedScript:1:1
```

This was something I never ran into before. As `HTMX` was quite new I didn't find much resource on this weird error. I asked on their [discord channel](https://discord.com/channels/725789699527933952/864934037381971988/1077471927989440574) about this particular error ( this wasn't that uncommon as another user reported this error on their discord [thread](https://discord.com/channels/725789699527933952/1066354856643809400/1066354859001008229) ). But I didn't find any response. Do I started digging deeper into this mess.

At a glance nothing seemed wrong ( I wrote couple project in `react`, `svelte` | So I had a good understanding of JS ).. Maybe because I was not familiar with `django` and `html` I thought. I have never stumbled upon this error in my life before.

# Digging deeper

So after a while I thought of removing `htmx` and just doing things the plain `django` way. Things started to work nicely again. So was it related to `htmx` afterall? `htmx` for those of you dont know does things in a particular way with `hx-boost`.

1. It fetches the anchor tags `html`.
2. Replaces `body` with said `html`.
3. Re executes `scripts` inside those `body` tags.

So naturally I thought of disabling execution of `script` tags by moving the scripts to the `head`. It worked :D.

But according to htmx author. After `2.0` release `htmx` would re execute the scripts on the head. At the time of writing there is [`head-support`](https://htmx.org/extensions/head-support/) extension that enables said functionality and it was to be merged into htmx by `2.0` release.

# The Solution

So I was out of hope at this point. Then I stumbled upon this [stackoverflow thread](https://stackoverflow.com/a/13626288) ( god bless stackoverflow ). Here I learned about scoping functions. I was familiar with function scoping back in my `react` days as `react` didn't support top level await codes and I had to do something like this :

```javascript
;(async () => {
  await fetch('')
})()
```

So I modified my code like this :

```html
<script>
  ;(() => {
    let el = document.querySelector('#id_username')

    el.addEventListener('input', async () => {
      // Do a bunch of works here
    })
  })()
</script>
```

and the error was fixed. ( MAGICALLY!! )

# But wait there's no magic actually

For me the `hx-boost` worked with my stack :

- Django **<i class="fa fa-brands fa-python"></i>**
- Tailwind **<i class="fa fa-brands fa-css3-alt"></i>**
- HTMX **<i class="fa fa-duotone fa-code"></i>**
- Alpine **<i class="fa fa-brands fa-js"></i>**
- jQuery **<i class="fa fa-brands fa-js"></i>**

# Moving forward

If you see the pages source. You can see that the site is not written in some fancy `JavaScript` framework but it feels like an SPA ( Single Page Application ). Thats because the site is using a small `JavaScript` library called `flamethower-router` ( for those of you who follow `fireship.io` you guys should know what this is ).

But I ran into the exact same error that I faced with `htmx` ( maybe its the issue with these frontend routers ). When i ran the site without scoping the `script` tag i ran into :

```typescript
Uncaught SyntaxError: redeclaration of let themeToggleDarkIcon
    <anonymous> how-i-fixed-htmx-redeclaration-of-let-element-with-hx-boosttrue.html line 7 > injectedScript:1
    s main.js:92
    n main.js:86
    reconstructDOM main.js:197
    go main.js:104
    onclick (index):1
how-i-fixed-htmx-redeclaration-of-let-element-with-hx-boosttrue.html line 7 > injectedScript:1:1
```

So I modified the theme's [original script](https://github.com/aleylara/Papyrus/blob/a38df10b27367b5f5fe6c477f7b7ccdb772fa1e9/templates/base.html#L216-L245) to be [scoped](https://github.com/baseplate-admin/Blog/blob/3aed8128a72e5e2010630cd92a5bd3c387eb58bf/themes/Papyrus/templates/base.html#L221-L252).

Moving forward I hope to see more sites powered using a frontend `SPA` router and finally put an end to the pesky page refresh.

— Baseplate-admin
