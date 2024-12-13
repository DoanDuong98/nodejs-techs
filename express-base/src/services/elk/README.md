- Elastic Search: distributed, chuyên để lưu, search và phân tích data
- Logstash: là 1 cái data processing pipeline, chuyên nhận data từ nhiều nguồn, transform sau đó gửi nó đi - thường là tới Elasticsearch
- Kibana: là tool chuyên để visualize data trên web UI
- Filebeat thì là một thanh niên shipper, chuyên đi ship log, đẩy đi các nơi, trong bài này là đẩy sang Logstash

## FLOW:
    -> User truy cập app NodeJS 
    
    -> Ghi ra log file 
            
    -> mount log file vào Filebeat 
                
    -> đẩy log qua Logstash, xử lý log chút 
                    
    -> đẩy tiếp qua Elastic 
    
    -> từ Kibana truy vấn vào Elastic lấy data và hiển thị lên UI