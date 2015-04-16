// ONCE : //Comment that I'll write ONCE although this comment is true for the whole page though
// KEZAKO : // What is it ?
// WATCH IT : // Well, watch it !

var Website = window.Website =  {
	
	Item : function (o) { // KEZAKO : An Item is an HTML element that is reapeted several time in another. It happens all the time so here is it's own class
	
		var init = function (o) { // ONCE : initialisation at the construction of an instance. some would say that it's the "constructor" and the other functions are the methods (and they are right).
			buildHTML(o);
			editContent(o)
		}.bind(this)

		var content; // ONCE : private functions/properties do not really exist in JS so I use the scope of JS variables to have one
		var title;
		var text;
		var picto;

		var buildHTML = function (o) { // ONCE : The name of this method is quite explicit, it builds HTML with JS DOM manipulation methods
			
			this.el = Tools.createHTML('item');
			if(o && o.className) Tools.addClass(this.el,o.className) 

			Tools.appendChildren(this.el,[picto = Tools.createHTML( o.topTitle ? 'top-title' : 'picto'),content = Tools.createHTML('content')]);
			Tools.appendChildren(content,[title = Tools.createHTML('title'),text = Tools.createHTML('text')]);

		}.bind(this) // ONCE : If I don't bind "this", my function wouldn't really be a method. And "this" wouldn't work any way (no pun intended)

		var deleteContent = function () {
			
			content.innerHTML = "";

		}.bind(this)

		var editContent = function (o) {
			
			if(!o) return;
			if(o.picto) picto.style.backgroundImage = 'url("' + o.picto + '")';
			if(o.title) title.innerHTML = o.title;
			if(o.text) text.innerHTML = o.text;
			if(o.topTitle) this.pictoIsText(o.topTitle);

		}.bind(this)

		this.appendToContent = function (domObj) { // ONCE : public method

			domObj.length >= 0 ?  Tools.appendChildren(content,domObj) : content.appendChild(domObj);
		}

		this.pictoIsText = function (text) {
			picto.style.BackgroundImage = "";
			picto.innerHTML = text;
		}.bind(this)


		init(o); // ONCE : Init initialise, nothing surprising
	},

	Band : function (o) { // KEZAKO : Create a band (header, footer, left band, right band, rock band)

		var init = function (o) {
			this.items = [];
			buildHTML(o);

		}.bind(this)

		var buildHTML = function (o) {
			if(!o) o = {};

			this.el = Tools.createHTML('band');
			if(o.className) Tools.addClass(this.el,o.className);

		}.bind(this)

		this.addItem = function (itemArray) { // WATCH IT : I almost always want to put a list of similar HTML elements in a band. This methods takes an array of parameters and it create and append the according Items
			
			if(!itemArray.length) return;

			var newItems = [];

			for(var i = 0, n = itemArray.length ; i < n; i++ ) {
				
				newItems.push(new Website.Item(itemArray[i]));

			}

			this.items = this.items.concat(newItems);
			Tools.appendChildren(this.el,newItems.map(function (elem) { return elem.el }));

		}

		this.removeItem = function (n) { 
			if(!n) var n = 1;

			var oldItems = [];

			for (var i = 0; i < n; i++) {

				oldItems.push(this.items[n-i-1]);
				this.items.pop();

			}

			Tools.removeChildren(this.el,oldItems);

		}

		this.plug = function (obj,property) {
			if (!property) {
				console.error("No new property was defined.")
				return;
			}
			else if (this[property]) {
				console.info("The property " + property + " was overwritten.");
			}

			this[property] = obj;
			this.el.appendChild(obj.el);

		}

		init(o);

	},

	Preview : function (o) { // Kezako : Picture with a title and a comment
	
		var init = function (o) {
			buildHTML();
			editContent(o)
		}.bind(this)

		var title;
		var comment;

		var buildHTML = function () {
			
			this.el = Tools.createHTML('preview');
			
			Tools.appendChildren(this.el,[Tools.createHTML('photo'),title = Tools.createHTML('title'), comment = Tools.createHTML('comment')]);

		}.bind(this)

		var editContent = function (o) {
			title.innerHTML = o.title;
			comment.innerHTML = o.comment;
		}
		
		init(o);
	},

	Workspace : function () { // KEZAKO : workspace in a WebApp. A workspace is where the action is (by exemple GitHub text editor is a module in a workspace)


		var init = function () {
			this.items = [];
			buildHTML();
		}.bind(this)

		var buildHTML = function () {

			this.el = Tools.createHTML('workspace');

		}.bind(this)

		this.addItem = new Website.Band().addItem.bind(this); // WATCH IT : A good programmer is a lazy programmer. Binding is obviously required here
		this.removeItem = new Website.Band().removeItem.bind(this);
		this.plug = new Website.Band().plug.bind(this);

		init();
	},

	Button : function (o) { // KEZAKO : You click on it and something happens

		var events; 

		var init = function (o) {
			
			if(!o) var o = {};

			events = o.events || null;
			buildHTML(o);
			initEvents(events);

		}.bind(this)

		var buildHTML = function (o) {

			this.el = Tools.createHTML('button',o.innerHTML || '');
			if(o.className) Tools.addClass(this.el,o.className);

		}.bind(this)

		var initEvents = function (evts) {
			
			if(!events) return;

			for (evt in evts) {

				this.el.addEventListener(evt,evts[evt]);

			}

		}.bind(this)

		var destroyEvents = function (evts) {

			for (evt in evts) {

				this.el.addEventListener(evt,evts[evt]);

			}

		}.bind(this)

		this.destroy = function () {
			
			if(this.el.parentNode) this.el.parentNode.removeChild(this.el);

			destroyEvents(events);
		}

		init(o);
	},

	Surlayer : function (o) { // Mostly used for pop-ins

		var init = function (o) {
			if(!o) o = {};
			buildHTML(o);

		}.bind(this)

		buildHTML = function (o) {
			
			this.el = Tools.createHTML('surlayer')
			if(o.className) Tools.addClass(this.el,o.className);

		}.bind(this)

		this.destroy + function () {

			if(this.el.parentNode) this.el.parentNode.removeChild(this.el);

		}

		init(o);
	},


	Popin : function (o) { // KEZAKO : A module that create a pop-in and a surlayer too if required.

		if(o.cancel) var cancel = o.cancel;
		if(o.surlayer) var surlayer = o.surlayer;

		var init = function (o) {
			if(!o) o = {};
			o.items ? this.items = o.items : this.items = [];
			buildHTML(o);
		}.bind(this)

		buildHTML = function (o) {
			
			this.el = Tools.createHTML('popin');
			if(o.className) Tools.addClass(this.el,o.className);

		}.bind(this)

		
		
		this.destroy = function () {

			if(this.el.parentNode) this.el.parentNode.removeChild(this.el);
			if(surlayer && surlayer.parentNode) surlayer.parentNode.removeChild(surlayer);
			destroyEvents();
		}

		this.setEvents = function () {
			document.body.addEventListener("mouseup",this.destroy.bind(this),true)
		}

		var destroyEvents = function () {
			if(!cancel) return;
			document.body.removeEventListener("mouseup",this.destroy.bind(this))
		}.bind(this)

		this.setSurlayer = function (srlyr) {
			surlayer = srlyr;
		}

		var clear = function (e) {
			
			if(e.currentTarget != this.el) this.destroy();

		}.bind(this)

		this.addItem = new Website.Band().addItem.bind(this); // WATCH IT : It's DRY as f*** here ! More seriously, a good dev' is a lazy dev'.
		this.removeItem = new Website.Band().removeItem.bind(this);
		this.plug = new Website.Band().plug.bind(this);

		init(o);
	},

	Slider : function (o) { // KEZAKO : a bar and a cursor that moves (or not) along the former. Can be used as a custom scroll bar by example

		if(!o) o = {};
		
		var bar;
		this.cursor;

		var init = function (o) {

			buildHTML(o);
			setCursor(o.gradient,o.direction);

		}.bind(this)

		var buildHTML = function (o) {
			var bc;

			this.el = Tools.createHTML('slider');
			Tools.appendChildren(this.el,[o.title ? Tools.createHTML('title',o.title) : null, bc = Tools.createHTML('bar-container'), o.picto ? Tools.createHTML('picto') : null]);
			Tools.appendChildren(bc, [bar = Tools.createHTML('bar'), Tools.createHTML('background-bar'),this.cursor = Tools.createHTML('cursor')]);

			if(o.className) Tools.addClass(this.el,o.className);
		}.bind(this)

		var setCursor = function (gradient,direction) { // Sometimes you have to tell CSS that you'll handle this by yourself

			bar.style.width = gradient;
			this.cursor.style[direction || "left"] = gradient;
		
		}.bind(this)

		init(o);

	}
}