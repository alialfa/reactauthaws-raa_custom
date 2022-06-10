import React from "react";

const Routes = (props) => {
  return (
    <div className="app">
      <BrowserRouter>
        {/* <p>/////// {user.username}</p> */}
        {/* <Navbar route={route} hLogout={hLogout} /> */}
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/" element={<Landing />} />
          <Route
            path="users"
            element={
              <ProtectedRoute user={user}>
                {/* <ProtectedRoute> */}
                <In user={user} />
                {/* <Users /> */}
                {/* <Students user={user} /> */}
              </ProtectedRoute>
            }
          ></Route>
          {/* <Route path="users" element={<Users />}>
          <Route path="student" element={<Students />} />
          <Route path="teacher" element={<Teachers />} />
        </Route> */}
          <Route path="test" element={<TestPage />} />
          <Route path="auth" element={<AuthenticatorLR />} />
          <Route path="auth-fail" element={<Out />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
