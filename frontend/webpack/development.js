module.exports = {
    devServer: {
        static: "./public",
        port: 3000,
        open: true,
        historyApiFallback: true,
        hot: true,
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            { test: /\.scss$/, use: ["style-loader", "css-loader"] },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75,
                            },
                        },
                    },
                ],
            },
        ],
        // rules: [
        //     {
        //         test: /\.(s(a|c)ss|css)$/,
        //         exclude: /\.module.(s(a|c)ss)$/,
        //         loader: "scss-loader",
        //         // {
        //         //     loader: "sass-loader",
        //         //     options: {
        //         //         sourceMap: true,
        //         //     },
        //         // },
        //     },
        // ],
    },
};
