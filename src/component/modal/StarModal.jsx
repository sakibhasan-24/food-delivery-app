import { Modal } from "antd";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StarModal({ children }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const handleModal = () => {
    if (currentUser) {
      setModalVisible(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <CiStar className="text-red-300 my-0 text-center ml-14" />

        {currentUser ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave rating"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        centered
        onOk={() => {
          setModalVisible(false);
          // Perform rating action here
          toast.success("Rating submitted successfully!");
        }}
      >
        {children}
      </Modal>
    </>
  );
}
