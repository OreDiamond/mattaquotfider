package middlewares

import (
	"fmt"
	"strings"

	"github.com/getfider/fider/app/pkg/env"
	"github.com/getfider/fider/app/pkg/web"
)

var (
	cspBase    = "base-uri 'self'"
	cspDefault = "default-src 'self'"
	cspStyle   = "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'"
	cspScript  = "script-src 'self' 'nonce-%[1]s' https://cdn.polyfill.io https://js.stripe.com https://www.google-analytics.com https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js 'unsafe-hashes' 'sha256-EbyVhJEaB535F/oyiHMhvPjOd8eW+0+ZB6DQHna8USU=' %[2]s 'unsafe-inline'"
	cspFont    = "font-src 'self' https://fonts.gstatic.com data: %[2]s"
	cspImage   = "img-src 'self' https: data: %[2]s"
	cspObject  = "object-src 'none'"
	cspFrame   = "frame-src 'self' https://js.stripe.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com"
	cspMedia   = "media-src 'none'"
	cspConnect = "connect-src 'self' https://www.google-analytics.com https://ipinfo.io https://js.stripe.com https://pagead2.googlesyndication.com/getconfig/sodar %[2]s"

	//CspPolicyTemplate is the template used to generate the policy
	CspPolicyTemplate = fmt.Sprintf("%s; %s; %s; %s; %s; %s; %s; %s; %s; %s", cspBase, cspDefault, cspStyle, cspScript, cspImage, cspFont, cspObject, cspMedia, cspConnect, cspFrame)
)

// Secure adds web security related Http Headers to response
func Secure() web.MiddlewareFunc {
	return func(next web.HandlerFunc) web.HandlerFunc {
		return func(c *web.Context) error {
			cdnHost := env.Config.CDN.Host
			if cdnHost != "" && !env.IsSingleHostMode() {
				cdnHost = "*." + cdnHost
			}
			csp := fmt.Sprintf(CspPolicyTemplate, c.ContextID(), cdnHost)

			c.Response.Header().Set("Content-Security-Policy", strings.TrimSpace(csp))
			c.Response.Header().Set("X-XSS-Protection", "1; mode=block")
			c.Response.Header().Set("X-Content-Type-Options", "nosniff")
			c.Response.Header().Set("Referrer-Policy", "no-referrer-when-downgrade")
			return next(c)
		}
	}
}
