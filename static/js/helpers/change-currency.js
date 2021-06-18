export const changeCurrency = (e) => {
  e.stopImmediatePropagation();
  let newCurrency = e.target.textContent;
  let currentCurrency =
    document.getElementById("selected-currency").textContent;
  if (newCurrency !== currentCurrency) {
    document.getElementById("selected-currency").textContent = newCurrency;
    localStorage.setItem("currency", newCurrency);
    return true;
  }
  return false;
};
