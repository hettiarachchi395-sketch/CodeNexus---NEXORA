
 import { Navigate, useNavigate } from "react-router-dom";
 import { usePersist } from "./app/storage.js";
 import AppRoutes from "./app/AppRoutes.jsx";
 import Layout from "./components/Layout.jsx";
 import { INITIAL_ORDERS } from "./data/appData.js";
 import GuestHome from "./pages/GuestHome.jsx";
 import Catalog from "./pages/Catalog.jsx";
 import LoginRegister from "./pages/LoginRegister.jsx";
 import CourseDetail from "./pages/CourseDetail.jsx";
 import Dashboard from "./pages/Dashboard.jsx";
 import Learning from "./pages/Learning.jsx";
 import Assignments from "./pages/Assignments.jsx";
 import AssignmentDetail from "./pages/AssignmentDetail.jsx";
 import Submitted from "./pages/Submitted.jsx";
 import Quiz from "./pages/Quiz.jsx";
 import Recommendations from "./pages/Recommendations.jsx";
 import Leaderboards, { Leaderboard } from "./pages/Leaderboards.jsx";
 import Review from "./pages/Review.jsx";
 import CodeStudio from "./pages/CodeStudio.jsx";
 import Circuit from "./pages/Circuit.jsx";
 import Live from "./pages/Live.jsx";
 import Videos from "./pages/Videos.jsx";
 import Store from "./pages/Store.jsx";
 import Checkout from "./pages/Checkout.jsx";
 import Orders from "./pages/Orders.jsx";
 import Notifications from "./pages/Notifications.jsx";
 
 const pages = {
   GuestHome,
   Catalog,
   LoginRegister,
   CourseDetail,
   Dashboard,
   Learning,
   Assignments,
   AssignmentDetail,
   Submitted,
   Quiz,
   Recommendations,
   Leaderboards,
   Leaderboard,
   Review,
   CodeStudio,
   Circuit,
   Live,
   Videos,
   Store,
   Checkout,
   Orders,
   Notifications,
 };
 
 export default function App() {
   const [auth, setAuth] = usePersist("nexora-demo-auth", null);
   const [orders, setOrders] = usePersist("nexora-demo-orders", INITIAL_ORDERS);
   const [submissions, setSubmissions] = usePersist(
     "nexora-demo-submissions",
     {},
   );
   const [quiz, setQuiz] = usePersist("nexora-demo-quiz", null);
   const [reviews, setReviews] = usePersist("nexora-demo-reviews", {});
   const navigate = useNavigate();
 
   const logout = () => {
     setAuth(null);
     navigate("/");
   };
 
   const wrapGuest = (page) => <Layout student={false}>{page}</Layout>;
   const wrapStudent = (page) =>
     auth ? (
       <Layout student onLogout={logout}>
         {page}
       </Layout>
     ) : (
       <Navigate to="/login" replace />
     );
 
   return (
     <AppRoutes
       pages={pages}
       auth={auth}
       setAuth={setAuth}
       orders={orders}
       setOrders={setOrders}
       submissions={submissions}
       setSubmissions={setSubmissions}
       quiz={quiz}
       setQuiz={setQuiz}
       reviews={reviews}
       setReviews={setReviews}
       wrapGuest={wrapGuest}
       wrapStudent={wrapStudent}
     />
   );
 }
