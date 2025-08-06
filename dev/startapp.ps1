# Runs backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run super"

# Runs frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"