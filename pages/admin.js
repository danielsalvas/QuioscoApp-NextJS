import AdminLayout from "@/layout/AdminLayout";

const Admin = () => {
  return (
    <AdminLayout page={"Admin"}>
      <h1 className="text-4xl font-black md:text-left text-center">Administration Panel</h1>
      <p className="text-2xl my-10">Manage your orders:</p>
    </AdminLayout>
  );
};

export default Admin;
