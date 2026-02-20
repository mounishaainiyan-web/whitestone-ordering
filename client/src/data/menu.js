const menu = [

  // 🍨 ICE CREAMS
  {
    category: "Ice Creams",
    items: [
      { name: "Vanilla", price: { single: 50, double: 80, family: 180 } },
      { name: "Strawberry", price: { single: 50, double: 80, family: 180 } },
      { name: "Mango", price: { single: 60, double: 90, family: 220 } },
      { name: "Butterscotch", price: { single: 70, double: 100, family: 260 } },
      { name: "Chocolate", price: { single: 70, double: 100, family: 260 } },
      { name: "Oreo", price: { single: 70, double: 100, family: 260 } },
      { name: "Almond", price: { single: 70, double: 100, family: 260 } },
      { name: "Blackcurrant", price: { single: 70, double: 100, family: 260 } },
      { name: "Dry Fruit", price: { single: 80, double: 120, family: 290 } },
      { name: "Fig", price: { single: 80, double: 120, family: 290 } },
    ],
  },

  // 🍟 VEG FRIES
  {
    category: "Veg Fries",
    items: [
      { name: "French Fries", price: 80 },
      { name: "Potato Smiley (8 pcs)", price: 90 },
      { name: "Veg Nuggets (8 pcs)", price: 90 },
      { name: "Chilli Garlic Potato Pops (15 pcs)", price: 100 },
      { name: "Potato Cheese Shots (8 pcs)", price: 100 },
      { name: "Masala French Fries", price: 100 },
      { name: "Veggie Fingers (6 pcs)", price: 110 },
      { name: "Falafel (10 pcs)", price: 110 },
      { name: "Cheesy Fries", price: 150 },
      { name: "Loaded Fries", price: 170 },
    ],
  },

  // 🍗 NON-VEG FRIES
  {
    category: "Non Veg Fries",
    items: [
      { name: "Chicken Nuggets (6 pcs)", price: 100 },
      { name: "Chicken Pops (15 pcs)", price: 110 },
      { name: "Chicken Fingers (6 pcs)", price: 110 },
      { name: "Chicken Hot Wings (4 pcs)", price: 120 },
      { name: "Chicken Cheese Balls (6 pcs)", price: 120 },
      { name: "Chicken French Fries", price: 120 },
      { name: "Chicken Lollipop (4 pcs)", price: 130 },
      { name: "Chicken Bites (100g)", price: 130 },
      { name: "Fried Chicken Snackers (5 pcs)", price: 130 },
      { name: "Garlic Chicken Fingers (6 pcs)", price: 120 },
      { name: "Fish Fingers (6 pcs)", price: 110 },
    ],
  },

  // 🍕 VEG PIZZA
  {
    category: "Veg Pizza",
    items: [
      { name: "Classy Margherita", price: { small: 100, medium: 180 } },
      { name: "Double Cheese Margherita", price: { small: 140, medium: 240 } },
      { name: "Corn and Cheese", price: { small: 160, medium: 250 } },
      { name: "Cheesy Paneer", price: { small: 160, medium: 260 } },
      { name: "Pepper Paneer", price: { small: 180, medium: 280 } },
      { name: "Corn and Veg", price: { small: 180, medium: 280 } },
      { name: "Peri Peri Corn", price: { small: 190, medium: 290 } },
      { name: "Peri Peri Paneer", price: { small: 190, medium: 290 } },
      { name: "Veg Only", price: { small: 190, medium: 290 } },
      { name: "Veggie Overloaded", price: { small: 200, medium: 300 } },
      { name: "Veg Pepper Paneer", price: { small: 220, medium: 320 } },
      { name: "Mushroom Cheese", price: { small: 220, medium: 320 } },
      { name: "Veggie Feast", price: { small: 230, medium: 320 } },
    ],
  },

  // 🍗 NON-VEG PIZZA
  {
    category: "Non Veg Pizza",
    items: [
      { name: "Chicken Pepperoni", price: { small: 220, medium: 320 } },
      { name: "Double Chicken", price: { small: 260, medium: 360 } },
    ],
  },

  // 🍔 VEG BURGER
  {
    category: "Veg Burger",
    items: [
      { name: "Veg", price: 100 },
      { name: "Veg Cheese", price: 120 },
      { name: "Veg Double Cheese", price: 130 },
      { name: "Paneer", price: 120 },
      { name: "Paneer Cheese", price: 140 },
      { name: "Spinach Corn", price: 120 },
      { name: "Veg Volcano Burger", price: 160 },
      { name: "Paneer Volcano Burger", price: 170 },
    ],
  },

  // 🍗 NON-VEG BURGER
  {
    category: "Non Veg Burger",
    items: [
      { name: "Classic Chicken", price: 110 },
      { name: "Chicken", price: 120 },
      { name: "Chicken Cheese", price: 140 },
      { name: "Chicken Double Cheese", price: 150 },
      { name: "Peri Peri Chicken Burger", price: 150 },
      { name: "Tandoori Chicken Burger", price: 130 },
      { name: "Spanish Chicken Burger", price: 140 },
      { name: "Chicken Volcano Burger", price: 180 },
    ],
  },

  // 🥤 MILKSHAKES
  {
    category: "Milkshakes",
    items: [
      { name: "Rose Milk", price: { normal: 70, thick: 110 } },
      { name: "Vanilla", price: { normal: 90, thick: 130 } },
      { name: "Strawberry", price: { normal: 90, thick: 130 } },
      { name: "Mango", price: { normal: 90, thick: 130 } },
      { name: "Chocolate", price: { normal: 100, thick: 140 } },
      { name: "Oreo", price: { normal: 120, thick: 160 } },
      { name: "Nutella", price: { normal: 140, thick: 190 } },
      { name: "Lotus Biscoff", price: { normal: 170, thick: 220 } },
    ],
  },

];

module.exports = menu;