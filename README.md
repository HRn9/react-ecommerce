# FoodDelivery - React Restaurant App 🍕

A modern, fully-featured React application for restaurant food delivery with comprehensive cart management, user authentication, and order tracking.

## 🚀 Features

### ✅ Complete Feature Set
- **Multi-page React Application** with dynamic routing
- **Category-based Menu Filtering** (All, Breakfast, Dinner, Dessert)
- **Advanced Cart Management** with quantity controls
- **Firebase Authentication** with demo login
- **Real Orders API Integration** with order tracking
- **Redux State Management** for cart and orders
- **TypeScript** for type safety
- **Responsive Design** for all devices
- **API Request Logging** through custom useFetch hook

### 🎯 User Experience
- **Smart Cart UI:** Click cart icon to show/hide, close with X, Escape, or click outside
- **Instant Feedback:** Visual indicators for login status, cart count, loading states
- **Category Filtering:** Filter menu items by Breakfast, Dinner, Dessert categories
- **Order Management:** Track orders with status indicators (pending, confirmed, preparing, delivered)
- **Demo Account:** Quick login with pre-filled credentials

## 🛠️ Tech Stack

- **React 18+** (Functional Components + Hooks)
- **TypeScript** for type safety
- **Redux Toolkit + React-Redux** for state management
- **React Router v6** for navigation
- **Styled Components** for styling
- **Firebase Auth** for authentication
- **MockAPI** for backend data
- **Vite** for build tooling

## 📱 Pages & Navigation

| Page | Path | Access | Description |
|------|------|--------|-------------|
| **Home** | `/` | Public | Hero section with rating and call-to-action |
| **Menu** | `/menu` | Public | Filterable menu with cart functionality |
| **Orders** | `/orders` | Auth Required | User's order history and tracking |
| **About** | `/about` | Public | Company information and team |
| **Contact** | `/contact` | Public | Contact form and business info |
| **Login** | `/login` | Public | Firebase authentication |

## 🔐 Authentication

### Demo Account
- **Email:** `demo@fooddelivery.com`
- **Password:** `demo123`

### Authentication Features
- Firebase authentication integration
- Visual login/logout status in header
- Protected routes for orders page
- Persistent session management

## 🛒 Cart & Orders Workflow

### Cart Management
1. **Add Items:** Click "Add to Cart" on any menu item
2. **View Cart:** Click 🛒 icon in header (shows item count)
3. **Modify Cart:** Use +/- buttons to change quantities
4. **Remove Items:** Click × to remove individual items
5. **Clear Cart:** Use "Clear Cart" button to empty cart
6. **Close Cart:** Click X, press Escape, or click outside

### Order Process
1. **Login Required:** Must be authenticated to place orders
2. **Checkout:** Click "Checkout" button in cart
3. **API Integration:** Order saved to MockAPI backend
4. **Confirmation:** Success message with order details
5. **Order Tracking:** View in Orders page with status updates

## 🔍 Menu Filtering

### Category Filters
- **All:** Show all menu items (default)
- **Breakfast:** Morning meals and drinks
- **Dinner:** Main courses and entrees  
- **Dessert:** Sweet treats and desserts

### Filter Features
- Active filter highlighting
- Results counter (e.g., "Showing 6 of 15 dishes in Dinner")
- "See More" button works with filters
- Preserves filter when loading more items

## 🎨 UI/UX Features

### Header
- **Logo:** Links to home page
- **Navigation:** Menu, Orders (auth), About, Contact
- **Cart Icon:** Shows item count, toggles cart visibility
- **User Status:** Shows login state and user info
- **Auth Button:** Login/Logout functionality
- **Phone:** Hover tooltip with number

### Cart Component
- **Overlay Design:** Modal-style with backdrop
- **Item Management:** Quantity controls and removal
- **Real-time Totals:** Automatic price calculations
- **Multiple Close Methods:** X button, Escape key, click outside
- **Loading States:** Visual feedback during checkout
- **Success Animation:** Confirmation message

### Responsive Design
- Mobile-optimized cart (fullscreen on mobile)
- Responsive grid layouts
- Touch-friendly controls
- Optimized typography and spacing

## 🔧 Development

### Prerequisites
```bash
Node.js 16+
npm or yarn
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd react-ecommerce

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create `.env` file with Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### Build for Production
```bash
npm run build
npm run preview
```

## 📊 API Integration

### Endpoints Used
- **Meals API:** `https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals`
- **Orders API:** `https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders`

### API Features
- Custom `useFetch` hook with request/response logging
- Error handling with retry functionality
- Loading states and user feedback
- LocalStorage logging for debugging

### Data Structure
```typescript
interface Meal {
  id: string;
  meal: string;
  category: 'Breakfast' | 'Dinner' | 'Dessert';
  area: string;
  instructions: string;
  img: string;
  price: number;
  quantity?: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}
```

## 🧪 Testing the Application

### Manual Testing Checklist

#### Authentication Flow
- [ ] Login with demo credentials
- [ ] Verify user info appears in header
- [ ] Check Orders link appears when logged in
- [ ] Test logout functionality

#### Menu & Filtering
- [ ] View all menu items on load
- [ ] Filter by each category (Breakfast, Dinner, Dessert)
- [ ] Verify result counts are accurate
- [ ] Test "See More" with different filters

#### Cart Functionality
- [ ] Add items to cart from menu
- [ ] Verify cart icon shows correct count
- [ ] Open cart and verify items display
- [ ] Test quantity controls (+/-)
- [ ] Test item removal (×)
- [ ] Test "Clear Cart" button
- [ ] Test cart closing methods

#### Order Process
- [ ] Add items to cart
- [ ] Login if not authenticated
- [ ] Complete checkout process
- [ ] Verify success message
- [ ] Check order appears in Orders page
- [ ] Verify cart is cleared after checkout

#### Navigation
- [ ] Test all header navigation links
- [ ] Test footer links
- [ ] Verify responsive behavior on mobile

## 🔍 Troubleshooting

### Common Issues

**Cart not appearing:**
- Check if cart icon in header is clicked
- Verify no JavaScript errors in console

**Authentication errors:**
- Ensure Firebase config is correct
- Check network connectivity
- Try demo credentials

**API requests failing:**
- Check console for error messages
- Verify API endpoints are accessible
- Check network tab in developer tools

**Orders not loading:**
- Ensure user is logged in
- Check if orders exist for user
- Verify API connectivity

## 📈 Project Status

### ✅ Completed Features (100%)
- [x] Multi-page React application
- [x] Category-based filtering
- [x] Cart management with Redux
- [x] Firebase authentication
- [x] Orders API integration
- [x] TypeScript implementation
- [x] Responsive design
- [x] API request logging
- [x] Protected routes
- [x] Loading states and error handling

### 🎯 Technical Requirements Met
- [x] React 18+ functional components
- [x] TypeScript integration
- [x] Redux Toolkit state management
- [x] React Router v6 navigation
- [x] Styled Components styling
- [x] Custom hooks (useFetch)
- [x] API integration with logging
- [x] Protected authentication routes

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
