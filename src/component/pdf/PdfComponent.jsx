import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
  body: {
    padding: 40,

    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    color: "#333",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#555",
    borderBottom: "2px solid #555",
    paddingBottom: 8,
  },
  text: {
    display: "flex",
    flexDirection: "col",
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    color: "#888",
  },
  footer: {
    fontSize: 12,
    marginTop: 20,
    color: "#888",
    textAlign: "center",
  },
  highlight: {
    color: "#ff6b6b",
  },
});

export default function PdfComponent({ order }) {
  console.log(order, "hshdhsdhs");
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          {new Date().toLocaleDateString()}
        </Text>
        <Text style={styles.title}>Report</Text>
        <Text style={styles.author}>Food-Taste</Text>
        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Gift</TableCell>
          </TableHeader>
        </Table>
        <Table>
          <TableBody data={order.itemsOrder}>
            <DataTableCell getContent={(p) => p.name} />
            <DataTableCell getContent={(p) => p.numberOfItem} />
            <DataTableCell getContent={(p) => p.price} />
            <DataTableCell getContent={(p) => p.gift} />
          </TableBody>
        </Table>

        <Text style={styles.text}>
          Date :{" "}
          {new Date(order.paymentIntent?.created * 1000).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          Order Id:
          {order.paymentIntent.id}
        </Text>
        <Text style={styles.highlight}>
          Order Status:
          {order.orderStatus}
        </Text>
        <Text style={styles.text}>
          Total Paid:
          {(order.paymentIntent.amount /= 100)}
        </Text>
        <Text style={styles.footer}>
          -------------Thank You For Your Order-------------
        </Text>
      </Page>
    </Document>
  );
}
