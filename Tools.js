var Tools = {

	addClass : function (el,cls) { // It add a class to an HTML element, jQuery does it but you don't always work with jQuery.
		
		typeof(cls) == "object" && cls.length ? el.classList.add.apply(el.classList,cls) : el.classList.add(cls);

	},

	createHTML : function (cls,text,tag) { // You know how you always put a class and sometimes content after creating an HTML element ?
		
		if(!cls) return; // RULE : no HTML without cls
		var el = document.createElement(tag || 'div');
		el.innerHTML = text || "";
		Tools.addClass(el,cls);
		return el;
		
	},

	isDomElement : function (el) { // So dear el parameter : HTML, do you speak it ?
		
		return el && el.tagName;

	},

	appendChildren : function (father,children) { // why the el is it not in standard JS next to appendChild ?
		
		if(!Tools.isDomElement(father)) return;

		for(var i = 0, n = children.length; i < n; i++){
			
			if(Tools.isDomElement(children[i])) father.appendChild(children[i]);
			else if(typeof(children[i]) == "string") father.appendChild(Tools.createHTML(children[i])); 
			else if (console && console.info) console.info("Tools : The element of index " + i + " and of value "+ children[i] + " is not a DOM Element. It has not been added");

		} 

	},
	
	removeChildren : function (father,children) { // Same that in last comment

		var trueChildren = father.children;
		for(var i = 0, n = children.length; i < n; i++) if(trueChildren.indexOf(children[i]) > -1) father.removeChild(children[i]);

	},

	removeClass : function (el,cls) { // Same thing for addClass 
		el.classList.remove(cls);
	},
	
	eventLoader : function (elem,events) { // events is a litteral object with properties such as "onmousemove" "onkeydown" and so on
		// TO BE DONE
	},


	/* Some people may not know it but in JS (and in ActionScript) a.b is the same that a["b"]
	One day I needed to have var a = new ["class"]() because I was loading a lot of different classes that were in an array*/
	
	fromStringToClass : function (strg,scope) {// This function better be binded when using it without a scope
		if(!strg) return;
		var namespaces = strg.split(".");
		var cls = scope || this;
		for (var i = 0, n = namespaces.length; i < n; i++) {
			cls = cls[namespaces[i]];
		}

		return cls;
	}
}