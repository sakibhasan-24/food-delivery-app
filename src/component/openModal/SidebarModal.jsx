import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

export default function SidebarModal() {
  const dispatch = useDispatch();
  const itemCart = useSelector((state) => state.itemCart);
  console.log(itemCart.length);
  const modalReducer = useSelector((state) => state.modalReducer);
  //   console.log(modalReduce);
  //   const navigate = useNavigate();
  //   const handleGo = () => {
  //     dispatch({ type: "SET_VISIBLE", payload: false });
  //     navigate("/checkout");
  //   };
  return (
    <div>
      <Drawer
        className="text-slate-900 text-center"
        title={`Item/${itemCart.length}`}
        open={modalReducer}
        onClose={() => dispatch({ type: "CLOSE_MODAL", payload: false })}
      >
        {/* {JSON.stringify(itemCart)} */}
        {itemCart &&
          itemCart.length > 0 &&
          itemCart?.map((item) => (
            <div key={item._id} className="text-slate-950">
              <div className="flex justify-between">
                <img
                  src={item?.image[0]}
                  alt="image"
                  width="200px"
                  height="50px"
                  className="rounded-md mx-auto mt-6 object-cover"
                />
              </div>
              <div className="flex justify-between">
                <div className="bg-slate-700 px-4 py-1 rounded-md mx-auto mb-6 text-white">
                  {item.name} X {item.numberOfItem}
                </div>
              </div>
            </div>
          ))}
      </Drawer>
    </div>
  );
}
