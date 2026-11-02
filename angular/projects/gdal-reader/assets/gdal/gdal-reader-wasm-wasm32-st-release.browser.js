(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.initNative = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var gdalReaderWasmWasm32StRelease_browser = {exports: {}};

	var hasRequiredGdalReaderWasmWasm32StRelease_browser;

	function requireGdalReaderWasmWasm32StRelease_browser () {
		if (hasRequiredGdalReaderWasmWasm32StRelease_browser) return gdalReaderWasmWasm32StRelease_browser.exports;
		hasRequiredGdalReaderWasmWasm32StRelease_browser = 1;
		(function (module, exports) {
			var Module2=(()=>{var _scriptName=globalThis.document?.currentScript?.src;return async function(moduleArg={}){var Module=moduleArg;var ENVIRONMENT_IS_WEB=!!globalThis.window;var ENVIRONMENT_IS_WORKER=!!globalThis.WorkerGlobalScope;globalThis.process?.versions?.node&&globalThis.process;if(!Module["expectedDataFileDownloads"])Module["expectedDataFileDownloads"]=0;Module["expectedDataFileDownloads"]++;(()=>{var isPthread=typeof ENVIRONMENT_IS_PTHREAD!=="undefined"&&ENVIRONMENT_IS_PTHREAD;var isWasmWorker=typeof ENVIRONMENT_IS_WASM_WORKER!=="undefined"&&ENVIRONMENT_IS_WASM_WORKER;if(isPthread||isWasmWorker)return;(async function(metadata){if(typeof window==="object")window["encodeURIComponent"](window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"))+"/");else if(typeof process==="undefined"&&typeof location!=="undefined")encodeURIComponent(location.pathname.substring(0,location.pathname.lastIndexOf("/"))+"/");var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"]("gdal-reader-wasm-wasm32-st-release.browser.data",""):"gdal-reader-wasm-wasm32-st-release.browser.data";var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var fetchPromise;var fetched=Module["getPreloadedPackage"]&&Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE);if(!fetched)fetchPromise=async function(packageName,packageSize){if(!Module["dataFileDownloads"])Module["dataFileDownloads"]={};try{var response=await fetch(packageName);}catch(e){throw new Error(`Network Error: ${packageName}`,{e})}if(!response.ok)throw new Error(`${response.status}: ${response.url}`);const chunks=[];const headers=response.headers;const total=Number(headers.get("Content-Length")||packageSize);let loaded=0;Module["setStatus"]&&Module["setStatus"]("Downloading data...");const reader=response.body.getReader();while(1){var{done,value}=await reader.read();if(done)break;chunks.push(value);loaded+=value.length;Module["dataFileDownloads"][packageName]={loaded,total};let totalLoaded=0;let totalSize=0;for(const download of Object.values(Module["dataFileDownloads"])){totalLoaded+=download.loaded;totalSize+=download.total;}Module["setStatus"]&&Module["setStatus"](`Downloading data... (${totalLoaded}/${totalSize})`);}const packageData=new Uint8Array(chunks.map(c=>c.length).reduce((a,b)=>a+b,0));let offset=0;for(const chunk of chunks){packageData.set(chunk,offset);offset+=chunk.length;}return packageData.buffer}(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE);async function runWithFS(Module){function assert(check,msg){if(!check)throw new Error(msg)}Module["FS_createPath"]("/","crossbind",true,true);Module["FS_createPath"]("/crossbind","proj",true,true);Module["addRunDependency"]("datafile_/tmp/crossbind/live/.crossbind/build/gdal-reader-wasm-wasm32-st-release.browser.data");if(!Module["preloadResults"])Module["preloadResults"]={};Module["preloadResults"]["/tmp/crossbind/live/.crossbind/build/gdal-reader-wasm-wasm32-st-release.browser.data"]={fromCache:false};if(!fetched)fetched=await fetchPromise;await async function(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer.constructor.name===ArrayBuffer.name,"bad input to processPackageData "+arrayBuffer.constructor.name);var byteArray=new Uint8Array(arrayBuffer);for(var file of metadata["files"]){var name=file["filename"];var data=byteArray.subarray(file["start"],file["end"]);Module["FS_createDataFile"](name,null,data,true,true,true);}Module["removeRunDependency"]("datafile_/tmp/crossbind/live/.crossbind/build/gdal-reader-wasm-wasm32-st-release.browser.data");}(fetched);}if(Module["FS_createPath"])runWithFS(Module);else {if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS);}})({files:[{filename:"/crossbind/proj/CH",start:0,end:1097},{filename:"/crossbind/proj/GL27",start:1097,end:1825},{filename:"/crossbind/proj/ITRF2000",start:1825,end:3924},{filename:"/crossbind/proj/ITRF2008",start:3924,end:9606},{filename:"/crossbind/proj/ITRF2014",start:9606,end:13096},{filename:"/crossbind/proj/ITRF2020",start:13096,end:18807},{filename:"/crossbind/proj/deformation_model.schema.json",start:18807,end:36478},{filename:"/crossbind/proj/nad.lst",start:36478,end:42863},{filename:"/crossbind/proj/nad27",start:42863,end:62398},{filename:"/crossbind/proj/nad83",start:62398,end:78991},{filename:"/crossbind/proj/other.extra",start:78991,end:82906},{filename:"/crossbind/proj/proj.db",start:82906,end:10634202},{filename:"/crossbind/proj/proj.ini",start:10634202,end:10636637},{filename:"/crossbind/proj/projjson.schema.json",start:10636637,end:10675055},{filename:"/crossbind/proj/triangulation.schema.json",start:10675055,end:10683458},{filename:"/crossbind/proj/world",start:10683458,end:10690537}],remote_package_size:10690537});})();var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};if(ENVIRONMENT_IS_WORKER)_scriptName=self.location.href;var scriptDirectory="";function locateFile(path){if(Module["locateFile"])return Module["locateFile"](path,scriptDirectory);return scriptDirectory+path}var readAsync,readBinary;if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){try{scriptDirectory=new URL(".",_scriptName).href;}catch{}if(ENVIRONMENT_IS_WORKER)readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)};readAsync=async url=>{if(isFileURI(url))return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response);return}reject(xhr.status);};xhr.onerror=reject;xhr.send(null);});var response=await fetch(url,{credentials:"same-origin"});if(response.ok)return response.arrayBuffer();throw new Error(response.status+" : "+response.url)};}var out=console.log.bind(console);var err=console.error.bind(console);var ABORT=false;var isFileURI=filename=>filename.startsWith("file://");var runtimeInitialized=false;function getMemoryBuffer(){return wasmMemory.buffer}function updateMemoryViews(){if(HEAP8?.buffer?.resizable)return;var b=getMemoryBuffer();HEAP8=new Int8Array(b);HEAP16=new Int16Array(b);HEAPU8=new Uint8Array(b);HEAPU16=new Uint16Array(b);HEAP32=new Int32Array(b);HEAPU32=new Uint32Array(b);HEAPF32=new Float32Array(b);HEAPF64=new Float64Array(b);HEAP64=new BigInt64Array(b);HEAPU64=new BigUint64Array(b);}function preRun(){var preRun=Module["preRun"];if(preRun){if(typeof preRun==="function")preRun=[preRun];onPreRuns.push(...preRun);}callRuntimeCallbacks(onPreRuns);}function initRuntime(){runtimeInitialized=true;wasmExports["Ab"]();}function postRun(){var postRun=Module["postRun"];if(postRun){if(typeof postRun==="function")postRun=[postRun];onPostRuns.push(...postRun);}callRuntimeCallbacks(onPostRuns);}function abort(what){Module["onAbort"]?.(what);what=`Aborted(${what})`;err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";if(runtimeInitialized)___trap();throw new WebAssembly.RuntimeError(what)}var wasmBinaryFile;function findWasmBinary(){return locateFile("gdal-reader-wasm-wasm32-st-release.browser.wasm")}function getBinarySync(file){if(readBinary)return readBinary(file);throw "both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){try{var response=await readAsync(binaryFile);return new Uint8Array(response)}catch{}return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason);}}async function instantiateAsync(binary,binaryFile,imports){if(!isFileURI(binaryFile))try{var response=fetch(binaryFile,{credentials:"same-origin"});var instantiationResult=await WebAssembly.instantiateStreaming(response,imports);return instantiationResult}catch(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation");}return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){var imports={a:wasmImports};return imports}class ExitStatus{name="ExitStatus";constructor(status){this.message=`Program terminated with exit(${status})`;this.status=status;}}var HEAP8;var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0)callbacks.shift()(Module);};var onPostRuns=[];var onPreRuns=[];var noExitRuntime=true;var HEAPU8;var AsciiToString=ptr=>{var str="";while(1){var ch=HEAPU8[ptr++];if(!ch)return str;str+=String.fromCharCode(ch);}};var awaitingDependencies={};var registeredTypes={};var typeDependencies={};class BindingError extends Error{constructor(message){super(message);this.name="BindingError";}}var throwBindingError=message=>{throw new BindingError(message)};function sharedRegisterType(rawType,registeredInstance,options={}){var name=registeredInstance.name;if(!rawType)throwBindingError(`type "${name}" must have a positive integer typeid pointer`);if(registeredTypes.hasOwnProperty(rawType))if(options.ignoreDuplicateRegistrations)return;else throwBindingError(`Cannot register type '${name}' twice`);registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(cb=>cb());}}function registerType(rawType,registeredInstance,options={}){return sharedRegisterType(rawType,registeredInstance,options)}var HEAP16;var HEAPU16;var HEAP32;var HEAPU32;var HEAP64;var HEAPU64;var integerReadValueFromPointer=(name,width,signed)=>{switch(width){case 1:return signed?pointer=>HEAP8[pointer]:pointer=>HEAPU8[pointer];case 2:return signed?pointer=>HEAP16[pointer>>1]:pointer=>HEAPU16[pointer>>1];case 4:return signed?pointer=>HEAP32[pointer>>2]:pointer=>HEAPU32[pointer>>2];case 8:return signed?pointer=>HEAP64[pointer>>3]:pointer=>HEAPU64[pointer>>3];default:throw new TypeError(`invalid integer width (${width}): ${name}`)}};var shallowCopyInternalPointer=o=>({count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType});var throwInstanceAlreadyDeleted=obj=>{throwBindingError(function(handle){return handle.$$.ptrType.registeredClass.name}(obj)+" instance already deleted");};var finalizationRegistry=false;var detachFinalizer=()=>{};var runDestructor=$$=>{if($$.smartPtr)$$.smartPtrType.rawDestructor($$.smartPtr);else $$.ptrType.registeredClass.rawDestructor($$.ptr);};var releaseClassHandle=$$=>{$$.count.value-=1;var toDelete=0===$$.count.value;if(toDelete)runDestructor($$);};var attachFinalizer=handle=>{if(!globalThis.FinalizationRegistry){attachFinalizer=handle=>handle;return handle}finalizationRegistry=new FinalizationRegistry(info=>{releaseClassHandle(info.$$);});attachFinalizer=handle=>{var $$=handle.$$;var hasSmartPtr=!!$$.smartPtr;if(hasSmartPtr||$$.count.owned){finalizationRegistry.register(handle,{$$},handle);}return handle};detachFinalizer=handle=>finalizationRegistry.unregister(handle);return attachFinalizer(handle)};function ClassHandle(){}var createNamedFunction=(name,func)=>Object.defineProperty(func,"name",{value:name});var registeredPointers={};var ensureOverloadTable=(proto,methodName,humanName)=>{if(void 0===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(...args){if(!proto[methodName].overloadTable.hasOwnProperty(args.length))throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);return proto[methodName].overloadTable[args.length].apply(this,args)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc;}};var getSignature=(args,keys)=>{var signature="";keys.some(key=>{if(key.length!==args.length)return false;var isKeyMatched=key.every((field,i)=>field==="emscripten::val"||typeof args[i]==="bigint"&&field==="number"||typeof args[i]==="object"&&void 0!==registeredTypes[field]&&args[i]instanceof registeredTypes[field].registeredClass.constructor||typeof args[i]===field);if(isKeyMatched){signature=key.join(", ");return true}return false});return signature};var ensureOverloadSignatureTable=(proto,methodName,humanName,numArguments)=>{ensureOverloadTable(proto,methodName,humanName);if(void 0!==proto[methodName].overloadTable&&void 0!==proto[methodName].overloadTable[numArguments]&&void 0===proto[methodName].overloadTable[numArguments].signatures){var prevFunc=proto[methodName].overloadTable[numArguments];proto[methodName].overloadTable[numArguments]=function(...args){var keys=proto[methodName].overloadTable[args.length].signaturesArray;var signature=getSignature(args,keys);if(!proto[methodName].overloadTable[args.length].signatures.hasOwnProperty(signature)){var signatures=proto[methodName].overloadTable[args.length].signaturesArray.map(sig=>"("+sig.map(s=>typeof s==="string"?s:registeredTypes[s].name)+")");var params=args.map(arg=>typeof arg==="object"&&arg.constructor&&arg.constructor.name?arg.constructor.name:typeof arg);throwBindingError(`Function '${humanName}' called with an invalid signature (${params}) - expects one of (${signatures})!`);}return proto[methodName].overloadTable[args.length].signatures[signature].apply(this,args)};proto[methodName].overloadTable[numArguments].signatures={};proto[methodName].overloadTable[numArguments].signatures[prevFunc.signature]=prevFunc;proto[methodName].overloadTable[numArguments].signaturesArray=[];}};var exposePublicSymbol=(name,value,numArguments,rawSignature)=>{if(Module.hasOwnProperty(name)){if(void 0===numArguments||Module[name].signature===rawSignature||void 0!==Module[name].overloadTable&&void 0!==Module[name].overloadTable[numArguments]&&Module[name].overloadTable[numArguments].signature===rawSignature||void 0!==Module[name].overloadTable&&void 0!==Module[name].overloadTable[numArguments]&&void 0!==Module[name].overloadTable[numArguments].signatures&&void 0!==Module[name].overloadTable[numArguments].signatures[rawSignature])throwBindingError(`Cannot register public name '${name}' twice`);if(void 0===Module[name].overloadTable&&Module[name].argCount===numArguments||void 0!==Module[name].overloadTable&&void 0!==Module[name].overloadTable[numArguments]){ensureOverloadSignatureTable(Module,name,name,numArguments);Module[name].overloadTable[numArguments].signatures[rawSignature]=value;}else {ensureOverloadTable(Module,name,name);Module[name].overloadTable[numArguments]=value;Module[name].overloadTable[numArguments].signature=rawSignature;}}else {Module[name]=value;if(void 0!==rawSignature){Module[name].argCount=numArguments;Module[name].signature=rawSignature;}}};var makeLegalFunctionName=name=>{name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=48&&f<=57)return `_${name}`;return name};function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[];}var upcastPointer=(ptr,ptrClass,desiredClass)=>{while(ptrClass!==desiredClass){if(!ptrClass.upcast)throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`);ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass;}return ptr};var embindRepr=v=>{if(v===null)return "null";var t=typeof v;if(t==="object"||t==="array"||t==="function")return v.toString();else return ""+v};function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference)throwBindingError(`null is not a valid ${this.name}`);return 0}if(!handle.$$)throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);if(!handle.$$.ptr)throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function genericPointerToWireType(destructors,handle){var ptr;if(handle===null){if(this.isReference)throwBindingError(`null is not a valid ${this.name}`);if(this.isSmartPointer){ptr=this.rawConstructor();if(destructors!==null)destructors.push(this.rawDestructor,ptr);return ptr}else return 0}if(!handle||!handle.$$)throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);if(!handle.$$.ptr)throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.isConst&&handle.$$.ptrType.isConst)throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name} to parameter type ${this.name}`);var handleClass=handle.$$.ptrType.registeredClass;ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(void 0===handle.$$.smartPtr)throwBindingError("Passing raw pointer to smart pointer is illegal");switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this)ptr=handle.$$.smartPtr;else throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this)ptr=handle.$$.smartPtr;else {var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,Emval.toHandle(()=>clonedHandle["delete"]()));if(destructors!==null)destructors.push(this.rawDestructor,ptr);}break;default:throwBindingError("Unsupported sharing policy");}}return ptr}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference)throwBindingError(`null is not a valid ${this.name}`);return 0}if(!handle.$$)throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);if(!handle.$$.ptr)throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);if(handle.$$.ptrType.isConst)throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`);var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function readPointer(pointer){return this.fromWireType(HEAPU32[pointer>>2])}var downcastPointer=(ptr,ptrClass,desiredClass)=>{if(ptrClass===desiredClass)return ptr;if(void 0===desiredClass.baseClass)return null;var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null)return null;return desiredClass.downcast(rv)};var registeredInstances={};var getBasestPointer=(class_,ptr)=>{if(ptr===void 0)throwBindingError("ptr should not be undefined");while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass;}return ptr};var getInheritedInstance=(class_,ptr)=>{ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr]};class InternalError extends Error{constructor(message){super(message);this.name="InternalError";}}var throwInternalError=message=>{throw new InternalError(message)};var makeClassHandle=(prototype,record)=>{if(!record.ptrType||!record.ptr)throwInternalError("makeClassHandle requires ptr and ptrType");var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr)throwInternalError("Both smartPtrType and smartPtr must be specified");record.count={value:1};return attachFinalizer(Object.create(prototype,{$$:{value:record,writable:true}}))};function crossbindOwnHandle(handle){var $$=handle.$$;if(!$$.smartPtr&&!$$.count.owned){$$.count.owned=true;if(finalizationRegistry)finalizationRegistry.register(handle,{$$},handle);}return handle}function RegisteredPointer_fromWireType(ptr){var handle=crossbindHandleFromWire.call(this,ptr);return this.isReference&&handle?crossbindOwnHandle(handle):handle}function crossbindHandleFromWire(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(void 0!==registeredInstance)if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]()}else {var rv=registeredInstance["clone"]();this.destructor(ptr);return rv}function makeDefaultHandle(){if(this.isSmartPointer)return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr});else return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr})}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord)return makeDefaultHandle.call(this);var toType;if(this.isConst)toType=registeredPointerRecord.constPointerType;else toType=registeredPointerRecord.pointerType;var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null)return makeDefaultHandle.call(this);if(this.isSmartPointer)return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr});else return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===void 0)if(isConst){this.toWireType=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}else {this.toWireType=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}else this.toWireType=genericPointerToWireType;}var replacePublicSymbol=(name,value,numArguments,signatureArray,rawSignature)=>{if(!Module.hasOwnProperty(name))throwInternalError("Replacing nonexistent public symbol");var signatureString=void 0!==signatureArray?signatureArray.join(", "):void 0;if(void 0!==Module[name].overloadTable&&void 0!==numArguments)if(void 0!==Module[name].overloadTable[numArguments]&&void 0!==Module[name].overloadTable[numArguments].signatures&&signatureString){if(void 0!==Module[name].overloadTable[numArguments].signatures[rawSignature])delete Module[name].overloadTable[numArguments].signatures[rawSignature];if(void 0!==Module[name].overloadTable[numArguments].signatures[signatureString])throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);Module[name].overloadTable[numArguments].signatures[signatureString]=value;Module[name].overloadTable[numArguments].signaturesArray.push(signatureArray);}else Module[name].overloadTable[numArguments]=value;else {Module[name]=value;Module[name].argCount=numArguments;Module[name].signature=signatureString;}};var getWasmTableEntry=funcPtr=>wasmTable.get(funcPtr);var embind__requireFunction=(signature,rawFunction)=>{signature=AsciiToString(signature);var fp=function(){var rtn=getWasmTableEntry(rawFunction);return rtn}();if(typeof fp!=="function")throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);return fp};class UnboundTypeError extends Error{}var getTypeName=type=>{var ptr=___getTypeName(type);var rv=AsciiToString(ptr);_free(ptr);return rv};var throwUnboundTypeError=(message,types)=>{var unboundTypes=[];var seen={};types.forEach(function visit(type){if(seen[type])return;if(registeredTypes[type])return;if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true;});throw new UnboundTypeError(`${message}: `+unboundTypes.map(getTypeName).join([", "]))};var whenDependentTypesAreResolved=(myTypes,dependentTypes,getTypeConverters)=>{myTypes.forEach(type=>typeDependencies[type]=dependentTypes);function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length)throwInternalError("Mismatched type converter count");for(var i=0;i<myTypes.length;++i)registerType(myTypes[i],myTypeConverters[i]);}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;for(let[i,dt]of dependentTypes.entries())if(registeredTypes.hasOwnProperty(dt))typeConverters[i]=registeredTypes[dt];else {unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt))awaitingDependencies[dt]=[];awaitingDependencies[dt].push(()=>{typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length)onComplete(typeConverters);});}if(0===unregisteredTypes.length)onComplete(typeConverters);};var heap32VectorToArray=(count,firstElement)=>{var array=[];for(var i=0;i<count;i++)array.push(HEAPU32[firstElement+i*4>>2]);return array};var runDestructors=destructors=>{while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr);}};function usesDestructorStack(argTypes){for(var i=1;i<argTypes.length;++i)if(argTypes[i]!==null&&argTypes[i].destructorFunction===void 0)return true;return false}function argsUseStackAlloc(argTypes){for(var i=1;i<argTypes.length;++i)if(argTypes[i]!==null&&argTypes[i].argStackAlloc)return true;return false}var stackSave=()=>_emscripten_stack_get_current();var stackRestore=val=>__emscripten_stack_restore(val);function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc,isAsync){var argCount=argTypes.length;if(argCount<2)throwBindingError("argTypes array size mismatch! Must at least get return value and receiver (this) types!");var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=usesDestructorStack(argTypes);var argsNeedStack=argsUseStackAlloc(argTypes);var useStackFrame=argsNeedStack&&!isAsync&&!needsDestructorStack;if(argsNeedStack&&!useStackFrame)needsDestructorStack=true;var returns=!argTypes[0].isVoid;var expectedArgCount=argCount-2;return createNamedFunction(humanName,function(...args){var argsWired=new Array(expectedArgCount);var invokerFuncArgs=[];var destructors=[];var sp;if(useStackFrame)sp=stackSave();var thisWired;var rv;try{invokerFuncArgs.length=isClassMethodFunc?2:1;invokerFuncArgs[0]=cppTargetFunc;if(isClassMethodFunc){thisWired=argTypes[1].toWireType(destructors,this);invokerFuncArgs[1]=thisWired;}for(var i=0;i<expectedArgCount;++i){var argType=argTypes[i+2];argsWired[i]=argType.toWireType(useStackFrame&&argType.argStackAlloc?null:destructors,args[i]);invokerFuncArgs.push(argsWired[i]);}rv=cppInvokerFunc(...invokerFuncArgs);}finally{if(useStackFrame)stackRestore(sp);}return function(rv){if(needsDestructorStack)runDestructors(destructors);else for(var i=isClassMethodFunc?1:2;i<argTypes.length;i++){var param=i===1?thisWired:argsWired[i-2];if(argTypes[i].destructorFunction!==null)argTypes[i].destructorFunction(param);}if(returns)return argTypes[0].fromWireType(rv)}(rv)})}var cppTypeToJsType=typeId=>{var type=registeredTypes[typeId];if(type.name==="std::string"||type.name==="std::wstring")return "string";else if(type.name==="bool")return "boolean";else if(["char","signed char","unsigned char","short","unsigned short","int","unsigned int","long","unsigned long","float","double","int64_t","uint64_t"].includes(type.name))return "number";return typeId};var getFunctionName=signature=>{signature=signature.trim();const argsIndex=signature.indexOf("(");if(argsIndex===-1)return signature;return signature.slice(0,argsIndex)};var emval_freelist=[];var emval_handles=[0,1,,1,null,1,true,1,false,1];var emval_exception_decrefs=[];var __emval_decref=handle=>{if(handle>9&&0===--emval_handles[handle+1]){var value=emval_handles[handle];emval_handles[handle]=void 0;var destructor=emval_exception_decrefs[handle];if(destructor){emval_exception_decrefs[handle]=void 0;destructor(value);}emval_freelist.push(handle);}};var Emval={toValue:handle=>{if(!handle)throwBindingError(`Cannot use deleted val. handle = ${handle}`);return emval_handles[handle]},toHandle:value=>{switch(value){case void 0:return 2;case null:return 4;case true:return 6;case false:return 8;default:{const handle=emval_freelist.pop()||emval_handles.length;emval_handles[handle]=value;emval_handles[handle+1]=1;return handle}}}};var EmValType={name:"emscripten::val",fromWireType:handle=>{var rv=Emval.toValue(handle);__emval_decref(handle);return rv},toWireType:(destructors,value)=>Emval.toHandle(value),readValueFromPointer:readPointer,destructorFunction:null};var HEAPF32;var HEAPF64;var floatReadValueFromPointer=(name,width)=>{switch(width){case 4:return function(pointer){return this.fromWireType(HEAPF32[pointer>>2])};case 8:return function(pointer){return this.fromWireType(HEAPF64[pointer>>3])};default:throw new TypeError(`invalid float width (${width}): ${name}`)}};var installIndexedIterator=(proto,sizeMethodName,getMethodName)=>{const makeIterator=(size,getValue)=>{let index=0;return {next(){if(index>=size)return {done:true};const current=index;index++;const value=getValue(current);return {value,done:false}},[Symbol.iterator](){return this}}};if(!proto[Symbol.iterator])proto[Symbol.iterator]=function(){const size=this[sizeMethodName]();return makeIterator(size,i=>this[getMethodName](i))};};var EmValOptionalType=Object.assign({optional:true},EmValType);var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.codePointAt(i);if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u;}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63;}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}else {if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;i++;}}heap[outIdx]=0;return outIdx-startIdx};var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127)len++;else if(c<=2047)len+=2;else if(c>=55296&&c<=57343){len+=4;++i;}else len+=3;}return len};var UTF8Decoder=new TextDecoder;var findStringEnd=(heapOrArray,idx,maxBytesToRead,ignoreNul)=>{var maxIdx=idx+maxBytesToRead;if(ignoreNul)return maxIdx;while(heapOrArray[idx]&&!(idx>=maxIdx))++idx;return idx};var UTF8ToString=(ptr,maxBytesToRead,ignoreNul)=>{if(!ptr)return "";var end=findStringEnd(HEAPU8,ptr,maxBytesToRead,ignoreNul);return UTF8Decoder.decode(HEAPU8.subarray(ptr,end))};var UTF16Decoder=new TextDecoder("utf-16le");var UTF16ToString=(ptr,maxBytesToRead,ignoreNul)=>{var idx=ptr>>1;var endIdx=findStringEnd(HEAPU16,idx,maxBytesToRead/2,ignoreNul);return UTF16Decoder.decode(HEAPU16.subarray(idx,endIdx))};var stringToUTF16=(str,outPtr,maxBytesToWrite=2147483647)=>{if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2;}HEAP16[outPtr>>1]=0;return outPtr-startPtr};var lengthBytesUTF16=str=>str.length*2;var UTF32ToString=(ptr,maxBytesToRead,ignoreNul)=>{var str="";var startIdx=ptr>>2;for(var i=0;!(i>=maxBytesToRead/4);i++){var utf32=HEAPU32[startIdx+i];if(!utf32&&!ignoreNul)break;str+=String.fromCodePoint(utf32);}return str};var stringToUTF32=(str,outPtr,maxBytesToWrite=2147483647)=>{if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codePoint=str.codePointAt(i);if(codePoint>65535)i++;HEAP32[outPtr>>2]=codePoint;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr};var lengthBytesUTF32=str=>{var len=0;for(var i=0;i<str.length;++i){var codePoint=str.codePointAt(i);if(codePoint>65535)i++;len+=4;}return len};var emval_methodCallers=[];var emval_addMethodCaller=caller=>{var id=emval_methodCallers.length;emval_methodCallers.push(caller);return id};var requireRegisteredType=(rawType,humanName)=>{var impl=registeredTypes[rawType];if(void 0===impl)throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);return impl};var emval_lookupTypes=(argCount,argTypes)=>{var a=new Array(argCount);for(var i=0;i<argCount;++i)a[i]=requireRegisteredType(HEAPU32[argTypes+i*4>>2],`parameter ${i}`);return a};var emval_returnValue=(toReturnWire,destructorsRef,handle)=>{var destructors=[];var result=toReturnWire(destructors,handle);if(destructors.length)HEAPU32[destructorsRef>>2]=Emval.toHandle(destructors);return result};var emval_symbols={};var getStringOrSymbol=address=>{var symbol=emval_symbols[address];if(symbol===void 0)return AsciiToString(address);return symbol};var isLeapYear=year=>year%4===0&&(year%100!==0||year%400===0);var MONTH_DAYS_LEAP_CUMULATIVE=[0,31,60,91,121,152,182,213,244,274,305,335];var MONTH_DAYS_REGULAR_CUMULATIVE=[0,31,59,90,120,151,181,212,243,273,304,334];var ydayFromDate=date=>{var leap=isLeapYear(date.getFullYear());var monthDaysCumulative=leap?MONTH_DAYS_LEAP_CUMULATIVE:MONTH_DAYS_REGULAR_CUMULATIVE;var yday=monthDaysCumulative[date.getMonth()]+date.getDate()-1;return yday};var bigintToI53Checked=num=>num<-9007199254740992||num>9007199254740992?NaN:Number(num);var wasmFSPreloadedDirs=[];var wasmFSPreloadedFiles=[];var wasmFSPreloadingFlushed=false;class HandleAllocator{allocated=[void 0];freelist=[];get(id){return this.allocated[id]}has(id){return this.allocated[id]!==void 0}allocate(handle){var id=this.freelist.pop()??this.allocated.length;this.allocated[id]=handle;return id}free(id){this.allocated[id]=void 0;this.freelist.push(id);}}var wasmfsOPFSAccessHandles=new HandleAllocator;var wasmfsOPFSBlobs=new HandleAllocator;var wasmfsOPFSDirectoryHandles=new HandleAllocator;var wasmfsOPFSFileHandles=new HandleAllocator;var wasmfsOPFSGetOrCreateFile=async(parent,name,create)=>{let parentHandle=wasmfsOPFSDirectoryHandles.get(parent);let fileHandle;try{fileHandle=await parentHandle.getFileHandle(name,{create});}catch(e){if(e.name==="NotFoundError")return  -20;if(e.name==="TypeMismatchError")return  -31;return  -29}return wasmfsOPFSFileHandles.allocate(fileHandle)};var wasmfsOPFSGetOrCreateDir=async(parent,name,create)=>{let parentHandle=wasmfsOPFSDirectoryHandles.get(parent);let childHandle;try{childHandle=await parentHandle.getDirectoryHandle(name,{create});}catch(e){if(e.name==="NotFoundError")return  -20;if(e.name==="TypeMismatchError")return  -54;return  -29}return wasmfsOPFSDirectoryHandles.allocate(childHandle)};class FileSystemAsyncAccessHandle{constructor(handle){this.handle=handle;}async close(){}async flush(){}async getSize(){let file=await this.handle.getFile();return file.size}async read(buffer,options={at:0}){let file=await this.handle.getFile();let slice=await file.slice(options.at,options.at+buffer.length);let fileBuffer=await slice.arrayBuffer();let array=new Uint8Array(fileBuffer);buffer.set(array);return array.length}async write(buffer,options={at:0}){let writable=await this.handle.createWritable({keepExistingData:true});await writable.write({type:"write",position:options.at,data:buffer});await writable.close();return buffer.length}async truncate(size){let writable=await this.handle.createWritable({keepExistingData:true});await writable.truncate(size);await writable.close();}}var wasmfsOPFSCreateAsyncAccessHandle=fileHandle=>new FileSystemAsyncAccessHandle(fileHandle);var FS_stdin_getChar_buffer=[];var intArrayFromString=(stringy,dontAddNull,length)=>{var len=lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);u8array.length=numBytesWritten;return u8array};var FS_stdin_getChar=()=>{if(!FS_stdin_getChar_buffer.length){var result=null;if(globalThis.window?.prompt){result=window.prompt("Input: ");if(result!==null)result+="\n";}if(!result)return null;FS_stdin_getChar_buffer=intArrayFromString(result);}return FS_stdin_getChar_buffer.shift()};var _emscripten_get_now=()=>performance.now();var _emscripten_date_now=()=>Date.now();var checkWasiClock=clock_id=>clock_id>=0&&clock_id<=3;function _curl_easy_cleanup(){abort("missing function: curl_easy_cleanup");}_curl_easy_cleanup.stub=true;function _curl_easy_getinfo(){abort("missing function: curl_easy_getinfo");}_curl_easy_getinfo.stub=true;function _curl_easy_init(){abort("missing function: curl_easy_init");}_curl_easy_init.stub=true;function _curl_easy_perform(){abort("missing function: curl_easy_perform");}_curl_easy_perform.stub=true;function _curl_easy_setopt(){abort("missing function: curl_easy_setopt");}_curl_easy_setopt.stub=true;function _curl_mime_addpart(){abort("missing function: curl_mime_addpart");}_curl_mime_addpart.stub=true;function _curl_mime_data(){abort("missing function: curl_mime_data");}_curl_mime_data.stub=true;function _curl_mime_data_cb(){abort("missing function: curl_mime_data_cb");}_curl_mime_data_cb.stub=true;function _curl_mime_filename(){abort("missing function: curl_mime_filename");}_curl_mime_filename.stub=true;function _curl_mime_free(){abort("missing function: curl_mime_free");}_curl_mime_free.stub=true;function _curl_mime_init(){abort("missing function: curl_mime_init");}_curl_mime_init.stub=true;function _curl_mime_name(){abort("missing function: curl_mime_name");}_curl_mime_name.stub=true;function _curl_multi_add_handle(){abort("missing function: curl_multi_add_handle");}_curl_multi_add_handle.stub=true;function _curl_multi_cleanup(){abort("missing function: curl_multi_cleanup");}_curl_multi_cleanup.stub=true;function _curl_multi_info_read(){abort("missing function: curl_multi_info_read");}_curl_multi_info_read.stub=true;function _curl_multi_init(){abort("missing function: curl_multi_init");}_curl_multi_init.stub=true;function _curl_multi_perform(){abort("missing function: curl_multi_perform");}_curl_multi_perform.stub=true;function _curl_multi_poll(){abort("missing function: curl_multi_poll");}_curl_multi_poll.stub=true;function _curl_multi_remove_handle(){abort("missing function: curl_multi_remove_handle");}_curl_multi_remove_handle.stub=true;function _curl_multi_setopt(){abort("missing function: curl_multi_setopt");}_curl_multi_setopt.stub=true;function _curl_slist_append(){abort("missing function: curl_slist_append");}_curl_slist_append.stub=true;function _curl_slist_free_all(){abort("missing function: curl_slist_free_all");}_curl_slist_free_all.stub=true;function _curl_version(){abort("missing function: curl_version");}_curl_version.stub=true;function _curl_version_info(){abort("missing function: curl_version_info");}_curl_version_info.stub=true;var getHeapMax=()=>2147483648;var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var growMemory=size=>{var oldHeapSize=wasmMemory.buffer.byteLength;var pages=(size-oldHeapSize+65535)/65536|0;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var ENV={};var getExecutableName=()=>thisProgram;var getEnvStrings=()=>{if(!getEnvStrings.strings){var lang=(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8";var env={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:lang,_:getExecutableName()};for(var x in ENV)if(ENV[x]===void 0)delete env[x];else env[x]=ENV[x];var strings=[];for(var x in env)strings.push(`${x}=${env[x]}`);getEnvStrings.strings=strings;}return getEnvStrings.strings};var keepRuntimeAlive=()=>noExitRuntime||0>0;var _proc_exit=code=>{if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true;}quit_(0,new ExitStatus(code));};var _exit=status=>{_proc_exit(status);};function _jpeg12_read_raw_data(){abort("missing function: jpeg12_read_raw_data");}_jpeg12_read_raw_data.stub=true;function _jpeg12_read_scanlines(){abort("missing function: jpeg12_read_scanlines");}_jpeg12_read_scanlines.stub=true;function _jpeg12_write_raw_data(){abort("missing function: jpeg12_write_raw_data");}_jpeg12_write_raw_data.stub=true;function _jpeg12_write_scanlines(){abort("missing function: jpeg12_write_scanlines");}_jpeg12_write_scanlines.stub=true;function _jpeg_CreateCompress(){abort("missing function: jpeg_CreateCompress");}_jpeg_CreateCompress.stub=true;function _jpeg_CreateDecompress(){abort("missing function: jpeg_CreateDecompress");}_jpeg_CreateDecompress.stub=true;function _jpeg_abort(){abort("missing function: jpeg_abort");}_jpeg_abort.stub=true;function _jpeg_destroy(){abort("missing function: jpeg_destroy");}_jpeg_destroy.stub=true;function _jpeg_finish_compress(){abort("missing function: jpeg_finish_compress");}_jpeg_finish_compress.stub=true;function _jpeg_finish_decompress(){abort("missing function: jpeg_finish_decompress");}_jpeg_finish_decompress.stub=true;function _jpeg_has_multiple_scans(){abort("missing function: jpeg_has_multiple_scans");}_jpeg_has_multiple_scans.stub=true;function _jpeg_read_header(){abort("missing function: jpeg_read_header");}_jpeg_read_header.stub=true;function _jpeg_read_raw_data(){abort("missing function: jpeg_read_raw_data");}_jpeg_read_raw_data.stub=true;function _jpeg_read_scanlines(){abort("missing function: jpeg_read_scanlines");}_jpeg_read_scanlines.stub=true;function _jpeg_resync_to_restart(){abort("missing function: jpeg_resync_to_restart");}_jpeg_resync_to_restart.stub=true;function _jpeg_set_colorspace(){abort("missing function: jpeg_set_colorspace");}_jpeg_set_colorspace.stub=true;function _jpeg_set_defaults(){abort("missing function: jpeg_set_defaults");}_jpeg_set_defaults.stub=true;function _jpeg_set_quality(){abort("missing function: jpeg_set_quality");}_jpeg_set_quality.stub=true;function _jpeg_start_compress(){abort("missing function: jpeg_start_compress");}_jpeg_start_compress.stub=true;function _jpeg_start_decompress(){abort("missing function: jpeg_start_decompress");}_jpeg_start_decompress.stub=true;function _jpeg_std_error(){abort("missing function: jpeg_std_error");}_jpeg_std_error.stub=true;function _jpeg_suppress_tables(){abort("missing function: jpeg_suppress_tables");}_jpeg_suppress_tables.stub=true;function _jpeg_write_raw_data(){abort("missing function: jpeg_write_raw_data");}_jpeg_write_raw_data.stub=true;function _jpeg_write_scanlines(){abort("missing function: jpeg_write_scanlines");}_jpeg_write_scanlines.stub=true;function _jpeg_write_tables(){abort("missing function: jpeg_write_tables");}_jpeg_write_tables.stub=true;function _lerc_decode(){abort("missing function: lerc_decode");}_lerc_decode.stub=true;function _lerc_encodeForVersion(){abort("missing function: lerc_encodeForVersion");}_lerc_encodeForVersion.stub=true;function _lerc_getBlobInfo(){abort("missing function: lerc_getBlobInfo");}_lerc_getBlobInfo.stub=true;var initRandomFill=()=>view=>(crypto.getRandomValues(view),0);var randomFill=view=>(randomFill=initRandomFill())(view);function _spatialite_alloc_connection(){abort("missing function: spatialite_alloc_connection");}_spatialite_alloc_connection.stub=true;function _spatialite_cleanup_ex(){abort("missing function: spatialite_cleanup_ex");}_spatialite_cleanup_ex.stub=true;function _spatialite_init_ex(){abort("missing function: spatialite_init_ex");}_spatialite_init_ex.stub=true;function _spatialite_version(){abort("missing function: spatialite_version");}_spatialite_version.stub=true;var PATH={isAbs:path=>path.charAt(0)==="/",splitPath:filename=>/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(filename).slice(1),normalizeArray:(parts,allowAboveRoot)=>{var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last===".")parts.splice(i,1);else if(last===".."){parts.splice(i,1);up++;}else if(up){parts.splice(i,1);up--;}}if(allowAboveRoot)for(;up;up--)parts.unshift("..");return parts},normalize:path=>{var isAbsolute=PATH.isAbs(path),trailingSlash=path.slice(-1)==="/";path=PATH.normalizeArray(path.split("/").filter(p=>!!p),!isAbsolute).join("/");if(!path&&!isAbsolute)path=".";if(path&&trailingSlash)path+="/";return (isAbsolute?"/":"")+path},dirname:path=>{var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir)return ".";if(dir)dir=dir.slice(0,-1);return root+dir},basename:path=>path&&path.match(/([^\/]+|\/)\/*$/)[1],join:(...paths)=>PATH.normalize(paths.join("/")),join2:(l,r)=>PATH.normalize(l+"/"+r)};var stackAlloc=sz=>__emscripten_stack_alloc(sz);var stringToUTF8OnStack=str=>{var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8(str,ret,size);return ret};var withStackSave=f=>{var stack=stackSave();var ret=f();stackRestore(stack);return ret};var readI53FromI64=ptr=>HEAPU32[ptr>>2]+HEAP32[ptr+4>>2]*4294967296;var readI53FromU64=ptr=>HEAPU32[ptr>>2]+HEAPU32[ptr+4>>2]*4294967296;var FS_mknod=(path,mode,dev)=>FS.handleError(withStackSave(()=>{var pathBuffer=stringToUTF8OnStack(path);return __wasmfs_mknod(pathBuffer,mode,dev)}));var FS_create=(path,mode=438)=>{mode&=4095;mode|=32768;return FS_mknod(path,mode,0)};var FS_fileDataToTypedArray=data=>{if(typeof data==="string")data=intArrayFromString(data);if(!data.subarray)data=new Uint8Array(data);return data};var FS_writeFile=(path,data)=>{var sp=stackSave();var pathBuffer=stringToUTF8OnStack(path);data=FS_fileDataToTypedArray(data);var len=data.length;var dataBuffer=_malloc(len);HEAPU8.set(data,dataBuffer);var ret=__wasmfs_write_file(pathBuffer,dataBuffer,len);_free(dataBuffer);stackRestore(sp);return ret};var FS_createDataFile=(parent,name,fileData,canRead,canWrite)=>{var pathName=name?parent+"/"+name:parent;var mode=FS_getMode(canRead,canWrite);if(!wasmFSPreloadingFlushed)wasmFSPreloadedFiles.push({pathName,fileData,mode});else {FS_create(pathName,mode);FS_writeFile(pathName,fileData);}};var asyncLoad=async url=>{var arrayBuffer=await readAsync(url);return new Uint8Array(arrayBuffer)};var PATH_FS={resolve:(...args)=>{var resolvedPath="",resolvedAbsolute=false;for(var i=args.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?args[i]:FS.cwd();if(typeof path!=="string")throw new TypeError("Arguments to path.resolve must be strings");else if(!path)return "";resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=PATH.isAbs(path);}resolvedPath=PATH.normalizeArray(resolvedPath.split("/").filter(p=>!!p),!resolvedAbsolute).join("/");return (resolvedAbsolute?"/":"")+resolvedPath||"."},relative:(from,to)=>{from=PATH_FS.resolve(from).slice(1);to=PATH_FS.resolve(to).slice(1);function trim(arr){var start=0;for(;start<arr.length;start++)if(arr[start]!=="")break;var end=arr.length-1;for(;end>=0;end--)if(arr[end]!=="")break;if(start>end)return [];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++)if(fromParts[i]!==toParts[i]){samePartsLength=i;break}var outputParts=[];for(i=samePartsLength;i<fromParts.length;i++)outputParts.push("..");outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")}};var dependenciesPromise=null;var resolveRunDependencies=async()=>dependenciesPromise;var runDependencies=0;var dependenciesPromiseResolve=null;var removeRunDependency=()=>{runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(!runDependencies)dependenciesPromiseResolve();};var addRunDependency=()=>{if(!runDependencies)dependenciesPromise=new Promise(resolve=>dependenciesPromiseResolve=resolve);runDependencies++;Module["monitorRunDependencies"]?.(runDependencies);};var preloadPlugins=[];var FS_handledByPreloadPlugin=async(byteArray,fullname)=>{if(typeof Browser!=="undefined")Browser.init();for(var plugin of preloadPlugins)if(plugin["canHandle"](fullname))return plugin["handle"](byteArray,fullname);return byteArray};var FS_preloadFile=async(parent,name,url,canRead,canWrite,dontCreateFile,canOwn,preFinish)=>{var fullname=name?PATH_FS.resolve(PATH.join2(parent,name)):parent;addRunDependency();try{var byteArray=url;if(typeof url==="string")byteArray=await asyncLoad(url);byteArray=await FS_handledByPreloadPlugin(byteArray,fullname);preFinish?.();if(!dontCreateFile)FS_createDataFile(parent,name,byteArray,canRead,canWrite);}finally{removeRunDependency();}};var FS_createPreloadedFile=(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn,preFinish)=>{FS_preloadFile(parent,name,url,canRead,canWrite,dontCreateFile,0,preFinish).then(onload).catch(onerror);};var FS_getMode=(canRead,canWrite)=>{var mode=0;if(canRead)mode|=365;if(canWrite)mode|=146;return mode};var FS_modeStringToFlags=str=>{if(typeof str!=="string")return str;var flags={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[str];if(typeof flags==="undefined")throw new Error(`Unknown file open mode: ${str}`);return flags};var FS_mkdir=(path,mode=511)=>FS.handleError(withStackSave(()=>{var buffer=stringToUTF8OnStack(path);return __wasmfs_mkdir(buffer,mode)}));var FS_mkdirTree=(path,mode)=>{var dirs=path.split("/");var d="";for(var dir of dirs){if(!dir)continue;if(d||PATH.isAbs(path))d+="/";d+=dir;try{FS_mkdir(d,mode);}catch(e){if(e.errno!=20)throw e}}};var FS_unlink=path=>withStackSave(()=>{var buffer=stringToUTF8OnStack(path);return __wasmfs_unlink(buffer)});var wasmFS$backends={};var wasmFSDevices={};var wasmFSDeviceStreams={};var FS={ErrnoError:class extends Error{name="ErrnoError";message="FS error";constructor(code){super();this.errno=code;}},handleError(returnValue){if(returnValue<0)throw new FS.ErrnoError(-returnValue);return returnValue},createDataFile(parent,name,fileData,canRead,canWrite,canOwn){FS_createDataFile(parent,name,fileData,canRead,canWrite);},createPath(parent,path,canRead,canWrite){var parts=path.split("/").reverse();while(parts.length){var part=parts.pop();if(!part)continue;var current=PATH.join2(parent,part);if(!wasmFSPreloadingFlushed)wasmFSPreloadedDirs.push({parentPath:parent,childName:part});else try{FS.mkdir(current);}catch(e){if(e.errno!=20)throw e}parent=current;}return current},createPreloadedFile(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn,preFinish){return FS_createPreloadedFile(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,0,preFinish)},async preloadFile(parent,name,url,canRead,canWrite,dontCreateFile,canOwn,preFinish){return FS_preloadFile(parent,name,url,canRead,canWrite,dontCreateFile,0,preFinish)},readFile(path,opts={}){opts.encoding??="binary";if(opts.encoding!=="utf8"&&opts.encoding!=="binary")throw new Error(`Invalid encoding type "${opts.encoding}"`);var buf,length;withStackSave(()=>{var bufPtr=stackAlloc(4);var sizePtr=stackAlloc(4);FS.handleError(-__wasmfs_read_file(stringToUTF8OnStack(path),bufPtr,sizePtr));buf=HEAPU32[bufPtr>>2];length=readI53FromI64(sizePtr);});return opts.encoding==="utf8"?UTF8ToString(buf,length):HEAPU8.slice(buf,buf+length)},cwd:()=>UTF8ToString(__wasmfs_get_cwd()),mkdir:(path,mode)=>FS_mkdir(path,mode),mkdirTree:(path,mode)=>FS_mkdirTree(path,mode),rmdir:path=>FS.handleError(withStackSave(()=>__wasmfs_rmdir(stringToUTF8OnStack(path)))),open:(path,flags,mode=438)=>withStackSave(()=>{flags=FS_modeStringToFlags(flags);var buffer=stringToUTF8OnStack(path);var fd=FS.handleError(__wasmfs_open(buffer,flags,mode));return {fd}}),create:(path,mode)=>FS_create(path,mode),close:stream=>FS.handleError(-__wasmfs_close(stream.fd)),unlink:path=>FS_unlink(path),chdir:path=>withStackSave(()=>__wasmfs_chdir(stringToUTF8OnStack(path))),read(stream,buffer,offset,length,position){var seeking=typeof position!=="undefined";var dataBuffer=_malloc(length);var bytesRead;if(seeking)bytesRead=__wasmfs_pread(stream.fd,dataBuffer,length,BigInt(position));else bytesRead=__wasmfs_read(stream.fd,dataBuffer,length);if(bytesRead>0)buffer.set(HEAPU8.subarray(dataBuffer,dataBuffer+bytesRead),offset);_free(dataBuffer);return FS.handleError(bytesRead)},write(stream,buffer,offset,length,position,canOwn){var seeking=typeof position!=="undefined";var dataBuffer=_malloc(length);for(var i=0;i<length;i++)HEAP8[dataBuffer+i]=buffer[offset+i];var bytesRead;if(seeking)bytesRead=__wasmfs_pwrite(stream.fd,dataBuffer,length,BigInt(position));else bytesRead=__wasmfs_write(stream.fd,dataBuffer,length);_free(dataBuffer);return FS.handleError(bytesRead)},writeFile:(path,data)=>FS_writeFile(path,data),mmap:(stream,length,offset,prot,flags)=>{var buf=FS.handleError(__wasmfs_mmap(length,prot,flags,stream.fd,BigInt(offset)));return {ptr:buf,allocated:true}},msync:(stream,bufferPtr,offset,length,mmapFlags)=>FS.handleError(__wasmfs_msync(bufferPtr,length,mmapFlags)),munmap:(addr,length)=>FS.handleError(__wasmfs_munmap(addr,length)),symlink:(target,linkpath)=>withStackSave(()=>__wasmfs_symlink(stringToUTF8OnStack(target),stringToUTF8OnStack(linkpath))),readlink(path){return withStackSave(()=>{var bufPtr=stackAlloc(4);FS.handleError(__wasmfs_readlink(stringToUTF8OnStack(path),bufPtr));var readBuffer=HEAPU32[bufPtr>>2];return UTF8ToString(readBuffer)})},statBufToObject(statBuf){return {dev:HEAPU32[statBuf>>2],mode:HEAPU32[statBuf+4>>2],nlink:HEAPU32[statBuf+8>>2],uid:HEAPU32[statBuf+12>>2],gid:HEAPU32[statBuf+16>>2],rdev:HEAPU32[statBuf+20>>2],size:readI53FromI64(statBuf+24),blksize:HEAP32[statBuf+32>>2],blocks:HEAP32[statBuf+36>>2],atime:readI53FromI64(statBuf+40),mtime:readI53FromI64(statBuf+56),ctime:readI53FromI64(statBuf+72),ino:readI53FromU64(statBuf+88)}},stat(path){return withStackSave(()=>{var statBuf=stackAlloc(96);FS.handleError(__wasmfs_stat(stringToUTF8OnStack(path),statBuf));return FS.statBufToObject(statBuf)})},lstat(path){return withStackSave(()=>{var statBuf=stackAlloc(96);FS.handleError(__wasmfs_lstat(stringToUTF8OnStack(path),statBuf));return FS.statBufToObject(statBuf)})},chmod(path,mode){return FS.handleError(withStackSave(()=>{var buffer=stringToUTF8OnStack(path);return __wasmfs_chmod(buffer,mode)}))},lchmod(path,mode){return FS.handleError(withStackSave(()=>{var buffer=stringToUTF8OnStack(path);return __wasmfs_lchmod(buffer,mode)}))},fchmod(fd,mode){return FS.handleError(__wasmfs_fchmod(fd,mode))},utime:(path,atime,mtime)=>FS.handleError(withStackSave(()=>__wasmfs_utime(stringToUTF8OnStack(path),atime,mtime))),truncate(path,len){return FS.handleError(withStackSave(()=>__wasmfs_truncate(stringToUTF8OnStack(path),BigInt(len))))},ftruncate(fd,len){return FS.handleError(__wasmfs_ftruncate(fd,BigInt(len)))},readdir:path=>withStackSave(()=>{var pathBuffer=stringToUTF8OnStack(path);var entries=[];var state=__wasmfs_readdir_start(pathBuffer);if(!state)throw new Error("No such directory");var entry;while(entry=__wasmfs_readdir_get(state))entries.push(UTF8ToString(entry));__wasmfs_readdir_finish(state);return entries}),mount:(type,opts,mountpoint)=>{var backendPointer=type.createBackend(opts);return FS.handleError(withStackSave(()=>__wasmfs_mount(stringToUTF8OnStack(mountpoint),backendPointer)))},unmount:mountpoint=>FS.handleError(withStackSave(()=>_wasmfs_unmount(stringToUTF8OnStack(mountpoint)))),mknod:(path,mode,dev)=>FS_mknod(path,mode,dev),makedev:(ma,mi)=>ma<<8|mi,registerDevice(dev,ops){var backendPointer=_wasmfs_create_jsimpl_backend();var definedOps={userRead:ops.read,userWrite:ops.write,allocFile:file=>{wasmFSDeviceStreams[file]={};},freeFile:file=>{wasmFSDeviceStreams[file]=void 0;},getSize:()=>{},setSize:()=>0,read:(file,buffer,length,offset)=>{var bufferArray=HEAP8.subarray(buffer,buffer+length);try{var bytesRead=definedOps.userRead(wasmFSDeviceStreams[file],bufferArray,0,length,offset);}catch(e){return -e.errno}HEAP8.set(bufferArray,buffer);return bytesRead},write:(file,buffer,length,offset)=>{var bufferArray=HEAP8.subarray(buffer,buffer+length);try{var bytesWritten=definedOps.userWrite(wasmFSDeviceStreams[file],bufferArray,0,length,offset);}catch(e){return -e.errno}HEAP8.set(bufferArray,buffer);return bytesWritten}};wasmFS$backends[backendPointer]=definedOps;wasmFSDevices[dev]=backendPointer;},createDevice(parent,name,input,output){if(typeof parent!=="string")throw new Error("Only string paths are accepted");var path=PATH.join2(parent,name);var mode=FS_getMode(!!input,!!output);FS.createDevice.major??=64;var dev=FS.makedev(FS.createDevice.major++,0);FS.registerDevice(dev,{read(stream,buffer,offset,length,pos){var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=input();}catch(e){throw new FS.ErrnoError(29)}if(result===void 0&&!bytesRead)throw new FS.ErrnoError(6);if(result===null||result===void 0)break;bytesRead++;buffer[offset+i]=result;}return bytesRead},write(stream,buffer,offset,length,pos){for(var i=0;i<length;i++)try{output(buffer[offset+i]);}catch(e){throw new FS.ErrnoError(29)}return i}});return FS.mkdev(path,mode,dev)},mkdev(path,mode,dev){if(typeof dev==="undefined"){dev=mode;mode=438;}var deviceBackend=wasmFSDevices[dev];if(!deviceBackend)throw new Error("Invalid device ID.");return FS.handleError(withStackSave(()=>_wasmfs_create_file(stringToUTF8OnStack(path),mode,deviceBackend)))},rename(oldPath,newPath){return FS.handleError(withStackSave(()=>{var oldPathBuffer=stringToUTF8OnStack(oldPath);var newPathBuffer=stringToUTF8OnStack(newPath);return __wasmfs_rename(oldPathBuffer,newPathBuffer)}))},llseek(stream,offset,whence){return FS.handleError(__wasmfs_llseek(stream.fd,BigInt(offset),whence))}};var getCppExceptionTag=()=>___cpp_exception;var getCppExceptionThrownObjectFromWebAssemblyException=ex=>{var unwind_header=ex.getArg(getCppExceptionTag(),0);return ___thrown_object_from_unwind_exception(unwind_header)};var getExceptionMessageCommon=ptr=>{var sp=stackSave();var type_addr_addr=stackAlloc(4);var message_addr_addr=stackAlloc(4);___get_exception_message(ptr,type_addr_addr,message_addr_addr);var type_addr=HEAPU32[type_addr_addr>>2];var message_addr=HEAPU32[message_addr_addr>>2];var type=UTF8ToString(type_addr);_free(type_addr);var message;if(message_addr){message=UTF8ToString(message_addr);_free(message_addr);}stackRestore(sp);return [type,message]};var FS_createPath=FS.createPath;(()=>{let proto=ClassHandle.prototype;Object.assign(proto,{isAliasOf(other){if(!(this instanceof ClassHandle))return false;if(!(other instanceof ClassHandle))return false;var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;other.$$=other.$$;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass;}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass;}return leftClass===rightClass&&left===right},clone(){if(!this.$$.ptr)throwInstanceAlreadyDeleted(this);if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this}else {var clone=attachFinalizer(Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}}));clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone}},delete(){if(!this.$$.ptr)throwInstanceAlreadyDeleted(this);if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete)throwBindingError("Object already scheduled for deletion");detachFinalizer(this);releaseClassHandle(this.$$);if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=void 0;this.$$.ptr=void 0;}},isDeleted(){return !this.$$.ptr},deleteLater(){if(!this.$$.ptr)throwInstanceAlreadyDeleted(this);if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete)throwBindingError("Object already scheduled for deletion");this.$$.deleteScheduled=true;return this}});const symbolDispose=Symbol.dispose;if(symbolDispose)proto[symbolDispose]=proto["delete"];})();(()=>{Object.assign(RegisteredPointer.prototype,{getPointee(ptr){if(this.rawGetPointee)ptr=this.rawGetPointee(ptr);return ptr},destructor(ptr){this.rawDestructor?.(ptr);},readValueFromPointer:readPointer,fromWireType:RegisteredPointer_fromWireType});})();if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(Module["print"])out=Module["print"];if(Module["printErr"])err=Module["printErr"];if(Module["arguments"])Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];var preInit=Module["preInit"];if(preInit){if(typeof preInit==="function")Module["preInit"]=preInit=[preInit];while(preInit.length>0)preInit.shift()();}Module["ENV"]=ENV;Module["addRunDependency"]=addRunDependency;Module["removeRunDependency"]=removeRunDependency;Module["getExceptionMessage"]=ex=>{var ptr=getCppExceptionThrownObjectFromWebAssemblyException(ex);return getExceptionMessageCommon(ptr)};Module["FS_preloadFile"]=FS_preloadFile;Module["FS_unlink"]=FS_unlink;Module["FS_createPath"]=FS_createPath;Module["FS"]=FS;Module["FS_createDataFile"]=FS_createDataFile;var ___getTypeName,_free,_malloc,___trap,__emscripten_stack_restore,__emscripten_stack_alloc,_emscripten_stack_get_current,___thrown_object_from_unwind_exception,___get_exception_message,__wasmfs_read_file,__wasmfs_write_file,__wasmfs_mkdir,__wasmfs_rmdir,__wasmfs_open,__wasmfs_mknod,__wasmfs_unlink,__wasmfs_chdir,__wasmfs_symlink,__wasmfs_readlink,__wasmfs_write,__wasmfs_pwrite,__wasmfs_chmod,__wasmfs_fchmod,__wasmfs_lchmod,__wasmfs_llseek,__wasmfs_rename,__wasmfs_read,__wasmfs_pread,__wasmfs_truncate,__wasmfs_ftruncate,__wasmfs_close,__wasmfs_mmap,__wasmfs_msync,__wasmfs_munmap,__wasmfs_utime,__wasmfs_stat,__wasmfs_lstat,__wasmfs_mount,__wasmfs_readdir_start,__wasmfs_readdir_get,__wasmfs_readdir_finish,__wasmfs_get_cwd,_wasmfs_create_jsimpl_backend,__wasmfs_opfs_record_entry,_wasmfs_create_file,_wasmfs_unmount,___cpp_exception,wasmMemory,wasmTable;function assignWasmExports(wasmExports){___getTypeName=wasmExports["Bb"];_free=wasmExports["Db"];_malloc=wasmExports["Eb"];___trap=wasmExports["Gb"];__emscripten_stack_restore=wasmExports["Hb"];__emscripten_stack_alloc=wasmExports["Ib"];_emscripten_stack_get_current=wasmExports["Jb"];___thrown_object_from_unwind_exception=wasmExports["Kb"];___get_exception_message=wasmExports["Lb"];__wasmfs_read_file=wasmExports["Mb"];__wasmfs_write_file=wasmExports["Nb"];__wasmfs_mkdir=wasmExports["Ob"];__wasmfs_rmdir=wasmExports["Pb"];__wasmfs_open=wasmExports["Qb"];__wasmfs_mknod=wasmExports["Rb"];__wasmfs_unlink=wasmExports["Sb"];__wasmfs_chdir=wasmExports["Tb"];__wasmfs_symlink=wasmExports["Ub"];__wasmfs_readlink=wasmExports["Vb"];__wasmfs_write=wasmExports["Wb"];__wasmfs_pwrite=wasmExports["Xb"];__wasmfs_chmod=wasmExports["Yb"];__wasmfs_fchmod=wasmExports["Zb"];__wasmfs_lchmod=wasmExports["_b"];__wasmfs_llseek=wasmExports["$b"];__wasmfs_rename=wasmExports["ac"];__wasmfs_read=wasmExports["bc"];__wasmfs_pread=wasmExports["cc"];__wasmfs_truncate=wasmExports["dc"];__wasmfs_ftruncate=wasmExports["ec"];__wasmfs_close=wasmExports["fc"];__wasmfs_mmap=wasmExports["gc"];__wasmfs_msync=wasmExports["hc"];__wasmfs_munmap=wasmExports["ic"];__wasmfs_utime=wasmExports["jc"];__wasmfs_stat=wasmExports["kc"];__wasmfs_lstat=wasmExports["lc"];__wasmfs_mount=wasmExports["mc"];__wasmfs_readdir_start=wasmExports["nc"];__wasmfs_readdir_get=wasmExports["oc"];__wasmfs_readdir_finish=wasmExports["pc"];__wasmfs_get_cwd=wasmExports["qc"];_wasmfs_create_jsimpl_backend=wasmExports["rc"];__wasmfs_opfs_record_entry=wasmExports["sc"];_wasmfs_create_file=wasmExports["tc"];_wasmfs_unmount=wasmExports["uc"];wasmMemory=wasmExports["zb"];wasmTable=wasmExports["Cb"];___cpp_exception=wasmExports["Fb"];}var wasmImports={ka:()=>0,pa:()=>abort(""),K:(primitiveType,name,size,minRange,maxRange)=>{name=AsciiToString(name);const isUnsignedType=minRange===0n;let fromWireType=value=>value;if(isUnsignedType){const bitSize=size*8;fromWireType=value=>BigInt.asUintN(bitSize,value);maxRange=fromWireType(maxRange);}registerType(primitiveType,{name,fromWireType,toWireType:(destructors,value)=>{if(typeof value=="number"){if(!Number.isSafeInteger(value))throw new TypeError("a 64-bit integer parameter takes a BigInt or a safe integer Number, got "+value);value=BigInt(value);}return value},readValueFromPointer:integerReadValueFromPointer(name,size,!isUnsignedType),destructorFunction:null});},ua:(rawType,name,trueValue,falseValue)=>{name=AsciiToString(name);registerType(rawType,{name,fromWireType:function(wt){return !!wt},toWireType:function(destructors,o){return o?trueValue:falseValue},readValueFromPointer:function(pointer){return this.fromWireType(HEAPU8[pointer])},destructorFunction:null});},k:(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor)=>{name=AsciiToString(name);getActualType=embind__requireFunction(getActualTypeSignature,getActualType);upcast&&=embind__requireFunction(upcastSignature,upcast);downcast&&=embind__requireFunction(downcastSignature,downcast);rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError(`Cannot construct ${name} due to unbound types`,[baseClassRawType]);});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],base=>{base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype;}else basePrototype=ClassHandle.prototype;var constructor=createNamedFunction(name,function(...args){if(Object.getPrototypeOf(this)!==instancePrototype)throw new BindingError(`Use 'new' to construct ${name}`);if(void 0===registeredClass.constructor_body)throw new BindingError(`${name} has no accessible constructor`);var body=void 0;if(void 0!==registeredClass.constructor_body[args.length])if(void 0!==registeredClass.constructor_body[args.length].func)body=registeredClass.constructor_body[args.length].func;else {var keys=registeredClass.constructor_body[args.length].signaturesArray;var signature=getSignature(args,keys);body=registeredClass.constructor_body[args.length].signatures[signature];}if(void 0===body)if(void 0===registeredClass.constructor_body[args.length])throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`);else {var signatures=registeredClass.constructor_body[args.length].signaturesArray.map(sig=>"("+sig.map(s=>typeof s==="string"?s:registeredTypes[s].name)+")");var params=args.map(arg=>typeof arg==="object"&&arg.constructor&&arg.constructor.name?arg.constructor.name:typeof arg);throw new BindingError(`Tried to invoke ctor of ${name} with invalid signature (${params}) - expected [${signatures}] parameters instead!`)}return crossbindOwnHandle(body.apply(this,args));});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);if(registeredClass.baseClass){registeredClass.baseClass.__derivedClasses??=[];registeredClass.baseClass.__derivedClasses.push(registeredClass);}var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return [referenceConverter,pointerConverter,constPointerConverter]});},j:(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor)=>{var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=embind__requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],classType=>{classType=classType[0];var humanName=`constructor ${classType.name}`;if(void 0===classType.registeredClass.constructor_body)classType.registeredClass.constructor_body=[];var rawSignatureArray=rawArgTypes.slice(1);var rawSignatureString=rawSignatureArray.join(", ");if(void 0!==classType.registeredClass.constructor_body[argCount-1]&&void 0!==classType.registeredClass.constructor_body[argCount-1].signatures[rawSignatureString])throw new BindingError(`Cannot register multiple constructors with identical javascript types of parameters for class '${classType.name}'!`);function unboundTypesHandler(){throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`,rawArgTypes);}if(void 0===classType.registeredClass.constructor_body[argCount-1])classType.registeredClass.constructor_body[argCount-1]={func:unboundTypesHandler,signatures:{},signaturesArray:[]};else delete classType.registeredClass.constructor_body[argCount-1].func;classType.registeredClass.constructor_body[argCount-1].signatures[rawSignatureString]=unboundTypesHandler;whenDependentTypesAreResolved([],rawArgTypes,argTypes=>{argTypes.splice(1,0,null);delete classType.registeredClass.constructor_body[argCount-1].signatures[rawSignatureString];var func=craftInvokerFunction(humanName,argTypes,null,invoker,rawConstructor);var signatureArray=rawSignatureArray.map(a=>cppTypeToJsType(a));var signatureString=signatureArray.join(", ");if(void 0!==classType.registeredClass.constructor_body[argCount-1].func)classType.registeredClass.constructor_body[argCount-1].func=func;classType.registeredClass.constructor_body[argCount-1].signatures[signatureString]=func;classType.registeredClass.constructor_body[argCount-1].signaturesArray.push(signatureArray);return []});return []});},d:(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual,isAsync)=>{var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=AsciiToString(methodName);methodName=getFunctionName(methodName);rawInvoker=embind__requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],classType=>{classType=classType[0];var humanName=`${classType.name}.${methodName}`;if(methodName.startsWith("@@"))methodName=Symbol[methodName.substring(2)];if(isPureVirtual)classType.registeredClass.pureVirtualFunctions.push(methodName);function unboundTypesHandler(){throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`,rawArgTypes);}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];var rawSignatureArray=rawArgTypes.slice(2);var rawSignatureString=rawSignatureArray.join(", ");if(void 0===method||void 0===method.overloadTable&&method.className!==classType.name&&method.signature===rawSignatureString){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.signature=rawSignatureString;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler;}else if(void 0===proto[methodName].overloadTable&&proto[methodName].argCount!==argCount-2||void 0!==proto[methodName].overloadTable&&void 0===proto[methodName].overloadTable[argCount-2]){ensureOverloadTable(proto,methodName,humanName);unboundTypesHandler.signature=rawSignatureString;proto[methodName].overloadTable[argCount-2]=unboundTypesHandler;}else {ensureOverloadSignatureTable(proto,methodName,humanName,argCount-2);proto[methodName].overloadTable[argCount-2].signatures[rawSignatureString]=unboundTypesHandler;}whenDependentTypesAreResolved([],rawArgTypes,argTypes=>{var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context,isAsync);var signatureArray=rawSignatureArray.map(a=>cppTypeToJsType(a));var signatureString=signatureArray.join(", ");if(void 0===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;memberFunction.signature=signatureString;proto[methodName]=memberFunction;}else if(void 0===proto[methodName].overloadTable[argCount-2].signatures){memberFunction.signature=signatureString;proto[methodName].overloadTable[argCount-2]=memberFunction;}else {delete proto[methodName].overloadTable[argCount-2].signatures[rawSignatureString];proto[methodName].overloadTable[argCount-2].signatures[signatureString]=memberFunction;proto[methodName].overloadTable[argCount-2].signaturesArray.push(signatureArray);}return []});return []});},sa:rawType=>registerType(rawType,EmValType),J:(rawType,name,size)=>{name=AsciiToString(name);registerType(rawType,{name,fromWireType:value=>value,toWireType:(destructors,value)=>value,readValueFromPointer:floatReadValueFromPointer(name,size),destructorFunction:null});},ra:(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn,isAsync)=>{var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=AsciiToString(name);name=getFunctionName(name);rawInvoker=embind__requireFunction(signature,rawInvoker);var rawSignatureArray=argTypes.slice(1);var rawSignatureString=rawSignatureArray.join(", ");exposePublicSymbol(name,function(){throwUnboundTypeError(`Cannot call ${name} due to unbound types`,argTypes);},argCount-1,rawSignatureString);whenDependentTypesAreResolved([],argTypes,argTypes=>{var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));var signatureArray=rawSignatureArray.map(a=>cppTypeToJsType(a));replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn,isAsync),argCount-1,signatureArray,rawSignatureString);return []});},t:(primitiveType,name,size,minRange,maxRange)=>{name=AsciiToString(name);const isUnsignedType=minRange===0;let fromWireType=value=>value;if(isUnsignedType){var bitshift=32-8*size;fromWireType=value=>value<<bitshift>>>bitshift;maxRange=fromWireType(maxRange);}registerType(primitiveType,{name,fromWireType,toWireType:(destructors,value)=>{if(typeof value=="number"||typeof value=="boolean"||typeof value=="bigint")return value;if(typeof value=="string"&&size==1&&value.length==1)return value.charCodeAt(0);if(value!==null&&typeof value=="object"&&typeof value.value=="number")return value.value;throw new TypeError(name+" takes a number, got "+(typeof value=="string"?JSON.stringify(value):value===null?"null":typeof value))},readValueFromPointer:integerReadValueFromPointer(name,size,minRange!==0),destructorFunction:null});},u:(rawClassType,rawElementType,sizeMethodName,getMethodName)=>{sizeMethodName=AsciiToString(sizeMethodName);getMethodName=AsciiToString(getMethodName);whenDependentTypesAreResolved([],[rawClassType,rawElementType],types=>{const classType=types[0];installIndexedIterator(classType.registeredClass.instancePrototype,sizeMethodName,getMethodName);return []});},i:(rawType,dataTypeIndex,name)=>{var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){var size=HEAPU32[handle>>2];var data=HEAPU32[handle+4>>2];return new TA(HEAP8.buffer,data,size)}name=AsciiToString(name);registerType(rawType,{name,fromWireType:decodeMemoryView,readValueFromPointer:decodeMemoryView},{ignoreDuplicateRegistrations:true});},l:rawOptionalType=>{registerType(rawOptionalType,EmValOptionalType);},yb:(rawType,rawPointeeType,name,sharingPolicy,getPointeeSignature,rawGetPointee,constructorSignature,rawConstructor,shareSignature,rawShare,destructorSignature,rawDestructor)=>{name=AsciiToString(name);rawGetPointee=embind__requireFunction(getPointeeSignature,rawGetPointee);rawConstructor=embind__requireFunction(constructorSignature,rawConstructor);rawShare=embind__requireFunction(shareSignature,rawShare);rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);whenDependentTypesAreResolved([rawType],[rawPointeeType],pointeeType=>{pointeeType=pointeeType[0];var registeredPointer=new RegisteredPointer(name,pointeeType.registeredClass,false,false,true,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor);return [registeredPointer]});},ta:(rawType,name)=>{name=AsciiToString(name);registerType(rawType,{name,fromWireType(value){var length=HEAPU32[value>>2];var payload=value+4;var str;str=UTF8ToString(payload,length,true);_free(value);return str},toWireType(destructors,value){if(value instanceof ArrayBuffer)value=new Uint8Array(value);var length;var valueIsOfTypeString=typeof value==="string";if(!(valueIsOfTypeString||ArrayBuffer.isView(value)&&value.BYTES_PER_ELEMENT==1))throwBindingError("Cannot pass non-string to std::string");if(valueIsOfTypeString)length=lengthBytesUTF8(value);else length=value.length;var base=_malloc(4+length+1);var ptr=base+4;HEAPU32[base>>2]=length;if(valueIsOfTypeString)stringToUTF8(value,ptr,length+1);else HEAPU8.set(value,ptr);if(destructors!==null)destructors.push(_free,base);return base},readValueFromPointer:readPointer,destructorFunction(ptr){_free(ptr);}});},C:(rawType,charSize,name)=>{name=AsciiToString(name);var decodeString,encodeString,lengthBytesUTF;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16;}else {decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32;}registerType(rawType,{name,fromWireType:value=>{var length=HEAPU32[value>>2];var str=decodeString(value+4,length*charSize,true);_free(value);return str},toWireType:(destructors,value)=>{if(!(typeof value==="string"))throwBindingError(`Cannot pass non-string to C++ string type ${name}`);var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>2]=length/charSize;encodeString(value,ptr+4,length+charSize);if(destructors!==null)destructors.push(_free,ptr);return ptr},readValueFromPointer:readPointer,destructorFunction(ptr){_free(ptr);}});},va:(rawType,name)=>{name=AsciiToString(name);registerType(rawType,{isVoid:true,name,fromWireType:()=>{},toWireType:()=>{}});},p:(argCount,argTypesPtr,kind)=>{var[retType,...argTypes]=emval_lookupTypes(argCount,argTypesPtr);var toReturnWire=retType.toWireType.bind(retType);var argFromPtr=argTypes.map(type=>type.readValueFromPointer.bind(type));argCount--;var argN=new Array(argCount);var functionName=`methodCaller<(${argTypes.map(t=>t.name)}) => ${retType.name}>`;return emval_addMethodCaller(createNamedFunction(functionName,(handle,methodName,destructorsRef,args)=>{var offset=0;for(var i=0;i<argCount;++i){argN[i]=argFromPtr[i](args+offset);offset+=8;}var rv;switch(kind){case 0:rv=Emval.toValue(handle).apply(null,argN);break;case 2:rv=Reflect.construct(Emval.toValue(handle),argN);break;case 3:rv=argN[0];break;case 1:rv=Emval.toValue(handle)[getStringOrSymbol(methodName)](...argN);break}return emval_returnValue(toReturnWire,destructorsRef,rv)}))},v:__emval_decref,ya:handle=>{if(handle>9)emval_handles[handle+1]+=1;},o:(caller,handle,methodName,destructorsRef,args)=>emval_methodCallers[caller](handle,methodName,destructorsRef,args),n:handle=>{var destructors=Emval.toValue(handle);runDestructors(destructors);__emval_decref(handle);},ia:function(time,tmPtr){time=bigintToI53Checked(time);var date=new Date(time*1e3);if(isNaN(date.getTime()))return 1;HEAP32[tmPtr>>2]=date.getSeconds();HEAP32[tmPtr+4>>2]=date.getMinutes();HEAP32[tmPtr+8>>2]=date.getHours();HEAP32[tmPtr+12>>2]=date.getDate();HEAP32[tmPtr+16>>2]=date.getMonth();HEAP32[tmPtr+20>>2]=date.getFullYear()-1900;HEAP32[tmPtr+24>>2]=date.getDay();var yday=ydayFromDate(date)|0;HEAP32[tmPtr+28>>2]=yday;HEAP32[tmPtr+36>>2]=-date.getTimezoneOffset()*60;var start=new Date(date.getFullYear(),0,1);var summerOffset=new Date(date.getFullYear(),6,1).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dst=(summerOffset!=winterOffset&&date.getTimezoneOffset()==Math.min(winterOffset,summerOffset))|0;HEAP32[tmPtr+32>>2]=dst;return 0},ja:(timezone,daylight,std_name,dst_name)=>{var currentYear=(new Date).getFullYear();var winter=new Date(currentYear,0,1);var summer=new Date(currentYear,6,1);var winterOffset=winter.getTimezoneOffset();var summerOffset=summer.getTimezoneOffset();var stdTimezoneOffset=Math.max(winterOffset,summerOffset);HEAPU32[timezone>>2]=stdTimezoneOffset*60;HEAP32[daylight>>2]=Number(winterOffset!=summerOffset);var extractZone=timezoneOffset=>{var sign=timezoneOffset>=0?"-":"+";var absOffset=Math.abs(timezoneOffset);var hours=String(Math.floor(absOffset/60)).padStart(2,"0");var minutes=String(absOffset%60).padStart(2,"0");return `UTC${sign}${hours}${minutes}`};var winterName=extractZone(winterOffset);var summerName=extractZone(summerOffset);if(summerOffset<winterOffset){stringToUTF8(winterName,std_name,17);stringToUTF8(summerName,dst_name,17);}else {stringToUTF8(winterName,dst_name,17);stringToUTF8(summerName,std_name,17);}},hb:(index,buffer)=>HEAPU8.set(wasmFSPreloadedFiles[index].fileData,buffer),fb:()=>wasmFSPreloadedDirs.length,gb:()=>{wasmFSPreloadingFlushed=true;return wasmFSPreloadedFiles.length},db:(index,childNameBuffer)=>{var s=wasmFSPreloadedDirs[index].childName;var len=lengthBytesUTF8(s)+1;stringToUTF8(s,childNameBuffer,len);},bb:index=>wasmFSPreloadedFiles[index].mode,jb:index=>wasmFSPreloadedFiles[index].fileData.length,eb:(index,parentPathBuffer)=>{var s=wasmFSPreloadedDirs[index].parentPath;var len=lengthBytesUTF8(s)+1;stringToUTF8(s,parentPathBuffer,len);},cb:(index,fileNameBuffer)=>{var s=wasmFSPreloadedFiles[index].pathName;var len=lengthBytesUTF8(s)+1;stringToUTF8(s,fileNameBuffer,len);},ab:(backend,file)=>wasmFS$backends[backend].allocFile(file),X:(backend,file)=>wasmFS$backends[backend].freeFile(file),$a:(backend,file)=>wasmFS$backends[backend].getSize(file),_a:function(backend,file,buffer,length,offset){offset=bigintToI53Checked(offset);if(!wasmFS$backends[backend].read)return  -28;return wasmFS$backends[backend].read(file,buffer,length,offset)},Ya:function(backend,file,size){size=bigintToI53Checked(size);return wasmFS$backends[backend].setSize(file,size)},Za:function(backend,file,buffer,length,offset){offset=bigintToI53Checked(offset);if(!wasmFS$backends[backend].write)return  -28;return wasmFS$backends[backend].write(file,buffer,length,offset)},sb:async(ctx,accessID,errPtr)=>{let accessHandle=wasmfsOPFSAccessHandles.get(accessID);try{await accessHandle.close();}catch{let err=-29;HEAP32[errPtr>>2]=err;}wasmfsOPFSAccessHandles.free(accessID);},Z:blobID=>{wasmfsOPFSBlobs.free(blobID);},mb:async(ctx,accessID,errPtr)=>{let accessHandle=wasmfsOPFSAccessHandles.get(accessID);try{await accessHandle.flush();}catch{let err=-29;HEAP32[errPtr>>2]=err;}},$:dirID=>{wasmfsOPFSDirectoryHandles.free(dirID);},Y:fileID=>{wasmfsOPFSFileHandles.free(fileID);},ea:async(ctx,parent,namePtr,childTypePtr,childIDPtr)=>{let name=UTF8ToString(namePtr);let childType=1;let childID=await wasmfsOPFSGetOrCreateFile(parent,name,false);if(childID==-31){childType=2;childID=await wasmfsOPFSGetOrCreateDir(parent,name,false);}HEAP32[childTypePtr>>2]=childType;HEAP32[childIDPtr>>2]=childID;},xb:async(ctx,dirID,entriesPtr,errPtr)=>{let dirHandle=wasmfsOPFSDirectoryHandles.get(dirID);try{let iter=dirHandle.entries();for(let entry;entry=await iter.next(),!entry.done;){let[name,child]=entry.value;let sp=stackSave();let namePtr=stringToUTF8OnStack(name);let type=child.kind=="file"?1:2;__wasmfs_opfs_record_entry(entriesPtr,namePtr,type);stackRestore(sp);}}catch{let err=-29;HEAP32[errPtr>>2]=err;}},wb:async(ctx,accessID,sizePtr)=>{let accessHandle=wasmfsOPFSAccessHandles.get(accessID);let size;try{size=await accessHandle.getSize();}catch{size=-29;}HEAP64[sizePtr>>3]=BigInt(size);},vb:function(blobID){var ret=(()=>wasmfsOPFSBlobs.get(blobID).size)();return BigInt(ret)},ub:async(ctx,fileID,sizePtr)=>{let fileHandle=wasmfsOPFSFileHandles.get(fileID);let size;try{size=(await fileHandle.getFile()).size;}catch{size=-29;}HEAP64[sizePtr>>3]=BigInt(size);},fa:async()=>{if(wasmfsOPFSDirectoryHandles.allocated.length==1){let root=await navigator.storage.getDirectory();wasmfsOPFSDirectoryHandles.allocated.push(root);}},ca:async(ctx,parent,namePtr,childIDPtr)=>{let name=UTF8ToString(namePtr);let childID=await wasmfsOPFSGetOrCreateDir(parent,name,true);HEAP32[childIDPtr>>2]=childID;},da:async(ctx,parent,namePtr,childIDPtr)=>{let name=UTF8ToString(namePtr);let childID=await wasmfsOPFSGetOrCreateFile(parent,name,true);HEAP32[childIDPtr>>2]=childID;},H:async(ctx,fileID,newParentID,namePtr,errPtr)=>{let name=UTF8ToString(namePtr);let fileHandle=wasmfsOPFSFileHandles.get(fileID);let newDirHandle=wasmfsOPFSDirectoryHandles.get(newParentID);try{await fileHandle.move(newDirHandle,name);}catch{let err=-29;HEAP32[errPtr>>2]=err;}},_:async(ctx,fileID,accessIDPtr)=>{let fileHandle=wasmfsOPFSFileHandles.get(fileID);let accessID;try{let accessHandle;accessHandle=await wasmfsOPFSCreateAsyncAccessHandle(fileHandle);accessID=wasmfsOPFSAccessHandles.allocate(accessHandle);}catch(e){if(e.name==="InvalidStateError"||e.name==="NoModificationAllowedError")accessID=-2;else accessID=-29;}HEAP32[accessIDPtr>>2]=accessID;},tb:async(ctx,fileID,blobIDPtr)=>{let fileHandle=wasmfsOPFSFileHandles.get(fileID);let blobID;try{let blob=await fileHandle.getFile();blobID=wasmfsOPFSBlobs.allocate(blob);}catch(e){if(e.name==="NotAllowedError")blobID=-2;else blobID=-29;}HEAP32[blobIDPtr>>2]=blobID;},qb:async function(accessID,bufPtr,len,pos){pos=bigintToI53Checked(pos);let accessHandle=wasmfsOPFSAccessHandles.get(accessID);let data=HEAPU8.subarray(bufPtr,bufPtr+len);try{return await accessHandle.read(data,{at:pos})}catch(e){if(e.name=="TypeError")return  -28;return  -29}},rb:async function(ctx,blobID,bufPtr,len,pos,nreadPtr){pos=bigintToI53Checked(pos);let blob=wasmfsOPFSBlobs.get(blobID);let slice=blob.slice(pos,pos+len);let nread=0;try{let buf=await slice.arrayBuffer();let data=new Uint8Array(buf);HEAPU8.set(data,bufPtr);nread+=data.length;}catch(e){if(e instanceof RangeError)nread=-21;else nread=-29;}HEAP32[nreadPtr>>2]=nread;},ba:async(ctx,dirID,namePtr,errPtr)=>{let name=UTF8ToString(namePtr);let dirHandle=wasmfsOPFSDirectoryHandles.get(dirID);try{await dirHandle.removeEntry(name);}catch{let err=-29;HEAP32[errPtr>>2]=err;}},nb:async function(ctx,accessID,size,errPtr){size=bigintToI53Checked(size);let accessHandle=wasmfsOPFSAccessHandles.get(accessID);try{await accessHandle.truncate(size);}catch{let err=-29;HEAP32[errPtr>>2]=err;}},ob:async function(ctx,fileID,size,errPtr){size=bigintToI53Checked(size);let fileHandle=wasmfsOPFSFileHandles.get(fileID);try{let writable=await fileHandle.createWritable({keepExistingData:true});await writable.truncate(size);await writable.close();}catch{let err=-29;HEAP32[errPtr>>2]=err;}},pb:async function(accessID,bufPtr,len,pos){pos=bigintToI53Checked(pos);let accessHandle=wasmfsOPFSAccessHandles.get(accessID);let data=HEAPU8.subarray(bufPtr,bufPtr+len);try{return await accessHandle.write(data,{at:pos})}catch(e){if(e.name=="TypeError")return  -28;return  -29}},lb:()=>{var c=FS_stdin_getChar();if(typeof c==="number")return c;return  -1},wa:function(key,offset,buffer,size){const file=Module["blobFiles"].get(UTF8ToString(key));if(!file)return  -1;const bytes=(new FileReaderSync).readAsArrayBuffer(file.slice(offset,offset+size));HEAPU8.set(new Uint8Array(bytes),buffer);return bytes.byteLength},xa:function(){Module["blobFiles"]=Module["blobFiles"]||new Map;Module["registerBlob"]=function(key,file){Module["blobFiles"].set(key,file);return file.size};Module["releaseBlob"]=function(key){return Module["blobFiles"].delete(key)};},L:function(key){const file=Module["blobFiles"].get(UTF8ToString(key));return file?file.size:-1},oa:function(clk_id,ignored_precision,ptime){if(!checkWasiClock(clk_id))return 28;var now;if(clk_id===0)now=_emscripten_date_now();else now=_emscripten_get_now();var nsec=Math.round(now*1e6);HEAP64[ptime>>3]=BigInt(nsec);return 0},b:_curl_easy_cleanup,f:_curl_easy_getinfo,e:_curl_easy_init,D:_curl_easy_perform,a:_curl_easy_setopt,W:_curl_mime_addpart,Ua:_curl_mime_data,Va:_curl_mime_data_cb,Wa:_curl_mime_filename,aa:_curl_mime_free,Xa:_curl_mime_init,V:_curl_mime_name,s:_curl_multi_add_handle,w:_curl_multi_cleanup,T:_curl_multi_info_read,U:_curl_multi_init,r:_curl_multi_perform,Ta:_curl_multi_poll,m:_curl_multi_remove_handle,B:_curl_multi_setopt,c:_curl_slist_append,h:_curl_slist_free_all,G:_curl_version,ib:_curl_version_info,g:_emscripten_date_now,x:str=>err(UTF8ToString(str)),ha:()=>getHeapMax(),I:_emscripten_get_now,kb:str=>out(UTF8ToString(str)),ga:requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize)return false;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignMemory(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement)return true}return false},ma:(__environ,environ_buf)=>{var bufSize=0;var envp=0;for(var string of getEnvStrings()){var ptr=environ_buf+bufSize;HEAPU32[__environ+envp>>2]=ptr;bufSize+=stringToUTF8(string,ptr,1/0)+1;envp+=4;}return 0},na:(penviron_count,penviron_buf_size)=>{var strings=getEnvStrings();HEAPU32[penviron_count>>2]=strings.length;var bufSize=0;for(var string of strings)bufSize+=lengthBytesUTF8(string)+1;HEAPU32[penviron_buf_size>>2]=bufSize;return 0},q:_exit,Qa:_jpeg12_read_raw_data,Oa:_jpeg12_read_scanlines,Ka:_jpeg12_write_raw_data,Ia:_jpeg12_write_scanlines,Ga:_jpeg_CreateCompress,S:_jpeg_CreateDecompress,E:_jpeg_abort,A:_jpeg_destroy,Ja:_jpeg_finish_compress,Pa:_jpeg_finish_decompress,Ra:_jpeg_has_multiple_scans,R:_jpeg_read_header,P:_jpeg_read_raw_data,O:_jpeg_read_scanlines,Sa:_jpeg_resync_to_restart,Na:_jpeg_set_colorspace,Ha:_jpeg_set_defaults,Ma:_jpeg_set_quality,La:_jpeg_start_compress,Q:_jpeg_start_decompress,F:_jpeg_std_error,Fa:_jpeg_suppress_tables,Da:_jpeg_write_raw_data,Ca:_jpeg_write_scanlines,Ea:_jpeg_write_tables,N:_lerc_decode,M:_lerc_encodeForVersion,Ba:_lerc_getBlobInfo,qa:_proc_exit,la:(buffer,size)=>randomFill(HEAPU8.subarray(buffer,buffer+size)),z:_spatialite_alloc_connection,Aa:_spatialite_cleanup_ex,y:_spatialite_init_ex,za:_spatialite_version};var wasmExports;wasmExports=await async function(){function receiveInstance(instance){wasmExports=instance.exports;assignWasmExports(wasmExports);updateMemoryViews();return wasmExports}var info=getWasmImports();var instantiateWasm=Module["instantiateWasm"];if(instantiateWasm)return new Promise(resolve=>{instantiateWasm(info,inst=>resolve(receiveInstance(inst)));});wasmBinaryFile??=findWasmBinary();var result=await instantiateAsync(void 0,wasmBinaryFile,info);var exports=function(result){return receiveInstance(result["instance"])}(result);return exports}();await async function(){preRun();if(runDependencies)await resolveRunDependencies();var setStatus=Module["setStatus"];if(setStatus){setStatus("Running...");await new Promise(resolve=>setTimeout(resolve,1));setTimeout(setStatus,1,"");}if(ABORT)return;initRuntime();Module["onRuntimeInitialized"]?.();postRun();}();
	return Module}})();{module.exports=Module2;module.exports.default=Module2;} 
		} (gdalReaderWasmWasm32StRelease_browser));
		return gdalReaderWasmWasm32StRelease_browser.exports;
	}

	var gdalReaderWasmWasm32StRelease_browserExports = requireGdalReaderWasmWasm32StRelease_browser();
	var Module = /*@__PURE__*/getDefaultExportFromCjs(gdalReaderWasmWasm32StRelease_browserExports);

	var systemConfig = {
	        env: {"OGR_GPKG_NUM_THREADS":"1","SPATIALITE_LOAD":"FALSE","GDAL_DATA":"_CROSSBIND_DATA_PATH_/gdal","DXF_FEATURE_LIMIT_PER_BLOCK":"-1","GDAL_ENABLE_DEPRECATED_DRIVER_GTM":"YES","CPL_LOG_ERRORS":"ON","GDAL_NUM_THREADS":"0","PROJ_DATA":"_CROSSBIND_DATA_PATH_/proj"},
	        useWorker: !!globalThis.Worker,
	        general: {
	            name: 'gdal-reader',
	        },
	        fs: {
	            opfs: false,
	        },
	        paths: {
	            wasm: 'gdal-reader-wasm-wasm32-st-release.browser.wasm',
	            data: 'gdal-reader-wasm-wasm32-st-release.browser.data.txt',
	            worker: 'gdal-reader-wasm-wasm32-st-release.browser.js',
	            js: 'gdal-reader-wasm-wasm32-st-release.browser.js',
	        }
	    };

	// === wasm-EH exception decoding (shared by the worker and direct runtimes) ===
	// Builds link with -fwasm-exceptions, so an uncaught C++ exception reaches JS as a raw
	// WebAssembly.Exception with no .message. The glue exports getExceptionMessage (via
	// -sEXPORT_EXCEPTION_HANDLING_HELPERS), which decodes it back into [type, what()]. This
	// adapter turns such values into real JS Errors at the binding boundary; anything else
	// passes through untouched, so it is safe to apply on every call path.
	let decodeModule = null;

	function setExceptionDecodeModule(m) {
	    decodeModule = m;
	}

	function decodeCppException(value) {
	    const m = decodeModule;
	    if (m == null
	        || typeof m.getExceptionMessage !== 'function'
	        || typeof WebAssembly === 'undefined'
	        || typeof WebAssembly.Exception !== 'function'
	        || !(value instanceof WebAssembly.Exception)) {
	        return value;
	    }
	    try {
	        const [type, message] = m.getExceptionMessage(value);
	        const error = new Error(message ? `${type}: ${message}` : `${type}`);
	        error.cppType = type;
	        error.cppMessage = message;
	        return error;
	    } catch (decodeFailure) {
	        return value;
	    }
	}

	const STATIC_SKIP = new Set(['prototype', 'name', 'length', 'caller', 'arguments', 'argCount']);

	function wrapOwnMethod(holder, name) {
	    const desc = Object.getOwnPropertyDescriptor(holder, name);
	    if (!desc || typeof desc.value !== 'function' || desc.writable === false) return;
	    const original = desc.value;
	    function decoded(...args) {
	        let result;
	        try {
	            result = original.apply(this, args);
	        } catch (e) {
	            throw decodeCppException(e);
	        }
	        if (result && typeof result.then === 'function') {
	            // Async (JSPI-style) binding: decode the rejection reason as well.
	            return result.then(undefined, (e) => { throw decodeCppException(e); });
	        }
	        return result;
	    }
	    // Overload dispatch reads properties (e.g. overloadTable) off the exposed function.
	    Object.assign(decoded, original);
	    Object.defineProperty(holder, name, { ...desc, value: decoded });
	}

	// Direct (non-worker) mode exposes embind class instances raw, so a thrown C++ exception in
	// an instance or static method never crosses a wrapper. Patching each bound class's
	// prototype and statics once at module-ready keeps object identity intact (embind checks
	// prototypes, not method identity) while every call site gains the decode.
	function patchModuleForExceptionDecode(m) {
	    setExceptionDecodeModule(m);
	    if (m == null || typeof m !== 'object') return m;
	    for (const key of Object.keys(m)) {
	        const Cls = m[key];
	        if (typeof Cls !== 'function') continue;
	        if (Cls.prototype) {
	            // Static-only classes are common (pure class_function surfaces), so statics are
	            // wrapped below regardless of whether the prototype carries any method.
	            Object.getOwnPropertyNames(Cls.prototype)
	                .filter((n) => n !== 'constructor')
	                .forEach((n) => wrapOwnMethod(Cls.prototype, n));
	        }
	        Object.getOwnPropertyNames(Cls)
	            .filter((n) => !STATIC_SKIP.has(n))
	            .forEach((n) => wrapOwnMethod(Cls, n));
	    }
	    return m;
	}

	// === Plain array -> embind vector coercion (shared by the worker and direct runtimes) ===
	// Vectors RETURNED across the worker boundary arrive as plain arrays, so callers naturally
	// try to pass plain arrays back as vector PARAMETERS - which embind rejects with
	// 'Cannot pass "..." as a VectorX'. Coercion catches that error, converts the first
	// remaining plain-array argument with Module.toVector, and retries, so mixed signatures
	// (VectorDataset + VectorString, ...) resolve left to right, matching embind's argument
	// order. embind passes std::vector parameters by value, so the temporaries are deleted
	// after the call instead of leaking wasm memory.
	//
	// This is a REACTIVE strategy: embind does not expose parameter types to JS, so we can
	// only learn that an argument should have been a vector from the failed call. See
	// EXPECTED_VECTOR_RE below - the coercion silently disengages (rethrows) if embind ever
	// changes that message, which the canary test in vectorCoercion.test.js guards against.

	let coercionModule = null;

	// Matches embind's "Cannot pass <value> as a VectorX" BindingError message.
	const EXPECTED_VECTOR_RE = /as a (Vector\w+)\b/;

	function setCoercionModule(m) {
	    coercionModule = m;
	}

	// Proxies created by the coercion wrappers, mapped back to their raw targets. embind
	// rejects a proxied `this` or argument (its class checks compare $$.ptrType.registeredClass
	// by identity), so every invocation unwraps them back to the raw objects first.
	const coercionProxies = new WeakMap();

	function unwrapCoercionProxy(value) {
	    const raw = coercionProxies.get(value);
	    return raw === undefined ? value : raw;
	}

	// The retry-on-vector-error loop shared by call and construct. `invoke(args)` performs the
	// actual apply/construct; on a 'Cannot pass ... as a VectorX' error that names a registered
	// Vector class while a plain-array argument remains, the first remaining array is converted
	// with Module.toVector and the invocation retried. Each retry converts exactly one array, so
	// the array count strictly decreases and the loop always terminates.
	function retryWithCoercion(invoke, args) {
	    const temp = [];
	    const cleanup = () => {
	        for (const v of temp) {
	            try {
	                v.delete();
	            } catch (e) { /* already deleted by the callee */ }
	        }
	    };
	    const current = args.slice();
	    for (;;) {
	        let result;
	        try {
	            result = invoke(current);
	        } catch (rawError) {
	            const e = decodeCppException(rawError);
	            const match = EXPECTED_VECTOR_RE.exec(String((e && e.message) || e));
	            const VectorClass = match && coercionModule ? coercionModule[match[1]] : undefined;
	            const index = current.findIndex((a) => Array.isArray(a));
	            if (typeof VectorClass !== 'function' || index < 0) {
	                cleanup();
	                throw e;
	            }
	            let vector;
	            try {
	                vector = coercionModule.toVector(VectorClass, current[index]);
	            } catch (convError) {
	                cleanup();
	                throw e;
	            }
	            temp.push(vector);
	            current[index] = vector;
	            continue;
	        }
	        if (temp.length && result && typeof result.then === 'function') {
	            // Async (JSPI-style) binding: arguments were already converted synchronously,
	            // but hold the temporaries until it settles.
	            return result.then(
	                (value) => {
	                    cleanup();
	                    return value;
	                },
	                (err) => {
	                    cleanup();
	                    throw decodeCppException(err);
	                },
	            );
	        }
	        cleanup();
	        return result;
	    }
	}

	function callWithVectorCoercion(fn, thisArg, args) {
	    return retryWithCoercion((current) => Reflect.apply(fn, thisArg, current), args);
	}

	function constructWithVectorCoercion(Class, args, newTarget) {
	    return retryWithCoercion((current) => Reflect.construct(Class, current, newTarget || Class), args);
	}

	// Deep wrapper (WORKER mode): every method reached through the wrapped object - at any depth
	// (Module.Gdal.openEx, dataset.translate, ...) - is invoked through callWithVectorCoercion,
	// and every `new` through the construct trap below. Safe here because the worker world is
	// entirely opaque Comlink proxies - nothing accesses raw memory or object identity through it.
	function wrapWithVectorCoercion(value, thisArg) {
	    if (value == null || (typeof value !== 'object' && typeof value !== 'function')) {
	        return value;
	    }
	    const proxy = new Proxy(value, {
	        get(target, prop) {
	            const member = Reflect.get(target, prop);
	            // Comlink invokes exposed methods as rawValue.apply(parent, args) with parent
	            // being the WRAPPED object. Handle Function.prototype apply/call here so `this`
	            // and the argument list reach callWithVectorCoercion unwrapped and flat (retries
	            // depend on seeing the real argument positions).
	            if (typeof target === 'function' && member === Function.prototype.apply) {
	                return (applyThis, applyArgs) => callWithVectorCoercion(
	                    target,
	                    applyThis === undefined && thisArg !== undefined
	                        ? thisArg
	                        : unwrapCoercionProxy(applyThis),
	                    applyArgs ? Array.prototype.map.call(applyArgs, unwrapCoercionProxy) : [],
	                );
	            }
	            if (typeof target === 'function' && member === Function.prototype.call) {
	                return (callThis, ...callArgs) => callWithVectorCoercion(
	                    target,
	                    callThis === undefined && thisArg !== undefined
	                        ? thisArg
	                        : unwrapCoercionProxy(callThis),
	                    callArgs.map(unwrapCoercionProxy),
	                );
	            }
	            if (typeof member === 'function' || (member !== null && typeof member === 'object')) {
	                // Proxy invariant: non-configurable, non-writable data properties (a class's
	                // .prototype, notably) must be returned as-is, or the engine throws on access.
	                const desc = Reflect.getOwnPropertyDescriptor(target, prop);
	                if (desc && desc.configurable === false && desc.writable === false) {
	                    return member;
	                }
	                return wrapWithVectorCoercion(member, target);
	            }
	            return member;
	        },
	        set(target, prop, value) {
	            // 3-arg Reflect.set keeps the RAW object as receiver: embind property setters
	            // identity-check `this`, and the default (proxy receiver) fails that check.
	            return Reflect.set(target, prop, unwrapCoercionProxy(value));
	        },
	        apply(target, applyThis, args) {
	            const boundThis = thisArg !== undefined ? thisArg : unwrapCoercionProxy(applyThis);
	            return callWithVectorCoercion(target, boundThis, args.map(unwrapCoercionProxy));
	        },
	        construct(target, args) {
	            // Comlink's CONSTRUCT handler does `new rawValue(...args)` on the wrapped
	            // class. Without this trap the construction falls through with the PROXY as
	            // newTarget, whose get trap hands out a wrapped .prototype (embind classes
	            // are plain functions, so their prototype is writable and the proxy
	            // invariant early-return does not apply) - and embind's prototype-identity
	            // check rejects the instance with "Use 'new' to construct X". Constructing
	            // against the raw class keeps the real prototype and adds the same
	            // plain-array vector coercion that method calls get.
	            return constructWithVectorCoercion(target, args.map(unwrapCoercionProxy));
	        },
	    });
	    coercionProxies.set(proxy, value);
	    return proxy;
	}

	// Narrow wrapper (DIRECT / non-worker mode): only the module's own function calls and
	// constructions are coerced. Data members (HEAP*, FS, typed arrays) and returned objects
	// stay raw, because direct-mode code accesses those by index and by identity - a blanket
	// proxy (like the worker wrapper above) would break them. Returned embind objects are
	// already real vectors/objects in direct mode (they are not flattened to plain arrays the
	// way the worker boundary does), so module-level coercion covers the plain-array-literal
	// case without changing any object's identity.
	function wrapModuleForCoercion(m) {
	    if (m == null || (typeof m !== 'object' && typeof m !== 'function')) {
	        return m;
	    }
	    const wrappedFns = new Map();
	    const moduleProxy = new Proxy(m, {
	        get(target, prop) {
	            const member = Reflect.get(target, prop);
	            if (typeof member !== 'function') {
	                return member; // HEAP*, FS, typed arrays and other data pass through raw
	            }
	            let wrapped = wrappedFns.get(prop);
	            if (!wrapped) {
	                wrapped = new Proxy(member, {
	                    apply(fn, thisArg, args) {
	                        return callWithVectorCoercion(
	                            fn,
	                            unwrapCoercionProxy(thisArg),
	                            args.map(unwrapCoercionProxy),
	                        );
	                    },
	                    construct(Class, args) {
	                        return constructWithVectorCoercion(Class, args.map(unwrapCoercionProxy));
	                    },
	                });
	                wrappedFns.set(prop, wrapped);
	            }
	            return wrapped;
	        },
	    });
	    coercionProxies.set(moduleProxy, m);
	    return moduleProxy;
	}

	function isObject$1(item) {
	    return (item && typeof item === 'object' && !Array.isArray(item));
	}

	function mergeDeep(target, ...sources) {
	    if (!sources.length) return target;
	    const source = sources.shift();

	    if (isObject$1(target) && isObject$1(source)) {
	        for (const key in source) {
	            if (isObject$1(source[key])) {
	                if (!target[key]) Object.assign(target, { [key]: {} });
	                mergeDeep(target[key], source[key]);
	            } else {
	                Object.assign(target, { [key]: source[key] });
	            }
	        }
	    }

	    return mergeDeep(target, ...sources);
	}

	function composeAdapters(adapters) {
	    const composed = {};
	    const extendFns = [];
	    const readyFns = [];
	    for (const a of adapters) {
	        if (!a) continue;
	        if (a.getDefaultPathPrefix) composed.getDefaultPathPrefix = a.getDefaultPathPrefix;
	        if (a.getDataPath) composed.getDataPath = a.getDataPath;
	        if (a.finalizePath) composed.finalizePath = a.finalizePath;
	        if (a.extendModule) extendFns.push(a.extendModule);
	        if (a.onModuleReady) readyFns.push(a.onModuleReady);
	    }
	    if (extendFns.length) {
	        composed.extendModule = (m, config) => extendFns.forEach((fn) => fn(m, config));
	    }
	    if (readyFns.length) {
	        composed.onModuleReady = async (m, config) => {
	            for (const fn of readyFns) {
	                await fn(m, config);
	            }
	        };
	    }
	    return composed;
	}

	function buildLocateFile(config, adapter) {
	    return function locateFile(fileName) {
	        let path = fileName;
	        if (config.paths && config.paths.wasm && fileName.endsWith('.wasm')) {
	            path = config.paths.wasm;
	        } else if (config.paths && config.paths.data && (fileName.endsWith('.data.txt') || fileName.endsWith('.data'))) {
	            path = config.paths.data;
	        }

	        let prefix = '';
	        if (config.path) {
	            prefix = config.path;
	            if (prefix.slice(-1) !== '/') prefix += '/';
	        } else if (adapter.getDefaultPathPrefix) {
	            prefix = adapter.getDefaultPathPrefix();
	        }

	        let output = prefix + path;
	        if (output.endsWith('.data')) output += '.txt';
	        if (adapter.finalizePath) output = adapter.finalizePath(output);

	        return output;
	    };
	}

	// WASMFS's FS.writeFile writes at the end of a file that exists (emsdk 6.0.9 js_api.cpp), where the classic FS
	// replaces it; opening the file for writing empties it first, unless the flags ask to append.
	function replaceOnWriteFile(FS) {
	    const { writeFile } = FS;
	    FS.writeFile = (path, data, opts) => {
	        const appends = typeof opts?.flags === 'string' && opts.flags.startsWith('a');
	        if (!appends) FS.close(FS.open(path, 'w', opts?.mode));
	        return writeFile(path, data, opts);
	    };
	}

	function createBaseModule(Module, config, adapter) {
	    return new Promise((resolve, reject) => {
	        const locateFile = buildLocateFile(config, adapter);
	        const dataPath = adapter.getDataPath ? adapter.getDataPath() : '/crossbind';

	        const m = {
	            print(text) {
	                if (config.logHandler) {
	                    config.logHandler(text, 'stdout');
	                } else {
	                    console.debug(`wasm stdout: ${text}`);
	                }
	            },
	            printErr(text) {
	                if (config.errorHandler) {
	                    config.errorHandler(text, 'stderr');
	                } else {
	                    console.error(`wasm stderr: ${text}`);
	                }
	            },
	            locateFile,
	            preRun: [
	                ({ ENV }) => {
	                    if (ENV && config && config.env) {
	                        Object.entries(config.env).forEach(([key, value]) => {
	                            ENV[key] = value?.replace('_CROSSBIND_DATA_PATH_', dataPath);
	                        });
	                    }
	                },
	            ],
	            unmount() {},
	            toArray(vector) {
	                if (Array.isArray(vector)) return vector;
	                const len = vector.size();
	                const output = new Array(len);
	                for (let i = 0; i < len; i += 1) {
	                    output[i] = vector.get(i);
	                }
	                return output;
	            },
	            toVector(classOrName, array = []) {
	                const VectorClass = typeof classOrName === 'string' ? m[classOrName] : classOrName;
	                const vector = new VectorClass();
	                array.forEach((item) => {
	                    vector.push_back(item);
	                });
	                return vector;
	            },
	        };

	        if (adapter.extendModule) adapter.extendModule(m, config);

	        if (config.getWasmFunction) {
	            m.instantiateWasm = function instantiateWasm(info, receive) {
	                const instance = new WebAssembly.Instance(config.getWasmFunction(), info);
	                receive(instance);
	                return instance.exports;
	            };
	        }

	        // onModuleReady may need to await async setup (e.g. the OPFS preflight in
	        // fs-browser), which emscripten's onRuntimeInitialized callback cannot, so
	        // both hooks run after the factory settles - adapter first, then the user's.
	        Module(m).then(async (mod) => {
	            if (mod.FS) replaceOnWriteFile(mod.FS);
	            if (adapter.onModuleReady) await adapter.onModuleReady(mod, config);
	            if (config.onRuntimeInitialized) config.onRuntimeInitialized(mod);
	            return mod;
	        }).then(resolve).catch(reject);
	    });
	}

	function createInitCrossbind({
	    Module, systemConfig, adapter, worker,
	}) {
	    let crossbindPromise;

	    function createModule(config) {
	        return createBaseModule(Module, config, adapter);
	    }

	    if (worker && worker.isWorkerScope) {
	        worker.exposeWorker(systemConfig, createModule);
	    }

	    function initNative(userConfig = {}) {
	        if (crossbindPromise) return crossbindPromise;

	        const config = mergeDeep(systemConfig, userConfig);

	        if (worker && config.useWorker && !worker.isWorkerScope) {
	            crossbindPromise = worker.initWithWorker(config, userConfig);
	        } else {
	            // Direct (non-worker) mode: wrap the module so plain-array arguments coerce to
	            // embind vectors like they do in worker mode. Narrow wrapper — only the module's
	            // own calls, leaving HEAP*/FS/returned objects raw (see wrapModuleForCoercion).
	            crossbindPromise = createModule(config).then((m) => {
	                setCoercionModule(m);
	                // Instance/static methods stay raw in direct mode, so the decode has to
	                // land on the class prototypes themselves.
	                patchModuleForExceptionDecode(m);
	                return wrapModuleForCoercion(m);
	            });
	        }

	        return crossbindPromise;
	    }

	    initNative.terminate = function terminate() {
	        if (worker && worker.terminate) worker.terminate();
	        crossbindPromise = null;
	    };

	    if (typeof globalThis === 'object') {
	        globalThis.Crossbind = { initNative };
	    }

	    return initNative;
	}

	// A path with no scheme and no leading slash is relative to the page, as `path: './dist'` is. A worker has no
	// page, so the main thread hands it the path resolved.
	var urlPath = {
	    getDefaultPathPrefix: () => '/',
	    finalizePath(output) {
	        if (/^[a-z][a-z\d+.-]*:/i.test(output) || output[0] === '/') {
	            return output;
	        }
	        return new URL(output, document.baseURI).href;
	    },
	};

	/**
	 * @license
	 * Copyright 2019 Google LLC
	 * SPDX-License-Identifier: Apache-2.0
	 */
	const proxyMarker = Symbol("Comlink.proxy");
	const createEndpoint = Symbol("Comlink.endpoint");
	const releaseProxy = Symbol("Comlink.releaseProxy");
	const finalizer = Symbol("Comlink.finalizer");
	const throwMarker = Symbol("Comlink.thrown");
	const isObject = (val) => (typeof val === "object" && val !== null) || typeof val === "function";
	/**
	 * Internal transfer handle to handle objects marked to proxy.
	 */
	const proxyTransferHandler = {
	    canHandle: (val) => isObject(val) && val[proxyMarker],
	    serialize(obj) {
	        const { port1, port2 } = new MessageChannel();
	        expose(obj, port1);
	        return [port2, [port2]];
	    },
	    deserialize(port) {
	        port.start();
	        return wrap(port);
	    },
	};
	/**
	 * Internal transfer handler to handle thrown exceptions.
	 */
	const throwTransferHandler = {
	    canHandle: (value) => isObject(value) && throwMarker in value,
	    serialize({ value }) {
	        let serialized;
	        if (value instanceof Error) {
	            serialized = {
	                isError: true,
	                value: {
	                    message: value.message,
	                    name: value.name,
	                    stack: value.stack,
	                },
	            };
	        }
	        else {
	            serialized = { isError: false, value };
	        }
	        return [serialized, []];
	    },
	    deserialize(serialized) {
	        if (serialized.isError) {
	            throw Object.assign(new Error(serialized.value.message), serialized.value);
	        }
	        throw serialized.value;
	    },
	};
	/**
	 * Allows customizing the serialization of certain values.
	 */
	const transferHandlers = new Map([
	    ["proxy", proxyTransferHandler],
	    ["throw", throwTransferHandler],
	]);
	function isAllowedOrigin(allowedOrigins, origin) {
	    for (const allowedOrigin of allowedOrigins) {
	        if (origin === allowedOrigin || allowedOrigin === "*") {
	            return true;
	        }
	        if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
	            return true;
	        }
	    }
	    return false;
	}
	function expose(obj, ep = globalThis, allowedOrigins = ["*"]) {
	    ep.addEventListener("message", function callback(ev) {
	        if (!ev || !ev.data) {
	            return;
	        }
	        if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
	            console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
	            return;
	        }
	        const { id, type, path } = Object.assign({ path: [] }, ev.data);
	        const argumentList = (ev.data.argumentList || []).map(fromWireValue);
	        let returnValue;
	        try {
	            const parent = path.slice(0, -1).reduce((obj, prop) => obj[prop], obj);
	            const rawValue = path.reduce((obj, prop) => obj[prop], obj);
	            switch (type) {
	                case "GET" /* MessageType.GET */:
	                    {
	                        returnValue = rawValue;
	                    }
	                    break;
	                case "SET" /* MessageType.SET */:
	                    {
	                        parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
	                        returnValue = true;
	                    }
	                    break;
	                case "APPLY" /* MessageType.APPLY */:
	                    {
	                        returnValue = rawValue.apply(parent, argumentList);
	                    }
	                    break;
	                case "CONSTRUCT" /* MessageType.CONSTRUCT */:
	                    {
	                        const value = new rawValue(...argumentList);
	                        returnValue = proxy(value);
	                    }
	                    break;
	                case "ENDPOINT" /* MessageType.ENDPOINT */:
	                    {
	                        const { port1, port2 } = new MessageChannel();
	                        expose(obj, port2);
	                        returnValue = transfer(port1, [port1]);
	                    }
	                    break;
	                case "RELEASE" /* MessageType.RELEASE */:
	                    {
	                        returnValue = undefined;
	                    }
	                    break;
	                default:
	                    return;
	            }
	        }
	        catch (value) {
	            returnValue = { value, [throwMarker]: 0 };
	        }
	        Promise.resolve(returnValue)
	            .catch((value) => {
	            return { value, [throwMarker]: 0 };
	        })
	            .then((returnValue) => {
	            const [wireValue, transferables] = toWireValue(returnValue);
	            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
	            if (type === "RELEASE" /* MessageType.RELEASE */) {
	                // detach and deactive after sending release response above.
	                ep.removeEventListener("message", callback);
	                closeEndPoint(ep);
	                if (finalizer in obj && typeof obj[finalizer] === "function") {
	                    obj[finalizer]();
	                }
	            }
	        })
	            .catch((error) => {
	            // Send Serialization Error To Caller
	            const [wireValue, transferables] = toWireValue({
	                value: new TypeError("Unserializable return value"),
	                [throwMarker]: 0,
	            });
	            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
	        });
	    });
	    if (ep.start) {
	        ep.start();
	    }
	}
	function isMessagePort(endpoint) {
	    return endpoint.constructor.name === "MessagePort";
	}
	function closeEndPoint(endpoint) {
	    if (isMessagePort(endpoint))
	        endpoint.close();
	}
	function wrap(ep, target) {
	    const pendingListeners = new Map();
	    ep.addEventListener("message", function handleMessage(ev) {
	        const { data } = ev;
	        if (!data || !data.id) {
	            return;
	        }
	        const resolver = pendingListeners.get(data.id);
	        if (!resolver) {
	            return;
	        }
	        try {
	            resolver(data);
	        }
	        finally {
	            pendingListeners.delete(data.id);
	        }
	    });
	    return createProxy(ep, pendingListeners, [], target);
	}
	function throwIfProxyReleased(isReleased) {
	    if (isReleased) {
	        throw new Error("Proxy has been released and is not useable");
	    }
	}
	function releaseEndpoint(ep) {
	    return requestResponseMessage(ep, new Map(), {
	        type: "RELEASE" /* MessageType.RELEASE */,
	    }).then(() => {
	        closeEndPoint(ep);
	    });
	}
	const proxyCounter = new WeakMap();
	const proxyFinalizers = "FinalizationRegistry" in globalThis &&
	    new FinalizationRegistry((ep) => {
	        const newCount = (proxyCounter.get(ep) || 0) - 1;
	        proxyCounter.set(ep, newCount);
	        if (newCount === 0) {
	            releaseEndpoint(ep);
	        }
	    });
	function registerProxy(proxy, ep) {
	    const newCount = (proxyCounter.get(ep) || 0) + 1;
	    proxyCounter.set(ep, newCount);
	    if (proxyFinalizers) {
	        proxyFinalizers.register(proxy, ep, proxy);
	    }
	}
	function unregisterProxy(proxy) {
	    if (proxyFinalizers) {
	        proxyFinalizers.unregister(proxy);
	    }
	}
	function createProxy(ep, pendingListeners, path = [], target = function () { }) {
	    let isProxyReleased = false;
	    const proxy = new Proxy(target, {
	        get(_target, prop) {
	            throwIfProxyReleased(isProxyReleased);
	            if (prop === releaseProxy) {
	                return () => {
	                    unregisterProxy(proxy);
	                    releaseEndpoint(ep);
	                    pendingListeners.clear();
	                    isProxyReleased = true;
	                };
	            }
	            if (prop === "then") {
	                if (path.length === 0) {
	                    return { then: () => proxy };
	                }
	                const r = requestResponseMessage(ep, pendingListeners, {
	                    type: "GET" /* MessageType.GET */,
	                    path: path.map((p) => p.toString()),
	                }).then(fromWireValue);
	                return r.then.bind(r);
	            }
	            return createProxy(ep, pendingListeners, [...path, prop]);
	        },
	        set(_target, prop, rawValue) {
	            throwIfProxyReleased(isProxyReleased);
	            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
	            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
	            const [value, transferables] = toWireValue(rawValue);
	            return requestResponseMessage(ep, pendingListeners, {
	                type: "SET" /* MessageType.SET */,
	                path: [...path, prop].map((p) => p.toString()),
	                value,
	            }, transferables).then(fromWireValue);
	        },
	        apply(_target, _thisArg, rawArgumentList) {
	            throwIfProxyReleased(isProxyReleased);
	            const last = path[path.length - 1];
	            if (last === createEndpoint) {
	                return requestResponseMessage(ep, pendingListeners, {
	                    type: "ENDPOINT" /* MessageType.ENDPOINT */,
	                }).then(fromWireValue);
	            }
	            // We just pretend that `bind()` didn’t happen.
	            if (last === "bind") {
	                return createProxy(ep, pendingListeners, path.slice(0, -1));
	            }
	            const [argumentList, transferables] = processArguments(rawArgumentList);
	            return requestResponseMessage(ep, pendingListeners, {
	                type: "APPLY" /* MessageType.APPLY */,
	                path: path.map((p) => p.toString()),
	                argumentList,
	            }, transferables).then(fromWireValue);
	        },
	        construct(_target, rawArgumentList) {
	            throwIfProxyReleased(isProxyReleased);
	            const [argumentList, transferables] = processArguments(rawArgumentList);
	            return requestResponseMessage(ep, pendingListeners, {
	                type: "CONSTRUCT" /* MessageType.CONSTRUCT */,
	                path: path.map((p) => p.toString()),
	                argumentList,
	            }, transferables).then(fromWireValue);
	        },
	    });
	    registerProxy(proxy, ep);
	    return proxy;
	}
	function myFlat(arr) {
	    return Array.prototype.concat.apply([], arr);
	}
	function processArguments(argumentList) {
	    const processed = argumentList.map(toWireValue);
	    return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
	}
	const transferCache = new WeakMap();
	function transfer(obj, transfers) {
	    transferCache.set(obj, transfers);
	    return obj;
	}
	function proxy(obj) {
	    return Object.assign(obj, { [proxyMarker]: true });
	}
	function toWireValue(value) {
	    for (const [name, handler] of transferHandlers) {
	        if (handler.canHandle(value)) {
	            const [serializedValue, transferables] = handler.serialize(value);
	            return [
	                {
	                    type: "HANDLER" /* WireValueType.HANDLER */,
	                    name,
	                    value: serializedValue,
	                },
	                transferables,
	            ];
	        }
	    }
	    return [
	        {
	            type: "RAW" /* WireValueType.RAW */,
	            value,
	        },
	        transferCache.get(value) || [],
	    ];
	}
	function fromWireValue(value) {
	    switch (value.type) {
	        case "HANDLER" /* WireValueType.HANDLER */:
	            return transferHandlers.get(value.name).deserialize(value.value);
	        case "RAW" /* WireValueType.RAW */:
	            return value.value;
	    }
	}
	function requestResponseMessage(ep, pendingListeners, msg, transfers) {
	    return new Promise((resolve) => {
	        const id = generateUUID();
	        pendingListeners.set(id, resolve);
	        if (ep.start) {
	            ep.start();
	        }
	        ep.postMessage(Object.assign({ id }, msg), transfers);
	    });
	}
	function generateUUID() {
	    return new Array(4)
	        .fill(0)
	        .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
	        .join("-");
	}

	/* global WorkerGlobalScope */

	const STATIC_PATHS = {
	    opfs: '/opfs',
	    memfs: '/memfs',
	};

	const isWorkerScope$1 = typeof WorkerGlobalScope !== 'undefined'
	    && typeof self !== 'undefined'
	    && self instanceof WorkerGlobalScope;

	const isBrowserSupportOPFS = typeof navigator !== 'undefined'
	    && navigator.storage
	    && navigator.storage.getDirectory;

	// Presence of the API does not guarantee a working backend: Playwright's WebKit
	// rejects getDirectory() with UnknownError, and storage-restricted contexts
	// reject too. false only after the onModuleReady preflight actually failed.
	let isOpfsFunctional = true;

	var browserFs = {
	    extendModule(m, config) {
	        // Hand the pthread spawn script to the glue via a crossbind-specific key. Using emscripten's
	        // own mainScriptUrlOrBlob aborts emsdk 6 debug builds ("supplied but not included in
	        // INCOMING_MODULE_JS_API") on single-thread targets; a custom key is not validated, and
	        // buildWasm rewrites the pthread bootstrap to read it (falling back to _scriptName).
	        const pthreadScript = config.paths.worker || config.paths.js;
	        if (pthreadScript) {
	            m.crossbindMainScript = m.locateFile(pthreadScript);
	        }

	        m.getDefaultPath = () => STATIC_PATHS[(config.fs?.opfs !== false && isOpfsFunctional) ? 'opfs' : 'memfs'];

	        m.getFinalPath = function getFinalPath(path) {
	            let returnPath = path;
	            if (!path.startsWith('/')) {
	                throw new Error(`Path ${path} does not start with /`);
	            }

	            const opfsConfigured = config.fs?.opfs !== false;

	            let backend;
	            Object.entries(STATIC_PATHS).forEach(([key, value]) => {
	                if (path.startsWith(value)) {
	                    backend = key;
	                }
	            });
	            if (!backend) {
	                throw new Error(`Path ${path} does not start with any of the static paths: ${Object.values(STATIC_PATHS).join(', ')}`);
	            }
	            if (backend === 'opfs' && !opfsConfigured) {
	                throw new Error(`Path ${path} starts with ${STATIC_PATHS.opfs} but OPFS is disabled. Enable fs.opfs in config to mount under ${STATIC_PATHS.opfs}/.`);
	            }
	            if (backend === 'opfs' && !isWorkerScope$1) {
	                throw new Error(`Path ${path} starts with ${STATIC_PATHS.opfs} but OPFS is only available inside a Worker scope. Enable useWorker or mount under ${STATIC_PATHS.memfs}/ instead. Falling back to ${STATIC_PATHS.memfs}/.`);
	            }
	            if (backend === 'opfs' && (!isBrowserSupportOPFS || !isOpfsFunctional)) {
	                console.error(`Path ${path} starts with ${STATIC_PATHS.opfs} but OPFS is not usable in this browser. Falling back to ${STATIC_PATHS.memfs}/.`);
	                returnPath = returnPath.replace(STATIC_PATHS.opfs, STATIC_PATHS.memfs);
	            }

	            return returnPath;
	        };

	        m.getRandomPath = function getRandomPath(startPath = m.getDefaultPath()) {
	            const appName = config.general?.name;
	            const rand = Math.floor(Math.random() * 1000000);
	            const path = m.getFinalPath(`${startPath}/${appName}/automounted/${rand}`);
	            m.FS.mkdirTree(path);
	            return path;
	        };

	        m.autoMountFiles = function autoMountFiles(files, parentPath = null) {
	            return new Promise((resolve, reject) => {
	                if (files.length === 0) {
	                    resolve([]);
	                    return;
	                }

	                const mountPath = parentPath ? m.getFinalPath(parentPath) : m.getRandomPath();
	                m.FS.mkdirTree(mountPath);

	                (async () => {
	                    try {
	                        const paths = [];
	                        for (const f of files) {
	                            const filePath = `${mountPath}/${f.name}`;
	                            const stream = m.FS.open(filePath, 'w');
	                            const reader = f.stream().getReader();
	                            let offset = 0;

	                            while (true) {
	                                const { done, value } = await reader.read();
	                                if (done) break;
	                                m.FS.write(stream, value, 0, value.length, offset);
	                                offset += value.length;
	                            }

	                            m.FS.close(stream);
	                            paths.push(filePath);
	                        }
	                        resolve(paths);
	                    } catch (e) {
	                        reject(e);
	                    }
	                })();
	            });
	        };

	        m.getFileBytes = function getFileBytes(path) {
	            if (!path) return new Uint8Array();
	            return m.FS.readFile(path, { encoding: 'binary' });
	        };

	        m.getFileList = function getFileList(path = m.getDefaultPath()) {
	            const fileList = [];
	            for (const name of m.FS.readdir(path)) {
	                if (name === '.' || name === '..') continue;
	                const fullPath = path === '/' ? `/${name}` : `${path}/${name}`;
	                const stat = m.FS.stat(fullPath);
	                const type = stat.mode & 0o170000;
	                if (type === 0o040000) {
	                    fileList.push(...m.getFileList(fullPath));
	                } else if (type === 0o100000) {
	                    fileList.push({ path: fullPath, size: stat.size });
	                }
	            }
	            return fileList;
	        };

	        m._createVector = function _createVector(className, array = []) {
	            const vector = m.toVector(className, array);
	            return proxy(vector);
	        };
	    },

	    async onModuleReady(m, config) {
	        const appName = config.general?.name;
	        try {
	            m.FS.mkdirTree(`${STATIC_PATHS.memfs}/${appName}/automounted`);
	        } catch (e) {
	            console.error(e);
	        }

	        if (!(isWorkerScope$1 && isBrowserSupportOPFS && config.fs?.opfs !== false && typeof m.crossbind_init_opfs === 'function')) {
	            return;
	        }

	        // crossbind_init_opfs() blocks until the OPFS root opens; if the backend is
	        // broken, that rejection is swallowed inside the WASMFS proxy pthread and
	        // init deadlocks with no signal. Probe the root here first instead.
	        try {
	            await navigator.storage.getDirectory();
	        } catch (error) {
	            isOpfsFunctional = false;
	            console.error(`OPFS is present but not functional in this environment (${error}). Falling back to ${STATIC_PATHS.memfs}/.`);
	            return;
	        }

	        m.crossbind_init_opfs();
	        if (appName) {
	            const appDir = `${STATIC_PATHS.opfs}/${appName}/automounted`;
	            try {
	                m.FS.mkdirTree(appDir);
	            } catch (e) {
	                console.error(e);
	            }
	        }
	    },
	};

	// Follows "crossbind: <name>" when the module a page or app loaded has no such function.
	const UNBOUND_MESSAGE = "is not bound in the native module. A dependency's header binds the functions the app imports by name; after a new import, reload the page or rebuild the app.";

	/* global WorkerGlobalScope */

	const isWorkerScope = typeof WorkerGlobalScope !== 'undefined'
	    && typeof self !== 'undefined'
	    && self instanceof WorkerGlobalScope;

	// === Embind <-> Comlink Bridge ===
	// Worker-side registry: id -> original embind object
	// Main-thread registry: handle -> id
	const embindRegistry = new Map();
	const embindProxyIds = new WeakMap();
	let nextEmbindId = 1;

	// The objects the worker hands out are reached through the module's channel, so writes to them keep their order
	// with the calls after them; messages on different channels keep none.
	const HANDLES = '__crossbindHandles';
	let remoteModule = null;

	// How many ids name each object, as a raw pointer handed out twice is one object.
	const holders = new WeakMap();

	function registerEmbindObject(obj) {
	    const id = nextEmbindId++;
	    embindRegistry.set(id, obj);
	    holders.set(obj, (holders.get(obj) ?? 0) + 1);
	    return id;
	}

	// What JavaScript owns: an object behind a smart pointer, or a copy embind made of a returned value or an object
	// JavaScript constructed, which utils/embindObjectLifetime.js marks. A raw pointer stays its library's.
	const ownsObject = (obj) => {
	    const $$ = obj?.$$;
	    return Boolean($$ && ($$.smartPtr || $$.count?.owned));
	};

	// The module's own objects, its globals above all, live as long as the module, so letting go of a handle to one
	// frees nothing.
	const moduleObjects = new WeakSet();

	const freeIfOwned = (obj) => {
	    if (ownsObject(obj) && !moduleObjects.has(obj) && !obj.isDeleted()) obj.delete();
	};

	// The worker side of a handle the main thread no longer reaches: its id goes, and the object with the last id.
	const RELEASE = '__crossbindRelease';

	function releaseEmbindObjects(ids) {
	    for (const id of ids) {
	        const obj = embindRegistry.get(id);
	        if (!embindRegistry.delete(id)) continue;
	        const left = holders.get(obj) - 1;
	        if (left > 0) {
	            holders.set(obj, left);
	        } else {
	            holders.delete(obj);
	            freeIfOwned(obj);
	        }
	    }
	}

	// Comlink answers every member with a remote one: JSON.stringify and String() called toJSON and Symbol.toPrimitive
	// on the worker's object, which has neither, and a member below the module is thenable. A handle answers them as a
	// direct-mode object does.
	const LOCAL_MEMBERS = {
	    then: undefined,
	    toJSON: () => ({}),
	    [Symbol.toPrimitive]: (hint) => (hint === 'number' ? NaN : '[object Object]'),
	};

	// The main thread side: once a handle is collected, the worker lets go of its object, the ids collected in one task
	// in one message.
	const collected = [];

	function releaseLater(id) {
	    collected.push(id);
	    if (collected.length > 1) return;
	    setTimeout(() => {
	        const ids = collected.splice(0);
	        Promise.resolve(remoteModule?.[RELEASE](ids)).catch(() => {});
	    }, 0);
	}

	const handleWatcher = typeof FinalizationRegistry === 'function' ? new FinalizationRegistry(releaseLater) : null;

	function handleFor(id) {
	    const handle = new Proxy(remoteModule[HANDLES][id], {
	        get: (target, prop) => (Object.hasOwn(LOCAL_MEMBERS, prop) ? LOCAL_MEMBERS[prop] : target[prop]),
	    });
	    embindProxyIds.set(handle, id);
	    handleWatcher?.register(handle, id);
	    return handle;
	}

	// Reorder transfer handlers for correct priority
	const _proxyHandler = transferHandlers.get('proxy');
	const _throwHandler = transferHandlers.get('throw');
	transferHandlers.clear();

	// 1. embindProxy: when a proxied embind object is sent back as an argument,
	//    resolve it to the original object on the worker instead of creating a proxy-of-proxy
	transferHandlers.set('embindProxy', {
	    canHandle(obj) {
	        return embindProxyIds.has(obj);
	    },
	    serialize(obj) {
	        return [embindProxyIds.get(obj), []];
	    },
	    deserialize(id) {
	        return embindRegistry.get(id);
	    },
	});

	// 2. proxy (modified): also registers embind objects created via CONSTRUCT
	transferHandlers.set('proxy', {
	    canHandle: _proxyHandler.canHandle,
	    serialize(obj) {
	        if (typeof obj.delete === 'function' && typeof obj.isDeleted === 'function') {
	            // CONSTRUCT results (Comlink marks them with proxy()) are handed out as
	            // method-returned objects are (embindObject handler), and the registry keeps
	            // the RAW object so arguments resolve back to real embind identities.
	            return [{ __embindId: registerEmbindObject(unwrapCoercionProxy(obj)) }, []];
	        }
	        return _proxyHandler.serialize(obj);
	    },
	    deserialize(data) {
	        if (data != null && typeof data === 'object' && '__embindId' in data) {
	            return handleFor(data.__embindId);
	        }
	        return _proxyHandler.deserialize(data);
	    },
	});

	// 3. throw (extended): comlink's own handler ships only message/name/stack, which drops the
	// properties a binding attaches to an error - `code` above all (Rust's error code, the napi
	// contract). Own enumerable primitives ride along; deserialize assigns them back onto the Error.
	transferHandlers.set('throw', {
	    canHandle: _throwHandler.canHandle,
	    serialize(payload) {
	        const [serialized, transferables] = _throwHandler.serialize(payload);
	        const error = payload && payload.value;
	        if (serialized && serialized.isError && error instanceof Error) {
	            for (const key of Object.keys(error)) {
	                const value = error[key];
	                const kind = typeof value;
	                if (value === null || kind === 'string' || kind === 'number' || kind === 'boolean') {
	                    serialized.value[key] = value;
	                }
	            }
	        }
	        return [serialized, transferables];
	    },
	    deserialize: _throwHandler.deserialize,
	});

	// 4. embindVector: convert embind vectors to arrays across worker boundary
	transferHandlers.set('embindVector', {
	    canHandle(obj) {
	        return obj != null
	            && typeof obj === 'object'
	            && typeof obj.size === 'function'
	            && typeof obj.get === 'function'
	            && typeof obj.delete === 'function';
	    },
	    serialize(obj) {
	        const len = obj.size();
	        const elements = new Array(len);
	        for (let i = 0; i < len; i++) {
	            const elem = obj.get(i);
	            elements[i] = elem !== null && typeof elem === 'object'
	                ? { __comlinkProxy: true, __embindId: registerEmbindObject(elem) }
	                : elem;
	        }
	        // The main thread gets the array alone, so nothing can reach a vector the call handed over any more.
	        freeIfOwned(unwrapCoercionProxy(obj));
	        return [elements, []];
	    },
	    deserialize(elements) {
	        return elements.map((elem) => (elem && typeof elem === 'object' && elem.__comlinkProxy
	            ? handleFor(elem.__embindId)
	            : elem));
	    },
	});

	// 4b. embindEnum: embind enum VALUES are class instances (not structured-cloneable) with
	// singleton identity per enumerator. Worker side registers each instance under an id; the
	// main thread gets a frozen, identity-stable token per id, and a token passed back as an
	// argument resolves to the original instance - so `===` survives both directions.
	const enumValueSet = new WeakSet();
	const enumInstanceIds = new WeakMap();
	const enumInstancesById = new Map();
	const enumTokensById = new Map();
	let nextEnumId = 1;

	// Worker side, at module-ready: collect enum value instances. embind hangs enumerators off
	// the enum TYPE, which is a FUNCTION (plus a `values` meta map), so both function and
	// object holders are walked; a value qualifies when it is an instance (non-Object
	// constructor) carrying a numeric .value and no lifecycle methods - which excludes HEAP
	// views, FS, class statics and config bags.
	function registerModuleEnums(m) {
	    for (const key of Object.keys(m)) {
	        const holder = m[key];
	        if (holder == null || (typeof holder !== 'object' && typeof holder !== 'function')
	            || ArrayBuffer.isView(holder)) continue;
	        for (const v of Object.values(holder)) {
	            if (v != null && typeof v === 'object'
	                && typeof v.value === 'number'
	                && typeof v.delete !== 'function'
	                && v.constructor && v.constructor !== Object) {
	                enumValueSet.add(v);
	            }
	        }
	    }
	}

	transferHandlers.set('embindEnum', {
	    canHandle(obj) {
	        if (obj == null || typeof obj !== 'object') return false;
	        return enumValueSet.has(unwrapCoercionProxy(obj)) || '__embindEnumRef' in obj;
	    },
	    serialize(obj) {
	        const raw = unwrapCoercionProxy(obj);
	        if (enumValueSet.has(raw)) {
	            let id = enumInstanceIds.get(raw);
	            if (!id) {
	                id = nextEnumId;
	                nextEnumId += 1;
	                enumInstanceIds.set(raw, id);
	                enumInstancesById.set(id, raw);
	            }
	            return [{ __embindEnumRef: id, value: raw.value }, []];
	        }
	        return [{ __embindEnumRef: raw.__embindEnumRef, value: raw.value }, []];
	    },
	    deserialize(data) {
	        const real = enumInstancesById.get(data.__embindEnumRef);
	        if (real) return real;
	        let token = enumTokensById.get(data.__embindEnumRef);
	        if (!token) {
	            token = Object.freeze({ __embindEnumRef: data.__embindEnumRef, value: data.value });
	            enumTokensById.set(data.__embindEnumRef, token);
	        }
	        return token;
	    },
	});

	// 5. embindObject: proxy other embind objects (Dataset, etc.)
	transferHandlers.set('embindObject', {
	    canHandle(obj) {
	        return obj != null
	            && typeof obj === 'object'
	            && typeof obj.delete === 'function'
	            && typeof obj.isDeleted === 'function';
	    },
	    serialize(obj) {
	        // An object a property returns comes wrapped by its owner's coercion proxy. Registering the raw object,
	        // as the proxy handler does, keeps objects read from it one wrapper deep, which an argument's unwrapping
	        // undoes.
	        return [{ __embindId: registerEmbindObject(unwrapCoercionProxy(obj)) }, []];
	    },
	    deserialize(data) {
	        return handleFor(data.__embindId);
	    },
	});

	// 6. embindProxyArray: a plain JS array that contains proxied embind objects
	//    can't be structured-cloned across the
	//    worker boundary, because the element proxies are functions. Resolve each
	//    registered proxy element back to its worker-side original, the same way the
	//    embindProxy handler does for a single argument.
	transferHandlers.set('embindProxyArray', {
	    canHandle(obj) {
	        return Array.isArray(obj) && obj.some((e) => embindProxyIds.has(e));
	    },
	    serialize(arr) {
	        return [
	            arr.map((e) => (embindProxyIds.has(e) ? { __embindRef: embindProxyIds.get(e) } : e)),
	            [],
	        ];
	    },
	    deserialize(arr) {
	        return arr.map((e) => (e != null && typeof e === 'object' && '__embindRef' in e
	            ? embindRegistry.get(e.__embindRef)
	            : e));
	    },
	});

	let _worker = null;

	// Configurable, so the coercion wrapper wraps the objects read through it as it does every other member.
	function moduleRoot(m) {
	    Object.defineProperty(m, HANDLES, {
	        value: new Proxy({}, { get: (_, id) => embindRegistry.get(Number(id)) }),
	        configurable: true,
	    });
	    Object.defineProperty(m, RELEASE, { value: releaseEmbindObjects, configurable: true });
	    Object.values(m).forEach((value) => {
	        if (value !== null && typeof value === 'object') moduleObjects.add(value);
	    });
	    return wrapWithVectorCoercion(m);
	}

	function adoptModule(remote) {
	    remoteModule = remote;
	    return remote;
	}

	function resolveScriptUrl(config) {
	    const fileName = config.paths.js || config.paths.worker;
	    let prefix = urlPath.getDefaultPathPrefix();
	    if (config.path) {
	        prefix = config.path;
	        if (prefix.slice(-1) !== '/') prefix += '/';
	    }
	    return urlPath.finalizePath(prefix + fileName);
	}

	function exposeWorker(systemConfig, createModule) {
	    const workerApi = {
	        async init(userConfig = {}) {
	            const config = mergeDeep(systemConfig, userConfig);
	            const m = await createModule(config);
	            setCoercionModule(m);
	            // Decode on the worker side: a real Error (with the C++ message) survives the
	            // comlink throw handler, a raw WebAssembly.Exception does not.
	            patchModuleForExceptionDecode(m);
	            registerModuleEnums(m);
	            return proxy(moduleRoot(m));
	        },
	    };
	    expose(workerApi);
	}

	async function initWithWorker(config, userConfig) {
	    const scriptUrl = config.workerUrl || resolveScriptUrl(config);
	    _worker = new Worker(scriptUrl);
	    const workerApi = wrap(_worker);

	    const {
	        logHandler, errorHandler, onRuntimeInitialized, getWasmFunction, useWorker, workerUrl,
	        ...serializableConfig
	    } = userConfig;
	    // The worker resolves a relative URL against its own script, so it gets the path resolved against the page.
	    const workerConfig = config.path ? { ...serializableConfig, path: urlPath.finalizePath(config.path) } : serializableConfig;
	    return moduleOnMainThread(adoptModule(await workerApi.init(workerConfig)));
	}

	// A call the worker cannot make, because the module lacks the function, fails there with a TypeError from inside comlink
	// that names nothing: the failed call asks for the member, and names it when the module has none.
	function namedCall(member, name, module) {
	    return new Proxy(member, {
	        // A member still needs Comlink's then to read its value (including an absent export).
	        get(target, prop) {
	            // Console formatters inspect function names and constructors synchronously.
	            if (prop === 'name') return name;
	            if (prop === 'constructor') return Function;
	            return prop !== 'then' && Object.hasOwn(LOCAL_MEMBERS, prop) ? LOCAL_MEMBERS[prop] : target[prop];
	        },
	        apply: (call, thisArg, args) => Reflect.apply(call, thisArg, args).catch(async (error) => {
	            const isBound = await Promise.resolve(module[name]).then((value) => value !== undefined, () => true);
	            if (isBound) throw error;
	            throw new Error(`crossbind: ${name} ${UNBOUND_MESSAGE}`);
	        }),
	    });
	}

	function moduleOnMainThread(module) {
	    return new Proxy(module, {
	        get(target, prop) {
	            if (Object.hasOwn(LOCAL_MEMBERS, prop)) return LOCAL_MEMBERS[prop];
	            if (prop === 'constructor') return Object;
	            if (prop === 'toArray') {
	                return function toArray(vector) {
	                    if (Array.isArray(vector)) return vector;
	                    return target.toArray(vector);
	                };
	            }
	            if (prop === 'toVector') {
	                return function toVector(classOrName, array = []) {
	                    if (typeof classOrName === 'string') {
	                        return target._createVector(classOrName, array);
	                    }
	                    return target.toVector(classOrName, array);
	                };
	            }
	            const member = target[prop];
	            return typeof prop === 'string' && typeof member === 'function' ? namedCall(member, prop, target) : member;
	        },
	    });
	}

	function terminate() {
	    if (_worker) {
	        _worker.terminate();
	        _worker = null;
	    }
	}

	var workerComlink = {
	    isWorkerScope,
	    exposeWorker,
	    initWithWorker,
	    terminate,
	};

	const adapter = composeAdapters([urlPath, browserFs]);

	var browser = createInitCrossbind({
	    Module,
	    systemConfig,
	    adapter,
	    worker: workerComlink,
	});

	return browser;

}));
