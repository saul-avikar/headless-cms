const checkPermissions = require("feathers-permissions");

/* This hook checks if the user has the right to modify permissions and removes the field if not */

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		if (context.data) { // only on services "create", "update" and "patch"
			return checkPermissions({
				roles: ["permissions"] // super admins already have acces, admins need this arrtibute
			})(context).then(() => {
				return context.app.get(context.params.user.permissions).then(role => {
					if (
						role &&
						(role.permissions.includes("*") || role.permissions.includes("super_admin"))
					) {
						// Dont prevent anything because the super admin can do what he wants
					} else if (role) {
						// Admin...
						context.data.permissions = null;

					} else {
						// Couldn't find the role...
						context.data.permissions = null;
					}

					return context;
				});
			}).catch(() => {
				// Make sure they are not trying to update permssions (mongoose won't update a null object)
				context.data.permissions = null;

				return context;
			});
		}
	};
};

/*
{ data: { find: '{}' },
  params:
   { query: {},
     route: {},
     provider: 'rest',
     headers:
      { host: 'localhost:3030',
        'user-agent': 'curl/7.47.0',
        'content-type': 'application/json',
        'content-length': '14' } },
  type: 'before',
  service:
   { Model:
      { [Function: model]
        hooks: [Kareem],
        base: [Mongoose],
        modelName: 'users',
        model: [Function: model],
        db: [NativeConnection],
        discriminators: undefined,
        '$appliedMethods': true,
        '$appliedHooks': true,
        schema: [Schema],
        collection: [NativeCollection],
        Query: [Function],
        '$__insertMany': [Function],
        '$init': [Promise],
        '$caught': true },
     discriminatorKey: '__t',
     discriminators: {},
     id: '_id',
     paginate: { default: 10, max: 50 },
     lean: true,
     overwrite: true,
     events: [],
     find: [Function: newMethod],
     get: [Function: newMethod],
     create: [Function: newMethod],
     update: [Function: newMethod],
     patch: [Function: newMethod],
     remove: [Function: newMethod],
     hooks: [Function: hooks],
     _events: undefined,
     _eventsCount: 0,
     _maxListeners: undefined,
     setMaxListeners: [Function: setMaxListeners],
     getMaxListeners: [Function: getMaxListeners],
     emit: [Function: emit],
     addListener: [Function: addListener],
     on: [Function: addListener],
     prependListener: [Function: prependListener],
     once: [Function: once],
     prependOnceListener: [Function: prependOnceListener],
     removeListener: [Function: removeListener],
     removeAllListeners: [Function: removeAllListeners],
     listeners: [Function: listeners],
     rawListeners: [Function: rawListeners],
     listenerCount: [Function: listenerCount],
     eventNames: [Function: eventNames],
     _super: undefined },
  app:
   { [EventEmitter: app]
     _events: { mount: [Function: onmount] },
     _eventsCount: 1,
     _maxListeners: undefined,
     setMaxListeners: [Function: setMaxListeners],
     getMaxListeners: [Function: getMaxListeners],
     emit: [Function: emit],
     addListener: [Function: addListener],
     on: [Function: addListener],
     prependListener: [Function: prependListener],
     once: [Function: once],
     prependOnceListener: [Function: prependOnceListener],
     removeListener: [Function: removeListener],
     removeAllListeners: [Function: removeAllListeners],
     listeners: [Function: listeners],
     rawListeners: [Function: rawListeners],
     listenerCount: [Function: listenerCount],
     eventNames: [Function: eventNames],
     init: [Function: init],
     defaultConfiguration: [Function: defaultConfiguration],
     lazyrouter: [Function: lazyrouter],
     handle: [Function: handle],
     use: [Function: newMethod],
     route: [Function: route],
     engine: [Function: engine],
     param: [Function: param],
     set: [Function: set],
     path: [Function: path],
     enabled: [Function: enabled],
     disabled: [Function: disabled],
     enable: [Function: enable],
     disable: [Function: disable],
     acl: [Function],
     bind: [Function],
     checkout: [Function],
     connect: [Function],
     copy: [Function],
     delete: [Function],
     get: [Function],
     head: [Function],
     link: [Function],
     lock: [Function],
     'm-search': [Function],
     merge: [Function],
     mkactivity: [Function],
     mkcalendar: [Function],
     mkcol: [Function],
     move: [Function],
     notify: [Function],
     options: [Function],
     patch: [Function],
     post: [Function],
     propfind: [Function],
     proppatch: [Function],
     purge: [Function],
     put: [Function],
     rebind: [Function],
     report: [Function],
     search: [Function],
     source: [Function],
     subscribe: [Function],
     trace: [Function],
     unbind: [Function],
     unlink: [Function],
     unlock: [Function],
     unsubscribe: [Function],
     all: [Function: all],
     del: [Function],
     render: [Function: render],
     listen: [Function: newMethod],
     request: IncomingMessage { app: [Circular] },
     response: ServerResponse { app: [Circular] },
     cache: {},
     engines: {},
     settings:
      { 'x-powered-by': true,
        etag: 'weak',
        'etag fn': [Function: generateETag],
        env: 'development',
        'query parser': 'extended',
        'query parser fn': [Function: parseExtendedQueryString],
        'subdomain offset': 2,
        'trust proxy': false,
        'trust proxy fn': [Function: trustNone],
        view: [Function: View],
        views: '/media/Data/Programming/Projects/headless-cms/views',
        'jsonp callback name': 'callback',
        host: 'localhost',
        port: 3030,
        public: '/media/Data/Programming/Projects/headless-cms/public',
        paginate: [Object],
        mongodb: 'mongodb://localhost:27017/headless_cms',
        authentication: [Object],
        mongooseClient: [Mongoose],
        auth: [Object] },
     locals: { settings: [Object] },
     mountpath: '/',
     configure: [Function: configure],
     service: [Function: service],
     setup: [Function],
     version: '3.1.7',
     methods: [ 'find', 'get', 'create', 'update', 'patch', 'remove' ],
     mixins: [ [Function: hookMixin], [Function: eventMixin] ],
     services:
      { authentication: [Object],
        'services/users': [Object],
        'services/permissions': [Object] },
     providers: [ [Function] ],
     _setup: false,
     hookTypes: [ 'before', 'after', 'error', 'finally' ],
     hooks: [Function: hooks],
     eventMappings:
      { create: 'created',
        update: 'updated',
        remove: 'removed',
        patch: 'patched' },
     _super: undefined,
     _router:
      { [Function: router]
        params: {},
        _params: [],
        caseSensitive: false,
        mergeParams: undefined,
        strict: false,
        stack: [Array] },
     rest:
      { find: [Function],
        get: [Function],
        create: [Function],
        update: [Function],
        patch: [Function],
        remove: [Function] },
     passport:
      Authenticator {
        _key: 'passport',
        _strategies: [Object],
        _serializers: [],
        _deserializers: [],
        _infoTransformers: [],
        _framework: [Object],
        _userProperty: 'user',
        _sm: [SessionManager],
        Authenticator: [Function: Authenticator],
        Passport: [Function: Authenticator],
        Strategy: [Function],
        strategies: [Object],
        _feathers: [Object],
        createJWT: [Function: createJWT],
        verifyJWT: [Function: verifyJWT],
        options: [Function] },
     authenticate: [Function: bound ],
     _isSetup: true },
  method: 'create',
  path: 'services/users' }
{ params: {},
  type: 'before',
  service:
   { Model:
      { [Function: model]
        hooks: [Kareem],
        base: [Mongoose],
        modelName: 'users',
        model: [Function: model],
        db: [NativeConnection],
        discriminators: undefined,
        '$appliedMethods': true,
        '$appliedHooks': true,
        schema: [Schema],
        collection: [NativeCollection],
        Query: [Function],
        '$__insertMany': [Function],
        '$init': [Promise],
        '$caught': true },
     discriminatorKey: '__t',
     discriminators: {},
     id: '_id',
     paginate: { default: 10, max: 50 },
     lean: true,
     overwrite: true,
     events: [],
     find: [Function: newMethod],
     get: [Function: newMethod],
     create: [Function: newMethod],
     update: [Function: newMethod],
     patch: [Function: newMethod],
     remove: [Function: newMethod],
     hooks: [Function: hooks],
     _events: undefined,
     _eventsCount: 0,
     _maxListeners: undefined,
     setMaxListeners: [Function: setMaxListeners],
     getMaxListeners: [Function: getMaxListeners],
     emit: [Function: emit],
     addListener: [Function: addListener],
     on: [Function: addListener],
     prependListener: [Function: prependListener],
     once: [Function: once],
     prependOnceListener: [Function: prependOnceListener],
     removeListener: [Function: removeListener],
     removeAllListeners: [Function: removeAllListeners],
     listeners: [Function: listeners],
     rawListeners: [Function: rawListeners],
     listenerCount: [Function: listenerCount],
     eventNames: [Function: eventNames],
     _super: undefined },
  app:
   { [EventEmitter: app]
     _events: { mount: [Function: onmount] },
     _eventsCount: 1,
     _maxListeners: undefined,
     setMaxListeners: [Function: setMaxListeners],
     getMaxListeners: [Function: getMaxListeners],
     emit: [Function: emit],
     addListener: [Function: addListener],
     on: [Function: addListener],
     prependListener: [Function: prependListener],
     once: [Function: once],
     prependOnceListener: [Function: prependOnceListener],
     removeListener: [Function: removeListener],
     removeAllListeners: [Function: removeAllListeners],
     listeners: [Function: listeners],
     rawListeners: [Function: rawListeners],
     listenerCount: [Function: listenerCount],
     eventNames: [Function: eventNames],
     init: [Function: init],
     defaultConfiguration: [Function: defaultConfiguration],
     lazyrouter: [Function: lazyrouter],
     handle: [Function: handle],
     use: [Function: newMethod],
     route: [Function: route],
     engine: [Function: engine],
     param: [Function: param],
     set: [Function: set],
     path: [Function: path],
     enabled: [Function: enabled],
     disabled: [Function: disabled],
     enable: [Function: enable],
     disable: [Function: disable],
     acl: [Function],
     bind: [Function],
     checkout: [Function],
     connect: [Function],
     copy: [Function],
     delete: [Function],
     get: [Function],
     head: [Function],
     link: [Function],
     lock: [Function],
     'm-search': [Function],
     merge: [Function],
     mkactivity: [Function],
     mkcalendar: [Function],
     mkcol: [Function],
     move: [Function],
     notify: [Function],
     options: [Function],
     patch: [Function],
     post: [Function],
     propfind: [Function],
     proppatch: [Function],
     purge: [Function],
     put: [Function],
     rebind: [Function],
     report: [Function],
     search: [Function],
     source: [Function],
     subscribe: [Function],
     trace: [Function],
     unbind: [Function],
     unlink: [Function],
     unlock: [Function],
     unsubscribe: [Function],
     all: [Function: all],
     del: [Function],
     render: [Function: render],
     listen: [Function: newMethod],
     request: IncomingMessage { app: [Circular] },
     response: ServerResponse { app: [Circular] },
     cache: {},
     engines: {},
     settings:
      { 'x-powered-by': true,
        etag: 'weak',
        'etag fn': [Function: generateETag],
        env: 'development',
        'query parser': 'extended',
        'query parser fn': [Function: parseExtendedQueryString],
        'subdomain offset': 2,
        'trust proxy': false,
        'trust proxy fn': [Function: trustNone],
        view: [Function: View],
        views: '/media/Data/Programming/Projects/headless-cms/views',
        'jsonp callback name': 'callback',
        host: 'localhost',
        port: 3030,
        public: '/media/Data/Programming/Projects/headless-cms/public',
        paginate: [Object],
        mongodb: 'mongodb://localhost:27017/headless_cms',
        authentication: [Object],
        mongooseClient: [Mongoose],
        auth: [Object] },
     locals: { settings: [Object] },
     mountpath: '/',
     configure: [Function: configure],
     service: [Function: service],
     setup: [Function],
     version: '3.1.7',
     methods: [ 'find', 'get', 'create', 'update', 'patch', 'remove' ],
     mixins: [ [Function: hookMixin], [Function: eventMixin] ],
     services:
      { authentication: [Object],
        'services/users': [Object],
        'services/permissions': [Object] },
     providers: [ [Function] ],
     _setup: false,
     hookTypes: [ 'before', 'after', 'error', 'finally' ],
     hooks: [Function: hooks],
     eventMappings:
      { create: 'created',
        update: 'updated',
        remove: 'removed',
        patch: 'patched' },
     _super: undefined,
     _router:
      { [Function: router]
        params: {},
        _params: [],
        caseSensitive: false,
        mergeParams: undefined,
        strict: false,
        stack: [Array] },
     rest:
      { find: [Function],
        get: [Function],
        create: [Function],
        update: [Function],
        patch: [Function],
        remove: [Function] },
     passport:
      Authenticator {
        _key: 'passport',
        _strategies: [Object],
        _serializers: [],
        _deserializers: [],
        _infoTransformers: [],
        _framework: [Object],
        _userProperty: 'user',
        _sm: [SessionManager],
        Authenticator: [Function: Authenticator],
        Passport: [Function: Authenticator],
        Strategy: [Function],
        strategies: [Object],
        _feathers: [Object],
        createJWT: [Function: createJWT],
        verifyJWT: [Function: verifyJWT],
        options: [Function] },
     authenticate: [Function: bound ],
     _isSetup: true },
  method: 'find',
  path: 'services/users' }

*/
