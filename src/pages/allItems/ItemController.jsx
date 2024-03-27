import React, { useEffect, useState } from "react";
import useApiCall from "../../hooks/api/useApiCall";
import Spinner from "../../component/spinner/Spinner";
import { Link } from "react-router-dom";
import { CiEdit, CiTrash } from "react-icons/ci";
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
  }, []);
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
  if (loading) {
    return <Spinner />;
  }

  //   console.log(items);
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
                  <CiTrash className="text-red-600 cursor-pointer" />
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
