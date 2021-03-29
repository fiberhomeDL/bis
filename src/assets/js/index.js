/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5cca17771e64278aa641";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
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
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
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
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.ts")(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/js-base64/base64.mjs":
/*!*******************************************!*\
  !*** ./node_modules/js-base64/base64.mjs ***!
  \*******************************************/
/*! exports provided: version, VERSION, atob, atobPolyfill, btoa, btoaPolyfill, fromBase64, toBase64, utob, encode, encodeURI, encodeURL, btou, decode, isValid, fromUint8Array, toUint8Array, extendString, extendUint8Array, extendBuiltins, Base64 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atob", function() { return _atob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atobPolyfill", function() { return atobPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "btoa", function() { return _btoa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "btoaPolyfill", function() { return btoaPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromBase64", function() { return decode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBase64", function() { return encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utob", function() { return utob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeURI", function() { return encodeURI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeURL", function() { return encodeURI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "btou", function() { return btou; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValid", function() { return isValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromUint8Array", function() { return fromUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUint8Array", function() { return toUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendString", function() { return extendString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendUint8Array", function() { return extendUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendBuiltins", function() { return extendBuiltins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base64", function() { return gBase64; });
/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
const version = '3.6.0';
/**
 * @deprecated use lowercase `version`.
 */
const VERSION = version;
const _hasatob = typeof atob === 'function';
const _hasbtoa = typeof btoa === 'function';
const _hasBuffer = typeof Buffer === 'function';
const _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64chs = [...b64ch];
const b64tab = ((a) => {
    let tab = {};
    a.forEach((c, i) => tab[c] = i);
    return tab;
})(b64chs);
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
const _fromCC = String.fromCharCode.bind(String);
const _U8Afrom = typeof Uint8Array.from === 'function'
    ? Uint8Array.from.bind(Uint8Array)
    : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
const _mkUriSafe = (src) => src
    .replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_')
    .replace(/=+$/m, '');
const _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, '');
/**
 * polyfill version of `btoa`
 */
const btoaPolyfill = (bin) => {
    // console.log('polyfilled');
    let u32, c0, c1, c2, asc = '';
    const pad = bin.length % 3;
    for (let i = 0; i < bin.length;) {
        if ((c0 = bin.charCodeAt(i++)) > 255 ||
            (c1 = bin.charCodeAt(i++)) > 255 ||
            (c2 = bin.charCodeAt(i++)) > 255)
            throw new TypeError('invalid character found');
        u32 = (c0 << 16) | (c1 << 8) | c2;
        asc += b64chs[u32 >> 18 & 63]
            + b64chs[u32 >> 12 & 63]
            + b64chs[u32 >> 6 & 63]
            + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
/**
 * does what `window.btoa` of web browsers do.
 * @param {String} bin binary string
 * @returns {string} Base64-encoded string
 */
const _btoa = _hasbtoa ? (bin) => btoa(bin)
    : _hasBuffer ? (bin) => Buffer.from(bin, 'binary').toString('base64')
        : btoaPolyfill;
const _fromUint8Array = _hasBuffer
    ? (u8a) => Buffer.from(u8a).toString('base64')
    : (u8a) => {
        // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
        const maxargs = 0x1000;
        let strs = [];
        for (let i = 0, l = u8a.length; i < l; i += maxargs) {
            strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
        }
        return _btoa(strs.join(''));
    };
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
const fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const utob = (src: string) => unescape(encodeURIComponent(src));
// reverting good old fationed regexp
const cb_utob = (c) => {
    if (c.length < 2) {
        var cc = c.charCodeAt(0);
        return cc < 0x80 ? c
            : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
                + _fromCC(0x80 | (cc & 0x3f)))
                : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                    + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                    + _fromCC(0x80 | (cc & 0x3f)));
    }
    else {
        var cc = 0x10000
            + (c.charCodeAt(0) - 0xD800) * 0x400
            + (c.charCodeAt(1) - 0xDC00);
        return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
            + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
            + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
            + _fromCC(0x80 | (cc & 0x3f)));
    }
};
const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
const utob = (u) => u.replace(re_utob, cb_utob);
//
const _encode = _hasBuffer
    ? (s) => Buffer.from(s, 'utf8').toString('base64')
    : _TE
        ? (s) => _fromUint8Array(_TE.encode(s))
        : (s) => _btoa(utob(s));
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */
const encode = (src, urlsafe = false) => urlsafe
    ? _mkUriSafe(_encode(src))
    : _encode(src);
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */
const encodeURI = (src) => encode(src, true);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const btou = (src: string) => decodeURIComponent(escape(src));
// reverting good old fationed regexp
const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
const cb_btou = (cccc) => {
    switch (cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                | ((0x3f & cccc.charCodeAt(1)) << 12)
                | ((0x3f & cccc.charCodeAt(2)) << 6)
                | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
            return (_fromCC((offset >>> 10) + 0xD800)
                + _fromCC((offset & 0x3FF) + 0xDC00));
        case 3:
            return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                | (0x3f & cccc.charCodeAt(2)));
        default:
            return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
                | (0x3f & cccc.charCodeAt(1)));
    }
};
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
const btou = (b) => b.replace(re_btou, cb_btou);
/**
 * polyfill version of `atob`
 */
const atobPolyfill = (asc) => {
    // console.log('polyfilled');
    asc = asc.replace(/\s+/g, '');
    if (!b64re.test(asc))
        throw new TypeError('malformed base64.');
    asc += '=='.slice(2 - (asc.length & 3));
    let u24, bin = '', r1, r2;
    for (let i = 0; i < asc.length;) {
        u24 = b64tab[asc.charAt(i++)] << 18
            | b64tab[asc.charAt(i++)] << 12
            | (r1 = b64tab[asc.charAt(i++)]) << 6
            | (r2 = b64tab[asc.charAt(i++)]);
        bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
            : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
                : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
};
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */
const _atob = _hasatob ? (asc) => atob(_tidyB64(asc))
    : _hasBuffer ? (asc) => Buffer.from(asc, 'base64').toString('binary')
        : atobPolyfill;
//
const _toUint8Array = _hasBuffer
    ? (a) => _U8Afrom(Buffer.from(a, 'base64'))
    : (a) => _U8Afrom(_atob(a), c => c.charCodeAt(0));
/**
 * converts a Base64 string to a Uint8Array.
 */
const toUint8Array = (a) => _toUint8Array(_unURI(a));
//
const _decode = _hasBuffer
    ? (a) => Buffer.from(a, 'base64').toString('utf8')
    : _TD
        ? (a) => _TD.decode(_toUint8Array(a))
        : (a) => btou(_atob(a));
const _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == '-' ? '+' : '/'));
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
const decode = (src) => _decode(_unURI(src));
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
  */
const isValid = (src) => {
    if (typeof src !== 'string')
        return false;
    const s = src.replace(/\s+/g, '').replace(/=+$/, '');
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
//
const _noEnum = (v) => {
    return {
        value: v, enumerable: false, writable: true, configurable: true
    };
};
/**
 * extend String.prototype with relevant methods
 */
const extendString = function () {
    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
    _add('fromBase64', function () { return decode(this); });
    _add('toBase64', function (urlsafe) { return encode(this, urlsafe); });
    _add('toBase64URI', function () { return encode(this, true); });
    _add('toBase64URL', function () { return encode(this, true); });
    _add('toUint8Array', function () { return toUint8Array(this); });
};
/**
 * extend Uint8Array.prototype with relevant methods
 */
const extendUint8Array = function () {
    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add('toBase64', function (urlsafe) { return fromUint8Array(this, urlsafe); });
    _add('toBase64URI', function () { return fromUint8Array(this, true); });
    _add('toBase64URL', function () { return fromUint8Array(this, true); });
};
/**
 * extend Builtin prototypes with relevant methods
 */
const extendBuiltins = () => {
    extendString();
    extendUint8Array();
};
const gBase64 = {
    version: version,
    VERSION: VERSION,
    atob: _atob,
    atobPolyfill: atobPolyfill,
    btoa: _btoa,
    btoaPolyfill: btoaPolyfill,
    fromBase64: decode,
    toBase64: encode,
    encode: encode,
    encodeURI: encodeURI,
    encodeURL: encodeURI,
    utob: utob,
    btou: btou,
    decode: decode,
    isValid: isValid,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins,
};
// makecjs:CUT //




















// and finally,



/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global)

var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this)
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : ''
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = global.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob'
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
      })
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}


/***/ }),

/***/ "./src/behaviorTrace.ts":
/*!******************************!*\
  !*** ./src/behaviorTrace.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 用户行为追踪
 * author:Lily
 * 用户访问单个页面的id
 */
var BehaviorTrace = /** @class */ (function () {
    function BehaviorTrace() {
    }
    return BehaviorTrace;
}());
/* harmony default export */ __webpack_exports__["default"] = (BehaviorTrace);


/***/ }),

/***/ "./src/errors/ajax.ts":
/*!****************************!*\
  !*** ./src/errors/ajax.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
/* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
/* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var AjaxErrors = /** @class */ (function (_super) {
    __extends(AjaxErrors, _super);
    function AjaxErrors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // get http error info
    AjaxErrors.prototype.handleError = function (options) {
        var _this = this;
        if (!window.XMLHttpRequest) {
            return;
        }
        var xhrSend = XMLHttpRequest.prototype.send;
        var xhrEvent = function (event) {
            try {
                if (event && event.currentTarget && (event.currentTarget.status >= 400 || event.currentTarget.status === 0)) {
                    _this.logInfo = {
                        uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                        service: options.service,
                        serviceVersion: options.serviceVersion,
                        pagePath: options.pagePath,
                        category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].AJAX_ERROR,
                        grade: _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                        errorUrl: event.target.responseURL,
                        message: event.target.response,
                        collector: options.collector,
                    };
                    _this.traceInfo();
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        XMLHttpRequest.prototype.send = function () {
            if (this.addEventListener) {
                this.addEventListener('error', xhrEvent);
                this.addEventListener('abort', xhrEvent);
                this.addEventListener('timeout', xhrEvent);
            }
            else {
                var stateChange_1 = this.onreadystatechange;
                this.onreadystatechange = function (event) {
                    stateChange_1.apply(this, arguments);
                    if (this.readyState === 4) {
                        xhrEvent(event);
                    }
                };
            }
            return xhrSend.apply(this, arguments);
        };
    };
    return AjaxErrors;
}(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (new AjaxErrors());


/***/ }),

/***/ "./src/errors/index.ts":
/*!*****************************!*\
  !*** ./src/errors/index.ts ***!
  \*****************************/
/*! exports provided: JSErrors, PromiseErrors, AjaxErrors, ResourceErrors, VueErrors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js */ "./src/errors/js.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JSErrors", function() { return _js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./promise */ "./src/errors/promise.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PromiseErrors", function() { return _promise__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ajax */ "./src/errors/ajax.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AjaxErrors", function() { return _ajax__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resource */ "./src/errors/resource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResourceErrors", function() { return _resource__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vue */ "./src/errors/vue.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VueErrors", function() { return _vue__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








/***/ }),

/***/ "./src/errors/js.ts":
/*!**************************!*\
  !*** ./src/errors/js.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
/* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
/* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var JSErrors = /** @class */ (function (_super) {
    __extends(JSErrors, _super);
    function JSErrors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSErrors.prototype.handleErrors = function (options) {
        var _this = this;
        window.onerror = function (message, url, line, col, error) {
            // let errorType ;
            // if('string' === typeof message){
            //   errorType = message.split(":")[5];
            // }else{
            //   errorType = message;
            //   console.info(errorType);
            // }
            _this.logInfo = {
                uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                service: options.service,
                serviceVersion: options.serviceVersion,
                pagePath: options.pagePath,
                category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].JS_ERROR,
                grade: _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                errorUrl: url,
                line: line,
                col: col,
                message: message,
                collector: options.collector,
            };
            _this.traceInfo();
        };
    };
    return JSErrors;
}(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (new JSErrors());


/***/ }),

/***/ "./src/errors/promise.ts":
/*!*******************************!*\
  !*** ./src/errors/promise.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
/* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
/* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var PromiseErrors = /** @class */ (function (_super) {
    __extends(PromiseErrors, _super);
    function PromiseErrors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PromiseErrors.prototype.handleErrors = function (options) {
        var _this = this;
        window.addEventListener('unhandledrejection', function (event) {
            try {
                var url = '';
                if (!event || !event.reason) {
                    return;
                }
                if (event.reason.config && event.reason.config.url) {
                    url = event.reason.config.url;
                }
                _this.logInfo = {
                    uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                    service: options.service,
                    serviceVersion: options.serviceVersion,
                    pagePath: options.pagePath,
                    category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].PROMISE_ERROR,
                    grade: _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                    errorUrl: url,
                    message: event.reason,
                    collector: options.collector,
                };
                _this.traceInfo();
            }
            catch (error) {
                console.log(error);
            }
        });
    };
    return PromiseErrors;
}(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (new PromiseErrors());


/***/ }),

/***/ "./src/errors/resource.ts":
/*!********************************!*\
  !*** ./src/errors/resource.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
/* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
/* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ResourceErrors = /** @class */ (function (_super) {
    __extends(ResourceErrors, _super);
    function ResourceErrors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceErrors.prototype.handleErrors = function (options) {
        var _this = this;
        window.addEventListener('error', function (event) {
            try {
                if (!event) {
                    return;
                }
                var target = event.target || event.srcElement;
                var isElementTarget = target instanceof HTMLScriptElement ||
                    target instanceof HTMLLinkElement ||
                    target instanceof HTMLImageElement;
                if (!isElementTarget) {
                    // return js error
                    return;
                }
                _this.logInfo = {
                    uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                    service: options.service,
                    serviceVersion: options.serviceVersion,
                    pagePath: options.pagePath,
                    category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].RESOURCE_ERROR,
                    grade: target.tagName === 'IMG' ? _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].WARNING : _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                    errorUrl: target.src || target.href,
                    message: "load " + target.tagName + " resource error",
                    collector: options.collector,
                };
                _this.traceInfo();
            }
            catch (error) {
                throw error;
            }
        }, true);
    };
    return ResourceErrors;
}(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (new ResourceErrors());


/***/ }),

/***/ "./src/errors/vue.ts":
/*!***************************!*\
  !*** ./src/errors/vue.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
/* harmony import */ var _services_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/base */ "./src/services/base.ts");
/* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var VueErrors = /** @class */ (function (_super) {
    __extends(VueErrors, _super);
    function VueErrors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VueErrors.prototype.handleErrors = function (options, Vue) {
        var _this = this;
        Vue.config.errorHandler = function (error, vm, info) {
            try {
                _this.logInfo = {
                    uniqueId: Object(_services_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
                    service: options.service,
                    serviceVersion: options.serviceVersion,
                    pagePath: options.pagePath,
                    category: _services_constant__WEBPACK_IMPORTED_MODULE_2__["ErrorsCategory"].VUE_ERROR,
                    grade: _services_constant__WEBPACK_IMPORTED_MODULE_2__["GradeTypeEnum"].ERROR,
                    errorUrl: '',
                    message: info,
                    collector: options.collector,
                };
                _this.traceInfo();
            }
            catch (error) {
                throw error;
            }
        };
    };
    return VueErrors;
}(_services_base__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (new VueErrors());


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _monitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monitor */ "./src/monitor.ts");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.ClientMonitor = _monitor__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_monitor__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/interceptors/fetch.js":
/*!***********************************!*\
  !*** ./src/interceptors/fetch.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return windowFetch; });
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function windowFetch() {
  window.fetch = whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__["fetch"];
}


/***/ }),

/***/ "./src/interceptors/xhr.ts":
/*!*********************************!*\
  !*** ./src/interceptors/xhr.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return xhrInterceptor; });
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function xhrInterceptor() {
    var originalXHR = window.XMLHttpRequest;
    var xhrSend = XMLHttpRequest.prototype.send;
    var xhrOpen = XMLHttpRequest.prototype.open;
    originalXHR.getRequestConfig = [];
    function ajaxEventTrigger(event) {
        var ajaxEvent = new CustomEvent(event, { detail: this });
        window.dispatchEvent(ajaxEvent);
    }
    function customizedXHR() {
        var liveXHR = new originalXHR();
        liveXHR.addEventListener('readystatechange', function () {
            ajaxEventTrigger.call(this, 'xhrReadyStateChange');
        }, false);
        liveXHR.open = function (method, url) {
            this.getRequestConfig = arguments;
            return xhrOpen.apply(this, arguments);
        };
        liveXHR.send = function (body) {
            return xhrSend.apply(this, arguments);
        };
        return liveXHR;
    }
    window.XMLHttpRequest = customizedXHR;
}


/***/ }),

/***/ "./src/monitor.ts":
/*!************************!*\
  !*** ./src/monitor.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _errors_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors/index */ "./src/errors/index.ts");
/* harmony import */ var _performance_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./performance/index */ "./src/performance/index.ts");
/* harmony import */ var _trace_segment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trace/segment */ "./src/trace/segment.ts");
/* harmony import */ var _behaviorTrace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./behaviorTrace */ "./src/behaviorTrace.ts");
/* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/uuid */ "./src/services/uuid.ts");
/* harmony import */ var _users_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users/index */ "./src/users/index.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};






var ClientMonitor = {
    customOptions: {
        collector: location.origin,
        jsErrors: true,
        apiErrors: true,
        resourceErrors: true,
        autoTracePerf: true,
        useFmp: false,
        enableSPA: false,
        traceSDKInternal: false,
        detailMode: true,
    },
    register: function (configs) {
        this.customOptions = __assign(__assign({}, this.customOptions), configs);
        this.errors(this.customOptions);
        if (!this.customOptions.enableSPA) {
            this.performance(this.customOptions);
        }
        Object(_trace_segment__WEBPACK_IMPORTED_MODULE_2__["default"])(this.customOptions);
    },
    performance: function (configs) {
        // trace and report perf data and pv to serve when page loaded
        if (document.readyState === 'complete') {
            // 用户行为追踪id
            _behaviorTrace__WEBPACK_IMPORTED_MODULE_3__["default"].behaviorTraceId = Object(_services_uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
            _performance_index__WEBPACK_IMPORTED_MODULE_1__["default"].recordPerf(configs);
            // 新增数据  用户行为相关数据
            _users_index__WEBPACK_IMPORTED_MODULE_5__["default"].recordUserBehavior(configs);
        }
        else {
            window.addEventListener('load', function () {
                // 用户行为追踪id
                _behaviorTrace__WEBPACK_IMPORTED_MODULE_3__["default"].behaviorTraceId = Object(_services_uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
                _performance_index__WEBPACK_IMPORTED_MODULE_1__["default"].recordPerf(configs);
                // 新增数据  用户行为相关数据
                _users_index__WEBPACK_IMPORTED_MODULE_5__["default"].recordUserBehavior(configs);
            }, false);
        }
        if (this.customOptions.enableSPA) {
            // hash router
            window.addEventListener('hashchange', function () {
                // 用户行为追踪
                _behaviorTrace__WEBPACK_IMPORTED_MODULE_3__["default"].behaviorTraceId = Object(_services_uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
                _performance_index__WEBPACK_IMPORTED_MODULE_1__["default"].recordPerf(configs);
                // 新增数据 用户行为相关数据
                _users_index__WEBPACK_IMPORTED_MODULE_5__["default"].recordUserBehavior(configs);
            }, false);
        }
    },
    errors: function (options) {
        var service = options.service, pagePath = options.pagePath, serviceVersion = options.serviceVersion, collector = options.collector;
        if (options.jsErrors) {
            _errors_index__WEBPACK_IMPORTED_MODULE_0__["JSErrors"].handleErrors({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector });
            _errors_index__WEBPACK_IMPORTED_MODULE_0__["PromiseErrors"].handleErrors({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector });
            if (options.vue) {
                _errors_index__WEBPACK_IMPORTED_MODULE_0__["VueErrors"].handleErrors({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector }, options.vue);
            }
        }
        if (options.apiErrors) {
            _errors_index__WEBPACK_IMPORTED_MODULE_0__["AjaxErrors"].handleError({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector });
        }
        if (options.resourceErrors) {
            _errors_index__WEBPACK_IMPORTED_MODULE_0__["ResourceErrors"].handleErrors({ service: service, pagePath: pagePath, serviceVersion: serviceVersion, collector: collector });
        }
    },
    setPerformance: function (configs) {
        // history router
        this.customOptions = __assign(__assign({}, this.customOptions), configs);
        this.performance(this.customOptions);
    },
};
/* harmony default export */ __webpack_exports__["default"] = (ClientMonitor);


/***/ }),

/***/ "./src/performance/fmp.ts":
/*!********************************!*\
  !*** ./src/performance/fmp.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var getStyle = function (element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    }
    else {
        return element.currentStyle[attr];
    }
};
// element weight for calculate score
var ELE_WEIGHT;
(function (ELE_WEIGHT) {
    ELE_WEIGHT[ELE_WEIGHT["SVG"] = 2] = "SVG";
    ELE_WEIGHT[ELE_WEIGHT["IMG"] = 2] = "IMG";
    ELE_WEIGHT[ELE_WEIGHT["CANVAS"] = 4] = "CANVAS";
    ELE_WEIGHT[ELE_WEIGHT["OBJECT"] = 4] = "OBJECT";
    ELE_WEIGHT[ELE_WEIGHT["EMBED"] = 4] = "EMBED";
    ELE_WEIGHT[ELE_WEIGHT["VIDEO"] = 4] = "VIDEO";
})(ELE_WEIGHT || (ELE_WEIGHT = {}));
var START_TIME = performance.now();
var IGNORE_TAG_SET = ['SCRIPT', 'STYLE', 'META', 'HEAD', 'LINK'];
var LIMIT = 3000;
var WW = window.innerWidth;
var WH = window.innerHeight;
var DELAY = 500; // fmp retry interval
var FMPTiming = /** @class */ (function () {
    function FMPTiming() {
        this.fmpTime = 0;
        this.statusCollector = []; // nodes change time
        this.flag = true;
        this.observer = null;
        this.callbackCount = 0;
        this.entries = {};
        if (!performance || !performance.getEntries) {
            console.log('your browser do not support performance.getEntries');
            return;
        }
        this.initObserver();
    }
    FMPTiming.prototype.getFirstSnapShot = function () {
        var time = performance.now();
        var $body = document.body;
        if ($body) {
            this.setTag($body, this.callbackCount);
        }
        this.statusCollector.push({
            time: time,
        });
    };
    FMPTiming.prototype.initObserver = function () {
        var _this = this;
        this.getFirstSnapShot();
        this.observer = new MutationObserver(function () {
            _this.callbackCount += 1;
            var time = performance.now();
            var $body = document.body;
            if ($body) {
                _this.setTag($body, _this.callbackCount);
            }
            _this.statusCollector.push({
                time: time,
            });
        });
        // observe all child nodes
        this.observer.observe(document, {
            childList: true,
            subtree: true,
        });
        // calculate score when page loaded
        if (document.readyState === 'complete') {
            this.calculateFinalScore();
        }
        else {
            window.addEventListener('load', function () {
                _this.calculateFinalScore();
            }, false);
        }
    };
    FMPTiming.prototype.calculateFinalScore = function () {
        var _this = this;
        if (MutationEvent && this.flag) {
            if (this.checkNeedCancel(START_TIME)) {
                // cancel observer for dom change
                this.observer.disconnect();
                this.flag = false;
                var res = this.getTreeScore(document.body);
                var tp = null;
                for (var _i = 0, _a = res.dpss; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (tp && tp.st) {
                        if (tp.st < item.st) {
                            tp = item;
                        }
                    }
                    else {
                        tp = item;
                    }
                }
                // Get all of soures load time
                performance.getEntries().forEach(function (item) {
                    _this.entries[item.name] = item.responseEnd;
                });
                if (!tp) {
                    return false;
                }
                var resultEls = this.filterResult(tp.els);
                var fmpTiming = this.getFmpTime(resultEls);
                this.fmpTime = fmpTiming;
            }
            else {
                setTimeout(function () {
                    _this.calculateFinalScore();
                }, DELAY);
            }
        }
    };
    FMPTiming.prototype.getFmpTime = function (resultEls) {
        var rt = 0;
        for (var _i = 0, resultEls_1 = resultEls; _i < resultEls_1.length; _i++) {
            var item = resultEls_1[_i];
            var time = 0;
            if (item.weight === 1) {
                var index = parseInt(item.ele.getAttribute('fmp_c'), 10);
                time = this.statusCollector[index].time;
            }
            else if (item.weight === 2) {
                if (item.ele.tagName === 'IMG') {
                    time = this.entries[item.ele.src];
                }
                else if (item.ele.tagName === 'SVG') {
                    var index = parseInt(item.ele.getAttribute('fmp_c'), 10);
                    time = this.statusCollector[index].time;
                }
                else {
                    var match = getStyle(item.ele, 'background-image').match(/url\(\"(.*?)\"\)/);
                    var url = void 0;
                    if (match && match[1]) {
                        url = match[1];
                    }
                    if (!url.includes('http')) {
                        url = location.protocol + match[1];
                    }
                    time = this.entries[url];
                }
            }
            else if (item.weight === 4) {
                if (item.ele.tagName === 'CANVAS') {
                    var index = parseInt(item.ele.getAttribute('fmp_c'), 10);
                    time = this.statusCollector[index] && this.statusCollector[index].time;
                }
                else if (item.ele.tagName === 'VIDEO') {
                    time = this.entries[item.ele.src];
                    if (!time) {
                        time = this.entries[item.ele.poster];
                    }
                }
            }
            if (typeof time !== 'number') {
                time = 0;
            }
            if (rt < time) {
                rt = time;
            }
        }
        return rt;
    };
    /**
     * The nodes with the highest score in the visible area are collected and the average value is taken,
     * and the low score ones are eliminated
     */
    FMPTiming.prototype.filterResult = function (els) {
        if (els.length === 1) {
            return els;
        }
        var sum = 0;
        els.forEach(function (item) {
            sum += item.st;
        });
        var avg = sum / els.length;
        return els.filter(function (item) {
            return item.st > avg;
        });
    };
    FMPTiming.prototype.checkNeedCancel = function (start) {
        var time = performance.now() - start;
        var lastCalTime = this.statusCollector.length > 0 ? this.statusCollector[this.statusCollector.length - 1].time : 0;
        return time > LIMIT || time - lastCalTime > 1000;
    };
    FMPTiming.prototype.getTreeScore = function (node) {
        if (!node) {
            return {};
        }
        var dpss = [];
        var children = node.children;
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            // Only calculate marked elements
            if (!child.getAttribute('fmp_c')) {
                continue;
            }
            var s = this.getTreeScore(child);
            if (s.st) {
                dpss.push(s);
            }
        }
        return this.calcaulteGrades(node, dpss);
    };
    FMPTiming.prototype.calcaulteGrades = function (ele, dpss) {
        var _a = ele.getBoundingClientRect(), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
        var isInViewPort = true;
        if (WH < top || WW < left) {
            isInViewPort = false;
        }
        var sdp = 0;
        dpss.forEach(function (item) {
            sdp += item.st;
        });
        var weight = Number(ELE_WEIGHT[ele.tagName]) || 1;
        // If there is a common element of the background image, it is calculated according to the picture
        if (weight === 1 &&
            getStyle(ele, 'background-image') &&
            getStyle(ele, 'background-image') !== 'initial' &&
            getStyle(ele, 'background-image') !== 'none') {
            weight = ELE_WEIGHT.IMG;
        }
        // score = the area of element
        var st = isInViewPort ? width * height * weight : 0;
        var els = [{ ele: ele, st: st, weight: weight }];
        var root = ele;
        // The percentage of the current element in the viewport
        var areaPercent = this.calculateAreaParent(ele);
        // If the sum of the child's weights is greater than the parent's true weight
        if (sdp > st * areaPercent || areaPercent === 0) {
            st = sdp;
            els = [];
            for (var _i = 0, dpss_1 = dpss; _i < dpss_1.length; _i++) {
                var item = dpss_1[_i];
                els = els.concat(item.els);
            }
        }
        return {
            dpss: dpss,
            st: st,
            els: els,
            root: root,
        };
    };
    FMPTiming.prototype.calculateAreaParent = function (ele) {
        var _a = ele.getBoundingClientRect(), left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom, width = _a.width, height = _a.height;
        var winLeft = 0;
        var winTop = 0;
        var winRight = WW;
        var winBottom = WH;
        var overlapX = right - left + (winRight - winLeft) - (Math.max(right, winRight) - Math.min(left, winLeft));
        var overlapY = bottom - top + (winBottom - winTop) - (Math.max(bottom, winBottom) - Math.min(top, winTop));
        if (overlapX <= 0 || overlapY <= 0) {
            return 0;
        }
        return (overlapX * overlapY) / (width * height);
    };
    // Depth first traversal to mark nodes
    FMPTiming.prototype.setTag = function (target, callbackCount) {
        var tagName = target.tagName;
        if (IGNORE_TAG_SET.indexOf(tagName) === -1) {
            var $children = target.children;
            if ($children && $children.length > 0) {
                for (var i = $children.length - 1; i >= 0; i--) {
                    var $child = $children[i];
                    var hasSetTag = $child.getAttribute('fmp_c') !== null;
                    // If it is not marked, whether the marking condition is met is detected
                    if (!hasSetTag) {
                        var _a = $child.getBoundingClientRect(), left = _a.left, top_1 = _a.top, width = _a.width, height = _a.height;
                        if (WH < top_1 || WW < left || width === 0 || height === 0) {
                            continue;
                        }
                        $child.setAttribute('fmp_c', "" + callbackCount);
                    }
                    this.setTag($child, callbackCount);
                }
            }
        }
    };
    return FMPTiming;
}());
/* harmony default export */ __webpack_exports__["default"] = (FMPTiming);


/***/ }),

