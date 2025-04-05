import { Boxes, ChartLine, House, Package, Users } from "lucide-react";
import bag from "../assets/images/bag.jpeg";
import figure from "../assets/images/figure.jpeg";
import hat from "../assets/images/hat.jpeg";
import hoodie from "../assets/images/hoodie.jpeg";
import poster from "../assets/images/poster.jpeg";
import tshirt from "../assets/images/tshirt.jpeg";

export const categoryList = [
  { name: "Bag", code: "bag", image: bag },
  { name: "Figurine", code: "fig", image: figure },
  { name: "Hat", code: "hat", image: hat },
  { name: "Hoodie", code: "hod", image: hoodie },
  { name: "Poster", code: "pos", image: poster },
  { name: "T-Shirt", code: "tss", image: tshirt },
];

export const sidebar = [
  {
    serialId: 10,
    title: "Home",
    link: "/",
    mainItem: true,
    open: false,
    liveLink: true,
    selected: true,
    display: true,
    icon: <House />,
    subList: [],
  },
  {
    serialId: 20,
    title: "Analytics",
    link: "/",
    mainItem: true,
    open: false,
    liveLink: false,
    selected: false,
    display: true,
    icon: <ChartLine />,
    subList: [
      {
        serialId: 21,
        title: "Sales",
        link: "/dashboard/analytics/sales",
        mainItem: false,
        open: false,
        liveLink: true,
        selected: false,
        display: true,
        icon: <House />,
        subList: [],
      },
      {
        serialId: 22,
        title: "Revenue",
        link: "/dashboard/analytics/revenue",
        mainItem: false,
        open: false,
        liveLink: true,
        selected: false,
        display: true,
        icon: <House />,
        subList: [],
      },
      {
        serialId: 23,
        title: "Best Sellings",
        link: "/dashboard/analytics/best-selling",
        mainItem: false,
        open: false,
        liveLink: true,
        selected: false,
        display: true,
        icon: <House />,
        subList: [],
      },
      {
        serialId: 24,
        title: "Low stock",
        link: "/dashboard/analytics/low-stock",
        mainItem: false,
        open: false,
        liveLink: true,
        selected: false,
        display: true,
        icon: <House />,
        subList: [],
      },
    ],
  },
  {
    serialId: 30,
    title: "Product",
    link: "/",
    mainItem: true,
    open: false,
    liveLink: false,
    selected: false,
    display: true,
    icon: <Package />,
    subList: [
      {
        serialId: 31,
        title: "Add",
        link: "/dashboard/product/add",
        mainItem: false,
        open: false,
        liveLink: true,
        selected: false,
        display: true,
        icon: <House />,
        subList: [],
      },
      {
        serialId: 32,
        title: "List",
        link: "/dashboard/product/list",
        mainItem: false,
        open: false,
        liveLink: true,
        selected: false,
        display: true,
        icon: <House />,
        subList: [],
      },
      {
        serialId: 33,
        title: "Stock",
        link: "/dashboard/product/stock",
        mainItem: false,
        open: false,
        liveLink: true,
        selected: false,
        display: false,
        icon: <House />,
        subList: [],
      },
    ],
  },
  {
    serialId: 40,
    title: "Order",
    link: "/dashboard/order/list",
    mainItem: true,
    open: false,
    liveLink: false,
    selected: false,
    display: true,
    icon: <Boxes />,
    subList: [
      {
        serialId: 41,
        title: "Pending",
        link: "/dashboard/order/pending-list",
        mainItem: false,
        open: false,
        liveLink: true,
        selected: false,
        display: true,
        icon: <Boxes />,
        subList: [],
      },
      {
        serialId: 42,
        title: "Completed",
        link: "/dashboard/order/completed-list",
        mainItem: false,
        open: false,
        liveLink: true,
        selected: false,
        display: true,
        icon: <Boxes />,
        subList: [],
      },
    ],
  },
  {
    serialId: 50,
    title: "Customer ",
    link: "/dashboard/customer/list",
    mainItem: true,
    open: false,
    liveLink: true,
    selected: false,
    display: true,
    icon: <Users />,
    subList: [],
  },
];

/*

For a **Game Merchandise E-commerce Website**, the **admin dashboard** should have features for managing products, orders, customers, and analytics. Here’s a list of key dashboard features:  

### **1. Overview & Analytics**  
- Sales summary (daily, weekly, monthly)  
- Total revenue & profit margin  
- Total orders & pending orders  
- Best-selling products  
- Low-stock alerts  
- Customer activity log  

### **2. Product Management**  
- Add, edit, and delete products  
- Manage product categories (e.g., apparel, collectibles, accessories)  
- Inventory tracking  
- Bulk product upload via CSV  
- Discount & promo code management  

### **3. Order Management**  
- View and manage orders (pending, shipped, completed, canceled)  
- Order details (customer info, items, shipping address)  
- Order status updates  
- Refund & return management  

### **4. Customer Management**  
- View customer list & profiles  
- Track purchase history  
- Customer support tickets  
- Email & notification management  

### **5. Payment & Transactions**  
- View payment transactions (successful, failed, pending)  
- Refund processing  
- Payment gateway integration logs  

### **6. Shipping & Logistics**  
- Track shipped orders  
- Shipping partner integration  
- Estimated delivery time tracking  
- Shipping cost calculation  

### **7. User Roles & Permissions**  
- Admin, Manager, and Customer Support access levels  
- Role-based access control (RBAC)  

### **8. Reviews & Ratings Management**  
- Approve or reject customer reviews  
- Monitor product ratings  
- Flag and moderate reviews  

### **9. Marketing & Promotions**  
- Banner & homepage promotion management  
- Email campaign tools (newsletters, offers)  
- Affiliate program management  
- Social media integration  

### **10. Settings & Customization**  
- Store settings (currency, tax, payment options)  
- Theme customization  
- Notification settings  
- Security & authentication (OAuth2, JWT)  

Would you like me to organize this into a document? 🚀

*/
