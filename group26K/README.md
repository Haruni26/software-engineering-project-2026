This version of the project was migrated from CRA to Vite to be more in line with the course material for this semester.  

## 🚀 Quick Start

**Navigate to the project folder:**
    cd Woodland-Conservation-SMB

### Setup and Run
    # 1) Install dependencies
    npm install

    # 2) Run frontend
    npm run dev:frontend

    This will start the frontend dev server (see package.json for the default port).

---


## 🧠 Setup Notes
- The `.gitignore` file already excludes `node_modules`, build files, and `.env`, so your API keys and dependencies won’t be uploaded to GitHub.  
- If you create other sensitive files (like `.env.development` or `.env.production`), make sure they’re listed in `.gitignore` as well.  

## Backend Setup (Docker)

The backend requires:

- Docker

### Steps
- In the projects/Woodland-Conservation-SMB, in the terminal run:
```bash
cd backend
cp .env.example .env
cd ..
```
- In the terminal run:
```bash
docker compose up --build -d
docker compose exec web python manage.py createsuperuser
```

- You will be prompted to enter a username, email, and password. Use these to login to Wagtail.

- You can access the wagtail admin at localhost:8001/cms, and you will be redirected to the login.

- Check /backend/.env for current admin and password information.

## Acknowledgments
Several images on the website have been sourced from:

(1) "Natural History of the French Village Conservation Woodland
A Report to the French Village Conservation Woodland Committee

by David Patriquin, Jess Lewis, Livy Fraser, Liam Holwell, Rohan Kariyawansa.  Nov. 2021"

AND

(2) iNaturalist.org

The images are being used for education exclusively and will be individually cited before the general public views them.


