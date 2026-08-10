/* =====================================================
   NIHAN SHOP
   SHOPPING CART + CUSTOMER FORM + RUBIKA
===================================================== */


/* ================= CART ================= */

let cart = [];



function addToCart(name, image, price) {

    const existingProduct =
        cart.find(item => item.name === name);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            image: image,

            price: price,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}



/* ================= UPDATE CART ================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");


    const cartCount =
        document.getElementById("cartCount");


    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div style="
                text-align:center;
                padding:35px;
                color:#777;
                font-size:13px;
            ">

                سبد خرید شما خالی است.

            </div>

        `;

    }


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        count += item.quantity;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div>

                <h4>
                    ${item.name}
                </h4>


                <div class="cart-item-price">

                    ${formatPrice(item.price)}
                    تومان

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${index}, 1)">

                        +

                    </button>

                </div>

            </div>


            <div>

                <strong
                    style="
                        font-size:11px;
                        color:#8f405f;
                    ">

                    ${formatPrice(itemTotal)}

                    تومان

                </strong>


                <br>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    ×

                </button>

            </div>

        `;


        cartItems.appendChild(div);

    });


    cartCount.innerText = count;


    cartTotal.innerText =
        formatPrice(total) + " تومان";

}



/* ================= QUANTITY ================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}



/* ================= REMOVE ================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}



/* ================= FORMAT PRICE ================= */

function formatPrice(number) {

    return Number(number).toLocaleString("fa-IR");

}



/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("active");

}



/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("active");

}



/* ================= CUSTOMER FORM ================= */

function openCustomerForm() {


    if (cart.length === 0) {

        alert(
            "ابتدا حداقل یک محصول به سبد خرید اضافه کنید."
        );

        return;

    }


    closeCart();


    document
        .getElementById("customerModal")
        .classList.add("active");

}



function closeCustomerForm() {

    document
        .getElementById("customerModal")
        .classList.remove("active");

}



/* ================= SUBMIT ORDER ================= */

function submitOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "سبد خرید شما خالی است."
        );

        return;

    }


    const firstName =
        document
            .getElementById("firstName")
            .value
            .trim();


    const lastName =
        document
            .getElementById("lastName")
            .value
            .trim();


    const phone =
        document
            .getElementById("phone")
            .value
            .trim();


    const postalCode =
        document
            .getElementById("postalCode")
            .value
            .trim();


    const address =
        document
            .getElementById("address")
            .value
            .trim();


    let total = 0;


    let productsText = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        productsText +=

            `${index + 1}. ${item.name}
تعداد: ${item.quantity}
مبلغ هر محصول: ${formatPrice(item.price)} تومان
مبلغ این محصول: ${formatPrice(itemTotal)} تومان

`;

    });



    /* متن نهایی سفارش */

    const orderText =

`🛍️ سفارش جدید از نیهان شاپ

━━━━━━━━━━━━━━

👤 مشخصات مشتری

نام: ${firstName}
نام خانوادگی: ${lastName}

📱 شماره تماس:
${phone}

📮 کد پستی:
${postalCode}

📍 آدرس:
${address}

━━━━━━━━━━━━━━

🛒 محصولات سفارش

${productsText}
💰 مبلغ کل:
${formatPrice(total)} تومان

━━━━━━━━━━━━━━

📌 مقصد سفارش:
روبیکا

آیدی فروشگاه:
@sampixel

━━━━━━━━━━━━━━
NIHAN SHOP
`;



    /* ذخیره سفارش برای کپی */

    window.currentOrderText =
        orderText;



    /* نمایش سفارش */

    document
        .getElementById("orderPreview")
        .innerText =
        orderText;


    closeCustomerForm();


    document
        .getElementById("orderModal")
        .classList.add("active");

}



/* ================= COPY ORDER ================= */

async function copyOrderText() {


    if (!window.currentOrderText) {

        return;

    }


    try {

        await navigator.clipboard.writeText(
            window.currentOrderText
        );


        alert(
            "اطلاعات سفارش کپی شد. حالا وارد روبیکا شوید و آن را ارسال کنید."
        );


    } catch (error) {


        /* روش جایگزین برای مرورگرهای قدیمی */

        const textarea =
            document.createElement("textarea");


        textarea.value =
            window.currentOrderText;


        document.body.appendChild(textarea);


        textarea.select();


        document.execCommand("copy");


        textarea.remove();


        alert(
            "اطلاعات سفارش کپی شد."
        );

    }

}



/* ================= CLOSE ORDER ================= */

function closeOrder() {

    document
        .getElementById("orderModal")
        .classList.remove("active");

}



/* ================= PRODUCT MODAL ================= */

let selectedProduct = null;



function openProduct(
    title,
    image,
    description,
    price
) {


    document
        .getElementById("modalImage")
        .src = image;


    document
        .getElementById("modalTitle")
        .innerText = title;


    document
        .getElementById("modalDescription")
        .innerText = description;


    document
        .getElementById("modalPrice")
        .innerText = price;



    /* تبدیل قیمت فارسی به عدد */

    const numericPrice =
        parseInt(
            price
                .replace(/[^\d]/g, "")
        );


    selectedProduct = {

        title: title,

        image: image,

        price: numericPrice

    };



    document
        .getElementById("modalAddCart")
        .onclick = function() {

            addToCart(
                selectedProduct.title,
                selectedProduct.image,
                selectedProduct.price
            );

            closeProduct();

        };



    document
        .getElementById("productModal")
        .classList.add("active");

}



function closeProduct() {

    document
        .getElementById("productModal")
        .classList.remove("active");

}



/* ================= CLICK OUTSIDE ================= */

window.addEventListener(
    "click",
    function(event) {


        const productModal =
            document.getElementById("productModal");


        const cartModal =
            document.getElementById("cartModal");


        const customerModal =
            document.getElementById("customerModal");


        const orderModal =
            document.getElementById("orderModal");



        if (event.target === productModal) {

            closeProduct();

        }


        if (event.target === cartModal) {

            closeCart();

        }


        if (event.target === customerModal) {

            closeCustomerForm();

        }


        if (event.target === orderModal) {

            closeOrder();

        }

    }
);



/* ================= INITIALIZE ================= */

updateCart();
