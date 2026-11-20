import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoutes({
  pages,
  auth,
  setAuth,
  orders,
  setOrders,
  submissions,
  setSubmissions,
  quiz,
  setQuiz,
  reviews,
  setReviews,
  wrapGuest,
  wrapStudent,
}) {
  return (
    <Routes>
      <Route path="/" element={wrapGuest(<pages.GuestHome />)} />
      <Route path="/catalogue" element={wrapGuest(<pages.Catalog guest />)} />
      <Route
        path="/register"
        element={wrapGuest(
          <pages.LoginRegister mode="register" onLogin={setAuth} />,
        )}
      />
      <Route
        path="/login"
        element={wrapGuest(
          <pages.LoginRegister mode="login" onLogin={setAuth} />,
        )}
      />

      <Route
        path="/student"
        element={wrapStudent(
          <pages.Dashboard user={auth} orders={orders} />,
        )}
      />
      <Route
        path="/student/courses"
        element={wrapStudent(<pages.Catalog guest={false} />)}
      />
      <Route
        path="/student/courses/:id"
        element={wrapStudent(
          <pages.CourseDetail reviews={reviews} setReviews={setReviews} />,
        )}
      />
      <Route path="/student/learning" element={wrapStudent(<pages.Learning />)} />
      <Route
        path="/student/assignments"
        element={wrapStudent(
          <pages.Assignments
            submissions={submissions}
            setSubmissions={setSubmissions}
          />,
        )}
      />
      <Route
        path="/student/assignments/:id"
        element={wrapStudent(
          <pages.AssignmentDetail
            submissions={submissions}
            setSubmissions={setSubmissions}
          />,
        )}
      />
      <Route
        path="/student/assignments/confirmation/:id"
        element={wrapStudent(<pages.Submitted />)}
      />
      <Route
        path="/student/quiz"
        element={wrapStudent(<pages.Quiz onResult={setQuiz} result={quiz} />)}
      />
      <Route
        path="/student/recommendations"
        element={wrapStudent(<pages.Recommendations quiz={quiz} />)}
      />
      <Route
        path="/student/leaderboards"
        element={wrapStudent(<pages.Leaderboards />)}
      />
      <Route
        path="/student/leaderboards/:id"
        element={wrapStudent(<pages.Leaderboard />)}
      />
      <Route
        path="/student/review/:id"
        element={wrapStudent(
          <pages.Review reviews={reviews} setReviews={setReviews} />,
        )}
      />
      <Route path="/student/code" element={wrapStudent(<pages.CodeStudio />)} />
      <Route path="/student/circuit" element={wrapStudent(<pages.Circuit />)} />
      <Route path="/student/live" element={wrapStudent(<pages.Live />)} />
      <Route path="/student/videos" element={wrapStudent(<pages.Videos />)} />
      <Route path="/student/store" element={wrapStudent(<pages.Store />)} />
      <Route
        path="/student/checkout/:id"
        element={wrapStudent(
          <pages.Checkout orders={orders} setOrders={setOrders} />,
        )}
      />
      <Route
        path="/student/orders"
        element={wrapStudent(<pages.Orders orders={orders} />)}
      />
      <Route
        path="/student/notifications"
        element={wrapStudent(<pages.Notifications />)}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
