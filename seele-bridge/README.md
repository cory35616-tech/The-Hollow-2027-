# The Hollow — Seele AI bridge

Small Node.js API service that connects The Hollow's GitHub repository to the Seele Public API. It keeps the Seele API key on the server; never put the key in browser code or commit it.

## Railway setup

1. Deploy this repository to the Railway project **The Hollow - Seele AI**.
2. Set the service variable `SEELE_API_KEY` in Railway using an API key created in the Seele developer console.
3. Generate a public domain in Railway.
4. Check `GET /health`; it reports whether the key is configured, never the key itself.

## API

- `GET /health`
- `POST /api/seele/jobs` with JSON `{"prompt":"...","model":"Seele02-flash","engine":"unreal"}`
- `GET /api/seele/jobs/{job_id}`

The Unreal engine option requires an eligible Seele subscription. Generated artifact download URLs may also depend on the Seele API plan. The service forwards Seele's HTTP status and JSON response.

## Local run

```bash
cd seele-bridge
SEELE_API_KEY=your_key node server.js
```
