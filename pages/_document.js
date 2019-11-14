import React from 'react';
import Document, {
    Head,
    Main,
    NextScript
} from 'next/document';
import {
    flush
} from 'next-style-loader/applyStyles';
import { ServerStyleSheet } from 'styled-components'


export default class MyDocument extends Document {




    render() {
        // const {
        //     nextStyle
        // } = this.props;


        // console.log(this.props, 'thisthis###');
        return (
            <html>
                <Head>
                    {/* {nextStyle.tag}   */}
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
                    <link rel="manifest" href="/static/manifest.json" />
                    <link rel="stylesheet" href="/static/antd.css" />
                    <link href="/static/nprogress.min.css" rel="stylesheet" />
                    {/* <link rel="apple-touch-icon" href="/static/.png"/> */}

                    <link rel="apple-touch-icon" sizes="57x57" href="/static/images/ios_icons/icon-57x57.png" />

                    <link rel="apple-touch-icon" sizes="72x72" href="/static/images/ios_icons/icon-72x72.png" />

                    <link rel="apple-touch-icon" sizes="114x114" href="/static/images/ios_icons/icon-114x114.png" />

                    <link rel="apple-touch-icon" sizes="144x144" href="/static/images/ios_icons/icon-144x144.png" />


                    {/* <link rel="stylesheet" href="/static/demo.css" /> */}
                    {this.props.styleTags}
                </Head>
                <body>

                    <Main />
                    <NextScript />

                </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = function (ctx) {



    // console.log(ctx, 'ctx');
    const props = Document.getInitialProps(ctx);

    // console.log(props);

    props.nextStyle = flush();

    // console.log(2222222223);
    // return props;


    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }



    // const sheet = new ServerStyleSheet();
    // // 1.这里采用react里High Order Component的方式，可以重新包装APP和所有渲染的组件
    // const originalRenderPage = ctx.renderPage;


    // try{
    //     ctx.renderPage = () =>
    //         originalRenderPage({
    //             enhanceApp: App => (props) => 
    //                 // App挂载样式
    //                 sheet.collectStyles(<App {...props} />)
    //         })
    //     // 因为覆盖了Document，所以要重新返回页面的props
    //     const props = await Document.getInitialProps(ctx)
    //     return {
    //         ...props,
    //         styles: <>{props.styles}{sheet.getStyleElement()}</>
    //     }
    // }finally{
    //     sheet.seal()
    // }     
};