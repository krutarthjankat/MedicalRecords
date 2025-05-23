# MedicalRecords

MedicalRecords is a web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. Its primary purpose is to facilitate the real-time maintenance and management of patient health records, ensuring secure and efficient access for healthcare professionals. This system enhances hospital efficiency, reduces paperwork, and allows seamless patient data management.

## Features

- **Real-time Updates:** Ensures that patient health records are updated instantaneously across the system.
- **User Authentication:** Secure login system for healthcare professionals to access and manage records.
- **Patient Management:** Add, update, and view patient information efficiently.
- **Medical History Tracking:** Maintains a detailed history of patient visits, diagnoses, and prescriptions.
- **Role-Based Access Control:** Restricts access based on user roles such as doctors, nurses, and administrators.
- **Multi-device Accessibility:** The system is optimized for desktops, tablets, and mobile devices.

## Technologies Used

MedicalRecords is built using modern web development technologies:

### **Frontend:**
- React.js
- Axios for API requests and handling responses efficiently.

### **Backend:**
- Node.js with Express.js framework for building REST APIs.
- JSON Web Token (JWT) for secure authentication and authorization.

### **Database:**
- MongoDB as the primary database to store patient records, authentication data, and appointment details.

## Installation

To set up the MedicalRecords application locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/krutarthjankat/MedicalRecords.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd MedicalRecords
   ```

3. **Install Dependencies:**
   - **For the Server:**
     ```bash
     cd server
     npm install
     ```
   - **For the Frontend:**
     ```bash
     cd ../frontend
     npm install
     ```

4. **Set Up Environment Variables:**
   - Create a `.env` file in the `server` directory with the following content:
     ```
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     TOKEN_KEY=your_jwt_secret
     ```

5. **Start the Application:**
   - **Run the Server:**
     ```bash
     cd ../server
     npm start
     ```
   - **Run the Frontend:**
     ```bash
     cd ../frontend
     npm start
     ```

The application should now be running locally. Access it via your browser at `http://localhost:3000`.

## Usage

- **Dashboard:** Upon logging in, users are presented with a dashboard displaying an overview of patient records and system statistics.
- **Add Patient:** Use the "Add Patient" feature to input new patient information into the system.
- **View Records:** Select a patient to view detailed health records, including medical history and treatment plans.
- **Edit Records:** Update existing patient information as needed to ensure records remain current.
- **Schedule Appointments:** Allows users to book and manage appointments efficiently.
- **Manage Prescriptions:** Doctors can generate and store prescriptions for patients.
- **Billing & Invoicing:** Generate invoices and track patient payments.
- **Notifications:** Alerts for upcoming appointments and medication reminders.
- **Data Security:** Ensures compliance with HIPAA (Health Insurance Portability and Accountability Act) for data privacy.

## Future Enhancements

Some planned improvements for future releases include:

- **AI-powered Health Analytics:** Predictive analytics for patient health trends.
- **Voice-to-Text Notes:** Allow doctors to dictate notes directly into patient records.
- **Telemedicine Integration:** Enable virtual consultations with patients.