/***/ "./src/performance/index.ts":
/*!**********************************!*\
  !*** ./src/performance/index.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_report__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/report */ "./src/services/report.ts");
/* harmony import */ var _perf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./perf */ "./src/performance/perf.ts");
/* harmony import */ var _fmp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fmp */ "./src/performance/fmp.ts");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var TracePerf = /** @class */ (function () {
    function TracePerf() {
        this.perfConfig = {
            perfDetail: {},
        };
    }
    TracePerf.prototype.recordPerf = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var fmp, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fmp = { fmpTime: undefined };
                        if (!options.autoTracePerf) return [3 /*break*/, 3];
                        _a = this.perfConfig;
                        return [4 /*yield*/, new _perf__WEBPACK_IMPORTED_MODULE_1__["default"]().getPerfTiming()];
                    case 1:
                        _a.perfDetail = _b.sent();
                        if (!options.useFmp) return [3 /*break*/, 3];
                        return [4 /*yield*/, new _fmp__WEBPACK_IMPORTED_MODULE_2__["default"]()];
                    case 2:
                        fmp = _b.sent();
                        _b.label = 3;
                    case 3:
                        // auto report pv and perf data
                        setTimeout(function () {
                            var perfDetail = options.autoTracePerf
                                ? __assign(__assign({}, _this.perfConfig.perfDetail), { fmpTime: options.useFmp ? parseInt(String(fmp.fmpTime), 10) : undefined }) : undefined;
                            var perfInfo = __assign(__assign({}, perfDetail), { pagePath: options.pagePath, serviceVersion: options.serviceVersion, service: options.service });
                            new _services_report__WEBPACK_IMPORTED_MODULE_0__["default"]('PERF', options.collector).sendByXhr(perfInfo);
                            // clear perf data
                            _this.clearPerf();
                        }, 10000);
                        return [2 /*return*/];
                }
            });
        });
    };
    TracePerf.prototype.clearPerf = function () {
        if (!(window.performance && window.performance.clearResourceTimings)) {
            return;
        }
        window.performance.clearResourceTimings();
        this.perfConfig = {
            perfDetail: {}
        };
    };
    return TracePerf;
}());
/* harmony default export */ __webpack_exports__["default"] = (new TracePerf());


/***/ }),

/***/ "./src/performance/perf.ts":
/*!*********************************!*\
  !*** ./src/performance/perf.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var PagePerf = /** @class */ (function () {
    function PagePerf() {
    }
    PagePerf.prototype.getPerfTiming = function () {
        try {
            if (!window.performance || !window.performance.timing) {
                console.log('your browser do not support performance');
                return;
            }
            var timing = window.performance.timing;
            var redirectTime = 0;
            if (timing.navigationStart !== undefined) {
                redirectTime = parseInt(String(timing.fetchStart - timing.navigationStart), 10);
            }
            else if (timing.redirectEnd !== undefined) {
                redirectTime = parseInt(String(timing.redirectEnd - timing.redirectStart), 10);
            }
            else {
                redirectTime = 0;
            }
            return {
                redirectTime: redirectTime,
                dnsTime: parseInt(String(timing.domainLookupEnd - timing.domainLookupStart), 10),
                ttfbTime: parseInt(String(timing.responseStart - timing.requestStart), 10),
                tcpTime: parseInt(String(timing.connectEnd - timing.connectStart), 10),
                transTime: parseInt(String(timing.responseEnd - timing.responseStart), 10),
                domAnalysisTime: parseInt(String(timing.domInteractive - timing.responseEnd), 10),
                fptTime: parseInt(String(timing.responseEnd - timing.fetchStart), 10),
                domReadyTime: parseInt(String(timing.domContentLoadedEventEnd - timing.fetchStart), 10),
                loadPageTime: parseInt(String(timing.loadEventStart - timing.fetchStart), 10),
                // Synchronous load resources in the page
                resTime: parseInt(String(timing.loadEventStart - timing.domContentLoadedEventEnd), 10),
                // Only valid for HTTPS
                sslTime: location.protocol === 'https:' && timing.secureConnectionStart > 0 ?
                    parseInt(String(timing.connectEnd - timing.secureConnectionStart), 10) : 0,
                ttlTime: parseInt(String(timing.domInteractive - timing.fetchStart), 10),
                firstPackTime: parseInt(String(timing.responseStart - timing.domainLookupStart), 10),
                fmpTime: 0,
            };
        }
        catch (e) {
            throw e;
        }
    };
    return PagePerf;
}());
/* harmony default export */ __webpack_exports__["default"] = (PagePerf);


/***/ }),

/***/ "./src/performance/resource.ts":
/*!*************************************!*\
  !*** ./src/performance/resource.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var PageResource = /** @class */ (function () {
    function PageResource() {
    }
    PageResource.prototype.getResource = function () {
        try {
            if (!window.performance || !window.performance.timing) {
                console.log('your browser do not support performance');
                return;
            }
            return {
                pageReource: window.performance.getEntriesByType("resource")
            };
        }
        catch (e) {
            throw e;
        }
    };
    return PageResource;
}());
/* harmony default export */ __webpack_exports__["default"] = (PageResource);


/***/ }),

/***/ "./src/services/base.ts":
/*!******************************!*\
  !*** ./src/services/base.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/services/task.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./src/services/constant.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user */ "./src/user.ts");
/* harmony import */ var _behaviorTrace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../behaviorTrace */ "./src/behaviorTrace.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var jsErrorPv = false;
var Base = /** @class */ (function () {
    function Base() {
        this.logInfo = {
            uniqueId: '',
            service: '',
            serviceVersion: '',
            pagePath: '',
            category: _constant__WEBPACK_IMPORTED_MODULE_1__["ErrorsCategory"].UNKNOWN_ERROR,
            grade: _constant__WEBPACK_IMPORTED_MODULE_1__["GradeTypeEnum"].INFO,
            errorUrl: '',
            line: 0,
            col: 0,
            message: '',
            firstReportedError: false,
            collector: '',
        };
        // 用户信息
        this.user = {
            userInfo: {},
        };
    }
    Base.prototype.traceInfo = function () {
        // mark js error pv
        if (!jsErrorPv && this.logInfo.category === _constant__WEBPACK_IMPORTED_MODULE_1__["ErrorsCategory"].JS_ERROR) {
            jsErrorPv = true;
            this.logInfo.firstReportedError = true;
        }
        this.handleRecordError();
        setTimeout(function () {
            _task__WEBPACK_IMPORTED_MODULE_0__["default"].fireTasks();
        }, 100);
    };
    Base.prototype.handleRecordError = function () {
        try {
            if (!this.logInfo.message) {
                return;
            }
            var errorInfo = this.handleErrorInfo();
            _task__WEBPACK_IMPORTED_MODULE_0__["default"].addTask(errorInfo);
        }
        catch (error) {
            throw error;
        }
    };
    Base.prototype.handleErrorInfo = function () {
        var message = "error category:" + this.logInfo.category + "\r\n log info:" + this.logInfo.message + "\r\n\n      error url: " + this.logInfo.errorUrl + "\r\n ";
        switch (this.logInfo.category) {
            case _constant__WEBPACK_IMPORTED_MODULE_1__["ErrorsCategory"].JS_ERROR:
                message += "error line number: " + this.logInfo.line + "\r\n error col number:" + this.logInfo.col + "\r\n";
                if (this.logInfo.errorInfo && this.logInfo.errorInfo.stack) {
                    message += "error stack: " + this.logInfo.errorInfo.stack + "\r\n";
                }
                break;
            default:
                message += "other error: " + this.logInfo.errorInfo + "\r\n";
                break;
        }
        // 添加用户信息
        this.user.userInfo = new _user__WEBPACK_IMPORTED_MODULE_2__["default"]().getUserInfo();
        var recordInfo = __assign(__assign(__assign(__assign(__assign({}, this.logInfo), { message: message }), { errorType: message.substr(message.lastIndexOf('log info:') + "log info:".length).split(":")[0].replace(/(^\s*)|(\s*$)/g, "").replace(/[\r\n]/g, "") }), this.user.userInfo), { behaviorTraceId: _behaviorTrace__WEBPACK_IMPORTED_MODULE_3__["default"].behaviorTraceId });
        return recordInfo;
    };
    return Base;
}());
/* harmony default export */ __webpack_exports__["default"] = (Base);


/***/ }),

/***/ "./src/services/constant.ts":
/*!**********************************!*\
  !*** ./src/services/constant.ts ***!
  \**********************************/
/*! exports provided: ErrorsCategory, GradeTypeEnum, ReportTypes, SpanLayer, SpanType, ReadyStatus, ComponentId, ServiceTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorsCategory", function() { return ErrorsCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeTypeEnum", function() { return GradeTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportTypes", function() { return ReportTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpanLayer", function() { return SpanLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpanType", function() { return SpanType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReadyStatus", function() { return ReadyStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentId", function() { return ComponentId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceTag", function() { return ServiceTag; });
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ErrorsCategory;
(function (ErrorsCategory) {
    ErrorsCategory["AJAX_ERROR"] = "ajax";
    ErrorsCategory["RESOURCE_ERROR"] = "resource";
    ErrorsCategory["VUE_ERROR"] = "vue";
    ErrorsCategory["PROMISE_ERROR"] = "promise";
    ErrorsCategory["JS_ERROR"] = "js";
    ErrorsCategory["UNKNOWN_ERROR"] = "unknown";
})(ErrorsCategory || (ErrorsCategory = {}));
var GradeTypeEnum;
(function (GradeTypeEnum) {
    GradeTypeEnum["INFO"] = "Info";
    GradeTypeEnum["WARNING"] = "Warning";
    GradeTypeEnum["ERROR"] = "Error";
})(GradeTypeEnum || (GradeTypeEnum = {}));
var ReportTypes;
(function (ReportTypes) {
    ReportTypes["ERROR"] = "/browser/errorLog";
    ReportTypes["ERRORS"] = "/browser/errorLogs";
    ReportTypes["PERF"] = "/browser/perfData";
    ReportTypes["SEGMENT"] = "/v3/segment";
    ReportTypes["SEGMENTS"] = "/v3/segments";
    // 新增接口 用户相关数据
    ReportTypes["USERBH"] = "/browser/userBehavior";
})(ReportTypes || (ReportTypes = {}));
var SpanLayer = 'Http';
var SpanType = 'Exit';
var ReadyStatus;
(function (ReadyStatus) {
    ReadyStatus[ReadyStatus["OPENED"] = 1] = "OPENED";
    ReadyStatus[ReadyStatus["DONE"] = 4] = "DONE";
})(ReadyStatus || (ReadyStatus = {}));
var ComponentId = 10001; // ajax
var ServiceTag = '<browser>';


/***/ }),

/***/ "./src/services/report.ts":
/*!********************************!*\
  !*** ./src/services/report.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/services/constant.ts");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Report = /** @class */ (function () {
    function Report(type, collector) {
        this.url = '';
        if (type === 'ERROR') {
            this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].ERROR;
        }
        else if (type === 'ERRORS') {
            this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].ERRORS;
        }
        else if (type === 'SEGMENT') {
            this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].SEGMENT;
        }
        else if (type === 'SEGMENTS') {
            this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].SEGMENTS;
        }
        else if (type === 'PERF') {
            this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].PERF;
        }
        else if (type === 'USERBH') {
            this.url = collector + _constant__WEBPACK_IMPORTED_MODULE_0__["ReportTypes"].USERBH;
        }
    }
    Report.prototype.sendByFetch = function (data) {
        delete data.collector;
        if (!this.url) {
            return;
        }
        var sendRequest = new Request(this.url, { method: 'POST', body: JSON.stringify(data) });
        fetch(sendRequest)
            .then(function (response) {
            if (response.status >= 400 || response.status === 0) {
                throw new Error('Something went wrong on api server!');
            }
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    Report.prototype.sendByXhr = function (data) {
        delete data.collector;
        if (!this.url) {
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('post', this.url, true);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status < 400) {
                console.log('Report successfully');
            }
        };
        xhr.send(JSON.stringify(data));
    };
    return Report;
}());
/* harmony default export */ __webpack_exports__["default"] = (Report);


/***/ }),

/***/ "./src/services/task.ts":
/*!******************************!*\
  !*** ./src/services/task.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _report__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./report */ "./src/services/report.ts");
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TaskQueue = /** @class */ (function () {
    function TaskQueue() {
        this.queues = [];
    }
    TaskQueue.prototype.addTask = function (data) {
        this.queues.push({ data: data });
    };
    TaskQueue.prototype.fireTasks = function () {
        if (!this.queues || !this.queues.length) {
            return;
        }
        var item = this.queues[0];
        new _report__WEBPACK_IMPORTED_MODULE_0__["default"]('ERROR', item.data.collector).sendByXhr(item.data);
        this.queues.splice(0, 1);
        this.fireTasks();
    };
    return TaskQueue;
}());
/* harmony default export */ __webpack_exports__["default"] = (new TaskQueue());


/***/ }),

/***/ "./src/services/uuid.ts":
/*!******************************!*\
  !*** ./src/services/uuid.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return uuid; });
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        /* tslint:disable */
        var r = (Math.random() * 16) | 0;
        /* tslint:disable */
        var v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


/***/ }),

/***/ "./src/trace/segment.ts":
/*!******************************!*\
  !*** ./src/trace/segment.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return traceSegment; });
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-base64 */ "./node_modules/js-base64/base64.mjs");
/* harmony import */ var _interceptors_xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../interceptors/xhr */ "./src/interceptors/xhr.ts");
/* harmony import */ var _services_uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/uuid */ "./src/services/uuid.ts");
/* harmony import */ var _services_report__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/report */ "./src/services/report.ts");
/* harmony import */ var _services_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/constant */ "./src/services/constant.ts");
/* harmony import */ var _interceptors_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../interceptors/fetch */ "./src/interceptors/fetch.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






function traceSegment(options) {
    var segments = [];
    var segCollector = [];
    // inject interceptor
    Object(_interceptors_xhr__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_interceptors_fetch__WEBPACK_IMPORTED_MODULE_5__["default"])();
    window.addEventListener('xhrReadyStateChange', function (event) {
        var segment = {
            traceId: '',
            service: options.service + _services_constant__WEBPACK_IMPORTED_MODULE_4__["ServiceTag"],
            spans: [],
            serviceInstance: options.serviceVersion,
            traceSegmentId: '',
        };
        var xhrState = event.detail.readyState;
        var config = event.detail.getRequestConfig;
        var url = {};
        if (config[1].includes('http://') || config[1].includes('https://')) {
            url = new URL(config[1]);
        }
        else {
            url = config[1];
        }
        if ([_services_constant__WEBPACK_IMPORTED_MODULE_4__["ReportTypes"].ERROR, _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReportTypes"].PERF, _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReportTypes"].SEGMENTS].includes(url.pathname) &&
            !options.traceSDKInternal) {
            return;
        }
        // The values of xhrState are from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        if (xhrState === _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReadyStatus"].OPENED) {
            var traceId = Object(_services_uuid__WEBPACK_IMPORTED_MODULE_2__["default"])();
            var traceSegmentId = Object(_services_uuid__WEBPACK_IMPORTED_MODULE_2__["default"])();
            segCollector.push({
                event: event.detail,
                startTime: new Date().getTime(),
                traceId: traceId,
                traceSegmentId: traceSegmentId,
            });
            var traceIdStr = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(traceId));
            var segmentId = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(traceSegmentId));
            var service = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(segment.service));
            var instance = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(segment.serviceInstance));
            var endpoint = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(options.pagePath));
            var peer = String(Object(js_base64__WEBPACK_IMPORTED_MODULE_0__["encode"])(url.host));
            var index = segment.spans.length;
            var values = 1 + "-" + traceIdStr + "-" + segmentId + "-" + index + "-" + service + "-" + instance + "-" + endpoint + "-" + peer;
            // event.detail.setRequestHeader('sw8', values);
        }
        if (xhrState === _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReadyStatus"].DONE) {
            var endTime = new Date().getTime();
            for (var i = 0; i < segCollector.length; i++) {
                if (segCollector[i].event.readyState === _services_constant__WEBPACK_IMPORTED_MODULE_4__["ReadyStatus"].DONE) {
                    var url_1 = {};
                    if (segCollector[i].event.status) {
                        url_1 = new URL(segCollector[i].event.responseURL);
                    }
                    var exitSpan = {
                        operationName: options.pagePath,
                        startTime: segCollector[i].startTime,
                        endTime: endTime,
                        spanId: segment.spans.length,
                        spanLayer: _services_constant__WEBPACK_IMPORTED_MODULE_4__["SpanLayer"],
                        spanType: _services_constant__WEBPACK_IMPORTED_MODULE_4__["SpanType"],
                        isError: event.detail.status === 0 || event.detail.status >= 400 ? true : false,
                        parentSpanId: segment.spans.length - 1,
                        componentId: _services_constant__WEBPACK_IMPORTED_MODULE_4__["ComponentId"],
                        peer: url_1.host,
                        tags: options.detailMode
                            ? [
                                {
                                    key: 'http.method',
                                    value: config[0],
                                },
                                {
                                    key: 'url',
                                    value: segCollector[i].event.responseURL,
                                },
                            ]
                            : undefined,
                    };
                    segment = __assign(__assign({}, segment), { traceId: segCollector[i].traceId, traceSegmentId: segCollector[i].traceSegmentId });
                    segment.spans.push(exitSpan);
                    segCollector.splice(i, 1);
                }
            }
            segments.push(segment);
        }
    });
    window.onbeforeunload = function (e) {
        if (!segments.length) {
            return;
        }
        new _services_report__WEBPACK_IMPORTED_MODULE_3__["default"]('SEGMENTS', options.collector).sendByXhr(segments);
    };
    //report per 5min
    setInterval(function () {
        if (!segments.length) {
            return;
        }
        new _services_report__WEBPACK_IMPORTED_MODULE_3__["default"]('SEGMENTS', options.collector).sendByXhr(segments);
        segments = [];
    }, 300000);
}


/***/ }),

