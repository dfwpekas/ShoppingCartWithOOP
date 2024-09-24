
class ShoppingCart {
    constructor() {
        this.totalElement = document.querySelector(".total");
        this.addIcons = document.querySelectorAll(".fa-plus-circle");
        this.minusIcons = document.querySelectorAll(".fa-minus-circle");
        this.deleteIcons = document.querySelectorAll(".fa-trash-alt");
        this.likeIcons = document.querySelectorAll(".fa-heart");

        this.init();
    }

    init() {
        this.addIcons.forEach((add) => this.addEventListeners(add, 'add'));
        this.minusIcons.forEach((minus) => this.addEventListeners(minus, 'minus'));
        this.deleteIcons.forEach((deleteIcon) => this.addEventListeners(deleteIcon, 'delete'));
        this.likeIcons.forEach((likeIcon) => this.addEventListeners(likeIcon, 'like'));
    }

    addEventListeners(icon, action) {
        switch (action) {
            case 'add':
                icon.addEventListener("click", () => this.incrementQuantity(icon));
                break;
            case 'minus':
                icon.addEventListener("click", () => this.decrementQuantity(icon));
                break;
            case 'delete':
                icon.addEventListener("click", () => this.deleteCard(icon));
                break;
            case 'like':
                icon.addEventListener("click", () => this.toggleLike(icon));
                break;
        }
    }

    incrementQuantity(icon) {
        const card = icon.closest(".card");
        const quantityElement = card.querySelector(".quantity");
        let quantity = parseInt(quantityElement.innerText);
        quantity++;
        quantityElement.innerText = (quantity < 10) ? "" + quantity : quantity;
        this.updateTotalPrice();
    }

    decrementQuantity(icon) {
        const card = icon.closest(".card");
        const quantityElement = card.querySelector(".quantity");
        let quantity = parseInt(quantityElement.innerText);
        if (quantity > 0) {
            quantity--;
            quantityElement.innerText = (quantity < 10) ? "" + quantity : quantity;
            this.updateTotalPrice();
        }
    }

    deleteCard(icon) {
        const card = icon.closest(".card");
        card.remove();
        this.updateTotalPrice();
    }

    toggleLike(icon) {
        icon.classList.toggle("liked");
    }

    updateTotalPrice() {
        let totalPrice = 0;
        document.querySelectorAll(".card").forEach((card) => {
            const quantityElement = card.querySelector(".quantity");
            const unitPriceElement = card.querySelector(".unit-price");
            const quantity = parseInt(quantityElement.innerText);
            const unitPrice = parseFloat(unitPriceElement.innerText.replace('$', ''));
            totalPrice += quantity * unitPrice;
        });
        this.totalElement.innerText = `$ ${totalPrice.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
});
