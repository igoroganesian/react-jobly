import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";

function RouteList() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Homepage />} />

        {currentUser &&
          <>
            <Route
              path="/companies"
              element={<CompanyList />}
            />
            <Route
              path="/companies/:handle"
              element={<CompanyDetail />}
            />
            <Route
              path="/jobs"
              element={<JobList />}
            />
          </>
        }

        {!currentUser &&
          <>
            <Route path="/login" element={<LoginForm />} />

            <Route path="/signup" element={<SignupForm />} />
          </>
        }

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}


export default RouteList;

