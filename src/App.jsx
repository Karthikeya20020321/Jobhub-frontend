import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateCompany from "./pages/CreateCompany";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateJob from "./pages/CreateJob";
import MyCompanies from "./pages/MyCompanies";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import ViewApplicants from "./pages/ViewApplicants";
import MyApplications from "./pages/MyApplications";
import EditCompany from "./pages/EditCompany";
import CandidateDashboard from "./pages/CandidateDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminJobs from "./pages/AdminJob";
import AdminApplications from "./pages/AdminApplications";
import AIJobGenerator from "./pages/AIJobGenerator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/recruiter"
  element={
    <ProtectedRoute>
      <RecruiterDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/create-company"
  element={
    <ProtectedRoute role="recruiter">
      <CreateCompany />
    </ProtectedRoute>
  }
/>        
<Route
  path="/create-job"
  element={
    <ProtectedRoute role="recruiter">
      <CreateJob />
    </ProtectedRoute>
  }
/> 
<Route
  path="/my-companies"
  element={
    <ProtectedRoute role="recruiter">
      <MyCompanies />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-jobs"
  element={
    <ProtectedRoute role="recruiter">
      <MyJobs />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-job/:id"
  element={
    <ProtectedRoute role="recruiter">
      <EditJob />
    </ProtectedRoute>
  }
/>
<Route
  path="/applicants/:jobId"
  element={
    <ProtectedRoute role="recruiter">
      <ViewApplicants />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-applications"
  element={
    <ProtectedRoute>
      <MyApplications />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-company/:id"
  element={
    <ProtectedRoute role="recruiter">
      <EditCompany />
    </ProtectedRoute>
  }
/>
<Route
  path="/candidate"
  element={
    <ProtectedRoute role="candidate">
      <CandidateDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/users"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminUsers />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/jobs"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminJobs />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/applications"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminApplications />
    </ProtectedRoute>
  }
/>
<Route
  path="/recruiter/ai-job-generator"
  element={<AIJobGenerator />}
 />
      </Routes>  
    </BrowserRouter>
  );
}


export default App;