# Doctor Tracker - Fullstack Admin Portal

## 1. Elevator Pitch
Doctor Tracker is a secure, full-stack administrative web application designed for healthcare facilities to manage doctors and their patients efficiently. Built with Next.js, Node.js, and MongoDB, it features a robust authentication system, real-time data visualization (charts/graphs), advanced filtering, and a highly responsive, user-friendly interface. The system enables administrators to seamlessly onboard doctors, manage patient records, and gain actionable insights through an interactive dashboard.

## 2. Live Links & Credentials
- **Backend API URL:** [https://doctor-tracker-backend-three.vercel.app/](https://doctor-tracker-backend-three.vercel.app/)
- **Frontend URL:** [https://doctor-tracker-frontend-omega.vercel.app/](https://doctor-tracker-frontend-omega.vercel.app/)
- **Backend GitHub Repo:** [https://github.com/abmrifat1/doctor-tracker-backend](https://github.com/abmrifat1/doctor-tracker-backend)
- **Frontend GitHub Repo:** [https://github.com/abmrifat1/doctor-tracker-frontend](https://github.com/abmrifat1/doctor-tracker-frontend)

**Admin Credentials:**
- Email: `admin@doctor.com`
- Password: `admin123`

## 3. Setup Guide (Local Installation)

### Prerequisites
- Node.js (v20 or higher)

### Backend Setup
1. Clone the backend repository:
   ```bash
   git clone https://github.com/abmrifat1/doctor-tracker-backend
   cd doctor-tracker-backend
   ```
   
2. Install dependencies:
   ```bash
   npm install
   ```
  
3. Create a .env file from the .env.example file:
    ```bash
    cp .env.example .env
    ```

4. Update the .env file with your `MONGO_URI` and `JWT_SECRET`
   
5. Run the seeder to create the admin user:
    ```bash
    npm run seed
    ```

6. Start the backend server:
    ```bash
    npm run dev


## 4. System Architecture
The application follows a decoupled Client-Server architecture:

- Client (Frontend): Next.js (App Router) with Redux Toolkit for state management. It uses Axios for API communication and Recharts for data visualization.

- Server (Backend): Node.js and Express.js. It handles authentication via JWT, routes requests, and enforces validation using Express-Validator.

- Database: MongoDB Atlas (Cloud) or Local MongoDB. Mongoose is used as an ODM to define schemas, create indexes, and manage relationships.

- Data Flow: The Client sends an HTTP request with a JWT Bearer token -> The Express Server validates the token -> The server queries MongoDB -> Aggregated data is returned as JSON -> Redux updates the state -> UI re-renders.

## 5. Technical Decisions
  1: Why Redux Toolkit over Context API?
  - Reason: The application requires managing multiple states (auth, doctors list, patients list, dashboard stats). Redux Toolkit provides a centralized store with predictable state updates. It significantly reduces unnecessary re-renders compared to the Context API, especially when dealing with complex filtering and pagination on the Doctors and Patients lists.


  2: Why use createdAt for Date-Wise Filtering?
  - Reason: Since the current scope does not include an appointment scheduling module, the "date-wise filtering" requirement was interpreted as filtering by the record's creation date (createdAt). This allows the admin to track when a doctor or patient was registered in the system within a specific timeframe. Compound indexes were added to the Mongoose schema to optimize these date-based queries.

## 6. Visual Evidence (Screenshots)
### Desktop View

<img width="1459" height="1011" alt="Screenshot from 2026-10-30 15-17-15" src="https://github.com/user-attachments/assets/8bdcfcba-2dff-4514-9138-ebebc599084d" />
<img width="1413" height="929" alt="Screenshot from 2026-10-30 15-37-30" src="https://github.com/user-attachments/assets/74feff82-33a5-40ef-acf8-14bd36b67fdc" />
<img width="1415" height="934" alt="Screenshot from 2026-10-30 15-38-18" src="https://github.com/user-attachments/assets/ce0ff85e-8dc6-41e4-a3cc-a6b84ab069b2" />
<img width="1408" height="932" alt="Screenshot from 2026-10-30 15-38-29" src="https://github.com/user-attachments/assets/eb312ea0-0f25-4e41-b945-ed75e81aa989" />
<img width="1412" height="934" alt="Screenshot from 2026-10-30 15-38-43" src="https://github.com/user-attachments/assets/2f12aaa6-b876-457e-a8fe-a28ab6b4b7ed" />
<img width="1410" height="935" alt="Screenshot from 2026-10-30 15-39-05" src="https://github.com/user-attachments/assets/6be5838f-361a-444a-9055-1e61e1526424" />
<img width="1408" height="932" alt="Screenshot from 2026-10-30 15-41-10" src="https://github.com/user-attachments/assets/28157b4c-20a9-47d0-bcf0-82a8c7493458" />
<img width="1408" height="930" alt="Screenshot from 2026-10-30 15-41-29" src="https://github.com/user-attachments/assets/c5865815-de8f-4fc9-8c3e-8c2b304147a5" />
<img width="1405" height="935" alt="Screenshot from 2026-10-30 15-41-55" src="https://github.com/user-attachments/assets/e9476a87-4abb-4069-bf67-f1764d4d9a7f" />
<img width="1412" height="933" alt="Screenshot from 2026-10-30 15-42-07" src="https://github.com/user-attachments/assets/11d724c6-32ca-4d50-af45-45741b8c5fac" />

### Mobile View
<img width="361" height="747" alt="Screenshot from 2026-10-30 15-19-20" src="https://github.com/user-attachments/assets/71db5875-4008-4ef6-a89f-7497f6442be1" />
<img width="361" height="744" alt="Screenshot from 2026-10-30 15-37-59" src="https://github.com/user-attachments/assets/3b55b596-f131-4452-a910-38e127d713f9" />
<img width="361" height="740" alt="Screenshot from 2026-10-30 15-40-29" src="https://github.com/user-attachments/assets/67abc52b-4e35-4514-ba8d-5e3e27bb27fd" />
<img width="363" height="741" alt="Screenshot from 2026-10-30 15-39-40" src="https://github.com/user-attachments/assets/3aaf6332-0ada-4dc5-8457-d312970fdf0a" />
<img width="360" height="743" alt="Screenshot from 2026-10-30 15-39-25" src="https://github.com/user-attachments/assets/cd92364e-88ea-41d3-898e-b42c4e92f258" />
<img width="360" height="737" alt="Screenshot from 2026-10-30 15-55-04" src="https://github.com/user-attachments/assets/ebc21ee9-d2b2-46b2-b902-bbed3159d6ff" />
<img width="362" height="739" alt="Screenshot from 2026-10-30 15-43-38" src="https://github.com/user-attachments/assets/85c232f3-ff95-40a3-ba3f-0b675a424966" />
<img width="362" height="743" alt="Screenshot from 2026-10-30 15-43-24" src="https://github.com/user-attachments/assets/9232e099-b6c6-44f3-9ffe-b41595efbae6" />
<img width="363" height="745" alt="Screenshot from 2026-10-30 15-43-12" src="https://github.com/user-attachments/assets/735fb895-2269-4699-8ed3-52c3de89eb76" />
<img width="363" height="744" alt="Screenshot from 2026-10-30 15-43-00" src="https://github.com/user-attachments/assets/29bc695e-ecd1-47dc-a8e9-c419f5974422" />












