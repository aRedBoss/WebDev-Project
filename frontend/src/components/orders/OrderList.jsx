import useOrders from "../../hooks/useOrders.jsx";
import "./OrderList.css";

const OrderList = () => {
  const { orders, loading, error } = useOrders();

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Status</th>
              <th className="th-center">Action</th>
              <th className="th-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>${order.totalPrice}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.status}</td>
                <td className="td-center">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(product._id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="td-center">
                  <button
                    className="remove-btn"
                    onClick={() => onDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
