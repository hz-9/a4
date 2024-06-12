# A4Stack Service Dic

pkg-build -c .pkg-build.json

docker build -t service-dic:0.0.0 . --platform=linux/amd64

docker run -p 16100:16100 service-dic:0.0.0
