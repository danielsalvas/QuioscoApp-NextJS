import Image from "next/image";
import axios from "axios";
import { moneyFormat } from "@/helpers";
import Swal from 'sweetalert2'

const Order = ({ orderState }) => {
  const { id, name, total, order } = orderState;

  const completeOrder = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b8132',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, complete order!'
    }).then(async (result) => {
      if (result.isConfirmed) { 
        try {
          const data = await axios.post(`api/orders/${id}`)
          console.log(data);
        } catch (error) {
          console.log(error);
        }

        Swal.fire(
          'Completed!',
          'Your Order has been Completed.',
          'success'
        )
      }
    })
  }
  return (
    <div className="border p-5 space-y-5">
      <h1 className="text-2xl font-bold">Order: {id}</h1>
      <p className="text-lg font-bold">Customer: {name}</p>

      <div>
        {order.map((menuItem) => (
          <div
            key={menuItem.id}
            className="py-3 flex border-b last-of-type:border-0 items-center"
          >
            <div className="w-32">
              <Image
                src={`/assets/img/${menuItem.image}.jpg`}
                width={400}
                height={500}
                alt="Menu Image"
              />
            </div>

            <div className="p-2 space-y-2">
              <h4 className="text-xl font-bold text-amber-700">
                {menuItem.name}
              </h4>
              <p className="text-lg font-bold">
                {" "}
                Quantity: {menuItem.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="md:flex md:items-center md:justify-between my-10">
        <p className="mt-5 font-black text-4xl text-amber-700">
          Total: {moneyFormat(total)}
        </p>

        <button type="button" onClick={completeOrder} className="bg-amber-700 hover:bg-amber-800 text-white mt-5 md:mt-0 py-3 px-10 rounded-lg uppercase font-bold">
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default Order;
