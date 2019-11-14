#[no_mangle]
pub extern "C" fn is_prime(n: i32) -> bool {
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