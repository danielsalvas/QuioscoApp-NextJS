import useSWR from "swr";
import axios from "axios";
import Order from "@/components/order";
import AdminLayout from "@/layout/AdminLayout";

const Admin = () => {
  const fetcher = () => axios('/api/orders').then((data) => data.data);
  const { data } = useSWR("/api/orders", fetcher, {refreshInterval: 100});

  return (
    <AdminLayout page={"Admin"}>
      <h1 className="text-4xl font-black md:text-left text-center">
        Admin Panel
      </h1>
      <p className="text-2xl my-10">Manage your orders:</p>

      {data && data.length ? data.map( orderState => (
        <Order key={orderState.id} orderState={orderState} />
      )) : (
        <p>There aren't pending orders</p>
      ) }
    </AdminLayout>
  );
};

export default Admin;
