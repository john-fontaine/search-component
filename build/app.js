/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "2aad3050d1083e030f73"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(76);
	module.exports = __webpack_require__(78);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {var url = __webpack_require__(2);
	var stripAnsi = __webpack_require__(9);
	var socket = __webpack_require__(11);
	
	function getCurrentScriptSource() {
		// `document.currentScript` is the most accurate way to find the current script,
		// but is not supported in all browsers.
		if(document.currentScript)
			return document.currentScript.getAttribute("src");
		// Fall back to getting all scripts in the document.
		var scriptElements = document.scripts || [];
		var currentScript = scriptElements[scriptElements.length - 1];
		if(currentScript)
			return currentScript.getAttribute("src");
		// Fail as there was no script to use.
		throw new Error("[WDS] Failed to get current script source");
	}
	
	var urlParts;
	if(true) {
		// If this bundle is inlined, use the resource query to get the correct url.
		urlParts = url.parse(__resourceQuery.substr(1));
	} else {
		// Else, get the url from the <script> this file was called with.
		var scriptHost = getCurrentScriptSource();
		scriptHost = scriptHost.replace(/\/[^\/]+$/, "");
		urlParts = url.parse((scriptHost ? scriptHost : "/"), false, true);
	}
	
	var hot = false;
	var initial = true;
	var currentHash = "";
	var logLevel = "info";
	
	function log(level, msg) {
		if(logLevel === "info" && level === "info")
			return console.log(msg);
		if(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning")
			return console.warn(msg);
		if(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error")
			return console.error(msg);
	}
	
	var onSocketMsg = {
		hot: function() {
			hot = true;
			log("info", "[WDS] Hot Module Replacement enabled.");
		},
		invalid: function() {
			log("info", "[WDS] App updated. Recompiling...");
		},
		hash: function(hash) {
			currentHash = hash;
		},
		"still-ok": function() {
			log("info", "[WDS] Nothing changed.")
		},
		"log-level": function(level) {
			logLevel = level;
		},
		ok: function() {
			if(initial) return initial = false;
			reloadApp();
		},
		warnings: function(warnings) {
			log("info", "[WDS] Warnings while compiling.");
			for(var i = 0; i < warnings.length; i++)
				console.warn(stripAnsi(warnings[i]));
			if(initial) return initial = false;
			reloadApp();
		},
		errors: function(errors) {
			log("info", "[WDS] Errors while compiling.");
			for(var i = 0; i < errors.length; i++)
				console.error(stripAnsi(errors[i]));
			if(initial) return initial = false;
			reloadApp();
		},
		"proxy-error": function(errors) {
			log("info", "[WDS] Proxy error.");
			for(var i = 0; i < errors.length; i++)
				log("error", stripAnsi(errors[i]));
			if(initial) return initial = false;
		},
		close: function() {
			log("error", "[WDS] Disconnected!");
		}
	};
	
	var hostname = urlParts.hostname;
	var protocol = urlParts.protocol;
	
	if(urlParts.hostname === '0.0.0.0') {
		// why do we need this check?
		// hostname n/a for file protocol (example, when using electron, ionic)
		// see: https://github.com/webpack/webpack-dev-server/pull/384
		if(window.location.hostname && !!~window.location.protocol.indexOf('http')) {
			hostname = window.location.hostname;
		}
	}
	
	// `hostname` can be empty when the script path is relative. In that case, specifying
	// a protocol would result in an invalid URL.
	// When https is used in the app, secure websockets are always necessary
	// because the browser doesn't accept non-secure websockets.
	if(hostname && (window.location.protocol === "https:" || urlParts.hostname === '0.0.0.0')) {
		protocol = window.location.protocol;
	}
	
	var socketUrl = url.format({
		protocol: protocol,
		auth: urlParts.auth,
		hostname: hostname,
		port: (urlParts.port === '0') ? window.location.port : urlParts.port,
		pathname: urlParts.path == null || urlParts.path === '/' ? "/sockjs-node" : urlParts.path
	});
	
	socket(socketUrl, onSocketMsg);
	
	function reloadApp() {
		if(hot) {
			log("info", "[WDS] App hot update...");
			window.postMessage("webpackHotUpdate" + currentHash, "*");
		} else {
			log("info", "[WDS] App updated. Reloading...");
			window.location.reload();
		}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?http://localhost:8080"))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var punycode = __webpack_require__(3);
	var util = __webpack_require__(5);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(6);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module), (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(7);
	exports.encode = exports.stringify = __webpack_require__(8);


/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(10)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var SockJS = __webpack_require__(12);
	
	var retries = 0;
	var sock = null;
	
	function socket(url, handlers) {
		sock = new SockJS(url);
	
		sock.onopen = function() {
			retries = 0;
		}
	
		sock.onclose = function() {
			if(retries === 0)
				handlers.close();
	
			// Try to reconnect.
			sock = null;
	
			// After 10 retries stop trying, to prevent logspam.
			if(retries <= 10) {
				// Exponentially increase timeout to reconnect.
				// Respectfully copied from the package `got`.
				var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
				retries += 1;
	
				setTimeout(function() {
					socket(url, handlers);
				}, retryInMs);
			}
		};
	
		sock.onmessage = function(e) {
			// This assumes that all data sent via the websocket is JSON.
			var msg = JSON.parse(e.data);
			if(handlers[msg.type])
				handlers[msg.type](msg.data);
		};
	}
	
	module.exports = socket;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var transportList = __webpack_require__(13);
	
	module.exports = __webpack_require__(60)(transportList);
	
	// TODO can't get rid of this until all servers do
	if ('_sockjs_onload' in global) {
	  setTimeout(global._sockjs_onload, 1);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = [
	  // streaming transports
	  __webpack_require__(14)
	, __webpack_require__(31)
	, __webpack_require__(41)
	, __webpack_require__(43)
	, __webpack_require__(46)(__webpack_require__(43))
	
	  // polling transports
	, __webpack_require__(53)
	, __webpack_require__(46)(__webpack_require__(53))
	, __webpack_require__(55)
	, __webpack_require__(56)
	, __webpack_require__(46)(__webpack_require__(55))
	, __webpack_require__(57)
	];


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(16)
	  , urlUtils = __webpack_require__(19)
	  , inherits = __webpack_require__(27)
	  , EventEmitter = __webpack_require__(28).EventEmitter
	  , WebsocketDriver = __webpack_require__(30)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:websocket');
	}
	
	function WebSocketTransport(transUrl, ignore, options) {
	  if (!WebSocketTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	
	  EventEmitter.call(this);
	  debug('constructor', transUrl);
	
	  var self = this;
	  var url = urlUtils.addPath(transUrl, '/websocket');
	  if (url.slice(0, 5) === 'https') {
	    url = 'wss' + url.slice(5);
	  } else {
	    url = 'ws' + url.slice(4);
	  }
	  this.url = url;
	
	  this.ws = new WebsocketDriver(this.url, [], options);
	  this.ws.onmessage = function(e) {
	    debug('message event', e.data);
	    self.emit('message', e.data);
	  };
	  // Firefox has an interesting bug. If a websocket connection is
	  // created after onunload, it stays alive even when user
	  // navigates away from the page. In such situation let's lie -
	  // let's not open the ws connection at all. See:
	  // https://github.com/sockjs/sockjs-client/issues/28
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
	  this.unloadRef = utils.unloadAdd(function() {
	    debug('unload');
	    self.ws.close();
	  });
	  this.ws.onclose = function(e) {
	    debug('close event', e.code, e.reason);
	    self.emit('close', e.code, e.reason);
	    self._cleanup();
	  };
	  this.ws.onerror = function(e) {
	    debug('error event', e);
	    self.emit('close', 1006, 'WebSocket connection broken');
	    self._cleanup();
	  };
	}
	
	inherits(WebSocketTransport, EventEmitter);
	
	WebSocketTransport.prototype.send = function(data) {
	  var msg = '[' + data + ']';
	  debug('send', msg);
	  this.ws.send(msg);
	};
	
	WebSocketTransport.prototype.close = function() {
	  debug('close');
	  var ws = this.ws;
	  this._cleanup();
	  if (ws) {
	    ws.close();
	  }
	};
	
	WebSocketTransport.prototype._cleanup = function() {
	  debug('_cleanup');
	  var ws = this.ws;
	  if (ws) {
	    ws.onmessage = ws.onclose = ws.onerror = null;
	  }
	  utils.unloadDel(this.unloadRef);
	  this.unloadRef = this.ws = null;
	  this.removeAllListeners();
	};
	
	WebSocketTransport.enabled = function() {
	  debug('enabled');
	  return !!WebsocketDriver;
	};
	WebSocketTransport.transportName = 'websocket';
	
	// In theory, ws should require 1 round trip. But in chrome, this is
	// not very stable over SSL. Most likely a ws connection requires a
	// separate SSL connection, in which case 2 round trips are an
	// absolute minumum.
	WebSocketTransport.roundTrips = 2;
	
	module.exports = WebSocketTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var random = __webpack_require__(17);
	
	var onUnload = {}
	  , afterUnload = false
	    // detect google chrome packaged apps because they don't allow the 'unload' event
	  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
	  ;
	
	module.exports = {
	  attachEvent: function(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.addEventListener(event, listener, false);
	    } else if (global.document && global.attachEvent) {
	      // IE quirks.
	      // According to: http://stevesouders.com/misc/test-postmessage.php
	      // the message gets delivered only to 'document', not 'window'.
	      global.document.attachEvent('on' + event, listener);
	      // I get 'window' for ie8.
	      global.attachEvent('on' + event, listener);
	    }
	  }
	
	, detachEvent: function(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.removeEventListener(event, listener, false);
	    } else if (global.document && global.detachEvent) {
	      global.document.detachEvent('on' + event, listener);
	      global.detachEvent('on' + event, listener);
	    }
	  }
	
	, unloadAdd: function(listener) {
	    if (isChromePackagedApp) {
	      return null;
	    }
	
	    var ref = random.string(8);
	    onUnload[ref] = listener;
	    if (afterUnload) {
	      setTimeout(this.triggerUnloadCallbacks, 0);
	    }
	    return ref;
	  }
	
	, unloadDel: function(ref) {
	    if (ref in onUnload) {
	      delete onUnload[ref];
	    }
	  }
	
	, triggerUnloadCallbacks: function() {
	    for (var ref in onUnload) {
	      onUnload[ref]();
	      delete onUnload[ref];
	    }
	  }
	};
	
	var unloadTriggered = function() {
	  if (afterUnload) {
	    return;
	  }
	  afterUnload = true;
	  module.exports.triggerUnloadCallbacks();
	};
	
	// 'unload' alone is not reliable in opera within an iframe, but we
	// can't use `beforeunload` as IE fires it on javascript: links.
	if (!isChromePackagedApp) {
	  module.exports.attachEvent('unload', unloadTriggered);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* global crypto:true */
	var crypto = __webpack_require__(18);
	
	// This string has length 32, a power of 2, so the modulus doesn't introduce a
	// bias.
	var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
	module.exports = {
	  string: function(length) {
	    var max = _randomStringChars.length;
	    var bytes = crypto.randomBytes(length);
	    var ret = [];
	    for (var i = 0; i < length; i++) {
	      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
	    }
	    return ret.join('');
	  }
	
	, number: function(max) {
	    return Math.floor(Math.random() * max);
	  }
	
	, numberString: function(max) {
	    var t = ('' + (max - 1)).length;
	    var p = new Array(t + 1).join('0');
	    return (p + this.number(max)).slice(-t);
	  }
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	if (global.crypto && global.crypto.getRandomValues) {
	  module.exports.randomBytes = function(length) {
	    var bytes = new Uint8Array(length);
	    global.crypto.getRandomValues(bytes);
	    return bytes;
	  };
	} else {
	  module.exports.randomBytes = function(length) {
	    var bytes = new Array(length);
	    for (var i = 0; i < length; i++) {
	      bytes[i] = Math.floor(Math.random() * 256);
	    }
	    return bytes;
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var URL = __webpack_require__(20);
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:utils:url');
	}
	
	module.exports = {
	  getOrigin: function(url) {
	    if (!url) {
	      return null;
	    }
	
	    var p = new URL(url);
	    if (p.protocol === 'file:') {
	      return null;
	    }
	
	    var port = p.port;
	    if (!port) {
	      port = (p.protocol === 'https:') ? '443' : '80';
	    }
	
	    return p.protocol + '//' + p.hostname + ':' + port;
	  }
	
	, isOriginEqual: function(a, b) {
	    var res = this.getOrigin(a) === this.getOrigin(b);
	    debug('same', a, b, res);
	    return res;
	  }
	
	, isSchemeEqual: function(a, b) {
	    return (a.split(':')[0] === b.split(':')[0]);
	  }
	
	, addPath: function (url, path) {
	    var qs = url.split('?');
	    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
	  }
	
	, addQuery: function (url, q) {
	    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var required = __webpack_require__(21)
	  , lolcation = __webpack_require__(22)
	  , qs = __webpack_require__(23)
	  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;
	
	/**
	 * These are the parse rules for the URL parser, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var rules = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];
	
	/**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase.
	 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
	 * @property {String} rest Rest of the URL that is not part of the protocol.
	 */
	
	/**
	 * Extract protocol information from a URL with/without double slash ("//").
	 *
	 * @param {String} address URL we want to extract from.
	 * @return {ProtocolExtract} Extracted information.
	 * @api private
	 */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);
	
	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3]
	  };
	}
	
	/**
	 * Resolve a relative URL pathname against a base URL pathname.
	 *
	 * @param {String} relative Pathname of the relative URL.
	 * @param {String} base Pathname of the base URL.
	 * @return {String} Resolved pathname.
	 * @api private
	 */
	function resolve(relative, base) {
	  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
	    , i = path.length
	    , last = path[i - 1]
	    , unshift = false
	    , up = 0;
	
	  while (i--) {
	    if (path[i] === '.') {
	      path.splice(i, 1);
	    } else if (path[i] === '..') {
	      path.splice(i, 1);
	      up++;
	    } else if (up) {
	      if (i === 0) unshift = true;
	      path.splice(i, 1);
	      up--;
	    }
	  }
	
	  if (unshift) path.unshift('');
	  if (last === '.' || last === '..') path.push('');
	
	  return path.join('/');
	}
	
	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my OCD.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} location Location defaults for relative paths.
	 * @param {Boolean|Function} parser Parser for the query string.
	 * @api public
	 */
	function URL(address, location, parser) {
	  if (!(this instanceof URL)) {
	    return new URL(address, location, parser);
	  }
	
	  var relative, extracted, parse, instruction, index, key
	    , instructions = rules.slice()
	    , type = typeof location
	    , url = this
	    , i = 0;
	
	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }
	
	  if (parser && 'function' !== typeof parser) parser = qs.parse;
	
	  location = lolcation(location);
	
	  //
	  // Extract protocol information before running the instructions.
	  //
	  extracted = extractProtocol(address || '');
	  relative = !extracted.protocol && !extracted.slashes;
	  url.slashes = extracted.slashes || relative && location.slashes;
	  url.protocol = extracted.protocol || location.protocol || '';
	  address = extracted.rest;
	
	  //
	  // When the authority component is absent the URL starts with a path
	  // component.
	  //
	  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];
	
	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	    parse = instruction[0];
	    key = instruction[1];
	
	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if (index = parse.exec(address)) {
	      url[key] = index[1];
	      address = address.slice(0, index.index);
	    }
	
	    url[key] = url[key] || (
	      relative && instruction[3] ? location[key] || '' : ''
	    );
	
	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) url[key] = url[key].toLowerCase();
	  }
	
	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);
	
	  //
	  // If the URL is relative, resolve the pathname against the base URL.
	  //
	  if (
	      relative
	    && location.slashes
	    && url.pathname.charAt(0) !== '/'
	    && (url.pathname !== '' || location.pathname !== '')
	  ) {
	    url.pathname = resolve(url.pathname, location.pathname);
	  }
	
	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }
	
	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }
	
	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';
	
	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}
	
	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} part          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function
	 *                               used to parse the query.
	 *                               When setting the protocol, double slash will be
	 *                               removed from the final url if it is true.
	 * @returns {URL}
	 * @api public
	 */
	URL.prototype.set = function set(part, value, fn) {
	  var url = this;
	
	  switch (part) {
	    case 'query':
	      if ('string' === typeof value && value.length) {
	        value = (fn || qs.parse)(value);
	      }
	
	      url[part] = value;
	      break;
	
	    case 'port':
	      url[part] = value;
	
	      if (!required(value, url.protocol)) {
	        url.host = url.hostname;
	        url[part] = '';
	      } else if (value) {
	        url.host = url.hostname +':'+ value;
	      }
	
	      break;
	
	    case 'hostname':
	      url[part] = value;
	
	      if (url.port) value += ':'+ url.port;
	      url.host = value;
	      break;
	
	    case 'host':
	      url[part] = value;
	
	      if (/:\d+$/.test(value)) {
	        value = value.split(':');
	        url.port = value.pop();
	        url.hostname = value.join(':');
	      } else {
	        url.hostname = value;
	        url.port = '';
	      }
	
	      break;
	
	    case 'protocol':
	      url.protocol = value.toLowerCase();
	      url.slashes = !fn;
	      break;
	
	    case 'pathname':
	      url.pathname = value.length && value.charAt(0) !== '/' ? '/' + value : value;
	
	      break;
	
	    default:
	      url[part] = value;
	  }
	
	  for (var i = 0; i < rules.length; i++) {
	    var ins = rules[i];
	
	    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
	  }
	
	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';
	
	  url.href = url.toString();
	
	  return url;
	};
	
	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
	URL.prototype.toString = function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;
	
	  var query
	    , url = this
	    , protocol = url.protocol;
	
	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
	
	  var result = protocol + (url.slashes ? '//' : '');
	
	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }
	
	  result += url.host + url.pathname;
	
	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;
	
	  if (url.hash) result += url.hash;
	
	  return result;
	};
	
	//
	// Expose the URL parser and some additional properties that might be useful for
	// others or testing.
	//
	URL.extractProtocol = extractProtocol;
	URL.location = lolcation;
	URL.qs = qs;
	
	module.exports = URL;


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;
	
	  if (!port) return false;
	
	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;
	
	    case 'https':
	    case 'wss':
	    return port !== 443;
	
	    case 'ftp':
	    return port !== 21;
	
	    case 'gopher':
	    return port !== 70;
	
	    case 'file':
	    return false;
	  }
	
	  return port !== 0;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
	
	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 }
	  , URL;
	
	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
	module.exports = function lolcation(loc) {
	  loc = loc || global.location || {};
	  URL = URL || __webpack_require__(20);
	
	  var finaldestination = {}
	    , type = typeof loc
	    , key;
	
	  if ('blob:' === loc.protocol) {
	    finaldestination = new URL(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new URL(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }
	
	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }
	
	  return finaldestination;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=?([^&]*)/g
	    , result = {}
	    , part;
	
	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (;
	    part = parser.exec(query);
	    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
	  );
	
	  return result;
	}
	
	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';
	
	  var pairs = [];
	
	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';
	
	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
	    }
	  }
	
	  return pairs.length ? prefix + pairs.join('&') : '';
	}
	
	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(25);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
	    return true;
	  }
	
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (typeof window !== 'undefined' && window && window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
	    // double check webkit in userAgent just in case we are in a worker
	    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs(args) {
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return;
	
	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit')
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  try {
	    return exports.storage.debug;
	  } catch(e) {}
	
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = createDebug.debug = createDebug.default = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(26);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor(namespace) {
	  var hash = 0, i;
	
	  for (i in namespace) {
	    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }
	
	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function createDebug(namespace) {
	
	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;
	
	    var self = debug;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);
	
	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	
	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);
	
	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }
	
	  return debug;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , EventTarget = __webpack_require__(29)
	  ;
	
	function EventEmitter() {
	  EventTarget.call(this);
	}
	
	inherits(EventEmitter, EventTarget);
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  if (type) {
	    delete this._listeners[type];
	  } else {
	    this._listeners = {};
	  }
	};
	
	EventEmitter.prototype.once = function(type, listener) {
	  var self = this
	    , fired = false;
	
	  function g() {
	    self.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  this.on(type, g);
	};
	
	EventEmitter.prototype.emit = function() {
	  var type = arguments[0];
	  var listeners = this._listeners[type];
	  if (!listeners) {
	    return;
	  }
	  // equivalent of Array.prototype.slice.call(arguments, 1);
	  var l = arguments.length;
	  var args = new Array(l - 1);
	  for (var ai = 1; ai < l; ai++) {
	    args[ai - 1] = arguments[ai];
	  }
	  for (var i = 0; i < listeners.length; i++) {
	    listeners[i].apply(this, args);
	  }
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
	EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;
	
	module.exports.EventEmitter = EventEmitter;


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	/* Simplified implementation of DOM2 EventTarget.
	 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
	 */
	
	function EventTarget() {
	  this._listeners = {};
	}
	
	EventTarget.prototype.addEventListener = function(eventType, listener) {
	  if (!(eventType in this._listeners)) {
	    this._listeners[eventType] = [];
	  }
	  var arr = this._listeners[eventType];
	  // #4
	  if (arr.indexOf(listener) === -1) {
	    // Make a copy so as not to interfere with a current dispatchEvent.
	    arr = arr.concat([listener]);
	  }
	  this._listeners[eventType] = arr;
	};
	
	EventTarget.prototype.removeEventListener = function(eventType, listener) {
	  var arr = this._listeners[eventType];
	  if (!arr) {
	    return;
	  }
	  var idx = arr.indexOf(listener);
	  if (idx !== -1) {
	    if (arr.length > 1) {
	      // Make a copy so as not to interfere with a current dispatchEvent.
	      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
	    } else {
	      delete this._listeners[eventType];
	    }
	    return;
	  }
	};
	
	EventTarget.prototype.dispatchEvent = function() {
	  var event = arguments[0];
	  var t = event.type;
	  // equivalent of Array.prototype.slice.call(arguments, 0);
	  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
	  // TODO: This doesn't match the real behavior; per spec, onfoo get
	  // their place in line from the /first/ time they're set from
	  // non-null. Although WebKit bumps it to the end every time it's
	  // set.
	  if (this['on' + t]) {
	    this['on' + t].apply(this, args);
	  }
	  if (t in this._listeners) {
	    // Grab a reference to the listeners list. removeEventListener may alter the list.
	    var listeners = this._listeners[t];
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i].apply(this, args);
	    }
	  }
	};
	
	module.exports = EventTarget;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var Driver = global.WebSocket || global.MozWebSocket;
	if (Driver) {
		module.exports = function WebSocketBrowserDriver(url) {
			return new Driver(url);
		};
	} else {
		module.exports = undefined;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var inherits = __webpack_require__(27)
	  , AjaxBasedTransport = __webpack_require__(32)
	  , XhrReceiver = __webpack_require__(36)
	  , XHRCorsObject = __webpack_require__(37)
	  , XHRLocalObject = __webpack_require__(39)
	  , browser = __webpack_require__(40)
	  ;
	
	function XhrStreamingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
	}
	
	inherits(XhrStreamingTransport, AjaxBasedTransport);
	
	XhrStreamingTransport.enabled = function(info) {
	  if (info.nullOrigin) {
	    return false;
	  }
	  // Opera doesn't support xhr-streaming #60
	  // But it might be able to #92
	  if (browser.isOpera()) {
	    return false;
	  }
	
	  return XHRCorsObject.enabled;
	};
	
	XhrStreamingTransport.transportName = 'xhr-streaming';
	XhrStreamingTransport.roundTrips = 2; // preflight, ajax
	
	// Safari gets confused when a streaming ajax request is started
	// before onload. This causes the load indicator to spin indefinetely.
	// Only require body when used in a browser
	XhrStreamingTransport.needBody = !!global.document;
	
	module.exports = XhrStreamingTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(27)
	  , urlUtils = __webpack_require__(19)
	  , SenderReceiver = __webpack_require__(33)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:ajax-based');
	}
	
	function createAjaxSender(AjaxObject) {
	  return function(url, payload, callback) {
	    debug('create ajax sender', url, payload);
	    var opt = {};
	    if (typeof payload === 'string') {
	      opt.headers = {'Content-type': 'text/plain'};
	    }
	    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
	    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
	    xo.once('finish', function(status) {
	      debug('finish', status);
	      xo = null;
	
	      if (status !== 200 && status !== 204) {
	        return callback(new Error('http status ' + status));
	      }
	      callback();
	    });
	    return function() {
	      debug('abort');
	      xo.close();
	      xo = null;
	
	      var err = new Error('Aborted');
	      err.code = 1000;
	      callback(err);
	    };
	  };
	}
	
	function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
	  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
	}
	
	inherits(AjaxBasedTransport, SenderReceiver);
	
	module.exports = AjaxBasedTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(27)
	  , urlUtils = __webpack_require__(19)
	  , BufferedSender = __webpack_require__(34)
	  , Polling = __webpack_require__(35)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:sender-receiver');
	}
	
	function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
	  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
	  debug(pollUrl);
	  var self = this;
	  BufferedSender.call(this, transUrl, senderFunc);
	
	  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
	  this.poll.on('message', function(msg) {
	    debug('poll message', msg);
	    self.emit('message', msg);
	  });
	  this.poll.once('close', function(code, reason) {
	    debug('poll close', code, reason);
	    self.poll = null;
	    self.emit('close', code, reason);
	    self.close();
	  });
	}
	
	inherits(SenderReceiver, BufferedSender);
	
	SenderReceiver.prototype.close = function() {
	  BufferedSender.prototype.close.call(this);
	  debug('close');
	  this.removeAllListeners();
	  if (this.poll) {
	    this.poll.abort();
	    this.poll = null;
	  }
	};
	
	module.exports = SenderReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(27)
	  , EventEmitter = __webpack_require__(28).EventEmitter
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:buffered-sender');
	}
	
	function BufferedSender(url, sender) {
	  debug(url);
	  EventEmitter.call(this);
	  this.sendBuffer = [];
	  this.sender = sender;
	  this.url = url;
	}
	
	inherits(BufferedSender, EventEmitter);
	
	BufferedSender.prototype.send = function(message) {
	  debug('send', message);
	  this.sendBuffer.push(message);
	  if (!this.sendStop) {
	    this.sendSchedule();
	  }
	};
	
	// For polling transports in a situation when in the message callback,
	// new message is being send. If the sending connection was started
	// before receiving one, it is possible to saturate the network and
	// timeout due to the lack of receiving socket. To avoid that we delay
	// sending messages by some small time, in order to let receiving
	// connection be started beforehand. This is only a halfmeasure and
	// does not fix the big problem, but it does make the tests go more
	// stable on slow networks.
	BufferedSender.prototype.sendScheduleWait = function() {
	  debug('sendScheduleWait');
	  var self = this;
	  var tref;
	  this.sendStop = function() {
	    debug('sendStop');
	    self.sendStop = null;
	    clearTimeout(tref);
	  };
	  tref = setTimeout(function() {
	    debug('timeout');
	    self.sendStop = null;
	    self.sendSchedule();
	  }, 25);
	};
	
	BufferedSender.prototype.sendSchedule = function() {
	  debug('sendSchedule', this.sendBuffer.length);
	  var self = this;
	  if (this.sendBuffer.length > 0) {
	    var payload = '[' + this.sendBuffer.join(',') + ']';
	    this.sendStop = this.sender(this.url, payload, function(err) {
	      self.sendStop = null;
	      if (err) {
	        debug('error', err);
	        self.emit('close', err.code || 1006, 'Sending error: ' + err);
	        self.close();
	      } else {
	        self.sendScheduleWait();
	      }
	    });
	    this.sendBuffer = [];
	  }
	};
	
	BufferedSender.prototype._cleanup = function() {
	  debug('_cleanup');
	  this.removeAllListeners();
	};
	
	BufferedSender.prototype.close = function() {
	  debug('close');
	  this._cleanup();
	  if (this.sendStop) {
	    this.sendStop();
	    this.sendStop = null;
	  }
	};
	
	module.exports = BufferedSender;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(27)
	  , EventEmitter = __webpack_require__(28).EventEmitter
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:polling');
	}
	
	function Polling(Receiver, receiveUrl, AjaxObject) {
	  debug(receiveUrl);
	  EventEmitter.call(this);
	  this.Receiver = Receiver;
	  this.receiveUrl = receiveUrl;
	  this.AjaxObject = AjaxObject;
	  this._scheduleReceiver();
	}
	
	inherits(Polling, EventEmitter);
	
	Polling.prototype._scheduleReceiver = function() {
	  debug('_scheduleReceiver');
	  var self = this;
	  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
	
	  poll.on('message', function(msg) {
	    debug('message', msg);
	    self.emit('message', msg);
	  });
	
	  poll.once('close', function(code, reason) {
	    debug('close', code, reason, self.pollIsClosing);
	    self.poll = poll = null;
	
	    if (!self.pollIsClosing) {
	      if (reason === 'network') {
	        self._scheduleReceiver();
	      } else {
	        self.emit('close', code || 1006, reason);
	        self.removeAllListeners();
	      }
	    }
	  });
	};
	
	Polling.prototype.abort = function() {
	  debug('abort');
	  this.removeAllListeners();
	  this.pollIsClosing = true;
	  if (this.poll) {
	    this.poll.abort();
	  }
	};
	
	module.exports = Polling;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(27)
	  , EventEmitter = __webpack_require__(28).EventEmitter
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:receiver:xhr');
	}
	
	function XhrReceiver(url, AjaxObject) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;
	
	  this.bufferPosition = 0;
	
	  this.xo = new AjaxObject('POST', url, null);
	  this.xo.on('chunk', this._chunkHandler.bind(this));
	  this.xo.once('finish', function(status, text) {
	    debug('finish', status, text);
	    self._chunkHandler(status, text);
	    self.xo = null;
	    var reason = status === 200 ? 'network' : 'permanent';
	    debug('close', reason);
	    self.emit('close', null, reason);
	    self._cleanup();
	  });
	}
	
	inherits(XhrReceiver, EventEmitter);
	
	XhrReceiver.prototype._chunkHandler = function(status, text) {
	  debug('_chunkHandler', status);
	  if (status !== 200 || !text) {
	    return;
	  }
	
	  for (var idx = -1; ; this.bufferPosition += idx + 1) {
	    var buf = text.slice(this.bufferPosition);
	    idx = buf.indexOf('\n');
	    if (idx === -1) {
	      break;
	    }
	    var msg = buf.slice(0, idx);
	    if (msg) {
	      debug('message', msg);
	      this.emit('message', msg);
	    }
	  }
	};
	
	XhrReceiver.prototype._cleanup = function() {
	  debug('_cleanup');
	  this.removeAllListeners();
	};
	
	XhrReceiver.prototype.abort = function() {
	  debug('abort');
	  if (this.xo) {
	    this.xo.close();
	    debug('close');
	    this.emit('close', null, 'user');
	    this.xo = null;
	  }
	  this._cleanup();
	};
	
	module.exports = XhrReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , XhrDriver = __webpack_require__(38)
	  ;
	
	function XHRCorsObject(method, url, payload, opts) {
	  XhrDriver.call(this, method, url, payload, opts);
	}
	
	inherits(XHRCorsObject, XhrDriver);
	
	XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
	
	module.exports = XHRCorsObject;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {'use strict';
	
	var EventEmitter = __webpack_require__(28).EventEmitter
	  , inherits = __webpack_require__(27)
	  , utils = __webpack_require__(16)
	  , urlUtils = __webpack_require__(19)
	  , XHR = global.XMLHttpRequest
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:browser:xhr');
	}
	
	function AbstractXHRObject(method, url, payload, opts) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function () {
	    self._start(method, url, payload, opts);
	  }, 0);
	}
	
	inherits(AbstractXHRObject, EventEmitter);
	
	AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
	  var self = this;
	
	  try {
	    this.xhr = new XHR();
	  } catch (x) {
	    // intentionally empty
	  }
	
	  if (!this.xhr) {
	    debug('no xhr');
	    this.emit('finish', 0, 'no xhr support');
	    this._cleanup();
	    return;
	  }
	
	  // several browsers cache POSTs
	  url = urlUtils.addQuery(url, 't=' + (+new Date()));
	
	  // Explorer tends to keep connection open, even after the
	  // tab gets closed: http://bugs.jquery.com/ticket/5280
	  this.unloadRef = utils.unloadAdd(function() {
	    debug('unload cleanup');
	    self._cleanup(true);
	  });
	  try {
	    this.xhr.open(method, url, true);
	    if (this.timeout && 'timeout' in this.xhr) {
	      this.xhr.timeout = this.timeout;
	      this.xhr.ontimeout = function() {
	        debug('xhr timeout');
	        self.emit('finish', 0, '');
	        self._cleanup(false);
	      };
	    }
	  } catch (e) {
	    debug('exception', e);
	    // IE raises an exception on wrong port.
	    this.emit('finish', 0, '');
	    this._cleanup(false);
	    return;
	  }
	
	  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
	    debug('withCredentials');
	    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
	    // "This never affects same-site requests."
	
	    this.xhr.withCredentials = 'true';
	  }
	  if (opts && opts.headers) {
	    for (var key in opts.headers) {
	      this.xhr.setRequestHeader(key, opts.headers[key]);
	    }
	  }
	
	  this.xhr.onreadystatechange = function() {
	    if (self.xhr) {
	      var x = self.xhr;
	      var text, status;
	      debug('readyState', x.readyState);
	      switch (x.readyState) {
	      case 3:
	        // IE doesn't like peeking into responseText or status
	        // on Microsoft.XMLHTTP and readystate=3
	        try {
	          status = x.status;
	          text = x.responseText;
	        } catch (e) {
	          // intentionally empty
	        }
	        debug('status', status);
	        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	        if (status === 1223) {
	          status = 204;
	        }
	
	        // IE does return readystate == 3 for 404 answers.
	        if (status === 200 && text && text.length > 0) {
	          debug('chunk');
	          self.emit('chunk', status, text);
	        }
	        break;
	      case 4:
	        status = x.status;
	        debug('status', status);
	        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	        if (status === 1223) {
	          status = 204;
	        }
	        // IE returns this for a bad port
	        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
	        if (status === 12005 || status === 12029) {
	          status = 0;
	        }
	
	        debug('finish', status, x.responseText);
	        self.emit('finish', status, x.responseText);
	        self._cleanup(false);
	        break;
	      }
	    }
	  };
	
	  try {
	    self.xhr.send(payload);
	  } catch (e) {
	    self.emit('finish', 0, '');
	    self._cleanup(false);
	  }
	};
	
	AbstractXHRObject.prototype._cleanup = function(abort) {
	  debug('cleanup');
	  if (!this.xhr) {
	    return;
	  }
	  this.removeAllListeners();
	  utils.unloadDel(this.unloadRef);
	
	  // IE needs this field to be a function
	  this.xhr.onreadystatechange = function() {};
	  if (this.xhr.ontimeout) {
	    this.xhr.ontimeout = null;
	  }
	
	  if (abort) {
	    try {
	      this.xhr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xhr = null;
	};
	
	AbstractXHRObject.prototype.close = function() {
	  debug('close');
	  this._cleanup(true);
	};
	
	AbstractXHRObject.enabled = !!XHR;
	// override XMLHttpRequest for IE6/7
	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (!AbstractXHRObject.enabled && (axo in global)) {
	  debug('overriding xmlhttprequest');
	  XHR = function() {
	    try {
	      return new global[axo]('Microsoft.XMLHTTP');
	    } catch (e) {
	      return null;
	    }
	  };
	  AbstractXHRObject.enabled = !!new XHR();
	}
	
	var cors = false;
	try {
	  cors = 'withCredentials' in new XHR();
	} catch (ignored) {
	  // intentionally empty
	}
	
	AbstractXHRObject.supportsCORS = cors;
	
	module.exports = AbstractXHRObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(15)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , XhrDriver = __webpack_require__(38)
	  ;
	
	function XHRLocalObject(method, url, payload /*, opts */) {
	  XhrDriver.call(this, method, url, payload, {
	    noCredentials: true
	  });
	}
	
	inherits(XHRLocalObject, XhrDriver);
	
	XHRLocalObject.enabled = XhrDriver.enabled;
	
	module.exports = XHRLocalObject;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	module.exports = {
	  isOpera: function() {
	    return global.navigator &&
	      /opera/i.test(global.navigator.userAgent);
	  }
	
	, isKonqueror: function() {
	    return global.navigator &&
	      /konqueror/i.test(global.navigator.userAgent);
	  }
	
	  // #187 wrap document.domain in try/catch because of WP8 from file:///
	, hasDomain: function () {
	    // non-browser client always has a domain
	    if (!global.document) {
	      return true;
	    }
	
	    try {
	      return !!global.document.domain;
	    } catch (e) {
	      return false;
	    }
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , AjaxBasedTransport = __webpack_require__(32)
	  , XhrReceiver = __webpack_require__(36)
	  , XDRObject = __webpack_require__(42)
	  ;
	
	// According to:
	//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
	//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
	
	function XdrStreamingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
	}
	
	inherits(XdrStreamingTransport, AjaxBasedTransport);
	
	XdrStreamingTransport.enabled = function(info) {
	  if (info.cookie_needed || info.nullOrigin) {
	    return false;
	  }
	  return XDRObject.enabled && info.sameScheme;
	};
	
	XdrStreamingTransport.transportName = 'xdr-streaming';
	XdrStreamingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XdrStreamingTransport;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var EventEmitter = __webpack_require__(28).EventEmitter
	  , inherits = __webpack_require__(27)
	  , eventUtils = __webpack_require__(16)
	  , browser = __webpack_require__(40)
	  , urlUtils = __webpack_require__(19)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:sender:xdr');
	}
	
	// References:
	//   http://ajaxian.com/archives/100-line-ajax-wrapper
	//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx
	
	function XDRObject(method, url, payload) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function() {
	    self._start(method, url, payload);
	  }, 0);
	}
	
	inherits(XDRObject, EventEmitter);
	
	XDRObject.prototype._start = function(method, url, payload) {
	  debug('_start');
	  var self = this;
	  var xdr = new global.XDomainRequest();
	  // IE caches even POSTs
	  url = urlUtils.addQuery(url, 't=' + (+new Date()));
	
	  xdr.onerror = function() {
	    debug('onerror');
	    self._error();
	  };
	  xdr.ontimeout = function() {
	    debug('ontimeout');
	    self._error();
	  };
	  xdr.onprogress = function() {
	    debug('progress', xdr.responseText);
	    self.emit('chunk', 200, xdr.responseText);
	  };
	  xdr.onload = function() {
	    debug('load');
	    self.emit('finish', 200, xdr.responseText);
	    self._cleanup(false);
	  };
	  this.xdr = xdr;
	  this.unloadRef = eventUtils.unloadAdd(function() {
	    self._cleanup(true);
	  });
	  try {
	    // Fails with AccessDenied if port number is bogus
	    this.xdr.open(method, url);
	    if (this.timeout) {
	      this.xdr.timeout = this.timeout;
	    }
	    this.xdr.send(payload);
	  } catch (x) {
	    this._error();
	  }
	};
	
	XDRObject.prototype._error = function() {
	  this.emit('finish', 0, '');
	  this._cleanup(false);
	};
	
	XDRObject.prototype._cleanup = function(abort) {
	  debug('cleanup', abort);
	  if (!this.xdr) {
	    return;
	  }
	  this.removeAllListeners();
	  eventUtils.unloadDel(this.unloadRef);
	
	  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
	  if (abort) {
	    try {
	      this.xdr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xdr = null;
	};
	
	XDRObject.prototype.close = function() {
	  debug('close');
	  this._cleanup(true);
	};
	
	// IE 8/9 if the request target uses the same scheme - #79
	XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());
	
	module.exports = XDRObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), (function() { return this; }())))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , AjaxBasedTransport = __webpack_require__(32)
	  , EventSourceReceiver = __webpack_require__(44)
	  , XHRCorsObject = __webpack_require__(37)
	  , EventSourceDriver = __webpack_require__(45)
	  ;
	
	function EventSourceTransport(transUrl) {
	  if (!EventSourceTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	
	  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
	}
	
	inherits(EventSourceTransport, AjaxBasedTransport);
	
	EventSourceTransport.enabled = function() {
	  return !!EventSourceDriver;
	};
	
	EventSourceTransport.transportName = 'eventsource';
	EventSourceTransport.roundTrips = 2;
	
	module.exports = EventSourceTransport;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(27)
	  , EventEmitter = __webpack_require__(28).EventEmitter
	  , EventSourceDriver = __webpack_require__(45)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:receiver:eventsource');
	}
	
	function EventSourceReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);
	
	  var self = this;
	  var es = this.es = new EventSourceDriver(url);
	  es.onmessage = function(e) {
	    debug('message', e.data);
	    self.emit('message', decodeURI(e.data));
	  };
	  es.onerror = function(e) {
	    debug('error', es.readyState, e);
	    // ES on reconnection has readyState = 0 or 1.
	    // on network error it's CLOSED = 2
	    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
	    self._cleanup();
	    self._close(reason);
	  };
	}
	
	inherits(EventSourceReceiver, EventEmitter);
	
	EventSourceReceiver.prototype.abort = function() {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};
	
	EventSourceReceiver.prototype._cleanup = function() {
	  debug('cleanup');
	  var es = this.es;
	  if (es) {
	    es.onmessage = es.onerror = null;
	    es.close();
	    this.es = null;
	  }
	};
	
	EventSourceReceiver.prototype._close = function(reason) {
	  debug('close', reason);
	  var self = this;
	  // Safari and chrome < 15 crash if we close window before
	  // waiting for ES cleanup. See:
	  // https://code.google.com/p/chromium/issues/detail?id=89155
	  setTimeout(function() {
	    self.emit('close', null, reason);
	    self.removeAllListeners();
	  }, 200);
	};
	
	module.exports = EventSourceReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 45 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global.EventSource;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var inherits = __webpack_require__(27)
	  , IframeTransport = __webpack_require__(47)
	  , objectUtils = __webpack_require__(52)
	  ;
	
	module.exports = function(transport) {
	
	  function IframeWrapTransport(transUrl, baseUrl) {
	    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
	  }
	
	  inherits(IframeWrapTransport, IframeTransport);
	
	  IframeWrapTransport.enabled = function(url, info) {
	    if (!global.document) {
	      return false;
	    }
	
	    var iframeInfo = objectUtils.extend({}, info);
	    iframeInfo.sameOrigin = true;
	    return transport.enabled(iframeInfo) && IframeTransport.enabled();
	  };
	
	  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
	  IframeWrapTransport.needBody = true;
	  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)
	
	  IframeWrapTransport.facadeTransport = transport;
	
	  return IframeWrapTransport;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	// Few cool transports do work only for same-origin. In order to make
	// them work cross-domain we shall use iframe, served from the
	// remote domain. New browsers have capabilities to communicate with
	// cross domain iframe using postMessage(). In IE it was implemented
	// from IE 8+, but of course, IE got some details wrong:
	//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
	//    http://stevesouders.com/misc/test-postmessage.php
	
	var inherits = __webpack_require__(27)
	  , JSON3 = __webpack_require__(48)
	  , EventEmitter = __webpack_require__(28).EventEmitter
	  , version = __webpack_require__(50)
	  , urlUtils = __webpack_require__(19)
	  , iframeUtils = __webpack_require__(51)
	  , eventUtils = __webpack_require__(16)
	  , random = __webpack_require__(17)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:transport:iframe');
	}
	
	function IframeTransport(transport, transUrl, baseUrl) {
	  if (!IframeTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  EventEmitter.call(this);
	
	  var self = this;
	  this.origin = urlUtils.getOrigin(baseUrl);
	  this.baseUrl = baseUrl;
	  this.transUrl = transUrl;
	  this.transport = transport;
	  this.windowId = random.string(8);
	
	  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
	  debug(transport, transUrl, iframeUrl);
	
	  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
	    debug('err callback');
	    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
	    self.close();
	  });
	
	  this.onmessageCallback = this._message.bind(this);
	  eventUtils.attachEvent('message', this.onmessageCallback);
	}
	
	inherits(IframeTransport, EventEmitter);
	
	IframeTransport.prototype.close = function() {
	  debug('close');
	  this.removeAllListeners();
	  if (this.iframeObj) {
	    eventUtils.detachEvent('message', this.onmessageCallback);
	    try {
	      // When the iframe is not loaded, IE raises an exception
	      // on 'contentWindow'.
	      this.postMessage('c');
	    } catch (x) {
	      // intentionally empty
	    }
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	    this.onmessageCallback = this.iframeObj = null;
	  }
	};
	
	IframeTransport.prototype._message = function(e) {
	  debug('message', e.data);
	  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
	    debug('not same origin', e.origin, this.origin);
	    return;
	  }
	
	  var iframeMessage;
	  try {
	    iframeMessage = JSON3.parse(e.data);
	  } catch (ignored) {
	    debug('bad json', e.data);
	    return;
	  }
	
	  if (iframeMessage.windowId !== this.windowId) {
	    debug('mismatched window id', iframeMessage.windowId, this.windowId);
	    return;
	  }
	
	  switch (iframeMessage.type) {
	  case 's':
	    this.iframeObj.loaded();
	    // window global dependency
	    this.postMessage('s', JSON3.stringify([
	      version
	    , this.transport
	    , this.transUrl
	    , this.baseUrl
	    ]));
	    break;
	  case 't':
	    this.emit('message', iframeMessage.data);
	    break;
	  case 'c':
	    var cdata;
	    try {
	      cdata = JSON3.parse(iframeMessage.data);
	    } catch (ignored) {
	      debug('bad json', iframeMessage.data);
	      return;
	    }
	    this.emit('close', cdata[0], cdata[1]);
	    this.close();
	    break;
	  }
	};
	
	IframeTransport.prototype.postMessage = function(type, data) {
	  debug('postMessage', type, data);
	  this.iframeObj.post(JSON3.stringify({
	    windowId: this.windowId
	  , type: type
	  , data: data || ''
	  }), this.origin);
	};
	
	IframeTransport.prototype.send = function(message) {
	  debug('send', message);
	  this.postMessage('m', message);
	};
	
	IframeTransport.enabled = function() {
	  return iframeUtils.iframeEnabled;
	};
	
	IframeTransport.transportName = 'iframe';
	IframeTransport.roundTrips = 2;
	
	module.exports = IframeTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(49);
	
	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };
	
	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	
	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window] && window || this,
	      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;
	
	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());
	
	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];
	
	    // Delegate to the native `stringify` and `parse` implementations.
	    if (typeof nativeJSON == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }
	
	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        isProperty, forEach, undef;
	
	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	        // Safari < 2.0.2 stores the internal millisecond time value correctly,
	        // but clips the values returned by the date methods to the range of
	        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}
	
	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function () {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	                // Firefox 3.1b1 and b2 serialize string, number, and boolean
	                // primitives as object literals.
	                stringify(0) === "0" &&
	                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	                // literals.
	                stringify(new Number()) === "0" &&
	                stringify(new String()) == '""' &&
	                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	                // does not define a canonical JSON representation (this applies to
	                // objects with `toJSON` properties as well, *unless* they are nested
	                // within an object or array).
	                stringify(getClass) === undef &&
	                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	                // FF 3.1b3 pass this test.
	                stringify(undef) === undef &&
	                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	                // respectively, if the value is omitted entirely.
	                stringify() === undef &&
	                // FF 3.1b1, 2 throw an error if the given value is not a number,
	                // string, array, object, Boolean, or `null` literal. This applies to
	                // objects with custom `toJSON` methods as well, unless they are nested
	                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	                // methods entirely.
	                stringify(value) === "1" &&
	                stringify([value]) == "[1]" &&
	                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	                // `"[null]"`.
	                stringify([undef]) == "[null]" &&
	                // YUI 3.0.0b1 fails to serialize `null` literals.
	                stringify(null) == "null" &&
	                // FF 3.1b1, 2 halts serialization if an array contains a function:
	                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	                // elides non-JSON values from objects and arrays, unless they
	                // define custom `toJSON` methods.
	                stringify([undef, getClass, null]) == "[null,null,null]" &&
	                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	                // where character escape codes are expected (e.g., `\b` => `\u0008`).
	                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	                stringify(null, value) === "1" &&
	                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	                // serialize extended years.
	                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	                // The milliseconds are optional in ES 5, but required in 5.1.
	                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	                // four-digit years instead of six-digit years. Credits: @Yaffle.
	                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	                // values less than 1000. Credits: @Yaffle.
	                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }
	
	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";
	
	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");
	
	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function (year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }
	
	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(isProperty = objectProto.hasOwnProperty)) {
	        isProperty = function (property) {
	          var members = {}, constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            isProperty = function (property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__, result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            isProperty = function (property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return isProperty.call(this, property);
	        };
	      }
	
	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      forEach = function (object, callback) {
	        var size = 0, Properties, members, property;
	
	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function () {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;
	
	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;
	
	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          forEach = function (object, callback) {
	            // Create a set of iterated properties.
	            var members = {}, isFunction = getClass.call(object) == functionClass, property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	              callback(property);
	            }
	          };
	        }
	        return forEach(object, callback);
	      };
	
	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };
	
	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function (width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };
	
	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function (value) {
	          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };
	
	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if (typeof value == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                  // Months, dates, hours, minutes, and seconds should have two
	                  // digits; milliseconds should have three.
	                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                  // Milliseconds are optional in ES 5.0, but required in 5.1.
	                  "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if (typeof value == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };
	
	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }
	
	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;
	
	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };
	
	        // Internal: Stores the parser state.
	        var Index, Source;
	
	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function () {
	          Index = Source = null;
	          throw SyntaxError();
	        };
	
	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function () {
	          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9: case 10: case 13: case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123: case 125: case 91: case 93: case 58: case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };
	
	        // Internal: Parses a JSON `value` token.
	        var get = function (value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };
	
	        // Internal: Updates a traversed object member.
	        var update = function (source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };
	
	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function (source, property, callback) {
	          var value = source[property], length;
	          if (typeof value == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };
	
	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }
	
	    exports["runInContext"] = runInContext;
	    return exports;
	  }
	
	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;
	
	    var JSON3 = runInContext(root, (root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function () {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    }));
	
	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }
	
	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module), (function() { return this; }())))

/***/ },
/* 49 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = '1.1.2';


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var eventUtils = __webpack_require__(16)
	  , JSON3 = __webpack_require__(48)
	  , browser = __webpack_require__(40)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:utils:iframe');
	}
	
	module.exports = {
	  WPrefix: '_jp'
	, currentWindowId: null
	
	, polluteGlobalNamespace: function() {
	    if (!(module.exports.WPrefix in global)) {
	      global[module.exports.WPrefix] = {};
	    }
	  }
	
	, postMessage: function(type, data) {
	    if (global.parent !== global) {
	      global.parent.postMessage(JSON3.stringify({
	        windowId: module.exports.currentWindowId
	      , type: type
	      , data: data || ''
	      }), '*');
	    } else {
	      debug('Cannot postMessage, no parent window.', type, data);
	    }
	  }
	
	, createIframe: function(iframeUrl, errorCallback) {
	    var iframe = global.document.createElement('iframe');
	    var tref, unloadRef;
	    var unattach = function() {
	      debug('unattach');
	      clearTimeout(tref);
	      // Explorer had problems with that.
	      try {
	        iframe.onload = null;
	      } catch (x) {
	        // intentionally empty
	      }
	      iframe.onerror = null;
	    };
	    var cleanup = function() {
	      debug('cleanup');
	      if (iframe) {
	        unattach();
	        // This timeout makes chrome fire onbeforeunload event
	        // within iframe. Without the timeout it goes straight to
	        // onunload.
	        setTimeout(function() {
	          if (iframe) {
	            iframe.parentNode.removeChild(iframe);
	          }
	          iframe = null;
	        }, 0);
	        eventUtils.unloadDel(unloadRef);
	      }
	    };
	    var onerror = function(err) {
	      debug('onerror', err);
	      if (iframe) {
	        cleanup();
	        errorCallback(err);
	      }
	    };
	    var post = function(msg, origin) {
	      debug('post', msg, origin);
	      try {
	        // When the iframe is not loaded, IE raises an exception
	        // on 'contentWindow'.
	        setTimeout(function() {
	          if (iframe && iframe.contentWindow) {
	            iframe.contentWindow.postMessage(msg, origin);
	          }
	        }, 0);
	      } catch (x) {
	        // intentionally empty
	      }
	    };
	
	    iframe.src = iframeUrl;
	    iframe.style.display = 'none';
	    iframe.style.position = 'absolute';
	    iframe.onerror = function() {
	      onerror('onerror');
	    };
	    iframe.onload = function() {
	      debug('onload');
	      // `onload` is triggered before scripts on the iframe are
	      // executed. Give it few seconds to actually load stuff.
	      clearTimeout(tref);
	      tref = setTimeout(function() {
	        onerror('onload timeout');
	      }, 2000);
	    };
	    global.document.body.appendChild(iframe);
	    tref = setTimeout(function() {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post
	    , cleanup: cleanup
	    , loaded: unattach
	    };
	  }
	
	/* eslint no-undef: "off", new-cap: "off" */
	, createHtmlfile: function(iframeUrl, errorCallback) {
	    var axo = ['Active'].concat('Object').join('X');
	    var doc = new global[axo]('htmlfile');
	    var tref, unloadRef;
	    var iframe;
	    var unattach = function() {
	      clearTimeout(tref);
	      iframe.onerror = null;
	    };
	    var cleanup = function() {
	      if (doc) {
	        unattach();
	        eventUtils.unloadDel(unloadRef);
	        iframe.parentNode.removeChild(iframe);
	        iframe = doc = null;
	        CollectGarbage();
	      }
	    };
	    var onerror = function(r) {
	      debug('onerror', r);
	      if (doc) {
	        cleanup();
	        errorCallback(r);
	      }
	    };
	    var post = function(msg, origin) {
	      try {
	        // When the iframe is not loaded, IE raises an exception
	        // on 'contentWindow'.
	        setTimeout(function() {
	          if (iframe && iframe.contentWindow) {
	              iframe.contentWindow.postMessage(msg, origin);
	          }
	        }, 0);
	      } catch (x) {
	        // intentionally empty
	      }
	    };
	
	    doc.open();
	    doc.write('<html><s' + 'cript>' +
	              'document.domain="' + global.document.domain + '";' +
	              '</s' + 'cript></html>');
	    doc.close();
	    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
	    var c = doc.createElement('div');
	    doc.body.appendChild(c);
	    iframe = doc.createElement('iframe');
	    c.appendChild(iframe);
	    iframe.src = iframeUrl;
	    iframe.onerror = function() {
	      onerror('onerror');
	    };
	    tref = setTimeout(function() {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post
	    , cleanup: cleanup
	    , loaded: unattach
	    };
	  }
	};
	
	module.exports.iframeEnabled = false;
	if (global.document) {
	  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
	  // huge delay, or not at all.
	  module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
	    typeof global.postMessage === 'object') && (!browser.isKonqueror());
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), (function() { return this; }())))

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  isObject: function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  }
	
	, extend: function(obj) {
	    if (!this.isObject(obj)) {
	      return obj;
	    }
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (Object.prototype.hasOwnProperty.call(source, prop)) {
	          obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  }
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , HtmlfileReceiver = __webpack_require__(54)
	  , XHRLocalObject = __webpack_require__(39)
	  , AjaxBasedTransport = __webpack_require__(32)
	  ;
	
	function HtmlFileTransport(transUrl) {
	  if (!HtmlfileReceiver.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
	}
	
	inherits(HtmlFileTransport, AjaxBasedTransport);
	
	HtmlFileTransport.enabled = function(info) {
	  return HtmlfileReceiver.enabled && info.sameOrigin;
	};
	
	HtmlFileTransport.transportName = 'htmlfile';
	HtmlFileTransport.roundTrips = 2;
	
	module.exports = HtmlFileTransport;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var inherits = __webpack_require__(27)
	  , iframeUtils = __webpack_require__(51)
	  , urlUtils = __webpack_require__(19)
	  , EventEmitter = __webpack_require__(28).EventEmitter
	  , random = __webpack_require__(17)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:receiver:htmlfile');
	}
	
	function HtmlfileReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;
	  iframeUtils.polluteGlobalNamespace();
	
	  this.id = 'a' + random.string(6);
	  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));
	
	  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
	  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
	      iframeUtils.createHtmlfile : iframeUtils.createIframe;
	
	  global[iframeUtils.WPrefix][this.id] = {
	    start: function() {
	      debug('start');
	      self.iframeObj.loaded();
	    }
	  , message: function(data) {
	      debug('message', data);
	      self.emit('message', data);
	    }
	  , stop: function() {
	      debug('stop');
	      self._cleanup();
	      self._close('network');
	    }
	  };
	  this.iframeObj = constructFunc(url, function() {
	    debug('callback');
	    self._cleanup();
	    self._close('permanent');
	  });
	}
	
	inherits(HtmlfileReceiver, EventEmitter);
	
	HtmlfileReceiver.prototype.abort = function() {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};
	
	HtmlfileReceiver.prototype._cleanup = function() {
	  debug('_cleanup');
	  if (this.iframeObj) {
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	  }
	  delete global[iframeUtils.WPrefix][this.id];
	};
	
	HtmlfileReceiver.prototype._close = function(reason) {
	  debug('_close', reason);
	  this.emit('close', null, reason);
	  this.removeAllListeners();
	};
	
	HtmlfileReceiver.htmlfileEnabled = false;
	
	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (axo in global) {
	  try {
	    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
	  } catch (x) {
	    // intentionally empty
	  }
	}
	
	HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;
	
	module.exports = HtmlfileReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), (function() { return this; }())))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , AjaxBasedTransport = __webpack_require__(32)
	  , XhrReceiver = __webpack_require__(36)
	  , XHRCorsObject = __webpack_require__(37)
	  , XHRLocalObject = __webpack_require__(39)
	  ;
	
	function XhrPollingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
	}
	
	inherits(XhrPollingTransport, AjaxBasedTransport);
	
	XhrPollingTransport.enabled = function(info) {
	  if (info.nullOrigin) {
	    return false;
	  }
	
	  if (XHRLocalObject.enabled && info.sameOrigin) {
	    return true;
	  }
	  return XHRCorsObject.enabled;
	};
	
	XhrPollingTransport.transportName = 'xhr-polling';
	XhrPollingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XhrPollingTransport;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , AjaxBasedTransport = __webpack_require__(32)
	  , XdrStreamingTransport = __webpack_require__(41)
	  , XhrReceiver = __webpack_require__(36)
	  , XDRObject = __webpack_require__(42)
	  ;
	
	function XdrPollingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
	}
	
	inherits(XdrPollingTransport, AjaxBasedTransport);
	
	XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
	XdrPollingTransport.transportName = 'xdr-polling';
	XdrPollingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XdrPollingTransport;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// The simplest and most robust transport, using the well-know cross
	// domain hack - JSONP. This transport is quite inefficient - one
	// message could use up to one http request. But at least it works almost
	// everywhere.
	// Known limitations:
	//   o you will get a spinning cursor
	//   o for Konqueror a dumb timer is needed to detect errors
	
	var inherits = __webpack_require__(27)
	  , SenderReceiver = __webpack_require__(33)
	  , JsonpReceiver = __webpack_require__(58)
	  , jsonpSender = __webpack_require__(59)
	  ;
	
	function JsonPTransport(transUrl) {
	  if (!JsonPTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
	}
	
	inherits(JsonPTransport, SenderReceiver);
	
	JsonPTransport.enabled = function() {
	  return !!global.document;
	};
	
	JsonPTransport.transportName = 'jsonp-polling';
	JsonPTransport.roundTrips = 1;
	JsonPTransport.needBody = true;
	
	module.exports = JsonPTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var utils = __webpack_require__(51)
	  , random = __webpack_require__(17)
	  , browser = __webpack_require__(40)
	  , urlUtils = __webpack_require__(19)
	  , inherits = __webpack_require__(27)
	  , EventEmitter = __webpack_require__(28).EventEmitter
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:receiver:jsonp');
	}
	
	function JsonpReceiver(url) {
	  debug(url);
	  var self = this;
	  EventEmitter.call(this);
	
	  utils.polluteGlobalNamespace();
	
	  this.id = 'a' + random.string(6);
	  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));
	
	  global[utils.WPrefix][this.id] = this._callback.bind(this);
	  this._createScript(urlWithId);
	
	  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
	  this.timeoutId = setTimeout(function() {
	    debug('timeout');
	    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
	  }, JsonpReceiver.timeout);
	}
	
	inherits(JsonpReceiver, EventEmitter);
	
	JsonpReceiver.prototype.abort = function() {
	  debug('abort');
	  if (global[utils.WPrefix][this.id]) {
	    var err = new Error('JSONP user aborted read');
	    err.code = 1000;
	    this._abort(err);
	  }
	};
	
	JsonpReceiver.timeout = 35000;
	JsonpReceiver.scriptErrorTimeout = 1000;
	
	JsonpReceiver.prototype._callback = function(data) {
	  debug('_callback', data);
	  this._cleanup();
	
	  if (this.aborting) {
	    return;
	  }
	
	  if (data) {
	    debug('message', data);
	    this.emit('message', data);
	  }
	  this.emit('close', null, 'network');
	  this.removeAllListeners();
	};
	
	JsonpReceiver.prototype._abort = function(err) {
	  debug('_abort', err);
	  this._cleanup();
	  this.aborting = true;
	  this.emit('close', err.code, err.message);
	  this.removeAllListeners();
	};
	
	JsonpReceiver.prototype._cleanup = function() {
	  debug('_cleanup');
	  clearTimeout(this.timeoutId);
	  if (this.script2) {
	    this.script2.parentNode.removeChild(this.script2);
	    this.script2 = null;
	  }
	  if (this.script) {
	    var script = this.script;
	    // Unfortunately, you can't really abort script loading of
	    // the script.
	    script.parentNode.removeChild(script);
	    script.onreadystatechange = script.onerror =
	        script.onload = script.onclick = null;
	    this.script = null;
	  }
	  delete global[utils.WPrefix][this.id];
	};
	
	JsonpReceiver.prototype._scriptError = function() {
	  debug('_scriptError');
	  var self = this;
	  if (this.errorTimer) {
	    return;
	  }
	
	  this.errorTimer = setTimeout(function() {
	    if (!self.loadedOkay) {
	      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
	    }
	  }, JsonpReceiver.scriptErrorTimeout);
	};
	
	JsonpReceiver.prototype._createScript = function(url) {
	  debug('_createScript', url);
	  var self = this;
	  var script = this.script = global.document.createElement('script');
	  var script2;  // Opera synchronous load trick.
	
	  script.id = 'a' + random.string(8);
	  script.src = url;
	  script.type = 'text/javascript';
	  script.charset = 'UTF-8';
	  script.onerror = this._scriptError.bind(this);
	  script.onload = function() {
	    debug('onload');
	    self._abort(new Error('JSONP script loaded abnormally (onload)'));
	  };
	
	  // IE9 fires 'error' event after onreadystatechange or before, in random order.
	  // Use loadedOkay to determine if actually errored
	  script.onreadystatechange = function() {
	    debug('onreadystatechange', script.readyState);
	    if (/loaded|closed/.test(script.readyState)) {
	      if (script && script.htmlFor && script.onclick) {
	        self.loadedOkay = true;
	        try {
	          // In IE, actually execute the script.
	          script.onclick();
	        } catch (x) {
	          // intentionally empty
	        }
	      }
	      if (script) {
	        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
	      }
	    }
	  };
	  // IE: event/htmlFor/onclick trick.
	  // One can't rely on proper order for onreadystatechange. In order to
	  // make sure, set a 'htmlFor' and 'event' properties, so that
	  // script code will be installed as 'onclick' handler for the
	  // script object. Later, onreadystatechange, manually execute this
	  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
	  // set. For reference see:
	  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
	  // Also, read on that about script ordering:
	  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
	  if (typeof script.async === 'undefined' && global.document.attachEvent) {
	    // According to mozilla docs, in recent browsers script.async defaults
	    // to 'true', so we may use it to detect a good browser:
	    // https://developer.mozilla.org/en/HTML/Element/script
	    if (!browser.isOpera()) {
	      // Naively assume we're in IE
	      try {
	        script.htmlFor = script.id;
	        script.event = 'onclick';
	      } catch (x) {
	        // intentionally empty
	      }
	      script.async = true;
	    } else {
	      // Opera, second sync script hack
	      script2 = this.script2 = global.document.createElement('script');
	      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
	      script.async = script2.async = false;
	    }
	  }
	  if (typeof script.async !== 'undefined') {
	    script.async = true;
	  }
	
	  var head = global.document.getElementsByTagName('head')[0];
	  head.insertBefore(script, head.firstChild);
	  if (script2) {
	    head.insertBefore(script2, head.firstChild);
	  }
	};
	
	module.exports = JsonpReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), (function() { return this; }())))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var random = __webpack_require__(17)
	  , urlUtils = __webpack_require__(19)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:sender:jsonp');
	}
	
	var form, area;
	
	function createIframe(id) {
	  debug('createIframe', id);
	  try {
	    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	    return global.document.createElement('<iframe name="' + id + '">');
	  } catch (x) {
	    var iframe = global.document.createElement('iframe');
	    iframe.name = id;
	    return iframe;
	  }
	}
	
	function createForm() {
	  debug('createForm');
	  form = global.document.createElement('form');
	  form.style.display = 'none';
	  form.style.position = 'absolute';
	  form.method = 'POST';
	  form.enctype = 'application/x-www-form-urlencoded';
	  form.acceptCharset = 'UTF-8';
	
	  area = global.document.createElement('textarea');
	  area.name = 'd';
	  form.appendChild(area);
	
	  global.document.body.appendChild(form);
	}
	
	module.exports = function(url, payload, callback) {
	  debug(url, payload);
	  if (!form) {
	    createForm();
	  }
	  var id = 'a' + random.string(8);
	  form.target = id;
	  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);
	
	  var iframe = createIframe(id);
	  iframe.id = id;
	  iframe.style.display = 'none';
	  form.appendChild(iframe);
	
	  try {
	    area.value = payload;
	  } catch (e) {
	    // seriously broken browsers get here
	  }
	  form.submit();
	
	  var completed = function(err) {
	    debug('completed', id, err);
	    if (!iframe.onerror) {
	      return;
	    }
	    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
	    // Opera mini doesn't like if we GC iframe
	    // immediately, thus this timeout.
	    setTimeout(function() {
	      debug('cleaning up', id);
	      iframe.parentNode.removeChild(iframe);
	      iframe = null;
	    }, 500);
	    area.value = '';
	    // It is not possible to detect if the iframe succeeded or
	    // failed to submit our form.
	    callback(err);
	  };
	  iframe.onerror = function() {
	    debug('onerror', id);
	    completed();
	  };
	  iframe.onload = function() {
	    debug('onload', id);
	    completed();
	  };
	  iframe.onreadystatechange = function(e) {
	    debug('onreadystatechange', id, iframe.readyState, e);
	    if (iframe.readyState === 'complete') {
	      completed();
	    }
	  };
	  return function() {
	    debug('aborted', id);
	    completed(new Error('Aborted'));
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), (function() { return this; }())))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	__webpack_require__(61);
	
	var URL = __webpack_require__(20)
	  , inherits = __webpack_require__(27)
	  , JSON3 = __webpack_require__(48)
	  , random = __webpack_require__(17)
	  , escape = __webpack_require__(62)
	  , urlUtils = __webpack_require__(19)
	  , eventUtils = __webpack_require__(16)
	  , transport = __webpack_require__(63)
	  , objectUtils = __webpack_require__(52)
	  , browser = __webpack_require__(40)
	  , log = __webpack_require__(64)
	  , Event = __webpack_require__(65)
	  , EventTarget = __webpack_require__(29)
	  , loc = __webpack_require__(66)
	  , CloseEvent = __webpack_require__(67)
	  , TransportMessageEvent = __webpack_require__(68)
	  , InfoReceiver = __webpack_require__(69)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:main');
	}
	
	var transports;
	
	// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
	function SockJS(url, protocols, options) {
	  if (!(this instanceof SockJS)) {
	    return new SockJS(url, protocols, options);
	  }
	  if (arguments.length < 1) {
	    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
	  }
	  EventTarget.call(this);
	
	  this.readyState = SockJS.CONNECTING;
	  this.extensions = '';
	  this.protocol = '';
	
	  // non-standard extension
	  options = options || {};
	  if (options.protocols_whitelist) {
	    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
	  }
	  this._transportsWhitelist = options.transports;
	  this._transportOptions = options.transportOptions || {};
	
	  var sessionId = options.sessionId || 8;
	  if (typeof sessionId === 'function') {
	    this._generateSessionId = sessionId;
	  } else if (typeof sessionId === 'number') {
	    this._generateSessionId = function() {
	      return random.string(sessionId);
	    };
	  } else {
	    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
	  }
	
	  this._server = options.server || random.numberString(1000);
	
	  // Step 1 of WS spec - parse and validate the url. Issue #8
	  var parsedUrl = new URL(url);
	  if (!parsedUrl.host || !parsedUrl.protocol) {
	    throw new SyntaxError("The URL '" + url + "' is invalid");
	  } else if (parsedUrl.hash) {
	    throw new SyntaxError('The URL must not contain a fragment');
	  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
	    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
	  }
	
	  var secure = parsedUrl.protocol === 'https:';
	  // Step 2 - don't allow secure origin with an insecure protocol
	  if (loc.protocol === 'https' && !secure) {
	    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
	  }
	
	  // Step 3 - check port access - no need here
	  // Step 4 - parse protocols argument
	  if (!protocols) {
	    protocols = [];
	  } else if (!Array.isArray(protocols)) {
	    protocols = [protocols];
	  }
	
	  // Step 5 - check protocols argument
	  var sortedProtocols = protocols.sort();
	  sortedProtocols.forEach(function(proto, i) {
	    if (!proto) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
	    }
	    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
	    }
	  });
	
	  // Step 6 - convert origin
	  var o = urlUtils.getOrigin(loc.href);
	  this._origin = o ? o.toLowerCase() : null;
	
	  // remove the trailing slash
	  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));
	
	  // store the sanitized url
	  this.url = parsedUrl.href;
	  debug('using url', this.url);
	
	  // Step 7 - start connection in background
	  // obtain server info
	  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
	  this._urlInfo = {
	    nullOrigin: !browser.hasDomain()
	  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
	  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
	  };
	
	  this._ir = new InfoReceiver(this.url, this._urlInfo);
	  this._ir.once('finish', this._receiveInfo.bind(this));
	}
	
	inherits(SockJS, EventTarget);
	
	function userSetCode(code) {
	  return code === 1000 || (code >= 3000 && code <= 4999);
	}
	
	SockJS.prototype.close = function(code, reason) {
	  // Step 1
	  if (code && !userSetCode(code)) {
	    throw new Error('InvalidAccessError: Invalid code');
	  }
	  // Step 2.4 states the max is 123 bytes, but we are just checking length
	  if (reason && reason.length > 123) {
	    throw new SyntaxError('reason argument has an invalid length');
	  }
	
	  // Step 3.1
	  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
	    return;
	  }
	
	  // TODO look at docs to determine how to set this
	  var wasClean = true;
	  this._close(code || 1000, reason || 'Normal closure', wasClean);
	};
	
	SockJS.prototype.send = function(data) {
	  // #13 - convert anything non-string to string
	  // TODO this currently turns objects into [object Object]
	  if (typeof data !== 'string') {
	    data = '' + data;
	  }
	  if (this.readyState === SockJS.CONNECTING) {
	    throw new Error('InvalidStateError: The connection has not been established yet');
	  }
	  if (this.readyState !== SockJS.OPEN) {
	    return;
	  }
	  this._transport.send(escape.quote(data));
	};
	
	SockJS.version = __webpack_require__(50);
	
	SockJS.CONNECTING = 0;
	SockJS.OPEN = 1;
	SockJS.CLOSING = 2;
	SockJS.CLOSED = 3;
	
	SockJS.prototype._receiveInfo = function(info, rtt) {
	  debug('_receiveInfo', rtt);
	  this._ir = null;
	  if (!info) {
	    this._close(1002, 'Cannot connect to server');
	    return;
	  }
	
	  // establish a round-trip timeout (RTO) based on the
	  // round-trip time (RTT)
	  this._rto = this.countRTO(rtt);
	  // allow server to override url used for the actual transport
	  this._transUrl = info.base_url ? info.base_url : this.url;
	  info = objectUtils.extend(info, this._urlInfo);
	  debug('info', info);
	  // determine list of desired and supported transports
	  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
	  this._transports = enabledTransports.main;
	  debug(this._transports.length + ' enabled transports');
	
	  this._connect();
	};
	
	SockJS.prototype._connect = function() {
	  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
	    debug('attempt', Transport.transportName);
	    if (Transport.needBody) {
	      if (!global.document.body ||
	          (typeof global.document.readyState !== 'undefined' &&
	            global.document.readyState !== 'complete' &&
	            global.document.readyState !== 'interactive')) {
	        debug('waiting for body');
	        this._transports.unshift(Transport);
	        eventUtils.attachEvent('load', this._connect.bind(this));
	        return;
	      }
	    }
	
	    // calculate timeout based on RTO and round trips. Default to 5s
	    var timeoutMs = (this._rto * Transport.roundTrips) || 5000;
	    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
	    debug('using timeout', timeoutMs);
	
	    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
	    var options = this._transportOptions[Transport.transportName];
	    debug('transport url', transportUrl);
	    var transportObj = new Transport(transportUrl, this._transUrl, options);
	    transportObj.on('message', this._transportMessage.bind(this));
	    transportObj.once('close', this._transportClose.bind(this));
	    transportObj.transportName = Transport.transportName;
	    this._transport = transportObj;
	
	    return;
	  }
	  this._close(2000, 'All transports failed', false);
	};
	
	SockJS.prototype._transportTimeout = function() {
	  debug('_transportTimeout');
	  if (this.readyState === SockJS.CONNECTING) {
	    this._transportClose(2007, 'Transport timed out');
	  }
	};
	
	SockJS.prototype._transportMessage = function(msg) {
	  debug('_transportMessage', msg);
	  var self = this
	    , type = msg.slice(0, 1)
	    , content = msg.slice(1)
	    , payload
	    ;
	
	  // first check for messages that don't need a payload
	  switch (type) {
	    case 'o':
	      this._open();
	      return;
	    case 'h':
	      this.dispatchEvent(new Event('heartbeat'));
	      debug('heartbeat', this.transport);
	      return;
	  }
	
	  if (content) {
	    try {
	      payload = JSON3.parse(content);
	    } catch (e) {
	      debug('bad json', content);
	    }
	  }
	
	  if (typeof payload === 'undefined') {
	    debug('empty payload', content);
	    return;
	  }
	
	  switch (type) {
	    case 'a':
	      if (Array.isArray(payload)) {
	        payload.forEach(function(p) {
	          debug('message', self.transport, p);
	          self.dispatchEvent(new TransportMessageEvent(p));
	        });
	      }
	      break;
	    case 'm':
	      debug('message', this.transport, payload);
	      this.dispatchEvent(new TransportMessageEvent(payload));
	      break;
	    case 'c':
	      if (Array.isArray(payload) && payload.length === 2) {
	        this._close(payload[0], payload[1], true);
	      }
	      break;
	  }
	};
	
	SockJS.prototype._transportClose = function(code, reason) {
	  debug('_transportClose', this.transport, code, reason);
	  if (this._transport) {
	    this._transport.removeAllListeners();
	    this._transport = null;
	    this.transport = null;
	  }
	
	  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
	    this._connect();
	    return;
	  }
	
	  this._close(code, reason);
	};
	
	SockJS.prototype._open = function() {
	  debug('_open', this._transport.transportName, this.readyState);
	  if (this.readyState === SockJS.CONNECTING) {
	    if (this._transportTimeoutId) {
	      clearTimeout(this._transportTimeoutId);
	      this._transportTimeoutId = null;
	    }
	    this.readyState = SockJS.OPEN;
	    this.transport = this._transport.transportName;
	    this.dispatchEvent(new Event('open'));
	    debug('connected', this.transport);
	  } else {
	    // The server might have been restarted, and lost track of our
	    // connection.
	    this._close(1006, 'Server lost session');
	  }
	};
	
	SockJS.prototype._close = function(code, reason, wasClean) {
	  debug('_close', this.transport, code, reason, wasClean, this.readyState);
	  var forceFail = false;
	
	  if (this._ir) {
	    forceFail = true;
	    this._ir.close();
	    this._ir = null;
	  }
	  if (this._transport) {
	    this._transport.close();
	    this._transport = null;
	    this.transport = null;
	  }
	
	  if (this.readyState === SockJS.CLOSED) {
	    throw new Error('InvalidStateError: SockJS has already been closed');
	  }
	
	  this.readyState = SockJS.CLOSING;
	  setTimeout(function() {
	    this.readyState = SockJS.CLOSED;
	
	    if (forceFail) {
	      this.dispatchEvent(new Event('error'));
	    }
	
	    var e = new CloseEvent('close');
	    e.wasClean = wasClean || false;
	    e.code = code || 1000;
	    e.reason = reason;
	
	    this.dispatchEvent(e);
	    this.onmessage = this.onclose = this.onerror = null;
	    debug('disconnected');
	  }.bind(this), 0);
	};
	
	// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
	// and RFC 2988.
	SockJS.prototype.countRTO = function(rtt) {
	  // In a local environment, when using IE8/9 and the `jsonp-polling`
	  // transport the time needed to establish a connection (the time that pass
	  // from the opening of the transport to the call of `_dispatchOpen`) is
	  // around 200msec (the lower bound used in the article above) and this
	  // causes spurious timeouts. For this reason we calculate a value slightly
	  // larger than that used in the article.
	  if (rtt > 100) {
	    return 4 * rtt; // rto > 400msec
	  }
	  return 300 + rtt; // 300msec < rto <= 400msec
	};
	
	module.exports = function(availableTransports) {
	  transports = transport(availableTransports);
	  __webpack_require__(74)(SockJS, availableTransports);
	  return SockJS;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), (function() { return this; }())))

/***/ },
/* 61 */
/***/ function(module, exports) {

	/* eslint-disable */
	/* jscs: disable */
	'use strict';
	
	// pulled specific shims from https://github.com/es-shims/es5-shim
	
	var ArrayPrototype = Array.prototype;
	var ObjectPrototype = Object.prototype;
	var FunctionPrototype = Function.prototype;
	var StringPrototype = String.prototype;
	var array_slice = ArrayPrototype.slice;
	
	var _toString = ObjectPrototype.toString;
	var isFunction = function (val) {
	    return ObjectPrototype.toString.call(val) === '[object Function]';
	};
	var isArray = function isArray(obj) {
	    return _toString.call(obj) === '[object Array]';
	};
	var isString = function isString(obj) {
	    return _toString.call(obj) === '[object String]';
	};
	
	var supportsDescriptors = Object.defineProperty && (function () {
	    try {
	        Object.defineProperty({}, 'x', {});
	        return true;
	    } catch (e) { /* this is ES3 */
	        return false;
	    }
	}());
	
	// Define configurable, writable and non-enumerable props
	// if they don't exist.
	var defineProperty;
	if (supportsDescriptors) {
	    defineProperty = function (object, name, method, forceAssign) {
	        if (!forceAssign && (name in object)) { return; }
	        Object.defineProperty(object, name, {
	            configurable: true,
	            enumerable: false,
	            writable: true,
	            value: method
	        });
	    };
	} else {
	    defineProperty = function (object, name, method, forceAssign) {
	        if (!forceAssign && (name in object)) { return; }
	        object[name] = method;
	    };
	}
	var defineProperties = function (object, map, forceAssign) {
	    for (var name in map) {
	        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
	          defineProperty(object, name, map[name], forceAssign);
	        }
	    }
	};
	
	var toObject = function (o) {
	    if (o == null) { // this matches both null and undefined
	        throw new TypeError("can't convert " + o + ' to object');
	    }
	    return Object(o);
	};
	
	//
	// Util
	// ======
	//
	
	// ES5 9.4
	// http://es5.github.com/#x9.4
	// http://jsperf.com/to-integer
	
	function toInteger(num) {
	    var n = +num;
	    if (n !== n) { // isNaN
	        n = 0;
	    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
	        n = (n > 0 || -1) * Math.floor(Math.abs(n));
	    }
	    return n;
	}
	
	function ToUint32(x) {
	    return x >>> 0;
	}
	
	//
	// Function
	// ========
	//
	
	// ES-5 15.3.4.5
	// http://es5.github.com/#x15.3.4.5
	
	function Empty() {}
	
	defineProperties(FunctionPrototype, {
	    bind: function bind(that) { // .length is 1
	        // 1. Let Target be the this value.
	        var target = this;
	        // 2. If IsCallable(Target) is false, throw a TypeError exception.
	        if (!isFunction(target)) {
	            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	        }
	        // 3. Let A be a new (possibly empty) internal list of all of the
	        //   argument values provided after thisArg (arg1, arg2 etc), in order.
	        // XXX slicedArgs will stand in for "A" if used
	        var args = array_slice.call(arguments, 1); // for normal call
	        // 4. Let F be a new native ECMAScript object.
	        // 11. Set the [[Prototype]] internal property of F to the standard
	        //   built-in Function prototype object as specified in 15.3.3.1.
	        // 12. Set the [[Call]] internal property of F as described in
	        //   15.3.4.5.1.
	        // 13. Set the [[Construct]] internal property of F as described in
	        //   15.3.4.5.2.
	        // 14. Set the [[HasInstance]] internal property of F as described in
	        //   15.3.4.5.3.
	        var binder = function () {
	
	            if (this instanceof bound) {
	                // 15.3.4.5.2 [[Construct]]
	                // When the [[Construct]] internal method of a function object,
	                // F that was created using the bind function is called with a
	                // list of arguments ExtraArgs, the following steps are taken:
	                // 1. Let target be the value of F's [[TargetFunction]]
	                //   internal property.
	                // 2. If target has no [[Construct]] internal method, a
	                //   TypeError exception is thrown.
	                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Construct]] internal
	                //   method of target providing args as the arguments.
	
	                var result = target.apply(
	                    this,
	                    args.concat(array_slice.call(arguments))
	                );
	                if (Object(result) === result) {
	                    return result;
	                }
	                return this;
	
	            } else {
	                // 15.3.4.5.1 [[Call]]
	                // When the [[Call]] internal method of a function object, F,
	                // which was created using the bind function is called with a
	                // this value and a list of arguments ExtraArgs, the following
	                // steps are taken:
	                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                //   property.
	                // 3. Let target be the value of F's [[TargetFunction]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Call]] internal method
	                //   of target providing boundThis as the this value and
	                //   providing args as the arguments.
	
	                // equiv: target.call(this, ...boundArgs, ...args)
	                return target.apply(
	                    that,
	                    args.concat(array_slice.call(arguments))
	                );
	
	            }
	
	        };
	
	        // 15. If the [[Class]] internal property of Target is "Function", then
	        //     a. Let L be the length property of Target minus the length of A.
	        //     b. Set the length own property of F to either 0 or L, whichever is
	        //       larger.
	        // 16. Else set the length own property of F to 0.
	
	        var boundLength = Math.max(0, target.length - args.length);
	
	        // 17. Set the attributes of the length own property of F to the values
	        //   specified in 15.3.5.1.
	        var boundArgs = [];
	        for (var i = 0; i < boundLength; i++) {
	            boundArgs.push('$' + i);
	        }
	
	        // XXX Build a dynamic function with desired amount of arguments is the only
	        // way to set the length property of a function.
	        // In environments where Content Security Policies enabled (Chrome extensions,
	        // for ex.) all use of eval or Function costructor throws an exception.
	        // However in all of these environments Function.prototype.bind exists
	        // and so this code will never be executed.
	        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
	
	        if (target.prototype) {
	            Empty.prototype = target.prototype;
	            bound.prototype = new Empty();
	            // Clean up dangling references.
	            Empty.prototype = null;
	        }
	
	        // TODO
	        // 18. Set the [[Extensible]] internal property of F to true.
	
	        // TODO
	        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	        // 20. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	        //   false.
	        // 21. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	        //   and false.
	
	        // TODO
	        // NOTE Function objects created using Function.prototype.bind do not
	        // have a prototype property or the [[Code]], [[FormalParameters]], and
	        // [[Scope]] internal properties.
	        // XXX can't delete prototype in pure-js.
	
	        // 22. Return F.
	        return bound;
	    }
	});
	
	//
	// Array
	// =====
	//
	
	// ES5 15.4.3.2
	// http://es5.github.com/#x15.4.3.2
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	defineProperties(Array, { isArray: isArray });
	
	
	var boxedString = Object('a');
	var splitString = boxedString[0] !== 'a' || !(0 in boxedString);
	
	var properlyBoxesContext = function properlyBoxed(method) {
	    // Check node 0.6.21 bug where third parameter is not boxed
	    var properlyBoxesNonStrict = true;
	    var properlyBoxesStrict = true;
	    if (method) {
	        method.call('foo', function (_, __, context) {
	            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
	        });
	
	        method.call([1], function () {
	            'use strict';
	            properlyBoxesStrict = typeof this === 'string';
	        }, 'x');
	    }
	    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
	};
	
	defineProperties(ArrayPrototype, {
	    forEach: function forEach(fun /*, thisp*/) {
	        var object = toObject(this),
	            self = splitString && isString(this) ? this.split('') : object,
	            thisp = arguments[1],
	            i = -1,
	            length = self.length >>> 0;
	
	        // If no callback function or if callback is not a callable function
	        if (!isFunction(fun)) {
	            throw new TypeError(); // TODO message
	        }
	
	        while (++i < length) {
	            if (i in self) {
	                // Invoke the callback function with call, passing arguments:
	                // context, property value, property key, thisArg object
	                // context
	                fun.call(thisp, self[i], i, object);
	            }
	        }
	    }
	}, !properlyBoxesContext(ArrayPrototype.forEach));
	
	// ES5 15.4.4.14
	// http://es5.github.com/#x15.4.4.14
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	defineProperties(ArrayPrototype, {
	    indexOf: function indexOf(sought /*, fromIndex */ ) {
	        var self = splitString && isString(this) ? this.split('') : toObject(this),
	            length = self.length >>> 0;
	
	        if (!length) {
	            return -1;
	        }
	
	        var i = 0;
	        if (arguments.length > 1) {
	            i = toInteger(arguments[1]);
	        }
	
	        // handle negative indices
	        i = i >= 0 ? i : Math.max(0, length + i);
	        for (; i < length; i++) {
	            if (i in self && self[i] === sought) {
	                return i;
	            }
	        }
	        return -1;
	    }
	}, hasFirefox2IndexOfBug);
	
	//
	// String
	// ======
	//
	
	// ES5 15.5.4.14
	// http://es5.github.com/#x15.5.4.14
	
	// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	// Many browsers do not split properly with regular expressions or they
	// do not perform the split correctly under obscure conditions.
	// See http://blog.stevenlevithan.com/archives/cross-browser-split
	// I've tested in many browsers and this seems to cover the deviant ones:
	//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	//       [undefined, "t", undefined, "e", ...]
	//    ''.split(/.?/) should be [], not [""]
	//    '.'.split(/()()/) should be ["."], not ["", "", "."]
	
	var string_split = StringPrototype.split;
	if (
	    'ab'.split(/(?:ab)*/).length !== 2 ||
	    '.'.split(/(.?)(.?)/).length !== 4 ||
	    'tesst'.split(/(s)*/)[1] === 't' ||
	    'test'.split(/(?:)/, -1).length !== 4 ||
	    ''.split(/.?/).length ||
	    '.'.split(/()()/).length > 1
	) {
	    (function () {
	        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group
	
	        StringPrototype.split = function (separator, limit) {
	            var string = this;
	            if (separator === void 0 && limit === 0) {
	                return [];
	            }
	
	            // If `separator` is not a regex, use native split
	            if (_toString.call(separator) !== '[object RegExp]') {
	                return string_split.call(this, separator, limit);
	            }
	
	            var output = [],
	                flags = (separator.ignoreCase ? 'i' : '') +
	                        (separator.multiline  ? 'm' : '') +
	                        (separator.extended   ? 'x' : '') + // Proposed for ES6
	                        (separator.sticky     ? 'y' : ''), // Firefox 3+
	                lastLastIndex = 0,
	                // Make `global` and avoid `lastIndex` issues by working with a copy
	                separator2, match, lastIndex, lastLength;
	            separator = new RegExp(separator.source, flags + 'g');
	            string += ''; // Type-convert
	            if (!compliantExecNpcg) {
	                // Doesn't need flags gy, but they don't hurt
	                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
	            }
	            /* Values for `limit`, per the spec:
	             * If undefined: 4294967295 // Math.pow(2, 32) - 1
	             * If 0, Infinity, or NaN: 0
	             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	             * If other: Type-convert, then use the above rules
	             */
	            limit = limit === void 0 ?
	                -1 >>> 0 : // Math.pow(2, 32) - 1
	                ToUint32(limit);
	            while (match = separator.exec(string)) {
	                // `separator.lastIndex` is not reliable cross-browser
	                lastIndex = match.index + match[0].length;
	                if (lastIndex > lastLastIndex) {
	                    output.push(string.slice(lastLastIndex, match.index));
	                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                    // nonparticipating capturing groups
	                    if (!compliantExecNpcg && match.length > 1) {
	                        match[0].replace(separator2, function () {
	                            for (var i = 1; i < arguments.length - 2; i++) {
	                                if (arguments[i] === void 0) {
	                                    match[i] = void 0;
	                                }
	                            }
	                        });
	                    }
	                    if (match.length > 1 && match.index < string.length) {
	                        ArrayPrototype.push.apply(output, match.slice(1));
	                    }
	                    lastLength = match[0].length;
	                    lastLastIndex = lastIndex;
	                    if (output.length >= limit) {
	                        break;
	                    }
	                }
	                if (separator.lastIndex === match.index) {
	                    separator.lastIndex++; // Avoid an infinite loop
	                }
	            }
	            if (lastLastIndex === string.length) {
	                if (lastLength || !separator.test('')) {
	                    output.push('');
	                }
	            } else {
	                output.push(string.slice(lastLastIndex));
	            }
	            return output.length > limit ? output.slice(0, limit) : output;
	        };
	    }());
	
	// [bugfix, chrome]
	// If separator is undefined, then the result array contains just one String,
	// which is the this value (converted to a String). If limit is not undefined,
	// then the output array is truncated so that it contains no more than limit
	// elements.
	// "0".split(undefined, 0) -> []
	} else if ('0'.split(void 0, 0).length) {
	    StringPrototype.split = function split(separator, limit) {
	        if (separator === void 0 && limit === 0) { return []; }
	        return string_split.call(this, separator, limit);
	    };
	}
	
	// ECMA-262, 3rd B.2.3
	// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	// non-normative section suggesting uniform semantics and it should be
	// normalized across all browsers
	// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	var string_substr = StringPrototype.substr;
	var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	defineProperties(StringPrototype, {
	    substr: function substr(start, length) {
	        return string_substr.call(
	            this,
	            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
	            length
	        );
	    }
	}, hasNegativeSubstrBug);


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var JSON3 = __webpack_require__(48);
	
	// Some extra characters that Chrome gets wrong, and substitutes with
	// something else on the wire.
	// eslint-disable-next-line no-control-regex
	var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
	  , extraLookup;
	
	// This may be quite slow, so let's delay until user actually uses bad
	// characters.
	var unrollLookup = function(escapable) {
	  var i;
	  var unrolled = {};
	  var c = [];
	  for (i = 0; i < 65536; i++) {
	    c.push( String.fromCharCode(i) );
	  }
	  escapable.lastIndex = 0;
	  c.join('').replace(escapable, function(a) {
	    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	    return '';
	  });
	  escapable.lastIndex = 0;
	  return unrolled;
	};
	
	// Quote string, also taking care of unicode characters that browsers
	// often break. Especially, take care of unicode surrogates:
	// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
	module.exports = {
	  quote: function(string) {
	    var quoted = JSON3.stringify(string);
	
	    // In most cases this should be very fast and good enough.
	    extraEscapable.lastIndex = 0;
	    if (!extraEscapable.test(quoted)) {
	      return quoted;
	    }
	
	    if (!extraLookup) {
	      extraLookup = unrollLookup(extraEscapable);
	    }
	
	    return quoted.replace(extraEscapable, function(a) {
	      return extraLookup[a];
	    });
	  }
	};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:utils:transport');
	}
	
	module.exports = function(availableTransports) {
	  return {
	    filterToEnabled: function(transportsWhitelist, info) {
	      var transports = {
	        main: []
	      , facade: []
	      };
	      if (!transportsWhitelist) {
	        transportsWhitelist = [];
	      } else if (typeof transportsWhitelist === 'string') {
	        transportsWhitelist = [transportsWhitelist];
	      }
	
	      availableTransports.forEach(function(trans) {
	        if (!trans) {
	          return;
	        }
	
	        if (trans.transportName === 'websocket' && info.websocket === false) {
	          debug('disabled from server', 'websocket');
	          return;
	        }
	
	        if (transportsWhitelist.length &&
	            transportsWhitelist.indexOf(trans.transportName) === -1) {
	          debug('not in whitelist', trans.transportName);
	          return;
	        }
	
	        if (trans.enabled(info)) {
	          debug('enabled', trans.transportName);
	          transports.main.push(trans);
	          if (trans.facadeTransport) {
	            transports.facade.push(trans.facadeTransport);
	          }
	        } else {
	          debug('disabled', trans.transportName);
	        }
	      });
	      return transports;
	    }
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 64 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var logObject = {};
	['log', 'debug', 'warn'].forEach(function (level) {
	  var levelExists;
	
	  try {
	    levelExists = global.console && global.console[level] && global.console[level].apply;
	  } catch(e) {
	    // do nothing
	  }
	
	  logObject[level] = levelExists ? function () {
	    return global.console[level].apply(global.console, arguments);
	  } : (level === 'log' ? function () {} : logObject.log);
	});
	
	module.exports = logObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';
	
	function Event(eventType) {
	  this.type = eventType;
	}
	
	Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
	  this.type = eventType;
	  this.bubbles = canBubble;
	  this.cancelable = cancelable;
	  this.timeStamp = +new Date();
	  return this;
	};
	
	Event.prototype.stopPropagation = function() {};
	Event.prototype.preventDefault = function() {};
	
	Event.CAPTURING_PHASE = 1;
	Event.AT_TARGET = 2;
	Event.BUBBLING_PHASE = 3;
	
	module.exports = Event;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	module.exports = global.location || {
	  origin: 'http://localhost:80'
	, protocol: 'http'
	, host: 'localhost'
	, port: 80
	, href: 'http://localhost/'
	, hash: ''
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , Event = __webpack_require__(65)
	  ;
	
	function CloseEvent() {
	  Event.call(this);
	  this.initEvent('close', false, false);
	  this.wasClean = false;
	  this.code = 0;
	  this.reason = '';
	}
	
	inherits(CloseEvent, Event);
	
	module.exports = CloseEvent;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , Event = __webpack_require__(65)
	  ;
	
	function TransportMessageEvent(data) {
	  Event.call(this);
	  this.initEvent('message', false, false);
	  this.data = data;
	}
	
	inherits(TransportMessageEvent, Event);
	
	module.exports = TransportMessageEvent;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var EventEmitter = __webpack_require__(28).EventEmitter
	  , inherits = __webpack_require__(27)
	  , urlUtils = __webpack_require__(19)
	  , XDR = __webpack_require__(42)
	  , XHRCors = __webpack_require__(37)
	  , XHRLocal = __webpack_require__(39)
	  , XHRFake = __webpack_require__(70)
	  , InfoIframe = __webpack_require__(71)
	  , InfoAjax = __webpack_require__(73)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:info-receiver');
	}
	
	function InfoReceiver(baseUrl, urlInfo) {
	  debug(baseUrl);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function() {
	    self.doXhr(baseUrl, urlInfo);
	  }, 0);
	}
	
	inherits(InfoReceiver, EventEmitter);
	
	// TODO this is currently ignoring the list of available transports and the whitelist
	
	InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
	  // determine method of CORS support (if needed)
	  if (urlInfo.sameOrigin) {
	    return new InfoAjax(url, XHRLocal);
	  }
	  if (XHRCors.enabled) {
	    return new InfoAjax(url, XHRCors);
	  }
	  if (XDR.enabled && urlInfo.sameScheme) {
	    return new InfoAjax(url, XDR);
	  }
	  if (InfoIframe.enabled()) {
	    return new InfoIframe(baseUrl, url);
	  }
	  return new InfoAjax(url, XHRFake);
	};
	
	InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
	  var self = this
	    , url = urlUtils.addPath(baseUrl, '/info')
	    ;
	  debug('doXhr', url);
	
	  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);
	
	  this.timeoutRef = setTimeout(function() {
	    debug('timeout');
	    self._cleanup(false);
	    self.emit('finish');
	  }, InfoReceiver.timeout);
	
	  this.xo.once('finish', function(info, rtt) {
	    debug('finish', info, rtt);
	    self._cleanup(true);
	    self.emit('finish', info, rtt);
	  });
	};
	
	InfoReceiver.prototype._cleanup = function(wasClean) {
	  debug('_cleanup');
	  clearTimeout(this.timeoutRef);
	  this.timeoutRef = null;
	  if (!wasClean && this.xo) {
	    this.xo.close();
	  }
	  this.xo = null;
	};
	
	InfoReceiver.prototype.close = function() {
	  debug('close');
	  this.removeAllListeners();
	  this._cleanup(false);
	};
	
	InfoReceiver.timeout = 8000;
	
	module.exports = InfoReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var EventEmitter = __webpack_require__(28).EventEmitter
	  , inherits = __webpack_require__(27)
	  ;
	
	function XHRFake(/* method, url, payload, opts */) {
	  var self = this;
	  EventEmitter.call(this);
	
	  this.to = setTimeout(function() {
	    self.emit('finish', 200, '{}');
	  }, XHRFake.timeout);
	}
	
	inherits(XHRFake, EventEmitter);
	
	XHRFake.prototype.close = function() {
	  clearTimeout(this.to);
	};
	
	XHRFake.timeout = 2000;
	
	module.exports = XHRFake;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var EventEmitter = __webpack_require__(28).EventEmitter
	  , inherits = __webpack_require__(27)
	  , JSON3 = __webpack_require__(48)
	  , utils = __webpack_require__(16)
	  , IframeTransport = __webpack_require__(47)
	  , InfoReceiverIframe = __webpack_require__(72)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:info-iframe');
	}
	
	function InfoIframe(baseUrl, url) {
	  var self = this;
	  EventEmitter.call(this);
	
	  var go = function() {
	    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);
	
	    ifr.once('message', function(msg) {
	      if (msg) {
	        var d;
	        try {
	          d = JSON3.parse(msg);
	        } catch (e) {
	          debug('bad json', msg);
	          self.emit('finish');
	          self.close();
	          return;
	        }
	
	        var info = d[0], rtt = d[1];
	        self.emit('finish', info, rtt);
	      }
	      self.close();
	    });
	
	    ifr.once('close', function() {
	      self.emit('finish');
	      self.close();
	    });
	  };
	
	  // TODO this seems the same as the 'needBody' from transports
	  if (!global.document.body) {
	    utils.attachEvent('load', go);
	  } else {
	    go();
	  }
	}
	
	inherits(InfoIframe, EventEmitter);
	
	InfoIframe.enabled = function() {
	  return IframeTransport.enabled();
	};
	
	InfoIframe.prototype.close = function() {
	  if (this.ifr) {
	    this.ifr.close();
	  }
	  this.removeAllListeners();
	  this.ifr = null;
	};
	
	module.exports = InfoIframe;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), (function() { return this; }())))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(27)
	  , EventEmitter = __webpack_require__(28).EventEmitter
	  , JSON3 = __webpack_require__(48)
	  , XHRLocalObject = __webpack_require__(39)
	  , InfoAjax = __webpack_require__(73)
	  ;
	
	function InfoReceiverIframe(transUrl) {
	  var self = this;
	  EventEmitter.call(this);
	
	  this.ir = new InfoAjax(transUrl, XHRLocalObject);
	  this.ir.once('finish', function(info, rtt) {
	    self.ir = null;
	    self.emit('message', JSON3.stringify([info, rtt]));
	  });
	}
	
	inherits(InfoReceiverIframe, EventEmitter);
	
	InfoReceiverIframe.transportName = 'iframe-info-receiver';
	
	InfoReceiverIframe.prototype.close = function() {
	  if (this.ir) {
	    this.ir.close();
	    this.ir = null;
	  }
	  this.removeAllListeners();
	};
	
	module.exports = InfoReceiverIframe;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var EventEmitter = __webpack_require__(28).EventEmitter
	  , inherits = __webpack_require__(27)
	  , JSON3 = __webpack_require__(48)
	  , objectUtils = __webpack_require__(52)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:info-ajax');
	}
	
	function InfoAjax(url, AjaxObject) {
	  EventEmitter.call(this);
	
	  var self = this;
	  var t0 = +new Date();
	  this.xo = new AjaxObject('GET', url);
	
	  this.xo.once('finish', function(status, text) {
	    var info, rtt;
	    if (status === 200) {
	      rtt = (+new Date()) - t0;
	      if (text) {
	        try {
	          info = JSON3.parse(text);
	        } catch (e) {
	          debug('bad json', text);
	        }
	      }
	
	      if (!objectUtils.isObject(info)) {
	        info = {};
	      }
	    }
	    self.emit('finish', info, rtt);
	    self.removeAllListeners();
	  });
	}
	
	inherits(InfoAjax, EventEmitter);
	
	InfoAjax.prototype.close = function() {
	  this.removeAllListeners();
	  this.xo.close();
	};
	
	module.exports = InfoAjax;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var urlUtils = __webpack_require__(19)
	  , eventUtils = __webpack_require__(16)
	  , JSON3 = __webpack_require__(48)
	  , FacadeJS = __webpack_require__(75)
	  , InfoIframeReceiver = __webpack_require__(72)
	  , iframeUtils = __webpack_require__(51)
	  , loc = __webpack_require__(66)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(24)('sockjs-client:iframe-bootstrap');
	}
	
	module.exports = function(SockJS, availableTransports) {
	  var transportMap = {};
	  availableTransports.forEach(function(at) {
	    if (at.facadeTransport) {
	      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
	    }
	  });
	
	  // hard-coded for the info iframe
	  // TODO see if we can make this more dynamic
	  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
	  var parentOrigin;
	
	  /* eslint-disable camelcase */
	  SockJS.bootstrap_iframe = function() {
	    /* eslint-enable camelcase */
	    var facade;
	    iframeUtils.currentWindowId = loc.hash.slice(1);
	    var onMessage = function(e) {
	      if (e.source !== parent) {
	        return;
	      }
	      if (typeof parentOrigin === 'undefined') {
	        parentOrigin = e.origin;
	      }
	      if (e.origin !== parentOrigin) {
	        return;
	      }
	
	      var iframeMessage;
	      try {
	        iframeMessage = JSON3.parse(e.data);
	      } catch (ignored) {
	        debug('bad json', e.data);
	        return;
	      }
	
	      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
	        return;
	      }
	      switch (iframeMessage.type) {
	      case 's':
	        var p;
	        try {
	          p = JSON3.parse(iframeMessage.data);
	        } catch (ignored) {
	          debug('bad json', iframeMessage.data);
	          break;
	        }
	        var version = p[0];
	        var transport = p[1];
	        var transUrl = p[2];
	        var baseUrl = p[3];
	        debug(version, transport, transUrl, baseUrl);
	        // change this to semver logic
	        if (version !== SockJS.version) {
	          throw new Error('Incompatible SockJS! Main site uses:' +
	                    ' "' + version + '", the iframe:' +
	                    ' "' + SockJS.version + '".');
	        }
	
	        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
	            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
	          throw new Error('Can\'t connect to different domain from within an ' +
	                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
	        }
	        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
	        break;
	      case 'm':
	        facade._send(iframeMessage.data);
	        break;
	      case 'c':
	        if (facade) {
	          facade._close();
	        }
	        facade = null;
	        break;
	      }
	    };
	
	    eventUtils.attachEvent('message', onMessage);
	
	    // Start
	    iframeUtils.postMessage('s');
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var JSON3 = __webpack_require__(48)
	  , iframeUtils = __webpack_require__(51)
	  ;
	
	function FacadeJS(transport) {
	  this._transport = transport;
	  transport.on('message', this._transportMessage.bind(this));
	  transport.on('close', this._transportClose.bind(this));
	}
	
	FacadeJS.prototype._transportClose = function(code, reason) {
	  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
	};
	FacadeJS.prototype._transportMessage = function(frame) {
	  iframeUtils.postMessage('t', frame);
	};
	FacadeJS.prototype._send = function(data) {
	  this._transport.send(data);
	};
	FacadeJS.prototype._close = function() {
	  this._transport.close();
	  this._transport.removeAllListeners();
	};
	
	module.exports = FacadeJS;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}
	
				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}
	
				if(!upToDate()) {
					check();
				}
	
				__webpack_require__(77)(updatedModules, updatedModules);
	
				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}
	
			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },
/* 77 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _app = __webpack_require__(79);
	
	var _app2 = _interopRequireDefault(_app);
	
	document.body.appendChild(_app2['default'].createElement());

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _receiveJs = __webpack_require__(82);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(83);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _modelJs = __webpack_require__(286);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _stateJs = __webpack_require__(287);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var App = (0, _utilsCreateElement2['default'])({
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = App;
	module.exports = exports['default'];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// @TOOD: Maybe change the API to { propose, accept, learn, view } ????
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var _utilsUtils = __webpack_require__(81);
	
	var display = function display(state, propose, actions) {
	
	    var stateRepresentation = state && state.render && propose ? (0, _utilsUtils.compose)(state.render, propose) : null;
	
	    if (actions && stateRepresentation) {
	
	        actions(stateRepresentation);
	    }
	};
	
	var createElement = function createElement(component) {
	
	    display(component.state, component.propose, component.actions);
	
	    return {
	
	        intents: component.intents, // @TODO: Don't add when undefined
	
	        createElement: function createElement(model) {
	            for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                children[_key - 1] = arguments[_key];
	            }
	
	            var newModel = children && children.length ? Object.assign({}, model, { children: children }) : Object.assign({}, model);
	
	            var args = [component.propose ? component.propose(newModel) : null, component.intents ? component.intents : null].filter(function (x) {
	                return x !== null;
	            });
	
	            return component.view.apply(component, _toConsumableArray(args));
	        }
	    };
	};
	
	exports['default'] = createElement;
	module.exports = exports['default'];

/***/ },
/* 81 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var compose = function compose() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }
	
	  return fns.reduce(function (f, g) {
	    return function () {
	      return f(g.apply(undefined, arguments));
	    };
	  });
	};
	
	exports.compose = compose;

/***/ },
/* 82 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(84);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _headerIndex = __webpack_require__(99);
	
	var _headerIndex2 = _interopRequireDefault(_headerIndex);
	
	// @TOOD: Make the view render() instead of the state??
	
	var view = function view(model) {
	    return (0, _utilsElements.div)({ id: model.id, className: _stylesCss2['default'].app }, _headerIndex2['default'].createElement(model.header));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(85);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(85, function() {
				var newContent = __webpack_require__(85);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, "@font-face {\n  font-family: 'WHHoxtonWeb';\n  src: url(" + __webpack_require__(91) + "); /* IE9 Compat Modes */\n  src: url(" + __webpack_require__(91) + "?#iefix) format('embedded-opentype'), \n       url(" + __webpack_require__(92) + ") format('woff2'), \n       url(" + __webpack_require__(93) + ") format('woff'), \n       url(" + __webpack_require__(94) + ")  format('truetype'), \n       url(" + __webpack_require__(95) + "#svgFontName) format('svg'); /* Legacy iOS */\n}\n\n.app--cmja1 * {\n    box-sizing: border-box;\n    font-family: 'WHHoxtonWeb';\n}", ""]);
	
	// exports
	exports.locals = {
		"app": "app--cmja1"
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function(useSourceMap) {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if(item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};
	
	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}
	
		if (useSourceMap) {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
			});
	
			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}
	
		return [content].join('\n');
	}
	
	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
	  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
	  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
	
	  return '/*# ' + data + ' */';
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(87).Buffer))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(88)
	var ieee754 = __webpack_require__(89)
	var isArray = __webpack_require__(90)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 89 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 90 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "703898e2f2960b0676eadc0cfa03c965.eot";

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6b739d74e64a0ffce9f114467eafc89f.woff2";

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ca61d9806fd0d215c4da23b64d243fee.woff";

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "c238699e4c5b87ea3c672e74a5b607f2.ttf";

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "efd8beb9a9ca4d167cb5b4c38fc88641.svg";

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [],
		fixUrls = __webpack_require__(97);
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		options.attrs = typeof options.attrs === "object" ? options.attrs : {};
	
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	};
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		options.attrs.type = "text/css";
	
		attachTagAttrs(styleElement, options.attrs);
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";
	
		attachTagAttrs(linkElement, options.attrs);
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function attachTagAttrs(element, attrs) {
		Object.keys(attrs).forEach(function (key) {
			element.setAttribute(key, attrs[key]);
		});
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement, options);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
		*/
		const autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
	
		if (options.convertToAbsoluteUrls || autoFixUrls){
			css = fixUrls(css);
		}
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 97 */
/***/ function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */
	
	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;
	
	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }
	
		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }
	
	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
	
		// convert each url(...)
		var fixedCss = css.replace(/url *\( *(.+?) *\)/g, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });
	
			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}
	
			// convert the url to a full url
			var newUrl;
	
			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}
	
			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});
	
		// send back the fixed css
		return fixedCss;
	};


/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var attributeExceptions = ["role", "dataset", "d", "r", "cx", "cy", "width", "height", "viewBox", "fill"];
	
	var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
	
	function appendText(el, text) {
	    var textNode = document.createTextNode(text);
	    el.appendChild(textNode);
	}
	
	function appendArray(el, children) {
	    children.forEach(function (child) {
	        if (Array.isArray(child)) {
	            appendArray(el, child);
	        } else if (child instanceof window.Element) {
	            el.appendChild(child);
	        } else if (typeof child === "string" || typeof child === "number") {
	            appendText(el, child);
	        }
	    });
	}
	
	function setStyles(el, styles) {
	    if (!styles) {
	        el.removeAttribute("styles");
	        return;
	    }
	
	    Object.keys(styles).forEach(function (styleName) {
	        if (styleName in el.style) {
	            el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
	        } else {
	                console.warn(styleName + " is not a valid style for a <" + el.tagName.toLowerCase() + ">");
	            }
	    });
	}
	
	function setDataAttributes(el, dataAttributes) {
	    Object.keys(dataAttributes).forEach(function (dataAttribute) {
	        // jsdom doesn't support element.dataset, so set them as named attributes
	        el.setAttribute("data-" + dataAttribute, dataAttributes[dataAttribute]);
	    });
	}
	
	function isSvg(type) {
	    return ["path", "svg", "circle"].includes(type);
	}
	
	function makeElement(type, textOrPropsOrChild) {
	    var el = isSvg(type) ? document.createElementNS(SVG_NAMESPACE, type) : document.createElement(type);
	
	    if (Array.isArray(textOrPropsOrChild)) {
	        appendArray(el, textOrPropsOrChild);
	    } else if (textOrPropsOrChild instanceof window.Element) {
	        el.appendChild(textOrPropsOrChild);
	    } else if (typeof textOrPropsOrChild === "string" || typeof textOrPropsOrChild === "number") {
	        appendText(el, textOrPropsOrChild);
	    } else if (typeof textOrPropsOrChild === "object") {
	        Object.keys(textOrPropsOrChild).forEach(function (propName) {
	            if (propName in el || attributeExceptions.includes(propName)) {
	                var value = textOrPropsOrChild[propName];
	
	                if (propName === "style") {
	                    setStyles(el, value);
	                } else if (propName === "dataset") {
	                    setDataAttributes(el, value);
	                } else if (typeof value === "function" || propName === "className") {
	                    el[propName] = value; // e.g. onclick
	                } else if (value) {
	                        el.setAttribute(propName, value); // need this for SVG elements
	                    }
	            } else {
	                    console.warn(propName + " is not a valid property of a <" + type + ">");
	                }
	        });
	    }
	
	    for (var _len = arguments.length, otherChildren = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        otherChildren[_key - 2] = arguments[_key];
	    }
	
	    if (otherChildren) appendArray(el, otherChildren);
	
	    return el;
	}
	
	var a = function a() {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	    }
	
	    return makeElement.apply(undefined, ["a"].concat(args));
	};
	exports.a = a;
	var button = function button() {
	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	    }
	
	    return makeElement.apply(undefined, ["button"].concat(args));
	};
	exports.button = button;
	var circle = function circle() {
	    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	    }
	
	    return makeElement.apply(undefined, ["circle"].concat(args));
	};
	exports.circle = circle;
	var div = function div() {
	    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	    }
	
	    return makeElement.apply(undefined, ["div"].concat(args));
	};
	exports.div = div;
	var footer = function footer() {
	    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	    }
	
	    return makeElement.apply(undefined, ["footer"].concat(args));
	};
	exports.footer = footer;
	var form = function form() {
	    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        args[_key7] = arguments[_key7];
	    }
	
	    return makeElement.apply(undefined, ["form"].concat(args));
	};
	exports.form = form;
	var h1 = function h1() {
	    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	        args[_key8] = arguments[_key8];
	    }
	
	    return makeElement.apply(undefined, ["h1"].concat(args));
	};
	exports.h1 = h1;
	var h2 = function h2() {
	    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	        args[_key9] = arguments[_key9];
	    }
	
	    return makeElement.apply(undefined, ["h2"].concat(args));
	};
	exports.h2 = h2;
	var h3 = function h3() {
	    for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	        args[_key10] = arguments[_key10];
	    }
	
	    return makeElement.apply(undefined, ["h3"].concat(args));
	};
	exports.h3 = h3;
	var header = function header() {
	    for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
	        args[_key11] = arguments[_key11];
	    }
	
	    return makeElement.apply(undefined, ["header"].concat(args));
	};
	exports.header = header;
	var iframe = function iframe() {
	    for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
	        args[_key12] = arguments[_key12];
	    }
	
	    return makeElement.apply(undefined, ["iframe"].concat(args));
	};
	exports.iframe = iframe;
	var img = function img() {
	    for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
	        args[_key13] = arguments[_key13];
	    }
	
	    return makeElement.apply(undefined, ["img"].concat(args));
	};
	exports.img = img;
	var input = function input() {
	    for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
	        args[_key14] = arguments[_key14];
	    }
	
	    return makeElement.apply(undefined, ["input"].concat(args));
	};
	exports.input = input;
	var label = function label() {
	    for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
	        args[_key15] = arguments[_key15];
	    }
	
	    return makeElement.apply(undefined, ["label"].concat(args));
	};
	exports.label = label;
	var li = function li() {
	    for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
	        args[_key16] = arguments[_key16];
	    }
	
	    return makeElement.apply(undefined, ["li"].concat(args));
	};
	exports.li = li;
	var main = function main() {
	    for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
	        args[_key17] = arguments[_key17];
	    }
	
	    return makeElement.apply(undefined, ["main"].concat(args));
	};
	exports.main = main;
	var nav = function nav() {
	    for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
	        args[_key18] = arguments[_key18];
	    }
	
	    return makeElement.apply(undefined, ["nav"].concat(args));
	};
	exports.nav = nav;
	var p = function p() {
	    for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
	        args[_key19] = arguments[_key19];
	    }
	
	    return makeElement.apply(undefined, ["p"].concat(args));
	};
	exports.p = p;
	var path = function path() {
	    for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
	        args[_key20] = arguments[_key20];
	    }
	
	    return makeElement.apply(undefined, ["path"].concat(args));
	};
	exports.path = path;
	var section = function section() {
	    for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
	        args[_key21] = arguments[_key21];
	    }
	
	    return makeElement.apply(undefined, ["section"].concat(args));
	};
	exports.section = section;
	var span = function span() {
	    for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
	        args[_key22] = arguments[_key22];
	    }
	
	    return makeElement.apply(undefined, ["span"].concat(args));
	};
	exports.span = span;
	var svg = function svg() {
	    for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
	        args[_key23] = arguments[_key23];
	    }
	
	    return makeElement.apply(undefined, ["svg"].concat(args));
	};
	exports.svg = svg;
	var ul = function ul() {
	    for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
	        args[_key24] = arguments[_key24];
	    }
	
	    return makeElement.apply(undefined, ["ul"].concat(args));
	};
	exports.ul = ul;
	var dl = function dl() {
	    for (var _len25 = arguments.length, args = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
	        args[_key25] = arguments[_key25];
	    }
	
	    return makeElement.apply(undefined, ["dl"].concat(args));
	};
	exports.dl = dl;
	var dt = function dt() {
	    for (var _len26 = arguments.length, args = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
	        args[_key26] = arguments[_key26];
	    }
	
	    return makeElement.apply(undefined, ["dt"].concat(args));
	};
	exports.dt = dt;
	var dd = function dd() {
	    for (var _len27 = arguments.length, args = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
	        args[_key27] = arguments[_key27];
	    }
	
	    return makeElement.apply(undefined, ["dd"].concat(args));
	};
	exports.dd = dd;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _actions = __webpack_require__(100);
	
	var _receive = __webpack_require__(111);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _view = __webpack_require__(112);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _model = __webpack_require__(284);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _state = __webpack_require__(285);
	
	var _state2 = _interopRequireDefault(_state);
	
	var Header = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default'], _actions.intents),
	    view: _view2['default']
	});
	
	exports['default'] = Header;
	module.exports = exports['default'];

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _burgerIndex = __webpack_require__(101);
	
	var _burgerIndex2 = _interopRequireDefault(_burgerIndex);
	
	var _rxIndex = __webpack_require__(103);
	
	var toggleStream = new _rxIndex.Rx();
	
	var actions = function actions(propose) {
	
	    //toggleStream.observe(propose);
	};
	
	var intents = {
	
	    //onBurgerToggle = b.onToggle;
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _actionsJs = __webpack_require__(102);
	
	var _receiveJs = __webpack_require__(104);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(105);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _modelJs = __webpack_require__(108);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _stateJs = __webpack_require__(109);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var Burger = (0, _utilsCreateElement2['default'])({
	    actions: _actionsJs.actions,
	    intents: _actionsJs.intents,
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default'], _actionsJs.intents),
	    view: _viewJs2['default']
	});
	
	exports['default'] = Burger;
	module.exports = exports['default'];

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var toggleStream = new _rxIndexJs.Rx();
	
	var actions = function actions(propose) {
	
	    toggleStream.observe(propose);
	};
	
	var intents = {
	
	    toggle: toggleStream.update,
	
	    observe: toggleStream.observe
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 103 */
/***/ function(module, exports) {

	//import { state } from './state.js';
	//import { model } from './model.js';
	//import { actions } from './actions.js';
	//import { view } from './view.js';
	//
	//export default () => {
	//
	//    state.init(view);
	//
	//    model.init(state);
	//
	//    actions.init(model.present);
	//
	//    state.render();
	//
	//    return actions;
	//};
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function Rx() {
	
	    var subscribers = [];
	
	    var observe = function observe(observer) {
	        // create new object
	        subscribers.push(observer);
	        //console.log('adding observer: ', subscribers.length);
	    };
	
	    var update = function update(data) {
	
	        subscribers.forEach(function (observer) {
	            return observer.call(null, data);
	        });
	    };
	
	    return { observe: observe, update: update };
	}
	
	function ReduceStream(stream, reducingFn, initialReducedValue) {
	
	    var newStream = new Rx();
	    var reducedValued = initialReducedValue;
	
	    stream.observe(function (streamSnapshotValue) {
	
	        reducedValued = reducingFn(reducedValued, streamSnapshotValue);
	        newStream.update(reducedValued);
	    });
	
	    return newStream;
	}
	
	var MergeStreams = (function () {
	    function MergeStreams(streamA, streamB, mergeFn) {
	        _classCallCheck(this, MergeStreams);
	
	        this.streamA = streamA;
	        this.streamB = streamB;
	        this.mergeFn = mergeFn;
	
	        return this.init();
	    }
	
	    _createClass(MergeStreams, [{
	        key: "init",
	        value: function init() {
	            var _this = this;
	
	            var newStream = new Rx();
	            var streamData = [null, null];
	
	            this.streamA.observe(function (value) {
	
	                streamData[0] = value;
	                newStream.update(_this.mergeFn.apply(null, streamData));
	            });
	
	            this.streamB.observe(function (value) {
	
	                streamData[1] = value;
	                newStream.update(_this.mergeFn.apply(null, streamData));
	            });
	
	            return newStream;
	        }
	    }]);
	
	    return MergeStreams;
	})();
	
	exports.Rx = Rx;
	exports.ReduceStream = ReduceStream;
	exports.MergeStreams = MergeStreams;

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        if (proposal && typeof proposal.id !== 'undefined') {
	
	            model.id = proposal.id;
	        }
	
	        model.isActive = proposal && typeof proposal.isActive !== 'undefined' ? proposal.isActive : !model.isActive;
	
	        return model;
	    };
	};
	
	exports['default'] = receive;
	module.exports = exports['default'];

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(106);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var view = function view(model, intents) {
	    return (0, _utilsElements.button)({
	        id: model.id,
	        className: [_stylesCss2['default'].burger, _stylesCss2['default'].spin, model.isActive ? _stylesCss2['default'].isActive : ''].join(' '),
	        onclick: intents.toggle
	    }, (0, _utilsElements.span)({ className: _stylesCss2['default'].box }, (0, _utilsElements.span)({ className: _stylesCss2['default'].inner })));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(107);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(107, function() {
				var newContent = __webpack_require__(107);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".burger--3zP0z {\n    -moz-transition-duration: .15s;\n    -o-transition-duration: .15s;\n    -webkit-transition-duration: .15s;\n    transition-duration: .15s;\n    -moz-transition-property: opacity,background-color;\n    -o-transition-property: opacity,background-color;\n    -webkit-transition-property: opacity,background-color;\n    transition-property: opacity,background-color;\n    -moz-transition-timing-function: linear;\n    -o-transition-timing-function: linear;\n    -webkit-transition-timing-function: linear;\n    transition-timing-function: linear;\n    cursor: pointer;\n    padding: 12px 8px;\n    height: 44px;\n    background-color: transparent;\n    border: 0;\n    color: inherit;\n    font: inherit;\n    margin: 0;\n    outline: 0;\n    overflow: visible;\n    text-transform: none;\n}\n\n.box--1-qgI {\n    height: 16px;\n    position: relative;\n    width: 20px;\n    display: inline-block;\n}\n\n.inner--1dSEY {\n    display: block;\n    margin-top: 1px;\n    top: 50%\n}\n\n.inner--1dSEY,\n.inner--1dSEY::after,\n.inner--1dSEY::before {\n    -moz-border-radius: 4px;\n    -webkit-border-radius: 4px;\n    border-radius: 4px;\n    -moz-transition-duration: .15s;\n    -o-transition-duration: .15s;\n    -webkit-transition-duration: .15s;\n    transition-duration: .15s;\n    -moz-transition-property: -moz-transform;\n    -o-transition-property: -o-transform;\n    -webkit-transition-property: -webkit-transform;\n    transition-property: transform;\n    -moz-transition-timing-function: ease;\n    -o-transition-timing-function: ease;\n    -webkit-transition-timing-function: ease;\n    transition-timing-function: ease;\n    background-color: #fff;\n    height: 2px;\n    position: absolute;\n    width: 20px;\n}\n\n.inner--1dSEY::after,\n.inner--1dSEY::before {\n    content: '';\n    display: block;\n}\n\n.inner--1dSEY::before {\n    top: -7px;\n}\n\n.inner--1dSEY::after {\n    bottom: -7px;\n}\n\n.spin--euLEk .inner--1dSEY {\n    -moz-transition-duration: .3s;\n    -o-transition-duration: .3s;\n    -webkit-transition-duration: .3s;\n    transition-duration: .3s;\n    -moz-transition-timing-function: cubic-bezier(.55,.055,.675,.19);\n    -o-transition-timing-function: cubic-bezier(.55,.055,.675,.19);\n    -webkit-transition-timing-function: cubic-bezier(.55,.055,.675,.19);\n    transition-timing-function: cubic-bezier(.55,.055,.675,.19);\n}\n\n.spin--euLEk .inner--1dSEY::before {\n    -moz-transition: top .1s ease-in .34s,opacity .1s ease-in;\n    -o-transition: top .1s ease-in .34s,opacity .1s ease-in;\n    -webkit-transition: top .1s ease-in,opacity .1s ease-in;\n    -webkit-transition-delay: .34s,0s;\n    transition: top .1s ease-in .34s,opacity .1s ease-in;\n}\n\n.spin--euLEk .inner--1dSEY::after {\n    -moz-transition: bottom .1s ease-in .34s,-moz-transform .3s cubic-bezier(.55,.055,.675,.19);\n    -o-transition: bottom .1s ease-in .34s,-o-transform .3s cubic-bezier(.55,.055,.675,.19);\n    -webkit-transition: bottom .1s ease-in,-webkit-transform .3s cubic-bezier(.55,.055,.675,.19);\n    -webkit-transition-delay: .34s,0s;\n    transition: bottom .1s ease-in .34s,transform .3s cubic-bezier(.55,.055,.675,.19);\n}\n\n.spin--euLEk.is-active--1IPV- .inner--1dSEY {\n    -moz-transform: rotate(225deg);\n    -ms-transform: rotate(225deg);\n    -webkit-transform: rotate(225deg);\n    transform: rotate(225deg);\n    -moz-transition-delay: .14s;\n    -o-transition-delay: .14s;\n    -webkit-transition-delay: .14s;\n    transition-delay: .14s;\n    -moz-transition-timing-function: cubic-bezier(.215,.61,.355,1);\n    -o-transition-timing-function: cubic-bezier(.215,.61,.355,1);\n    -webkit-transition-timing-function: cubic-bezier(.215,.61,.355,1);\n    transition-timing-function: cubic-bezier(.215,.61,.355,1);\n}\n\n.spin--euLEk.is-active--1IPV- .inner--1dSEY::before {\n    -moz-transition: top .1s ease-out,opacity .1s ease-out .14s;\n    -o-transition: top .1s ease-out,opacity .1s ease-out .14s;\n    -webkit-transition: top .1s ease-out,opacity .1s ease-out;\n    -webkit-transition-delay: 0s,.14s;\n    transition: top .1s ease-out,opacity .1s ease-out .14s;\n    opacity: 0;\n    top: 0;\n}\n\n.spin--euLEk.is-active--1IPV- .inner--1dSEY::after {\n    -moz-transform: rotate(-90deg);\n    -ms-transform: rotate(-90deg);\n    -webkit-transform: rotate(-90deg);\n    transform: rotate(-90deg);\n    -moz-transition: bottom .1s ease-out,-moz-transform .3s cubic-bezier(.215,.61,.355,1) .14s;\n    -o-transition: bottom .1s ease-out,-o-transform .3s cubic-bezier(.215,.61,.355,1) .14s;\n    -webkit-transition: bottom .1s ease-out,-webkit-transform .3s cubic-bezier(.215,.61,.355,1);\n    -webkit-transition-delay: 0s,.14s;\n    transition: bottom .1s ease-out,transform .3s cubic-bezier(.215,.61,.355,1) .14s;\n    bottom: 0;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"burger": "burger--3zP0z",
		"box": "box--1-qgI",
		"inner": "inner--1dSEY",
		"spin": "spin--euLEk",
		"is-active": "is-active--1IPV-",
		"isActive": "is-active--1IPV-"
	};

/***/ },
/* 108 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'burger',
	    isActive: false
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view, actions) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model, actions)); // @TODO: Pass the root and fallback to body
	            } else {
	
	                    (0, _diffhtml.outerHTML)(component, view(model, actions));
	                }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global) {(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.diff = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createAttribute = exports.createElement = exports.release = exports.html = undefined;
	
	var _taggedTemplate = _dereq_('./util/tagged-template');
	
	Object.defineProperty(exports, 'html', {
	  enumerable: true,
	  get: function get() {
	    return _taggedTemplate.html;
	  }
	});
	
	var _release = _dereq_('./node/release');
	
	Object.defineProperty(exports, 'release', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_release).default;
	  }
	});
	
	var _helpers = _dereq_('./tree/helpers');
	
	Object.defineProperty(exports, 'createElement', {
	  enumerable: true,
	  get: function get() {
	    return _helpers.createElement;
	  }
	});
	Object.defineProperty(exports, 'createAttribute', {
	  enumerable: true,
	  get: function get() {
	    return _helpers.createAttribute;
	  }
	});
	exports.outerHTML = outerHTML;
	exports.innerHTML = innerHTML;
	exports.element = element;
	exports.addTransitionState = addTransitionState;
	exports.removeTransitionState = removeTransitionState;
	exports.use = use;
	
	var _transaction = _dereq_('./node/transaction');
	
	var _transaction2 = _interopRequireDefault(_transaction);
	
	var _transitions = _dereq_('./util/transitions');
	
	var _cache = _dereq_('./util/cache');
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Used to diff the outerHTML contents of the passed element with the markup
	 * contents. Very useful for applying a global diff on the
	 * `document.documentElement`.
	 *
	 * @example
	 *
	 *    import { outerHTML } from 'diffhtml'
	 *
	 *    // Remove all attributes and set the children to be a single text node
	 *    // containing the text 'Hello world',
	 *    outerHTML(document.body, '<body>Hello world</body>')
	 *
	 *
	 * @param {Object} element - A DOM Node to render into
	 * @param {String|Object} markup='' - A string of markup or virtual tree
	 * @param {Object =} options={} - An object containing configuration options
	 */
	function outerHTML(element) {
	  var markup = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  options.inner = false;
	  (0, _transaction2.default)(element, markup, options);
	}
	
	/**
	 * Used to diff the innerHTML contents of the passed element with the markup
	 * contents. This is useful with libraries like Backbone that render Views
	 * into element container.
	 *
	 * @example
	 *
	 *    import { innerHTML } from 'diffhtml'
	 *
	 *    // Sets the body children to be a single text node containing the text
	 *    // 'Hello world'.
	 *    innerHTML(document.body, 'Hello world')
	 *
	 *
	 * @param {Object} element - A DOM Node to render into
	 * @param {String|Object} markup='' - A string of markup or virtual tree
	 * @param {Object =} options={} - An object containing configuration options
	 */
	function innerHTML(element) {
	  var markup = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  options.inner = true;
	  (0, _transaction2.default)(element, markup, options);
	}
	
	/**
	 * Used to diff two elements. The `inner` Boolean property can be specified in
	 * the options to set innerHTML\outerHTML behavior. By default it is
	 * outerHTML.
	 *
	 * @example
	 *
	 *    // It is usually better to rename this method to something descriptive.
	 *    import { element as diffElement } from 'diffhtml'
	 *
	 *    // Create a new body tag.
	 *    const newBody = $(`<body>
	 *      <strong>Hello world!</strong>
	 *    </body>`).get();
	 *
	 *
	 *    diffElement(document.body, newBody);
	 *
	 *
	 * @param {Object} element - A DOM Node to render into
	 * @param {Object} newElement - A string of markup or virtual tree
	 * @param {Object =} options={} - An object containing configuration options
	 */
	function element(element, newElement) {
	  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  (0, _transaction2.default)(element, newElement, options);
	}
	
	/**
	 * Adds a global transition listener. With many elements this could be an
	 * expensive operation, so try to limit the amount of listeners added if you're
	 * concerned about performance.
	 *
	 * Since the callback triggers with various elements, most of which you
	 * probably don't care about, you'll want to filter. A good way of filtering
	 * is to use the DOM `matches` method. It's fairly well supported
	 * (http://caniuse.com/#feat=matchesselector) and may suit many projects. If
	 * you need backwards compatibility, consider using jQuery's `is`.
	 *
	 * @example
	 *
	 *    import { addTransitionState } from 'diffhtml'
	 *
	 *    // Fade in all elements as they are added to the DOM.
	 *    addTransitionState('attached', el => $(el).fadeIn().promise())
	 *
	 *    // Fade out all elements as they leave the DOM.
	 *    addTransitionState('detached', el => $(el).fadeOut().promise())
	 *
	 *
	 * @param state - String name that matches what's available in the
	 * documentation above.
	 * @param callback - Function to receive the matching elements.
	 */
	function addTransitionState(state, callback) {
	  if (!state) {
	    throw new Error('Missing transition state name');
	  }
	
	  if (!callback) {
	    throw new Error('Missing transition state callback');
	  }
	
	  // Not a valid state name.
	  if (Object.keys(_transitions.states).indexOf(state) === -1) {
	    throw new Error('Invalid state name: ' + state);
	  }
	
	  _transitions.states[state].push(callback);
	}
	
	/**
	 * Removes a global transition listener.
	 *
	 * When invoked with no arguments, this method will remove all transition
	 * callbacks. When invoked with the name argument it will remove all transition
	 * state callbacks matching the name, and so on for the callback.
	 *
	 * @example
	 *
	 *    import { removeTransitionState } from 'diffhtml'
	 *
	 *    // Remove all transition state handlers.
	 *    removeTransitionState()
	 *
	 *    // Remove all `attached` state handlers.
	 *    removeTransitionState('attached')
	 *
	 * @param {String =} state - Name that matches what's available in the
	 * documentation above
	 * @param {Function =} callback - Callback to receive the matching elements
	 */
	function removeTransitionState(state, callback) {
	  if (!callback && state) {
	    _transitions.states[state].length = 0;
	  } else if (state && callback) {
	    // Not a valid state name.
	    if (Object.keys(_transitions.states).indexOf(state) === -1) {
	      throw new Error('Invalid state name ' + state);
	    }
	
	    var index = _transitions.states[state].indexOf(callback);
	    _transitions.states[state].splice(index, 1);
	  } else {
	    for (var _state in _transitions.states) {
	      _transitions.states[_state].length = 0;
	    }
	  }
	}
	
	/**
	 * Registers middleware functions which are called during the render
	 * transaction flow. These should be very fast and ideally asynchronous to
	 * avoid blocking the render.
	 *
	 * @example
	 *
	 *    import { use } from 'diffhtml'
	 *    import logger from 'diffhtml-logger'
	 *
	 *    // Add the diffHTML logger middleware, to console out render information.
	 *    use(logger)
	 *
	 *
	 * @param {Function} middleware - A function that gets passed internals
	 * @return {Function} - When invoked removes and deactivates the middleware
	 */
	function use(middleware) {
	  if (typeof middleware !== 'function') {
	    throw new Error('Middleware must be a function');
	  }
	
	  // Add the function to the set of middlewares.
	  _cache.MiddlewareCache.add(middleware);
	
	  // The unsubscribe method for the middleware.
	  return function () {
	    // Remove this middleware from the internal cache. This will prevent it
	    // from being invoked in the future.
	    _cache.MiddlewareCache.delete(middleware);
	
	    // Call the unsubscribe method if defined in the middleware (allows them
	    // to cleanup).
	    middleware.unsubscribe && middleware.unsubscribe();
	  };
	}
	
	},{"./node/release":5,"./node/transaction":6,"./tree/helpers":7,"./util/cache":10,"./util/tagged-template":17,"./util/transitions":18}],2:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getFinalizeCallback;
	
	var _transaction = _dereq_('../node/transaction');
	
	var _transaction2 = _interopRequireDefault(_transaction);
	
	var _cache = _dereq_('../util/cache');
	
	var _memory = _dereq_('../util/memory');
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Pulls the next render object (containing the respective arguments to
	 * patchNode) and invokes the next transaction.
	 *
	 * @param state
	 */
	var renderNext = function renderNext(state) {
	  var nextRender = state.nextRender;
	  state.nextRender = undefined;
	
	  (0, _transaction2.default)(nextRender.node, nextRender.newHTML, nextRender.options);
	};
	
	/**
	 * Returns a callback that finalizes the transaction, setting the isRendering
	 * flag to false. This allows us to pick off and invoke the next available
	 * transaction to render. This code recyles the unprotected allocated pool
	 * objects and triggers a `renderComplete` event.
	 *
	 * @param {Object} node - A DOM Node that has just had patches applied
	 * @param {Object} state - The current state object associated with the Node
	 * @return {Function} - Closure that when called completes the transaction
	 */
	function getFinalizeCallback(node, state) {
	  /**
	   * When the render completes, clean up memory, and schedule the next render
	   * if necessary.
	   *
	   * @param {Array} remainingMiddleware - Array of middleware to invoke
	   */
	  return function finalizeTransaction() {
	    var remainingMiddleware = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    var isInner = state.options.inner;
	
	    state.previousMarkup = isInner ? node.innerHTML : node.outerHTML;
	    state.previousText = node.textContent;
	
	    state.isRendering = false;
	
	    // This is designed to handle use cases where renders are being hammered
	    // or when transitions are used with Promises. If this element has a next
	    // render state, trigger it first as priority.
	    if (state.nextRender) {
	      renderNext(state);
	    }
	    // Otherwise dig into the other states and pick off the first one
	    // available.
	    else {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = _cache.StateCache.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _state = _step.value;
	
	            if (_state.nextRender) {
	              renderNext(_state);
	              break;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	
	    // Clean out all the existing allocations.
	    (0, _memory.cleanMemory)();
	
	    // Call the remaining middleware signaling the render is complete.
	    for (var i = 0; i < remainingMiddleware.length; i++) {
	      remainingMiddleware[i]();
	    }
	  };
	}
	
	},{"../node/transaction":6,"../util/cache":10,"../util/memory":13}],3:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = make;
	
	var _cache = _dereq_('../util/cache');
	
	var _svg = _dereq_('../util/svg');
	
	var svg = _interopRequireWildcard(_svg);
	
	var _entities = _dereq_('../util/entities');
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * Gets a specific type of DOM Node depending on the passed in nodeName.
	 *
	 * @param nodeName {String} - The nodeName to disambiguate the type
	 * @param nodeValue {String} - The nodeValue to set if a Text Node
	 * @return {Object} - A DOM Node matching the nodeName
	 */
	var createNodeFromName = function createNodeFromName(_ref) {
	  var nodeName = _ref.nodeName;
	  var nodeValue = _ref.nodeValue;
	
	  // If we're dealing with a Text Node, we need to use the special DOM method,
	  // since createElement does not understand the nodeName '#text'.
	  // All other nodes can be created through createElement.
	  if (nodeName === '#text') {
	    return document.createTextNode(nodeValue);
	  }
	  // If the nodeName matches any of the known SVG element names, mark it as
	  // SVG. The reason for doing this over detecting if nested in an <svg>
	  // element, is that we do not currently have circular dependencies in the
	  // VTree, by avoiding parentNode, so there is no way to crawl up the parents.
	  else if (svg.elements.indexOf(nodeName) > -1) {
	      return document.createElementNS(svg.namespace, nodeName);
	    }
	    // If not a Text or SVG Node, then create with the standard method.
	    else {
	        return document.createElement(nodeName);
	      }
	};
	
	/**
	 * Takes in a Virtual Tree Element (VTree) and creates a DOM Node from it.
	 * Sets the node into the Node cache. If this VTree already has an
	 * associated node, it will reuse that.
	 *
	 * @param {Object} - A Virtual Tree Element or VTree-like element
	 * @return {Object} - A DOM Node matching the vTree
	 */
	function make(vTree) {
	  // If no Virtual Tree Element was specified, return null.
	  if (!vTree) {
	    return null;
	  }
	
	  // If the DOM Node was already created, reuse the existing node.
	  if (_cache.NodeCache.has(vTree)) {
	    return _cache.NodeCache.get(vTree);
	  }
	
	  var node = createNodeFromName(vTree);
	
	  // Copy all the attributes from the vTree into the newly created DOM
	  // Node.
	  for (var i = 0; i < (vTree.attributes || []).length; i++) {
	    var attr = vTree.attributes[i];
	    var isObject = _typeof(attr.value) === 'object';
	    var isFunction = typeof attr.value === 'function';
	
	    // If not a dynamic type, set as an attribute, since it's a valid
	    // attribute value.
	    if (attr.name && !isObject && !isFunction) {
	      node.setAttribute(attr.name, (0, _entities.decodeEntities)(attr.value));
	    } else if (attr.name && typeof attr.value !== 'string') {
	      // Necessary to track the attribute/prop existence.
	      node.setAttribute(attr.name, '');
	
	      // Since this is a dynamic value it gets set as a property.
	      node[attr.name] = attr.value;
	    }
	  }
	
	  // Append all the children into the node, making sure to run them
	  // through this `make` function as well.
	  for (var _i = 0; _i < (vTree.childNodes || []).length; _i++) {
	    node.appendChild(make(vTree.childNodes[_i]));
	  }
	
	  // Add to the nodes cache.
	  _cache.NodeCache.set(vTree, node);
	
	  return node;
	}
	
	},{"../util/cache":10,"../util/entities":11,"../util/svg":16}],4:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = patchNode;
	
	var _make = _dereq_('./make');
	
	var _make2 = _interopRequireDefault(_make);
	
	var _transitions = _dereq_('../util/transitions');
	
	var _parser = _dereq_('../util/parser');
	
	var _cache = _dereq_('../util/cache');
	
	var _pools = _dereq_('../util/pools');
	
	var _memory = _dereq_('../util/memory');
	
	var _entities = _dereq_('../util/entities');
	
	var _sync = _dereq_('../tree/sync');
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isElementNode = function isElementNode(node) {
	  return node.nodeType === 1;
	};
	var filter = Array.prototype.filter;
	
	/**
	 * Looks to see if an element can be replaced. It must have a parentNode to do
	 * so. This will trigger an error when the element does not have a parentNode.
	 * This typically happens when trying to replace a disconnected DOM Node or the
	 * documentElement.
	 *
	 * @param {String} verb - Verb to replace in the template string
	 * @param {Object} oldNode - Old DOM Node to check if able to be replaced
	 * @param {Object} patch - Used to clean up vTree references
	 */
	var checkForMissingParent = function checkForMissingParent(verb, oldNode, patch) {
	  if (!oldNode.parentNode) {
	    // Clean up these elements to keep memory consistent.
	    (0, _memory.unprotectElement)(patch.old);
	    (0, _memory.unprotectElement)(patch.new);
	
	    // Throw an error to stop rendering/inform the developer.
	    throw new Error(('\n      Can\'t ' + verb + ' without parent, is this the document root?\n    ').trim());
	  }
	};
	
	// Trigger the attached transition state for this element and all childNodes.
	var attach = function attach(_ref) {
	  var vTree = _ref.vTree;
	  var fragment = _ref.fragment;
	  var parentNode = _ref.parentNode;
	  var triggerTransition = _ref.triggerTransition;
	  var state = _ref.state;
	
	  // This element has been attached, so it should definitely be marked as
	  // protected.
	  (0, _memory.protectElement)(vTree);
	
	  // Create a DOM Node for this Virtual Tree element.
	  var node = (0, _make2.default)(vTree);
	
	  // If the element added was a DOM text node or SVG text element, trigger
	  // the textChanged transition.
	  if (vTree.nodeName === '#text') {
	    var promises = (0, _transitions.makePromises)('textChanged', [node], null, vTree.nodeValue);
	
	    node.nodeValue = (0, _entities.decodeEntities)(vTree.nodeValue);
	
	    if (parentNode) {
	      var nodeName = parentNode.nodeName.toLowerCase();
	
	      if (_parser.blockText.has(nodeName)) {
	        parentNode.nodeValue = (0, _entities.decodeEntities)(vTree.nodeValue);
	      }
	    }
	
	    triggerTransition('textChanged', promises);
	  }
	
	  vTree.attributes.forEach(function (attr) {
	    triggerTransition('attributeChanged', (0, _transitions.makePromises)('attributeChanged', [node], attr.name, null, attr.value));
	  });
	
	  // Call all `childNodes` attached callbacks as well.
	  vTree.childNodes.forEach(function (vTree) {
	    return attach({
	      vTree: vTree, parentNode: node, triggerTransition: triggerTransition, state: state
	    });
	  });
	
	  // If a Document Fragment was specified, append the DOM Node into it.
	  if (fragment) {
	    fragment.appendChild(node);
	  }
	
	  return node;
	};
	
	/**
	 * Processes a set of patches onto a tracked DOM Node.
	 *
	 * @param {Object} node - DOM Node to process patchs on
	 * @param {Array} patches - Contains patch objects
	 */
	function patchNode(node, patches) {
	  var state = _cache.StateCache.get(node);
	  var promises = [];
	  var triggerTransition = (0, _transitions.buildTrigger)(promises);
	
	  // Loop through all the patches and apply them.
	
	  var _loop = function _loop(i) {
	    var patch = patches[i];
	    var el = (0, _make2.default)(patch.element);
	    var oldEl = (0, _make2.default)(patch.old);
	    var newEl = (0, _make2.default)(patch.new);
	
	    // Empty the Node's contents. This is an optimization, since `innerHTML`
	    // will be faster than iterating over every element and manually removing.
	    if (patch.__do__ === _sync.REMOVE_ELEMENT_CHILDREN) {
	      var childNodes = filter.call(el.childNodes, isElementNode);
	      var detachPromises = (0, _transitions.makePromises)('detached', childNodes);
	
	      triggerTransition('detached', detachPromises, function (promises) {
	        var callback = function callback() {
	          (0, _memory.unprotectElement)(patch.toRemove);
	          el.innerHTML = '';
	        };
	
	        if (promises && promises.length) {
	          Promise.all(promises).then(callback);
	        } else {
	          callback();
	        }
	      });
	    }
	
	    // Remove the entire Node. Only does something if the Node has a parent
	    // element.
	    else if (patch.__do__ === _sync.REMOVE_ENTIRE_ELEMENT) {
	        var _childNodes = [el].filter(isElementNode);
	        var _detachPromises = (0, _transitions.makePromises)('detached', _childNodes);
	
	        if (el.parentNode) {
	          triggerTransition('detached', _detachPromises, function (promises) {
	            var callback = function callback() {
	              el.parentNode.removeChild(el);
	              (0, _memory.unprotectElement)(patch.toRemove);
	            };
	
	            if (promises && promises.length) {
	              Promise.all(promises).then(callback);
	            } else {
	              callback();
	            }
	          });
	        } else {
	          (0, _memory.unprotectElement)(patch.toRemove);
	        }
	      }
	
	      // Replace the entire Node.
	      else if (patch.__do__ === _sync.REPLACE_ENTIRE_ELEMENT) {
	          (function () {
	            var allPromises = [];
	
	            var attachedPromises = (0, _transitions.makePromises)('attached', [newEl].filter(isElementNode));
	
	            var detachedPromises = (0, _transitions.makePromises)('detached', [oldEl].filter(isElementNode));
	
	            var replacedPromises = (0, _transitions.makePromises)('replaced', [oldEl], newEl);
	
	            // Add all the transition state promises into the main array, we'll use
	            // them all to decide when to alter the DOM.
	            triggerTransition('detached', detachedPromises, function (promises) {
	              allPromises.push.apply(allPromises, promises);
	            });
	
	            triggerTransition('attached', attachedPromises, function (promises) {
	              allPromises.push.apply(allPromises, promises);
	              attach({ vTree: patch.new, triggerTransition: triggerTransition, state: state });
	            });
	
	            triggerTransition('replaced', replacedPromises, function (promises) {
	              allPromises.push.apply(allPromises, promises);
	            });
	
	            (0, _memory.unprotectElement)(patch.old);
	
	            // Reset the tree cache. TODO Look into this...
	            _cache.StateCache.set(newEl, {
	              oldTree: patch.new,
	              element: newEl
	            });
	
	            // Once all the promises have completed, invoke the action, if no
	            // promises were added, this will be a synchronous operation.
	            if (allPromises.length) {
	              Promise.all(allPromises).then(function replaceEntireElement() {
	                checkForMissingParent(oldEl, patch);
	                oldEl.parentNode.replaceChild(newEl, oldEl);
	              }, function (ex) {
	                return console.log(ex);
	              });
	            } else {
	              if (!oldEl.parentNode) {
	                (0, _memory.unprotectElement)(patch.new);
	
	                if (_cache.StateCache.has(newEl)) {
	                  _cache.StateCache.delete(newEl);
	                }
	
	                throw new Error(replaceFailMsg);
	              }
	
	              oldEl.parentNode.replaceChild(newEl, oldEl);
	            }
	          })();
	        }
	
	        // Node manip.
	        else if (patch.__do__ === _sync.MODIFY_ELEMENT) {
	            // Add.
	            if (el && patch.fragment && !oldEl) {
	              (function () {
	                var fragment = document.createDocumentFragment();
	
	                // Loop over every element to be added and process the Virtual Tree
	                // element into the DOM Node and append into the DOM fragment.
	                var toAttach = patch.fragment.map(function (vTree) {
	                  return attach({
	                    vTree: vTree, fragment: fragment, triggerTransition: triggerTransition, state: state
	                  });
	                }).filter(isElementNode);
	
	                // Turn elements into childNodes of the patch element.
	                el.appendChild(fragment);
	
	                // Trigger transitions.
	                var makeAttached = (0, _transitions.makePromises)('attached', toAttach);
	                triggerTransition('attached', makeAttached);
	              })();
	            }
	
	            // Remove.
	            else if (oldEl && !newEl) {
	                // Ensure we can remove the old DOM Node.
	                checkForMissingParent('remove', oldEl, patch);
	
	                var makeDetached = (0, _transitions.makePromises)('detached', [oldEl]);
	
	                triggerTransition('detached', makeDetached, function (promises) {
	                  var callback = function callback() {
	                    if (oldEl.parentNode) {
	                      oldEl.parentNode.removeChild(oldEl);
	                    }
	
	                    // And then empty out the entire contents.
	                    oldEl.innerHTML = '';
	
	                    (0, _memory.unprotectElement)(patch.old);
	                  };
	
	                  if (promises && promises.length) {
	                    Promise.all(promises).then(callback);
	                  } else {
	                    callback();
	                  }
	                });
	              }
	
	              // Replace.
	              else if (oldEl && newEl) {
	                  (function () {
	                    // Ensure we can replace the old DOM Node.
	                    checkForMissingParent('replace', oldEl, patch);
	
	                    // Append the element first, before doing the replacement.
	                    if (oldEl.nextSibling) {
	                      oldEl.parentNode.insertBefore(newEl, oldEl.nextSibling);
	                    } else {
	                      oldEl.parentNode.appendChild(newEl);
	                    }
	
	                    // Removed state for transitions API.
	                    var allPromises = [];
	
	                    var attachPromises = (0, _transitions.makePromises)('attached', [newEl].filter(isElementNode));
	
	                    var detachPromises = (0, _transitions.makePromises)('detached', [oldEl].filter(isElementNode));
	
	                    var replacePromises = (0, _transitions.makePromises)('replaced', [oldEl], newEl);
	
	                    triggerTransition('replaced', replacePromises, function (promises) {
	                      if (promises && promises.length) {
	                        allPromises.push.apply(allPromises, promises);
	                      }
	                    });
	
	                    triggerTransition('detached', detachPromises, function (promises) {
	                      if (promises && promises.length) {
	                        allPromises.push.apply(allPromises, promises);
	                      }
	                    });
	
	                    triggerTransition('attached', attachPromises, function (promises) {
	                      if (promises && promises.filter(Boolean).length) {
	                        allPromises.push.apply(allPromises, promises);
	                      }
	
	                      attach({ vTree: patch.new, triggerTransition: triggerTransition, state: state });
	                    });
	
	                    // Once all the promises have completed, invoke the action, if no
	                    // promises were added, this will be a synchronous operation.
	                    if (allPromises.length) {
	                      Promise.all(allPromises).then(function replaceElement() {
	                        if (oldEl.parentNode) {
	                          oldEl.parentNode.replaceChild(newEl, oldEl);
	                        }
	
	                        (0, _memory.unprotectElement)(patch.old);
	
	                        (0, _memory.protectElement)(patch.new);
	                      }, function (ex) {
	                        return console.log(ex);
	                      });
	                    } else {
	                      checkForMissingParent('replace', oldEl, patch);
	
	                      oldEl.parentNode.replaceChild(newEl, oldEl);
	                      (0, _memory.unprotectElement)(patch.old);
	                      (0, _memory.protectElement)(patch.new);
	                    }
	                  })();
	                }
	          }
	
	          // Attribute manipulation.
	          else if (patch.__do__ === _sync.MODIFY_ATTRIBUTE) {
	              var attributes = patch.attributes;
	
	              attributes.forEach(function (_ref2) {
	                var oldAttr = _ref2.oldAttr;
	                var newAttr = _ref2.newAttr;
	
	                var name = newAttr ? newAttr.name : oldAttr.name;
	                var value = (oldAttr ? oldAttr.value : undefined) || null;
	
	                var attrChangePromises = (0, _transitions.makePromises)('attributeChanged', [el], name, value, newAttr ? newAttr.value : null);
	
	                triggerTransition('attributeChanged', attrChangePromises, function (promises) {
	                  var callback = function callback() {
	                    // Always remove the old attribute, we never re-use it.
	                    if (oldAttr) {
	                      _pools.pools.attributeObject.unprotect(oldAttr);
	
	                      // Remove the Virtual Tree Attribute from the element and memory.
	                      if (!newAttr) {
	                        el.removeAttribute(oldAttr.name);
	
	                        if (oldAttr.name in el) {
	                          el[oldAttr.name] = undefined;
	                        }
	                      }
	                    }
	
	                    // Add/Change the attribute or property.
	                    if (newAttr) {
	                      var isObject = _typeof(newAttr.value) === 'object';
	                      var isFunction = typeof newAttr.value === 'function';
	
	                      // Protect the Virtual Attribute object.
	                      _pools.pools.attributeObject.protect(newAttr);
	
	                      // If not a dynamic type, set as an attribute, since it's a valid
	                      // attribute value.
	                      if (!isObject && !isFunction) {
	                        if (newAttr.name) {
	                          el.setAttribute(newAttr.name, (0, _entities.decodeEntities)(newAttr.value));
	                        }
	                      } else if (typeof newAttr.value !== 'string') {
	                        // Necessary to track the attribute/prop existence.
	                        el.setAttribute(newAttr.name, '');
	
	                        // Since this is a dynamic value it gets set as a property.
	                        el[newAttr.name] = newAttr.value;
	                      }
	
	                      // Support live updating of the value attribute.
	                      if (newAttr.name === 'value' || newAttr.name === 'checked') {
	                        el[newAttr.name] = newAttr.value;
	                      }
	                    }
	                  };
	
	                  if (promises && promises.length) {
	                    Promise.all(promises).then(callback, function unhandledException() {});
	                  } else {
	                    callback();
	                  }
	                });
	              });
	            }
	
	            // Text node manipulation.
	            else if (patch.__do__ === _sync.CHANGE_TEXT) {
	                var textChangePromises = (0, _transitions.makePromises)('textChanged', [el], el.nodeValue, patch.value);
	
	                triggerTransition('textChanged', textChangePromises, function (promises) {
	                  var callback = function callback() {
	                    patch.element.nodeValue = (0, _entities.decodeEntities)(patch.value);
	                    el.nodeValue = patch.element.nodeValue;
	
	                    if (el.parentNode) {
	                      var nodeName = el.parentNode.nodeName.toLowerCase();
	
	                      if (_parser.blockText.has(nodeName)) {
	                        el.parentNode.nodeValue = (0, _entities.decodeEntities)(patch.element.nodeValue);
	                      }
	                    }
	                  };
	
	                  if (promises && promises.length) {
	                    Promise.all(promises).then(callback);
	                  } else {
	                    callback();
	                  }
	                });
	              }
	  };
	
	  for (var i = 0; i < patches.length; i++) {
	    _loop(i);
	  }
	
	  // Return the Promises that were allocated so that rendering can be blocked
	  // until they resolve.
	  return promises.filter(Boolean);
	}
	
	},{"../tree/sync":9,"../util/cache":10,"../util/entities":11,"../util/memory":13,"../util/parser":14,"../util/pools":15,"../util/transitions":18,"./make":3}],5:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = releaseNode;
	
	var _cache = _dereq_('../util/cache');
	
	var _memory = _dereq_('../util/memory');
	
	/**
	 * Releases state and recycles internal memory.
	 *
	 * @param node {Object} - A DOM Node to lookup state from
	 */
	function releaseNode(node) {
	  // Try and find a state object for this DOM Node.
	  var state = _cache.StateCache.get(node);
	
	  // If there is a Virtual Tree element, recycle all objects allocated for it.
	  if (state && state.oldTree) {
	    (0, _memory.unprotectElement)(state.oldTree);
	  }
	
	  // Remove the Node's state object from the cache.
	  _cache.StateCache.delete(node);
	
	  // Recycle all unprotected objects.
	  (0, _memory.cleanMemory)();
	}
	
	},{"../util/cache":10,"../util/memory":13}],6:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = createTransaction;
	
	var _patch = _dereq_('./patch');
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _finalize = _dereq_('./finalize');
	
	var _finalize2 = _interopRequireDefault(_finalize);
	
	var _make = _dereq_('../tree/make');
	
	var _make2 = _interopRequireDefault(_make);
	
	var _sync = _dereq_('../tree/sync');
	
	var _sync2 = _interopRequireDefault(_sync);
	
	var _helpers = _dereq_('../tree/helpers');
	
	var _memory = _dereq_('../util/memory');
	
	var _parser = _dereq_('../util/parser');
	
	var _pools = _dereq_('../util/pools');
	
	var _cache = _dereq_('../util/cache');
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * If diffHTML is rendering anywhere asynchronously, we need to wait until it
	 * completes before this render can be executed. This sets up the next buffer,
	 * if necessary, which serves as a Boolean determination later to `bufferSet`.
	 *
	 * @param {Object} state - The current DOM Node state within diffHTML
	 * @param {Object} nextRender - The respective arguments to set buffer
	 * @return {Boolean} - Whether or not diffHTML is currently rendering
	 */
	var setBufferState = function setBufferState(state, nextRender) {
	  // Look up all existing states for any rendering, and set the next render
	  // buffer if blocked.
	  _cache.StateCache.forEach(function (_state) {
	    // If we attach a nextRender, then the buffer has been set.
	    if (_state.isRendering) {
	      state.nextRender = nextRender;
	    }
	  });
	
	  // Let outside code know if we were blocked.
	  return Boolean(state.nextRender);
	};
	
	/**
	 * Gets a Virtual Tree Element from the newHTML passed to a diff method.
	 *
	 * @param {String|Object} newHTML - HTML/DOM Node/Virtual Tree Element
	 * @return {Object} - Virtual Tree Element
	 */
	var getTreeFromNewHTML = function getTreeFromNewHTML(newHTML, options, callback) {
	  // This is HTML Markup, so we need to parse it.
	  if (typeof newHTML === 'string') {
	    var silenceWarnings = options.silenceWarnings;
	    var childNodes = (0, _parser.parse)(newHTML, null, { silenceWarnings: silenceWarnings }).childNodes;
	
	    // If we are dealing with innerHTML, use all the Nodes. If we're dealing
	    // with outerHTML, we can only support diffing against a single element,
	    // so pick the first one.
	    return callback(childNodes);
	  }
	  // This is a DOM Node, so we need to convert to a vTree.
	  else if (newHTML.ownerDocument) {
	      var newTree = (0, _make2.default)(newHTML);
	
	      if (newTree.nodeType === 11) {
	        _pools.pools.elementObject.unprotect(newTree);
	        return callback(newTree.childNodes);
	      }
	
	      return callback(newTree);
	    }
	
	  // This is a Virtual Tree Element, or something like it, so we can just pass
	  // it along.
	  return callback(newHTML);
	};
	
	/**
	 * Creates a sequential render transaction on a DOM Node. This requires
	 * checking for a previous render first. Since diffHTML is globally connected
	 * (hopefully only running one copy...), this will prevent transitions from
	 * interferring.
	 *
	 * @param node
	 * @param newHTML
	 * @param options
	 */
	function createTransaction(node, newHTML, options) {
	  if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
	    throw new Error('Missing DOM Node object');
	  }
	
	  // Used to associate state with the currently rendering node. This
	  // prevents attaching properties to the instance itself.
	  var state = _cache.StateCache.get(node) || {};
	  var isInner = options.inner;
	  var previousMarkup = state.previousMarkup;
	  var previousText = state.previousText;
	  var bufferSet = setBufferState(state, { node: node, newHTML: newHTML, options: options });
	
	  // Associate the current render options with the DOM Node state.
	  state.options = options;
	
	  // Always ensure the most up-to-date state object is stored.
	  _cache.StateCache.set(node, state);
	
	  // Short circuit the rest of this render if we ended up having to set a
	  // buffer. This happens when some other code using diffHTML is rendering
	  // asynchronously (using transitions w/ Promise).
	  if (bufferSet) {
	    return;
	  }
	
	  // This looks for changes in the DOM from what we'd expect. This means we
	  // need to rebuild the old Virtual Tree. This allows for keeping our tree in
	  // sync with unexpected DOM changes. It's not very performant, so ideally you
	  // should never change markup that diffHTML affects from outside of diffHTML
	  // if performance is a concern.
	  var sameInnerHTML = isInner ? previousMarkup === node.innerHTML : true;
	  var sameOuterHTML = !isInner ? previousMarkup === node.outerHTML : true;
	  var sameTextContent = previousText === node.textContent;
	
	  // If the contents haven't changed, abort, since there is no point in
	  // continuing. Only support this if the new markup is a string, otherwise
	  // it's possible for our object recycling to match twice.
	  if (typeof newHTML === 'string' && state.newHTML === newHTML) {
	    return;
	  }
	  // Associate the last markup rendered with this node.
	  else if (typeof newHTML === 'string') {
	      state.newHTML = newHTML;
	    }
	
	  // We rebuild the tree whenever the DOM Node changes, including the first
	  // time we patch a DOM Node.
	  var rebuildTree = function rebuildTree() {
	    var oldTree = state.oldTree;
	
	    if (oldTree) {
	      (0, _memory.unprotectElement)(oldTree);
	    }
	
	    state.oldTree = (0, _memory.protectElement)((0, _make2.default)(node));
	  };
	
	  if (!sameInnerHTML || !sameOuterHTML || !sameTextContent) {
	    rebuildTree();
	  }
	
	  // We're rendering in the UI thread.
	  state.isRendering = true;
	
	  // Store all transaction starting middleware functions being executed here.
	  var startTransactionMiddlewares = [];
	
	  // Start off the middleware execution.
	  _cache.MiddlewareCache.forEach(function (executeMiddleware) {
	    // Pass the start transaction call with the input arguments.
	    var result = executeMiddleware({ node: node, newHTML: newHTML, options: options });
	
	    if (result) {
	      startTransactionMiddlewares.push(result);
	    }
	  });
	
	  // Alias the `oldTree` off of state for parity.
	  var oldTree = state.oldTree;
	
	  // We need to ensure that our target to diff is a Virtual Tree Element. This
	  // function takes in whatever `newHTML` is and normalizes to a tree object.
	  // The callback function runs on every normalized Node to wrap childNodes
	  // in the case of setting innerHTML.
	  var newTree = getTreeFromNewHTML(newHTML, options, function (newTree) {
	    if (isInner) {
	      _pools.pools.elementObject.unprotect(newTree);
	
	      var nodeName = state.oldTree.nodeName;
	      var attributes = state.oldTree.attributes;
	
	      return (0, _helpers.createElement)(nodeName, attributes, newTree);
	    }
	
	    return Array.isArray(newTree) ? newTree[0] : newTree;
	  });
	
	  // Trigger any middleware with the DOM Node, old Virtual Tree Element, and
	  // new Virtual Tree Element. This allows the middleware to mutate and inspect
	  // the trees before they get consumed by diffHTML.
	  var prePatchMiddlewares = [];
	
	  // By exposing the internal tree synchronization and DOM Node patch methods,
	  // a middleware could implement sync/patch on a separate thread.
	  var transactionMethods = {
	    syncTree: _sync2.default,
	    patchNode: _patch2.default,
	    protectElement: _memory.protectElement,
	    unprotectElement: _memory.unprotectElement
	  };
	
	  // Save the current transaction tree state and allow the mdidleware to
	  // override the trees.
	  var transactionState = {
	    oldTree: oldTree,
	    newTree: newTree,
	    transactionMethods: transactionMethods
	  };
	
	  // Run each middleware and pass the transaction state which contains internal
	  // functions otherwise not available by the public API.
	  for (var i = 0; i < startTransactionMiddlewares.length; i++) {
	    // Pass the the existing Virtual Tree Element, and the new Virtual Tree
	    // Element. This is triggered before the synchronization and patching has
	    // occured.
	    var result = startTransactionMiddlewares[i](transactionState);
	
	    if (result) {
	      prePatchMiddlewares.push(result);
	    }
	  }
	
	  // Synchronize the trees, use any middleware replacements, if supplied.
	  var patches = (0, _sync2.default)(transactionState.oldTree, transactionState.newTree);
	
	  // Apply the set of patches to the Node.
	  var promises = (0, _patch2.default)(node, patches);
	
	  // Trigger any middleware after syncing and patching the element. This is
	  // mainly useful to get the Promises for something like devtools and patches
	  // for something like logging.
	  var postPatchMiddlewares = [];
	
	  for (var _i = 0; _i < prePatchMiddlewares.length; _i++) {
	    // The DOM Node patching has finished and now we're sending the patchset
	    // and the promises which can also be pushed into to do some asynchronous
	    // behavior in a middleware.
	    var _result = prePatchMiddlewares[_i]({
	      patches: patches,
	      promises: promises
	    });
	
	    if (_result) {
	      postPatchMiddlewares.push(_result);
	    }
	  }
	
	  // Clean up and finalize this transaction. If there is another transaction,
	  // get a callback to run once this completes to run it.
	  var finalizeTransaction = (0, _finalize2.default)(node, state);
	
	  // Operate synchronously unless opted into a Promise-chain. Doesn't matter if
	  // they are actually Promises or not, since they will all resolve eventually
	  // with `Promise.all`.
	  if (promises.length) {
	    Promise.all(promises).then(function () {
	      finalizeTransaction(postPatchMiddlewares);
	    }, function (ex) {
	      return console.log(ex);
	    });
	  } else {
	    // Pass off the remaining middleware to allow users to dive into the
	    // transaction completed lifecycle event.
	    finalizeTransaction(postPatchMiddlewares);
	  }
	}
	
	},{"../tree/helpers":7,"../tree/make":8,"../tree/sync":9,"../util/cache":10,"../util/memory":13,"../util/parser":14,"../util/pools":15,"./finalize":2,"./patch":4}],7:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.createElement = createElement;
	exports.createAttribute = createAttribute;
	
	var _pools = _dereq_('../util/pools');
	
	var _escape = _dereq_('../util/escape');
	
	var _escape2 = _interopRequireDefault(_escape);
	
	var _make = _dereq_('../tree/make');
	
	var _make2 = _interopRequireDefault(_make);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * TODO Phase this out if possible, super slow iterations...
	 *
	 * @param childNodes
	 * @return
	 */
	var normalizeChildNodes = function normalizeChildNodes(_childNodes) {
	  var newChildNodes = [];
	  var childNodes = Array.isArray(_childNodes) ? _childNodes : [_childNodes];
	
	  childNodes.forEach(function (childNode) {
	    if ((typeof childNode === 'undefined' ? 'undefined' : _typeof(childNode)) !== 'object') {
	      newChildNodes.push(createElement('#text', null, String(childNode)));
	    } else if ('length' in childNode) {
	      for (var i = 0; i < childNode.length; i++) {
	        var newChild = childNode[i];
	        var newNode = newChild.ownerDocument ? (0, _make2.default)(newChild) : newChild;
	
	        newChildNodes.push(newNode);
	      }
	    } else {
	      var node = childNode.ownerDocument ? (0, _make2.default)(childNode) : childNode;
	      newChildNodes.push(node);
	    }
	  });
	
	  return newChildNodes;
	};
	
	/**
	 * Creates a virtual element used in or as a virtual tree.
	 *
	 * @param nodeName
	 * @param attributes
	 * @param childNodes
	 * @return {Object} element
	 */
	function createElement(nodeName, attributes, childNodes) {
	  if (nodeName === '') {
	    return normalizeChildNodes(childNodes);
	  }
	
	  if (typeof nodeName === 'function') {
	    var props = attributes;
	    props.children = childNodes;
	    return new nodeName(props).render(props);
	  } else if ((typeof nodeName === 'undefined' ? 'undefined' : _typeof(nodeName)) === 'object') {
	    var _props = attributes;
	    _props.children = childNodes;
	    return nodeName.render(_props);
	  }
	
	  var entry = _pools.pools.elementObject.get();
	  var isTextNode = nodeName === 'text' || nodeName === '#text';
	
	  entry.key = '';
	  entry.nodeName = nodeName.toLowerCase();
	  entry.rawNodeName = nodeName;
	
	  if (!isTextNode) {
	    entry.nodeType = 1;
	    entry.nodeValue = '';
	    entry.attributes = attributes || [];
	    entry.childNodes = normalizeChildNodes(childNodes);
	
	    // Set the key prop if passed as an attr.
	    entry.attributes.some(function (attr) {
	      if (attr.name === 'key') {
	        entry.key = attr.value;
	        return true;
	      }
	    });
	  } else {
	    var value = Array.isArray(childNodes) ? childNodes.join('') : childNodes;
	
	    entry.nodeType = nodeName === '#document-fragment' ? 11 : 3;
	    entry.nodeValue = (0, _escape2.default)(String(value));
	    entry.attributes.length = 0;
	    entry.childNodes.length = 0;
	  }
	
	  return entry;
	}
	
	/**
	 * Creates a virtual attribute used in a virtual element.
	 *
	 * @param name
	 * @param value
	 * @return {Object} attribute
	 */
	function createAttribute(name, value) {
	  var entry = _pools.pools.attributeObject.get();
	
	  entry.name = name;
	  entry.value = value;
	
	  return entry;
	}
	
	},{"../tree/make":8,"../util/escape":12,"../util/pools":15}],8:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = makeNode;
	
	var _helpers = _dereq_('./helpers');
	
	var _pools = _dereq_('../util/pools');
	
	var _cache = _dereq_('../util/cache');
	
	/**
	 * Converts a DOM Node into a Virtual Tree Element.
	 *
	 * @param {Object} node - A DOM Node
	 * @return {Object} - A Virtual Tree Element
	 */
	function makeNode(node) {
	  // These are the only DOM Node properties we care about.
	  var nodeName = node.nodeName.toLowerCase();
	  var nodeType = node.nodeType;
	  var nodeValue = node.nodeValue;
	  var attributes = node.attributes || [];
	  var childNodes = node.childNodes || [];
	
	  // We ignore any DOM Node that isn't an: Element, Text, Document Fragment, or
	  // Shadow Root.
	  if (nodeType !== 1 && nodeType !== 3 && nodeType !== 11) {
	    return false;
	  }
	
	  // We can consider either of these DOM Nodes as Text Nodes.
	  var isTextNode = nodeName === '#text' || nodeName === 'text';
	
	  // In the case of Text Node's we can have the createElement function set
	  // the nodeValue for us.
	  var initialValue = isTextNode ? nodeValue : [];
	
	  // Creates a Virtual Tree Element based off this nodeName. We aren't going
	  // to set the attributes right away since we want to set the key on the vTree
	  // and push directly into the pre-existing array.
	  var vTree = (0, _helpers.createElement)(node.nodeName, [], initialValue);
	
	  // Creates Virtual Tree Attributes for each attribute in the DOM Node.
	  for (var i = 0; i < attributes.length; i++) {
	    var attr = (0, _helpers.createAttribute)(attributes[i].name, attributes[i].value);
	
	    // If the `key` attribute is found, set the respective value on the vTree.
	    if (attr.name === 'key') {
	      vTree.key = attr.value;
	    }
	
	    vTree.attributes.push(attr);
	  }
	
	  // Associate this newly allocated vTree with this DOM Node.
	  _cache.NodeCache.set(vTree, node);
	
	  // If the element has child nodes, convert them all to virtual nodes.
	  for (var _i = 0; _i < childNodes.length; _i++) {
	    var newNode = makeNode(childNodes[_i]);
	
	    // We may get a falsy value back if we pass in a Comment Node or other
	    // DOM Nodes that we intentionally ignore.
	    if (newNode) {
	      vTree.childNodes.push(newNode);
	    }
	  }
	
	  // Prune out whitespace/everything from between tags nested under the HTML
	  // tag, since this behavior can be observed in browsers and specification.
	  if (vTree.nodeName === 'html') {
	    vTree.childNodes = vTree.childNodes.filter(function (childNode) {
	      return childNode.nodeName === 'head' || childNode.nodeName === 'body';
	    });
	  }
	
	  return vTree;
	}
	
	},{"../util/cache":10,"../util/pools":15,"./helpers":7}],9:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sync;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var slice = Array.prototype.slice;
	var filter = Array.prototype.filter;
	
	// Patch actions.
	var REMOVE_ELEMENT_CHILDREN = exports.REMOVE_ELEMENT_CHILDREN = -2;
	var REMOVE_ENTIRE_ELEMENT = exports.REMOVE_ENTIRE_ELEMENT = -1;
	var REPLACE_ENTIRE_ELEMENT = exports.REPLACE_ENTIRE_ELEMENT = 0;
	var MODIFY_ELEMENT = exports.MODIFY_ELEMENT = 1;
	var MODIFY_ATTRIBUTE = exports.MODIFY_ATTRIBUTE = 2;
	var CHANGE_TEXT = exports.CHANGE_TEXT = 3;
	
	/**
	 * Synchronizes changes from the newTree into the oldTree.
	 *
	 * @param oldTree
	 * @param newTree
	 * @param patches - optional
	 */
	function sync(oldTree, newTree, patches) {
	  patches = patches || [];
	
	  if (!Array.isArray(patches)) {
	    throw new Error('Missing Array to sync patches into');
	  }
	
	  if (!oldTree) {
	    throw new Error('Missing existing tree to sync');
	  }
	
	  var oldNodeValue = oldTree.nodeValue;
	  var oldChildNodes = oldTree.childNodes;
	  var oldIsTextNode = oldTree.nodeName === '#text';
	
	  // TODO Make this static...
	  var oldChildNodesLength = oldChildNodes ? oldChildNodes.length : 0;
	
	  if (!newTree) {
	    var removed = [oldTree].concat(oldChildNodes.splice(0, oldChildNodesLength));
	
	    patches.push({
	      __do__: REMOVE_ENTIRE_ELEMENT,
	      element: oldTree,
	      toRemove: removed
	    });
	
	    return patches;
	  }
	
	  var nodeValue = newTree.nodeValue;
	  var childNodes = newTree.childNodes;
	  var childNodesLength = childNodes ? childNodes.length : 0;
	  var nodeName = newTree.nodeName;
	  var attributes = newTree.attributes;
	  var newIsTextNode = nodeName === '#text';
	  var newIsFragment = newTree.nodeName === '#document-fragment';
	
	  // Replace the key attributes.
	  oldTree.key = newTree.key;
	
	  // If the element we're replacing is totally different from the previous
	  // replace the entire element, don't bother investigating children.
	  if (oldTree.nodeName !== newTree.nodeName) {
	    patches.push({
	      __do__: REPLACE_ENTIRE_ELEMENT,
	      old: oldTree,
	      new: newTree
	    });
	
	    return patches;
	  }
	  // This element never changes.
	  else if (oldTree === newTree) {
	      return patches;
	    }
	
	  var areTextNodes = oldIsTextNode && newIsTextNode;
	
	  // If the top level nodeValue has changed we should reflect it.
	  if (areTextNodes && oldNodeValue !== nodeValue) {
	    patches.push({
	      __do__: CHANGE_TEXT,
	      element: oldTree,
	      value: newTree.nodeValue
	    });
	
	    oldTree.nodeValue = newTree.nodeValue;
	
	    return patches;
	  }
	
	  // Ensure keys exist for all the old & new elements.
	  var noOldKeys = !oldChildNodes.some(function (oldChildNode) {
	    return oldChildNode.key;
	  });
	  var newKeys = null;
	  var oldKeys = null;
	
	  if (!noOldKeys) {
	    newKeys = new Set(childNodes.map(function (childNode) {
	      return String(childNode.key);
	    }).filter(Boolean));
	
	    oldKeys = new Set(oldChildNodes.map(function (childNode) {
	      return String(childNode.key);
	    }).filter(Boolean));
	  }
	
	  // Most common additive elements.
	  if (childNodesLength > oldChildNodesLength) {
	    // Store elements in a DocumentFragment to increase performance and be
	    // generally simplier to work with.
	    var fragment = [];
	
	    for (var i = oldChildNodesLength; i < childNodesLength; i++) {
	      // Internally add to the tree.
	      oldChildNodes.push(childNodes[i]);
	
	      // Add to the document fragment.
	      fragment.push(childNodes[i]);
	    }
	
	    oldChildNodesLength = oldChildNodes.length;
	
	    // Assign the fragment to the patches to be injected.
	    patches.push({
	      __do__: MODIFY_ELEMENT,
	      element: oldTree,
	      fragment: fragment
	    });
	  }
	
	  // Remove these elements.
	  if (oldChildNodesLength > childNodesLength) {
	    (function () {
	      // For now just splice out the end items.
	      var diff = oldChildNodesLength - childNodesLength;
	      var toRemove = [];
	      var shallowClone = [].concat(_toConsumableArray(oldChildNodes));
	
	      // There needs to be keys to diff, if not, there's no point in checking.
	      if (noOldKeys) {
	        toRemove = oldChildNodes.splice(oldChildNodesLength - diff, diff);
	      }
	      // This is an expensive operation so we do the above check to ensure that a
	      // key was specified.
	      else {
	          (function () {
	            var keysToRemove = new Set();
	
	            // Find the keys in the sets to remove.
	            oldKeys.forEach(function (key) {
	              if (!newKeys.has(key)) {
	                keysToRemove.add(key);
	              }
	            });
	
	            // If the original childNodes contain a key attribute, use this to
	            // compare over the naive method below.
	            shallowClone.forEach(function (oldChildNode, i) {
	              if (toRemove.length >= diff) {
	                return;
	              } else if (keysToRemove.has(oldChildNode.key)) {
	                var nextChild = oldChildNodes[i + 1];
	                var nextIsTextNode = nextChild && nextChild.nodeType === 3;
	                var count = 1;
	
	                // Always remove whitespace in between the elements.
	                if (nextIsTextNode && toRemove.length + 2 <= diff) {
	                  count = 2;
	                }
	                // All siblings must contain a key attribute if they exist.
	                else if (nextChild && nextChild.nodeType === 1 && !nextChild.key) {
	                    throw new Error('\n              All element siblings must consistently contain key attributes.\n            '.trim());
	                  }
	
	                // Find the index position from the original array.
	                var indexPos = oldChildNodes.indexOf(oldChildNode);
	
	                // Find all the items to remove.
	                toRemove.push.apply(toRemove, oldChildNodes.splice(indexPos, count));
	              }
	            });
	          })();
	        }
	
	      // Ensure we don't remove too many elements by accident;
	      toRemove.length = diff;
	
	      // Ensure our internal length check is matched.
	      oldChildNodesLength = oldChildNodes.length;
	
	      if (childNodesLength === 0) {
	        patches.push({
	          __do__: REMOVE_ELEMENT_CHILDREN,
	          element: oldTree,
	          toRemove: toRemove
	        });
	      } else {
	        // Remove the element, this happens before the splice so that we still
	        // have access to the element.
	        toRemove.forEach(function (old) {
	          return patches.push({
	            __do__: MODIFY_ELEMENT,
	            old: old
	          });
	        });
	      }
	    })();
	  }
	
	  // Replace elements if they are different.
	  if (oldChildNodesLength >= childNodesLength) {
	    for (var _i = 0; _i < childNodesLength; _i++) {
	      if (oldChildNodes[_i].nodeName !== childNodes[_i].nodeName) {
	        // Add to the patches.
	        patches.push({
	          __do__: MODIFY_ELEMENT,
	          old: oldChildNodes[_i],
	          new: childNodes[_i]
	        });
	
	        // Replace the internal tree's point of view of this element.
	        oldChildNodes[_i] = childNodes[_i];
	      } else {
	        sync(oldChildNodes[_i], childNodes[_i], patches);
	      }
	    }
	  }
	
	  // Attributes are significantly easier than elements and we ignore checking
	  // them on fragments. The algorithm is the same as elements, check for
	  // additions/removals based off length, and then iterate once to make
	  // adjustments.
	  if (!newIsFragment && attributes) {
	    // Cache the lengths for performance and readability.
	    var oldLength = oldTree.attributes.length;
	    var newLength = attributes.length;
	
	    // Construct a single patch for the entire changeset.
	    var patch = {
	      __do__: MODIFY_ATTRIBUTE,
	      element: oldTree,
	      attributes: []
	    };
	
	    // Find additions.
	    if (newLength > oldLength) {
	      for (var _i2 = oldLength; _i2 < newLength; _i2++) {
	        var oldAttr = oldTree.attributes[_i2];
	        var newAttr = attributes[_i2];
	
	        patch.attributes.push({ oldAttr: oldAttr, newAttr: newAttr });
	        oldTree.attributes.push(newAttr);
	      }
	    }
	
	    // Find removals.
	    if (oldLength > newLength) {
	      for (var _i3 = newLength; _i3 < oldLength; _i3++) {
	        var _oldAttr = oldTree.attributes[_i3];
	        var _newAttr = attributes[_i3];
	
	        patch.attributes.push({ oldAttr: _oldAttr, newAttr: _newAttr });
	      }
	
	      // Reset the internal attributes to be less.
	      oldTree.attributes = oldTree.attributes.slice(0, newLength);
	    }
	
	    // Find changes.
	    for (var _i4 = 0; _i4 < attributes.length; _i4++) {
	      var _oldAttr2 = oldTree.attributes[_i4];
	      var _newAttr2 = attributes[_i4];
	      var oldAttrName = _oldAttr2 ? _oldAttr2.name : undefined;
	      var oldAttrValue = _oldAttr2 ? _oldAttr2.value : undefined;
	      var newAttrName = _newAttr2 ? _newAttr2.name : undefined;
	      var newAttrValue = _newAttr2 ? _newAttr2.value : undefined;
	
	      // Only push in a change if the attribute or value changes.
	      if (oldAttrValue !== newAttrValue) {
	        // Add the attribute items to add and remove.
	        patch.attributes.push({
	          oldAttr: _oldAttr2,
	          newAttr: _newAttr2
	        });
	
	        oldTree.attributes[_i4] = _newAttr2;
	      }
	    }
	
	    // Add the attribute changes patch to the series of patches, unless there
	    // are no attributes to change.
	    if (patch.attributes.length) {
	      patches.push(patch);
	    }
	  }
	
	  return patches;
	}
	
	},{}],10:[function(_dereq_,module,exports){
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Associates DOM Nodes with state objects.
	var StateCache = exports.StateCache = new Map();
	
	// Associates Virtual Tree Elements with DOM Nodes.
	var NodeCache = exports.NodeCache = new Map();
	
	// Caches all middleware. You cannot unset a middleware once it has been added.
	var MiddlewareCache = exports.MiddlewareCache = new Set();
	
	},{}],11:[function(_dereq_,module,exports){
	(function (global){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.decodeEntities = decodeEntities;
	// Support loading diffHTML in non-browser environments.
	var element = global.document ? document.createElement('div') : null;
	
	/**
	 * Decodes HTML strings.
	 *
	 * @see http://stackoverflow.com/a/5796718
	 * @param string
	 * @return unescaped HTML
	 */
	function decodeEntities(string) {
	  // If there are no HTML entities, we can safely pass the string through.
	  if (!element || !string || !string.indexOf || string.indexOf('&') === -1) {
	    return string;
	  }
	
	  element.innerHTML = string;
	  return element.textContent;
	}
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],12:[function(_dereq_,module,exports){
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = escape;
	/**
	 * Tiny HTML escaping function, useful to prevent things like XSS and
	 * unintentionally breaking attributes with quotes.
	 *
	 * @param {String} unescaped - An HTML value, unescaped
	 * @return {String} - An HTML-safe string
	 */
	function escape(unescaped) {
	  return unescaped.replace(/["&'<>`]/g, function (match) {
	    return "&#" + match.charCodeAt(0) + ";";
	  });
	}
	
	},{}],13:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.protectElement = protectElement;
	exports.unprotectElement = unprotectElement;
	exports.cleanMemory = cleanMemory;
	
	var _pools = _dereq_('../util/pools');
	
	var _cache = _dereq_('./cache');
	
	/**
	 * Ensures that an element is not recycled during a render cycle.
	 *
	 * @param element
	 * @return element
	 */
	function protectElement(element) {
	  if (Array.isArray(element)) {
	    return element.forEach(protectElement);
	  }
	
	  var elementObject = _pools.pools.elementObject;
	  var attributeObject = _pools.pools.attributeObject;
	
	  elementObject.protect(element);
	
	  element.attributes.forEach(attributeObject.protect, attributeObject);
	  element.childNodes.forEach(protectElement);
	
	  return element;
	}
	
	/**
	 * Allows an element to be recycled during a render cycle.
	 *
	 * @param element
	 * @return
	 */
	function unprotectElement(element) {
	  if (Array.isArray(element)) {
	    return element.forEach(unprotectElement);
	  }
	
	  var elementObject = _pools.pools.elementObject;
	  var attributeObject = _pools.pools.attributeObject;
	
	  elementObject.unprotect(element);
	
	  element.attributes.forEach(attributeObject.unprotect, attributeObject);
	  element.childNodes.forEach(unprotectElement);
	
	  _cache.NodeCache.delete(element);
	
	  return element;
	}
	
	/**
	 * Recycles all unprotected allocations.
	 */
	function cleanMemory() {
	  var elementCache = _pools.pools.elementObject.cache;
	  var attributeCache = _pools.pools.attributeObject.cache;
	
	  // Empty all element allocations.
	  elementCache.allocated.forEach(function (v) {
	    if (elementCache.free.length < _pools.count) {
	      elementCache.free.push(v);
	    }
	  });
	
	  elementCache.allocated.clear();
	
	  // Clean out unused elements.
	  _cache.NodeCache.forEach(function (node, descriptor) {
	    if (!elementCache.protected.has(descriptor)) {
	      _cache.NodeCache.delete(descriptor);
	    }
	  });
	
	  // Empty all attribute allocations.
	  attributeCache.allocated.forEach(function (v) {
	    if (attributeCache.free.length < _pools.count) {
	      attributeCache.free.push(v);
	    }
	  });
	
	  attributeCache.allocated.clear();
	}
	
	},{"../util/pools":15,"./cache":10}],14:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.blockText = undefined;
	exports.parse = parse;
	
	var _pools = _dereq_('./pools');
	
	var _make = _dereq_('../tree/make');
	
	var _make2 = _interopRequireDefault(_make);
	
	var _helpers = _dereq_('../tree/helpers');
	
	var _escape = _dereq_('./escape');
	
	var _escape2 = _interopRequireDefault(_escape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Code based off of:
	// https://github.com/ashi009/node-fast-html-parser
	
	var TOKEN = '__DIFFHTML__';
	
	var doctypeEx = /<!.*>/ig;
	var attrEx = /\b([_a-z][_a-z0-9\-]*)\s*(=\s*("([^"]+)"|'([^']+)'|(\S+)))?/ig;
	var tagEx = /<!--[^]*?(?=-->)-->|<(\/?)([a-z\-][a-z0-9\-]*)\s*([^>]*?)(\/?)>/ig;
	var spaceEx = /[^ ]/;
	
	// We use this Set in the node/patch module so marking it exported.
	var blockText = exports.blockText = new Set(['script', 'noscript', 'style', 'code', 'template']);
	
	var selfClosing = new Set(['meta', 'img', 'link', 'input', 'area', 'br', 'hr']);
	
	var kElementsClosedByOpening = {
	  li: { li: true },
	  p: { p: true, div: true },
	  td: { td: true, th: true },
	  th: { td: true, th: true }
	};
	
	var kElementsClosedByClosing = {
	  li: { ul: true, ol: true },
	  a: { div: true },
	  b: { div: true },
	  i: { div: true },
	  p: { div: true },
	  td: { tr: true, table: true },
	  th: { tr: true, table: true }
	};
	
	/**
	 * Interpolate dynamic supplemental values from the tagged template into the
	 * tree.
	 *
	 * @param currentParent
	 * @param string
	 * @param supplemental
	 */
	var interpolateDynamicBits = function interpolateDynamicBits(currentParent, string, supplemental) {
	  if (string && string.indexOf(TOKEN) > -1) {
	    (function () {
	      var toAdd = [];
	
	      // Break up the incoming string into dynamic parts that are then pushed
	      // into a new set of child nodes.
	      string.split(TOKEN).forEach(function (value, index) {
	        if (index === 0) {
	          // We trim here to allow for newlines before and after markup starts.
	          if (value && value.trim()) {
	            toAdd.push(TextNode(value));
	          }
	
	          // The first item does not mean there was dynamic content.
	          return;
	        }
	
	        // If we are in the second iteration, this
	        var dynamicBit = supplemental.children.shift();
	
	        if (typeof dynamicBit === 'string') {
	          toAdd.push(TextNode(dynamicBit));
	        } else if (Array.isArray(dynamicBit)) {
	          toAdd.push.apply(toAdd, dynamicBit);
	        } else if (dynamicBit.ownerDocument) {
	          toAdd.push((0, _make2.default)(dynamicBit));
	        } else {
	          toAdd.push(dynamicBit);
	        }
	
	        // This is a useful Text Node.
	        if (value && value.trim()) {
	          toAdd.push(TextNode(value));
	        }
	      });
	
	      currentParent.childNodes.push.apply(currentParent.childNodes, toAdd);
	    })();
	  } else if (string && string.length && !doctypeEx.exec(string)) {
	    currentParent.childNodes.push(TextNode(string));
	  }
	};
	
	/**
	 * TextNode to contain a text element in DOM tree.
	 *
	 * @param {String} nodeValue - A value to set in the text,, set unescaped
	 * @return {Object} - A Virtual Tree element representing the Text Node
	 */
	var TextNode = function TextNode(value) {
	  var vTree = (0, _helpers.createElement)('#text', [], []);
	  vTree.nodeValue = value;
	  return vTree;
	};
	
	/**
	 * HTMLElement, which contains a set of children.
	 *
	 * Note: this is a minimalist implementation, no complete tree structure
	 * provided (no parentNode, nextSibling, previousSibling etc).
	 *
	 * @param {String} nodeName - DOM Node name
	 * @param {Object} rawAttrs - DOM Node Attributes
	 * @param {Object} supplemental - Interpolated data from a tagged template
	 * @return {Object} vTree
	 */
	var HTMLElement = function HTMLElement(nodeName, rawAttrs, supplemental) {
	  var vTree = (0, _helpers.createElement)(nodeName, [], []);
	
	  for (var match; match = attrEx.exec(rawAttrs || '');) {
	    var name = match[1];
	    var value = match[6] || match[5] || match[4] || match[1];
	    var attr = (0, _helpers.createAttribute)(name, value);
	
	    if (attr.value === TOKEN) {
	      attr.value = supplemental.props.shift();
	    }
	
	    // If a key attribute is found attach directly to the vTree.
	    if (attr.name === 'key') {
	      vTree.key = attr.value;
	    }
	
	    // Look for empty attributes.
	    if (match[6] === '""') {
	      attr.value = '';
	    }
	
	    vTree.attributes.push(attr);
	  }
	
	  return vTree;
	};
	
	/**
	 * Parses HTML and returns a root element
	 *
	 * @param {String} html - String of HTML markup to parse into a Virtual Tree
	 * @param {Object} supplemental - Dynamic interpolated data values
	 * @param {Object} options - Contains options like silencing warnings
	 * @return {Object} - Parsed Virtual Tree Element
	 */
	function parse(html, supplemental) {
	  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  var root = HTMLElement('#document-fragment');
	  var stack = [root];
	  var currentParent = root;
	  var lastTextPos = -1;
	
	  // If there are no HTML elements, treat the passed in html as a single
	  // text node.
	  if (html.indexOf('<') === -1 && html) {
	    interpolateDynamicBits(currentParent, html, supplemental);
	    return root;
	  }
	
	  // Look through the HTML markup for valid tags.
	  for (var match, text; match = tagEx.exec(html);) {
	    if (lastTextPos > -1) {
	      if (lastTextPos + match[0].length < tagEx.lastIndex) {
	        // if has content
	        text = html.slice(lastTextPos, tagEx.lastIndex - match[0].length);
	
	        interpolateDynamicBits(currentParent, text, supplemental);
	      }
	    }
	
	    var matchOffset = tagEx.lastIndex - match[0].length;
	
	    if (lastTextPos === -1 && matchOffset > 0) {
	      var string = html.slice(0, matchOffset);
	
	      if (string && string.trim() && !doctypeEx.exec(string)) {
	        interpolateDynamicBits(currentParent, string, supplemental);
	      }
	    }
	
	    lastTextPos = tagEx.lastIndex;
	
	    // This is a comment.
	    if (match[0][1] === '!') {
	      continue;
	    }
	
	    if (!match[1]) {
	      // not </ tags
	      var attrs = {};
	
	      if (!match[4] && kElementsClosedByOpening[currentParent.rawNodeName]) {
	        if (kElementsClosedByOpening[currentParent.rawNodeName][match[2]]) {
	          stack.pop();
	          currentParent = stack[stack.length - 1];
	        }
	      }
	
	      currentParent = currentParent.childNodes[currentParent.childNodes.push(HTMLElement(match[2], match[3], supplemental)) - 1];
	
	      stack.push(currentParent);
	
	      if (blockText.has(match[2])) {
	        // A little test to find next </script> or </style> ...
	        var closeMarkup = '</' + match[2] + '>';
	        var index = html.indexOf(closeMarkup, tagEx.lastIndex);
	        var length = match[2].length;
	
	        if (index === -1) {
	          lastTextPos = tagEx.lastIndex = html.length + 1;
	        } else {
	          lastTextPos = index + closeMarkup.length;
	          tagEx.lastIndex = lastTextPos;
	          match[1] = true;
	        }
	
	        var newText = html.slice(match.index + match[0].length, index);
	        interpolateDynamicBits(currentParent, newText.trim(), supplemental);
	      }
	    }
	
	    if (match[1] || match[4] || selfClosing.has(match[2])) {
	      if (match[2] !== currentParent.rawNodeName && options.strict) {
	        var nodeName = currentParent.rawNodeName;
	
	        // Find a subset of the markup passed in to validate.
	        var markup = html.slice(tagEx.lastIndex - match[0].length).split('\n').slice(0, 3);
	
	        // Position the caret next to the first non-whitespace character.
	        var caret = Array(spaceEx.exec(markup[0]).index).join(' ') + '^';
	
	        // Craft the warning message and inject it into the markup.
	        markup.splice(1, 0, caret + '\nPossibly invalid markup. Saw ' + match[2] + ', expected ' + nodeName + '...\n        ');
	
	        // Throw an error message if the markup isn't what we expected.
	        throw new Error('' + markup.join('\n'));
	      }
	
	      // </ or /> or <br> etc.
	      while (currentParent) {
	        if (currentParent.rawNodeName == match[2]) {
	          stack.pop();
	          currentParent = stack[stack.length - 1];
	
	          break;
	        } else {
	          var tag = kElementsClosedByClosing[currentParent.rawNodeName];
	
	          // Trying to close current tag, and move on
	          if (tag) {
	
	            if (tag[match[2]]) {
	              stack.pop();
	              currentParent = stack[stack.length - 1];
	
	              continue;
	            }
	          }
	
	          // Use aggressive strategy to handle unmatching markups.
	          break;
	        }
	      }
	    }
	  }
	
	  // Find any last remaining text after the parsing completes over tags.
	  var remainingText = html.slice(lastTextPos === -1 ? 0 : lastTextPos).trim();
	
	  // If the text exists and isn't just whitespace, push into a new TextNode.
	  interpolateDynamicBits(currentParent, remainingText, supplemental);
	
	  // This is an entire document, so only allow the HTML children to be
	  // body or head.
	  if (root.childNodes.length && root.childNodes[0].nodeName === 'html') {
	    (function () {
	      // Store elements from before body end and after body end.
	      var head = { before: [], after: [] };
	      var body = { after: [] };
	      var beforeHead = true;
	      var beforeBody = true;
	      var HTML = root.childNodes[0];
	
	      // Iterate the children and store elements in the proper array for
	      // later concat, replace the current childNodes with this new array.
	      HTML.childNodes = HTML.childNodes.filter(function (el) {
	        // If either body or head, allow as a valid element.
	        if (el.nodeName === 'body' || el.nodeName === 'head') {
	          if (el.nodeName === 'head') {
	            beforeHead = false;
	          }
	
	          if (el.nodeName === 'body') {
	            beforeBody = false;
	          }
	
	          return true;
	        }
	        // Not a valid nested HTML tag element, move to respective container.
	        else if (el.nodeType === 1) {
	            if (beforeHead && beforeBody) {
	              head.before.push(el);
	            } else if (!beforeHead && beforeBody) {
	              head.after.push(el);
	            } else if (!beforeBody) {
	              body.after.push(el);
	            }
	          }
	      });
	
	      // Ensure the first element is the HEAD tag.
	      if (!HTML.childNodes[0] || HTML.childNodes[0].nodeName !== 'head') {
	        var headInstance = _pools.pools.elementObject.get();
	        headInstance.nodeName = 'head';
	        headInstance.childNodes.length = 0;
	        headInstance.attributes.length = 0;
	
	        var existing = headInstance.childNodes;
	        existing.unshift.apply(existing, head.before);
	        existing.push.apply(existing, head.after);
	
	        HTML.childNodes.unshift(headInstance);
	      } else {
	        var _existing = HTML.childNodes[0].childNodes;
	        _existing.unshift.apply(_existing, head.before);
	        _existing.push.apply(_existing, head.after);
	      }
	
	      // Ensure the second element is the body tag.
	      if (!HTML.childNodes[1] || HTML.childNodes[1].nodeName !== 'body') {
	        var bodyInstance = _pools.pools.elementObject.get();
	        bodyInstance.nodeName = 'body';
	        bodyInstance.childNodes.length = 0;
	        bodyInstance.attributes.length = 0;
	
	        var _existing2 = bodyInstance.childNodes;
	        _existing2.push.apply(_existing2, body.after);
	
	        HTML.childNodes.push(bodyInstance);
	      } else {
	        var _existing3 = HTML.childNodes[1].childNodes;
	        _existing3.push.apply(_existing3, body.after);
	      }
	    })();
	  }
	
	  return root;
	}
	
	},{"../tree/helpers":7,"../tree/make":8,"./escape":12,"./pools":15}],15:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPool = createPool;
	exports.initializePools = initializePools;
	var pools = exports.pools = {};
	var count = exports.count = 10000;
	
	/**
	 * Creates a pool to query new or reused values from.
	 *
	 * @param name
	 * @param opts
	 * @return {Object} pool
	 */
	function createPool(name, opts) {
	  var size = opts.size;
	  var fill = opts.fill;
	
	  var cache = {
	    free: [],
	    allocated: new Set(),
	    protected: new Set()
	  };
	
	  // Prime the cache with n objects.
	  for (var i = 0; i < size; i++) {
	    cache.free.push(fill());
	  }
	
	  return {
	    cache: cache,
	
	    get: function get() {
	      var value = cache.free.pop() || fill();
	      cache.allocated.add(value);
	      return value;
	    },
	    protect: function protect(value) {
	      cache.allocated.delete(value);
	      cache.protected.add(value);
	    },
	    unprotect: function unprotect(value) {
	      if (cache.protected.has(value)) {
	        cache.protected.delete(value);
	        cache.free.push(value);
	      }
	    }
	  };
	}
	
	function initializePools(COUNT) {
	  pools.attributeObject = createPool('attributeObject', {
	    size: COUNT,
	
	    fill: function fill() {
	      return { name: '', value: '' };
	    }
	  });
	
	  pools.elementObject = createPool('elementObject', {
	    size: COUNT,
	
	    fill: function fill() {
	      return {
	        rawNodeName: '',
	        nodeName: '',
	        nodeValue: '',
	        nodeType: 1,
	        key: '',
	        childNodes: [],
	        attributes: []
	      };
	    }
	  });
	}
	
	// Create ${COUNT} items of each type.
	initializePools(count);
	
	},{}],16:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// List of SVG elements.
	var elements = exports.elements = ['altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'set', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use', 'view', 'vkern'];
	
	// Namespace.
	var namespace = exports.namespace = 'http://www.w3.org/2000/svg';
	
	},{}],17:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.html = html;
	
	var _parser = _dereq_('./parser');
	
	var _escape = _dereq_('./escape');
	
	var _escape2 = _interopRequireDefault(_escape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isPropEx = /(=|'|")/;
	var TOKEN = '__DIFFHTML__';
	
	/**
	 * Get the next value from the list. If the next value is a string, make sure
	 * it is escaped.
	 *
	 * @param {Array} values - Values extracted from tagged template literal
	 * @return {String|*} - Escaped string, otherwise any value passed
	 */
	var nextValue = function nextValue(values) {
	  var value = values.shift();
	  return typeof value === 'string' ? (0, _escape2.default)(value) : value;
	};
	
	/**
	 * Parses tagged template contents into a Virtual Tree. These tagged templates
	 * separate static strings from values, so we need to do some special token
	 * work
	 *
	 * @param {Array} strings - A list of static strings, split by value
	 * @param {Array} ...values - A list of interpolated values
	 * @return {Object|Array} - A Virtual Tree Element or array of elements
	 */
	function html(strings) {
	  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    values[_key - 1] = arguments[_key];
	  }
	
	  // Automatically coerce a string literal to array.
	  if (typeof strings === 'string') {
	    strings = [strings];
	  }
	
	  // Do not attempt to parse empty strings.
	  if (!strings[0].length && !values.length) {
	    return null;
	  }
	
	  // Parse only the text, no dynamic bits.
	  if (strings.length === 1 && !values.length) {
	    var _childNodes = (0, _parser.parse)(strings[0]).childNodes;
	    return _childNodes.length > 1 ? _childNodes : _childNodes[0];
	  }
	
	  // Used to store markup and tokens.
	  var retVal = [];
	
	  // We filter the supplemental values by where they are used. Values are
	  // either props or children.
	  var supplemental = {
	    props: [],
	    children: []
	  };
	
	  // Loop over the static strings, each break correlates to an interpolated
	  // value. Since these values can be dynamic, we cannot pass them to the
	  // diffHTML HTML parser inline. They are passed as an additional argument
	  // called supplemental. The following loop instruments the markup with tokens
	  // that the parser then uses to assemble the correct tree.
	  strings.forEach(function (string) {
	    // Always add the string, we need it to parse the markup later.
	    retVal.push(string);
	
	    if (values.length) {
	      var value = nextValue(values);
	      var lastSegment = string.split(' ').pop();
	      var lastCharacter = lastSegment.trim().slice(-1);
	      var isProp = Boolean(lastCharacter.match(isPropEx));
	
	      if (isProp) {
	        supplemental.props.push(value);
	        retVal.push(TOKEN);
	      } else if (Array.isArray(value) || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	        supplemental.children.push(value);
	        retVal.push(TOKEN);
	      } else {
	        retVal.push(value);
	      }
	    }
	  });
	
	  // Parse the instrumented markup to get the Virtual Tree.
	  var childNodes = (0, _parser.parse)(retVal.join(''), supplemental).childNodes;
	
	  // This makes it easier to work with a single element as a root, instead of
	  // always return an array.
	  return childNodes.length > 1 ? childNodes : childNodes[0];
	}
	
	},{"./escape":12,"./parser":14}],18:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildTrigger = buildTrigger;
	exports.makePromises = makePromises;
	var forEach = Array.prototype.forEach;
	
	/**
	 * Contains arrays to store transition callbacks.
	 *
	 * attached
	 * --------
	 *
	 * For when elements come into the DOM. The callback triggers immediately after
	 * the element enters the DOM. It is called with the element as the only
	 * argument.
	 *
	 * detached
	 * --------
	 *
	 * For when elements are removed from the DOM. The callback triggers just
	 * before the element leaves the DOM. It is called with the element as the only
	 * argument.
	 *
	 * replaced
	 * --------
	 *
	 * For when elements are replaced in the DOM. The callback triggers after the
	 * new element enters the DOM, and before the old element leaves. It is called
	 * with old and new elements as arguments, in that order.
	 *
	 * attributeChanged
	 * ----------------
	 *
	 * Triggered when an element's attribute has changed. The callback triggers
	 * after the attribute has changed in the DOM. It is called with the element,
	 * the attribute name, old value, and current value.
	 *
	 * textChanged
	 * -----------
	 *
	 * Triggered when an element's `textContent` chnages. The callback triggers
	 * after the textContent has changed in the DOM. It is called with the element,
	 * the old value, and current value.
	 */
	var states = exports.states = {
	  attached: [],
	  detached: [],
	  replaced: [],
	  attributeChanged: [],
	  textChanged: []
	};
	
	// Define the custom signatures necessary for the loop to fill in the "magic"
	// methods that process the transitions consistently.
	var fnSignatures = {
	  attached: function attached(el) {
	    return function (cb) {
	      return cb(el);
	    };
	  },
	  detached: function detached(el) {
	    return function (cb) {
	      return cb(el);
	    };
	  },
	  replaced: function replaced(oldEl, newEl) {
	    return function (cb) {
	      return cb(oldEl, newEl);
	    };
	  },
	  textChanged: function textChanged(el, oldVal, newVal) {
	    return function (cb) {
	      return cb(el, oldVal, newVal);
	    };
	  },
	  attributeChanged: function attributeChanged(el, name, oldVal, newVal) {
	    return function (cb) {
	      return cb(el, name, oldVal, newVal);
	    };
	  }
	};
	
	var make = {};
	
	// Dynamically fill in the custom methods instead of manually constructing
	// them.
	Object.keys(states).forEach(function (stateName) {
	  var mapFn = fnSignatures[stateName];
	
	  /**
	   * Make's the transition promises.
	   *
	   * @param elements
	   * @param args
	   * @param promises
	   */
	  make[stateName] = function makeTransitionPromises(elements, args, promises) {
	    // Sometimes an array-like is passed so using forEach in this manner yields
	    // more consistent results.
	    forEach.call(elements, function (element) {
	      // Never pass text nodes to a state callback unless it is textChanged.
	      if (stateName !== 'textChanged' && element.nodeType !== 1) {
	        return;
	      }
	
	      // Call the map function with each element.
	      var newPromises = states[stateName].map(mapFn.apply(null, [element].concat(args)));
	
	      // Merge these Promises into the main cache.
	      promises.push.apply(promises, newPromises);
	
	      // Recursively call into the children if attached or detached.
	      if (stateName === 'attached' || stateName === 'detached') {
	        make[stateName](element.childNodes, args, promises);
	      }
	    });
	
	    return promises.filter(function (promise) {
	      return Boolean(promise && promise.then);
	    });
	  };
	});
	
	/**
	 * Builds a reusable trigger mechanism for the element transitions.
	 *
	 * @param allPromises
	 */
	function buildTrigger(allPromises) {
	  var addPromises = allPromises.push.apply.bind(allPromises.push, allPromises);
	
	  // This becomes `triggerTransition` in process.js.
	  return function (stateName, makePromisesCallback, callback) {
	    if (states[stateName] && states[stateName].length) {
	      // Calls into each custom hook to bind Promises into the local array,
	      // these will then get merged into the main `allPromises` array.
	      var promises = makePromisesCallback([]);
	
	      // Add these promises into the global cache.
	      addPromises(promises);
	
	      if (callback) {
	        callback(promises.length ? promises : undefined);
	      }
	    } else if (callback) {
	      callback();
	    }
	  };
	}
	
	/**
	 * Make a reusable function for easy transition calling.
	 *
	 * @param stateName
	 */
	function makePromises(stateName) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  // Ensure elements is always an array.
	  var elements = [].concat(args[0]);
	
	  // Accepts the local Array of promises to use.
	  return function (promises) {
	    return make[stateName](elements, args.slice(1), promises);
	  };
	}
	
	},{}]},{},[1])(1)
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 111 */
/***/ function(module, exports) {

	// @TODO: Convert to immutable data structure
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        //const validateLoginModal = (m, p) => (p && typeof p.show !== 'undefined') ? p.show : !m.show;
	        //
	        //model.loginModal.show = validateLoginModal(model.loginModal, proposal.loginModal);
	        if (proposal) {
	
	            model.id = proposal.id;
	        }
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(113);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _logoIndex = __webpack_require__(115);
	
	var _logoIndex2 = _interopRequireDefault(_logoIndex);
	
	var _navigationIndex = __webpack_require__(123);
	
	var _navigationIndex2 = _interopRequireDefault(_navigationIndex);
	
	var _authenticationIndex = __webpack_require__(131);
	
	var _authenticationIndex2 = _interopRequireDefault(_authenticationIndex);
	
	var view = function view(model, intents) {
	
	    return (0, _utilsElements.header)({ id: model.id, className: _stylesCss2['default'].header }, _logoIndex2['default'].createElement(), _navigationIndex2['default'].createElement(), _authenticationIndex2['default'].createElement());
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(114);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(114, function() {
				var newContent = __webpack_require__(114);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".header--1DZZl {\n    background: #00143c;\n    display: block;\n    width: 100%;\n    height: 44px;\n}\n\n.header--1DZZl > * {\n    display: inline-block;\n    vertical-align: middle;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"header": "header--1DZZl"
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _receiveJs = __webpack_require__(116);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(117);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _modelJs = __webpack_require__(122);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var Logo = (0, _utilsCreateElement2['default'])({
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = Logo;
	module.exports = exports['default'];

/***/ },
/* 116 */
/***/ function(module, exports) {

	// @TODO: Convert to immutable data structure
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        if (proposal && typeof proposal.url !== 'undefined') {
	
	            model.url = proposal.url;
	        }
	
	        if (proposal && typeof proposal.title !== 'undefined') {
	
	            model.title = proposal.title;
	        }
	
	        return model;
	    };
	};
	
	exports['default'] = receive;
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(118);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var view = function view(model) {
	  return (0, _utilsElements.a)({ id: model.id, className: _stylesCss2['default'].logo, title: model.title });
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(119);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(119, function() {
				var newContent = __webpack_require__(119);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".logo--155I3 {\n    background: url(" + __webpack_require__(120) + ") center center no-repeat;\n    display: inline-block;\n    margin: 0 12px;\n    width: 36px;\n    height: 44px;\n    transition: background 0.3s;\n}\n\n@media screen and (min-width: 375px) {\n    .logo--155I3 {\n        background: url(" + __webpack_require__(121) + ") center center no-repeat;\n        min-width: 115px;\n    }\n}", ""]);
	
	// exports
	exports.locals = {
		"logo": "logo--155I3"
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f72abfca4afa9737fc782b0ab02fe689.svg";

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "24128b63789815283d7635b11f9d3dac.svg";

/***/ },
/* 122 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'wh-logo',
	    url: '#',
	    title: 'williamhill.com'
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _actionsJs = __webpack_require__(124);
	
	var _receiveJs = __webpack_require__(125);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(126);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _modelJs = __webpack_require__(129);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _stateJs = __webpack_require__(130);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var Navigation = (0, _utilsCreateElement2['default'])({
	    actions: _actionsJs.actions,
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = Navigation;
	module.exports = exports['default'];

/***/ },
/* 124 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var actions = function actions(propose) {
	
	    window.addEventListener('popstate', propose);
	};
	
	exports.actions = actions;

/***/ },
/* 125 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Not performant, should not fire when there is no change
	        if (proposal && proposal.srcElement) {
	
	            Object.keys(model.items).map(function (key) {
	
	                model.items[key].isActive = key === proposal.srcElement.location.href;
	            });
	        }
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(127);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var view = function view(model) {
	    return (0, _utilsElements.nav)({ id: model.id, className: [_stylesCss2['default'].navigation, model.isMobile ? _stylesCss2['default'].mobile : ''].join(' ') }, Object.keys(model.items).map(function (key) {
	        return (0, _utilsElements.a)({ href: key, className: model.items[key].isActive ? _stylesCss2['default'].active : '' }, model.items[key].title);
	    }));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(128);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(128, function() {
				var newContent = __webpack_require__(128);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".navigation--3y8l3 {\n    display: inline-block;\n}\n\n.navigation--3y8l3 a {\n    color: #fff;\n    font-size: 12px;\n    line-height: 15px;\n    margin: 0 16px;\n    opacity: 0.6;\n    padding: 16px 0;\n    text-decoration: none;\n}\n\n.navigation--3y8l3 a:first-child {\n    margin-left: 0;\n}\n\n.navigation--3y8l3 a:last-child {\n    margin-right: 0;\n}\n\n.navigation--3y8l3 a.active--1EjE5 {\n    border-bottom: 1px solid #faff05;\n    font-weight: bold;\n    opacity: 1;\n    padding-bottom: 3px;\n    transition: opacity 0.5s;\n}\n\n.mobile--2NXuv {\n    padding: 15px;\n}\n\n.mobile--2NXuv a {\n    color: #000;\n    display: block;\n    font-size: 14px;\n    line-height: 15px;\n    margin: 8px 0;\n    opacity: 0.6;\n    text-decoration: none;\n}\n\n.mobile--2NXuv a.active--1EjE5 {\n    font-weight: bold;\n    opacity: 1;\n    padding-bottom: 3px;\n    transition: opacity 0.5s;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"navigation": "navigation--3y8l3",
		"active": "active--1EjE5",
		"mobile": "mobile--2NXuv"
	};

/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'navigation',
	    isMobile: false,
	    items: {
	        'http://localhost:8080/#betting': { title: 'Betting', isActive: false },
	        'http://localhost:8080/#vegas': { title: 'Vegas', isActive: false },
	        'http://localhost:8080/#macau': { title: 'Macau', isActive: false },
	        'http://localhost:8080/#casino': { title: 'Casino', isActive: false },
	        'http://localhost:8080/#live-casino': { title: 'Live Casino', isActive: false },
	        'http://localhost:8080/#games': { title: 'Games', isActive: false },
	        'http://localhost:8080/#scratchcards': { title: 'Scratchcards', isActive: false },
	        'http://localhost:8080/#bingo': { title: 'Bingo', isActive: false },
	        'http://localhost:8080/#poker': { title: 'Poker', isActive: false }
	    }
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// @TODO: If component doesn't exist, document.querySelector(model.root).appendChild(view(...))
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(132);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(133);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(134);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(135);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(283);
	
	// @TODO: Change this to Authentication
	var Authentication = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default'], _actions.intents),
	    view: _view2['default']
	});
	
	exports['default'] = Authentication;
	module.exports = exports['default'];

/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'authentication',
	    user: {
	        'loggedin': false,
	        'gatecheck': false,
	        'accountNo': '',
	        'username': '',
	        'firstName': '',
	        'lastName': '',
	        'usernamePlain': '',
	        'balance': '0',
	        'currency': 'GBP',
	        'returning': true,
	        'lastLogin': ''
	    }
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 133 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var removeEmpty = function removeEmpty(obj) {
	
	    var recurse = function recurse(o, k) {
	        return o[k] && typeof o[k] === 'object' && removeEmpty(o[k]);
	    };
	
	    var remove = function remove(o, k) {
	        return o[k] == null && delete o[k];
	    };
	
	    return [Object.keys(obj).forEach(function (k) {
	        return recurse(obj, k) || remove(obj, k);
	    }), obj][1];
	};
	
	var receive = function receive(model) {
	    return function (proposal) {
	
	        if (proposal && proposal.hasOwnProperty('loggedin')) {
	
	            delete model.user;
	            model.user = proposal;
	        }
	
	        return model;
	    };
	};
	
	exports['default'] = receive;
	module.exports = exports['default'];

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view, actions) {
	    return {
	
	        render: function render(model) {
	
	            /*document.getElementById(model.id).innerHTML = '';
	            document.getElementById(model.id).appendChild(view(model, actions).children);*/
	            var parent = document.getElementById(model.id).parentNode;
	            parent.removeChild(document.getElementById(model.id));
	            parent.appendChild(view(model, actions));
	            /*innerHTML(, view(model, actions));*/
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(136);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _balanceIndex = __webpack_require__(138);
	
	var _balanceIndex2 = _interopRequireDefault(_balanceIndex);
	
	var _joinIndex = __webpack_require__(253);
	
	var _joinIndex2 = _interopRequireDefault(_joinIndex);
	
	var _loginModalIndex = __webpack_require__(268);
	
	var _loginModalIndex2 = _interopRequireDefault(_loginModalIndex);
	
	var _myAccountIndex = __webpack_require__(145);
	
	var _myAccountIndex2 = _interopRequireDefault(_myAccountIndex);
	
	var _myAccountDepositIndex = __webpack_require__(196);
	
	var _myAccountDepositIndex2 = _interopRequireDefault(_myAccountDepositIndex);
	
	var logInComponents = function logInComponents(user, intents) {
	    return [_myAccountDepositIndex2['default'].createElement({ className: _stylesCss2['default'].button, version: 'simple' }), _balanceIndex2['default'].createElement({ balance: user.balance, currency: user.currency }), _myAccountIndex2['default'].createElement({ user: user, show: false, intents: intents })];
	};
	
	var logOutComponents = function logOutComponents(intents) {
	
	    intents.observe(_loginModalIndex2['default'].intents.toggle); // observe only on logged out stream
	
	    return [_joinIndex2['default'].createElement({ className: null }, 'Join'), (0, _utilsElements.button)({
	        className: _stylesCss2['default'].button,
	        onclick: _loginModalIndex2['default'].intents.toggle
	    }, 'Login')];
	};
	
	var view = function view(model, intents) {
	    return (0, _utilsElements.div)({ id: model.id, className: _stylesCss2['default'].controls }, model.user && model.user.loggedin ? logInComponents(model.user, intents) : logOutComponents(intents));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(137);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(137, function() {
				var newContent = __webpack_require__(137);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".controls--11N1v {\n    float: right;\n    position: relative;\n    height: 44px;\n}\n\n.button--3pbir {\n    background: transparent;\n    border-radius: 2px;\n    border: 1px solid #00afff;\n    color: #fff;\n    font-size: 12px;\n    font-weight: bold;\n    line-height: 12px;\n    margin: 8px 4px;\n    padding: 7px 11px;\n}", ""]);
	
	// exports
	exports.locals = {
		"controls": "controls--11N1v",
		"button": "button--3pbir"
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _modelJs = __webpack_require__(139);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _receiveJs = __webpack_require__(140);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _stateJs = __webpack_require__(141);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var _viewJs = __webpack_require__(142);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var Balance = (0, _utilsCreateElement2['default'])({
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = Balance;
	module.exports = exports['default'];

/***/ },
/* 139 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	   value: true
	});
	var initialModel = {
	   currency: 'GBP',
	   balance: '28,956.86',
	   icon: 'accountLI',
	   id: 'balance-button'
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 140 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(143);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _myAccountIndex = __webpack_require__(145);
	
	var _myAccountIndex2 = _interopRequireDefault(_myAccountIndex);
	
	var _iconIndex = __webpack_require__(172);
	
	var _iconIndex2 = _interopRequireDefault(_iconIndex);
	
	var view = function view(model) {
	    return (0, _utilsElements.button)({
	        id: model.id,
	        className: _stylesCss2['default'].button,
	        onclick: _myAccountIndex2['default'].intents.toggle
	    }, model.balance + ' ' + model.currency, _iconIndex2['default'].createElement({ style: { lineHeight: 1 }, className: _stylesCss2['default'].icon, name: model.icon }));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(144);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(144, function() {
				var newContent = __webpack_require__(144);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".button--1whw_ {\n    background-color: rgba(0, 175, 255, 0.2);\n    border-radius: 2px;\n    border: 1px solid #00afff;\n    color: #fff;\n    margin: 8px 4px;\n    outline: 0;\n    padding: 7px 11px;\n}\n\n.icon--1bt2P {\n    margin-left: 2px;\n}", ""]);
	
	// exports
	exports.locals = {
		"button": "button--1whw_",
		"icon": "icon--1bt2P"
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _actionsJs = __webpack_require__(146);
	
	var _receiveJs = __webpack_require__(148);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(149);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _modelJs = __webpack_require__(251);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _stateJs = __webpack_require__(252);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var MyAccount = (0, _utilsCreateElement2['default'])({
	    actions: _actionsJs.actions,
	    intents: _actionsJs.intents,
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default'], _actionsJs.intents),
	    view: _viewJs2['default']
	});
	
	exports['default'] = MyAccount;
	module.exports = exports['default'];

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rxIndexJs = __webpack_require__(103);
	
	var _utilsRequest = __webpack_require__(147);
	
	var _utilsRequest2 = _interopRequireDefault(_utilsRequest);
	
	var stream = new _rxIndexJs.Rx();
	
	var actions = function actions(propose) {
	
	    stream.observe(propose);
	};
	
	var intents = {
	
	    toggle: stream.update,
	
	    getOptions: function getOptions() {
	
	        var onSuccess = function onSuccess(data) {
	
	            console.log(data);
	        };
	
	        var onFailure = function onFailure(data) {
	
	            console.log(data);
	        };
	
	        var options = {
	            async: true,
	            method: 'GET',
	            url: 'https://gaming.williamhill-pp1.com/session/account/options?clientId=liveCasinoSA&returnUrl=' + encodeURIComponent('https://gaming.williamhill-pp1.com/session/user/sessioncheck'),
	            withCredentials: false,
	            responseType: 'json',
	            requestHeader: { 'Accept': 'application/json' }
	        };
	
	        return (0, _utilsRequest2['default'])(options, onSuccess, onFailure);
	    }
	};
	
	window['MyAccount'] = intents;
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var readBody = function readBody(data) {
	
	    var response = undefined;
	
	    if (!data.target.responseType || data.target.responseType === 'text') {
	
	        response = data.target.responseText;
	    } else if (data.target.responseType === 'document') {
	
	        response = data.target.responseXML;
	    } else {
	
	        response = data.target.response;
	    }
	
	    return response;
	};
	
	var encode = function encode(object) {
	
	    var encodedString = '';
	
	    for (var prop in object) {
	
	        if (object.hasOwnProperty(prop)) {
	
	            if (encodedString.length > 0) {
	
	                encodedString += '&';
	            }
	
	            encodedString += encodeURI(prop + '=' + object[prop]);
	        }
	    }
	
	    return encodedString;
	};
	
	var request = function request(options, success, failure) {
	
	    var xhr = new XMLHttpRequest();
	
	    xhr.open(options.method, options.url, options.async);
	
	    xhr.responseType = options.responseType || '';
	
	    xhr.withCredentials = options.withCredentials;
	
	    Object.keys(options.requestHeader).forEach(function (key) {
	        return xhr.setRequestHeader(key, options.requestHeader[key]);
	    });
	
	    xhr.send(encode(options.data || ''));
	
	    xhr.onload = function (data) {
	        return success(readBody(data));
	    };
	
	    xhr.onerror = function (data) {
	        return failure(readBody(data));
	    };
	};
	
	exports['default'] = request;
	module.exports = exports['default'];

/***/ },
/* 148 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var postProcessing = function postProcessing(m, p) {
	    return p && typeof p.show === 'undefined' ? !m.show : p.show;
	};
	
	var receive = function receive(model) {
	    return function (proposal) {
	
	        model = Object.assign({}, model, proposal);
	
	        model.show = postProcessing(model, proposal);
	
	        return model;
	    };
	};
	
	exports['default'] = receive;
	module.exports = exports['default'];

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(150);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _balanceIndex = __webpack_require__(152);
	
	var _balanceIndex2 = _interopRequireDefault(_balanceIndex);
	
	var _balanceTransferIndex = __webpack_require__(160);
	
	var _balanceTransferIndex2 = _interopRequireDefault(_balanceTransferIndex);
	
	var _depositIndex = __webpack_require__(196);
	
	var _depositIndex2 = _interopRequireDefault(_depositIndex);
	
	var _freeBetsIndex = __webpack_require__(204);
	
	var _freeBetsIndex2 = _interopRequireDefault(_freeBetsIndex);
	
	var _gamblingControlsIndex = __webpack_require__(210);
	
	var _gamblingControlsIndex2 = _interopRequireDefault(_gamblingControlsIndex);
	
	var _logOutIndex = __webpack_require__(216);
	
	var _logOutIndex2 = _interopRequireDefault(_logOutIndex);
	
	var _messagesIndex = __webpack_require__(222);
	
	var _messagesIndex2 = _interopRequireDefault(_messagesIndex);
	
	var _myAccountIndex = __webpack_require__(228);
	
	var _myAccountIndex2 = _interopRequireDefault(_myAccountIndex);
	
	var _preferencesIndex = __webpack_require__(233);
	
	var _preferencesIndex2 = _interopRequireDefault(_preferencesIndex);
	
	var _reverseWithdrawIndex = __webpack_require__(239);
	
	var _reverseWithdrawIndex2 = _interopRequireDefault(_reverseWithdrawIndex);
	
	//import Rewards from './rewards/index';
	
	var _withdrawIndex = __webpack_require__(245);
	
	var _withdrawIndex2 = _interopRequireDefault(_withdrawIndex);
	
	var view = function view(model, intents) {
	    return (0, _utilsElements.div)({ id: model.id, className: [_stylesCss2['default'].myAccount, model.show ? _stylesCss2['default'].show : ''].join(' ') }, (0, _utilsElements.button)({ className: _stylesCss2['default'].close, onclick: intents.toggle }, '×'), (0, _utilsElements.header)({ className: _stylesCss2['default'].title }, 'Hi ' + model.user.firstName + ',', (0, _utilsElements.span)({ className: _stylesCss2['default'].subtitle }, ' happy betting today')), _balanceIndex2['default'].createElement({ balance: model.user.balance, currency: model.user.currency }), _depositIndex2['default'].createElement({ version: 'withIcon' }), _balanceTransferIndex2['default'].createElement(), _withdrawIndex2['default'].createElement(), _reverseWithdrawIndex2['default'].createElement(), _myAccountIndex2['default'].createElement(), _preferencesIndex2['default'].createElement(),
	
	    //Rewards.createElement(),
	
	    _freeBetsIndex2['default'].createElement(), _messagesIndex2['default'].createElement(), _gamblingControlsIndex2['default'].createElement(), _logOutIndex2['default'].createElement({ onclick: model.intents.logout }), (0, _utilsElements.footer)({ className: _stylesCss2['default'].footer }, (0, _utilsElements.span)({}, 'Account ID: ' + model.user.accountNo)));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(151);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(151, function() {
				var newContent = __webpack_require__(151);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".my-account--1fOL3 {\n    background: #00143c;\n    padding: 16px 12px;\n    width: 320px;\n    position: absolute;\n    display: none;\n    top: 44px;\n    right: 0;\n}\n\n.show--1tdsP {\n    display: block;\n}\n\n.title--Ibth9 {\n    color: #fff;\n    font-size: 16px;\n    font-weight: bold;\n    line-height: 18px;\n}\n\n.subtitle--375Xf {\n    font-weight: normal;\n}\n\n.footer--3K3MT {\n    color: #00afff;\n    display: inline-block;\n    font-size: 10px;\n    padding-top: 16px;\n    width: 100%;\n}\n\n.right--qj_5- {\n    float: right;\n}\n\n.close--3nzdy {\n    background-color: transparent;\n    border: 0;\n    color: #e5e5e5;\n    cursor: pointer;\n    font-size: 30px;\n    height: 40px;\n    line-height: 30px;\n    margin: 0;\n    padding: 0;\n    position: absolute;\n    right: 0;\n    top: 0;\n    width: 40px;\n    outline: 0;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"my-account": "my-account--1fOL3",
		"myAccount": "my-account--1fOL3",
		"show": "show--1tdsP",
		"title": "title--Ibth9",
		"subtitle": "subtitle--375Xf",
		"footer": "footer--3K3MT",
		"right": "right--qj_5-",
		"close": "close--3nzdy"
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(153);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(154);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(155);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(156);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(159);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var Balance = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = Balance;
	module.exports = exports['default'];

/***/ },
/* 153 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'balance',
	    url: 'https://gaming.williamhill-pp1.com/session/user/balance?wallet=casino',
	    balances: [{ title: 'Main balance', amount: '200.00', currency: 'GBP', subtitle: 'Casino, Gaming & Sports' }]
	};
	
	/*{ title: 'Casino balance', amount: '£100.00', subtitle: 'Non-withdrawable funds', balances: [
	    { title: 'Buy in funds', amount: '£20.00'},
	    { title: 'Bonus funds', amount: '£80.00', balances: [
	        { title: 'Welcome bonus', amount: '£8.00' },
	        { title: 'Slots bonus', amount: '£8.00' },
	        { title: 'Free spins (Slots)', subtitle: '10 spins left', amount: '£8.00' },
	        { title: 'Free spins (Gladiator)', subtitle: '5 spins left', amount: '£8.00' },
	        { title: 'Roulette golden chips', subtitle: '8 x £100 chips', amount: '£8.00' }
	    ]}
	]},
	{ title: 'Total balance', amount: '£300.00' }*/
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 154 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        if (proposal && typeof proposal.balances !== 'undefined' && typeof proposal.currency !== 'undefined') {
	
	            var newBalances = model.balances.map(function (b) {
	                return Object.assign({}, b, { amount: proposal.balance, currency: proposal.currency });
	            });
	
	            delete model.balances;
	
	            model.balacnes = newBalances;
	        }
	
	        return model;
	    };
	};
	
	exports['default'] = receive;
	module.exports = exports['default'];

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(157);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var balanceElement = function balanceElement(balance) {
	    return (0, _utilsElements.div)({ className: _stylesCss2['default'].balance }, titleElement(balance.title, balance.subtitle), amountElement(balance.currency, balance.amount), balance.balances && balance.balances.length ? balance.balances.map(function (b) {
	        return balanceElement(b);
	    }) : '');
	};
	
	var titleElement = function titleElement(title, subtitle) {
	    return (0, _utilsElements.span)({ className: _stylesCss2['default'].title }, title, subtitle ? (0, _utilsElements.span)({ className: _stylesCss2['default'].subtitle }, subtitle) : '');
	};
	
	var amountElement = function amountElement(currency, amount) {
	    return (0, _utilsElements.span)({ className: _stylesCss2['default'].amount }, currency + amount);
	};
	
	var view = function view(model, intents) {
	    return (0, _utilsElements.div)({ id: model.id, className: _stylesCss2['default'].wrapper }, model.balances.map(function (b) {
	        return balanceElement(b);
	    }));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(158);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(158, function() {
				var newContent = __webpack_require__(158);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".wrapper--1wZiF {\n    background-color: rgba(255, 255, 255, 0.03);\n    border-radius: 2px;\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    margin-top: 12px;\n    padding: 0 12px;\n}\n\n.balance--1vlx6 {\n    border-bottom: 1px solid #00214f;\n    display: inline-block;\n    padding: 12px 0;\n    width: 100%;\n}\n\n.title--a0T_W {\n    color: #fff;\n    float: left;\n    font-size: 12px;\n    line-height: 15px;\n    width: 50%;\n}\n\n.subtitle--3MtKm {\n    color: #00afff;\n    display: block;\n    font-size: 10px;\n    font-style: italic;\n    line-height: 12px;\n}\n\n.amount--QkXJN {\n    color: #fff;\n    float: right;\n    font-size: 14px;\n    line-height: 18px;\n    text-align: right;\n    width: 50%;\n}\n\n.wrapper--1wZiF > .balance--1vlx6:first-child .amount--QkXJN {\n    font-size: 16px;\n}\n\n.wrapper--1wZiF > .balance--1vlx6:last-child {\n    border-bottom: 0;\n}\n\n.wrapper--1wZiF > .balance--1vlx6:last-child .title--a0T_W {\n    /*font-size: 16px;*/\n}\n\n.balance--1vlx6 > .balance--1vlx6 {\n    padding: 6px 0 6px 12px;\n    opacity: 0.7;\n    border-bottom: 0;\n}\n\n.balance--1vlx6 > .balance--1vlx6:first-child {\n    padding-top: 12px;\n}\n\n.balance--1vlx6 > .balance--1vlx6:last-child {\n    padding-bottom: 0px;\n}\n\n.balance--1vlx6 > .balance--1vlx6 .amount--QkXJN {\n    font-size: 12px;\n    line-height: 15px;\n}\n\n.balance--1vlx6 > .balance--1vlx6 > .balance--1vlx6 {\n    opacity: 0.6;\n    padding: 4px 0 4px 12px;\n    border-bottom: 0;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"wrapper": "wrapper--1wZiF",
		"balance": "balance--1vlx6",
		"title": "title--a0T_W",
		"subtitle": "subtitle--3MtKm",
		"amount": "amount--QkXJN"
	};

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var actions = function actions(propose) {};
	
	var intents = {
	
	    login: function login() {
	        console.log('loggin in...');
	    }
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(161);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(162);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(163);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(164);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(195);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var BalanceTransfer = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = BalanceTransfer;
	module.exports = exports['default'];

/***/ },
/* 161 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'transfer',
	    id: 'transfer',
	    isActive: false,
	    title: 'Balance Transfer',
	    modal: {
	        url: 'https://sports.williamhill-pp1.com/acc/en-gb/payment/transfer/transfer.html?source=CA',
	        //url: 'https://gaming.williamhill.com/session/account/transfer-funds?clientId=gamesSA&amp;returnUrl=https%3A%2F%2Fgames.williamhill.com',
	        show: true,
	        showHeader: false
	    }
	
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 162 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var _modalIframeIndex = __webpack_require__(179);
	
	var _modalIframeIndex2 = _interopRequireDefault(_modalIframeIndex);
	
	var view = function view(model) {
		return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
			onclick: _modalIframeIndex2['default'].intents.toggle(model.modal)
		}));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _modelJs = __webpack_require__(166);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _receiveJs = __webpack_require__(167);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _stateJs = __webpack_require__(168);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var _viewJs = __webpack_require__(169);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var MyAccountButton = (0, _utilsCreateElement2['default'])({
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = MyAccountButton;
	module.exports = exports['default'];

/***/ },
/* 166 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: '',
	    id: 'my-account-button',
	    isActive: false,
	    title: 'My Account Button'
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 167 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(170);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _iconIndex = __webpack_require__(172);
	
	var _iconIndex2 = _interopRequireDefault(_iconIndex);
	
	var view = function view(model) {
	    return (0, _utilsElements.button)({
	        id: model.id,
	        className: [_stylesCss2['default'].button, model.isActive ? _stylesCss2['default'].isActive : ''].join(' '),
	        onclick: model.onclick
	    }, _iconIndex2['default'].createElement({ className: _stylesCss2['default'].icon, name: model.icon }), model.title);
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(171);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(171, function() {
				var newContent = __webpack_require__(171);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".button--QjGvg {\n    background-color: transparent;\n    border: 0;\n    border-bottom: 1px solid rgba(0, 66, 125, 0.3);\n    color: #fff;\n    display: block;\n    font-size: 14px;\n    height: 44px;\n    line-height: 17px;\n    outline: 0;\n    padding: 12px 0 12px 40px;\n    position: relative;\n    text-align: left;\n    width: 100%;\n}\n\n.button--QjGvg:active,\n.is-active--1_V8m {\n    background-color: rgba(255, 255, 255, 0.1);\n}\n\n.button--QjGvg .icon--391MU {\n    left: 12px;\n    position: absolute;\n    top: 12px;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"button": "button--QjGvg",
		"is-active": "is-active--1_V8m",
		"isActive": "is-active--1_V8m",
		"icon": "icon--391MU"
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _modelJs = __webpack_require__(173);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _receiveJs = __webpack_require__(174);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(175);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var Icon = (0, _utilsCreateElement2['default'])({
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = Icon;
	module.exports = exports['default'];

/***/ },
/* 173 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    name: ''
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 174 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _styleCss = __webpack_require__(176);
	
	var _styleCss2 = _interopRequireDefault(_styleCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var view = function view(model) {
	    return (0, _utilsElements.span)({
	
	        className: [_styleCss2['default']['icon-' + model.name], model.className].join(' '),
	
	        style: model.style
	    }, model.children);
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(177);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(177, function() {
				var newContent = __webpack_require__(177);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, "@font-face {\n  font-family: 'whIconFont';\n  src: url(" + __webpack_require__(178) + ");\n}\n@font-face {\n  font-family: 'whIconFont';\n  src: url(\"data:application/x-font-ttf;charset=utf-8;base64,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BgoIAwYCBAcDAgQCAgICAgMCBQMTBAEBAgEBBQEBBQsGAwgDAgEDAwkTCQECAgsGBAgFAgEEAQELAgcPCEqLFxhJSkuLFwICAQEBAgMCAQECAQEGCAYBN28GCAEDBAINGQ4DBQMCAwEBAwEBBAIFCgUCBQICBAMBAwMSBAgMCQMJBAQIBAECAQEEAwsXCwUJBQECAQcNBgECAQICAQEBAQECAwILEwcFCgUBAQMGAwECBwEFDwYBBwcEAQMB/acBAQEBAiQBBQEGIAYDAgEGIgYBAgsBAQECAwIIGxkBAQMBAQIBBBwDAwcDRwEDAwEIAhsDAQMBAQ4GKgIBBAEBAgEBBAUBAQEBBgEBAQEFAwECAQMJAgIBARMBAQEBAQEBAgEEAgEOAQULEwEBAgEBAQEDAQQBAQEBAQEVAQEBHQMCAQIEHSEBAgECAQEDAgEDAQIFBAoBAQEEAQIEAQEGAVIGIAUBBAEBByALBQEGDAMCAwIBAx0EAgUCBA4EAwEDBg0GBAcDGgECAQEBAwEFBAoDAQcYCgEBAQICAw8EBQEBBAMFAwQTBQIBAQsBAQMCAQMbBgQDBQEBAwEBCwEBAwEBAwkBHgEBAQEBAQcFAQQICgEDAQMHBAEDAQELAggBAwIBAQEBAgYBDgQEBAUDBQIDAQEBAQQBAQEBDQEDAgEBBAEBAQEHAQEDDgQCBQMBBAEBCBgBBAEFAgUNAwEBAQQBCBIEAQEhAhoBCgEBKAEBAQEXFQEBAQE3AgMCAwUDBAcDAgQCBwUIKQgBAwECHgIhAQMuBQQsBQJEAQFCCisIBAIBAQQEBQkEAwYDBhsFBSkEBAYMBgIEAgQcAgcDByYHAwEBQQEBAQE8AQE1AwEEBQYCCgUEAQYBAh0DHwEBAQECAgIBAQEBAgICdwwbDQIDAgMDAgEDAQEDAQEBAQMBAQMBAQQIBAIFAgECAQIGAwIBAwIBAwEBAQEFBwIBBAICBwYxAQMHBAcDBAIFBAQDAgMBAgIEAgECAQYP6AEBBAIBAwECDAEWBQECAQIBAgMCAQMCBgsaBwEbBg0HAQIBAQECAQYLBQEBAQEBAQECBAEBAQECBgIaAgECAQQBAgIBAgEBCggIQQUKBQEBAQEECQQBAgEBCwIEAwUMBgQLAgIBBAcDBwwGAgQCAQEvAwUCAQMBAQQJBAIFAwsVCwMGAwkCAwIGBAwaDQIBAwYDAQIBAQEDAQEBAQEaAQEBAgELFQoBAgILFAoGAwEBAQEBCw4cDgIGAwEBAgYNBQoSCQMGAwMDBlUBAQEBCAEBAQEFBAECCA8IAgIEAgECBAICBgUgAQECAQcEAgMHAwEBAQECAQMJEQoBBAUFAwIJEgkBAQEBAgIBBQEBAQIDAhUEBgEFBQIBAQEMAgUDAQEDBgMBAQQBAgYeAgQCAQEBAgEDAQEBAQEBAQECAgEDAQEBBQcGAgMFAgIDAgEBAQEDAQEDAREBAQEBAQEBAgEBARYBAQEBAikFDAICAwIBAwICAwIBAQEFBAYBAQEBAQIBAQIEAwEFBAkBAgMBAgIBAQEgAQEBAgECAQEBAQIBAQEBAgEBAgEPAQEBAQEBAQEBAxcCBgYBBgIBAQQHBAEBAQQIAwECAgkBAQIBAgMCAQEBAQQCAgYCAQECAQERAQIBAQEDAwIEAQEBAQEBAQQCAQQCAgQCAgIIGwMFBAQHBAIDAgEBAQIFAgYMBQEBAQsDAgIHDgYDBAMJEQkEBwQEAggBBAIKFAsFCwUBAQEBAgEDBQMICgUJEwoCBQIEBAcVBAUCCxULAQIBBAkECREJBAEDDAIFAwUKBAcOBwECAwYECRMKBQICCQIHBQUKBAsVCwEBAQMCAgMCESMRBgQCCQwZDQYMBgkOBAECAgEBAQECAQECAgEGCwYECAQRIBEDBQEDBwlPAQEBAQEBAQFeBAENHA0DBgMCAwICBAILFwsFCQMGBDoBAQICAQECAgE2AQQECAMIDgcKFQsDAgQBAgUNGg0DCAQBAwEBAgEMGQ0BAwICAwIEBQIMBAICBAIHDwcMFgwCBQEBAgYGCxQLBg0HAgQCEQEBAQIBAwQHDggCBAIECAQDBQIBAgIECAQJEwkKBQEEAgYDBAgEAQIBAQUJBQIEAxUDBAIBAQEBAwIDBwMFDQcCAQEBAwYEBQoGAQEDBwgEAgIFCwUECAUCBQUCAQEDAgYOBgECAQQFBBEBAQEBCAYEAwMJBAMFAwEBAQEBAQQBAQECAwIBBQQbAQIBAgUBAgEBAQIFAgEBAQEDAQIBAQEBAwEBAQEBAQIBBAIBAQEBAQECAQIBAQ4DBwEBAQEHAwEBAgUCAwQVBQMBAwQCAQEEBgEDAQIEAQQGAwEDBx4BBgMBBAEDBwMPCgUBAQECDAEDAwUCAQEBAQIEAgMHAgMEBRgDBgMIDwcBAQEBAQEBAQEBAwEBAgEBAQEFCgQGDAYDAgMSBAYDDxwOAQEBAwECBAMCAwIMGg0DBwMDAQMQBQUFBw0GBg0FAQEBAgECBAIECQQJEQkDBAQKAQMEBxAHAQEBAQIBCA4IBgMCCgEEBQYNBwsTCAEBAQECAQYMBQkSCQIEAgQDAQUEAwYNBg8eEAMHBAICAgMGAxQoFAkFAQcFCwUMGAsCAwEBAgEBAQYNBwwYDAQFAwYsAgICAQQCAQIBAQEDHgUCBwEBAgEFCT0BBAEEAgIBAgUXCDoEAwUCEAQCAg0ZAS8BAgEGCwUDBAEBAQUBAQQMAgQSBQMBpQUBAwYECAQGCwMFBQEGKQQCAwMCCwIGCgUKEgcHJwMBAQIJCQEBARwaCg0DAwsFAQgXAwEBAwEHDAwZCTUNDA4BAgMxAQEBAQ4RCAcEARcdAwwHBgECAQIBEwIEAgILBAIDBwMJAUMBAQEBQQUTAQEFAQEBAQgBASMCAQQBAQMGAR4BDQEBAQECAQECAQICAQwFBQUDBgMEAgEBBQUEBxgFAwIDDQkGBAMCCAIDBhUIAgQCBwICBQMGBAICCAICBQQdBAIDBgIBCQIBAQECDQIDAgEDAQEBAgEEAg0BAQwZBgUBAwEBAgUDAQIBAgMBAQYQAgQCAQIDCAsBAwYNGgECAQEBCBQEAQEBAQgGFAEBAQEBAgEHBAMBAQkBCAgBAQEDDgMDBAMRAgYDBxEBAQEBAgECAwIEFwMCAgECBAINAQIBAQIBCwMJBQIEBwQDDgMBAQUGAgMbAw4BBAICAQMgAwEBAgMBAQIBBSIEAQIHAQUEBSIEAQIGJAYEAQEEAQICBCAEAQUBAgIDIAMHAwIFBgsGARcBAQMDBR4EAQIHAwMGPy0BAQEBAQH+SgwCAQMCFwIKBBcBAwMXBgIDXAEBAQEBAQUBAVoBAQEBiAEBRwIDAgMGAwEIAwICAgECAQUJBAUIAQQBBAcDAQkEAQUDAQQGAwQEBgEBAQICAQQBAQEFBgQGBgIDBQQCBgUKCgMCBAECBAIBAQIFAgIDAgIGAwMHBQMJBQQGAgEBAQEDAgICAwMCAQECAQEdQzcCAgICBAUBAQEBBAEDBQMDAQIEAwMEAwEGAwUCAQEEAwgIAwQGAwEDAQEDAgEBAQEDBQMBAQIEAwIBAQEBBAMHAwQCAQECAgcBBgIDAwgDAQIBBQECAwIHASMGAQUCAwYDAgYCAQkSCQYLBgECAgIGCwUBAQIBBggDAgUDAQMCBQEBBQQGAhhJS0qLFxdISwUKBQIDAQUjBwIFAQEIQko+AwUkKAIDAQECBAMCAQUKBAMGAwIFAgYLBQIFAQIDAQEBAQgCBwEMAgQBBAEBAgEEAQEBAgECAQIDBQMBAQEBAQEBAgMBBQwIBgkEAQMEBgMDBwIEDwYMFg4BBxEHAQUCAcQBAQEB/kABAwgBAQECAwEECgEHAx8BAgEGAwEOAQEEAQIBAw0CAgEBTAEBAwEFAQYBAwQCAQQBVgMDAQECAwEBAwkBAQEBAQEQAQEBAQIDAQIFBAEUARIFBQECAQEBAQEBAQEHAwEYGwMYAgECAQIBAQEBBwEBAQEJAgQGDgIFAgEOQAMFAgEBAQQBAQIBBwECBgMEBwMCBAQCBAwEYQQPBAIEBxgCBQcEIgMGBAECAQUQBQMDBA8EAgQBBAkDAgEEUwEBAQIBAQFCBAIFAQMGFQIBAwYCBBEDSAEBOQIFBAYVBQECAxEDBAgDAwMBBAQGBAQIBAQRAwIBAQECAggZCAcBAQEBAQECAQQBAgUJHAkBAQEBAgQCCBoJVwELBQEBBAcEZQUBAQELBAUIAQEBAQYDAQEBAgsBZQEBWQEBAQEDAQckBwEBAQIBAQEHJAgBAjYGIgcEAQEBAQECBgIGIgYJAQEEAgEDFAQCBwMBAQEHHgsBCQEUARQrAQEDAghuAQEvAQECAQECAgEFAgYFAgMMBAEDAgICAgoBAQEEAQICAgEBAQGJAQFvDgQCBwMDBQECAwECAQIKBwUEJwEFAgMEAQECDAQBAQIKA3wBASYBAX4BAQEBGgQGAwMCBRYOCQISAiMFQwEBAQEjBAQCAQIBAQEBAQMFAwEBAQEBAwQDAQEBAQcEBAUEBAkBEQMBAQMCAQQCAgUDAwIBAgECAgQCAQMBAQ4CHgIBBQkEAgMCAwIINx4BAQEBAgEBAwIDAgUKHQkEAgMC4gMFAwIBAQIBAQEDBQIBAQMBAQEDAQMFAwEHAgIBAQEBAQIBDwMDAgEBAQEBAQIDAyABAZ0ECAQBAQQEBgMBAQECFQIDAgQKBAMEBQEFAQICAgMGAwECBAMCAgEDAQIDAgIEAgULBQECAQMHBAgCBwwGAQEBAQMBAQEBAgEBAQEBAQEnAQICAQECAQEBAQMGAwIDBgcBAQEBEwUJBQEBAQEBAwYDBQoFAQMGBgYCGgEBAQEDAQEBAYMCBgMOHA4BAgEBAgEKEwkGDQYFAQICAQMBAQEBAwUNGg0BAgEBAgENGg1NECAQAwgEAwcDDx4QAgYCAgUBAQIFAQQFA04DBAMFAgECBQIFAgIBAQECBAIDAgQCAQEBAQECAwIBBgECAQECAS4BAQFGAQcEBxIKBAgEAgMCAgQCAQEBAREBAQEBAgECASEBASgBAgEBAgEBAwEBAQGvBAQGCRIIBgsGCxcLBAcDAwYBBAQKEgoHDgcBAgEBAgEBAwEFDAUHCwYBAQUJBQ0dDQkQCAEDAakBAQEBAgMEAgICAQEBAgECBQIxAwMCAQEEAQEBAQQBAwECAwEBAQEBAQEBAQECAQEEAi8ECAEGCAYBAwMGAgEBAQQHAwEBLwECAQEBAwECAQEBARIBAQECAUABAVIBAQEMGAwECgUBAgEBAgIBAQIBBAkEBAkEBQoGBwMBCwYCAQEBCBEJBQsFAQEBAQEECAQIDwgCBgkEBAIKEwoECQQIDwgEBwQFBQoCAQoTCgUKBgEEAgEDAgMGAwICCgULFAoCBgIGDBQEAwIMFwwCAQEDBwMGDAYDBgQUAwIDAwcDBQkFAQEBAgEEBwQCBgUXBQMCAgQCAwcDAQEDAQIGAgIFBA4CBAIBAQEBCAkBAgEBAQEBAQEBAgEBAwEBAwYDAQIECAcBKgEBAQEQAQECBQIBAQEBAQECAQIKEAEBCQIGAQEBAQQGBAEEAxYEBgIDCQQBAgEBAQECAQYNBwECAQEBAQUaBQcDAQQCAgUEBQwFAQEBBQIFBwMEDAUDBgMBAgQVAQIBBAUDBAkCAwICAwIBAQIFAgMHAwYMBQ8FBAMCAwIDBgQBAgEGDgYDAgMQAgYDAwICBQIFCgYICwUBAQIBBg0GCRMJAQYCBAYCBwUKFQsHDwgDBwIBCQQDCAQNGw4BBAIFAQIpAQEBAQEBIQcGCBEJBgsGAQEBAQIIEAcDBAIGCwYDBQEBAgUBAQIBBQICBg4GAQEBAQIID2YBAQECAQEBAQQCAQEDBAIcBAkEBAkFAQQDAQMCAgUCAgMBXAIFCA8IBAcECAwHAQEBAQQCECARBAMBAQMGESIRAgICBAkEAgMC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\") format('truetype');\n  font-weight: normal;\n  font-style: normal;\n}\n\n[class^=\"icon-\"], [class*=\" icon-\"] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'whIconFont' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-tote--103iu:before {\n  content: \"\\E91C\";\n}\n.icon-tv-specials--S-z7F:before {\n  content: \"\\E919\";\n}\n.icon-registration--2Dy73:before {\n  content: \"\\E91A\";\n}\n.icon-email--WBmo1:before {\n  content: \"\\E91B\";\n}\n.icon-cashIn_partial--37uEV:before {\n  content: \"\\E918\";\n}\n.icon-logout--1trYf:before {\n  content: \"\\E90C\";\n}\n.icon-rewards--3qiEb:before {\n  content: \"\\E921\";\n}\n.icon-bingo--2b7mw:before {\n  content: \"\\E914\";\n}\n.icon-games--2d5CZ:before {\n  content: \"\\E915\";\n}\n.icon-casino--2j7E-:before {\n  content: \"\\E916\";\n}\n.icon-macau--153rQ:before {\n  content: \"\\E917\";\n}\n.icon-scratchcards--1NVbp:before {\n  content: \"\\E91D\";\n}\n.icon-vegas--1vvgF:before {\n  content: \"\\E91E\";\n}\n.icon-live-casino--2v3zn:before {\n  content: \"\\E91F\";\n}\n.icon-poker--3AvJk:before {\n  content: \"\\E920\";\n}\n.icon-bet-boost-arrow--wEB9c:before {\n  content: \"\\E900\";\n}\n.icon-bet-boost--3PVfF:before {\n  content: \"\\E901\";\n}\n.icon-olympics--2PbgJ:before {\n  content: \"\\E902\";\n}\n.icon-swimming--RdXcT:before {\n  content: \"\\E903\";\n}\n.icon-loyalty-Points--2M4Ri:before {\n  content: \"\\E90D\";\n}\n.icon-contactus--3VCfQ:before {\n  content: \"\\E90B\";\n}\n.icon-judo--UenkC:before {\n  content: \"\\E90A\";\n}\n.icon-TopGames--HbibB:before {\n  content: \"\\E904\";\n}\n.icon-Roulette--v6Jwz:before {\n  content: \"\\E905\";\n}\n.icon-eSports--_zDkP:before {\n  content: \"\\E908\";\n}\n.icon-arrow-up-slim--1w7E2:before {\n  content: \"\\E906\";\n}\n.icon-arrow-down-slim--35wu_:before {\n  content: \"\\E907\";\n}\n.icon-close-circle--qWo-1:before {\n  content: \"\\E909\";\n}\n.icon-arrow-right-full--1P-oW:before {\n  content: \"\\E90E\";\n}\n.icon-edit-square--3P3tw:before {\n  content: \"\\E90F\";\n}\n.icon-lock--1hUGR:before {\n  content: \"\\E6A6\";\n}\n.icon-help-circle--2BexN:before {\n  content: \"\\E910\";\n}\n.icon-enhanced-odds--1itWs:before {\n  content: \"\\E911\";\n}\n.icon-in-play-refresh--3bLxv:before {\n  content: \"\\E912\";\n}\n.icon-sort-icon--3wpLK:before {\n  content: \"\\E913\";\n}\n.icon-delete-keyboard--sNUgx:before {\n  content: \"\\E922\";\n}\n.icon-trash--6XMU6:before {\n  content: \"\\E802\";\n}\n.icon-suspended_bet--1XGRG:before {\n  content: \"\\E800\";\n}\n.icon-open_bet--QsPYP:before {\n  content: \"\\E801\";\n}\n.icon-cash-in-dollar--28lP7:before {\n  content: \"\\E6BF\";\n}\n.icon-cash-in-euro--1xwoN:before {\n  content: \"\\E6C0\";\n}\n.icon-settled-bets--2nh1c:before {\n  content: \"\\E6C2\";\n}\n.icon-open-bets--2bY6V:before {\n  content: \"\\E6C3\";\n}\n.icon-cash-in-pound--26nn0:before {\n  content: \"\\E6BE\";\n}\n.icon-a-z--FliJU:before {\n  content: \"\\E6BD\";\n}\n.icon-streaming-event-notstarted--d_kVs:before {\n  content: \"\\E6BC\";\n}\n.icon-streaming-error-loggedin--kOgUl:before {\n  content: \"\\E6A8\";\n}\n.icon-streaming-error-available-found--Hk2KK:before {\n  content: \"\\E6B8\";\n}\n.icon-streaming-error-funds--2fIRz:before {\n  content: \"\\E6B9\";\n}\n.icon-streaming-error-geo--3yewp:before {\n  content: \"\\E6BA\";\n}\n.icon-streaming-error-start-over--2ijFP:before {\n  content: \"\\E6BB\";\n}\n.icon-betslip-down--2Fu1l:before {\n  content: \"\\E6B6\";\n}\n.icon-betslip-up--3KCzI:before {\n  content: \"\\E6B7\";\n}\n.icon-inplay-schedule--3fjeb:before {\n  content: \"\\E6B3\";\n}\n.icon-tv-guide--1Oe3J:before {\n  content: \"\\E6B4\";\n}\n.icon-tv-schedule--qXd8D:before {\n  content: \"\\E6B5\";\n}\n.icon-gambling-controls--Kci9R:before {\n  content: \"\\E6B2\";\n}\n.icon-refresh--2BC9k:before {\n  content: \"\\E6AF\";\n}\n.icon-hotbox--X7eRt:before {\n  content: \"\\E6B0\";\n}\n.icon-paralympics--dsdwq:before {\n  content: \"\\E6B1\";\n}\n.icon-betslip-error--3J-yo:before {\n  content: \"\\E6AD\";\n}\n.icon-error-notifications--3QKOK:before {\n  content: \"\\E6AE\";\n}\n.icon-jockey-silk--2yGcy:before {\n  content: \"\\E6AB\";\n}\n.icon-jokey-hat--21l81:before {\n  content: \"\\E6AC\";\n}\n.icon-plus--1JfBC:before {\n  content: \"\\E6A9\";\n}\n.icon-minus--9eePJ:before {\n  content: \"\\E6AA\";\n}\n.icon-streaming-close--mFT51:before {\n  content: \"\\E6A7\";\n}\n.icon-lock2--2j0qo:before {\n  content: \"\\E6C1\";\n}\n.icon-all-games--tlJER:before {\n  content: \"\\E6A5\";\n}\n.icon-back--9kVke:before {\n  content: \"\\E6A4\";\n}\n.icon-most-popular-bets2--slmcg:before {\n  content: \"\\E6A3\";\n}\n.icon-filter--14utq:before {\n  content: \"\\E6A1\";\n}\n.icon-error--3Hjm_:before {\n  content: \"\\E6A2\";\n}\n.icon-speedway--2k8rO:before {\n  content: \"\\E69D\";\n}\n.icon-cycling-virtual_icon--10bNG:before {\n  content: \"\\E69E\";\n}\n.icon-motorracing-virtual_icon--1lm0z:before {\n  content: \"\\E69F\";\n}\n.icon-speedway-virtual_icon--1zMXr:before {\n  content: \"\\E6A0\";\n}\n.icon-play_circle--3Tq-5:before {\n  content: \"\\E69C\";\n}\n.icon-cash-in--1YTaQ:before {\n  content: \"\\E69B\";\n}\n.icon-gaa-football--1c3a8:before {\n  content: \"\\E699\";\n}\n.icon-all-sports--2_bQ7:before {\n  content: \"\\E69A\";\n}\n.icon-feedback--USFTF:before {\n  content: \"\\E692\";\n}\n.icon-popup--1SCfd:before {\n  content: \"\\E693\";\n}\n.icon-radio--3YHK_:before {\n  content: \"\\E694\";\n}\n.icon-mute--3-5Ml:before {\n  content: \"\\E695\";\n}\n.icon-pause--3a05e:before {\n  content: \"\\E696\";\n}\n.icon-play--FaJqp:before {\n  content: \"\\E697\";\n}\n.icon-volume--K04ix:before {\n  content: \"\\E698\";\n}\n.icon-antepost--3muiK:before {\n  content: \"\\E690\";\n}\n.icon-stick--HsEyq:before {\n  content: \"\\E691\";\n}\n.icon-checkboxON--2DRTb:before {\n  content: \"\\E68F\";\n}\n.icon-checkboxOFF--2CNrl:before {\n  content: \"\\E68E\";\n}\n.icon-netbuster--3I0Yp:before {\n  content: \"\\E68D\";\n}\n.icon-phone--1jAyO:before {\n  content: \"\\E68B\";\n}\n.icon-chat--wfiGH:before {\n  content: \"\\E68C\";\n}\n.icon-and-over--3qSH5:before {\n  content: \"\\E600\";\n}\n.icon-account-details--1AS5W:before {\n  content: \"\\E601\";\n}\n.icon-account-nli--2k7nL:before {\n  content: \"\\E602\";\n}\n.icon-accountLI--2PLyp:before {\n  content: \"\\E603\";\n}\n.icon-american-football--1Z6UC:before {\n  content: \"\\E605\";\n}\n.icon-arcade--3ayPi:before {\n  content: \"\\E606\";\n}\n.icon-e-sports--2QtqN:before {\n  content: \"\\E606\";\n}\n.icon-archery--1F7rv:before {\n  content: \"\\E607\";\n}\n.icon-arrow-left--13sH_:before {\n  content: \"\\E608\";\n}\n.icon-arrow-right--2EkvM:before {\n  content: \"\\E609\";\n}\n.icon-athletics--Qeb8C:before {\n  content: \"\\E60A\";\n}\n.icon-australian-rules--3_zoJ:before {\n  content: \"\\E60B\";\n}\n.icon-badminton--1MUQN:before {\n  content: \"\\E60C\";\n}\n.icon-bandy--3mmyy:before {\n  content: \"\\E60D\";\n}\n.icon-baseball--1LuVM:before {\n  content: \"\\E60E\";\n}\n.icon-basketball--WHFx9:before {\n  content: \"\\E60F\";\n}\n.icon-beach-soccer--14xl1:before {\n  content: \"\\E610\";\n}\n.icon-beach-handball--oEG6C:before {\n  content: \"\\E611\";\n}\n.icon-beach-volleyball--2IOl1:before {\n  content: \"\\E612\";\n}\n.icon-bet-slip--1n2_o:before {\n  content: \"\\E613\";\n}\n.icon-bowling--3Sj5z:before {\n  content: \"\\E614\";\n}\n.icon-bowls--PZukj:before {\n  content: \"\\E615\";\n}\n.icon-boxing--3Zed0:before {\n  content: \"\\E616\";\n}\n.icon-calculator--1EGUj:before {\n  content: \"\\E617\";\n}\n.icon-calendar--3CMFS:before {\n  content: \"\\E618\";\n}\n.icon-canoeing--ZCve_:before {\n  content: \"\\E619\";\n}\n.icon-cards--XJ9zW:before {\n  content: \"\\E61A\";\n}\n.icon-click-and-buy--36w_5:before {\n  content: \"\\E61B\";\n}\n.icon-collapsed--3U97s:before {\n  content: \"\\E61C\";\n}\n.icon-competitions--1Vf-J:before {\n  content: \"\\E61D\";\n}\n.icon-coupons--15Gmq:before {\n  content: \"\\E61E\";\n}\n.icon-cricket--3wjTb:before {\n  content: \"\\E61F\";\n}\n.icon-cvv--Xhcpw:before {\n  content: \"\\E620\";\n}\n.icon-cycling--3zPCg:before {\n  content: \"\\E621\";\n}\n.icon-darts--xpmmo:before {\n  content: \"\\E622\";\n}\n.icon-deposit--umLKg:before {\n  content: \"\\E623\";\n}\n.icon-diving--S47nK:before {\n  content: \"\\E624\";\n}\n.icon-double-arrow-left--1mqEg:before {\n  content: \"\\E625\";\n}\n.icon-double-arrow-right--1BJFw:before {\n  content: \"\\E626\";\n}\n.icon-edit--1m5Go:before {\n  content: \"\\E627\";\n}\n.icon-equestrian--2TeH5:before {\n  content: \"\\E628\";\n}\n.icon-expanded--2yP7j:before {\n  content: \"\\E629\";\n}\n.icon-favs--_vSnU:before {\n  content: \"\\E62A\";\n}\n.icon-fencing--2z3ku:before {\n  content: \"\\E62B\";\n}\n.icon-financials--2TDDk:before {\n  content: \"\\E62C\";\n}\n.icon-fishing--1Cikv:before {\n  content: \"\\E62D\";\n}\n.icon-floorball--2MfQD:before {\n  content: \"\\E62E\";\n}\n.icon-football--2LPAn:before {\n  content: \"\\E62F\";\n}\n.icon-futsal--3acle:before {\n  content: \"\\E630\";\n}\n.icon-gamble-aware--2Dd2Y:before {\n  content: \"\\E631\";\n}\n.icon-gamblers-anonymous--3xUuA:before {\n  content: \"\\E632\";\n}\n.icon-gambling-therapy--3Ua6N:before {\n  content: \"\\E633\";\n}\n.icon-gamcare--1JJ8S:before {\n  content: \"\\E634\";\n}\n.icon-gauge--4rg7t:before {\n  content: \"\\E635\";\n}\n.icon-gbga--gn0Pg:before {\n  content: \"\\E636\";\n}\n.icon-golf--1W777:before {\n  content: \"\\E637\";\n}\n.icon-greyhounds--RiYfC:before {\n  content: \"\\E638\";\n}\n.icon-gymnastics--1sQqk:before {\n  content: \"\\E639\";\n}\n.icon-handball--Qn2fd:before {\n  content: \"\\E63A\";\n}\n.icon-help--Rmaw_:before {\n  content: \"\\E63B\";\n}\n.icon-highlights--38OOe:before {\n  content: \"\\E63C\";\n}\n.icon-hockey--1Z84I:before {\n  content: \"\\E63D\";\n}\n.icon-home--3PJ6I:before {\n  content: \"\\E63E\";\n}\n.icon-horse-racing--dcQfc:before {\n  content: \"\\E63F\";\n}\n.icon-gaa-hurling--2mSx8:before {\n  content: \"\\E640\";\n}\n.icon-ice-hockey--1jcgV:before {\n  content: \"\\E641\";\n}\n.icon-in-play--3c-e2:before {\n  content: \"\\E642\";\n}\n.icon-info--2fXIA:before {\n  content: \"\\E643\";\n}\n.icon-jockey--24Z4d:before {\n  content: \"\\E644\";\n}\n.icon-lacrosse--31gUV:before {\n  content: \"\\E645\";\n}\n.icon-list--15GhI:before {\n  content: \"\\E646\";\n}\n.icon-live-scores--1Wm_g:before {\n  content: \"\\E647\";\n}\n.icon-lotteries--2nyGg:before {\n  content: \"\\E648\";\n}\n.icon-lounge--1P9hw:before {\n  content: \"\\E649\";\n}\n.icon-maestro--28upM:before {\n  content: \"\\E64A\";\n}\n.icon-master-card--2JoMe:before {\n  content: \"\\E64B\";\n}\n.icon-messages--4qGBz:before {\n  content: \"\\E64C\";\n}\n.icon-more--2DUuD:before {\n  content: \"\\E64D\";\n}\n.icon-motor-racing--1POgJ:before {\n  content: \"\\E64E\";\n}\n.icon-motorbikes--10K0q:before {\n  content: \"\\E64F\";\n}\n.icon-netball--3Lgr5:before {\n  content: \"\\E650\";\n}\n.icon-neteller--2p49J:before {\n  content: \"\\E651\";\n}\n.icon-orienteering--1yHEX:before {\n  content: \"\\E653\";\n}\n.icon-pay-safe-card--153Cv:before {\n  content: \"\\E654\";\n}\n.icon-paypal--2e7Cw:before {\n  content: \"\\E655\";\n}\n.icon-pending--3OJmO:before {\n  content: \"\\E656\";\n}\n.icon-penthathlon--3KSRG:before {\n  content: \"\\E657\";\n}\n.icon-politics--2BeKB:before {\n  content: \"\\E658\";\n}\n.icon-pool--3UgrL:before {\n  content: \"\\E659\";\n}\n.icon-promotions--2V4z5:before {\n  content: \"\\E65A\";\n}\n.icon-remove--1gXsn:before {\n  content: \"\\E65B\";\n}\n.icon-responsible-gambling-trust--3cpUj:before {\n  content: \"\\E65C\";\n}\n.icon-results--2sa5w:before {\n  content: \"\\E65D\";\n}\n.icon-reverse-withdrawal--3dEe7:before {\n  content: \"\\E65E\";\n}\n.icon-rowing--2py6_:before {\n  content: \"\\E65F\";\n}\n.icon-rugby-league--2V0D0:before {\n  content: \"\\E660\";\n}\n.icon-rugby-union--nntKs:before {\n  content: \"\\E661\";\n}\n.icon-rules--1Uvz8:before {\n  content: \"\\E662\";\n}\n.icon-sailing--GhJG6:before {\n  content: \"\\E663\";\n}\n.icon-scratch--1u1TJ:before {\n  content: \"\\E664\";\n}\n.icon-search--1IekA:before {\n  content: \"\\E665\";\n}\n.icon-select--3q7tD:before {\n  content: \"\\E666\";\n}\n.icon-settings--1Lb4H:before {\n  content: \"\\E667\";\n}\n.icon-shooting--2bOk0:before {\n  content: \"\\E668\";\n}\n.icon-skill--3bR0w:before {\n  content: \"\\E669\";\n}\n.icon-skrill--t3Kae:before {\n  content: \"\\E66A\";\n}\n.icon-slot--6fb4H:before {\n  content: \"\\E66B\";\n}\n.icon-snooker--1pR3B:before {\n  content: \"\\E66C\";\n}\n.icon-softball--2EymK:before {\n  content: \"\\E66D\";\n}\n.icon-specials--1K3l8:before {\n  content: \"\\E66E\";\n}\n.icon-top-bets--1xJcm:before {\n  content: \"\\E66E\";\n}\n.icon-spinner--1aKyU:before {\n  content: \"\\E66F\";\n}\n.icon-squash--t0gBb:before {\n  content: \"\\E670\";\n}\n.icon-stats-1--1MgW1:before {\n  content: \"\\E671\";\n}\n.icon-stats-2--1M0DE:before {\n  content: \"\\E672\";\n}\n.icon-streaming--15wHS:before {\n  content: \"\\E673\";\n}\n.icon-synchronised-swimming--1ormO:before {\n  content: \"\\E674\";\n}\n.icon-t-shirt--2U-1N:before {\n  content: \"\\E675\";\n}\n.icon-table-tennis--37B5h:before {\n  content: \"\\E676\";\n}\n.icon-table--gX0AI:before {\n  content: \"\\E677\";\n}\n.icon-taekwondo--39vqU:before {\n  content: \"\\E678\";\n}\n.icon-tennis--3fLmD:before {\n  content: \"\\E679\";\n}\n.icon-tick--35YWA:before {\n  content: \"\\E67A\";\n}\n.icon-tip-advisor--Go0tL:before {\n  content: \"\\E67B\";\n}\n.icon-transactions--1FcWb:before {\n  content: \"\\E67C\";\n}\n.icon-transfer--17CwY:before {\n  content: \"\\E67D\";\n}\n.icon-triathlon--3WN-x:before {\n  content: \"\\E67E\";\n}\n.icon-tv--etbxX:before {\n  content: \"\\E67F\";\n}\n.icon-ufc--2Uu1-:before {\n  content: \"\\E680\";\n}\n.icon-ufc-mma--1flNi:before {\n  content: \"\\E680\";\n}\n.icon-ukash--khd5k:before {\n  content: \"\\E681\";\n}\n.icon-virtual-world--2MznD:before {\n  content: \"\\E682\";\n}\n.icon-visa--1B1lw:before {\n  content: \"\\E683\";\n}\n.icon-volleyball--1b1U9:before {\n  content: \"\\E684\";\n}\n.icon-water-polo--3JM7C:before {\n  content: \"\\E685\";\n}\n.icon-weightlifting--2Xq03:before {\n  content: \"\\E686\";\n}\n.icon-whtv--11C9E:before {\n  content: \"\\E687\";\n}\n.icon-winter-sports--3w58t:before {\n  content: \"\\E688\";\n}\n.icon-withdraw--1d4i5:before {\n  content: \"\\E689\";\n}\n.icon-wrestling--3dYhh:before {\n  content: \"\\E68A\";\n}\n.icon-x--OVf_R:before {\n  content: \"\\E6C4\";\n}\n\n", ""]);
	
	// exports
	exports.locals = {
		"icon-tote": "icon-tote--103iu",
		"iconTote": "icon-tote--103iu",
		"icon-tv-specials": "icon-tv-specials--S-z7F",
		"iconTvSpecials": "icon-tv-specials--S-z7F",
		"icon-registration": "icon-registration--2Dy73",
		"iconRegistration": "icon-registration--2Dy73",
		"icon-email": "icon-email--WBmo1",
		"iconEmail": "icon-email--WBmo1",
		"icon-cashIn_partial": "icon-cashIn_partial--37uEV",
		"iconCashIn_partial": "icon-cashIn_partial--37uEV",
		"icon-logout": "icon-logout--1trYf",
		"iconLogout": "icon-logout--1trYf",
		"icon-rewards": "icon-rewards--3qiEb",
		"iconRewards": "icon-rewards--3qiEb",
		"icon-bingo": "icon-bingo--2b7mw",
		"iconBingo": "icon-bingo--2b7mw",
		"icon-games": "icon-games--2d5CZ",
		"iconGames": "icon-games--2d5CZ",
		"icon-casino": "icon-casino--2j7E-",
		"iconCasino": "icon-casino--2j7E-",
		"icon-macau": "icon-macau--153rQ",
		"iconMacau": "icon-macau--153rQ",
		"icon-scratchcards": "icon-scratchcards--1NVbp",
		"iconScratchcards": "icon-scratchcards--1NVbp",
		"icon-vegas": "icon-vegas--1vvgF",
		"iconVegas": "icon-vegas--1vvgF",
		"icon-live-casino": "icon-live-casino--2v3zn",
		"iconLiveCasino": "icon-live-casino--2v3zn",
		"icon-poker": "icon-poker--3AvJk",
		"iconPoker": "icon-poker--3AvJk",
		"icon-bet-boost-arrow": "icon-bet-boost-arrow--wEB9c",
		"iconBetBoostArrow": "icon-bet-boost-arrow--wEB9c",
		"icon-bet-boost": "icon-bet-boost--3PVfF",
		"iconBetBoost": "icon-bet-boost--3PVfF",
		"icon-olympics": "icon-olympics--2PbgJ",
		"iconOlympics": "icon-olympics--2PbgJ",
		"icon-swimming": "icon-swimming--RdXcT",
		"iconSwimming": "icon-swimming--RdXcT",
		"icon-loyalty-Points": "icon-loyalty-Points--2M4Ri",
		"iconLoyaltyPoints": "icon-loyalty-Points--2M4Ri",
		"icon-contactus": "icon-contactus--3VCfQ",
		"iconContactus": "icon-contactus--3VCfQ",
		"icon-judo": "icon-judo--UenkC",
		"iconJudo": "icon-judo--UenkC",
		"icon-TopGames": "icon-TopGames--HbibB",
		"iconTopGames": "icon-TopGames--HbibB",
		"icon-Roulette": "icon-Roulette--v6Jwz",
		"iconRoulette": "icon-Roulette--v6Jwz",
		"icon-eSports": "icon-eSports--_zDkP",
		"iconESports": "icon-eSports--_zDkP",
		"icon-arrow-up-slim": "icon-arrow-up-slim--1w7E2",
		"iconArrowUpSlim": "icon-arrow-up-slim--1w7E2",
		"icon-arrow-down-slim": "icon-arrow-down-slim--35wu_",
		"iconArrowDownSlim": "icon-arrow-down-slim--35wu_",
		"icon-close-circle": "icon-close-circle--qWo-1",
		"iconCloseCircle": "icon-close-circle--qWo-1",
		"icon-arrow-right-full": "icon-arrow-right-full--1P-oW",
		"iconArrowRightFull": "icon-arrow-right-full--1P-oW",
		"icon-edit-square": "icon-edit-square--3P3tw",
		"iconEditSquare": "icon-edit-square--3P3tw",
		"icon-lock": "icon-lock--1hUGR",
		"iconLock": "icon-lock--1hUGR",
		"icon-help-circle": "icon-help-circle--2BexN",
		"iconHelpCircle": "icon-help-circle--2BexN",
		"icon-enhanced-odds": "icon-enhanced-odds--1itWs",
		"iconEnhancedOdds": "icon-enhanced-odds--1itWs",
		"icon-in-play-refresh": "icon-in-play-refresh--3bLxv",
		"iconInPlayRefresh": "icon-in-play-refresh--3bLxv",
		"icon-sort-icon": "icon-sort-icon--3wpLK",
		"iconSortIcon": "icon-sort-icon--3wpLK",
		"icon-delete-keyboard": "icon-delete-keyboard--sNUgx",
		"iconDeleteKeyboard": "icon-delete-keyboard--sNUgx",
		"icon-trash": "icon-trash--6XMU6",
		"iconTrash": "icon-trash--6XMU6",
		"icon-suspended_bet": "icon-suspended_bet--1XGRG",
		"iconSuspended_bet": "icon-suspended_bet--1XGRG",
		"icon-open_bet": "icon-open_bet--QsPYP",
		"iconOpen_bet": "icon-open_bet--QsPYP",
		"icon-cash-in-dollar": "icon-cash-in-dollar--28lP7",
		"iconCashInDollar": "icon-cash-in-dollar--28lP7",
		"icon-cash-in-euro": "icon-cash-in-euro--1xwoN",
		"iconCashInEuro": "icon-cash-in-euro--1xwoN",
		"icon-settled-bets": "icon-settled-bets--2nh1c",
		"iconSettledBets": "icon-settled-bets--2nh1c",
		"icon-open-bets": "icon-open-bets--2bY6V",
		"iconOpenBets": "icon-open-bets--2bY6V",
		"icon-cash-in-pound": "icon-cash-in-pound--26nn0",
		"iconCashInPound": "icon-cash-in-pound--26nn0",
		"icon-a-z": "icon-a-z--FliJU",
		"iconAZ": "icon-a-z--FliJU",
		"icon-streaming-event-notstarted": "icon-streaming-event-notstarted--d_kVs",
		"iconStreamingEventNotstarted": "icon-streaming-event-notstarted--d_kVs",
		"icon-streaming-error-loggedin": "icon-streaming-error-loggedin--kOgUl",
		"iconStreamingErrorLoggedin": "icon-streaming-error-loggedin--kOgUl",
		"icon-streaming-error-available-found": "icon-streaming-error-available-found--Hk2KK",
		"iconStreamingErrorAvailableFound": "icon-streaming-error-available-found--Hk2KK",
		"icon-streaming-error-funds": "icon-streaming-error-funds--2fIRz",
		"iconStreamingErrorFunds": "icon-streaming-error-funds--2fIRz",
		"icon-streaming-error-geo": "icon-streaming-error-geo--3yewp",
		"iconStreamingErrorGeo": "icon-streaming-error-geo--3yewp",
		"icon-streaming-error-start-over": "icon-streaming-error-start-over--2ijFP",
		"iconStreamingErrorStartOver": "icon-streaming-error-start-over--2ijFP",
		"icon-betslip-down": "icon-betslip-down--2Fu1l",
		"iconBetslipDown": "icon-betslip-down--2Fu1l",
		"icon-betslip-up": "icon-betslip-up--3KCzI",
		"iconBetslipUp": "icon-betslip-up--3KCzI",
		"icon-inplay-schedule": "icon-inplay-schedule--3fjeb",
		"iconInplaySchedule": "icon-inplay-schedule--3fjeb",
		"icon-tv-guide": "icon-tv-guide--1Oe3J",
		"iconTvGuide": "icon-tv-guide--1Oe3J",
		"icon-tv-schedule": "icon-tv-schedule--qXd8D",
		"iconTvSchedule": "icon-tv-schedule--qXd8D",
		"icon-gambling-controls": "icon-gambling-controls--Kci9R",
		"iconGamblingControls": "icon-gambling-controls--Kci9R",
		"icon-refresh": "icon-refresh--2BC9k",
		"iconRefresh": "icon-refresh--2BC9k",
		"icon-hotbox": "icon-hotbox--X7eRt",
		"iconHotbox": "icon-hotbox--X7eRt",
		"icon-paralympics": "icon-paralympics--dsdwq",
		"iconParalympics": "icon-paralympics--dsdwq",
		"icon-betslip-error": "icon-betslip-error--3J-yo",
		"iconBetslipError": "icon-betslip-error--3J-yo",
		"icon-error-notifications": "icon-error-notifications--3QKOK",
		"iconErrorNotifications": "icon-error-notifications--3QKOK",
		"icon-jockey-silk": "icon-jockey-silk--2yGcy",
		"iconJockeySilk": "icon-jockey-silk--2yGcy",
		"icon-jokey-hat": "icon-jokey-hat--21l81",
		"iconJokeyHat": "icon-jokey-hat--21l81",
		"icon-plus": "icon-plus--1JfBC",
		"iconPlus": "icon-plus--1JfBC",
		"icon-minus": "icon-minus--9eePJ",
		"iconMinus": "icon-minus--9eePJ",
		"icon-streaming-close": "icon-streaming-close--mFT51",
		"iconStreamingClose": "icon-streaming-close--mFT51",
		"icon-lock2": "icon-lock2--2j0qo",
		"iconLock2": "icon-lock2--2j0qo",
		"icon-all-games": "icon-all-games--tlJER",
		"iconAllGames": "icon-all-games--tlJER",
		"icon-back": "icon-back--9kVke",
		"iconBack": "icon-back--9kVke",
		"icon-most-popular-bets2": "icon-most-popular-bets2--slmcg",
		"iconMostPopularBets2": "icon-most-popular-bets2--slmcg",
		"icon-filter": "icon-filter--14utq",
		"iconFilter": "icon-filter--14utq",
		"icon-error": "icon-error--3Hjm_",
		"iconError": "icon-error--3Hjm_",
		"icon-speedway": "icon-speedway--2k8rO",
		"iconSpeedway": "icon-speedway--2k8rO",
		"icon-cycling-virtual_icon": "icon-cycling-virtual_icon--10bNG",
		"iconCyclingVirtual_icon": "icon-cycling-virtual_icon--10bNG",
		"icon-motorracing-virtual_icon": "icon-motorracing-virtual_icon--1lm0z",
		"iconMotorracingVirtual_icon": "icon-motorracing-virtual_icon--1lm0z",
		"icon-speedway-virtual_icon": "icon-speedway-virtual_icon--1zMXr",
		"iconSpeedwayVirtual_icon": "icon-speedway-virtual_icon--1zMXr",
		"icon-play_circle": "icon-play_circle--3Tq-5",
		"iconPlay_circle": "icon-play_circle--3Tq-5",
		"icon-cash-in": "icon-cash-in--1YTaQ",
		"iconCashIn": "icon-cash-in--1YTaQ",
		"icon-gaa-football": "icon-gaa-football--1c3a8",
		"iconGaaFootball": "icon-gaa-football--1c3a8",
		"icon-all-sports": "icon-all-sports--2_bQ7",
		"iconAllSports": "icon-all-sports--2_bQ7",
		"icon-feedback": "icon-feedback--USFTF",
		"iconFeedback": "icon-feedback--USFTF",
		"icon-popup": "icon-popup--1SCfd",
		"iconPopup": "icon-popup--1SCfd",
		"icon-radio": "icon-radio--3YHK_",
		"iconRadio": "icon-radio--3YHK_",
		"icon-mute": "icon-mute--3-5Ml",
		"iconMute": "icon-mute--3-5Ml",
		"icon-pause": "icon-pause--3a05e",
		"iconPause": "icon-pause--3a05e",
		"icon-play": "icon-play--FaJqp",
		"iconPlay": "icon-play--FaJqp",
		"icon-volume": "icon-volume--K04ix",
		"iconVolume": "icon-volume--K04ix",
		"icon-antepost": "icon-antepost--3muiK",
		"iconAntepost": "icon-antepost--3muiK",
		"icon-stick": "icon-stick--HsEyq",
		"iconStick": "icon-stick--HsEyq",
		"icon-checkboxON": "icon-checkboxON--2DRTb",
		"iconCheckboxON": "icon-checkboxON--2DRTb",
		"icon-checkboxOFF": "icon-checkboxOFF--2CNrl",
		"iconCheckboxOFF": "icon-checkboxOFF--2CNrl",
		"icon-netbuster": "icon-netbuster--3I0Yp",
		"iconNetbuster": "icon-netbuster--3I0Yp",
		"icon-phone": "icon-phone--1jAyO",
		"iconPhone": "icon-phone--1jAyO",
		"icon-chat": "icon-chat--wfiGH",
		"iconChat": "icon-chat--wfiGH",
		"icon-and-over": "icon-and-over--3qSH5",
		"iconAndOver": "icon-and-over--3qSH5",
		"icon-account-details": "icon-account-details--1AS5W",
		"iconAccountDetails": "icon-account-details--1AS5W",
		"icon-account-nli": "icon-account-nli--2k7nL",
		"iconAccountNli": "icon-account-nli--2k7nL",
		"icon-accountLI": "icon-accountLI--2PLyp",
		"iconAccountLI": "icon-accountLI--2PLyp",
		"icon-american-football": "icon-american-football--1Z6UC",
		"iconAmericanFootball": "icon-american-football--1Z6UC",
		"icon-arcade": "icon-arcade--3ayPi",
		"iconArcade": "icon-arcade--3ayPi",
		"icon-e-sports": "icon-e-sports--2QtqN",
		"iconESports": "icon-e-sports--2QtqN",
		"icon-archery": "icon-archery--1F7rv",
		"iconArchery": "icon-archery--1F7rv",
		"icon-arrow-left": "icon-arrow-left--13sH_",
		"iconArrowLeft": "icon-arrow-left--13sH_",
		"icon-arrow-right": "icon-arrow-right--2EkvM",
		"iconArrowRight": "icon-arrow-right--2EkvM",
		"icon-athletics": "icon-athletics--Qeb8C",
		"iconAthletics": "icon-athletics--Qeb8C",
		"icon-australian-rules": "icon-australian-rules--3_zoJ",
		"iconAustralianRules": "icon-australian-rules--3_zoJ",
		"icon-badminton": "icon-badminton--1MUQN",
		"iconBadminton": "icon-badminton--1MUQN",
		"icon-bandy": "icon-bandy--3mmyy",
		"iconBandy": "icon-bandy--3mmyy",
		"icon-baseball": "icon-baseball--1LuVM",
		"iconBaseball": "icon-baseball--1LuVM",
		"icon-basketball": "icon-basketball--WHFx9",
		"iconBasketball": "icon-basketball--WHFx9",
		"icon-beach-soccer": "icon-beach-soccer--14xl1",
		"iconBeachSoccer": "icon-beach-soccer--14xl1",
		"icon-beach-handball": "icon-beach-handball--oEG6C",
		"iconBeachHandball": "icon-beach-handball--oEG6C",
		"icon-beach-volleyball": "icon-beach-volleyball--2IOl1",
		"iconBeachVolleyball": "icon-beach-volleyball--2IOl1",
		"icon-bet-slip": "icon-bet-slip--1n2_o",
		"iconBetSlip": "icon-bet-slip--1n2_o",
		"icon-bowling": "icon-bowling--3Sj5z",
		"iconBowling": "icon-bowling--3Sj5z",
		"icon-bowls": "icon-bowls--PZukj",
		"iconBowls": "icon-bowls--PZukj",
		"icon-boxing": "icon-boxing--3Zed0",
		"iconBoxing": "icon-boxing--3Zed0",
		"icon-calculator": "icon-calculator--1EGUj",
		"iconCalculator": "icon-calculator--1EGUj",
		"icon-calendar": "icon-calendar--3CMFS",
		"iconCalendar": "icon-calendar--3CMFS",
		"icon-canoeing": "icon-canoeing--ZCve_",
		"iconCanoeing": "icon-canoeing--ZCve_",
		"icon-cards": "icon-cards--XJ9zW",
		"iconCards": "icon-cards--XJ9zW",
		"icon-click-and-buy": "icon-click-and-buy--36w_5",
		"iconClickAndBuy": "icon-click-and-buy--36w_5",
		"icon-collapsed": "icon-collapsed--3U97s",
		"iconCollapsed": "icon-collapsed--3U97s",
		"icon-competitions": "icon-competitions--1Vf-J",
		"iconCompetitions": "icon-competitions--1Vf-J",
		"icon-coupons": "icon-coupons--15Gmq",
		"iconCoupons": "icon-coupons--15Gmq",
		"icon-cricket": "icon-cricket--3wjTb",
		"iconCricket": "icon-cricket--3wjTb",
		"icon-cvv": "icon-cvv--Xhcpw",
		"iconCvv": "icon-cvv--Xhcpw",
		"icon-cycling": "icon-cycling--3zPCg",
		"iconCycling": "icon-cycling--3zPCg",
		"icon-darts": "icon-darts--xpmmo",
		"iconDarts": "icon-darts--xpmmo",
		"icon-deposit": "icon-deposit--umLKg",
		"iconDeposit": "icon-deposit--umLKg",
		"icon-diving": "icon-diving--S47nK",
		"iconDiving": "icon-diving--S47nK",
		"icon-double-arrow-left": "icon-double-arrow-left--1mqEg",
		"iconDoubleArrowLeft": "icon-double-arrow-left--1mqEg",
		"icon-double-arrow-right": "icon-double-arrow-right--1BJFw",
		"iconDoubleArrowRight": "icon-double-arrow-right--1BJFw",
		"icon-edit": "icon-edit--1m5Go",
		"iconEdit": "icon-edit--1m5Go",
		"icon-equestrian": "icon-equestrian--2TeH5",
		"iconEquestrian": "icon-equestrian--2TeH5",
		"icon-expanded": "icon-expanded--2yP7j",
		"iconExpanded": "icon-expanded--2yP7j",
		"icon-favs": "icon-favs--_vSnU",
		"iconFavs": "icon-favs--_vSnU",
		"icon-fencing": "icon-fencing--2z3ku",
		"iconFencing": "icon-fencing--2z3ku",
		"icon-financials": "icon-financials--2TDDk",
		"iconFinancials": "icon-financials--2TDDk",
		"icon-fishing": "icon-fishing--1Cikv",
		"iconFishing": "icon-fishing--1Cikv",
		"icon-floorball": "icon-floorball--2MfQD",
		"iconFloorball": "icon-floorball--2MfQD",
		"icon-football": "icon-football--2LPAn",
		"iconFootball": "icon-football--2LPAn",
		"icon-futsal": "icon-futsal--3acle",
		"iconFutsal": "icon-futsal--3acle",
		"icon-gamble-aware": "icon-gamble-aware--2Dd2Y",
		"iconGambleAware": "icon-gamble-aware--2Dd2Y",
		"icon-gamblers-anonymous": "icon-gamblers-anonymous--3xUuA",
		"iconGamblersAnonymous": "icon-gamblers-anonymous--3xUuA",
		"icon-gambling-therapy": "icon-gambling-therapy--3Ua6N",
		"iconGamblingTherapy": "icon-gambling-therapy--3Ua6N",
		"icon-gamcare": "icon-gamcare--1JJ8S",
		"iconGamcare": "icon-gamcare--1JJ8S",
		"icon-gauge": "icon-gauge--4rg7t",
		"iconGauge": "icon-gauge--4rg7t",
		"icon-gbga": "icon-gbga--gn0Pg",
		"iconGbga": "icon-gbga--gn0Pg",
		"icon-golf": "icon-golf--1W777",
		"iconGolf": "icon-golf--1W777",
		"icon-greyhounds": "icon-greyhounds--RiYfC",
		"iconGreyhounds": "icon-greyhounds--RiYfC",
		"icon-gymnastics": "icon-gymnastics--1sQqk",
		"iconGymnastics": "icon-gymnastics--1sQqk",
		"icon-handball": "icon-handball--Qn2fd",
		"iconHandball": "icon-handball--Qn2fd",
		"icon-help": "icon-help--Rmaw_",
		"iconHelp": "icon-help--Rmaw_",
		"icon-highlights": "icon-highlights--38OOe",
		"iconHighlights": "icon-highlights--38OOe",
		"icon-hockey": "icon-hockey--1Z84I",
		"iconHockey": "icon-hockey--1Z84I",
		"icon-home": "icon-home--3PJ6I",
		"iconHome": "icon-home--3PJ6I",
		"icon-horse-racing": "icon-horse-racing--dcQfc",
		"iconHorseRacing": "icon-horse-racing--dcQfc",
		"icon-gaa-hurling": "icon-gaa-hurling--2mSx8",
		"iconGaaHurling": "icon-gaa-hurling--2mSx8",
		"icon-ice-hockey": "icon-ice-hockey--1jcgV",
		"iconIceHockey": "icon-ice-hockey--1jcgV",
		"icon-in-play": "icon-in-play--3c-e2",
		"iconInPlay": "icon-in-play--3c-e2",
		"icon-info": "icon-info--2fXIA",
		"iconInfo": "icon-info--2fXIA",
		"icon-jockey": "icon-jockey--24Z4d",
		"iconJockey": "icon-jockey--24Z4d",
		"icon-lacrosse": "icon-lacrosse--31gUV",
		"iconLacrosse": "icon-lacrosse--31gUV",
		"icon-list": "icon-list--15GhI",
		"iconList": "icon-list--15GhI",
		"icon-live-scores": "icon-live-scores--1Wm_g",
		"iconLiveScores": "icon-live-scores--1Wm_g",
		"icon-lotteries": "icon-lotteries--2nyGg",
		"iconLotteries": "icon-lotteries--2nyGg",
		"icon-lounge": "icon-lounge--1P9hw",
		"iconLounge": "icon-lounge--1P9hw",
		"icon-maestro": "icon-maestro--28upM",
		"iconMaestro": "icon-maestro--28upM",
		"icon-master-card": "icon-master-card--2JoMe",
		"iconMasterCard": "icon-master-card--2JoMe",
		"icon-messages": "icon-messages--4qGBz",
		"iconMessages": "icon-messages--4qGBz",
		"icon-more": "icon-more--2DUuD",
		"iconMore": "icon-more--2DUuD",
		"icon-motor-racing": "icon-motor-racing--1POgJ",
		"iconMotorRacing": "icon-motor-racing--1POgJ",
		"icon-motorbikes": "icon-motorbikes--10K0q",
		"iconMotorbikes": "icon-motorbikes--10K0q",
		"icon-netball": "icon-netball--3Lgr5",
		"iconNetball": "icon-netball--3Lgr5",
		"icon-neteller": "icon-neteller--2p49J",
		"iconNeteller": "icon-neteller--2p49J",
		"icon-orienteering": "icon-orienteering--1yHEX",
		"iconOrienteering": "icon-orienteering--1yHEX",
		"icon-pay-safe-card": "icon-pay-safe-card--153Cv",
		"iconPaySafeCard": "icon-pay-safe-card--153Cv",
		"icon-paypal": "icon-paypal--2e7Cw",
		"iconPaypal": "icon-paypal--2e7Cw",
		"icon-pending": "icon-pending--3OJmO",
		"iconPending": "icon-pending--3OJmO",
		"icon-penthathlon": "icon-penthathlon--3KSRG",
		"iconPenthathlon": "icon-penthathlon--3KSRG",
		"icon-politics": "icon-politics--2BeKB",
		"iconPolitics": "icon-politics--2BeKB",
		"icon-pool": "icon-pool--3UgrL",
		"iconPool": "icon-pool--3UgrL",
		"icon-promotions": "icon-promotions--2V4z5",
		"iconPromotions": "icon-promotions--2V4z5",
		"icon-remove": "icon-remove--1gXsn",
		"iconRemove": "icon-remove--1gXsn",
		"icon-responsible-gambling-trust": "icon-responsible-gambling-trust--3cpUj",
		"iconResponsibleGamblingTrust": "icon-responsible-gambling-trust--3cpUj",
		"icon-results": "icon-results--2sa5w",
		"iconResults": "icon-results--2sa5w",
		"icon-reverse-withdrawal": "icon-reverse-withdrawal--3dEe7",
		"iconReverseWithdrawal": "icon-reverse-withdrawal--3dEe7",
		"icon-rowing": "icon-rowing--2py6_",
		"iconRowing": "icon-rowing--2py6_",
		"icon-rugby-league": "icon-rugby-league--2V0D0",
		"iconRugbyLeague": "icon-rugby-league--2V0D0",
		"icon-rugby-union": "icon-rugby-union--nntKs",
		"iconRugbyUnion": "icon-rugby-union--nntKs",
		"icon-rules": "icon-rules--1Uvz8",
		"iconRules": "icon-rules--1Uvz8",
		"icon-sailing": "icon-sailing--GhJG6",
		"iconSailing": "icon-sailing--GhJG6",
		"icon-scratch": "icon-scratch--1u1TJ",
		"iconScratch": "icon-scratch--1u1TJ",
		"icon-search": "icon-search--1IekA",
		"iconSearch": "icon-search--1IekA",
		"icon-select": "icon-select--3q7tD",
		"iconSelect": "icon-select--3q7tD",
		"icon-settings": "icon-settings--1Lb4H",
		"iconSettings": "icon-settings--1Lb4H",
		"icon-shooting": "icon-shooting--2bOk0",
		"iconShooting": "icon-shooting--2bOk0",
		"icon-skill": "icon-skill--3bR0w",
		"iconSkill": "icon-skill--3bR0w",
		"icon-skrill": "icon-skrill--t3Kae",
		"iconSkrill": "icon-skrill--t3Kae",
		"icon-slot": "icon-slot--6fb4H",
		"iconSlot": "icon-slot--6fb4H",
		"icon-snooker": "icon-snooker--1pR3B",
		"iconSnooker": "icon-snooker--1pR3B",
		"icon-softball": "icon-softball--2EymK",
		"iconSoftball": "icon-softball--2EymK",
		"icon-specials": "icon-specials--1K3l8",
		"iconSpecials": "icon-specials--1K3l8",
		"icon-top-bets": "icon-top-bets--1xJcm",
		"iconTopBets": "icon-top-bets--1xJcm",
		"icon-spinner": "icon-spinner--1aKyU",
		"iconSpinner": "icon-spinner--1aKyU",
		"icon-squash": "icon-squash--t0gBb",
		"iconSquash": "icon-squash--t0gBb",
		"icon-stats-1": "icon-stats-1--1MgW1",
		"iconStats1": "icon-stats-1--1MgW1",
		"icon-stats-2": "icon-stats-2--1M0DE",
		"iconStats2": "icon-stats-2--1M0DE",
		"icon-streaming": "icon-streaming--15wHS",
		"iconStreaming": "icon-streaming--15wHS",
		"icon-synchronised-swimming": "icon-synchronised-swimming--1ormO",
		"iconSynchronisedSwimming": "icon-synchronised-swimming--1ormO",
		"icon-t-shirt": "icon-t-shirt--2U-1N",
		"iconTShirt": "icon-t-shirt--2U-1N",
		"icon-table-tennis": "icon-table-tennis--37B5h",
		"iconTableTennis": "icon-table-tennis--37B5h",
		"icon-table": "icon-table--gX0AI",
		"iconTable": "icon-table--gX0AI",
		"icon-taekwondo": "icon-taekwondo--39vqU",
		"iconTaekwondo": "icon-taekwondo--39vqU",
		"icon-tennis": "icon-tennis--3fLmD",
		"iconTennis": "icon-tennis--3fLmD",
		"icon-tick": "icon-tick--35YWA",
		"iconTick": "icon-tick--35YWA",
		"icon-tip-advisor": "icon-tip-advisor--Go0tL",
		"iconTipAdvisor": "icon-tip-advisor--Go0tL",
		"icon-transactions": "icon-transactions--1FcWb",
		"iconTransactions": "icon-transactions--1FcWb",
		"icon-transfer": "icon-transfer--17CwY",
		"iconTransfer": "icon-transfer--17CwY",
		"icon-triathlon": "icon-triathlon--3WN-x",
		"iconTriathlon": "icon-triathlon--3WN-x",
		"icon-tv": "icon-tv--etbxX",
		"iconTv": "icon-tv--etbxX",
		"icon-ufc": "icon-ufc--2Uu1-",
		"iconUfc": "icon-ufc--2Uu1-",
		"icon-ufc-mma": "icon-ufc-mma--1flNi",
		"iconUfcMma": "icon-ufc-mma--1flNi",
		"icon-ukash": "icon-ukash--khd5k",
		"iconUkash": "icon-ukash--khd5k",
		"icon-virtual-world": "icon-virtual-world--2MznD",
		"iconVirtualWorld": "icon-virtual-world--2MznD",
		"icon-visa": "icon-visa--1B1lw",
		"iconVisa": "icon-visa--1B1lw",
		"icon-volleyball": "icon-volleyball--1b1U9",
		"iconVolleyball": "icon-volleyball--1b1U9",
		"icon-water-polo": "icon-water-polo--3JM7C",
		"iconWaterPolo": "icon-water-polo--3JM7C",
		"icon-weightlifting": "icon-weightlifting--2Xq03",
		"iconWeightlifting": "icon-weightlifting--2Xq03",
		"icon-whtv": "icon-whtv--11C9E",
		"iconWhtv": "icon-whtv--11C9E",
		"icon-winter-sports": "icon-winter-sports--3w58t",
		"iconWinterSports": "icon-winter-sports--3w58t",
		"icon-withdraw": "icon-withdraw--1d4i5",
		"iconWithdraw": "icon-withdraw--1d4i5",
		"icon-wrestling": "icon-wrestling--3dYhh",
		"iconWrestling": "icon-wrestling--3dYhh",
		"icon-x": "icon-x--OVf_R",
		"iconX": "icon-x--OVf_R"
	};

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ea991e317385551bd98d105fe8e8ef5a.eot";

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _modelJs = __webpack_require__(180);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _receiveJs = __webpack_require__(181);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _stateJs = __webpack_require__(182);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var _viewJs = __webpack_require__(183);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _actionsJs = __webpack_require__(194);
	
	var ModalIframe = (0, _utilsCreateElement2['default'])({
	    actions: _actionsJs.actions,
	    intents: _actionsJs.intents,
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = ModalIframe;
	module.exports = exports['default'];

/***/ },
/* 180 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    modal: {
	        id: 'modal',
	        show: true,
	        showCloseButton: false,
	        showHeader: false,
	        title: ''
	    },
	
	    iframe: {
	        id: 'iframe'
	    }
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 181 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        if (proposal) {
	
	            var iframeProposal = { url: proposal.url };
	            var modalProposal = { show: proposal.show, showCloseButton: proposal.showCloseButton, showHeader: proposal.showHeader, title: proposal.title };
	
	            model.modal = Object.assign({}, model.modal, modalProposal);
	            model.iframe = Object.assign({}, model.iframe, iframeProposal);
	        }
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// @TODO: Need to destroy and remove from DOM once modal is not active
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.modal.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(184);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _modalIndex = __webpack_require__(186);
	
	var _modalIndex2 = _interopRequireDefault(_modalIndex);
	
	var view = function view(model) {
	    return _modalIndex2['default'].createElement(model.modal, (0, _utilsElements.iframe)({
	        id: model.iframe.id,
	        src: model.iframe.url,
	        className: _stylesCss2['default'].iframe
	    }));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(185);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(185, function() {
				var newContent = __webpack_require__(185);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".iframe--1IiTw {\n    border-image-width: 0;\n    border: 0;\n    height: 550px;\n    overflow-x: hidden;\n    overflow-y: hidden;\n    width: 998px;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"iframe": "iframe--1IiTw"
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _actionsJs = __webpack_require__(187);
	
	var _receiveJs = __webpack_require__(188);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(189);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _modelJs = __webpack_require__(192);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _stateJs = __webpack_require__(193);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var Modal = (0, _utilsCreateElement2['default'])({
	    actions: _actionsJs.actions,
	    intents: _actionsJs.intents,
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default'], _actionsJs.intents),
	    view: _viewJs2['default']
	});
	
	exports['default'] = Modal;
	module.exports = exports['default'];

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var toggleStream = new _rxIndexJs.Rx();
	
	var actions = function actions(propose) {
	
	    toggleStream.observe(propose);
	
	    window.addEventListener('message', intents.listener);
	};
	
	var intents = {
	
	    listener: function listener(event) {
	
	        if (event && event.data === 'modal_close_without_reload' || event.data === 'modal_close') {
	
	            intents.toggle({ show: false });
	        }
	    },
	
	    toggle: toggleStream.update
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 188 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var postProcessing = function postProcessing(m, p) {
	    return p && typeof p.show === 'undefined' ? !m.show : p.show;
	};
	
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        //const id = model.id;
	        model = Object.assign({}, model, proposal);
	        model.show = postProcessing(model, proposal);
	        //model.id = id;
	
	        return model;
	    };
	};
	
	exports['default'] = receive;
	module.exports = exports['default'];

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(190);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var modalCloseButton = function modalCloseButton(m, i) {
	
	    if (m.showCloseButton) {
	
	        return (0, _utilsElements.button)({ className: _stylesCss2['default'].close, onclick: i.toggle }, '×');
	    }
	};
	
	var modalHeader = function modalHeader(m, i) {
	
	    if (m.showHeader) {
	
	        return (0, _utilsElements.header)({ className: _stylesCss2['default'].header }, m.title, modalCloseButton(m, i));
	    }
	};
	
	var view = function view(model, intents) {
	    return (0, _utilsElements.div)({ id: model.id, className: [_stylesCss2['default'].modal, model.show ? _stylesCss2['default'].show : ''].join(' ') }, (0, _utilsElements.div)({ className: _stylesCss2['default'].inner }, modalHeader(model, intents), (0, _utilsElements.div)({ className: _stylesCss2['default'].main }, model.children)));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(191);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(191, function() {
				var newContent = __webpack_require__(191);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".modal--28YQB {\n    font-family: 'WHHoxtonWeb';\n}\n\n.modal--28YQB:before {\n    content: '';\n    display: none;\n    background: rgba(0, 0, 0, .6);\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 10;\n}\n\n.inner--K-Mhn {\n    background: transparent;\n    display: none;\n    position: fixed;\n    top: -100%;\n    z-index: 11;\n}\n\n.header--RT26g {\n    min-height: 24px;\n    padding: 8px;\n    background-color: #184b74;\n    color: #fff;\n    font-size: 18px;\n}\n\n.close--2EQi2 {\n    background-color: rgba(255, 255, 255, 0.1);\n    border: 0;\n    color: #e5e5e5;\n    cursor: pointer;\n    font-size: 30px;\n    height: 40px;\n    line-height: 30px;\n    margin: 0;\n    padding: 0;\n    position: absolute;\n    right: 0;\n    top: 0;\n    transition: background-color 0.25s linear;\n    width: 40px;\n    outline: 0;\n}\n\n.close--2EQi2:hover {\n    background-color: rgba(255,255,255,0.2);\n}\n\n.show--2-53y:before {\n    display: block;\n}\n\n.show--2-53y .inner--K-Mhn {\n    display: block;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.main--Z_PB7 {\n\n}\n", ""]);
	
	// exports
	exports.locals = {
		"modal": "modal--28YQB",
		"inner": "inner--K-Mhn",
		"header": "header--RT26g",
		"close": "close--2EQi2",
		"show": "show--2-53y",
		"main": "main--Z_PB7"
	};

/***/ },
/* 192 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'modal',
	    show: false,
	    showHeader: false,
	    showCloseButton: false,
	    title: ''
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var nap = function nap(model) {
	
	    if (!model.show) {
	
	        destroy(model);
	    }
	};
	
	var destroy = function destroy(model) {
	
	    var component = document.getElementById(model.id);
	
	    if (component !== null) {
	
	        component.parentElement.removeChild(component);
	    }
	};
	
	var state = function state(view, actions) {
	    return {
	
	        render: function render(model) {
	
	            if (!model.show) {
	
	                destroy(model);
	            } else {
	
	                var component = document.getElementById(model.id);
	
	                if (component === null) {
	
	                    document.body.appendChild(view(model, actions));
	                } else {
	
	                    (0, _diffhtml.outerHTML)(component, view(model, actions));
	                }
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndex = __webpack_require__(103);
	
	var stream = new _rxIndex.Rx();
	
	var actions = function actions(propose) {
	
	    stream.observe(propose);
	};
	
	var intents = {
	
	    toggle: function toggle(data) {
	        return function () {
	            return stream.update(data);
	        };
	    }
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var actions = function actions(propose) {};
	
	var intents = {
	
	    login: function login() {
	        console.log('loggin in...');
	    }
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(197);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(198);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(199);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(200);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(203);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var Deposit = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = Deposit;
	module.exports = exports['default'];

/***/ },
/* 197 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'deposit',
	    id: 'deposit',
	    isActive: false,
	    title: 'Deposit',
	    version: 'simple',
	    modal: {
	        //url: 'https://gaming.williamhill-pp1.com/session/account/deposit-funds?clientId=casino&returnUrl=https%3A%2F%2Fgames.williamhill.com',
	        url: 'https://sports.williamhill-pp1.com/acc/en-gb/payment/deposit/deposit.html?source=CA',
	        show: true,
	        showHeader: false
	    },
	    iframe: {
	        width: '998px',
	        height: '550px'
	    }
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 198 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(201);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var _modalIframeIndex = __webpack_require__(179);
	
	var _modalIframeIndex2 = _interopRequireDefault(_modalIframeIndex);
	
	var typesOfDepositButtons = {
	
	    simple: function simple(model) {
	        return (0, _utilsElements.button)({
	            id: model.id,
	            className: _stylesCss2['default'].button,
	            onclick: _modalIframeIndex2['default'].intents.toggle(model.modal)
	        }, model.title);
	    },
	
	    withIcon: function withIcon(model) {
	        return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
	            onclick: _modalIframeIndex2['default'].intents.toggle(model.modal)
	        }));
	    }
	};
	
	var view = function view(model) {
	    return typesOfDepositButtons[model.version] ? typesOfDepositButtons[model.version](model) : typesOfDepositButtons.simple(model);
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(202);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(202, function() {
				var newContent = __webpack_require__(202);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".button--12zrh {\n    background: #00afff;\n    border-radius: 2px;\n    border: 1px solid transparent;\n    color: #fff;\n    font-size: 12px;\n    font-weight: bold;\n    line-height: 12px;\n    margin: 8px 4px;\n    outline: 0;\n    padding: 7px 11px;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"button": "button--12zrh"
	};

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var actions = function actions(propose) {};
	
	var intents = {
	
	    login: function login() {
	        console.log('loggin in...');
	    }
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(205);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(206);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(207);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(208);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(209);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var FreeBets = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = FreeBets;
	module.exports = exports['default'];

/***/ },
/* 205 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'specials',
	    id: 'specials',
	    isActive: false,
	    title: 'Free Bets/Bonuses',
	    url: 'https://sports.williamhill-pp1.com/acc/en-gb?action=GoAcctFreebet'
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 206 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 207 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nap = function nap(model) {
	
	  if (model.url) {
	
	    location.href = model.url;
	  }
	};
	
	var state = function state(view) {
	  return {
	
	    render: function render(model) {
	
	      nap(model);
	    }
	  };
	};
	
	exports["default"] = state;
	module.exports = exports["default"];

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var _modalIframeIndex = __webpack_require__(179);
	
	var _modalIframeIndex2 = _interopRequireDefault(_modalIframeIndex);
	
	var view = function view(model, intents) {
		return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
			onclick: intents.open
		}));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var stream = new _rxIndexJs.Rx();
	
	var actions = function actions(propose) {
	
	    stream.observe(propose);
	};
	
	var intents = {
	
	    open: stream.update
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(211);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(212);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(213);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(214);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(215);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var GamblingControls = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = GamblingControls;
	module.exports = exports['default'];

/***/ },
/* 211 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'gambling-controls',
	    id: 'gambling-controls',
	    isActive: false,
	    title: 'Gambling Controls',
	    modal: {
	        //url: 'https://sports.williamhill-pp1.com/gambling_controls/index?layout=desktop&closeButton=true',
	        url: 'https://sports.williamhill-pp1.com/acc?action=GoGamblingCtrls',
	        //url: 'https://gaming.williamhill.com/session/account/gambling-controls?clientId=gamesSA&amp;returnUrl=https%3A%2F%2Fgames.williamhill.com',
	        show: true,
	        showHeader: false
	    }
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 212 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var _modalIframeIndex = __webpack_require__(179);
	
	var _modalIframeIndex2 = _interopRequireDefault(_modalIframeIndex);
	
	var view = function view(model) {
		return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
			onclick: _modalIframeIndex2['default'].intents.toggle(model.modal)
		}));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var actions = function actions(propose) {};
	
	var intents = {
	
	    login: function login() {
	        console.log('loggin in...');
	    }
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(217);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(218);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(219);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(220);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(221);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var LogOut = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default'], _actions.intents),
	    view: _view2['default']
	});
	
	exports['default'] = LogOut;
	module.exports = exports['default'];

/***/ },
/* 217 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'logout',
	    id: 'logout',
	    isActive: false,
	    title: 'Log out',
	    url: 'https://gaming.williamhill-pp1.com/session/auth/logout?returnUrl=https%3A%2F%2Fcasino.williamhill-pp1.com%2F%23!%2F&clientId=mobileCasino'
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 218 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view, intents) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model, intents));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model, intents));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var view = function view(model, intents) {
		return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
			onclick: model.onclick
		}));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _authenticationIndex = __webpack_require__(131);
	
	var _authenticationIndex2 = _interopRequireDefault(_authenticationIndex);
	
	var actions = function actions(propose) {};
	
	var intents = {
	
	    //logout: Authentication.intents.logout
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(223);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(224);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(225);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(226);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(227);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var Messages = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = Messages;
	module.exports = exports['default'];

/***/ },
/* 223 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'messages',
	    id: 'messages',
	    isActive: false,
	    title: 'Messages',
	    url: 'https://sports.williamhill-pp1.com/acc?action=GoInbox'
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 224 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 225 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nap = function nap(model) {
	
	  if (model.url) {
	
	    location.href = model.url;
	  }
	};
	
	var state = function state(view) {
	  return {
	
	    render: function render(model) {
	
	      nap(model);
	    }
	  };
	};
	
	exports["default"] = state;
	module.exports = exports["default"];

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var view = function view(model, intents) {
		return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
			onclick: intents.open
		}));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var stream = new _rxIndexJs.Rx();
	
	var actions = function actions(propose) {
	
	    stream.observe(propose);
	};
	
	var intents = {
	
	    open: stream.update
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _modelJs = __webpack_require__(229);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _receiveJs = __webpack_require__(230);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _stateJs = __webpack_require__(231);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var _viewJs = __webpack_require__(232);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var MyAccount = (0, _utilsCreateElement2['default'])({
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = MyAccount;
	module.exports = exports['default'];

/***/ },
/* 229 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'accountLI',
	    id: 'accountLI',
	    isActive: false,
	    title: 'My Account',
	    modal: {
	        url: 'https://myaccount.williamhill-pp1.com/statements?closeButton=true&layout=desktop&statementType=casino&locale=en-gb',
	        //url: 'https://gaming.williamhill.com/session/account/view-payment-history?clientId=gamesSA&amp;returnUrl=https%3A%2F%2Fgames.williamhill.com',
	        show: true,
	        showHeader: false
	    }
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 230 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var _modalIframeIndex = __webpack_require__(179);
	
	var _modalIframeIndex2 = _interopRequireDefault(_modalIframeIndex);
	
	var view = function view(model) {
		return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
			onclick: _modalIframeIndex2['default'].intents.toggle(model.modal)
		}));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(234);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(235);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(236);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(237);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(238);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var Preferences = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = Preferences;
	module.exports = exports['default'];

/***/ },
/* 234 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'settings',
	    id: 'settings',
	    isActive: false,
	    title: 'Preferences',
	    url: 'https://sports.williamhill-pp1.com/acc?action=GoAcctUpdate&returnUrl=https%3A%2F%2Fcasino.williamhill-pp1.com'
	};
	
	// @TODO: Validate products from array
	
	//url: 'https://sports.williamhill.com/acc/en-gb?action=GoAcctUpdate',
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 235 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 236 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nap = function nap(model) {
	
	  if (model.url) {
	
	    location.href = model.url;
	  }
	};
	
	var state = function state(view) {
	  return {
	
	    render: function render(model) {
	
	      nap(model);
	    }
	  };
	};
	
	exports["default"] = state;
	module.exports = exports["default"];

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var view = function view(model, intents) {
		return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
			onclick: intents.open
		}));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var stream = new _rxIndexJs.Rx();
	
	var actions = function actions(propose) {
	
	    stream.observe(propose);
	};
	
	var intents = {
	
	    open: stream.update
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(240);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(241);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(242);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(243);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(244);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var ReverseWithdraw = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = ReverseWithdraw;
	module.exports = exports['default'];

/***/ },
/* 240 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'reverse-withdrawal',
	    id: 'reverse-withdrawal',
	    isActive: false,
	    title: 'Reverse Withdrawal',
	    modal: {
	        url: 'https://sports.williamhill-pp1.com/acc/en-gb/payment/withdraw/reverse_withdraw.html?source=CA',
	        //url: 'https://gaming.williamhill.com/session/account/reverse-withdraw?clientId=gamesSA&amp;returnUrl=https%3A%2F%2Fgames.williamhill.com',
	        show: true,
	        showHeader: false
	    }
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 241 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var _modalIframeIndex = __webpack_require__(179);
	
	var _modalIframeIndex2 = _interopRequireDefault(_modalIframeIndex);
	
	var view = function view(model) {
		return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
			onclick: _modalIframeIndex2['default'].intents.toggle(model.modal)
		}));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var actions = function actions(propose) {};
	
	var intents = {
	
	    login: function login() {
	        console.log('loggin in...');
	    }
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(246);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(247);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(248);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(249);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _actions = __webpack_require__(250);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var Withdraw = (0, _utilsCreateElement2['default'])({
	    actions: _actions.actions,
	    intents: _actions.intents,
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = Withdraw;
	module.exports = exports['default'];

/***/ },
/* 246 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    icon: 'withdraw',
	    id: 'withdraw',
	    isActive: false,
	    title: 'Withdraw',
	    modal: {
	        url: 'https://sports.williamhill-pp1.com/acc/en-gb/payment/withdraw/withdraw.html?source=CA',
	        //url: 'https://gaming.williamhill.com/session/account/withdraw-funds?clientId=gamesSA&amp;returnUrl=https%3A%2F%2Fgames.williamhill.com',
	        show: true,
	        showHeader: false
	    }
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 247 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _myAccountButtonIndex = __webpack_require__(165);
	
	var _myAccountButtonIndex2 = _interopRequireDefault(_myAccountButtonIndex);
	
	var _modalIframeIndex = __webpack_require__(179);
	
	var _modalIframeIndex2 = _interopRequireDefault(_modalIframeIndex);
	
	var view = function view(model) {
		return _myAccountButtonIndex2['default'].createElement(_extends({}, model, {
			onclick: _modalIframeIndex2['default'].intents.toggle(model.modal)
		}));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndexJs = __webpack_require__(103);
	
	var actions = function actions(propose) {};
	
	var intents = {
	
	    login: function login() {
	        console.log('loggin in...');
	    }
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 251 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'my-account',
	    show: false
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view, actions) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model, actions));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model, actions));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _modelJs = __webpack_require__(254);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _receiveJs = __webpack_require__(255);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _stateJs = __webpack_require__(256);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var _viewJs = __webpack_require__(257);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var Join = (0, _utilsCreateElement2['default'])({
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = Join;
	module.exports = exports['default'];

/***/ },
/* 254 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'join',
	    children: 'Join',
	
	    baseUrl: 'auth.williamhill.com',
	    pathname: '/register?',
	    locale: 'en-gb',
	    mobile: false,
	    native: false,
	    nui: '',
	    layout: 'desktop',
	    paymentSource: '',
	    regSource: 'XX',
	    protocol: 'https://',
	    queryString: '',
	    target: false,
	
	    mobileProducts: ['NS', 'AS', 'SM', 'MG', 'ML', 'MC', 'MU', 'MV'],
	    nativeProducts: ['NS', 'AS']
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 255 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var postProcessing = function postProcessing(m) {
	    return m.protocol + m.baseUrl + m.pathname + ['regSource=' + m.regSource, '&paymentSource=' + m.paymentSource, '&locale=' + m.locale, '&layout=' + m.layout, m.target ? '&target=' + m.target : '', m.queryString ? '&' + m.queryString : ''].join('');
	};
	
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	        model.url = postProcessing(model);
	
	        return model;
	    };
	};
	
	exports['default'] = receive;
	module.exports = exports['default'];

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var _stylesCss = __webpack_require__(258);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _joinModalIndex = __webpack_require__(260);
	
	var _joinModalIndex2 = _interopRequireDefault(_joinModalIndex);
	
	var view = function view(model) {
	    return _utilsElements.button.apply(undefined, [{
	
	        id: model.id,
	
	        className: model.className ? model.className : _stylesCss2['default'].join,
	
	        onclick: _joinModalIndex2['default'].intents.toggle(model.url)
	    }].concat(_toConsumableArray(model.children)));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(259);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(259, function() {
				var newContent = __webpack_require__(259);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".join--Sw7qe {\n\tbackground: #00afff;\n\tborder-radius: 2px;\n    border: 1px solid #00afff;\n    color: #fff;\n    float: right;\n    font-size: 12px;\n    font-weight: bold;\n    line-height: 12px;\n    margin: 8px 4px;\n    padding: 7px 11px;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"join": "join--Sw7qe"
	};

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _actionsJs = __webpack_require__(261);
	
	var _receiveJs = __webpack_require__(262);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(263);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _modelJs = __webpack_require__(266);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _stateJs = __webpack_require__(267);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var JoinModal = (0, _utilsCreateElement2['default'])({
	    actions: _actionsJs.actions,
	    intents: _actionsJs.intents,
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = JoinModal;
	module.exports = exports['default'];

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _rxIndex = __webpack_require__(103);
	
	var stream = new _rxIndex.Rx();
	
	var actions = function actions(propose) {
	
	    stream.observe(propose);
	};
	
	var intents = {
	
	    toggle: function toggle(url) {
	        return function () {
	            return stream.update({ iframe: { url: url } });
	        };
	    }
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 262 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(264);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _modalIndex = __webpack_require__(186);
	
	var _modalIndex2 = _interopRequireDefault(_modalIndex);
	
	var _utilsElements = __webpack_require__(98);
	
	var view = function view(model) {
	    return _modalIndex2['default'].createElement(model.modal, (0, _utilsElements.iframe)({
	        id: model.iframe.id,
	        src: model.iframe.url,
	        className: _stylesCss2['default'].iframe
	    }));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(265);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(265, function() {
				var newContent = __webpack_require__(265);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".iframe--3LPBM {\n    border-image-width: 0;\n    border: 0;\n    height: 660px;\n    overflow-x: hidden;\n    overflow-y: hidden;\n    width: 660px;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"iframe": "iframe--3LPBM"
	};

/***/ },
/* 266 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    modal: {
	        id: 'modal',
	        showCloseButton: false,
	        showHeader: false,
	        show: true
	    },
	
	    iframe: {
	        id: 'join'
	    }
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	// @TODO: Need to destroy and remove from DOM once modal is not active
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.modal.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _actionsJs = __webpack_require__(269);
	
	var _receiveJs = __webpack_require__(270);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(271);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _modelJs = __webpack_require__(281);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _stateJs = __webpack_require__(282);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var LoginModal = (0, _utilsCreateElement2['default'])({
	    actions: _actionsJs.actions,
	    intents: _actionsJs.intents,
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default']),
	    view: _viewJs2['default']
	});
	
	exports['default'] = LoginModal;
	module.exports = exports['default'];

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rxIndex = __webpack_require__(103);
	
	var _modalIndex = __webpack_require__(186);
	
	var _modalIndex2 = _interopRequireDefault(_modalIndex);
	
	var toggleStream = new _rxIndex.Rx();
	
	var actions = function actions(propose) {
	
	    toggleStream.observe(propose);
	};
	
	var intents = {
	
	    toggle: toggleStream.update
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 270 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var filter = function filter(p) {
	
	    if (p && typeof p.loggedin !== 'undefined' && p.loggedin) {
	
	        return { show: false };
	    }
	
	    if (p && p.type === 'click') {
	
	        return { show: true };
	    }
	};
	
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model.modal = Object.assign({}, model.modal, proposal.modal, filter(proposal));
	        model.login = Object.assign({}, model.login, proposal.login);
	
	        return model;
	    };
	};
	
	exports['default'] = receive;
	module.exports = exports['default'];

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _modalIndex = __webpack_require__(186);
	
	var _modalIndex2 = _interopRequireDefault(_modalIndex);
	
	var _loginIndex = __webpack_require__(272);
	
	var _loginIndex2 = _interopRequireDefault(_loginIndex);
	
	var view = function view(model) {
	    return _modalIndex2['default'].createElement(model.modal, _loginIndex2['default'].createElement(model.login));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _actionsJs = __webpack_require__(273);
	
	var _receiveJs = __webpack_require__(274);
	
	var _receiveJs2 = _interopRequireDefault(_receiveJs);
	
	var _viewJs = __webpack_require__(275);
	
	var _viewJs2 = _interopRequireDefault(_viewJs);
	
	var _modelJs = __webpack_require__(279);
	
	var _modelJs2 = _interopRequireDefault(_modelJs);
	
	var _stateJs = __webpack_require__(280);
	
	var _stateJs2 = _interopRequireDefault(_stateJs);
	
	var Login = (0, _utilsCreateElement2['default'])({
	    actions: _actionsJs.actions,
	    intents: _actionsJs.intents,
	    propose: (0, _receiveJs2['default'])(_modelJs2['default']),
	    state: (0, _stateJs2['default'])(_viewJs2['default'], _actionsJs.intents),
	    view: _viewJs2['default']
	});
	
	exports['default'] = Login;
	module.exports = exports['default'];

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rxIndexJs = __webpack_require__(103);
	
	var _authenticationIndex = __webpack_require__(131);
	
	var _authenticationIndex2 = _interopRequireDefault(_authenticationIndex);
	
	var actions = function actions(propose) {};
	
	var intents = {
	
	    login: function login(event) {
	
	        event.preventDefault();
	
	        var formData = { username: event.target.elements['username'].value, password: event.target.elements['password'].value };
	
	        _authenticationIndex2['default'].intents.login(formData);
	    }
	};
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 274 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(276);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _registerPng = __webpack_require__(278);
	
	var _registerPng2 = _interopRequireDefault(_registerPng);
	
	var _utilsElements = __webpack_require__(98);
	
	/*import Translation as t from '../translation/index';*/
	
	var _joinIndex = __webpack_require__(253);
	
	var _joinIndex2 = _interopRequireDefault(_joinIndex);
	
	var _iconIndex = __webpack_require__(172);
	
	var _iconIndex2 = _interopRequireDefault(_iconIndex);
	
	var _forgotIndex = __webpack_require__(288);
	
	var _forgotIndex2 = _interopRequireDefault(_forgotIndex);
	
	var view = function view(model, intents) {
	    return (0, _utilsElements.div)({ id: model.id, className: _stylesCss2['default'].loginForm }, (0, _utilsElements.form)({ id: model.form.id, className: _stylesCss2['default'].section, onsubmit: intents.login }, (0, _utilsElements.div)({ className: _stylesCss2['default'].wrapper }, (0, _utilsElements.input)({
	        autocomplete: 'off',
	        className: _stylesCss2['default'].input,
	        id: model.form.username.id,
	        name: model.form.username.name,
	        /*placeholder: t('LOGIN_FORM_PLACEHOLDER_USERNAME'),*/
	        placeholder: 'Username',
	        required: true,
	        type: 'text',
	        value: 'johntest1'
	    }), _iconIndex2['default'].createElement({
	        className: _stylesCss2['default'].icon,
	        name: 'account-nli',
	        style: { lineHeight: '40px' }
	    })), (0, _utilsElements.div)({ className: _stylesCss2['default'].wrapper }, (0, _utilsElements.input)({
	        autocomplete: 'new-password', // Hack for Chrome
	        className: _stylesCss2['default'].input,
	        id: model.form.password.id,
	        name: model.form.password.name,
	        placeholder: 'Password',
	        required: true,
	        type: 'password',
	        value: 'password1234'
	    }), _iconIndex2['default'].createElement({
	        className: _stylesCss2['default'].icon,
	        name: 'lock',
	        style: { lineHeight: '40px' }
	    })), (0, _utilsElements.input)({
	        type: 'submit',
	        className: _stylesCss2['default'].login,
	        id: model.form.submit.id
	    }, 'Login'), (0, _utilsElements.div)({ className: _stylesCss2['default'].wrapper }, (0, _utilsElements.label)({ className: _stylesCss2['default'].label }, (0, _utilsElements.input)({
	        type: 'checkbox',
	        checked: model.form.remember ? 'checked' : ''
	    }), 'Save username')), (0, _utilsElements.div)({ className: _stylesCss2['default'].wrapper }, _forgotIndex2['default'].createElement())), (0, _utilsElements.div)({ className: _stylesCss2['default'].section }, (0, _utilsElements.img)({ src: _registerPng2['default'] }), (0, _utilsElements.h3)({ className: _stylesCss2['default'].title }, 'Don\'t have an account yet?'), (0, _utilsElements.p)({ className: _stylesCss2['default'].text }, 'Create your new account in one simple form'), _joinIndex2['default'].createElement({ className: _stylesCss2['default'].join }, 'Join now')));
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(277);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(277, function() {
				var newContent = __webpack_require__(277);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".login-form--3cN4S {\n    background: #f9f9f9;\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 4px;\n    font-family: Arial, Helvetica, \"Helvetica Neue\", sans-serif;\n    height: auto;\n    padding: 10px;\n    text-align: center;\n    width: 540px;\n}\n\n.section--1lNSJ {\n    display: table-cell;\n    padding: 10px;\n    vertical-align: top;\n    width: 260px;\n}\n\n.section--1lNSJ:last-child {\n    border-left: 1px solid #c8c8c8;\n}\n\n.wrapper--yBCph {\n    margin-top: 10px;\n    position: relative;\n}\n\n.input--2lg9g {\n    background-clip: padding-box;\n    border-radius: 4px;\n    border: 1px solid #cecece;\n    display: table-cell;\n    font-size: 16px;\n    height: 40px;\n    line-height: 40px;\n    outline: 0;\n    padding-left: 45px;\n    width: 212px;\n}\n\n.input--2lg9g:focus {\n    border: 1px solid #248cb3;\n}\n\n.label--2uY7z {\n    display: table-cell;\n    font-size: 11px;\n}\n\n.button--1tIVt {\n    border-radius: 2px;\n    border: 1px solid transparent;\n    color: #fcfcfc;\n    cursor: pointer;\n    display: inline-block;\n    font-size: 12px;\n    height: 30px;\n    line-height: 30px;\n    margin-top: 10px;\n    outline: 0;\n    padding: 0;\n    transition: background-color 0.25s linear;\n}\n\n.login--2ar99 {\n    background: #248cb3;\n    width: 100%;\n}\n\n.login--2ar99:hover {\n    background-color: #289dc8;\n}\n\n.join--2ijNA {\n    background: #009581;\n    padding: 0 10px;\n}\n\n.title--3q75u {\n    font-size: 14px;\n    font-weight: bold;\n    margin: 10px 0 0;\n}\n\n.text--2RX5i {\n    font-size: 12px;\n    margin: 0;\n}\n\n.input--2lg9g:focus + .icon--1y9t3 {\n    background: #248cb3;\n}\n\n.error--1v2q- .input--2lg9g {\n    border-color: #fe0000;\n}\n\n.error--1v2q- .input--2lg9g + .icon--1y9t3 {\n    background: #fe0000;\n}\n\n.icon--1y9t3 {\n    background: #7290aa;\n    border-bottom-left-radius: 4px;\n    border-top-left-radius: 4px;\n    color: #fefefe;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 40px;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"login-form": "login-form--3cN4S",
		"loginForm": "login-form--3cN4S",
		"section": "section--1lNSJ",
		"wrapper": "wrapper--yBCph",
		"input": "input--2lg9g",
		"label": "label--2uY7z",
		"button": "button--1tIVt",
		"login": "login--2ar99 button--1tIVt",
		"join": "join--2ijNA button--1tIVt",
		"title": "title--3q75u",
		"text": "text--2RX5i",
		"icon": "icon--1y9t3",
		"error": "error--1v2q-"
	};

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8e13b079b946744447467a2302ff0095.png";

/***/ },
/* 279 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'login',
	
	    form: {
	        id: 'login-form',
	        username: {
	            id: 'username',
	            name: 'username'
	        },
	        password: {
	            id: 'password',
	            name: 'password'
	        },
	        submit: {
	            id: 'submit'
	        }
	    }
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view, actions) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model, actions));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model, actions));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 281 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	
	    modal: {
	        id: 'modal',
	        showCloseButton: true,
	        showHeader: true,
	        title: 'Login',
	        show: true
	    },
	
	    login: {
	        id: 'login-form-from-modal'
	    }
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var destroy = function destroy(model) {
	
	    var component = document.getElementById(model.modal.id);
	
	    if (component !== null) {
	
	        component.parentElement.removeChild(component);
	    }
	};
	
	var state = function state(view, actions) {
	    return {
	
	        render: function render(model) {
	
	            if (!model.modal.show) {
	
	                destroy(model);
	            } else {
	
	                var component = document.getElementById(model.modal.id);
	
	                if (component === null) {
	
	                    document.body.appendChild(view(model, actions));
	                } else {
	
	                    (0, _diffhtml.outerHTML)(component, view(model, actions));
	                }
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rxIndex = __webpack_require__(103);
	
	var _utilsRequest = __webpack_require__(147);
	
	var _utilsRequest2 = _interopRequireDefault(_utilsRequest);
	
	var simulateSessionResponse = {
	    "loggedin": true,
	    "accountNo": "58760NC",
	    "username": "13db5f41191e8e7ea5141b16cd58c75af5e27071",
	    "firstName": "Patrick",
	    "lastName": "Langley",
	    "usernamePlain": "johntest1",
	    "balance": "10000.00",
	    "currency": "GBP",
	    "casino": {
	        "balance": "",
	        "currentBalance": "",
	        "bonusBalance": "",
	        "declinableBonus": "",
	        "declinableWinnings": "",
	        "leftToWager": ""
	    },
	    "returning": true
	};
	
	var stream = new _rxIndex.Rx();
	
	var actions = function actions(propose) {
	
	    stream.observe(propose);
	};
	
	var casURL = 'https://auth.williamhill-pp1.com/cas/login?cust_login=true&joinin_link=$registrationUrl&service=';
	
	var serviceURL = 'https://gaming.williamhill-pp1.com/session/auth/return?returnUrl=' + encodeURIComponent('https://gaming.williamhill-pp1.com/session/user/sessioncheck') + '&clientId=Casino';
	
	var firebaseClient = {
	
	    request: function request(isLoggedin) {
	
	        if (isLoggedin) {
	
	            var options = {
	                async: true,
	                method: 'GET',
	                url: 'https://gaming.williamhill-pp1.com/session/user/fbauth?applicationId=casino',
	                withCredentials: false,
	                responseType: 'json',
	                requestHeader: { 'Accept': 'application/json' }
	            };
	
	            return (0, _utilsRequest2['default'])(options, firebaseClient.onSuccess, firebaseClient.onFailure);
	        }
	    },
	
	    onSuccess: function onSuccess(data) {
	        return data && data.fbToken;
	    },
	
	    onFailure: function onFailure(data) {
	        return console.log('Failed to get firebase token: ', data);
	    }
	};
	
	var casClient = {
	
	    logout: function logout() {
	
	        var options = {
	            async: true,
	            method: 'GET',
	            url: 'https://gaming.williamhill-pp1.com/session/auth/logout?returnUrl=$returnUrl&clientId=mobileCasino',
	            withCredentials: true,
	            responseType: 'json',
	            requestHeader: { 'Accept': 'application/json' }
	        };
	
	        //request(options, casClient.onSuccessLogout, casClient.onFailure)
	        (0, _utilsRequest2['default'])(options, casClient.onSuccessLogout, casClient.onSuccessLogout);
	    },
	
	    onSuccessLogout: function onSuccessLogout(data) {
	
	        //casClient.sessionCheck(data);
	        stream.update({ "loggedin": false, "gatecheck": true, "balance": 0, "currency": "GBP", "returning": true });
	    },
	
	    sessionCheck: function sessionCheck(data) {
	
	        var options = {
	            async: true,
	            method: 'GET',
	            url: 'https://gaming.williamhill-pp1.com/session/user/sessioncheck',
	            withCredentials: true,
	            responseType: 'json',
	            requestHeader: { 'Accept': 'application/json' }
	        };
	
	        //request(options, stream.update, casClient.onFailure);
	        stream.update(simulateSessionResponse);
	    },
	
	    firstTrip: function firstTrip(formData) {
	
	        var options = {
	            async: true,
	            method: 'GET',
	            url: casURL + serviceURL,
	            withCredentials: true,
	            responseType: 'json',
	            requestHeader: { 'Accept': 'application/json' }
	        };
	
	        (0, _utilsRequest2['default'])(options, casClient.secondTrip(formData), casClient.onFailure);
	    },
	
	    secondTrip: function secondTrip(formData) {
	        return function (data) {
	
	            var options = {
	                async: true,
	                method: 'POST',
	                url: casURL + serviceURL,
	                withCredentials: true,
	                responseType: 'json',
	                requestHeader: {
	                    'Accept': 'application/json',
	                    'Content-type': 'application/x-www-form-urlencoded',
	                    'Accept-Language': 'en-gb'
	                },
	                data: formData
	            };
	
	            if (data && data.form_defaults) {
	
	                options.data.lt = data.form_defaults.lt;
	                options.data.executionKey = data.form_defaults.executionKey;
	                options.data._eventId = data.form_defaults._eventId;
	                options.data._rememberUsername = 'on';
	                options.data._rememberMe = 'off';
	
	                (0, _utilsRequest2['default'])(options, casClient.sessionCheck, casClient.onFailure);
	            }
	
	            if (data && data.success) {
	
	                casClient.sessionCheck(data);
	            }
	        };
	    },
	
	    onFailure: function onFailure(data) {
	        return console.log('REQUEST FAILED: ', data);
	    }
	};
	
	var intents = {
	
	    sessionCheck: casClient.sessionCheck,
	
	    // @TODO: Composable functions for casClient
	    login: function login(formData) {
	        return casClient.firstTrip(formData);
	    },
	
	    logout: casClient.logout,
	
	    observe: stream.observe
	};
	
	window.Authentication = { intents: intents };
	
	exports.actions = actions;
	exports.intents = intents;

/***/ },
/* 284 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'header'
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view, actions) {
	    return {
	
	        render: function render(model) {
	
	            (0, _diffhtml.outerHTML)(document.getElementById(model.id), view(model, actions));
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 286 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'app',
	    header: { id: 'header-app' }
	};
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsCreateElement = __webpack_require__(80);
	
	var _utilsCreateElement2 = _interopRequireDefault(_utilsCreateElement);
	
	var _model = __webpack_require__(289);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _receive = __webpack_require__(290);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _state = __webpack_require__(291);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _view = __webpack_require__(292);
	
	var _view2 = _interopRequireDefault(_view);
	
	// @TODO: Consider changing this to { proposal, accept, learn, view: accept(initialModel) }
	var Forgot = (0, _utilsCreateElement2['default'])({
	    propose: (0, _receive2['default'])(_model2['default']),
	    state: (0, _state2['default'])(_view2['default']),
	    view: _view2['default']
	});
	
	exports['default'] = Forgot;
	module.exports = exports['default'];

/***/ },
/* 289 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var initialModel = {
	    id: 'forgot',
	    modal: {
	        url: 'https://sports.williamhill-pp1.com/mob/en-gb?action=GoLostLogin&redirect_url=https%3A%2F%2Fcasino.williamhill-pp1.com%2F%23!%2F&hide_header=1',
	        show: true,
	        showHeader: true,
	        title: 'Forgot Username/Password',
	        showCloseButton: true,
	        width: '600px',
	        height: '600px'
	    }
	};
	
	// @TODO: Validate products from array
	
	exports['default'] = initialModel;
	module.exports = exports['default'];

/***/ },
/* 290 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var receive = function receive(model) {
	    return function (proposal) {
	
	        // @TODO: Convert to immutable data structure
	        model = Object.assign({}, model, proposal);
	
	        return model;
	    };
	};
	
	exports["default"] = receive;
	module.exports = exports["default"];

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _diffhtml = __webpack_require__(110);
	
	var state = function state(view) {
	    return {
	
	        render: function render(model) {
	
	            var component = document.getElementById(model.id);
	
	            if (component === null) {
	
	                document.body.appendChild(view(model));
	            } else {
	
	                (0, _diffhtml.outerHTML)(component, view(model));
	            }
	        }
	    };
	};
	
	exports['default'] = state;
	module.exports = exports['default'];

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stylesCss = __webpack_require__(293);
	
	var _stylesCss2 = _interopRequireDefault(_stylesCss);
	
	var _utilsElements = __webpack_require__(98);
	
	var _modalIframeIndex = __webpack_require__(179);
	
	var _modalIframeIndex2 = _interopRequireDefault(_modalIframeIndex);
	
	var view = function view(model) {
	    return (0, _utilsElements.a)({
	        className: _stylesCss2['default'].forgot,
	        onclick: _modalIframeIndex2['default'].intents.toggle(model.modal)
	    }, 'Forgot your username/password?');
	};
	
	exports['default'] = view;
	module.exports = exports['default'];

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(294);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(96)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(294, function() {
				var newContent = __webpack_require__(294);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(86)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".forgot--2LqbY {\n    color: #1a7db4;\n    font-size: 12px;\n    font-weight: bold;\n    text-decoration: none;\n}\n", ""]);
	
	// exports
	exports.locals = {
		"forgot": "forgot--2LqbY"
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map