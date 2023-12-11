import Head from "next/head"

const d = () => {
    
    return (
        <>
            {
                process.env.NODE_ENV === "production" && process.browser ?
                    <Head>
                        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-193122312-1"></script>
                        <script
                            async
                            dangerouslySetInnerHTML={{
                                __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());

                gtag("config", "UA-193122312-1");`
                            }}
                        />
                    </Head> : null
            }
        </>
    )
}
export default d;