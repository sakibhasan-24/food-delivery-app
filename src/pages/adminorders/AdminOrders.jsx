import React, { useEffect, useState } from "react";
import useAdminStatus from "../../hooks/useAdminStatus";
import { useSelector } from "react-redux";
import Order from "./Order";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const { getAllOrderFromUser, updateOrderStatus } = useAdminStatus();
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const loadAllOrders = async () => {
    const orders = await getAllOrderFromUser();
    // console.log(orders);
    setOrders(orders.allOrders);
  };
  useEffect(() => {
    loadAllOrders();
  }, []);
  const handleStatusChange = async (id, status) => {
    const newResult = await updateOrderStatus(id, status);
    toast.success("Status Updated");
    loadAllOrders();
  };
  return (
    <div>
      <Order orders={orders} handleStatusChange={handleStatusChange} />
    </div>
  );
}
