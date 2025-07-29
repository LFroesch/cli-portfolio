# Run both API and frontend in development
dev:
	npx concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
