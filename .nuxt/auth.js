import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { RefreshScheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/login",
    "logout": "/",
    "home": "/",
    "callback": "/login"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": {
    "prefix": "auth."
  },
  "defaultStrategy": "user"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // user
  $auth.registerStrategy('user', new RefreshScheme($auth, {
  "token": {
    "property": "token",
    "required": true,
    "type": "Bearer",
    "maxAge": 1800
  },
  "refreshToken": {
    "property": "token",
    "data": "token",
    "type": "Bearer",
    "maxAge": 1800
  },
  "endpoints": {
    "login": {
      "url": "http://localhost:8080/api/auth/login",
      "method": "post"
    },
    "refresh": {
      "url": "http://localhost:8080/api/auth/login",
      "method": "post"
    },
    "logout": {
      "url": "http://localhost:8080/api/auth/logout",
      "method": "post"
    },
    "user": {
      "url": "http://localhost:8080/api/auth/profile",
      "method": "get",
      "propertyName": false,
      "property": false,
      "autoFetch": false
    }
  },
  "autoLogout": true,
  "name": "user"
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
