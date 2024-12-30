- Elastic Search: distributed, chuyên để lưu, search và phân tích data
- Logstash: là 1 cái data processing pipeline, chuyên nhận data từ nhiều nguồn, transform sau đó gửi nó đi - thường là tới Elasticsearch
- Kibana: là tool chuyên để visualize data trên web UI
- Filebeat thì là một thanh niên shipper, chuyên đi ship log, đẩy đi các nơi, trong bài này là đẩy sang Logstash

## FLOW:
    -> User truy cập app NodeJS 
    
    -> Ghi ra log file 
            
    -> mount log file vào Filebeat 
                
    -> đẩy log qua Logstash, xử lý log 
                    
    -> đẩy tiếp qua Elastic 
    
    -> từ Kibana truy vấn vào Elastic lấy data và hiển thị lên UI

## Logstash

Logstash là một công cụ mã nguồn mở thu thập dữ liệu có khả năng liên hợp theo thời gian thực. Logstash có thể hợp nhất dữ liệu từ các nguồn khác nhau và chuẩn hóa dữ liệu ở phần xử lý tiếp theo. Loại bỏ và đồng hóa tất cả dữ liệu đó trong một số use case cần phân tích và thể hiện trên biểu đồ.

Logstash có 3 thành phần chính cũng chính là 3 bước xử lý chính của logstash đó là:

1. **INPUT**: Nó có thể lấy đầu vào từ TCP/UDP, các file, từ syslog, Microsoft Windows EventLogs, STDIN và từ nhiều nguồn khác. Chúng ta có thể lấy log từ các ứng dụng trên môi trường của chúng ta rồi đẩy chúng tới Logstash. Chúng ta sử dụng Input để lấy dữ liệu vào Logstash. Một số đầu vào thường được sử dụng là: 
   - File : đọc từ một tệp trên hệ thống, giống như lệnh UNIX tail -0F
   - Syslog : nghe trên cổng 514 nổi tiếng cho các thông báo nhật ký hệ thống và phân tích cú pháp theo định dạng RFC3164.
   - Redis : đọc từ máy chủ redis, sử dụng cả kênh redis và danh sách redis. Redis thường được sử dụng như một “broker” trong một mô hình Logstash tập trung, có hàng đợi các sự kiện Logstash từ các “shippers” từ xa.
   - Beats : xử lý các sự kiện do beats gửi.
2. **FILTER**: Khi những log này tới Server Logstash, có một số lượng lớn các bộ lọc mà cho phép ta có thể chỉnh sửa và chuyển đổi những event này. Ta có thể lấy ra các thông tin mà ta cần từ những event log. Filter là thiết bị xử lý trung gian trong đường dẫn Logstash. Chúng ta có thể kết hợp các bộ lọc với các điều kiện để thực hiện một hành động trên một sự kiện nếu nó đáp ứng các tiêu chí nhất định. Một số bộ lọc hữu ích bao gồm :
   - Grok : phân tích cú pháp và cấu trúc văn bản tùy ý - chỉnh sửa định dạng log từ client gửi về. Grok hiện là cách tốt nhất trong Logstash để phân tích cú pháp dữ liệu nhật ký không được cấu trúc thành một thứ có cấu trúc và có thể truy vấn được. Với 120 mẫu được tích hợp sẵn trong Logstash, nhiều khả năng chúng ta sẽ tìm thấy một mẫu đáp ứng nhu cầu của mình.
   - Mutate : thực hiện các phép biến đổi chung trên các trường sự kiện. Bạn có thể đổi tên, xóa, thay thế và sửa đổi các trường trong sự kiện của mình.
   - Drop : xóa hoàn toàn sự kiện, ví dụ: debug events.
   - Clone : tạo bản sao của sự kiện, có thể thêm hoặc xóa các trường.
   - Geoip : thêm thông tin về vị trí địa lý của địa chỉ IP (cũng hiển thị biểu đồ tuyệt vời trong Kibana).
3. **OUTPUT**: Khi xuất dữ liệu ra, Logstash hỗ trợ rất nhiều các đích tới bao gồm TCP/UDP, email, các file, HTTP, Nagios và số lượng lớn các dịch vụ mạng. Ta có thể tích hợp Logstash với các công cụ tính toán số liệu (metric), các công cụ cảnh báo, các dạng biểu đồ, các công nghệ lưu trữ hay ta có thể xây dựng một công cụ trong môi trường làm việc của chúng ta.