/***/ "./src/user.ts":
/*!*********************!*\
  !*** ./src/user.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 获取用户信息
 * author:Lily
 * 用户信息：警员ID，浏览器类型，浏览器版本号，操作系统类型，操作系统版本，屏幕高，屏幕宽
 */
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    UserInfo.prototype.getUserInfo = function () {
        try {
            if (!window.navigator) {
                console.log('your browser do not support navigator');
                return;
            }
            // 获取警员ID
            var policeId = this.GetQueryString("policeId");
            // 获取浏览器类型、版本
            var browserInfo = this.getBrowserInfo();
            // 获取操作系统类型、版本
            var systemInfo = this.getSystemInfo();
            return {
                policeId: policeId,
                browserType: browserInfo.type,
                browserVersion: browserInfo.version,
                operatingSystem: systemInfo.type,
                operatingSystemVersion: systemInfo.version,
                screenHeight: window.screen.height,
                screenWidth: window.screen.width,
            };
        }
        catch (e) {
            throw e;
        }
    };
    // 查询地址栏参数
    UserInfo.prototype.GetQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    };
    // 获取浏览器信息
    UserInfo.prototype.getBrowserInfo = function () {
        var browser = {};
        var userAgent = navigator.userAgent.toLowerCase();
        var s;
        (s = userAgent.match(/\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/)) ? browser.ie = s[1] : (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] : (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
        var browserType = 'unknow';
        var browserVersion = 'unknow';
        if (browser.ie) {
            browserType = 'IE';
            browserVersion = browser.ie;
        }
        else {
            if (browser.firefox) {
                browserType = 'firefox';
                browserVersion = browser.firefox;
            }
            else {
                if (browser.chrome) {
                    var is360 = this._mime("application/vnd.chromium.remoting-viewer");
                    if (is360) {
                        browserType = '360';
                    }
                    else {
                        browserType = 'chrome';
                        browserVersion = browser.chrome;
                    }
                }
                else {
                    if (browser.opera) {
                        browserType = 'opera';
                        browserVersion = browser.opera;
                    }
                    else {
                        if (browser.safari) {
                            browserType = 'safari';
                            browserVersion = browser.safari;
                        }
                    }
                }
            }
        }
        var browserInfo = { type: browserType, version: browserVersion };
        return browserInfo;
    };
    // 获取操作系统信息
    UserInfo.prototype.getSystemInfo = function () {
        var systemInfo = {
            type: 'unknow',
            version: 'unknow'
        };
        var userAgent = navigator.userAgent;
        // 检测平台
        var platform = navigator.platform;
        if (platform.indexOf('Win') == 0) {
            systemInfo.type = 'windows';
            if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(userAgent)) {
                if (RegExp['$1'] == 'NT') {
                    systemInfo.version = RegExp['$2'];
                }
                else if (RegExp['$1'] == '9x') {
                    systemInfo.type = 'ME';
                }
                else {
                    systemInfo.type = RegExp['$1'];
                }
            }
        }
        else if (platform.indexOf('Mac') == 0) {
            if (userAgent.indexOf('Mobile') > -1) {
                systemInfo.type = 'IOS';
                systemInfo.version = parseFloat(RegExp['$1'].replace('_', '.'));
            }
            systemInfo.type = 'mac';
        }
        else if (platform.indexOf('Xll') == 0) {
            systemInfo.type = 'unix';
        }
        else if (platform.indexOf('Linux') > 0) {
            systemInfo.type = 'Linux';
        }
        else if (userAgent.indexOf('iPhone') > -1) {
            systemInfo.type = 'iPhone';
        }
        else if (userAgent.indexOf('iPad') > -1) {
            systemInfo.type = 'iPad';
        }
        else if (/Android (\d+\.\d+)/i.test(userAgent)) {
            systemInfo.type = 'android';
            systemInfo.version = parseFloat(RegExp['$1']);
        }
        return systemInfo;
    };
    UserInfo.prototype._mime = function (value) {
        var mimeTypes = navigator.mimeTypes;
        for (var mt in mimeTypes) {
            if (mimeTypes[mt].type === value) {
                return true;
            }
        }
        return false;
    };
    return UserInfo;
}());
/* harmony default export */ __webpack_exports__["default"] = (UserInfo);


/***/ }),

/***/ "./src/users/index.ts":
/*!****************************!*\
  !*** ./src/users/index.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_report__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/report */ "./src/services/report.ts");
/* harmony import */ var _performance_perf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../performance/perf */ "./src/performance/perf.ts");
/* harmony import */ var _performance_fmp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../performance/fmp */ "./src/performance/fmp.ts");
/* harmony import */ var _performance_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../performance/resource */ "./src/performance/resource.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user */ "./src/user.ts");
/* harmony import */ var _behaviorTrace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../behaviorTrace */ "./src/behaviorTrace.ts");
/**
 * 新增：用户相关信息
 * 用户行为追踪ID、应用信息、用户IP、警员编号、浏览器信息、操作系统信息、屏幕分辨率、页面性能、资源信息
 * @author:Lily
 */
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





// 行为追踪信息

