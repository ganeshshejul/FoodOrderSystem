document.addEventListener('DOMContentLoaded', () => {
    // Store order data
    let orderData = {
        items: [],
        total: 0,
        customer: {},
        payment: {},
        orderId: ''
    };
    // Define menu items with images, prices, and categories
    const menu = [
        { id: 1, name: 'Burger', price: 199, category: 'Main Course', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 2, name: 'Fries', price: 99, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 3, name: 'Soda', price: 49, category: 'Beverages', image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 4, name: 'Salad', price: 149, category: 'Starters', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 5, name: 'Ice Cream', price: 79, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 6, name: 'Pizza', price: 299, category: 'Main Course', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 7, name: 'Coffee', price: 89, category: 'Beverages', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 8, name: 'Pasta', price: 249, category: 'Main Course', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
    ];

    // Get DOM elements
    const menuContainer = document.getElementById('menu');
    const orderButton = document.getElementById('orderButton');
    const categoryFilters = document.getElementById('categoryFilters');

    // Extract unique categories
    const categories = [...new Set(menu.map(item => item.category))];

    // Add category filter buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-primary';
        button.textContent = category;
        button.dataset.category = category;
        categoryFilters.appendChild(button);
    });

    // Function to display menu items
    const displayMenuItems = (category = 'all') => {
        menuContainer.innerHTML = '';

        const filteredItems = category === 'all'
            ? menu
            : menu.filter(item => item.category === category);

        filteredItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'col-md-4 col-sm-6 mb-4';
            itemDiv.innerHTML = `
                <div class="menu-item">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid">
                    <h3>${item.name}</h3>
                    <p class="badge bg-secondary">${item.category}</p>
                    <p class="text-primary fw-bold">₹${item.price.toFixed(2)}</p>
                    <div class="input-group">
                        <span class="input-group-text">Quantity</span>
                        <input type="number" class="form-control" id="item${item.id}"
                               min="0" step="1" value="0" data-id="${item.id}">
                    </div>
                </div>
            `;
            menuContainer.appendChild(itemDiv);
        });
    };

    // Add event listeners to category buttons
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            // Remove active class from all buttons
            document.querySelectorAll('#categoryFilters button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            e.target.classList.add('active');

            // Display menu items for selected category
            displayMenuItems(e.target.dataset.category);
        }
    });

    // Initial display of all menu items
    displayMenuItems();

    // Handle order placement and show order summary
    orderButton.addEventListener('click', () => {
        const selectedItems = [];
        const inputs = menuContainer.querySelectorAll('input[type="number"]');

        inputs.forEach(input => {
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                const id = input.dataset.id;
                const item = menu.find(item => item.id == id);
                selectedItems.push({ ...item, quantity });
            }
        });

        if (selectedItems.length === 0) {
            alert('Please select at least one item.');
            return;
        }

        const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Save order data
        orderData.items = selectedItems;
        orderData.total = total;

        // Generate order summary HTML
        let summaryHTML = `
            <h4 class="mb-3">Your Order</h4>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        selectedItems.forEach(item => {
            summaryHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td><span class="badge bg-secondary">${item.category}</span></td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price.toFixed(2)}</td>
                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
        });

        summaryHTML += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="text-end fw-bold">Total Amount:</td>
                            <td class="fw-bold">₹${total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

        // Show order summary
        document.getElementById('summaryContent').innerHTML = summaryHTML;
        document.getElementById('orderSummary').style.display = 'block';
        document.getElementById('orderSummary').scrollIntoView({ behavior: 'smooth' });

        // Hide menu and order button
        document.getElementById('menu').style.display = 'none';
        document.querySelector('.btn-group').style.display = 'none';
        orderButton.style.display = 'none';
    });

    // Proceed to checkout
    document.getElementById('proceedToCheckout').addEventListener('click', () => {
        document.getElementById('orderSummary').style.display = 'none';
        document.getElementById('customerDetails').style.display = 'block';
        document.getElementById('customerDetails').scrollIntoView({ behavior: 'smooth' });
    });

    // Back to order summary
    document.getElementById('backToOrder').addEventListener('click', () => {
        document.getElementById('customerDetails').style.display = 'none';
        document.getElementById('orderSummary').style.display = 'block';
        document.getElementById('orderSummary').scrollIntoView({ behavior: 'smooth' });
    });

    // Continue to payment
    document.getElementById('customerForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Save customer data
        orderData.customer = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };

        document.getElementById('customerDetails').style.display = 'none';
        document.getElementById('paymentSection').style.display = 'block';
        document.getElementById('paymentSection').scrollIntoView({ behavior: 'smooth' });
    });

    // Back to customer details
    document.getElementById('backToCustomer').addEventListener('click', () => {
        document.getElementById('paymentSection').style.display = 'none';
        document.getElementById('customerDetails').style.display = 'block';
        document.getElementById('customerDetails').scrollIntoView({ behavior: 'smooth' });
    });

    // Toggle payment method details
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'creditCard') {
                document.getElementById('cardDetails').style.display = 'block';
                document.getElementById('upiDetails').style.display = 'none';
            } else if (radio.value === 'upi') {
                document.getElementById('cardDetails').style.display = 'none';
                document.getElementById('upiDetails').style.display = 'block';
            } else {
                document.getElementById('cardDetails').style.display = 'none';
                document.getElementById('upiDetails').style.display = 'none';
            }
        });
    });

    // Place order
    document.getElementById('paymentForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Save payment data
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        orderData.payment = { method: paymentMethod };

        if (paymentMethod === 'creditCard') {
            orderData.payment.cardNumber = document.getElementById('cardNumber').value;
            orderData.payment.expiry = document.getElementById('expiry').value;
        } else if (paymentMethod === 'upi') {
            orderData.payment.upiId = document.getElementById('upiId').value;
        }

        // Generate order ID
        orderData.orderId = 'ORD-' + Date.now().toString().slice(-6);
        document.getElementById('orderId').textContent = orderData.orderId;

        // Generate bill
        generateBill();

        document.getElementById('paymentSection').style.display = 'none';
        document.getElementById('orderConfirmation').style.display = 'block';
        document.getElementById('orderConfirmation').scrollIntoView({ behavior: 'smooth' });

        // Show feedback form after a delay to allow the user to view the order confirmation
        setTimeout(() => {
            document.getElementById('feedback').style.display = 'block';
            document.getElementById('feedback').scrollIntoView({ behavior: 'smooth' });
        }, 5000); // 5 seconds delay
    });

    // Generate bill function
    function generateBill() {
        const billHTML = `
            <div class="bill-content">
                <h2 class="text-center mb-4">Cafe07 - Order Bill</h2>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <p><strong>Customer:</strong> ${orderData.customer.name}</p>
                        <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
                        <p><strong>Address:</strong> ${orderData.customer.address}</p>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead class="table-light">
                            <tr>
                                <th>Item</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderData.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td><span class="badge bg-secondary">${item.category}</span></td>
                                    <td>${item.quantity}</td>
                                    <td>₹${item.price.toFixed(2)}</td>
                                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot class="table-light">
                            <tr>
                                <td colspan="4" class="fw-bold">Total Amount</td>
                                <td class="fw-bold">₹${orderData.total.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="row mt-4">
                    <div class="col-md-6">
                        <h5>Payment Information</h5>
                        <p><strong>Payment Method:</strong> ${getPaymentMethodName(orderData.payment.method)}</p>
                        ${orderData.payment.method === 'cod' ? '<p><strong>Status:</strong> Cash on Delivery</p>' : ''}
                    </div>
                    <div class="col-md-6 text-md-end">
                        <p class="mb-0">Thank you for your order!</p>
                        <p>For any queries, please contact us at support@cafe07.com</p>
                    </div>
                </div>
            </div>
        `;

        // Make sure the bill is visible
        const billElement = document.getElementById('bill');
        billElement.style.display = 'block';
        document.querySelector('#bill .card-body').innerHTML = billHTML;
    }

    // Helper function to get payment method name
    function getPaymentMethodName(method) {
        switch(method) {
            case 'creditCard': return 'Credit/Debit Card';
            case 'upi': return 'UPI';
            case 'cod': return 'Cash on Delivery';
            default: return method;
        }
    }

    // Download bill
    document.getElementById('downloadBill').addEventListener('click', () => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank', 'width=800,height=600');

        // Create table rows for items
        let itemRows = '';
        orderData.items.forEach(item => {
            itemRows += `
                <tr>
                    <td style="padding: 8px; border: 1px solid #000;">${item.name}</td>
                    <td style="padding: 8px; border: 1px solid #000;">${item.category}</td>
                    <td style="padding: 8px; border: 1px solid #000; text-align: center;">${item.quantity}</td>
                    <td style="padding: 8px; border: 1px solid #000; text-align: right;">${item.price.toFixed(2)}</td>
                    <td style="padding: 8px; border: 1px solid #000; text-align: right;">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
        });

        // Write the bill content to the new window
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Cafe07 - Order Bill</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .bill-container { max-width: 800px; margin: 0 auto; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                    th, td { padding: 8px; border: 1px solid #000; }
                    th { background-color: #f2f2f2; }
                    .text-right { text-align: right; }
                    .text-center { text-align: center; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .footer { text-align: center; margin-top: 30px; padding-top: 10px; border-top: 1px solid #000; }
                </style>
            </head>
            <body>
                <div class="bill-container">
                    <div class="header">
                        <h1>Cafe07 - Order Bill</h1>
                    </div>

                    <table>
                        <tr>
                            <td style="width: 50%; border: none;">
                                <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                                <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
                            </td>
                            <td style="width: 50%; text-align: right; border: none;">
                                <p><strong>Customer:</strong> ${orderData.customer.name}</p>
                                <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
                                <p><strong>Address:</strong> ${orderData.customer.address}</p>
                            </td>
                        </tr>
                    </table>

                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Category</th>
                                <th class="text-center">Quantity</th>
                                <th class="text-right">Price (₹)</th>
                                <th class="text-right">Total (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemRows}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4" class="text-right"><strong>Total Amount:</strong></td>
                                <td class="text-right"><strong>₹${orderData.total.toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>

                    <table>
                        <tr>
                            <td style="width: 50%; border: none;">
                                <h4>Payment Information</h4>
                                <p><strong>Payment Method:</strong> ${getPaymentMethodName(orderData.payment.method)}</p>
                                ${orderData.payment.method === 'cod' ? '<p><strong>Status:</strong> Cash on Delivery</p>' : ''}
                            </td>
                            <td style="width: 50%; text-align: right; border: none;">
                                <p>Thank you for your order!</p>
                                <p>For any queries, please contact us at support@cafe07.com</p>
                            </td>
                        </tr>
                    </table>

                    <div class="footer">
                        <p>Cafe07 - Delicious food delivered to your doorstep</p>
                    </div>
                </div>
                <script>
                    // Print and close the window after loading
                    window.onload = function() {
                        window.print();
                        // Uncomment the line below if you want the window to close automatically after printing
                        // window.close();
                    };
                </script>
            </body>
            </html>
        `);

        printWindow.document.close();
    });

    // Automatically show feedback form after printing
    document.getElementById('downloadBill').addEventListener('click', () => {
        // Show feedback form after a short delay to allow the print dialog to appear first
        setTimeout(() => {
            document.getElementById('feedback').style.display = 'block';
            document.getElementById('feedback').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });

    // Star rating functionality
    const stars = document.querySelectorAll('.rating-stars i');
    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.dataset.rating);
            stars.forEach(s => {
                if (parseInt(s.dataset.rating) <= rating) {
                    s.classList.remove('bi-star');
                    s.classList.add('bi-star-fill');
                } else {
                    s.classList.remove('bi-star-fill');
                    s.classList.add('bi-star');
                }
            });
        });

        star.addEventListener('click', () => {
            document.getElementById('rating').value = star.dataset.rating;
        });
    });

    document.querySelector('.rating-stars').addEventListener('mouseout', () => {
        const currentRating = parseInt(document.getElementById('rating').value) || 0;
        stars.forEach(s => {
            if (parseInt(s.dataset.rating) <= currentRating) {
                s.classList.remove('bi-star');
                s.classList.add('bi-star-fill');
            } else {
                s.classList.remove('bi-star-fill');
                s.classList.add('bi-star');
            }
        });
    });

    // Handle feedback submission
    document.getElementById('feedbackForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = document.getElementById('rating').value;
        const comments = document.getElementById('comments').value;

        if (rating === '0') {
            alert('Please select a rating');
            return;
        }

        // Create a thank you message
        const feedbackSection = document.getElementById('feedback');
        const originalContent = feedbackSection.innerHTML;

        feedbackSection.innerHTML = `
            <div class="card-header bg-success text-white">
                <h3 class="mb-0">Thank You!</h3>
            </div>
            <div class="card-body text-center">
                <div class="mb-4">
                    <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                    <h4 class="mt-3">Thank you for your feedback!</h4>
                    <p>We appreciate you taking the time to share your thoughts.</p>
                    <p>Your rating: ${rating}/5</p>
                    ${comments ? `<p>Your comments: "${comments}"</p>` : ''}
                </div>
                <p>We hope to serve you again soon!</p>
            </div>
        `;

        // Reset the form for future use
        document.getElementById('feedbackForm').reset();
        stars.forEach(s => {
            s.classList.remove('bi-star-fill');
            s.classList.add('bi-star');
        });

        // After a delay, hide the feedback section
        setTimeout(() => {
            feedbackSection.style.display = 'none';
            // Restore original content for future use
            feedbackSection.innerHTML = originalContent;
        }, 5000);
    });
});
