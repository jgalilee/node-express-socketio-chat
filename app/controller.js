var app = null;
var suffix = null;


/**
 Create the partial url by combining the suffix (normally the controller name) and the action path (/ + action).
*/
function partialUrlBuilder(actionPath) {
	if (suffix != null) {
		return suffix + actionPath;
	};
	return actionPath;

}

/**
	Run the passed in function in this scope. 
	e.g it can access all the variables in this file
*/
var evaluator = function(def) {
		// define the functions that will be used by the controller def
		var route = {
			get: {
				// arguments are expected to be of the form url, middleware function(s), action
				define: function() {
					arguments[0] = partialUrlBuilder(arguments[0]);
					app.get.apply(app, arguments);
				}
			},
			post: {
				define: function() {
					arguments[0] = partialUrlBuilder(arguments[0]);
					app.post.apply(app, arguments);

				}
			},
			urlSuffix: {
				set: function(suffixP) {
					if (suffixP !== '') {
						suffix = '/' + suffixP;
					}
					else {
						suffix = null;
					}
				}
			}
		};
		
		// run the definition
		def.apply(route);
	}

/**
	Set the suffix to be the controllerName in lowercase.
*/
function setup(controllerName) {
	suffix = '/' + controllerName.toLowerCase();
}

/**
	Remove the reference to the controllerName that was being used for this definition.
*/

function tareDown() {
	controllerName = null;
}

/**
	Sets up everything for the definition to be run, runs it, then reverts everything back. 
 */
function defRunner(controllerName, def) {
		setup(controllerName);
		evaluator(def);
		tareDown();

	};

/**
	Exports
*/
exports.define = defRunner;

exports.configure = function(appP) {
	app = appP;
}