var UserBehavior = /** @class */ (function () {
    function UserBehavior() {
        this.perfConfig = {
            perfDetail: {},
            // 页面资源
            resource: {},
        };
        // 用户信息
        this.user = {
            userInfo: {},
        };
    }
    UserBehavior.prototype.recordUserBehavior = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var fmp, _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fmp = { fmpTime: undefined };
                        if (!options.autoTracePerf) return [3 /*break*/, 5];
                        _a = this.perfConfig;
                        return [4 /*yield*/, new _performance_perf__WEBPACK_IMPORTED_MODULE_1__["default"]().getPerfTiming()];
                    case 1:
                        _a.perfDetail = _d.sent();
                        // 用户信息
                        _b = this.user;
                        return [4 /*yield*/, new _user__WEBPACK_IMPORTED_MODULE_4__["default"]().getUserInfo()];
                    case 2:
                        // 用户信息
                        _b.userInfo = _d.sent();
                        // 页面资源
                        _c = this.perfConfig;
                        return [4 /*yield*/, new _performance_resource__WEBPACK_IMPORTED_MODULE_3__["default"]().getResource()];
                    case 3:
                        // 页面资源
                        _c.resource = _d.sent();
                        if (!options.useFmp) return [3 /*break*/, 5];
                        return [4 /*yield*/, new _performance_fmp__WEBPACK_IMPORTED_MODULE_2__["default"]()];
                    case 4:
                        fmp = _d.sent();
                        _d.label = 5;
                    case 5:
                        // auto report pv and perf data
                        setTimeout(function () {
                            var perfDetail = options.autoTracePerf
                                ? __assign(__assign({}, _this.perfConfig.perfDetail), { fmpTime: options.useFmp ? parseInt(String(fmp.fmpTime), 10) : undefined }) : undefined;
                            // 页面加载信息、一次请求
                            var pageLoadOnce = [perfDetail.dnsTime, perfDetail.tcpTime, perfDetail.sslTime, perfDetail.ttfbTime, perfDetail.transTime, perfDetail.domReadyTime, perfDetail.resTime];
                            // 页面性能信息、一次请求
                            var pagePerfOnce = [perfDetail.fptTime, perfDetail.fmpTime, perfDetail.domReadyTime, perfDetail.loadPageTime];
                            // 发送数据
                            var userBehaviorInfo = __assign(__assign({ behaviorTraceId: _behaviorTrace__WEBPACK_IMPORTED_MODULE_5__["default"].behaviorTraceId }, { 
                                // 应用名称
                                service: options.service, 
                                // 应用版本
                                serviceVersion: options.serviceVersion, 
                                // 页面路径
                                pagePath: options.pagePath, 
                                // 白屏时间
                                fptTime: perfDetail.fptTime, 
                                // 首屏时间
                                fmpTime: perfDetail.fmpTime, 
                                // domReady时间
                                domReadyTime: perfDetail.domReadyTime, 
                                // 页面加载时间
                                loadPageTime: perfDetail.loadPageTime, 
                                // 页面加载信息、资源信息
                                pagePerfDataStr: JSON.stringify(__assign({ pageLoadData: pageLoadOnce, pagePerformance: pagePerfOnce }, _this.perfConfig.resource)), 
                                // 发生时间
                                startTime: (new Date()).valueOf() }), _this.user.userInfo);
                            new _services_report__WEBPACK_IMPORTED_MODULE_0__["default"]('USERBH', options.collector).sendByXhr(userBehaviorInfo);
                            // 清空数据
                            _this.clearUserBehavior();
                        }, 10000);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserBehavior.prototype.clearUserBehavior = function () {
        if (!(window.performance && window.performance.clearResourceTimings)) {
            return;
        }
        window.performance.clearResourceTimings();
        this.perfConfig = {
            perfDetail: {},
            // 页面资源
            resource: {},
        };
    };
    return UserBehavior;
}());
/* harmony default export */ __webpack_exports__["default"] = (new UserBehavior());


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzLWJhc2U2NC9iYXNlNjQubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JlaGF2aW9yVHJhY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9ycy9hamF4LnRzIiwid2VicGFjazovLy8uL3NyYy9lcnJvcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9ycy9qcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3JzL3Byb21pc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9ycy9yZXNvdXJjZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3JzL3Z1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyY2VwdG9ycy9mZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJjZXB0b3JzL3hoci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9uaXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVyZm9ybWFuY2UvZm1wLnRzIiwid2VicGFjazovLy8uL3NyYy9wZXJmb3JtYW5jZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVyZm9ybWFuY2UvcGVyZi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVyZm9ybWFuY2UvcmVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2NvbnN0YW50LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9yZXBvcnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL3Rhc2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL3V1aWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYWNlL3NlZ21lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsR0FBRzs7UUFFSDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3QjtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxxQkFBcUIsZ0JBQWdCO1FBQ3JDO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGtCQUFrQiw4QkFBOEI7UUFDaEQ7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esb0JBQW9CLDJCQUEyQjtRQUMvQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxtQkFBbUIsY0FBYztRQUNqQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLEtBQUs7UUFDckI7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsWUFBWTtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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O0FBQ0E7QUFDQTtBQUNtQjtBQUNBO0FBQ007QUFDRDtBQUNDO0FBQ0Q7QUFDUTtBQUNGO0FBQ2Q7QUFDRTtBQUNHO0FBQ2E7QUFDbEI7QUFDRTtBQUNDO0FBQ087QUFDRjtBQUNBO0FBQ0k7QUFDRjtBQUMxQjtBQUM2Qjs7Ozs7Ozs7Ozs7OztBQ3hTN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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bUJBQUM7QUFBRCxDQUFDO0FBRWMsbUVBQUksWUFBWSxFQUFFLEVBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI1Y2NhMTc3NzFlNjQyNzhhYTY0MVwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9pbmRleC50c1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyoqXG4gKiAgYmFzZTY0LnRzXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QgMy1DbGF1c2UgTGljZW5zZS5cbiAqICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcbiAqXG4gKiAgUmVmZXJlbmNlczpcbiAqICAgIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0XG4gKlxuICogQGF1dGhvciBEYW4gS29nYWkgKGh0dHBzOi8vZ2l0aHViLmNvbS9kYW5rb2dhaSlcbiAqL1xuY29uc3QgdmVyc2lvbiA9ICczLjYuMCc7XG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBsb3dlcmNhc2UgYHZlcnNpb25gLlxuICovXG5jb25zdCBWRVJTSU9OID0gdmVyc2lvbjtcbmNvbnN0IF9oYXNhdG9iID0gdHlwZW9mIGF0b2IgPT09ICdmdW5jdGlvbic7XG5jb25zdCBfaGFzYnRvYSA9IHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nO1xuY29uc3QgX2hhc0J1ZmZlciA9IHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbic7XG5jb25zdCBfVEQgPSB0eXBlb2YgVGV4dERlY29kZXIgPT09ICdmdW5jdGlvbicgPyBuZXcgVGV4dERlY29kZXIoKSA6IHVuZGVmaW5lZDtcbmNvbnN0IF9URSA9IHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBUZXh0RW5jb2RlcigpIDogdW5kZWZpbmVkO1xuY29uc3QgYjY0Y2ggPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuY29uc3QgYjY0Y2hzID0gWy4uLmI2NGNoXTtcbmNvbnN0IGI2NHRhYiA9ICgoYSkgPT4ge1xuICAgIGxldCB0YWIgPSB7fTtcbiAgICBhLmZvckVhY2goKGMsIGkpID0+IHRhYltjXSA9IGkpO1xuICAgIHJldHVybiB0YWI7XG59KShiNjRjaHMpO1xuY29uc3QgYjY0cmUgPSAvXig/OltBLVphLXpcXGQrXFwvXXs0fSkqPyg/OltBLVphLXpcXGQrXFwvXXsyfSg/Oj09KT98W0EtWmEtelxcZCtcXC9dezN9PT8pPyQvO1xuY29uc3QgX2Zyb21DQyA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYmluZChTdHJpbmcpO1xuY29uc3QgX1U4QWZyb20gPSB0eXBlb2YgVWludDhBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nXG4gICAgPyBVaW50OEFycmF5LmZyb20uYmluZChVaW50OEFycmF5KVxuICAgIDogKGl0LCBmbiA9ICh4KSA9PiB4KSA9PiBuZXcgVWludDhBcnJheShBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpdCwgMCkubWFwKGZuKSk7XG5jb25zdCBfbWtVcmlTYWZlID0gKHNyYykgPT4gc3JjXG4gICAgLnJlcGxhY2UoL1srXFwvXS9nLCAobTApID0+IG0wID09ICcrJyA/ICctJyA6ICdfJylcbiAgICAucmVwbGFjZSgvPSskL20sICcnKTtcbmNvbnN0IF90aWR5QjY0ID0gKHMpID0+IHMucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9dL2csICcnKTtcbi8qKlxuICogcG9seWZpbGwgdmVyc2lvbiBvZiBgYnRvYWBcbiAqL1xuY29uc3QgYnRvYVBvbHlmaWxsID0gKGJpbikgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdwb2x5ZmlsbGVkJyk7XG4gICAgbGV0IHUzMiwgYzAsIGMxLCBjMiwgYXNjID0gJyc7XG4gICAgY29uc3QgcGFkID0gYmluLmxlbmd0aCAlIDM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW4ubGVuZ3RoOykge1xuICAgICAgICBpZiAoKGMwID0gYmluLmNoYXJDb2RlQXQoaSsrKSkgPiAyNTUgfHxcbiAgICAgICAgICAgIChjMSA9IGJpbi5jaGFyQ29kZUF0KGkrKykpID4gMjU1IHx8XG4gICAgICAgICAgICAoYzIgPSBiaW4uY2hhckNvZGVBdChpKyspKSA+IDI1NSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgY2hhcmFjdGVyIGZvdW5kJyk7XG4gICAgICAgIHUzMiA9IChjMCA8PCAxNikgfCAoYzEgPDwgOCkgfCBjMjtcbiAgICAgICAgYXNjICs9IGI2NGNoc1t1MzIgPj4gMTggJiA2M11cbiAgICAgICAgICAgICsgYjY0Y2hzW3UzMiA+PiAxMiAmIDYzXVxuICAgICAgICAgICAgKyBiNjRjaHNbdTMyID4+IDYgJiA2M11cbiAgICAgICAgICAgICsgYjY0Y2hzW3UzMiAmIDYzXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhZCA/IGFzYy5zbGljZSgwLCBwYWQgLSAzKSArIFwiPT09XCIuc3Vic3RyaW5nKHBhZCkgOiBhc2M7XG59O1xuLyoqXG4gKiBkb2VzIHdoYXQgYHdpbmRvdy5idG9hYCBvZiB3ZWIgYnJvd3NlcnMgZG8uXG4gKiBAcGFyYW0ge1N0cmluZ30gYmluIGJpbmFyeSBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2U2NC1lbmNvZGVkIHN0cmluZ1xuICovXG5jb25zdCBfYnRvYSA9IF9oYXNidG9hID8gKGJpbikgPT4gYnRvYShiaW4pXG4gICAgOiBfaGFzQnVmZmVyID8gKGJpbikgPT4gQnVmZmVyLmZyb20oYmluLCAnYmluYXJ5JykudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgICAgIDogYnRvYVBvbHlmaWxsO1xuY29uc3QgX2Zyb21VaW50OEFycmF5ID0gX2hhc0J1ZmZlclxuICAgID8gKHU4YSkgPT4gQnVmZmVyLmZyb20odThhKS50b1N0cmluZygnYmFzZTY0JylcbiAgICA6ICh1OGEpID0+IHtcbiAgICAgICAgLy8gY2YuIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEyNzEwMDAxL2hvdy10by1jb252ZXJ0LXVpbnQ4LWFycmF5LXRvLWJhc2U2NC1lbmNvZGVkLXN0cmluZy8xMjcxMzMyNiMxMjcxMzMyNlxuICAgICAgICBjb25zdCBtYXhhcmdzID0gMHgxMDAwO1xuICAgICAgICBsZXQgc3RycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHU4YS5sZW5ndGg7IGkgPCBsOyBpICs9IG1heGFyZ3MpIHtcbiAgICAgICAgICAgIHN0cnMucHVzaChfZnJvbUNDLmFwcGx5KG51bGwsIHU4YS5zdWJhcnJheShpLCBpICsgbWF4YXJncykpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2J0b2Eoc3Rycy5qb2luKCcnKSk7XG4gICAgfTtcbi8qKlxuICogY29udmVydHMgYSBVaW50OEFycmF5IHRvIGEgQmFzZTY0IHN0cmluZy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3VybHNhZmVdIFVSTC1hbmQtZmlsZW5hbWUtc2FmZSBhIGxhIFJGQzQ2NDggwqc1XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlNjQgc3RyaW5nXG4gKi9cbmNvbnN0IGZyb21VaW50OEFycmF5ID0gKHU4YSwgdXJsc2FmZSA9IGZhbHNlKSA9PiB1cmxzYWZlID8gX21rVXJpU2FmZShfZnJvbVVpbnQ4QXJyYXkodThhKSkgOiBfZnJvbVVpbnQ4QXJyYXkodThhKTtcbi8vIFRoaXMgdHJpY2sgaXMgZm91bmQgYnJva2VuIGh0dHBzOi8vZ2l0aHViLmNvbS9kYW5rb2dhaS9qcy1iYXNlNjQvaXNzdWVzLzEzMFxuLy8gY29uc3QgdXRvYiA9IChzcmM6IHN0cmluZykgPT4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHNyYykpO1xuLy8gcmV2ZXJ0aW5nIGdvb2Qgb2xkIGZhdGlvbmVkIHJlZ2V4cFxuY29uc3QgY2JfdXRvYiA9IChjKSA9PiB7XG4gICAgaWYgKGMubGVuZ3RoIDwgMikge1xuICAgICAgICB2YXIgY2MgPSBjLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIHJldHVybiBjYyA8IDB4ODAgPyBjXG4gICAgICAgICAgICA6IGNjIDwgMHg4MDAgPyAoX2Zyb21DQygweGMwIHwgKGNjID4+PiA2KSlcbiAgICAgICAgICAgICAgICArIF9mcm9tQ0MoMHg4MCB8IChjYyAmIDB4M2YpKSlcbiAgICAgICAgICAgICAgICA6IChfZnJvbUNDKDB4ZTAgfCAoKGNjID4+PiAxMikgJiAweDBmKSlcbiAgICAgICAgICAgICAgICAgICAgKyBfZnJvbUNDKDB4ODAgfCAoKGNjID4+PiA2KSAmIDB4M2YpKVxuICAgICAgICAgICAgICAgICAgICArIF9mcm9tQ0MoMHg4MCB8IChjYyAmIDB4M2YpKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgY2MgPSAweDEwMDAwXG4gICAgICAgICAgICArIChjLmNoYXJDb2RlQXQoMCkgLSAweEQ4MDApICogMHg0MDBcbiAgICAgICAgICAgICsgKGMuY2hhckNvZGVBdCgxKSAtIDB4REMwMCk7XG4gICAgICAgIHJldHVybiAoX2Zyb21DQygweGYwIHwgKChjYyA+Pj4gMTgpICYgMHgwNykpXG4gICAgICAgICAgICArIF9mcm9tQ0MoMHg4MCB8ICgoY2MgPj4+IDEyKSAmIDB4M2YpKVxuICAgICAgICAgICAgKyBfZnJvbUNDKDB4ODAgfCAoKGNjID4+PiA2KSAmIDB4M2YpKVxuICAgICAgICAgICAgKyBfZnJvbUNDKDB4ODAgfCAoY2MgJiAweDNmKSkpO1xuICAgIH1cbn07XG5jb25zdCByZV91dG9iID0gL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRkZdfFteXFx4MDAtXFx4N0ZdL2c7XG4vKipcbiAqIEBkZXByZWNhdGVkIHNob3VsZCBoYXZlIGJlZW4gaW50ZXJuYWwgdXNlIG9ubHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIFVURi04IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gVVRGLTE2IHN0cmluZ1xuICovXG5jb25zdCB1dG9iID0gKHUpID0+IHUucmVwbGFjZShyZV91dG9iLCBjYl91dG9iKTtcbi8vXG5jb25zdCBfZW5jb2RlID0gX2hhc0J1ZmZlclxuICAgID8gKHMpID0+IEJ1ZmZlci5mcm9tKHMsICd1dGY4JykudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgOiBfVEVcbiAgICAgICAgPyAocykgPT4gX2Zyb21VaW50OEFycmF5KF9URS5lbmNvZGUocykpXG4gICAgICAgIDogKHMpID0+IF9idG9hKHV0b2IocykpO1xuLyoqXG4gKiBjb252ZXJ0cyBhIFVURi04LWVuY29kZWQgc3RyaW5nIHRvIGEgQmFzZTY0IHN0cmluZy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3VybHNhZmVdIGlmIGB0cnVlYCBtYWtlIHRoZSByZXN1bHQgVVJMLXNhZmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2U2NCBzdHJpbmdcbiAqL1xuY29uc3QgZW5jb2RlID0gKHNyYywgdXJsc2FmZSA9IGZhbHNlKSA9PiB1cmxzYWZlXG4gICAgPyBfbWtVcmlTYWZlKF9lbmNvZGUoc3JjKSlcbiAgICA6IF9lbmNvZGUoc3JjKTtcbi8qKlxuICogY29udmVydHMgYSBVVEYtOC1lbmNvZGVkIHN0cmluZyB0byBVUkwtc2FmZSBCYXNlNjQgUkZDNDY0OCDCpzUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlNjQgc3RyaW5nXG4gKi9cbmNvbnN0IGVuY29kZVVSSSA9IChzcmMpID0+IGVuY29kZShzcmMsIHRydWUpO1xuLy8gVGhpcyB0cmljayBpcyBmb3VuZCBicm9rZW4gaHR0cHM6Ly9naXRodWIuY29tL2RhbmtvZ2FpL2pzLWJhc2U2NC9pc3N1ZXMvMTMwXG4vLyBjb25zdCBidG91ID0gKHNyYzogc3RyaW5nKSA9PiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKHNyYykpO1xuLy8gcmV2ZXJ0aW5nIGdvb2Qgb2xkIGZhdGlvbmVkIHJlZ2V4cFxuY29uc3QgcmVfYnRvdSA9IC9bXFx4QzAtXFx4REZdW1xceDgwLVxceEJGXXxbXFx4RTAtXFx4RUZdW1xceDgwLVxceEJGXXsyfXxbXFx4RjAtXFx4RjddW1xceDgwLVxceEJGXXszfS9nO1xuY29uc3QgY2JfYnRvdSA9IChjY2NjKSA9PiB7XG4gICAgc3dpdGNoIChjY2NjLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICB2YXIgY3AgPSAoKDB4MDcgJiBjY2NjLmNoYXJDb2RlQXQoMCkpIDw8IDE4KVxuICAgICAgICAgICAgICAgIHwgKCgweDNmICYgY2NjYy5jaGFyQ29kZUF0KDEpKSA8PCAxMilcbiAgICAgICAgICAgICAgICB8ICgoMHgzZiAmIGNjY2MuY2hhckNvZGVBdCgyKSkgPDwgNilcbiAgICAgICAgICAgICAgICB8ICgweDNmICYgY2NjYy5jaGFyQ29kZUF0KDMpKSwgb2Zmc2V0ID0gY3AgLSAweDEwMDAwO1xuICAgICAgICAgICAgcmV0dXJuIChfZnJvbUNDKChvZmZzZXQgPj4+IDEwKSArIDB4RDgwMClcbiAgICAgICAgICAgICAgICArIF9mcm9tQ0MoKG9mZnNldCAmIDB4M0ZGKSArIDB4REMwMCkpO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4gX2Zyb21DQygoKDB4MGYgJiBjY2NjLmNoYXJDb2RlQXQoMCkpIDw8IDEyKVxuICAgICAgICAgICAgICAgIHwgKCgweDNmICYgY2NjYy5jaGFyQ29kZUF0KDEpKSA8PCA2KVxuICAgICAgICAgICAgICAgIHwgKDB4M2YgJiBjY2NjLmNoYXJDb2RlQXQoMikpKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBfZnJvbUNDKCgoMHgxZiAmIGNjY2MuY2hhckNvZGVBdCgwKSkgPDwgNilcbiAgICAgICAgICAgICAgICB8ICgweDNmICYgY2NjYy5jaGFyQ29kZUF0KDEpKSk7XG4gICAgfVxufTtcbi8qKlxuICogQGRlcHJlY2F0ZWQgc2hvdWxkIGhhdmUgYmVlbiBpbnRlcm5hbCB1c2Ugb25seS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmMgVVRGLTE2IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gVVRGLTggc3RyaW5nXG4gKi9cbmNvbnN0IGJ0b3UgPSAoYikgPT4gYi5yZXBsYWNlKHJlX2J0b3UsIGNiX2J0b3UpO1xuLyoqXG4gKiBwb2x5ZmlsbCB2ZXJzaW9uIG9mIGBhdG9iYFxuICovXG5jb25zdCBhdG9iUG9seWZpbGwgPSAoYXNjKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ3BvbHlmaWxsZWQnKTtcbiAgICBhc2MgPSBhc2MucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG4gICAgaWYgKCFiNjRyZS50ZXN0KGFzYykpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21hbGZvcm1lZCBiYXNlNjQuJyk7XG4gICAgYXNjICs9ICc9PScuc2xpY2UoMiAtIChhc2MubGVuZ3RoICYgMykpO1xuICAgIGxldCB1MjQsIGJpbiA9ICcnLCByMSwgcjI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhc2MubGVuZ3RoOykge1xuICAgICAgICB1MjQgPSBiNjR0YWJbYXNjLmNoYXJBdChpKyspXSA8PCAxOFxuICAgICAgICAgICAgfCBiNjR0YWJbYXNjLmNoYXJBdChpKyspXSA8PCAxMlxuICAgICAgICAgICAgfCAocjEgPSBiNjR0YWJbYXNjLmNoYXJBdChpKyspXSkgPDwgNlxuICAgICAgICAgICAgfCAocjIgPSBiNjR0YWJbYXNjLmNoYXJBdChpKyspXSk7XG4gICAgICAgIGJpbiArPSByMSA9PT0gNjQgPyBfZnJvbUNDKHUyNCA+PiAxNiAmIDI1NSlcbiAgICAgICAgICAgIDogcjIgPT09IDY0ID8gX2Zyb21DQyh1MjQgPj4gMTYgJiAyNTUsIHUyNCA+PiA4ICYgMjU1KVxuICAgICAgICAgICAgICAgIDogX2Zyb21DQyh1MjQgPj4gMTYgJiAyNTUsIHUyNCA+PiA4ICYgMjU1LCB1MjQgJiAyNTUpO1xuICAgIH1cbiAgICByZXR1cm4gYmluO1xufTtcbi8qKlxuICogZG9lcyB3aGF0IGB3aW5kb3cuYXRvYmAgb2Ygd2ViIGJyb3dzZXJzIGRvLlxuICogQHBhcmFtIHtTdHJpbmd9IGFzYyBCYXNlNjQtZW5jb2RlZCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGJpbmFyeSBzdHJpbmdcbiAqL1xuY29uc3QgX2F0b2IgPSBfaGFzYXRvYiA/IChhc2MpID0+IGF0b2IoX3RpZHlCNjQoYXNjKSlcbiAgICA6IF9oYXNCdWZmZXIgPyAoYXNjKSA9PiBCdWZmZXIuZnJvbShhc2MsICdiYXNlNjQnKS50b1N0cmluZygnYmluYXJ5JylcbiAgICAgICAgOiBhdG9iUG9seWZpbGw7XG4vL1xuY29uc3QgX3RvVWludDhBcnJheSA9IF9oYXNCdWZmZXJcbiAgICA/IChhKSA9PiBfVThBZnJvbShCdWZmZXIuZnJvbShhLCAnYmFzZTY0JykpXG4gICAgOiAoYSkgPT4gX1U4QWZyb20oX2F0b2IoYSksIGMgPT4gYy5jaGFyQ29kZUF0KDApKTtcbi8qKlxuICogY29udmVydHMgYSBCYXNlNjQgc3RyaW5nIHRvIGEgVWludDhBcnJheS5cbiAqL1xuY29uc3QgdG9VaW50OEFycmF5ID0gKGEpID0+IF90b1VpbnQ4QXJyYXkoX3VuVVJJKGEpKTtcbi8vXG5jb25zdCBfZGVjb2RlID0gX2hhc0J1ZmZlclxuICAgID8gKGEpID0+IEJ1ZmZlci5mcm9tKGEsICdiYXNlNjQnKS50b1N0cmluZygndXRmOCcpXG4gICAgOiBfVERcbiAgICAgICAgPyAoYSkgPT4gX1RELmRlY29kZShfdG9VaW50OEFycmF5KGEpKVxuICAgICAgICA6IChhKSA9PiBidG91KF9hdG9iKGEpKTtcbmNvbnN0IF91blVSSSA9IChhKSA9PiBfdGlkeUI2NChhLnJlcGxhY2UoL1stX10vZywgKG0wKSA9PiBtMCA9PSAnLScgPyAnKycgOiAnLycpKTtcbi8qKlxuICogY29udmVydHMgYSBCYXNlNjQgc3RyaW5nIHRvIGEgVVRGLTggc3RyaW5nLlxuICogQHBhcmFtIHtTdHJpbmd9IHNyYyBCYXNlNjQgc3RyaW5nLiAgQm90aCBub3JtYWwgYW5kIFVSTC1zYWZlIGFyZSBzdXBwb3J0ZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFVURi04IHN0cmluZ1xuICovXG5jb25zdCBkZWNvZGUgPSAoc3JjKSA9PiBfZGVjb2RlKF91blVSSShzcmMpKTtcbi8qKlxuICogY2hlY2sgaWYgYSB2YWx1ZSBpcyBhIHZhbGlkIEJhc2U2NCBzdHJpbmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBzcmMgYSB2YWx1ZSB0byBjaGVja1xuICAqL1xuY29uc3QgaXNWYWxpZCA9IChzcmMpID0+IHtcbiAgICBpZiAodHlwZW9mIHNyYyAhPT0gJ3N0cmluZycpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzID0gc3JjLnJlcGxhY2UoL1xccysvZywgJycpLnJlcGxhY2UoLz0rJC8sICcnKTtcbiAgICByZXR1cm4gIS9bXlxcczAtOWEtekEtWlxcKy9dLy50ZXN0KHMpIHx8ICEvW15cXHMwLTlhLXpBLVpcXC1fXS8udGVzdChzKTtcbn07XG4vL1xuY29uc3QgX25vRW51bSA9ICh2KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHYsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfTtcbn07XG4vKipcbiAqIGV4dGVuZCBTdHJpbmcucHJvdG90eXBlIHdpdGggcmVsZXZhbnQgbWV0aG9kc1xuICovXG5jb25zdCBleHRlbmRTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgX2FkZCA9IChuYW1lLCBib2R5KSA9PiBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgbmFtZSwgX25vRW51bShib2R5KSk7XG4gICAgX2FkZCgnZnJvbUJhc2U2NCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlY29kZSh0aGlzKTsgfSk7XG4gICAgX2FkZCgndG9CYXNlNjQnLCBmdW5jdGlvbiAodXJsc2FmZSkgeyByZXR1cm4gZW5jb2RlKHRoaXMsIHVybHNhZmUpOyB9KTtcbiAgICBfYWRkKCd0b0Jhc2U2NFVSSScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuY29kZSh0aGlzLCB0cnVlKTsgfSk7XG4gICAgX2FkZCgndG9CYXNlNjRVUkwnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBlbmNvZGUodGhpcywgdHJ1ZSk7IH0pO1xuICAgIF9hZGQoJ3RvVWludDhBcnJheScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRvVWludDhBcnJheSh0aGlzKTsgfSk7XG59O1xuLyoqXG4gKiBleHRlbmQgVWludDhBcnJheS5wcm90b3R5cGUgd2l0aCByZWxldmFudCBtZXRob2RzXG4gKi9cbmNvbnN0IGV4dGVuZFVpbnQ4QXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgX2FkZCA9IChuYW1lLCBib2R5KSA9PiBPYmplY3QuZGVmaW5lUHJvcGVydHkoVWludDhBcnJheS5wcm90b3R5cGUsIG5hbWUsIF9ub0VudW0oYm9keSkpO1xuICAgIF9hZGQoJ3RvQmFzZTY0JywgZnVuY3Rpb24gKHVybHNhZmUpIHsgcmV0dXJuIGZyb21VaW50OEFycmF5KHRoaXMsIHVybHNhZmUpOyB9KTtcbiAgICBfYWRkKCd0b0Jhc2U2NFVSSScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZyb21VaW50OEFycmF5KHRoaXMsIHRydWUpOyB9KTtcbiAgICBfYWRkKCd0b0Jhc2U2NFVSTCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZyb21VaW50OEFycmF5KHRoaXMsIHRydWUpOyB9KTtcbn07XG4vKipcbiAqIGV4dGVuZCBCdWlsdGluIHByb3RvdHlwZXMgd2l0aCByZWxldmFudCBtZXRob2RzXG4gKi9cbmNvbnN0IGV4dGVuZEJ1aWx0aW5zID0gKCkgPT4ge1xuICAgIGV4dGVuZFN0cmluZygpO1xuICAgIGV4dGVuZFVpbnQ4QXJyYXkoKTtcbn07XG5jb25zdCBnQmFzZTY0ID0ge1xuICAgIHZlcnNpb246IHZlcnNpb24sXG4gICAgVkVSU0lPTjogVkVSU0lPTixcbiAgICBhdG9iOiBfYXRvYixcbiAgICBhdG9iUG9seWZpbGw6IGF0b2JQb2x5ZmlsbCxcbiAgICBidG9hOiBfYnRvYSxcbiAgICBidG9hUG9seWZpbGw6IGJ0b2FQb2x5ZmlsbCxcbiAgICBmcm9tQmFzZTY0OiBkZWNvZGUsXG4gICAgdG9CYXNlNjQ6IGVuY29kZSxcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBlbmNvZGVVUkk6IGVuY29kZVVSSSxcbiAgICBlbmNvZGVVUkw6IGVuY29kZVVSSSxcbiAgICB1dG9iOiB1dG9iLFxuICAgIGJ0b3U6IGJ0b3UsXG4gICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgaXNWYWxpZDogaXNWYWxpZCxcbiAgICBmcm9tVWludDhBcnJheTogZnJvbVVpbnQ4QXJyYXksXG4gICAgdG9VaW50OEFycmF5OiB0b1VpbnQ4QXJyYXksXG4gICAgZXh0ZW5kU3RyaW5nOiBleHRlbmRTdHJpbmcsXG4gICAgZXh0ZW5kVWludDhBcnJheTogZXh0ZW5kVWludDhBcnJheSxcbiAgICBleHRlbmRCdWlsdGluczogZXh0ZW5kQnVpbHRpbnMsXG59O1xuLy8gbWFrZWNqczpDVVQgLy9cbmV4cG9ydCB7IHZlcnNpb24gfTtcbmV4cG9ydCB7IFZFUlNJT04gfTtcbmV4cG9ydCB7IF9hdG9iIGFzIGF0b2IgfTtcbmV4cG9ydCB7IGF0b2JQb2x5ZmlsbCB9O1xuZXhwb3J0IHsgX2J0b2EgYXMgYnRvYSB9O1xuZXhwb3J0IHsgYnRvYVBvbHlmaWxsIH07XG5leHBvcnQgeyBkZWNvZGUgYXMgZnJvbUJhc2U2NCB9O1xuZXhwb3J0IHsgZW5jb2RlIGFzIHRvQmFzZTY0IH07XG5leHBvcnQgeyB1dG9iIH07XG5leHBvcnQgeyBlbmNvZGUgfTtcbmV4cG9ydCB7IGVuY29kZVVSSSB9O1xuZXhwb3J0IHsgZW5jb2RlVVJJIGFzIGVuY29kZVVSTCB9O1xuZXhwb3J0IHsgYnRvdSB9O1xuZXhwb3J0IHsgZGVjb2RlIH07XG5leHBvcnQgeyBpc1ZhbGlkIH07XG5leHBvcnQgeyBmcm9tVWludDhBcnJheSB9O1xuZXhwb3J0IHsgdG9VaW50OEFycmF5IH07XG5leHBvcnQgeyBleHRlbmRTdHJpbmcgfTtcbmV4cG9ydCB7IGV4dGVuZFVpbnQ4QXJyYXkgfTtcbmV4cG9ydCB7IGV4dGVuZEJ1aWx0aW5zIH07XG4vLyBhbmQgZmluYWxseSxcbmV4cG9ydCB7IGdCYXNlNjQgYXMgQmFzZTY0IH07XG4iLCJ2YXIgZ2xvYmFsID1cbiAgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzKSB8fFxuICAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYpIHx8XG4gICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwpXG5cbnZhciBzdXBwb3J0ID0ge1xuICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIGdsb2JhbCxcbiAgaXRlcmFibGU6ICdTeW1ib2wnIGluIGdsb2JhbCAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgYmxvYjpcbiAgICAnRmlsZVJlYWRlcicgaW4gZ2xvYmFsICYmXG4gICAgJ0Jsb2InIGluIGdsb2JhbCAmJlxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gZ2xvYmFsLFxuICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBnbG9iYWxcbn1cblxuZnVuY3Rpb24gaXNEYXRhVmlldyhvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG59XG5cbmlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICBdXG5cbiAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID1cbiAgICBBcnJheUJ1ZmZlci5pc1ZpZXcgfHxcbiAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gIH1cbiAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH4hXS9pLnRlc3QobmFtZSkgfHwgbmFtZSA9PT0gJycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gIH1cbiAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG4vLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgdmFyIGl0ZXJhdG9yID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXRlcmF0b3Jcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICB0aGlzLm1hcCA9IHt9XG5cbiAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICB9LCB0aGlzKVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICB0aGlzLmFwcGVuZChoZWFkZXJbMF0sIGhlYWRlclsxXSlcbiAgICB9LCB0aGlzKVxuICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgfSwgdGhpcylcbiAgfVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXVxuICB0aGlzLm1hcFtuYW1lXSA9IG9sZFZhbHVlID8gb2xkVmFsdWUgKyAnLCAnICsgdmFsdWUgOiB2YWx1ZVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLm1hcCkge1xuICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcylcbiAgICB9XG4gIH1cbn1cblxuSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXRlbXMgPSBbXVxuICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICBpdGVtcy5wdXNoKG5hbWUpXG4gIH0pXG4gIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbn1cblxuSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpdGVtcyA9IFtdXG4gIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIGl0ZW1zLnB1c2godmFsdWUpXG4gIH0pXG4gIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXRlbXMgPSBbXVxuICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pXG4gIH0pXG4gIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbn1cblxuaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbn1cblxuZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgfVxuICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxufVxuXG5mdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgfVxuICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgcmV0dXJuIHByb21pc2Vcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gIHJldHVybiBwcm9taXNlXG59XG5cbmZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpXG4gIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSlcbiAgfVxuICByZXR1cm4gY2hhcnMuam9pbignJylcbn1cblxuZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gIGlmIChidWYuc2xpY2UpIHtcbiAgICByZXR1cm4gYnVmLnNsaWNlKDApXG4gIH0gZWxzZSB7XG4gICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKVxuICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICB9XG59XG5cbmZ1bmN0aW9uIEJvZHkoKSB7XG4gIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgIC8qXG4gICAgICBmZXRjaC1tb2NrIHdyYXBzIHRoZSBSZXNwb25zZSBvYmplY3QgaW4gYW4gRVM2IFByb3h5IHRvXG4gICAgICBwcm92aWRlIHVzZWZ1bCB0ZXN0IGhhcm5lc3MgZmVhdHVyZXMgc3VjaCBhcyBmbHVzaC4gSG93ZXZlciwgb25cbiAgICAgIEVTNSBicm93c2VycyB3aXRob3V0IGZldGNoIG9yIFByb3h5IHN1cHBvcnQgcG9sbHlmaWxscyBtdXN0IGJlIHVzZWQ7XG4gICAgICB0aGUgcHJveHktcG9sbHlmaWxsIGlzIHVuYWJsZSB0byBwcm94eSBhbiBhdHRyaWJ1dGUgdW5sZXNzIGl0IGV4aXN0c1xuICAgICAgb24gdGhlIG9iamVjdCBiZWZvcmUgdGhlIFByb3h5IGlzIGNyZWF0ZWQuIFRoaXMgY2hhbmdlIGVuc3VyZXNcbiAgICAgIFJlc3BvbnNlLmJvZHlVc2VkIGV4aXN0cyBvbiB0aGUgaW5zdGFuY2UsIHdoaWxlIG1haW50YWluaW5nIHRoZVxuICAgICAgc2VtYW50aWMgb2Ygc2V0dGluZyBSZXF1ZXN0LmJvZHlVc2VkIGluIHRoZSBjb25zdHJ1Y3RvciBiZWZvcmVcbiAgICAgIF9pbml0Qm9keSBpcyBjYWxsZWQuXG4gICAgKi9cbiAgICB0aGlzLmJvZHlVc2VkID0gdGhpcy5ib2R5VXNlZFxuICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgIGlmICghYm9keSkge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHlcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgc3VwcG9ydC5ibG9iICYmIGlzRGF0YVZpZXcoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKVxuICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pXG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KVxuICAgIH1cblxuICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICB2YXIgaXNDb25zdW1lZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChpc0NvbnN1bWVkKSB7XG4gICAgICAgICAgcmV0dXJuIGlzQ29uc3VtZWRcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyLmJ1ZmZlci5zbGljZShcbiAgICAgICAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyLmJ5dGVPZmZzZXQsXG4gICAgICAgICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5ieXRlT2Zmc2V0ICsgdGhpcy5fYm9keUFycmF5QnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVhZEFycmF5QnVmZmVyQXNUZXh0KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpXG4gICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICB9XG4gIH1cblxuICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICB9XG4gIH1cblxuICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG52YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxuXG5mdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgcmV0dXJuIG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xID8gdXBjYXNlZCA6IG1ldGhvZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVxdWVzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQbGVhc2UgdXNlIHRoZSBcIm5ld1wiIG9wZXJhdG9yLCB0aGlzIERPTSBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLicpXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keVxuXG4gIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgfVxuICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzXG4gICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgIHRoaXMuc2lnbmFsID0gaW5wdXQuc2lnbmFsXG4gICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0XG4gICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gIH1cblxuICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdzYW1lLW9yaWdpbidcbiAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICB9XG4gIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgdGhpcy5zaWduYWwgPSBvcHRpb25zLnNpZ25hbCB8fCB0aGlzLnNpZ25hbFxuICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gIH1cbiAgdGhpcy5faW5pdEJvZHkoYm9keSlcblxuICBpZiAodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpIHtcbiAgICBpZiAob3B0aW9ucy5jYWNoZSA9PT0gJ25vLXN0b3JlJyB8fCBvcHRpb25zLmNhY2hlID09PSAnbm8tY2FjaGUnKSB7XG4gICAgICAvLyBTZWFyY2ggZm9yIGEgJ18nIHBhcmFtZXRlciBpbiB0aGUgcXVlcnkgc3RyaW5nXG4gICAgICB2YXIgcmVQYXJhbVNlYXJjaCA9IC8oWz8mXSlfPVteJl0qL1xuICAgICAgaWYgKHJlUGFyYW1TZWFyY2gudGVzdCh0aGlzLnVybCkpIHtcbiAgICAgICAgLy8gSWYgaXQgYWxyZWFkeSBleGlzdHMgdGhlbiBzZXQgdGhlIHZhbHVlIHdpdGggdGhlIGN1cnJlbnQgdGltZVxuICAgICAgICB0aGlzLnVybCA9IHRoaXMudXJsLnJlcGxhY2UocmVQYXJhbVNlYXJjaCwgJyQxXz0nICsgbmV3IERhdGUoKS5nZXRUaW1lKCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGEgbmV3ICdfJyBwYXJhbWV0ZXIgdG8gdGhlIGVuZCB3aXRoIHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgdmFyIHJlUXVlcnlTdHJpbmcgPSAvXFw/L1xuICAgICAgICB0aGlzLnVybCArPSAocmVRdWVyeVN0cmluZy50ZXN0KHRoaXMudXJsKSA/ICcmJyA6ICc/JykgKyAnXz0nICsgbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHtib2R5OiB0aGlzLl9ib2R5SW5pdH0pXG59XG5cbmZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgYm9keVxuICAgIC50cmltKClcbiAgICAuc3BsaXQoJyYnKVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICByZXR1cm4gZm9ybVxufVxuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgLy8gUmVwbGFjZSBpbnN0YW5jZXMgb2YgXFxyXFxuIGFuZCBcXG4gZm9sbG93ZWQgYnkgYXQgbGVhc3Qgb25lIHNwYWNlIG9yIGhvcml6b250YWwgdGFiIHdpdGggYSBzcGFjZVxuICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMCNzZWN0aW9uLTMuMlxuICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvZywgJyAnKVxuICAvLyBBdm9pZGluZyBzcGxpdCB2aWEgcmVnZXggdG8gd29yayBhcm91bmQgYSBjb21tb24gSUUxMSBidWcgd2l0aCB0aGUgY29yZS1qcyAzLjYuMCByZWdleCBwb2x5ZmlsbFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ2l0aHViL2ZldGNoL2lzc3Vlcy83NDhcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzc1MVxuICBwcmVQcm9jZXNzZWRIZWFkZXJzXG4gICAgLnNwbGl0KCdcXHInKVxuICAgIC5tYXAoZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICByZXR1cm4gaGVhZGVyLmluZGV4T2YoJ1xcbicpID09PSAwID8gaGVhZGVyLnN1YnN0cigxLCBoZWFkZXIubGVuZ3RoKSA6IGhlYWRlclxuICAgIH0pXG4gICAgLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gIHJldHVybiBoZWFkZXJzXG59XG5cbkJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuZXhwb3J0IGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXNwb25zZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQbGVhc2UgdXNlIHRoZSBcIm5ld1wiIG9wZXJhdG9yLCB0aGlzIERPTSBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLicpXG4gIH1cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gMjAwIDogb3B0aW9ucy5zdGF0dXNcbiAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMFxuICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICcnXG4gIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbn1cblxuQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgIHVybDogdGhpcy51cmxcbiAgfSlcbn1cblxuUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcidcbiAgcmV0dXJuIHJlc3BvbnNlXG59XG5cbnZhciByZWRpcmVjdFN0YXR1c2VzID0gWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XVxuXG5SZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXG4gIH1cblxuICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbn1cblxuZXhwb3J0IHZhciBET01FeGNlcHRpb24gPSBnbG9iYWwuRE9NRXhjZXB0aW9uXG50cnkge1xuICBuZXcgRE9NRXhjZXB0aW9uKClcbn0gY2F0Y2ggKGVycikge1xuICBET01FeGNlcHRpb24gPSBmdW5jdGlvbihtZXNzYWdlLCBuYW1lKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB2YXIgZXJyb3IgPSBFcnJvcihtZXNzYWdlKVxuICAgIHRoaXMuc3RhY2sgPSBlcnJvci5zdGFja1xuICB9XG4gIERPTUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSlcbiAgRE9NRXhjZXB0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERPTUV4Y2VwdGlvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG5cbiAgICBpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgRE9NRXhjZXB0aW9uKCdBYm9ydGVkJywgJ0Fib3J0RXJyb3InKSlcbiAgICB9XG5cbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgIGZ1bmN0aW9uIGFib3J0WGhyKCkge1xuICAgICAgeGhyLmFib3J0KClcbiAgICB9XG5cbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMudXJsID0gJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgPyB4aHIucmVzcG9uc2VVUkwgOiBvcHRpb25zLmhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJylcbiAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIHhoci5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpeFVybCh1cmwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB1cmwgPT09ICcnICYmIGdsb2JhbC5sb2NhdGlvbi5ocmVmID8gZ2xvYmFsLmxvY2F0aW9uLmhyZWYgOiB1cmxcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHVybFxuICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCBmaXhVcmwocmVxdWVzdC51cmwpLCB0cnVlKVxuXG4gICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdvbWl0Jykge1xuICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhocikge1xuICAgICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBzdXBwb3J0LmFycmF5QnVmZmVyICYmXG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpICYmXG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpLmluZGV4T2YoJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGluaXQgJiYgdHlwZW9mIGluaXQuaGVhZGVycyA9PT0gJ29iamVjdCcgJiYgIShpbml0LmhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSkge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5pdC5oZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgbm9ybWFsaXplVmFsdWUoaW5pdC5oZWFkZXJzW25hbWVdKSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdC5zaWduYWwpIHtcbiAgICAgIHJlcXVlc3Quc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRYaHIpXG5cbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gRE9ORSAoc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICByZXF1ZXN0LnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgfSlcbn1cblxuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG5cbmlmICghZ2xvYmFsLmZldGNoKSB7XG4gIGdsb2JhbC5mZXRjaCA9IGZldGNoXG4gIGdsb2JhbC5IZWFkZXJzID0gSGVhZGVyc1xuICBnbG9iYWwuUmVxdWVzdCA9IFJlcXVlc3RcbiAgZ2xvYmFsLlJlc3BvbnNlID0gUmVzcG9uc2Vcbn1cbiIsIi8qKlxyXG4gKiDnlKjmiLfooYzkuLrov73ouKpcclxuICogYXV0aG9yOkxpbHlcclxuICog55So5oi36K6/6Zeu5Y2V5Liq6aG16Z2i55qEaWRcclxuICovXHJcblxyXG5jbGFzcyBCZWhhdmlvclRyYWNlIHtcclxuICAgIHN0YXRpYyBiZWhhdmlvclRyYWNlSWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmVoYXZpb3JUcmFjZTtcclxuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB1dWlkIGZyb20gJy4uL3NlcnZpY2VzL3V1aWQnO1xuaW1wb3J0IEJhc2UgZnJvbSAnLi4vc2VydmljZXMvYmFzZSc7XG5pbXBvcnQgeyBHcmFkZVR5cGVFbnVtLCBFcnJvcnNDYXRlZ29yeSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbnN0YW50JztcblxuY2xhc3MgQWpheEVycm9ycyBleHRlbmRzIEJhc2Uge1xuICAvLyBnZXQgaHR0cCBlcnJvciBpbmZvXG4gIHB1YmxpYyBoYW5kbGVFcnJvcihvcHRpb25zOiB7IHNlcnZpY2U6IHN0cmluZzsgc2VydmljZVZlcnNpb246IHN0cmluZzsgcGFnZVBhdGg6IHN0cmluZzsgY29sbGVjdG9yOiBzdHJpbmcgfSkge1xuICAgIGlmICghd2luZG93LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHhoclNlbmQgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZDtcbiAgICBjb25zdCB4aHJFdmVudCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuY3VycmVudFRhcmdldCAmJiAoZXZlbnQuY3VycmVudFRhcmdldC5zdGF0dXMgPj0gNDAwIHx8IGV2ZW50LmN1cnJlbnRUYXJnZXQuc3RhdHVzID09PSAwKSkge1xuICAgICAgICAgIHRoaXMubG9nSW5mbyA9IHtcbiAgICAgICAgICAgIHVuaXF1ZUlkOiB1dWlkKCksXG4gICAgICAgICAgICBzZXJ2aWNlOiBvcHRpb25zLnNlcnZpY2UsXG4gICAgICAgICAgICBzZXJ2aWNlVmVyc2lvbjogb3B0aW9ucy5zZXJ2aWNlVmVyc2lvbixcbiAgICAgICAgICAgIHBhZ2VQYXRoOiBvcHRpb25zLnBhZ2VQYXRoLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IEVycm9yc0NhdGVnb3J5LkFKQVhfRVJST1IsXG4gICAgICAgICAgICBncmFkZTogR3JhZGVUeXBlRW51bS5FUlJPUixcbiAgICAgICAgICAgIGVycm9yVXJsOiBldmVudC50YXJnZXQucmVzcG9uc2VVUkwsXG4gICAgICAgICAgICBtZXNzYWdlOiBldmVudC50YXJnZXQucmVzcG9uc2UsXG4gICAgICAgICAgICBjb2xsZWN0b3I6IG9wdGlvbnMuY29sbGVjdG9yLFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy50cmFjZUluZm8oKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIHhockV2ZW50KTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIHhockV2ZW50KTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0aW1lb3V0JywgeGhyRXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc3RhdGVDaGFuZ2UgPSB0aGlzLm9ucmVhZHlzdGF0ZWNoYW5nZTtcbiAgICAgICAgdGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQ6IGFueSkge1xuICAgICAgICAgIHN0YXRlQ2hhbmdlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgeGhyRXZlbnQoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB4aHJTZW5kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQWpheEVycm9ycygpO1xuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBKU0Vycm9ycyBmcm9tICcuL2pzJztcbmltcG9ydCBQcm9taXNlRXJyb3JzIGZyb20gJy4vcHJvbWlzZSc7XG5pbXBvcnQgQWpheEVycm9ycyBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IFJlc291cmNlRXJyb3JzIGZyb20gJy4vcmVzb3VyY2UnO1xuaW1wb3J0IFZ1ZUVycm9ycyBmcm9tICcuL3Z1ZSc7XG5cbmV4cG9ydCB7XG4gIEpTRXJyb3JzLCBQcm9taXNlRXJyb3JzLCBBamF4RXJyb3JzLCBSZXNvdXJjZUVycm9ycywgVnVlRXJyb3JzLFxufTtcbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgdXVpZCBmcm9tICcuLi9zZXJ2aWNlcy91dWlkJztcbmltcG9ydCBCYXNlIGZyb20gJy4uL3NlcnZpY2VzL2Jhc2UnO1xuaW1wb3J0IHsgR3JhZGVUeXBlRW51bSwgRXJyb3JzQ2F0ZWdvcnkgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb25zdGFudCc7XG5jbGFzcyBKU0Vycm9ycyBleHRlbmRzIEJhc2Uge1xuICBwdWJsaWMgaGFuZGxlRXJyb3JzKG9wdGlvbnM6IHsgc2VydmljZTogc3RyaW5nOyBzZXJ2aWNlVmVyc2lvbjogc3RyaW5nOyBwYWdlUGF0aDogc3RyaW5nOyBjb2xsZWN0b3I6IHN0cmluZyB9KSB7XG4gICAgd2luZG93Lm9uZXJyb3IgPSAobWVzc2FnZSwgdXJsLCBsaW5lLCBjb2wsIGVycm9yKSA9PiB7XG4gICAgICAvLyBsZXQgZXJyb3JUeXBlIDtcbiAgICAgIC8vIGlmKCdzdHJpbmcnID09PSB0eXBlb2YgbWVzc2FnZSl7XG4gICAgICAvLyAgIGVycm9yVHlwZSA9IG1lc3NhZ2Uuc3BsaXQoXCI6XCIpWzVdO1xuICAgICAgLy8gfWVsc2V7XG4gICAgICAvLyAgIGVycm9yVHlwZSA9IG1lc3NhZ2U7XG4gICAgICAvLyAgIGNvbnNvbGUuaW5mbyhlcnJvclR5cGUpO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5sb2dJbmZvID0ge1xuICAgICAgICB1bmlxdWVJZDogdXVpZCgpLFxuICAgICAgICBzZXJ2aWNlOiBvcHRpb25zLnNlcnZpY2UsXG4gICAgICAgIHNlcnZpY2VWZXJzaW9uOiBvcHRpb25zLnNlcnZpY2VWZXJzaW9uLFxuICAgICAgICBwYWdlUGF0aDogb3B0aW9ucy5wYWdlUGF0aCxcbiAgICAgICAgY2F0ZWdvcnk6IEVycm9yc0NhdGVnb3J5LkpTX0VSUk9SLFxuICAgICAgICBncmFkZTogR3JhZGVUeXBlRW51bS5FUlJPUixcbiAgICAgICAgZXJyb3JVcmw6IHVybCxcbiAgICAgICAgbGluZSxcbiAgICAgICAgY29sLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBjb2xsZWN0b3I6IG9wdGlvbnMuY29sbGVjdG9yLFxuICAgICAgfTtcbiAgICAgIHRoaXMudHJhY2VJbmZvKCk7XG4gICAgfTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IEpTRXJyb3JzKCk7XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHV1aWQgZnJvbSAnLi4vc2VydmljZXMvdXVpZCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi9zZXJ2aWNlcy9iYXNlJztcbmltcG9ydCB7IEdyYWRlVHlwZUVudW0sIEVycm9yc0NhdGVnb3J5IH0gZnJvbSAnLi4vc2VydmljZXMvY29uc3RhbnQnO1xuXG5jbGFzcyBQcm9taXNlRXJyb3JzIGV4dGVuZHMgQmFzZSB7XG4gIHB1YmxpYyBoYW5kbGVFcnJvcnMob3B0aW9uczogeyBzZXJ2aWNlOiBzdHJpbmc7IHNlcnZpY2VWZXJzaW9uOiBzdHJpbmc7IHBhZ2VQYXRoOiBzdHJpbmc7IGNvbGxlY3Rvcjogc3RyaW5nIH0pIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndW5oYW5kbGVkcmVqZWN0aW9uJywgKGV2ZW50KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgdXJsID0gJyc7XG4gICAgICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LnJlYXNvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucmVhc29uLmNvbmZpZyAmJiBldmVudC5yZWFzb24uY29uZmlnLnVybCkge1xuICAgICAgICAgIHVybCA9IGV2ZW50LnJlYXNvbi5jb25maWcudXJsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nSW5mbyA9IHtcbiAgICAgICAgICB1bmlxdWVJZDogdXVpZCgpLFxuICAgICAgICAgIHNlcnZpY2U6IG9wdGlvbnMuc2VydmljZSxcbiAgICAgICAgICBzZXJ2aWNlVmVyc2lvbjogb3B0aW9ucy5zZXJ2aWNlVmVyc2lvbixcbiAgICAgICAgICBwYWdlUGF0aDogb3B0aW9ucy5wYWdlUGF0aCxcbiAgICAgICAgICBjYXRlZ29yeTogRXJyb3JzQ2F0ZWdvcnkuUFJPTUlTRV9FUlJPUixcbiAgICAgICAgICBncmFkZTogR3JhZGVUeXBlRW51bS5FUlJPUixcbiAgICAgICAgICBlcnJvclVybDogdXJsLFxuICAgICAgICAgIG1lc3NhZ2U6IGV2ZW50LnJlYXNvbixcbiAgICAgICAgICBjb2xsZWN0b3I6IG9wdGlvbnMuY29sbGVjdG9yLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYWNlSW5mbygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgUHJvbWlzZUVycm9ycygpO1xuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB1dWlkIGZyb20gJy4uL3NlcnZpY2VzL3V1aWQnO1xuaW1wb3J0IEJhc2UgZnJvbSAnLi4vc2VydmljZXMvYmFzZSc7XG5pbXBvcnQgeyBHcmFkZVR5cGVFbnVtLCBFcnJvcnNDYXRlZ29yeSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbnN0YW50JztcblxuY2xhc3MgUmVzb3VyY2VFcnJvcnMgZXh0ZW5kcyBCYXNlIHtcbiAgcHVibGljIGhhbmRsZUVycm9ycyhvcHRpb25zOiB7IHNlcnZpY2U6IHN0cmluZzsgcGFnZVBhdGg6IHN0cmluZzsgc2VydmljZVZlcnNpb246IHN0cmluZzsgY29sbGVjdG9yOiBzdHJpbmcgfSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldmVudCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFldmVudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YXJnZXQ6IGFueSA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICAgICAgICBjb25zdCBpc0VsZW1lbnRUYXJnZXQgPVxuICAgICAgICAgIHRhcmdldCBpbnN0YW5jZW9mIEhUTUxTY3JpcHRFbGVtZW50IHx8XG4gICAgICAgICAgdGFyZ2V0IGluc3RhbmNlb2YgSFRNTExpbmtFbGVtZW50IHx8XG4gICAgICAgICAgdGFyZ2V0IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudDtcblxuICAgICAgICBpZiAoIWlzRWxlbWVudFRhcmdldCkge1xuICAgICAgICAgIC8vIHJldHVybiBqcyBlcnJvclxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZ0luZm8gPSB7XG4gICAgICAgICAgdW5pcXVlSWQ6IHV1aWQoKSxcbiAgICAgICAgICBzZXJ2aWNlOiBvcHRpb25zLnNlcnZpY2UsXG4gICAgICAgICAgc2VydmljZVZlcnNpb246IG9wdGlvbnMuc2VydmljZVZlcnNpb24sXG4gICAgICAgICAgcGFnZVBhdGg6IG9wdGlvbnMucGFnZVBhdGgsXG4gICAgICAgICAgY2F0ZWdvcnk6IEVycm9yc0NhdGVnb3J5LlJFU09VUkNFX0VSUk9SLFxuICAgICAgICAgIGdyYWRlOiB0YXJnZXQudGFnTmFtZSA9PT0gJ0lNRycgPyBHcmFkZVR5cGVFbnVtLldBUk5JTkcgOiBHcmFkZVR5cGVFbnVtLkVSUk9SLFxuICAgICAgICAgIGVycm9yVXJsOiB0YXJnZXQuc3JjIHx8IHRhcmdldC5ocmVmLFxuICAgICAgICAgIG1lc3NhZ2U6IGBsb2FkICR7dGFyZ2V0LnRhZ05hbWV9IHJlc291cmNlIGVycm9yYCxcbiAgICAgICAgICBjb2xsZWN0b3I6IG9wdGlvbnMuY29sbGVjdG9yLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYWNlSW5mbygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSx0cnVlKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IFJlc291cmNlRXJyb3JzKCk7XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHV1aWQgZnJvbSAnLi4vc2VydmljZXMvdXVpZCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi9zZXJ2aWNlcy9iYXNlJztcbmltcG9ydCB7IEdyYWRlVHlwZUVudW0sIEVycm9yc0NhdGVnb3J5IH0gZnJvbSAnLi4vc2VydmljZXMvY29uc3RhbnQnO1xuXG5jbGFzcyBWdWVFcnJvcnMgZXh0ZW5kcyBCYXNlIHtcbiAgcHVibGljIGhhbmRsZUVycm9ycyhcbiAgICBvcHRpb25zOiB7IHNlcnZpY2U6IHN0cmluZzsgcGFnZVBhdGg6IHN0cmluZzsgc2VydmljZVZlcnNpb246IHN0cmluZzsgY29sbGVjdG9yOiBzdHJpbmcgfSxcbiAgICBWdWU6IGFueSxcbiAgKSB7XG4gICAgVnVlLmNvbmZpZy5lcnJvckhhbmRsZXIgPSAoZXJyb3I6IEVycm9yLCB2bTogYW55LCBpbmZvOiBzdHJpbmcpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMubG9nSW5mbyA9IHtcbiAgICAgICAgICB1bmlxdWVJZDogdXVpZCgpLFxuICAgICAgICAgIHNlcnZpY2U6IG9wdGlvbnMuc2VydmljZSxcbiAgICAgICAgICBzZXJ2aWNlVmVyc2lvbjogb3B0aW9ucy5zZXJ2aWNlVmVyc2lvbixcbiAgICAgICAgICBwYWdlUGF0aDogb3B0aW9ucy5wYWdlUGF0aCxcbiAgICAgICAgICBjYXRlZ29yeTogRXJyb3JzQ2F0ZWdvcnkuVlVFX0VSUk9SLFxuICAgICAgICAgIGdyYWRlOiBHcmFkZVR5cGVFbnVtLkVSUk9SLFxuICAgICAgICAgIGVycm9yVXJsOiAnJyxcbiAgICAgICAgICBtZXNzYWdlOiBpbmZvLFxuICAgICAgICAgIGNvbGxlY3Rvcjogb3B0aW9ucy5jb2xsZWN0b3IsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhY2VJbmZvKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBWdWVFcnJvcnMoKTtcbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgQ2xpZW50TW9uaXRvciBmcm9tICcuL21vbml0b3InO1xuXG4od2luZG93IGFzIGFueSkuQ2xpZW50TW9uaXRvciA9IENsaWVudE1vbml0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IENsaWVudE1vbml0b3I7XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgZmV0Y2ggfSBmcm9tICd3aGF0d2ctZmV0Y2gnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2luZG93RmV0Y2goKSB7XG4gIHdpbmRvdy5mZXRjaCA9IGZldGNoO1xufVxuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHhockludGVyY2VwdG9yKCkge1xuICBjb25zdCBvcmlnaW5hbFhIUiA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCBhcyBhbnk7XG4gIGNvbnN0IHhoclNlbmQgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZDtcbiAgY29uc3QgeGhyT3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xuXG4gIG9yaWdpbmFsWEhSLmdldFJlcXVlc3RDb25maWcgPSBbXTtcblxuICBmdW5jdGlvbiBhamF4RXZlbnRUcmlnZ2VyKGV2ZW50OiBzdHJpbmcpIHtcbiAgICBjb25zdCBhamF4RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnQsIHsgZGV0YWlsOiB0aGlzIH0pO1xuXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQoYWpheEV2ZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGN1c3RvbWl6ZWRYSFIoKSB7XG4gICAgY29uc3QgbGl2ZVhIUiA9IG5ldyBvcmlnaW5hbFhIUigpO1xuXG4gICAgbGl2ZVhIUi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ3JlYWR5c3RhdGVjaGFuZ2UnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBhamF4RXZlbnRUcmlnZ2VyLmNhbGwodGhpcywgJ3hoclJlYWR5U3RhdGVDaGFuZ2UnKTtcbiAgICAgIH0sXG4gICAgICBmYWxzZSxcbiAgICApO1xuXG4gICAgbGl2ZVhIUi5vcGVuID0gZnVuY3Rpb24gKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZykge1xuICAgICAgdGhpcy5nZXRSZXF1ZXN0Q29uZmlnID0gYXJndW1lbnRzO1xuXG4gICAgICByZXR1cm4geGhyT3Blbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgbGl2ZVhIUi5zZW5kID0gZnVuY3Rpb24gKGJvZHk6IGFueSkge1xuICAgICAgcmV0dXJuIHhoclNlbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGxpdmVYSFI7XG4gIH1cbiAgKHdpbmRvdyBhcyBhbnkpLlhNTEh0dHBSZXF1ZXN0ID0gY3VzdG9taXplZFhIUjtcbn1cbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLy8g5aKe5Yqg55So5oi36KGM5Li66L+96Liq5pWw5o2uICBhdXRoOkxpbHlcbmltcG9ydCB7Q3VzdG9tT3B0aW9uc1R5cGV9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtKU0Vycm9ycywgUHJvbWlzZUVycm9ycywgQWpheEVycm9ycywgUmVzb3VyY2VFcnJvcnMsIFZ1ZUVycm9yc30gZnJvbSAnLi9lcnJvcnMvaW5kZXgnO1xuaW1wb3J0IHRyYWNlUGVyZiBmcm9tICcuL3BlcmZvcm1hbmNlL2luZGV4JztcbmltcG9ydCB0cmFjZVNlZ21lbnQgZnJvbSAnLi90cmFjZS9zZWdtZW50JztcbmltcG9ydCBCZWhhdmlvclRyYWNlIGZyb20gJy4vYmVoYXZpb3JUcmFjZSc7XG5pbXBvcnQgdXVpZCBmcm9tICcuL3NlcnZpY2VzL3V1aWQnO1xuaW1wb3J0IHVzZXJCZWhhdmlvciBmcm9tICcuL3VzZXJzL2luZGV4JztcblxuY29uc3QgQ2xpZW50TW9uaXRvciA9IHtcbiAgICBjdXN0b21PcHRpb25zOiB7XG4gICAgICAgIGNvbGxlY3RvcjogbG9jYXRpb24ub3JpZ2luLCAvLyByZXBvcnQgc2VydmVcbiAgICAgICAganNFcnJvcnM6IHRydWUsIC8vIHZ1ZSwganMgYW5kIHByb21pc2UgZXJyb3JzXG4gICAgICAgIGFwaUVycm9yczogdHJ1ZSxcbiAgICAgICAgcmVzb3VyY2VFcnJvcnM6IHRydWUsXG4gICAgICAgIGF1dG9UcmFjZVBlcmY6IHRydWUsIC8vIHRyYWNlIHBlcmZvcm1hbmNlIGRldGFpbFxuICAgICAgICB1c2VGbXA6IGZhbHNlLCAvLyB1c2UgZmlyc3QgbWVhbmluZ2Z1bCBwYWludFxuICAgICAgICBlbmFibGVTUEE6IGZhbHNlLFxuICAgICAgICB0cmFjZVNES0ludGVybmFsOiBmYWxzZSxcbiAgICAgICAgZGV0YWlsTW9kZTogdHJ1ZSxcbiAgICB9IGFzIEN1c3RvbU9wdGlvbnNUeXBlLFxuXG4gICAgcmVnaXN0ZXIoY29uZmlnczogQ3VzdG9tT3B0aW9uc1R5cGUpIHtcbiAgICAgICAgdGhpcy5jdXN0b21PcHRpb25zID0ge1xuICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLFxuICAgICAgICAgICAgLi4uY29uZmlncyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lcnJvcnModGhpcy5jdXN0b21PcHRpb25zKTtcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbU9wdGlvbnMuZW5hYmxlU1BBKSB7XG4gICAgICAgICAgICB0aGlzLnBlcmZvcm1hbmNlKHRoaXMuY3VzdG9tT3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICB0cmFjZVNlZ21lbnQodGhpcy5jdXN0b21PcHRpb25zKTtcbiAgICB9LFxuICAgIHBlcmZvcm1hbmNlKGNvbmZpZ3M6IGFueSkge1xuICAgICAgICAvLyB0cmFjZSBhbmQgcmVwb3J0IHBlcmYgZGF0YSBhbmQgcHYgdG8gc2VydmUgd2hlbiBwYWdlIGxvYWRlZFxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgLy8g55So5oi36KGM5Li66L+96LiqaWRcbiAgICAgICAgICAgIEJlaGF2aW9yVHJhY2UuYmVoYXZpb3JUcmFjZUlkID0gdXVpZCgpO1xuICAgICAgICAgICAgdHJhY2VQZXJmLnJlY29yZFBlcmYoY29uZmlncyk7XG4gICAgICAgICAgICAvLyDmlrDlop7mlbDmja4gIOeUqOaIt+ihjOS4uuebuOWFs+aVsOaNrlxuICAgICAgICAgICAgdXNlckJlaGF2aW9yLnJlY29yZFVzZXJCZWhhdmlvcihjb25maWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICdsb2FkJyxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+ihjOS4uui/vei4qmlkXG4gICAgICAgICAgICAgICAgICAgIEJlaGF2aW9yVHJhY2UuYmVoYXZpb3JUcmFjZUlkID0gdXVpZCgpO1xuICAgICAgICAgICAgICAgICAgICB0cmFjZVBlcmYucmVjb3JkUGVyZihjb25maWdzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5paw5aKe5pWw5o2uICDnlKjmiLfooYzkuLrnm7jlhbPmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgdXNlckJlaGF2aW9yLnJlY29yZFVzZXJCZWhhdmlvcihjb25maWdzKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXN0b21PcHRpb25zLmVuYWJsZVNQQSkge1xuICAgICAgICAgICAgLy8gaGFzaCByb3V0ZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICdoYXNoY2hhbmdlJyxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+ihjOS4uui/vei4qlxuICAgICAgICAgICAgICAgICAgICBCZWhhdmlvclRyYWNlLmJlaGF2aW9yVHJhY2VJZCA9IHV1aWQoKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2VQZXJmLnJlY29yZFBlcmYoY29uZmlncyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIOaWsOWinuaVsOaNriDnlKjmiLfooYzkuLrnm7jlhbPmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgdXNlckJlaGF2aW9yLnJlY29yZFVzZXJCZWhhdmlvcihjb25maWdzKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3JzKG9wdGlvbnM6IEN1c3RvbU9wdGlvbnNUeXBlKSB7XG4gICAgICAgIGNvbnN0IHtzZXJ2aWNlLCBwYWdlUGF0aCwgc2VydmljZVZlcnNpb24sIGNvbGxlY3Rvcn0gPSBvcHRpb25zO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmpzRXJyb3JzKSB7XG4gICAgICAgICAgICBKU0Vycm9ycy5oYW5kbGVFcnJvcnMoe3NlcnZpY2UsIHBhZ2VQYXRoLCBzZXJ2aWNlVmVyc2lvbiwgY29sbGVjdG9yfSk7XG4gICAgICAgICAgICBQcm9taXNlRXJyb3JzLmhhbmRsZUVycm9ycyh7c2VydmljZSwgcGFnZVBhdGgsIHNlcnZpY2VWZXJzaW9uLCBjb2xsZWN0b3J9KTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnZ1ZSkge1xuICAgICAgICAgICAgICAgIFZ1ZUVycm9ycy5oYW5kbGVFcnJvcnMoe3NlcnZpY2UsIHBhZ2VQYXRoLCBzZXJ2aWNlVmVyc2lvbiwgY29sbGVjdG9yfSwgb3B0aW9ucy52dWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmFwaUVycm9ycykge1xuICAgICAgICAgICAgQWpheEVycm9ycy5oYW5kbGVFcnJvcih7c2VydmljZSwgcGFnZVBhdGgsIHNlcnZpY2VWZXJzaW9uLCBjb2xsZWN0b3J9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5yZXNvdXJjZUVycm9ycykge1xuICAgICAgICAgICAgUmVzb3VyY2VFcnJvcnMuaGFuZGxlRXJyb3JzKHtzZXJ2aWNlLCBwYWdlUGF0aCwgc2VydmljZVZlcnNpb24sIGNvbGxlY3Rvcn0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXRQZXJmb3JtYW5jZShjb25maWdzOiBDdXN0b21PcHRpb25zVHlwZSkge1xuICAgICAgICAvLyBoaXN0b3J5IHJvdXRlclxuICAgICAgICB0aGlzLmN1c3RvbU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMsXG4gICAgICAgICAgICAuLi5jb25maWdzLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBlcmZvcm1hbmNlKHRoaXMuY3VzdG9tT3B0aW9ucyk7XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENsaWVudE1vbml0b3I7XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCB7IElDYWxTY29yZSwgRWxlbWVudExpc3QgfSBmcm9tICcuL3R5cGUnO1xuXG5jb25zdCBnZXRTdHlsZSA9IChlbGVtZW50OiBFbGVtZW50IHwgYW55LCBhdHRyOiBhbnkpID0+IHtcbiAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpW2F0dHJdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbGVtZW50LmN1cnJlbnRTdHlsZVthdHRyXTtcbiAgfVxufTtcbi8vIGVsZW1lbnQgd2VpZ2h0IGZvciBjYWxjdWxhdGUgc2NvcmVcbmVudW0gRUxFX1dFSUdIVCB7XG4gIFNWRyA9IDIsXG4gIElNRyA9IDIsXG4gIENBTlZBUyA9IDQsXG4gIE9CSkVDVCA9IDQsXG4gIEVNQkVEID0gNCxcbiAgVklERU8gPSA0LFxufVxuXG5jb25zdCBTVEFSVF9USU1FOiBudW1iZXIgPSBwZXJmb3JtYW5jZS5ub3coKTtcbmNvbnN0IElHTk9SRV9UQUdfU0VUOiBzdHJpbmdbXSA9IFsnU0NSSVBUJywgJ1NUWUxFJywgJ01FVEEnLCAnSEVBRCcsICdMSU5LJ107XG5jb25zdCBMSU1JVDogbnVtYmVyID0gMzAwMDtcbmNvbnN0IFdXOiBudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IFdIOiBudW1iZXIgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5jb25zdCBERUxBWTogbnVtYmVyID0gNTAwOyAvLyBmbXAgcmV0cnkgaW50ZXJ2YWxcblxuY2xhc3MgRk1QVGltaW5nIHtcbiAgcHVibGljIGZtcFRpbWU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc3RhdHVzQ29sbGVjdG9yOiBBcnJheTx7IHRpbWU6IG51bWJlciB9PiA9IFtdOyAvLyBub2RlcyBjaGFuZ2UgdGltZVxuICBwcml2YXRlIGZsYWc6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyID0gbnVsbDtcbiAgcHJpdmF0ZSBjYWxsYmFja0NvdW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGVudHJpZXM6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmICghcGVyZm9ybWFuY2UgfHwgIXBlcmZvcm1hbmNlLmdldEVudHJpZXMpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd5b3VyIGJyb3dzZXIgZG8gbm90IHN1cHBvcnQgcGVyZm9ybWFuY2UuZ2V0RW50cmllcycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmluaXRPYnNlcnZlcigpO1xuICB9XG4gIHByaXZhdGUgZ2V0Rmlyc3RTbmFwU2hvdCgpIHtcbiAgICBjb25zdCB0aW1lOiBudW1iZXIgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCAkYm9keTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuICAgIGlmICgkYm9keSkge1xuICAgICAgdGhpcy5zZXRUYWcoJGJvZHksIHRoaXMuY2FsbGJhY2tDb3VudCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdHVzQ29sbGVjdG9yLnB1c2goe1xuICAgICAgdGltZSxcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGluaXRPYnNlcnZlcigpIHtcbiAgICB0aGlzLmdldEZpcnN0U25hcFNob3QoKTtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgdGhpcy5jYWxsYmFja0NvdW50ICs9IDE7XG4gICAgICBjb25zdCB0aW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICBjb25zdCAkYm9keTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgaWYgKCRib2R5KSB7XG4gICAgICAgIHRoaXMuc2V0VGFnKCRib2R5LCB0aGlzLmNhbGxiYWNrQ291bnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGF0dXNDb2xsZWN0b3IucHVzaCh7XG4gICAgICAgIHRpbWUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBvYnNlcnZlIGFsbCBjaGlsZCBub2Rlc1xuICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KTtcbiAgICAvLyBjYWxjdWxhdGUgc2NvcmUgd2hlbiBwYWdlIGxvYWRlZFxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUZpbmFsU2NvcmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdsb2FkJyxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRmluYWxTY29yZSgpO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgY2FsY3VsYXRlRmluYWxTY29yZSgpIHtcbiAgICBpZiAoTXV0YXRpb25FdmVudCAmJiB0aGlzLmZsYWcpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrTmVlZENhbmNlbChTVEFSVF9USU1FKSkge1xuICAgICAgICAvLyBjYW5jZWwgb2JzZXJ2ZXIgZm9yIGRvbSBjaGFuZ2VcbiAgICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuZmxhZyA9IGZhbHNlO1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmdldFRyZWVTY29yZShkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgbGV0IHRwOiBJQ2FsU2NvcmUgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmVzLmRwc3MpIHtcbiAgICAgICAgICBpZiAodHAgJiYgdHAuc3QpIHtcbiAgICAgICAgICAgIGlmICh0cC5zdCA8IGl0ZW0uc3QpIHtcbiAgICAgICAgICAgICAgdHAgPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cCA9IGl0ZW07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEdldCBhbGwgb2Ygc291cmVzIGxvYWQgdGltZVxuICAgICAgICBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzKCkuZm9yRWFjaCgoaXRlbTogUGVyZm9ybWFuY2VSZXNvdXJjZVRpbWluZykgPT4ge1xuICAgICAgICAgIHRoaXMuZW50cmllc1tpdGVtLm5hbWVdID0gaXRlbS5yZXNwb25zZUVuZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdHApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0RWxzOiBFbGVtZW50TGlzdCA9IHRoaXMuZmlsdGVyUmVzdWx0KHRwLmVscyk7XG4gICAgICAgIGNvbnN0IGZtcFRpbWluZzogbnVtYmVyID0gdGhpcy5nZXRGbXBUaW1lKHJlc3VsdEVscyk7XG4gICAgICAgIHRoaXMuZm1wVGltZSA9IGZtcFRpbWluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRmluYWxTY29yZSgpO1xuICAgICAgICB9LCBERUxBWSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHByaXZhdGUgZ2V0Rm1wVGltZShyZXN1bHRFbHM6IEVsZW1lbnRMaXN0KTogbnVtYmVyIHtcbiAgICBsZXQgcnQgPSAwO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiByZXN1bHRFbHMpIHtcbiAgICAgIGxldCB0aW1lOiBudW1iZXIgPSAwO1xuICAgICAgaWYgKGl0ZW0ud2VpZ2h0ID09PSAxKSB7XG4gICAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSBwYXJzZUludChpdGVtLmVsZS5nZXRBdHRyaWJ1dGUoJ2ZtcF9jJyksIDEwKTtcbiAgICAgICAgdGltZSA9IHRoaXMuc3RhdHVzQ29sbGVjdG9yW2luZGV4XS50aW1lO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLndlaWdodCA9PT0gMikge1xuICAgICAgICBpZiAoaXRlbS5lbGUudGFnTmFtZSA9PT0gJ0lNRycpIHtcbiAgICAgICAgICB0aW1lID0gdGhpcy5lbnRyaWVzWyhpdGVtLmVsZSBhcyBIVE1MSW1hZ2VFbGVtZW50KS5zcmNdO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uZWxlLnRhZ05hbWUgPT09ICdTVkcnKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHBhcnNlSW50KGl0ZW0uZWxlLmdldEF0dHJpYnV0ZSgnZm1wX2MnKSwgMTApO1xuICAgICAgICAgIHRpbWUgPSB0aGlzLnN0YXR1c0NvbGxlY3RvcltpbmRleF0udGltZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBtYXRjaCA9IGdldFN0eWxlKGl0ZW0uZWxlLCAnYmFja2dyb3VuZC1pbWFnZScpLm1hdGNoKC91cmxcXChcXFwiKC4qPylcXFwiXFwpLyk7XG4gICAgICAgICAgbGV0IHVybDogc3RyaW5nO1xuICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgICAgICAgICAgdXJsID0gbWF0Y2hbMV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdXJsLmluY2x1ZGVzKCdodHRwJykpIHtcbiAgICAgICAgICAgIHVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgbWF0Y2hbMV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRpbWUgPSB0aGlzLmVudHJpZXNbdXJsXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtLndlaWdodCA9PT0gNCkge1xuICAgICAgICBpZiAoaXRlbS5lbGUudGFnTmFtZSA9PT0gJ0NBTlZBUycpIHtcbiAgICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gcGFyc2VJbnQoaXRlbS5lbGUuZ2V0QXR0cmlidXRlKCdmbXBfYycpLCAxMCk7XG4gICAgICAgICAgdGltZSA9IHRoaXMuc3RhdHVzQ29sbGVjdG9yW2luZGV4XSAmJiB0aGlzLnN0YXR1c0NvbGxlY3RvcltpbmRleF0udGltZTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLmVsZS50YWdOYW1lID09PSAnVklERU8nKSB7XG4gICAgICAgICAgdGltZSA9IHRoaXMuZW50cmllc1soaXRlbS5lbGUgYXMgSFRNTFZpZGVvRWxlbWVudCkuc3JjXTtcbiAgICAgICAgICBpZiAoIXRpbWUpIHtcbiAgICAgICAgICAgIHRpbWUgPSB0aGlzLmVudHJpZXNbKGl0ZW0uZWxlIGFzIEhUTUxWaWRlb0VsZW1lbnQpLnBvc3Rlcl07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRpbWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRpbWUgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHJ0IDwgdGltZSkge1xuICAgICAgICBydCA9IHRpbWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydDtcbiAgfVxuICAvKipcbiAgICogVGhlIG5vZGVzIHdpdGggdGhlIGhpZ2hlc3Qgc2NvcmUgaW4gdGhlIHZpc2libGUgYXJlYSBhcmUgY29sbGVjdGVkIGFuZCB0aGUgYXZlcmFnZSB2YWx1ZSBpcyB0YWtlbixcbiAgICogYW5kIHRoZSBsb3cgc2NvcmUgb25lcyBhcmUgZWxpbWluYXRlZFxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJSZXN1bHQoZWxzOiBFbGVtZW50TGlzdCk6IEVsZW1lbnRMaXN0IHtcbiAgICBpZiAoZWxzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGVscztcbiAgICB9XG4gICAgbGV0IHN1bTogbnVtYmVyID0gMDtcbiAgICBlbHMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBzdW0gKz0gaXRlbS5zdDtcbiAgICB9KTtcbiAgICBjb25zdCBhdmc6IG51bWJlciA9IHN1bSAvIGVscy5sZW5ndGg7XG4gICAgcmV0dXJuIGVscy5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0uc3QgPiBhdmc7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBjaGVja05lZWRDYW5jZWwoc3RhcnQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRpbWU6IG51bWJlciA9IHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnQ7XG4gICAgY29uc3QgbGFzdENhbFRpbWU6IG51bWJlciA9XG4gICAgICB0aGlzLnN0YXR1c0NvbGxlY3Rvci5sZW5ndGggPiAwID8gdGhpcy5zdGF0dXNDb2xsZWN0b3JbdGhpcy5zdGF0dXNDb2xsZWN0b3IubGVuZ3RoIC0gMV0udGltZSA6IDA7XG4gICAgcmV0dXJuIHRpbWUgPiBMSU1JVCB8fCB0aW1lIC0gbGFzdENhbFRpbWUgPiAxMDAwO1xuICB9XG4gIHByaXZhdGUgZ2V0VHJlZVNjb3JlKG5vZGU6IEVsZW1lbnQpOiBJQ2FsU2NvcmUgfCBhbnkge1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBjb25zdCBkcHNzID0gW107XG4gICAgY29uc3QgY2hpbGRyZW46IGFueSA9IG5vZGUuY2hpbGRyZW47XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgLy8gT25seSBjYWxjdWxhdGUgbWFya2VkIGVsZW1lbnRzXG4gICAgICBpZiAoIWNoaWxkLmdldEF0dHJpYnV0ZSgnZm1wX2MnKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHMgPSB0aGlzLmdldFRyZWVTY29yZShjaGlsZCk7XG4gICAgICBpZiAocy5zdCkge1xuICAgICAgICBkcHNzLnB1c2gocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2FsY2F1bHRlR3JhZGVzKG5vZGUsIGRwc3MpO1xuICB9XG4gIHByaXZhdGUgY2FsY2F1bHRlR3JhZGVzKGVsZTogRWxlbWVudCwgZHBzczogSUNhbFNjb3JlW10pOiBJQ2FsU2NvcmUge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgbGVmdCwgdG9wIH0gPSBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGlzSW5WaWV3UG9ydDogYm9vbGVhbiA9IHRydWU7XG4gICAgaWYgKFdIIDwgdG9wIHx8IFdXIDwgbGVmdCkge1xuICAgICAgaXNJblZpZXdQb3J0ID0gZmFsc2U7XG4gICAgfVxuICAgIGxldCBzZHA6IG51bWJlciA9IDA7XG4gICAgZHBzcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIHNkcCArPSBpdGVtLnN0O1xuICAgIH0pO1xuICAgIGxldCB3ZWlnaHQ6IG51bWJlciA9IE51bWJlcihFTEVfV0VJR0hUW2VsZS50YWdOYW1lIGFzIGFueV0pIHx8IDE7XG4gICAgLy8gSWYgdGhlcmUgaXMgYSBjb21tb24gZWxlbWVudCBvZiB0aGUgYmFja2dyb3VuZCBpbWFnZSwgaXQgaXMgY2FsY3VsYXRlZCBhY2NvcmRpbmcgdG8gdGhlIHBpY3R1cmVcbiAgICBpZiAoXG4gICAgICB3ZWlnaHQgPT09IDEgJiZcbiAgICAgIGdldFN0eWxlKGVsZSwgJ2JhY2tncm91bmQtaW1hZ2UnKSAmJlxuICAgICAgZ2V0U3R5bGUoZWxlLCAnYmFja2dyb3VuZC1pbWFnZScpICE9PSAnaW5pdGlhbCcgJiZcbiAgICAgIGdldFN0eWxlKGVsZSwgJ2JhY2tncm91bmQtaW1hZ2UnKSAhPT0gJ25vbmUnXG4gICAgKSB7XG4gICAgICB3ZWlnaHQgPSBFTEVfV0VJR0hULklNRztcbiAgICB9XG4gICAgLy8gc2NvcmUgPSB0aGUgYXJlYSBvZiBlbGVtZW50XG4gICAgbGV0IHN0OiBudW1iZXIgPSBpc0luVmlld1BvcnQgPyB3aWR0aCAqIGhlaWdodCAqIHdlaWdodCA6IDA7XG4gICAgbGV0IGVscyA9IFt7IGVsZSwgc3QsIHdlaWdodCB9XTtcbiAgICBjb25zdCByb290ID0gZWxlO1xuICAgIC8vIFRoZSBwZXJjZW50YWdlIG9mIHRoZSBjdXJyZW50IGVsZW1lbnQgaW4gdGhlIHZpZXdwb3J0XG4gICAgY29uc3QgYXJlYVBlcmNlbnQgPSB0aGlzLmNhbGN1bGF0ZUFyZWFQYXJlbnQoZWxlKTtcbiAgICAvLyBJZiB0aGUgc3VtIG9mIHRoZSBjaGlsZCdzIHdlaWdodHMgaXMgZ3JlYXRlciB0aGFuIHRoZSBwYXJlbnQncyB0cnVlIHdlaWdodFxuICAgIGlmIChzZHAgPiBzdCAqIGFyZWFQZXJjZW50IHx8IGFyZWFQZXJjZW50ID09PSAwKSB7XG4gICAgICBzdCA9IHNkcDtcbiAgICAgIGVscyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGRwc3MpIHtcbiAgICAgICAgZWxzID0gZWxzLmNvbmNhdChpdGVtLmVscyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBkcHNzLFxuICAgICAgc3QsXG4gICAgICBlbHMsXG4gICAgICByb290LFxuICAgIH07XG4gIH1cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBcmVhUGFyZW50KGVsZTogRWxlbWVudCk6IG51bWJlciB7XG4gICAgY29uc3QgeyBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfSA9IGVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aW5MZWZ0OiBudW1iZXIgPSAwO1xuICAgIGNvbnN0IHdpblRvcDogbnVtYmVyID0gMDtcbiAgICBjb25zdCB3aW5SaWdodDogbnVtYmVyID0gV1c7XG4gICAgY29uc3Qgd2luQm90dG9tOiBudW1iZXIgPSBXSDtcbiAgICBjb25zdCBvdmVybGFwWCA9IHJpZ2h0IC0gbGVmdCArICh3aW5SaWdodCAtIHdpbkxlZnQpIC0gKE1hdGgubWF4KHJpZ2h0LCB3aW5SaWdodCkgLSBNYXRoLm1pbihsZWZ0LCB3aW5MZWZ0KSk7XG4gICAgY29uc3Qgb3ZlcmxhcFkgPSBib3R0b20gLSB0b3AgKyAod2luQm90dG9tIC0gd2luVG9wKSAtIChNYXRoLm1heChib3R0b20sIHdpbkJvdHRvbSkgLSBNYXRoLm1pbih0b3AsIHdpblRvcCkpO1xuXG4gICAgaWYgKG92ZXJsYXBYIDw9IDAgfHwgb3ZlcmxhcFkgPD0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiAob3ZlcmxhcFggKiBvdmVybGFwWSkgLyAod2lkdGggKiBoZWlnaHQpO1xuICB9XG4gIC8vIERlcHRoIGZpcnN0IHRyYXZlcnNhbCB0byBtYXJrIG5vZGVzXG4gIHByaXZhdGUgc2V0VGFnKHRhcmdldDogRWxlbWVudCwgY2FsbGJhY2tDb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdGFnTmFtZTogc3RyaW5nID0gdGFyZ2V0LnRhZ05hbWU7XG4gICAgaWYgKElHTk9SRV9UQUdfU0VULmluZGV4T2YodGFnTmFtZSkgPT09IC0xKSB7XG4gICAgICBjb25zdCAkY2hpbGRyZW46IEhUTUxDb2xsZWN0aW9uID0gdGFyZ2V0LmNoaWxkcmVuO1xuICAgICAgaWYgKCRjaGlsZHJlbiAmJiAkY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gJGNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgY29uc3QgJGNoaWxkOiBFbGVtZW50ID0gJGNoaWxkcmVuW2ldO1xuICAgICAgICAgIGNvbnN0IGhhc1NldFRhZyA9ICRjaGlsZC5nZXRBdHRyaWJ1dGUoJ2ZtcF9jJykgIT09IG51bGw7XG4gICAgICAgICAgLy8gSWYgaXQgaXMgbm90IG1hcmtlZCwgd2hldGhlciB0aGUgbWFya2luZyBjb25kaXRpb24gaXMgbWV0IGlzIGRldGVjdGVkXG4gICAgICAgICAgaWYgKCFoYXNTZXRUYWcpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSAkY2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoV0ggPCB0b3AgfHwgV1cgPCBsZWZ0IHx8IHdpZHRoID09PSAwIHx8IGhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRjaGlsZC5zZXRBdHRyaWJ1dGUoJ2ZtcF9jJywgYCR7Y2FsbGJhY2tDb3VudH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zZXRUYWcoJGNoaWxkLCBjYWxsYmFja0NvdW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGTVBUaW1pbmc7XG4iLCIvKipcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmUgb3IgbW9yZVxuICogY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoXG4gKiB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4gKiBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byBZb3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMFxuICogKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtDdXN0b21PcHRpb25zVHlwZX0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFJlcG9ydCBmcm9tICcuLi9zZXJ2aWNlcy9yZXBvcnQnO1xuaW1wb3J0IHBhZ2VQZXJmIGZyb20gJy4vcGVyZic7XG5pbXBvcnQgRk1QIGZyb20gJy4vZm1wJztcbmltcG9ydCB7SVBlcmZEZXRhaWx9IGZyb20gJy4vdHlwZSc7XG5cbmNsYXNzIFRyYWNlUGVyZiB7XG4gICAgcHJpdmF0ZSBwZXJmQ29uZmlnID0ge1xuICAgICAgICBwZXJmRGV0YWlsOiB7fSxcbiAgICB9IGFzIHsgcGVyZkRldGFpbDogSVBlcmZEZXRhaWx9O1xuXG4gICAgcHVibGljIGFzeW5jIHJlY29yZFBlcmYob3B0aW9uczogQ3VzdG9tT3B0aW9uc1R5cGUpIHtcbiAgICAgICAgbGV0IGZtcDogeyBmbXBUaW1lOiBudW1iZXIgfCB1bmRlZmluZWQgfSA9IHtmbXBUaW1lOiB1bmRlZmluZWR9O1xuICAgICAgICBpZiAob3B0aW9ucy5hdXRvVHJhY2VQZXJmKSB7XG4gICAgICAgICAgICB0aGlzLnBlcmZDb25maWcucGVyZkRldGFpbCA9IGF3YWl0IG5ldyBwYWdlUGVyZigpLmdldFBlcmZUaW1pbmcoKTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudXNlRm1wKSB7XG4gICAgICAgICAgICAgICAgZm1wID0gYXdhaXQgbmV3IEZNUCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGF1dG8gcmVwb3J0IHB2IGFuZCBwZXJmIGRhdGFcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwZXJmRGV0YWlsID0gb3B0aW9ucy5hdXRvVHJhY2VQZXJmXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMucGVyZkNvbmZpZy5wZXJmRGV0YWlsLFxuICAgICAgICAgICAgICAgICAgICBmbXBUaW1lOiBvcHRpb25zLnVzZUZtcCA/IHBhcnNlSW50KFN0cmluZyhmbXAuZm1wVGltZSksIDEwKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHBlcmZJbmZvID0ge1xuICAgICAgICAgICAgICAgIC4uLnBlcmZEZXRhaWwsXG4gICAgICAgICAgICAgICAgcGFnZVBhdGg6IG9wdGlvbnMucGFnZVBhdGgsXG4gICAgICAgICAgICAgICAgc2VydmljZVZlcnNpb246IG9wdGlvbnMuc2VydmljZVZlcnNpb24sXG4gICAgICAgICAgICAgICAgc2VydmljZTogb3B0aW9ucy5zZXJ2aWNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmV3IFJlcG9ydCgnUEVSRicsIG9wdGlvbnMuY29sbGVjdG9yKS5zZW5kQnlYaHIocGVyZkluZm8pO1xuICAgICAgICAgICAgLy8gY2xlYXIgcGVyZiBkYXRhXG4gICAgICAgICAgICB0aGlzLmNsZWFyUGVyZigpO1xuICAgICAgICB9LCAxMDAwMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhclBlcmYoKSB7XG4gICAgICAgIGlmICghKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2UuY2xlYXJSZXNvdXJjZVRpbWluZ3MpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LnBlcmZvcm1hbmNlLmNsZWFyUmVzb3VyY2VUaW1pbmdzKCk7XG4gICAgICAgIHRoaXMucGVyZkNvbmZpZyA9IHtcbiAgICAgICAgICAgIHBlcmZEZXRhaWw6IHt9XG4gICAgICAgIH0gYXMgeyBwZXJmRGV0YWlsOiBJUGVyZkRldGFpbH07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVHJhY2VQZXJmKCk7XG4iLCJcbi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IHsgSVBlcmZEZXRhaWwgfSBmcm9tICcuL3R5cGUnO1xuY2xhc3MgUGFnZVBlcmYge1xuXG4gIHB1YmxpYyBnZXRQZXJmVGltaW5nKCk6IElQZXJmRGV0YWlsIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCF3aW5kb3cucGVyZm9ybWFuY2UgfHwgIXdpbmRvdy5wZXJmb3JtYW5jZS50aW1pbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3lvdXIgYnJvd3NlciBkbyBub3Qgc3VwcG9ydCBwZXJmb3JtYW5jZScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB7IHRpbWluZyB9ID0gd2luZG93LnBlcmZvcm1hbmNlO1xuICAgICAgbGV0IHJlZGlyZWN0VGltZSA9IDA7XG5cbiAgICAgIGlmICh0aW1pbmcubmF2aWdhdGlvblN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVkaXJlY3RUaW1lID0gcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5mZXRjaFN0YXJ0IC0gdGltaW5nLm5hdmlnYXRpb25TdGFydCksIDEwKTtcbiAgICAgIH0gZWxzZSBpZiAodGltaW5nLnJlZGlyZWN0RW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVkaXJlY3RUaW1lID0gcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5yZWRpcmVjdEVuZCAtIHRpbWluZy5yZWRpcmVjdFN0YXJ0KSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVkaXJlY3RUaW1lID0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVkaXJlY3RUaW1lLFxuICAgICAgICBkbnNUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLmRvbWFpbkxvb2t1cEVuZCAtIHRpbWluZy5kb21haW5Mb29rdXBTdGFydCksIDEwKSxcbiAgICAgICAgdHRmYlRpbWU6IHBhcnNlSW50KFN0cmluZyh0aW1pbmcucmVzcG9uc2VTdGFydCAtIHRpbWluZy5yZXF1ZXN0U3RhcnQpLCAxMCksIC8vIFRpbWUgdG8gRmlyc3QgQnl0ZVxuICAgICAgICB0Y3BUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLmNvbm5lY3RFbmQgLSB0aW1pbmcuY29ubmVjdFN0YXJ0KSwgMTApLFxuICAgICAgICB0cmFuc1RpbWU6IHBhcnNlSW50KFN0cmluZyh0aW1pbmcucmVzcG9uc2VFbmQgLSB0aW1pbmcucmVzcG9uc2VTdGFydCksIDEwKSxcbiAgICAgICAgZG9tQW5hbHlzaXNUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLmRvbUludGVyYWN0aXZlIC0gdGltaW5nLnJlc3BvbnNlRW5kKSwgMTApLFxuICAgICAgICBmcHRUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLnJlc3BvbnNlRW5kIC0gdGltaW5nLmZldGNoU3RhcnQpLCAxMCksIC8vIEZpcnN0IFBhaW50IFRpbWUgb3IgQmxhbmsgU2NyZWVuIFRpbWVcbiAgICAgICAgZG9tUmVhZHlUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLmRvbUNvbnRlbnRMb2FkZWRFdmVudEVuZCAtIHRpbWluZy5mZXRjaFN0YXJ0KSwgMTApLFxuICAgICAgICBsb2FkUGFnZVRpbWU6IHBhcnNlSW50KFN0cmluZyh0aW1pbmcubG9hZEV2ZW50U3RhcnQgLSB0aW1pbmcuZmV0Y2hTdGFydCksIDEwKSwgLy8gUGFnZSBmdWxsIGxvYWQgdGltZVxuICAgICAgICAvLyBTeW5jaHJvbm91cyBsb2FkIHJlc291cmNlcyBpbiB0aGUgcGFnZVxuICAgICAgICByZXNUaW1lOiBwYXJzZUludChTdHJpbmcodGltaW5nLmxvYWRFdmVudFN0YXJ0IC0gdGltaW5nLmRvbUNvbnRlbnRMb2FkZWRFdmVudEVuZCksIDEwKSxcbiAgICAgICAgLy8gT25seSB2YWxpZCBmb3IgSFRUUFNcbiAgICAgICAgc3NsVGltZTogbG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonICYmIHRpbWluZy5zZWN1cmVDb25uZWN0aW9uU3RhcnQgPiAwID9cbiAgICAgICAgICBwYXJzZUludChTdHJpbmcodGltaW5nLmNvbm5lY3RFbmQgLSB0aW1pbmcuc2VjdXJlQ29ubmVjdGlvblN0YXJ0KSwgMTApIDogMCxcbiAgICAgICAgdHRsVGltZTogcGFyc2VJbnQoU3RyaW5nKHRpbWluZy5kb21JbnRlcmFjdGl2ZSAtIHRpbWluZy5mZXRjaFN0YXJ0KSwgMTApLCAvLyB0aW1lIHRvIGludGVyYWN0XG4gICAgICAgIGZpcnN0UGFja1RpbWU6IHBhcnNlSW50KFN0cmluZyh0aW1pbmcucmVzcG9uc2VTdGFydCAtIHRpbWluZy5kb21haW5Mb29rdXBTdGFydCksIDEwKSwgLy8gZmlyc3QgcGFjayB0aW1lXG4gICAgICAgIGZtcFRpbWU6IDAsIC8vIEZpcnN0IE1lYW5pbmdmdWwgUGFpbnRcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnZVBlcmY7XG4iLCIvKipcclxuICog6I635Y+W6aG16Z2i6LWE5rqQ5L+h5oGvXHJcbiAqIGF1dGhvcjpMaWx5XHJcbiAqL1xyXG5pbXBvcnQgeyBSZXNvdXJjZURldGFpbCB9IGZyb20gJy4vdHlwZSc7XHJcbmNsYXNzIFBhZ2VSZXNvdXJjZSB7XHJcbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2UoKTogUmVzb3VyY2VEZXRhaWwge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICghd2luZG93LnBlcmZvcm1hbmNlIHx8ICF3aW5kb3cucGVyZm9ybWFuY2UudGltaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygneW91ciBicm93c2VyIGRvIG5vdCBzdXBwb3J0IHBlcmZvcm1hbmNlJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VSZW91cmNlOndpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwicmVzb3VyY2VcIilcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2VSZXNvdXJjZTtcclxuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuaW1wb3J0IHtFcnJvcnNDYXRlZ29yeSwgR3JhZGVUeXBlRW51bX0gZnJvbSAnLi9jb25zdGFudCc7XG5pbXBvcnQge0Vycm9ySW5mb0ZlaWxkcywgUmVwb3J0RmllbGRzfSBmcm9tICcuL3R5cGVzJztcbi8vIOeUqOaIt+S/oeaBryBhdXRob3I6TGlseVxuaW1wb3J0IHtVc2VySW5mb0RldGFpbH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHVzZXJJbmZvIGZyb20gJy4uL3VzZXInO1xuaW1wb3J0IGJlaGF2aW9yVHJhY2UgZnJvbSAnLi4vYmVoYXZpb3JUcmFjZSc7XG5cbmxldCBqc0Vycm9yUHYgPSBmYWxzZTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xuICAgIHB1YmxpYyBsb2dJbmZvOiBFcnJvckluZm9GZWlsZHMgJiBSZXBvcnRGaWVsZHMgJiB7IGNvbGxlY3Rvcjogc3RyaW5nIH0gPSB7XG4gICAgICAgIHVuaXF1ZUlkOiAnJyxcbiAgICAgICAgc2VydmljZTogJycsXG4gICAgICAgIHNlcnZpY2VWZXJzaW9uOiAnJyxcbiAgICAgICAgcGFnZVBhdGg6ICcnLFxuICAgICAgICBjYXRlZ29yeTogRXJyb3JzQ2F0ZWdvcnkuVU5LTk9XTl9FUlJPUixcbiAgICAgICAgZ3JhZGU6IEdyYWRlVHlwZUVudW0uSU5GTyxcbiAgICAgICAgZXJyb3JVcmw6ICcnLFxuICAgICAgICBsaW5lOiAwLFxuICAgICAgICBjb2w6IDAsXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICBmaXJzdFJlcG9ydGVkRXJyb3I6IGZhbHNlLFxuICAgICAgICBjb2xsZWN0b3I6ICcnLFxuICAgIH07XG5cbiAgICBwdWJsaWMgdHJhY2VJbmZvKCkge1xuICAgICAgICAvLyBtYXJrIGpzIGVycm9yIHB2XG4gICAgICAgIGlmICghanNFcnJvclB2ICYmIHRoaXMubG9nSW5mby5jYXRlZ29yeSA9PT0gRXJyb3JzQ2F0ZWdvcnkuSlNfRVJST1IpIHtcbiAgICAgICAgICAgIGpzRXJyb3JQdiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZ0luZm8uZmlyc3RSZXBvcnRlZEVycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZVJlY29yZEVycm9yKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgVGFzay5maXJlVGFza3MoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICAvLyDnlKjmiLfkv6Hmga9cbiAgICBwcml2YXRlIHVzZXIgPSB7XG4gICAgICAgIHVzZXJJbmZvOiB7fSxcbiAgICB9IGFzIHsgdXNlckluZm86IFVzZXJJbmZvRGV0YWlsIH07XG5cbiAgICBwcml2YXRlIGhhbmRsZVJlY29yZEVycm9yKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxvZ0luZm8ubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVycm9ySW5mbyA9IHRoaXMuaGFuZGxlRXJyb3JJbmZvKCk7XG5cbiAgICAgICAgICAgIFRhc2suYWRkVGFzayhlcnJvckluZm8pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUVycm9ySW5mbygpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgZXJyb3IgY2F0ZWdvcnk6JHt0aGlzLmxvZ0luZm8uY2F0ZWdvcnl9XFxyXFxuIGxvZyBpbmZvOiR7dGhpcy5sb2dJbmZvLm1lc3NhZ2V9XFxyXFxuXG4gICAgICBlcnJvciB1cmw6ICR7dGhpcy5sb2dJbmZvLmVycm9yVXJsfVxcclxcbiBgO1xuICAgICAgICBzd2l0Y2ggKHRoaXMubG9nSW5mby5jYXRlZ29yeSkge1xuICAgICAgICAgICAgY2FzZSBFcnJvcnNDYXRlZ29yeS5KU19FUlJPUjpcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGBlcnJvciBsaW5lIG51bWJlcjogJHt0aGlzLmxvZ0luZm8ubGluZX1cXHJcXG4gZXJyb3IgY29sIG51bWJlcjoke3RoaXMubG9nSW5mby5jb2x9XFxyXFxuYDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2dJbmZvLmVycm9ySW5mbyAmJiB0aGlzLmxvZ0luZm8uZXJyb3JJbmZvLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYGVycm9yIHN0YWNrOiAke3RoaXMubG9nSW5mby5lcnJvckluZm8uc3RhY2t9XFxyXFxuYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYG90aGVyIGVycm9yOiAke3RoaXMubG9nSW5mby5lcnJvckluZm99XFxyXFxuYDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyDmt7vliqDnlKjmiLfkv6Hmga9cbiAgICAgICAgdGhpcy51c2VyLnVzZXJJbmZvID0gbmV3IHVzZXJJbmZvKCkuZ2V0VXNlckluZm8oKTtcbiAgICAgICAgY29uc3QgcmVjb3JkSW5mbyA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMubG9nSW5mbyxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAvLyDplJnor6/nsbvlnosgICDljLnphY1sb2cgaW5mb+WQjueahOWGkuWPt+WJjeeahOWtl+espuS4suOAgeWOu+W3puWPs+epuuagvOOAgeWOu+Wbnui9puesplxuICAgICAgICAgICAgLi4ue2Vycm9yVHlwZTptZXNzYWdlLnN1YnN0cihtZXNzYWdlLmxhc3RJbmRleE9mKCdsb2cgaW5mbzonKSArIFwibG9nIGluZm86XCIubGVuZ3RoKS5zcGxpdChcIjpcIilbMF0ucmVwbGFjZSgvKF5cXHMqKXwoXFxzKiQpL2csIFwiXCIpLnJlcGxhY2UoL1tcXHJcXG5dL2csXCJcIil9LFxuICAgICAgICAgICAgLy8g55So5oi35L+h5oGvXG4gICAgICAgICAgICAuLi50aGlzLnVzZXIudXNlckluZm8sXG4gICAgICAgICAgICAvLyDooYzkuLrov73ouKppZFxuICAgICAgICAgICAgLi4ue2JlaGF2aW9yVHJhY2VJZDogYmVoYXZpb3JUcmFjZS5iZWhhdmlvclRyYWNlSWR9LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVjb3JkSW5mbztcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVwb3J0IGZyb20gJy4vcmVwb3J0JztcblxuLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5leHBvcnQgZW51bSBFcnJvcnNDYXRlZ29yeSB7XG4gICAgQUpBWF9FUlJPUiA9ICdhamF4JyxcbiAgICBSRVNPVVJDRV9FUlJPUiA9ICdyZXNvdXJjZScsXG4gICAgVlVFX0VSUk9SID0gJ3Z1ZScsXG4gICAgUFJPTUlTRV9FUlJPUiA9ICdwcm9taXNlJyxcbiAgICBKU19FUlJPUiA9ICdqcycsXG4gICAgVU5LTk9XTl9FUlJPUiA9ICd1bmtub3duJyxcbn1cblxuZXhwb3J0IGVudW0gR3JhZGVUeXBlRW51bSB7XG4gICAgSU5GTyA9ICdJbmZvJyxcbiAgICBXQVJOSU5HID0gJ1dhcm5pbmcnLFxuICAgIEVSUk9SID0gJ0Vycm9yJyxcbn1cblxuZXhwb3J0IGVudW0gUmVwb3J0VHlwZXMge1xuICAgIEVSUk9SID0gJy9icm93c2VyL2Vycm9yTG9nJyxcbiAgICBFUlJPUlMgPSAnL2Jyb3dzZXIvZXJyb3JMb2dzJyxcbiAgICBQRVJGID0gJy9icm93c2VyL3BlcmZEYXRhJyxcbiAgICBTRUdNRU5UID0gJy92My9zZWdtZW50JyxcbiAgICBTRUdNRU5UUyA9ICcvdjMvc2VnbWVudHMnLFxuICAgIC8vIOaWsOWinuaOpeWPoyDnlKjmiLfnm7jlhbPmlbDmja5cbiAgICBVU0VSQkggPSAnL2Jyb3dzZXIvdXNlckJlaGF2aW9yJyxcbn1cblxuZXhwb3J0IGNvbnN0IFNwYW5MYXllciA9ICdIdHRwJztcbmV4cG9ydCBjb25zdCBTcGFuVHlwZSA9ICdFeGl0JztcblxuZXhwb3J0IGVudW0gUmVhZHlTdGF0dXMge1xuICAgIE9QRU5FRCA9IDEsXG4gICAgRE9ORSA9IDQsXG59XG5cbmV4cG9ydCBjb25zdCBDb21wb25lbnRJZCA9IDEwMDAxOyAvLyBhamF4XG5leHBvcnQgY29uc3QgU2VydmljZVRhZyA9ICc8YnJvd3Nlcj4nO1xuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgeyBSZXBvcnRUeXBlcyB9IGZyb20gJy4vY29uc3RhbnQnO1xuY2xhc3MgUmVwb3J0IHtcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgY29sbGVjdG9yOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZSA9PT0gJ0VSUk9SJykge1xuICAgICAgdGhpcy51cmwgPSBjb2xsZWN0b3IgKyBSZXBvcnRUeXBlcy5FUlJPUjtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdFUlJPUlMnKSB7XG4gICAgICB0aGlzLnVybCA9IGNvbGxlY3RvciArIFJlcG9ydFR5cGVzLkVSUk9SUztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdTRUdNRU5UJykge1xuICAgICAgdGhpcy51cmwgPSBjb2xsZWN0b3IgKyBSZXBvcnRUeXBlcy5TRUdNRU5UO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1NFR01FTlRTJykge1xuICAgICAgdGhpcy51cmwgPSBjb2xsZWN0b3IgKyBSZXBvcnRUeXBlcy5TRUdNRU5UUztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdQRVJGJykge1xuICAgICAgdGhpcy51cmwgPSBjb2xsZWN0b3IgKyBSZXBvcnRUeXBlcy5QRVJGO1xuICAgIH1lbHNlIGlmICh0eXBlID09PSAnVVNFUkJIJykge1xuICAgICAgdGhpcy51cmwgPSBjb2xsZWN0b3IgKyBSZXBvcnRUeXBlcy5VU0VSQkg7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbmRCeUZldGNoKGRhdGE6IGFueSkge1xuICAgIGRlbGV0ZSBkYXRhLmNvbGxlY3RvcjtcbiAgICBpZiAoIXRoaXMudXJsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNlbmRSZXF1ZXN0ID0gbmV3IFJlcXVlc3QodGhpcy51cmwsIHsgbWV0aG9kOiAnUE9TVCcsIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpIH0pO1xuXG4gICAgZmV0Y2goc2VuZFJlcXVlc3QpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSA0MDAgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyBvbiBhcGkgc2VydmVyIScpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNlbmRCeVhocihkYXRhOiBhbnkpIHtcbiAgICBkZWxldGUgZGF0YS5jb2xsZWN0b3I7XG4gICAgaWYgKCF0aGlzLnVybCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhoci5vcGVuKCdwb3N0JywgdGhpcy51cmwsIHRydWUpO1xuICAgLy8geGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXBvcnQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFJlcG9ydDtcbiIsIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZSBvciBtb3JlXG4gKiBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGhcbiAqIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbiAqIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlIHRvIFlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wXG4gKiAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IFJlcG9ydCBmcm9tICcuL3JlcG9ydCc7XG5cbmNsYXNzIFRhc2tRdWV1ZSB7XG4gIHByaXZhdGUgcXVldWVzOiBhbnlbXSA9IFtdO1xuXG4gIHB1YmxpYyBhZGRUYXNrKGRhdGE6IGFueSkge1xuICAgIHRoaXMucXVldWVzLnB1c2goeyBkYXRhIH0pO1xuICB9XG5cbiAgcHVibGljIGZpcmVUYXNrcygpIHtcbiAgICBpZiAoIXRoaXMucXVldWVzIHx8ICF0aGlzLnF1ZXVlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaXRlbSA9IHRoaXMucXVldWVzWzBdO1xuICAgIG5ldyBSZXBvcnQoJ0VSUk9SJywgaXRlbS5kYXRhLmNvbGxlY3Rvcikuc2VuZEJ5WGhyKGl0ZW0uZGF0YSk7XG4gICAgdGhpcy5xdWV1ZXMuc3BsaWNlKDAsIDEpO1xuICAgIHRoaXMuZmlyZVRhc2tzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFRhc2tRdWV1ZSgpO1xuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIChjKSA9PiB7XG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICBjb25zdCByID0gKE1hdGgucmFuZG9tKCkgKiAxNikgfCAwO1xuICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgY29uc3QgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MykgfCAweDg7XG5cbiAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lIG9yIG1vcmVcbiAqIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aFxuICogdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuICogVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGUgdG8gWW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjBcbiAqICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgeyBlbmNvZGUgfSBmcm9tICdqcy1iYXNlNjQnO1xuaW1wb3J0IHhockludGVyY2VwdG9yIGZyb20gJy4uL2ludGVyY2VwdG9ycy94aHInO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vc2VydmljZXMvdXVpZCc7XG5pbXBvcnQgUmVwb3J0IGZyb20gJy4uL3NlcnZpY2VzL3JlcG9ydCc7XG5pbXBvcnQgeyBTZWdtZW50RmVpbGRzLCBTcGFuRmVpbGRzIH0gZnJvbSAnLi90eXBlJztcbmltcG9ydCB7IFNwYW5MYXllciwgU3BhblR5cGUsIFJlYWR5U3RhdHVzLCBDb21wb25lbnRJZCwgU2VydmljZVRhZywgUmVwb3J0VHlwZXMgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb25zdGFudCc7XG5pbXBvcnQgeyBDdXN0b21PcHRpb25zVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB3aW5kb3dGZXRjaCBmcm9tICcuLi9pbnRlcmNlcHRvcnMvZmV0Y2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFjZVNlZ21lbnQob3B0aW9uczogQ3VzdG9tT3B0aW9uc1R5cGUpIHtcbiAgbGV0IHNlZ21lbnRzID0gW10gYXMgU2VnbWVudEZlaWxkc1tdO1xuICBjb25zdCBzZWdDb2xsZWN0b3I6IHsgZXZlbnQ6IFhNTEh0dHBSZXF1ZXN0OyBzdGFydFRpbWU6IG51bWJlcjsgdHJhY2VJZDogc3RyaW5nOyB0cmFjZVNlZ21lbnRJZDogc3RyaW5nIH1bXSA9IFtdO1xuICAvLyBpbmplY3QgaW50ZXJjZXB0b3JcbiAgeGhySW50ZXJjZXB0b3IoKTtcbiAgd2luZG93RmV0Y2goKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3hoclJlYWR5U3RhdGVDaGFuZ2UnLCAoZXZlbnQ6IEN1c3RvbUV2ZW50PFhNTEh0dHBSZXF1ZXN0ICYgeyBnZXRSZXF1ZXN0Q29uZmlnOiBhbnlbXSB9PikgPT4ge1xuICAgIGxldCBzZWdtZW50ID0ge1xuICAgICAgdHJhY2VJZDogJycsXG4gICAgICBzZXJ2aWNlOiBvcHRpb25zLnNlcnZpY2UgKyBTZXJ2aWNlVGFnLFxuICAgICAgc3BhbnM6IFtdLFxuICAgICAgc2VydmljZUluc3RhbmNlOiBvcHRpb25zLnNlcnZpY2VWZXJzaW9uLFxuICAgICAgdHJhY2VTZWdtZW50SWQ6ICcnLFxuICAgIH0gYXMgU2VnbWVudEZlaWxkcztcbiAgICBjb25zdCB4aHJTdGF0ZSA9IGV2ZW50LmRldGFpbC5yZWFkeVN0YXRlO1xuICAgIGNvbnN0IGNvbmZpZyA9IGV2ZW50LmRldGFpbC5nZXRSZXF1ZXN0Q29uZmlnO1xuICAgIGxldCB1cmwgPSB7fSBhcyBVUkw7XG4gICAgaWYgKGNvbmZpZ1sxXS5pbmNsdWRlcygnaHR0cDovLycpIHx8IGNvbmZpZ1sxXS5pbmNsdWRlcygnaHR0cHM6Ly8nKSkge1xuICAgICAgdXJsID0gbmV3IFVSTChjb25maWdbMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBjb25maWdbMV07XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChbUmVwb3J0VHlwZXMuRVJST1IsIFJlcG9ydFR5cGVzLlBFUkYsIFJlcG9ydFR5cGVzLlNFR01FTlRTXSBhcyBzdHJpbmdbXSkuaW5jbHVkZXModXJsLnBhdGhuYW1lKSAmJlxuICAgICAgIW9wdGlvbnMudHJhY2VTREtJbnRlcm5hbFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRoZSB2YWx1ZXMgb2YgeGhyU3RhdGUgYXJlIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L3JlYWR5U3RhdGVcbiAgICBpZiAoeGhyU3RhdGUgPT09IFJlYWR5U3RhdHVzLk9QRU5FRCkge1xuICAgICAgY29uc3QgdHJhY2VJZCA9IHV1aWQoKTtcbiAgICAgIGNvbnN0IHRyYWNlU2VnbWVudElkID0gdXVpZCgpO1xuXG4gICAgICBzZWdDb2xsZWN0b3IucHVzaCh7XG4gICAgICAgIGV2ZW50OiBldmVudC5kZXRhaWwsXG4gICAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIHRyYWNlSWQsXG4gICAgICAgIHRyYWNlU2VnbWVudElkLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHRyYWNlSWRTdHIgPSBTdHJpbmcoZW5jb2RlKHRyYWNlSWQpKTtcbiAgICAgIGNvbnN0IHNlZ21lbnRJZCA9IFN0cmluZyhlbmNvZGUodHJhY2VTZWdtZW50SWQpKTtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBTdHJpbmcoZW5jb2RlKHNlZ21lbnQuc2VydmljZSkpO1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBTdHJpbmcoZW5jb2RlKHNlZ21lbnQuc2VydmljZUluc3RhbmNlKSk7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IFN0cmluZyhlbmNvZGUob3B0aW9ucy5wYWdlUGF0aCkpO1xuICAgICAgY29uc3QgcGVlciA9IFN0cmluZyhlbmNvZGUodXJsLmhvc3QpKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gc2VnbWVudC5zcGFucy5sZW5ndGg7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBgJHsxfS0ke3RyYWNlSWRTdHJ9LSR7c2VnbWVudElkfS0ke2luZGV4fS0ke3NlcnZpY2V9LSR7aW5zdGFuY2V9LSR7ZW5kcG9pbnR9LSR7cGVlcn1gO1xuXG4gICAgICAvLyBldmVudC5kZXRhaWwuc2V0UmVxdWVzdEhlYWRlcignc3c4JywgdmFsdWVzKTtcbiAgICB9XG5cbiAgICBpZiAoeGhyU3RhdGUgPT09IFJlYWR5U3RhdHVzLkRPTkUpIHtcbiAgICAgIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnQ29sbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWdDb2xsZWN0b3JbaV0uZXZlbnQucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0dXMuRE9ORSkge1xuICAgICAgICAgIGxldCB1cmwgPSB7fSBhcyBVUkw7XG4gICAgICAgICAgaWYgKHNlZ0NvbGxlY3RvcltpXS5ldmVudC5zdGF0dXMpIHtcbiAgICAgICAgICAgIHVybCA9IG5ldyBVUkwoc2VnQ29sbGVjdG9yW2ldLmV2ZW50LnJlc3BvbnNlVVJMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZXhpdFNwYW46IFNwYW5GZWlsZHMgPSB7XG4gICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBvcHRpb25zLnBhZ2VQYXRoLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiBzZWdDb2xsZWN0b3JbaV0uc3RhcnRUaW1lLFxuICAgICAgICAgICAgZW5kVGltZSxcbiAgICAgICAgICAgIHNwYW5JZDogc2VnbWVudC5zcGFucy5sZW5ndGgsXG4gICAgICAgICAgICBzcGFuTGF5ZXI6IFNwYW5MYXllcixcbiAgICAgICAgICAgIHNwYW5UeXBlOiBTcGFuVHlwZSxcbiAgICAgICAgICAgIGlzRXJyb3I6IGV2ZW50LmRldGFpbC5zdGF0dXMgPT09IDAgfHwgZXZlbnQuZGV0YWlsLnN0YXR1cyA+PSA0MDAgPyB0cnVlIDogZmFsc2UsIC8vIHdoZW4gcmVxdWVzdHMgZmFpbGVkLCB0aGUgc3RhdHVzIGlzIDBcbiAgICAgICAgICAgIHBhcmVudFNwYW5JZDogc2VnbWVudC5zcGFucy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgY29tcG9uZW50SWQ6IENvbXBvbmVudElkLFxuICAgICAgICAgICAgcGVlcjogdXJsLmhvc3QsXG4gICAgICAgICAgICB0YWdzOiBvcHRpb25zLmRldGFpbE1vZGVcbiAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2h0dHAubWV0aG9kJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNvbmZpZ1swXSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ3VybCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzZWdDb2xsZWN0b3JbaV0uZXZlbnQucmVzcG9uc2VVUkwsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBzZWdtZW50ID0ge1xuICAgICAgICAgICAgLi4uc2VnbWVudCxcbiAgICAgICAgICAgIHRyYWNlSWQ6IHNlZ0NvbGxlY3RvcltpXS50cmFjZUlkLFxuICAgICAgICAgICAgdHJhY2VTZWdtZW50SWQ6IHNlZ0NvbGxlY3RvcltpXS50cmFjZVNlZ21lbnRJZCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHNlZ21lbnQuc3BhbnMucHVzaChleGl0U3Bhbik7XG4gICAgICAgICAgc2VnQ29sbGVjdG9yLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICB9XG4gIH0pO1xuICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoZTogRXZlbnQpIHtcbiAgICBpZiAoIXNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuZXcgUmVwb3J0KCdTRUdNRU5UUycsIG9wdGlvbnMuY29sbGVjdG9yKS5zZW5kQnlYaHIoc2VnbWVudHMpO1xuICB9O1xuICAvL3JlcG9ydCBwZXIgNW1pblxuICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgaWYgKCFzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbmV3IFJlcG9ydCgnU0VHTUVOVFMnLCBvcHRpb25zLmNvbGxlY3Rvcikuc2VuZEJ5WGhyKHNlZ21lbnRzKTtcbiAgICBzZWdtZW50cyA9IFtdO1xuICB9LCAzMDAwMDApO1xufVxuIiwiLyoqXHJcbiAqIOiOt+WPlueUqOaIt+S/oeaBr1xyXG4gKiBhdXRob3I6TGlseVxyXG4gKiDnlKjmiLfkv6Hmga/vvJrorablkZhJRO+8jOa1j+iniOWZqOexu+Wei++8jOa1j+iniOWZqOeJiOacrOWPt++8jOaTjeS9nOezu+e7n+exu+Wei++8jOaTjeS9nOezu+e7n+eJiOacrO+8jOWxj+W5lemrmO+8jOWxj+W5leWuvVxyXG4gKi9cclxuXHJcbmltcG9ydCB7VXNlckluZm9EZXRhaWx9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuY2xhc3MgVXNlckluZm8ge1xyXG4gICAgcHVibGljIGdldFVzZXJJbmZvKCk6IFVzZXJJbmZvRGV0YWlsIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5uYXZpZ2F0b3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd5b3VyIGJyb3dzZXIgZG8gbm90IHN1cHBvcnQgbmF2aWdhdG9yJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g6I635Y+W6K2m5ZGYSURcclxuICAgICAgICAgICAgdmFyIHBvbGljZUlkOiBzdHJpbmcgPSB0aGlzLkdldFF1ZXJ5U3RyaW5nKFwicG9saWNlSWRcIik7XHJcbiAgICAgICAgICAgIC8vIOiOt+WPlua1j+iniOWZqOexu+Wei+OAgeeJiOacrFxyXG4gICAgICAgICAgICB2YXIgYnJvd3NlckluZm86IGFueSA9IHRoaXMuZ2V0QnJvd3NlckluZm8oKTtcclxuICAgICAgICAgICAgLy8g6I635Y+W5pON5L2c57O757uf57G75Z6L44CB54mI5pysXHJcbiAgICAgICAgICAgIHZhciBzeXN0ZW1JbmZvOiBhbnkgPSB0aGlzLmdldFN5c3RlbUluZm8oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBvbGljZUlkOiBwb2xpY2VJZCxcclxuICAgICAgICAgICAgICAgIGJyb3dzZXJUeXBlOiBicm93c2VySW5mby50eXBlLFxyXG4gICAgICAgICAgICAgICAgYnJvd3NlclZlcnNpb246IGJyb3dzZXJJbmZvLnZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICBvcGVyYXRpbmdTeXN0ZW06IHN5c3RlbUluZm8udHlwZSxcclxuICAgICAgICAgICAgICAgIG9wZXJhdGluZ1N5c3RlbVZlcnNpb246IHN5c3RlbUluZm8udmVyc2lvbixcclxuICAgICAgICAgICAgICAgIHNjcmVlbkhlaWdodDogd2luZG93LnNjcmVlbi5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzY3JlZW5XaWR0aDogd2luZG93LnNjcmVlbi53aWR0aCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOafpeivouWcsOWdgOagj+WPguaVsFxyXG4gICAgcHJpdmF0ZSBHZXRRdWVyeVN0cmluZyhuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKF58JilcIiArIG5hbWUgKyBcIj0oW14mXSopKCZ8JClcIik7XHJcbiAgICAgICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xyXG4gICAgICAgIGlmIChyICE9IG51bGwpIHJldHVybiB1bmVzY2FwZShyWzJdKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bmtY/op4jlmajkv6Hmga9cclxuICAgIHByaXZhdGUgZ2V0QnJvd3NlckluZm8oKTogYW55IHtcclxuICAgICAgICB2YXIgYnJvd3NlcjogYW55ID0ge307XHJcbiAgICAgICAgdmFyIHVzZXJBZ2VudDogYW55ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciBzOiBhbnk7XHJcbiAgICAgICAgKHMgPSB1c2VyQWdlbnQubWF0Y2goL1xcYig/Om1zaWUgfGllIHx0cmlkZW50XFwvWzAtOV0uKnJ2WyA6XSkoWzAtOS5dKykvKSkgPyBicm93c2VyLmllID0gc1sxXSA6IChzID0gdXNlckFnZW50Lm1hdGNoKC9maXJlZm94XFwvKFtcXGQuXSspLykpID8gYnJvd3Nlci5maXJlZm94ID0gc1sxXSA6IChzID0gdXNlckFnZW50Lm1hdGNoKC9jaHJvbWVcXC8oW1xcZC5dKykvKSkgPyBicm93c2VyLmNocm9tZSA9IHNbMV0gOiAocyA9IHVzZXJBZ2VudC5tYXRjaCgvb3BlcmEuKFtcXGQuXSspLykpID8gYnJvd3Nlci5vcGVyYSA9IHNbMV0gOiAocyA9IHVzZXJBZ2VudC5tYXRjaCgvdmVyc2lvblxcLyhbXFxkLl0rKS4qc2FmYXJpLykpID8gYnJvd3Nlci5zYWZhcmkgPSBzWzFdIDogMDtcclxuICAgICAgICB2YXIgYnJvd3NlclR5cGU6IHN0cmluZyA9ICd1bmtub3cnO1xyXG4gICAgICAgIHZhciBicm93c2VyVmVyc2lvbjogc3RyaW5nID0gJ3Vua25vdyc7XHJcbiAgICAgICAgaWYgKGJyb3dzZXIuaWUpIHtcclxuICAgICAgICAgICAgYnJvd3NlclR5cGUgPSAnSUUnO1xyXG4gICAgICAgICAgICBicm93c2VyVmVyc2lvbiA9IGJyb3dzZXIuaWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGJyb3dzZXIuZmlyZWZveCkge1xyXG4gICAgICAgICAgICAgICAgYnJvd3NlclR5cGUgPSAnZmlyZWZveCc7XHJcbiAgICAgICAgICAgICAgICBicm93c2VyVmVyc2lvbiA9IGJyb3dzZXIuZmlyZWZveDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChicm93c2VyLmNocm9tZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpczM2MCA9IHRoaXMuX21pbWUoXCJhcHBsaWNhdGlvbi92bmQuY2hyb21pdW0ucmVtb3Rpbmctdmlld2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpczM2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyVHlwZSA9ICczNjAnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXJUeXBlID0gJ2Nocm9tZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXJWZXJzaW9uID0gYnJvd3Nlci5jaHJvbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnJvd3Nlci5vcGVyYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyVHlwZSA9ICdvcGVyYSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXJWZXJzaW9uID0gYnJvd3Nlci5vcGVyYTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnJvd3Nlci5zYWZhcmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXJUeXBlID0gJ3NhZmFyaSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyVmVyc2lvbiA9IGJyb3dzZXIuc2FmYXJpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGJyb3dzZXJJbmZvOiBhbnkgPSB7dHlwZTogYnJvd3NlclR5cGUsIHZlcnNpb246IGJyb3dzZXJWZXJzaW9ufTtcclxuICAgICAgICByZXR1cm4gYnJvd3NlckluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W5pON5L2c57O757uf5L+h5oGvXHJcbiAgICBwcml2YXRlIGdldFN5c3RlbUluZm8oKTogYW55IHtcclxuICAgICAgICBsZXQgc3lzdGVtSW5mbzogYW55ID0ge1xyXG4gICAgICAgICAgICB0eXBlOiAndW5rbm93JyxcclxuICAgICAgICAgICAgdmVyc2lvbjogJ3Vua25vdydcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHVzZXJBZ2VudDogYW55ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuICAgICAgICAvLyDmo4DmtYvlubPlj7BcclxuICAgICAgICBjb25zdCBwbGF0Zm9ybTogYW55ID0gbmF2aWdhdG9yLnBsYXRmb3JtO1xyXG4gICAgICAgIGlmIChwbGF0Zm9ybS5pbmRleE9mKCdXaW4nKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHN5c3RlbUluZm8udHlwZSA9ICd3aW5kb3dzJztcclxuICAgICAgICAgICAgaWYgKC9XaW4oPzpkb3dzICk/KFteZG9dezJ9KVxccz8oXFxkK1xcLlxcZCspPy8udGVzdCh1c2VyQWdlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUmVnRXhwWyckMSddID09ICdOVCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzeXN0ZW1JbmZvLnZlcnNpb24gPSBSZWdFeHBbJyQyJ107XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFJlZ0V4cFsnJDEnXSA9PSAnOXgnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3lzdGVtSW5mby50eXBlID0gJ01FJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3lzdGVtSW5mby50eXBlID0gUmVnRXhwWyckMSddO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGF0Zm9ybS5pbmRleE9mKCdNYWMnKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZignTW9iaWxlJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgc3lzdGVtSW5mby50eXBlID0gJ0lPUyc7XHJcbiAgICAgICAgICAgICAgICBzeXN0ZW1JbmZvLnZlcnNpb24gPSBwYXJzZUZsb2F0KFJlZ0V4cFsnJDEnXS5yZXBsYWNlKCdfJywgJy4nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3lzdGVtSW5mby50eXBlID0gJ21hYyc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGF0Zm9ybS5pbmRleE9mKCdYbGwnKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHN5c3RlbUluZm8udHlwZSA9ICd1bml4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYXRmb3JtLmluZGV4T2YoJ0xpbnV4JykgPiAwKSB7XHJcbiAgICAgICAgICAgIHN5c3RlbUluZm8udHlwZSA9ICdMaW51eCc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignaVBob25lJykgPiAtMSkge1xyXG4gICAgICAgICAgICBzeXN0ZW1JbmZvLnR5cGUgPSAnaVBob25lJztcclxuICAgICAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdpUGFkJykgPiAtMSkge1xyXG4gICAgICAgICAgICBzeXN0ZW1JbmZvLnR5cGUgPSAnaVBhZCc7XHJcbiAgICAgICAgfSBlbHNlIGlmICgvQW5kcm9pZCAoXFxkK1xcLlxcZCspL2kudGVzdCh1c2VyQWdlbnQpKSB7XHJcbiAgICAgICAgICAgIHN5c3RlbUluZm8udHlwZSA9ICdhbmRyb2lkJztcclxuICAgICAgICAgICAgc3lzdGVtSW5mby52ZXJzaW9uID0gcGFyc2VGbG9hdChSZWdFeHBbJyQxJ10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3lzdGVtSW5mbztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9taW1lKHZhbHVlOiBzdHJpbmcpOiBCb29sZWFuIHtcclxuICAgICAgICB2YXIgbWltZVR5cGVzID0gbmF2aWdhdG9yLm1pbWVUeXBlcztcclxuICAgICAgICBmb3IgKHZhciBtdCBpbiBtaW1lVHlwZXMpIHtcclxuICAgICAgICAgICAgaWYgKG1pbWVUeXBlc1ttdF0udHlwZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXNlckluZm87XHJcbiIsIi8qKlxyXG4gKiDmlrDlop7vvJrnlKjmiLfnm7jlhbPkv6Hmga9cclxuICog55So5oi36KGM5Li66L+96LiqSUTjgIHlupTnlKjkv6Hmga/jgIHnlKjmiLdJUOOAgeitpuWRmOe8luWPt+OAgea1j+iniOWZqOS/oeaBr+OAgeaTjeS9nOezu+e7n+S/oeaBr+OAgeWxj+W5leWIhui+qOeOh+OAgemhtemdouaAp+iDveOAgei1hOa6kOS/oeaBr1xyXG4gKiBAYXV0aG9yOkxpbHlcclxuICovXHJcblxyXG5pbXBvcnQge0N1c3RvbU9wdGlvbnNUeXBlfSBmcm9tICcuLi90eXBlcyc7XHJcbmltcG9ydCBSZXBvcnQgZnJvbSAnLi4vc2VydmljZXMvcmVwb3J0JztcclxuaW1wb3J0IHBhZ2VQZXJmIGZyb20gJy4uL3BlcmZvcm1hbmNlL3BlcmYnO1xyXG5pbXBvcnQgRk1QIGZyb20gJy4uL3BlcmZvcm1hbmNlL2ZtcCc7XHJcbmltcG9ydCB7SVBlcmZEZXRhaWx9IGZyb20gJy4uL3BlcmZvcm1hbmNlL3R5cGUnO1xyXG4vLyDpobXpnaLotYTmupAgYXV0aG9yOkxpbHlcclxuaW1wb3J0IHtSZXNvdXJjZURldGFpbH0gZnJvbSAnLi4vcGVyZm9ybWFuY2UvdHlwZSc7XHJcbmltcG9ydCBwYWdlUmVzb3VyY2UgZnJvbSAnLi4vcGVyZm9ybWFuY2UvcmVzb3VyY2UnO1xyXG4vLyDnlKjmiLfkv6Hmga9cclxuaW1wb3J0IHtVc2VySW5mb0RldGFpbH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgdXNlckluZm8gZnJvbSAnLi4vdXNlcic7XHJcbi8vIOihjOS4uui/vei4quS/oeaBr1xyXG5pbXBvcnQgYmVoYXZpb3JUcmFjZSBmcm9tICcuLi9iZWhhdmlvclRyYWNlJztcclxuXHJcbmNsYXNzIFVzZXJCZWhhdmlvciB7XHJcbiAgICBwcml2YXRlIHBlcmZDb25maWcgPSB7XHJcbiAgICAgICAgcGVyZkRldGFpbDoge30sXHJcbiAgICAgICAgLy8g6aG16Z2i6LWE5rqQXHJcbiAgICAgICAgcmVzb3VyY2U6IHt9LFxyXG4gICAgfSBhcyB7IHBlcmZEZXRhaWw6IElQZXJmRGV0YWlsLCByZXNvdXJjZTogUmVzb3VyY2VEZXRhaWwgfTtcclxuICAgIC8vIOeUqOaIt+S/oeaBr1xyXG4gICAgcHJpdmF0ZSB1c2VyID0ge1xyXG4gICAgICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIH0gYXMgeyB1c2VySW5mbzogVXNlckluZm9EZXRhaWwgfTtcclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVjb3JkVXNlckJlaGF2aW9yKG9wdGlvbnM6IEN1c3RvbU9wdGlvbnNUeXBlKSB7XHJcbiAgICAgICAgbGV0IGZtcDogeyBmbXBUaW1lOiBudW1iZXIgfCB1bmRlZmluZWQgfSA9IHtmbXBUaW1lOiB1bmRlZmluZWR9O1xyXG4gICAgICAgIGlmIChvcHRpb25zLmF1dG9UcmFjZVBlcmYpIHtcclxuICAgICAgICAgICAgdGhpcy5wZXJmQ29uZmlnLnBlcmZEZXRhaWwgPSBhd2FpdCBuZXcgcGFnZVBlcmYoKS5nZXRQZXJmVGltaW5nKCk7XHJcbiAgICAgICAgICAgIC8vIOeUqOaIt+S/oeaBr1xyXG4gICAgICAgICAgICB0aGlzLnVzZXIudXNlckluZm8gPSBhd2FpdCBuZXcgdXNlckluZm8oKS5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICAvLyDpobXpnaLotYTmupBcclxuICAgICAgICAgICAgdGhpcy5wZXJmQ29uZmlnLnJlc291cmNlID0gYXdhaXQgbmV3IHBhZ2VSZXNvdXJjZSgpLmdldFJlc291cmNlKCk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnVzZUZtcCkge1xyXG4gICAgICAgICAgICAgICAgZm1wID0gYXdhaXQgbmV3IEZNUCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGF1dG8gcmVwb3J0IHB2IGFuZCBwZXJmIGRhdGFcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGVyZkRldGFpbCA9IG9wdGlvbnMuYXV0b1RyYWNlUGVyZlxyXG4gICAgICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wZXJmQ29uZmlnLnBlcmZEZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZm1wVGltZTogb3B0aW9ucy51c2VGbXAgPyBwYXJzZUludChTdHJpbmcoZm1wLmZtcFRpbWUpLCAxMCkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgLy8g6aG16Z2i5Yqg6L295L+h5oGv44CB5LiA5qyh6K+35rGCXHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VMb2FkT25jZSA9IFtwZXJmRGV0YWlsLmRuc1RpbWUsIHBlcmZEZXRhaWwudGNwVGltZSwgcGVyZkRldGFpbC5zc2xUaW1lLCBwZXJmRGV0YWlsLnR0ZmJUaW1lLCBwZXJmRGV0YWlsLnRyYW5zVGltZSwgcGVyZkRldGFpbC5kb21SZWFkeVRpbWUsIHBlcmZEZXRhaWwucmVzVGltZV07XHJcbiAgICAgICAgICAgIC8vIOmhtemdouaAp+iDveS/oeaBr+OAgeS4gOasoeivt+axglxyXG4gICAgICAgICAgICBjb25zdCBwYWdlUGVyZk9uY2UgPSBbcGVyZkRldGFpbC5mcHRUaW1lLCBwZXJmRGV0YWlsLmZtcFRpbWUsIHBlcmZEZXRhaWwuZG9tUmVhZHlUaW1lLCBwZXJmRGV0YWlsLmxvYWRQYWdlVGltZV07XHJcbiAgICAgICAgICAgIC8vIOWPkemAgeaVsOaNrlxyXG4gICAgICAgICAgICBjb25zdCB1c2VyQmVoYXZpb3JJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgLy8g6KGM5Li66L+96LiqaWRcclxuICAgICAgICAgICAgICAgIC4uLntiZWhhdmlvclRyYWNlSWQ6IGJlaGF2aW9yVHJhY2UuYmVoYXZpb3JUcmFjZUlkfSxcclxuICAgICAgICAgICAgICAgIC8vIOW6lOeUqOWQjeensFxyXG4gICAgICAgICAgICAgICAgc2VydmljZTogb3B0aW9ucy5zZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgLy8g5bqU55So54mI5pysXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlVmVyc2lvbjogb3B0aW9ucy5zZXJ2aWNlVmVyc2lvbixcclxuICAgICAgICAgICAgICAgIC8vIOmhtemdoui3r+W+hFxyXG4gICAgICAgICAgICAgICAgcGFnZVBhdGg6IG9wdGlvbnMucGFnZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAvLyDnmb3lsY/ml7bpl7RcclxuICAgICAgICAgICAgICAgIGZwdFRpbWU6cGVyZkRldGFpbC5mcHRUaW1lLFxyXG4gICAgICAgICAgICAgICAgLy8g6aaW5bGP5pe26Ze0XHJcbiAgICAgICAgICAgICAgICBmbXBUaW1lOnBlcmZEZXRhaWwuZm1wVGltZSxcclxuICAgICAgICAgICAgICAgIC8vIGRvbVJlYWR55pe26Ze0XHJcbiAgICAgICAgICAgICAgICBkb21SZWFkeVRpbWU6cGVyZkRldGFpbC5kb21SZWFkeVRpbWUsXHJcbiAgICAgICAgICAgICAgICAvLyDpobXpnaLliqDovb3ml7bpl7RcclxuICAgICAgICAgICAgICAgIGxvYWRQYWdlVGltZTpwZXJmRGV0YWlsLmxvYWRQYWdlVGltZSxcclxuICAgICAgICAgICAgICAgIC8vIOmhtemdouWKoOi9veS/oeaBr+OAgei1hOa6kOS/oeaBr1xyXG4gICAgICAgICAgICAgICAgcGFnZVBlcmZEYXRhU3RyOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZUxvYWREYXRhOiBwYWdlTG9hZE9uY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBlcmZvcm1hbmNlOiBwYWdlUGVyZk9uY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5wZXJmQ29uZmlnLnJlc291cmNlXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIC8vIOWPkeeUn+aXtumXtFxyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiAobmV3IERhdGUoKSkudmFsdWVPZigpLFxyXG4gICAgICAgICAgICAgICAgLy8g55So5oi35L+h5oGvXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLnVzZXIudXNlckluZm8sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5ldyBSZXBvcnQoJ1VTRVJCSCcsIG9wdGlvbnMuY29sbGVjdG9yKS5zZW5kQnlYaHIodXNlckJlaGF2aW9ySW5mbyk7XHJcbiAgICAgICAgICAgIC8vIOa4heepuuaVsOaNrlxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVXNlckJlaGF2aW9yKCk7XHJcbiAgICAgICAgfSwgMTAwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJVc2VyQmVoYXZpb3IoKSB7XHJcbiAgICAgICAgaWYgKCEod2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5jbGVhclJlc291cmNlVGltaW5ncykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UuY2xlYXJSZXNvdXJjZVRpbWluZ3MoKTtcclxuICAgICAgICB0aGlzLnBlcmZDb25maWcgPSB7XHJcbiAgICAgICAgICAgIHBlcmZEZXRhaWw6IHt9LFxyXG4gICAgICAgICAgICAvLyDpobXpnaLotYTmupBcclxuICAgICAgICAgICAgcmVzb3VyY2U6IHt9LFxyXG4gICAgICAgIH0gYXMgeyBwZXJmRGV0YWlsOiBJUGVyZkRldGFpbCwgcmVzb3VyY2U6IFJlc291cmNlRGV0YWlsIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBVc2VyQmVoYXZpb3IoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==