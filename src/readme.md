# browser output

# HELP http_requests_total total number of HTTP request
# TYPE http_requests_total counter
http_requests_total{method="GET",route="/metrics",status_code="200"} 1
http_requests_total{method="GET",route="/users",status_code="200"} 1
http_requests_total{method="GET",route="/users",status_code="304"} 5
http_requests_total{method="GET",route="/",status_code="404"} 2
http_requests_total{method="GET",route="/chat",status_code="404"} 1
http_requests_total{method="GET",route="/cpu",status_code="304"} 2