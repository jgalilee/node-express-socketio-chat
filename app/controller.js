var app = null;

var controllerName = null;

function urlMaker(actionName) {
	if (actionName != '') {
		return "/" + controllerName.toLowerCase() + "/" + actionName;
	};
	return '/';

}

var loginHelper = require('./controllers/helpers/loginHelper');

var route = {
	get: {
		// arguments are expected to be of the form url, middleware function(s), action
		define: function() {
			arguments[0] = urlMaker(arguments[0]);
			app.get.apply(app, arguments);
		}
	},
	post: {
		define: function(actionName, action) {
			arguments[0] = urlMaker(arguments[0]);
			app.post.apply(app, arguments);
			
		}
	}
};

/**
	run the passed in function in this scope. 
	e.g it can access all the variables in this file
*/
var evaluator = function(func) {
		eval("(" + func.toString() + ')()');
	}

	/**
	 */
var runner = function(controllerNameP, def) {
		controllerName = controllerNameP;
		evaluator(def);
		controllerName = null;
	};
/**
 */
// route.namespace = {
// 	define: function(namespaceName, def) {
// 		// Keep a reference to the old defines
// 		var oldGetDefine = route.get.define;
// 		var oldPostDefine = route.post.define;
// 		route.get.define= function(){
// 			console.log("new get define");
// 		}
// 		route.post.define = function() {
// 			console.log("new post define");
// 		}
// 		evaluator(def);
// 		// reset the defines.
// 		route.get.define = oldGetDefine;
// 		route.post.define = oldPostDefine;
// 	}
// }
exports.define = runner;

exports.configure = function(appP) {
	app = appP;
}