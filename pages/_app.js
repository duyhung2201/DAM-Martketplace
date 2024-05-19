import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider
            initializeOnMount
            appId='xxxx'
            serverUrl='xxxx'
        >
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp
