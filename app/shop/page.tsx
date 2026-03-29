import PaymentWrapper from "../../components/PaymentWrapper";

export default function Shop() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Shop</h1>
      <p>Secure checkout powered by Square</p>

      <PaymentWrapper />
    </main>
  );
}
