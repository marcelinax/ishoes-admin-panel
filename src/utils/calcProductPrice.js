export const calcProductPrice = (product) => {
    if (product.isOnSale) {
        return (product.price - (product.price * product.discount) /100 ).toFixed(2);
    }
    else return product.price;
};