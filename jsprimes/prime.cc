#include <node_api.h>

napi_value IsPrimeInt32Func(napi_env env, napi_callback_info info) {
    int n = 0;
    size_t argc = 1;
    napi_value argv[1];

    napi_status status = napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
    if(status != napi_ok) {
        napi_throw_error(env, NULL, "Problem parsing arguments");
    }

    status = napi_get_value_int32(env, argv[0], &n);
    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Invalid argument");
    }
    
    int isPrime = 1;
	if (n <= 1) {
	    isPrime = 0;
    } else {
        for (int j = 2; (j * j) <= n; j++) {
            if ((n % j) == 0) {
                isPrime = 0;
                break;
            }
        }
    }
    napi_value result;
    status = napi_create_int32(env, isPrime, &result);

    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Unable to create return value");
    }
    return result;
}


napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;
    napi_status status = napi_create_function(env, NULL, 0, IsPrimeInt32Func, NULL, &fn);
    if(status != napi_ok) {
        napi_throw_error(env, NULL, "Problem wrapping native function");
    }

    status = napi_set_named_property(env, exports, "isPrime32", fn);
    if(status != napi_ok) {
        napi_throw_error(env, NULL, "Problem populating exports");
    }

    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)