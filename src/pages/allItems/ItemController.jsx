import React, { useEffect, useState } from "react";
import useApiCall from "../../hooks/api/useApiCall";
import Spinner from "../../component/spinner/Spinner";
import { Link } from "react-router-dom";
import { CiEdit, CiTrash } from "react-icons/ci";
import Swal from "sweetalert2";
export default function ItemController() {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const axiosPublic = useApiCall();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosPublic.get(`/api/food/get-items?startIndex=0`);
        // console.log(res);
        setItems(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [items.length]);
  //   console.log(items);
  const handleShowMore = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(
        `/api/food/get-items?startIndex=${0}&pageSize=${items?.totalItems}`
      );
      //   console.log(res);
      setItems(res?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/api/food/delete-item/${id}`);
          console.log(res);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const remainingItems = items.items.filter((item) => item._id !== id);
          setItems(remainingItems);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    });
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  if (items?.items?.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-center">No items found</h1>
        <p className="text-center">Please add some items</p>
        <Link
          className="w-full mx-auto bg-slate-800 text-white px-6   py-2 rounded-lg mt-4"
          to="/dashboard/add-menu"
        >
          Add Items
        </Link>
      </div>
    );
  }
  // console.log(items.items.length);
  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold text-center">All items</h1>
      <div className="p-4 shadow-lg shadow-slate-800">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>no:</th>
              <th>item</th>
              <th>price</th>
              <th>Details</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {items?.items?.map((item, idx) => (
              <tr key={item?._id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>

                <td>{item.price}</td>
                <Link to={`/item/details/${item.name}/${item._id}`}>
                  details
                </Link>
                <td>
                  <CiEdit className="text-green-600 cursor-pointer" />
                </td>
                <td>
                  <CiTrash
                    onClick={() => handleDelete(item?._id)}
                    className="text-red-600 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
            {items?.items?.length === 6 && (
              <button
                onClick={handleShowMore}
                className="w-full bg-slate-800 text-white  py-2 rounded-lg"
              >
                see more
              </button>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
