# Base go image
FROM golang:1.24-alpine as builder

RUN mkdir /app
copy . /app

# Set the destination for COPY.
WORKDIR /app


# Download Go modules.
#COPY go.mod go.sum ./
#RUN go mod dowloaded

#Copy the source code.
#COPY *.go ./

#Build
RUN CGO_ENABLED=0 go build -o brokerApp ./cmd/api/*.go

#RUN chmod +x /app/brockerApp

# Build a tiny docker image
FROM alpine:latest

RUN mkdir /app

COPY --from=builder /app/brokerApp /app

CMD [ "/app/brokerApp" ]
