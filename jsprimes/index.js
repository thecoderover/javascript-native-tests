/**
 *  jsprimes
 *  Copyright(c) 2019 thecoderover
 *  MIT Licensed
 *  Version 0.1.0: Nov 2019
 */
var UPDATES = 20;
var FIND_PRIMES = 2000000;

const addon = require('./build/Release/prime');
const fs = require('fs');

const {
    performance
} = require('perf_hooks');

// JavaScript version for determining if a number is prime
function isPrimeJS(n) {
    if(n <= 1) {
        return false;
    }
    var j = 2;
    while(j * j <= n) {
        if (n % j === 0)
            return false;
        j++;
    }
    return true;
}    

// Run a standard JS test, allowing for different core functions
function runTest(primeFn, message) {
    console.log(message);
    var start = performance.now();
    var count = 0;
    var updateRollover = FIND_PRIMES / UPDATES;
    var j = 0|0;
    while(count <= FIND_PRIMES) {
        if(primeFn(j)) {
            count++;
            if((count % updateRollover) == 0) {
                console.log(j + ', ' + count + ', ' + ((performance.now() - start)|0) + 'mS');
            }
        }
        j++;
    }
    console.log('');
};

// Run a webassembly test; without too much thought other than to get it working
function runWebassembly(fileName, fnName, message, done) {
    var source = fs.readFileSync(fileName);
    const env = {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({
            initial: 256
        }),
        table: new WebAssembly.Table({
            initial: 0,
            element: 'anyfunc'
        })
    }
    var typedArray = new Uint8Array(source);
    WebAssembly.instantiate(typedArray, {
        env: env
    }).then(result => {
        runTest(result.instance.exports[fnName], message);
        if(done) {
            done();
        }
    }).catch(e => {
        // error caught
        console.log(e);
    });
}

//
// Run the 3 tests
//

// Run with a C++ N-API prime test
if(addon && addon.isPrime32) {
    runTest(addon.isPrime32, 'Starting N-API prime test');
}

// Run the pure JavaScript prime test (this is the base level of speed)
runTest(isPrimeJS, 'Starting pure JS prime test');

// Run with a Rust webassembly prime test
runWebassembly('./prime.wasm', 'is_prime', 'Starting webassembly rust prime test');
