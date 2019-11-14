# Javascript Native Tests

A simple set of tests that calculates the n-th prime to provide a comparison between JavaScript, pure native code (Rust) and native functions called from within JavaScript (N-API & WebAssembly).

* This is the accompying code to thecoderover post: [JavaScipt performance with native code](https://www.thecoderover.com/2019/11/javascript-performance-with-native-code/) *

## Download

```
git clone git@github.com:thecoderover/javascript_native_functions.git
cd javascript_native_test
```

## Native test

*This assumes that Rust has been installed.*

```
cd rustprimes
cargo run --release
```

## Javascript tests
This assumes that NodeJS, NPM & GYP are all correctly installed.

### Preparation
```
cd jsprimes
npm install node-gyp --save-dev
npm install node-addon-api
rustup target add wasm32-unknown-unknown
cargo install --git https://github.com/alexcrichton/wasm-gc 
```
### Building
```
npm install
rustc --target wasm32-unknown-unknown -O --crate-type=cdylib prime.rs -o prime.big.wasm
wasm-gc prime.big.wasm prime.wasm
```

### Running
```
node ./index.js
```

## References
* [Rust installation](https://www.rust-lang.org/tools/install)
* [NodeJS N-API Addons](https://nodejs.org/api/n-api.html)
* [Rust and WebAssembly](https://rustwasm.github.io/docs/book/)
* [Hello Rust](https://www.hellorust.com/demos/add/index.html)

## License
MIT
