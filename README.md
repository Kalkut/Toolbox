# Toolbox
Set of tools to help me create various websites/webapps with JavaScript


# What is the point of this repo ?
I'm a busy (and a lazy) web dev. I hate doing the same thing over and over and I like being able to easily modify my work.
I hate using libs for things I can easily code myself though, so here is this repo.
I'm currently building my resume/portfolio with those tools

#Tools.js
This is the basis for a tools lib that will hopefully grow bigger and bigger. If there is anything not DRY when I manipulate
DOM Objects *bam* I add a method to Tools.js.

#Website.js
This is a collection of "classes" (quotation marks for my fellow C++ and Java devs) that allow me to construct a website quite fast. Those classes are small bricks
that are omnipresent in webpages and webapps. Having classes allow me to keep track to what I need and to encapsulate what I don't.


- Item : Items of list. You know when you have x times the same "Picture/Title/Texte" pattern. 
- Band : Header/Footer and Menus. You can add items to them
- Workspace : bad naming, it's basically what's not a footer/header or a menu. You can can add items in it
- Preview : Image with text (title and/or a small comment) on or beside it

Fun fact you can imbricate Items. 

#What's next ?

Well it lacks callbacks : I love callbacks. I will also allow the creation of new events. 
(I know it already exists, but I'm going to do it anyway : you can't stop me !)

Have a good day.
