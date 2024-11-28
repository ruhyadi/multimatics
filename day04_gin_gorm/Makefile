build:
	@go build -o bin/day04_gin_gorm cmd/main.go

swagger:
	@swag init -g cmd/main.go

run: build swagger
	@./bin/day04_gin_gorm