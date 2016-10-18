# Scripty

An experimental tiny lib **(3kb)** to load any JS library from jsdelivr.com dynamically based on the lib name. Specific version also supported.


![Experimental](http://i3.cpcache.com/product/488780976/experimental_bumper_bumper_sticker.jpg?width=225&height=225&Filters=%5B%7B%22name%22%3A%22background%22%2C%22value%22%3A%22F2F2F2%22%2C%22sequence%22%3A2%7D%5D)

## Idea

This liberary made using [ES6 Custom Elements](https://developers.google.com/web/fundamentals/getting-started/primers/customelements#jsapi) which is not supported in all browsers [yet](http://caniuse.com/#search=custom%20elements%20v1), it depends on [jsdilvr CDN](https://www.jsdelivr.com/) and using its [APIs](https://github.com/jsdelivr/api) to search for any well known liberary by name **(nearest value)** and inject it dynamically into your page.

## Warning

One more time, this is an expiremntal liberary and was made just for testing purposes, it uses the nasty **synchronous HTTP calls** (which is already [deprecated](https://xhr.spec.whatwg.org/#the-open()-method)) to simulate the same blocking behaviour done by the `script tag`. More info about script tag and loading behaviour is from [here](http://javascript.info/tutorial/onload-ondomcontentloaded) 


## Usage
Add the small tiny little script tag at the header
```html
 <script src="scripty.js"></script>
```
Create scripty tag with the needed liberary name using packages property 
```javascript
<script-y packages="jquery"></script-y>
```
If the liberary name got 2 words (ex: angular icons or angular translate) just place the name with space and it will be replaced automatically by * as search APIs uses minimatch. **It will take the first item as closest value when search performed**
```javascript
<script-y packages="jquery*ui"></script-y>
```
Loading spicific version is also possible using `@` after the liberary name 
```javascript
<script-y packages="jquery@3.1.0"></script-y>
```
Scripts are loaded in order, so if there is a dependency between the different libs, just put them in order  
```javascript
<script-y packages="angularjs,angular translate"></script-y>
```
You can also load some local JS files if needed by using locals property (always will be loaded after packages complete)
```javascript
<script-y packages="jquery" locals="myscript.js"></script-y>
```
Add a callback function if needed, although the scripts are running in a blocking mechanism which means any script will come after scripty will be executed as in the same normal order. 
```javascript
<script-y packages="jquery" locals="external.js" oncomplete="amCallbackFunc()" ></script-y>
```  
## Side notes

Why the synchronous calls, because `DOMContentLoaded` awaits only for HTML and scripts, but won’t wait for a script, created by document.createElement (called dynamic script). 

The loading is quite it slow as the component flow as following : 

1. Render the component and read all the content passed from the html and setting its properties. 
2. Hit jsdilvr APIs to look for the needed liberary and retrieve all the info will be used ot get the lib. 
3. Create script tag and add to the DOM after evaluating the script loaded. 
4. Call the callback method when the whole DOM is ready by using `DOMContentLoaded`.


## Running example
Clone the project, run the almight `npm install` then run `gulp watch`

And to find which version was loaded in case you mentioned only the liberary name, open console and it will mention which version was downloaded `jquery@3.1.1`

![Experimental](https://amgadfahmi.files.wordpress.com/2016/10/screenshot-30.png)

## To do list

* Alternative to blocking mechanism (Async) with proper callback (on progress)
* Download the content first time and load it locally in the coming requests 
* Any suggestions are welcome 


## License

The MIT License (MIT)

Copyright (c) 2016 Amgad Fahmi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.