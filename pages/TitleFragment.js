import Head from 'next/head'

const TitleFragment = props => {
    return (
        <div>
            <Head>
                <title>
                    {props.title || "Skylark"}
                </title>
            </Head>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default TitleFragment