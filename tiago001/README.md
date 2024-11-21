# Golang REST API Tutorial

This is a simple REST API tutorial using Golang by Tiago. See the full tutorial at [youtube](https://www.youtube.com/watch?v=7VLmLOiQ3ck&t=4115s).

## Troubleshooting

### Migrate Not Found

If you have an error like `migrate: command not found`, you need to install the migrate CLI. You can do this by running the following command:

```bash
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
```

