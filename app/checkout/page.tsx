const payments = window.Square.payments(appId, locationId);

const card = await payments.card({
  style: {
    input: {
      color: "#ffffff",          // text color
      fontSize: "16px",
      fontFamily: "Arial, sans-serif",
      placeholderColor: "#aaa", // placeholder text
    },
    invalid: {
      color: "#ff4d4f",          // red text for invalid card numbers
    },
    disabled: {
      backgroundColor: "#222",   // dark background if disabled
      color: "#888",
    },
    focus: {
      color: "#fff",              // ensure focused text is visible
    },
  },
});

await card.attach("#card-element");
cardInstanceRef.current = card;
setIsInitialized(true);
console.log("✅ Square Gateway Ready (Styled Dark)");
