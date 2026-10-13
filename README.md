# 🛡️ SafeSpeak: Anonymous School Safety & Early-Warning Platform

> **SafeSpeak** is a kid-friendly, anonymous reporting web application built to bridge the gap between student anonymity and professional counselor triage. It empowers students (ages 8–16) to report incidents like cyberbullying, AI impersonation, and harmful content without fear, while giving school counselors a structured dashboard to act quickly.

---

## ✨ Key Features

### 👧 1. Student Reporting Portal (Zero Friction)
* **Cute & Low-Stress UI:** Designed with soft pastel themes, playful rounded typography, and large visual category buttons to reduce anxiety and fear.
* **100% Anonymous:** No sign-up, email, or personal details required to submit a report.
* **Teacher Selection & Privacy Routing:** Students can send reports to **"Fastest Available Counselor"** (visible to all staff) or specifically lock reports to **"Mr. Alexis (Private)"** or **"Mr. Botto (Private)"**.
* **Unblurred Evidence Upload:** Easy drag-and-drop screenshot upload ensuring counselors receive crisp, clear evidence to read handles, messages, and timestamps.
* **Secret Safe Key:** Generates a unique 1-click access token (e.g., `SAFE-FRIEND-88`) allowing students to log back in anonymously and chat 2-way with counselors.

### 🏫 2. Counselor & Staff Triage Dashboard
* **Multi-Teacher Authentication:** Separate login credentials for staff members with individual Staff ID reset keys:
  * **Mr. Alexis:** `Username: Mr. Alexis` | `Passcode: staff_124` | `Staff ID: STAFF-9901`
  * **Mr. Botto:** `Username: Mr. Botto` | `Passcode: staff_123` | `Staff ID: STAFF-9902`
* **Role-Based Access Control (RBAC):** Reports addressed specifically to another counselor show up as **🔒 Locked (Assigned to [Teacher])** to preserve student confidentiality.
* **Direct Incident Category Triage:** Filter and sort incoming complaints directly by category, time, and resolution status.
* **One-Click Counselor Responses:** Pre-built supportive template replies to acknowledge student reports instantly.
* **Password Management:** Integrated Staff ID verification system allowing counselors to update their credentials securely.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/), Lucide Icons
* **Database & Backend:** [Supabase](https://supabase.com/) (PostgreSQL for report persistence and 2-way messaging threads)
* **Development Tools:** `v0.dev` (Frontend Prototype), Cursor AI

---

## 🚀 Getting Started Locally

Follow these steps to set up SafeSpeak locally on your machine.

### Prerequisites
* Node.js v18.x or higher
* npm, pnpm, or yarn

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/safespeak.git](https://github.com/YOUR_USERNAME/safespeak.git)
cd safespeak
2. Install DependenciesBashnpm install
3. Configure Environment VariablesCreate a .env.local file in the root directory and add your credentials:Code snippet# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL="[https://your-supabase-project.supabase.co](https://your-supabase-project.supabase.co)"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
4. Run the Development ServerBashnpm run dev
Open http://localhost:3000 in your browser to test the app!🔒 Test Credentials for CounselorsTeacher NameUsernameDefault PasswordStaff ID Code (Password Reset)Mr. AlexisMr. Alexisstaff_124STAFF-9901Mr. BottoMr. Bottostaff_123STAFF-9902📄 LicenseThis project was built for hackathon demonstration purposes. Feel free to fork and adapt it for educational safety initiatives!
