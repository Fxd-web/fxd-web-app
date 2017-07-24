# v-qrcode

A QRCode Component For Vue 2

## demo

[demo](https://atwxp.github.io/v-qrcode/dist)

## Install

    $ npm i v-qrcode --save

## Usage

### ES6

    <template>
        <div>
            <qrcode :cls="qrCls" :value="qrText"></qrcode>
        </div>
    </template>

    <script>
    import Qrcode from 'v-qrcode'

    export default {
        data () {
            return {
                qrCls: 'qrcode',

                qrText: 'hello world'
            }
        },

        components: {
            Qrcode
        }
    }
    </script>

### Browser Globals

The dist folder contains `v-qrcode.js` and `v-qrcode.min.js` with all components exported in the `window.VQrcode` object.

    <script src="path/to/vue.js"></script>
    <script src="path/to/v-qrcode.min.js"></script>
    <script>
        var qrcode = VQrcode.qrcode;
    </script>

## Options

prop      | type                 | default value | desc
----------| -------------------- | ------------- | -----
`value`   | `string`             | `""`          | the string to generate QR Code
`cls`     | `string`             | `""`          | the classname of wrapper
`size`    | `number`             | `100`         | size of qrcode
`level`   | `string`             | `"L"`         | level of qrcode (`L, Q, M, H`)
`background` | `string`          | `"#fff"`      | background color
`foreground` | `string`          | `"#000"`      | foreground color
`mime` | `string`                | `"image/png"` | the mime type of image
`padding` | `number`             | `0`           | the padding between qrcode and wrapper
`type`    | `string`             | `"canvas"`    | the output type can be either `canvas` or `image`

