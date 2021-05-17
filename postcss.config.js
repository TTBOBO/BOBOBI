// const pxtorem = require('postcss-pxtorem')
// const autoprefixer = require('autoprefixer')

// module.exports = ({ file }) => {
//     let rootValue
//     if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
//         rootValue = 75
//     } else {
//         rootValue = 37.5
//     }
//     return {
//         plugins: [
//             autoprefixer(),
//             pxtorem({
//                 rootValue: rootValue,
//                 propList: ['*'],
//                 minPixelValue: 2
//             })
//         ]
//     }
// }


module.exports = {
        "plugins": {
            "autoprefixer": {},
            "postcss-px2rem-exclude": {
                "remUnit": 75,
                "exclude": /node_modules|vant/i
            }
        }
    }
    // const pxtorem = require('postcss-pxtorem')
    // const autoprefixer = require('autoprefixer')

// module.exports = ({ file }) => {
//     let rootValue
//     if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
//         rootValue = 75
//     } else {
//         rootValue = 37.5
//     }
//     return {
//         plugins: {
//             autoprefixer:{}(),
//             pxtorem({
//                 rootValue: rootValue,
//                 propList: ['*'],
//                 minPixelValue: 2
//             })
//         }
//     }
// }

// "postcss-px2rem": "^0.3.0",