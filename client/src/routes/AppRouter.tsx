import { Route, Routes } from "react-router-dom";

import { AdminLayout } from "../app/layouts/AdminLayout";
import { AuthLayout } from "../app/layouts/AuthLayout";
import { PublicLayout } from "../app/layouts/PublicLayout";
import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
import { AdminEquipmentPage } from "../pages/admin/AdminEquipmentPage";
import { AdminOrdersPage } from "../pages/admin/AdminOrdersPage";
import { AdminReportsPage } from "../pages/admin/AdminReportsPage";
import { AdminReviewsPage } from "../pages/admin/AdminReviewsPage";
import { AdminUsersPage } from "../pages/admin/AdminUsersPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { CheckoutPage } from "../pages/client/CheckoutPage";
import { FavoritesPage } from "../pages/client/FavoritesPage";
import { MyOrdersPage } from "../pages/client/MyOrdersPage";
import { OrderDetailPage } from "../pages/client/OrderDetailPage";
import { ProfilePage } from "../pages/client/ProfilePage";
import { ReportsPage } from "../pages/client/ReportsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { CatalogPage } from "../pages/public/CatalogPage";
import { EquipmentDetailPage } from "../pages/public/EquipmentDetailPage";
import { HomePage } from "../pages/public/HomePage";
import { AdminRoute } from "./AdminRoute";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/equipment/:slug" element={<EquipmentDetailPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/equipment" element={<AdminEquipmentPage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
        </Route>
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
