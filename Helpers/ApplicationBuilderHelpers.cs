using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SPA.Service.Helpers
{
    public static class ApplicationBuilderExtensions
    {
        /// <summary>
        /// workaround bug  The SPA default page middleware could not return the default page '/index.html'
        /// because it was not found, and no other middleware handled the request.
        /// </summary>
        /// <param name="builder"></param>
        public static IApplicationBuilder UseRootRewrite(this IApplicationBuilder builder)
        {
            var excludeUrls = new PathString[] { "/Beacon", "/Image", "/News", "/Places", "/Selfieup" };

            builder.Use((context, next) =>
            {
                if (context.Request.Method != HttpMethod.Get.Method &&
                    !excludeUrls.Any(a => context.Request.Path.StartsWithSegments(a, StringComparison.InvariantCultureIgnoreCase)))
                {
                    context.Request.Method = HttpMethod.Get.Method;
                }

                return next();
            });

            return builder;
        }
    }
}