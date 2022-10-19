module.exports = {
    devServer: {
        static: "./public",
        port: 3000,
        open: true,
    },
    devtool: "inline-source-map",
    module: {
        rules: [{ test: /\.scss$/, use: ["style-loader", "css-loader"] }],
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
