# 🍽️ Cafe07 - Food Order System

A modern, responsive web-based food ordering system built with vanilla JavaScript, HTML5, and Bootstrap 5. This application provides a complete end-to-end food ordering experience from menu browsing to order confirmation and feedback.

![Food Order System](https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)

## ✨ Features

### 🍕 Menu Management
- **Dynamic Menu Display**: Browse through categorized food items with high-quality images
- **Category Filtering**: Filter menu items by categories (Main Course, Sides, Beverages, Starters, Desserts)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Quantity Selection**: Easy quantity input for each menu item

### 🛒 Order Management
- **Order Summary**: Detailed breakdown of selected items with pricing
- **Real-time Calculations**: Automatic total calculation as items are added
- **Order Validation**: Ensures at least one item is selected before proceeding

### 👤 Customer Information
- **Customer Details Form**: Collect essential customer information
- **Form Validation**: Built-in validation for required fields
- **Delivery Address**: Capture detailed delivery information

### 💳 Payment Processing
- **Multiple Payment Options**:
  - Credit/Debit Card
  - UPI (Unified Payments Interface)
  - Cash on Delivery (COD)
- **Dynamic Payment Forms**: Show relevant fields based on selected payment method
- **Secure Input Handling**: Proper form validation and data handling

### 📄 Order Confirmation & Billing
- **Order Confirmation**: Professional order confirmation page
- **Printable Bills**: Generate and print detailed order bills
- **Order ID Generation**: Unique order ID for each transaction
- **Bill Download**: Print-friendly bill format

### ⭐ Feedback System
- **Star Rating**: Interactive 5-star rating system
- **Comments**: Optional feedback comments
- **Thank You Message**: Confirmation of feedback submission

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-order-system.git
   cd food-order-system
   ```

2. **Open the application**
   ```bash
   # Simply open index.html in your web browser
   open index.html
   # or
   double-click index.html
   ```

3. **For development with live server (optional)**
   ```bash
   # If you have Python installed
   python -m http.server 8000
   # Then visit http://localhost:8000
   
   # Or if you have Node.js and live-server
   npx live-server
   ```

## 📁 Project Structure

```
food-order-system/
├── index.html          # Main HTML file with complete UI structure
├── app.js             # JavaScript application logic
└── README.md          # Project documentation
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.0
- **Icons**: Bootstrap Icons
- **Styling**: Custom CSS with Bootstrap components
- **Responsive Design**: Mobile-first approach
- **Print Functionality**: Native browser printing API

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop computers (1024px and up)
- 🖥️ Large screens (1200px and up)

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Smooth Scrolling**: Automatic scroll to relevant sections
- **Interactive Elements**: Hover effects and smooth transitions
- **Visual Feedback**: Clear status indicators and confirmations
- **Accessibility**: Proper form labels and semantic HTML

## 🔧 Customization

### Adding New Menu Items
Edit the `menu` array in `app.js`:

```javascript
const menu = [
    {
        id: 9,
        name: 'New Item',
        price: 199,
        category: 'Main Course',
        image: 'https://your-image-url.com/image.jpg'
    }
    // ... add more items
];
```

### Modifying Categories
Categories are automatically generated from menu items. Simply add items with new categories to create new filter buttons.

### Styling Customization
Modify the CSS in the `<style>` section of `index.html` or create a separate CSS file.

## 🌟 Key Highlights

- **Zero Dependencies**: No external JavaScript libraries required
- **Offline Capable**: Works without internet connection (except for images)
- **Print-Friendly**: Professional bill printing functionality
- **Data Persistence**: Order data maintained throughout the session
- **Error Handling**: Proper validation and user feedback
- **Performance Optimized**: Lightweight and fast loading

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ganesh Shejul**
- GitHub: [@ganeshshejul](https://github.com/ganeshshejul)

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- Unsplash for high-quality food images
- Bootstrap Icons for the beautiful icon set

## 📞 Support

If you have any questions or need help with the project, please feel free to:
- Open an issue on GitHub
- Contact: support@cafe07.com

---

⭐ **Star this repository if you found it helpful!** ⭐
