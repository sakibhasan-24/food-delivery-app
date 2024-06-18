import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useOrders from "../../hooks/useOrders";
import ShowPaymentInfo from "../../component/paymentInfo/ShowPaymentInfo";
import PdfComponent from "../../component/pdf/PdfComponent";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function PurchaseHistory() {
  // styles pdf
  //   const styles = StyleSheet.create({
  //     page: {
  //       flexDirection: "row",
  //       backgroundColor: "#E4E4E4",
  //     },
  //     section: {
  //       margin: 10,
  //       padding: 10,
  //       flexGrow: 1,
  //     },
  //   });
  const dispatch = useDispatch();
  const { getOrderItems } = useOrders();
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const loadUserOrders = async () => {
      setLoading(true);
      try {
        const { data } = await getOrderItems();
        // setOrders(data);
        console.log(data?.userOrders);
        setOrders(data?.userOrders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadUserOrders();
  }, []);
  const showOrderInTable = (order, idx) => (
    <div className="mx-2 bg-green-700 sm:mx-12 shadow-lg rounded-lg" key={idx}>
      <table className="min-w-full space-y-8 divide-y divide-gray-200">
        <thead className="bg-gradient-to-r text-center from-blue-400 to-purple-500 text-white">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Gift</th>
            <th className="px-4 py-3">Count</th>
          </tr>
        </thead>

        <tbody className=" text-white ">
          {order?.itemsOrder?.map((item, idx) => (
            <tr key={idx} className="  border-gray-200 ">
              <td className="px-4 py-3">{item?.name}</td>
              <td className="px-4 py-3">{item?.price}</td>
              <td className="px-4 py-3">{item?.gift}</td>
              <td className="px-4 py-3">{item?.numberOfItem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  //   const showDownLoadLink = () => {
  //     <PDFDownloadLink
  //       document={
  //         <Document>
  //           <Page size="A4">
  //             <View style={styles.section}>
  //               <Text>Hello</Text>
  //               <Text>Hello</Text>
  //             </View>
  //           </Page>
  //         </Document>
  //       }
  //     >
  //       Show Report
  //     </PDFDownloadLink>;
  //   };
  const showDownLoadLink = (order) => (
    <PDFDownloadLink
      document={
        <PdfComponent order={order} />
        // <Document>
        //   <Page size="A4">
        //     <View style={styles.section}>
        //       <Text>Hello</Text>
        //       <Text>Hello</Text>
        //     </View>
        //   </Page>
        // </Document>
      }
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          "Loading document..."
        ) : (
          <button className="bg-green-500 text-white px-2 py-2 border-none rounded-md my-6">
            Show Report
          </button>
        )
      }
    </PDFDownloadLink>
  );

  const showEachOrder = () => {
    return orders.map((order, idx) => (
      <div
        key={idx}
        className="w-full sm:max-w-4xl mx-auto p-4 sm:p-6 border-2 border-green-500 text-center"
      >
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div>
          <div>
            <h1>{showDownLoadLink(order)}</h1>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className=" w-full sm:max-w-xl mx-auto px-4 py-16">
      <h1 className="text-xl font-semibold text-center text-gray-100 my-12">
        {orders?.length > 0
          ? "Check Your Purchase History"
          : "No item Purchase"}
      </h1>
      <div>{showEachOrder()}</div>
    </div>
  );
}
