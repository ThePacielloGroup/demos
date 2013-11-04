The Paciello Group HTML & ARIA Demos
=====================================

This repository contains demos of how to make various static and interactive content idioms accessible.  It is hosted via GitHub pages; all the output is clean HTML and no frameworks are used.

The repository features tagging of "articles" and has an Atom feed so you can easily keep up-to-date.

Adding Demos
-------------

Each "demo" is actually a "post" or "aritcle" in the `_posts` directory.  Boilerplate headers, footers and styling HTML/CSS will be applied automatically.  Each post has some associated metadata, including tags and a link to the W3C's "Understanding" documents on the relevant guidelines.

Note that, for internal housekeeping relating to adding posts, you need to put a date in the filename, but the date will not show up as part of the post's URL, as the site has been configured to just use the post's title instead.

Testing Locally
----------------

To test your changes locally before committing, use [Jekyll](http://jekyllrb.com); simply run the command `jekyll serve --watch` and all changes will be reflected on the site, served by default at `http://localhost:4000`.
