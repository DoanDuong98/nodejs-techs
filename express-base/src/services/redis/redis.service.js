'use strict'

const { getRedis } = require("../../dbs/init.redis");

const { instance: client } = getRedis();

/*
* PRACTICE
* */

// BASIC

client.send_command('GET someKey')
/*
    String
    - cmd
        GET key
        SET key value
        EXISTS key
*/

/*
    Hash
    - one key - many value
    - CMD: f
        HSET name key value
        HGET name key
        HMSET name key1 vakue1 key2 value2
        HMGET name key1 key2
        HDEL name key
        HLEN name
        HEXISTS name key
        HINCRBY name key number
        HKEYS name
        HVALS name
        HGETALL name
    - using:
        Cart
*/

/*
    List
    - cmd:
        LPUSH name key1 key2 key3 ... // left push
        LRANGE name start stop // like slice js
        RPUSH ...
        LPOP name stop // delete number_ele first left
        RPOP ...
        BLOP name timeout
        LINDEX name index
        LLEN name
        LREM name index1 index2
        LTRIM name start stop
        LSET name index new_value
        LINSERT name BEFORE|AFTER ele value
     - using for queue, stack,..
        MQ: đảm bảo thứ tự, duplicate,
*/

/*
    Sets
    lưu không trùng lặp giá trị
    không theo thứ tự cố định
    - cmd:
        SADD name val1 val2 val3 ...
        SMEMBERS name // show
        SREM name val // remove val
        SCARD name // length
        SISMEMBER name val // check exists
        SRANDMEMBER name count
        SPOP name count
        SMOVE src des val
        SINTER key1 key2
    - using:
        like post
        suggestion
        tìm bạn, sản phẩm chung
*/

/*
    Zset
    tập hợp có thứ tự
    - cmd:
        ZADD name val1 key1 ...
        ZREVRANGE name start stop WITHSCORES // sort by value
        ZRANGE name start stop
        ZREM name key
        ZINCRBY name val key
        ZRANGEBYSCORE name prev after
    - using
        bảng xếp hạng ...
*/

// Transaction
/*
* Watch
* Multi: đánh dấu
* Exec: thực thi
* Discard:
* */

client
    .multi()
    .set("foo", "bar")
    .get("foo")
    .exec((err, results) => {
        // results === [[null, 'OK'], [null, 'bar']]
    });

// Redis – 3 vấn đề LỚN có thể mất việc khi sử dụng cache


// 1. Sự cố tuyết lở trong Cache (cache avalanche)
/*
* Đặt thời gian hết hạn đồng đều
* Khóa Mutex
* Chiến lược cache kép
* Cập nhật bộ nhớ cache trong background.
* */

// 2. Sự cố sụp đổ (cache breakdown)
/*
* Nếu exp time => set cache without expire time
* set lại exp cache => cronjob at 00:00
* Mutex => req1 -> lock, req2 ...
*
* */

// 3. Sự cố xâm nhập cache (cache penetration)
/*
* Nếu record không tồn tại trong dbs => set null -> redis
* Validate query => disable req or set null
* */

// Triển khai khoá phân tán (Optimistic và Pessimistic)
/*
* Optimistic: dùng cho trường hợp các request đến hầu hết sẽ update resource
* Pessimistic: dùng cho trường hợp các request đến có cả Update lẫn Get dữ liệu và chủ yếu là Get
* Optimisic lock sẽ block để compare version, nếu X lock trước Y, nhưng Y lại xử lý xong trước -> X update fail -> X retry

=> Optimistic lock: áp dụng khi có xác suất conflict transaction thấp, -> giảm retry.
=> Pessimistic lock: áp dụng khi có xác suất conflict transaction cao để đảm bảo data consistence.
* */




