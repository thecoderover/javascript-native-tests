//
//  rustprimes
//  Copyright(c) 2019 thecoderover
//  MIT Licensed
//  Version 0.1.0: Nov 2019
//
fn is_prime(n: i32) -> bool {
    let mut result = true;
    if n <= 1 {
        result = false;
    };
    let mut j: i32 = 2;
    while j * j <= n {
        if n % j == 0 {
			result = false;
            break;
        }
        j += 1;
    };
    result
}

fn main() {
    let updates = 20;
    let num_primes = 2000000;

    use std::time::Instant;
    let now = Instant::now();
    let mut count: i32 = 0;
    let update_rollover = num_primes / updates;
    let mut j: i32 = 0;
    while count <= num_primes {
        if is_prime(j) {
            count += 1;
            if count % update_rollover == 0 {
                let elapsed = now.elapsed();
                let sec = (elapsed.as_secs() as f64) + (elapsed.subsec_nanos() as f64 / 1000_000_000.0);
                println!("{}, {}, {} mS", j, count, sec * 1000.0);
            }
        }
        j += 1;
    }
}