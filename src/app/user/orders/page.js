'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "@/libs/datetime";
import { showStatus } from "@/libs/ordersUtils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/AppContext";

const orderStatuses = [
  "order_placed",
  "accepted",
  "preparing",
  "out_for_delivery",
  "delivered",
  "canceled",
  "failed",
];


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { isAdmin } = useContext(CartContext);




  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/orders').then(res => {
      res.json().then(orders => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      })
    })
  }


  function handleStatusChange(orderId, newStatus) {
    fetch(`/api/updateOrder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  }


  return (
    <section className="mt-8 max-w-2xl mx-auto">

      <div className="mt-8">
        {loadingOrders && (
          <div>Loading orders...</div>
        )}
        {orders?.length > 0 && orders.map(order => (
          <div
            key={order._id}
            className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
            <div className="grow flex flex-col md:flex-row items-center gap-6">
              <div>
                <div className={
                  (order.paid ? 'bg-green-500' : 'bg-red-400')
                  + ' p-2 rounded-md text-white w-24 text-center'
                }>
                  {order.paid ? 'Paid' : 'Not paid'}
                </div>
              </div>
              <div className="grow">
                <div className="flex gap-2 items-center mb-1">
                  {isAdmin ? (<div className="grow">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-primary border border-primary text-white text-sm rounded-lg focus:ring-primary focus:border-primary focus:bg-primary hover:bg-primary dark:bg-primary block w-full p-2.5 appearance-none"
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status} className="bg-primary text-white">
                          {status.replace("_", " ").toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>) : (<div className="grow">
                    {showStatus(order.status)}
                  </div>)}

                  <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
                </div>
                <div className="text-gray-500 text-xs">
                  {order.cartProducts.map(p => p.name).join(', ')}
                </div>
              </div>
            </div>
            <div className="justify-end flex gap-2 items-center whitespace-nowrap">
              <Link href={"/user/orders/" + order._id} className="button">
                Show order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}