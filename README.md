# useFetch-Custom-Hook

When we create any custom hook we need to decide, 
Parameters: Decide if the hook requires any parameters to customize its behaviour.
Return Values: Define the return values of the hook. It could be a single value, multiple values (e.g., an array), or a function.
State Management


in this custom useFetch hook we need to receive url and some options and manage 3 states .Loading State - Data State - Error State

index.jsx
as we receive url as parameter so based on this url we fetch the data so we give this url as dependency in useEffect Hook and inside this hook we fetch the data

import { useEffect, useState } from "react";

export default function useFetchCustomHook(url, options = {}) {
  // 3 states to manage
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setPending(true);

    try {
      const response = await fetch(url, { ...options });
      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();
      setData(result);
      setError(null);
      setPending(false);
    } catch (error) {
      setError(`${error}. Some Error Occured`);
      setPending(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, pending };
}



with that we created the useFetch Custom Hook that we can customise and use in different places in our app, let’s say we want to use it in test.jsx

we need to pass the url as a parameter in test component to be able to get the output of the custom hook which is data, error, pending by using useFetch hook it will import the url like that


import useFetchCustomHook from ".";

export default function UseFetchCustomHookTest() {
  const { data, error, pending } = useFetchCustomHook();


here we can pass a url and an empty object like
  const { data, error, pending } = useFetchCustomHook(
    "https://dummyjson.com/products",
    {}
  );

that means we are passing this url as input to useFetch hook and based on hat we are returning the data , error and pending state

if you log the output  
console.log(data, error, pending );

and import UseFetchHookTest in App.js

you can see in console that we received Object including
Object
limit: 30 products:  Array(30)
	0 :  {id: 1, title: 'Essence Mascara Lash Princess', description: 'The Essence Mascara Lash Princess is a popular mas… with this long-lasting and cruelty-free formula.', category: 'beauty', price: 9.99, …} 1 :  {id: 2, title: 'Eyeshadow Palette with Mirror', description: "The Eyeshadow Palette with Mirror offers a versati…it's convenient for on-the-go makeup application.", category: 'beauty', price: 19.99, …} 2 :  {id: 3, title: 'Powder Canister', description: 'The Powder Canister is a finely milled setting pow…t formula, it provides a smooth and matte finish.', category: 'beauty', price: 14.99, …} 3 :  {id: 4, title: 'Red Lipstick', description: 'The Red Lipstick is a classic and bold choice for …a, it provides a vibrant and long-lasting finish.', category: 'beauty', price: 12.99, …} 4 :  {id: 5, title: 'Red Nail Polish', description: 'The Red Nail Polish offers a rich and glossy red h…mula, it provides a salon-quality finish at home.', category: 'beauty', price: 8.99, …} 5 :  {id: 6, title: 'Calvin Klein CK One', description: 'CK One by Calvin Klein is a classic unisex fragran…a versatile fragrance suitable for everyday wear.', category: 'fragrances', price: 49.99, …} 6 :  {id: 7, title: 'Chanel Coco Noir Eau De', description: 'Coco Noir by Chanel is an elegant and mysterious f…e, and sandalwood. Perfect for evening occasions.', category: 'fragrances', price: 129.99, …} 7 :  {id: 8, title: "Dior J'adore", description: "J'adore by Dior is a luxurious and floral fragranc…smine. It embodies femininity and sophistication.", category: 'fragrances', price: 89.99, …} 8 :  {id: 9, title: 'Dolce Shine Eau de', description: "Dolce Shine by Dolce & Gabbana is a vibrant and fr…d blonde woods. It's a joyful and youthful scent.", category: 'fragrances', price: 69.99, …} 9 :  {id: 10, title: 'Gucci Bloom Eau de', description: "Gucci Bloom by Gucci is a floral and captivating f…angoon creeper. It's a modern and romantic scent.", category: 'fragrances', price: 79.99, …} 10 :  {id: 11, title: 'Annibale Colombo Bed', description: 'The Annibale Colombo Bed is a luxurious and elegan… materials for a comfortable and stylish bedroom.', category: 'furniture', price: 1899.99, …} 11 :  {id: 12, title: 'Annibale Colombo Sofa', description: 'The Annibale Colombo Sofa is a sophisticated and c…sign and premium upholstery for your living room.', category: 'furniture', price: 2499.99, …} 12 :  {id: 13, title: 'Bedside Table African Cherry', description: 'The Bedside Table in African Cherry is a stylish a…convenient storage space and a touch of elegance.', category: 'furniture', price: 299.99, …} 13 :  {id: 14, title: 'Knoll Saarinen Executive Conference Chair', description: 'The Knoll Saarinen Executive Conference Chair is a…fice or conference room with its timeless design.', category: 'furniture', price: 499.99, …}  14 :  {id: 15, title: 'Wooden Bathroom Sink With Mirror', description: 'The Wooden Bathroom Sink with Mirror is a unique a…g a wooden sink countertop and a matching mirror.', category: 'furniture', price: 799.99, …} 15 :  {id: 16, title: 'Apple', description: 'Fresh and crisp apples, perfect for snacking or incorporating into various recipes.', category: 'groceries', price: 1.99, …} 16 :  {id: 17, title: 'Beef Steak', description: 'High-quality beef steak, great for grilling or cooking to your preferred level of doneness.', category: 'groceries', price: 12.99, …} 17 :  {id: 18, title: 'Cat Food', description: 'Nutritious cat food formulated to meet the dietary needs of your feline friend.', category: 'groceries', price: 8.99, …} 18 :  {id: 19, title: 'Chicken Meat', description: 'Fresh and tender chicken meat, suitable for various culinary preparations.', category: 'groceries', price: 9.99, …} 19 :  {id: 20, title: 'Cooking Oil', description: 'Versatile cooking oil suitable for frying, sautéing, and various culinary applications.', category: 'groceries', price: 4.99, …} 20 :  {id: 21, title: 'Cucumber', description: 'Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.', category: 'groceries', price: 1.49, …} 21 :  {id: 22, title: 'Dog Food', description: 'Specially formulated dog food designed to provide essential nutrients for your canine companion.', category: 'groceries', price: 10.99, …} 22 :  {id: 23, title: 'Eggs', description: 'Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.', category: 'groceries', price: 2.99, …} 23 :  {id: 24, title: 'Fish Steak', description: 'Quality fish steak, suitable for grilling, baking, or pan-searing.', category: 'groceries', price: 14.99, …} 24 :  {id: 25, title: 'Green Bell Pepper', description: 'Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.', category: 'groceries', price: 1.29, …} 25 :  {id: 26, title: 'Green Chili Pepper', description: 'Spicy green chili pepper, ideal for adding heat to your favorite recipes.', category: 'groceries', price: 0.99, …} 26 :  {id: 27, title: 'Honey Jar', description: 'Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.', category: 'groceries', price: 6.99, …} 27 :  {id: 28, title: 'Ice Cream', description: 'Creamy and delicious ice cream, available in various flavors for a delightful treat.', category: 'groceries', price: 5.49, …} 28 :  {id: 29, title: 'Juice', description: 'Refreshing fruit juice, packed with vitamins and great for staying hydrated.', category: 'groceries', price: 3.99, …} 29 :  {id: 30, title: 'Kiwi', description: 'Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.', category: 'groceries', price: 2.49, …} length :  30 [[Prototype]] :  Array(0)
	skip :  0 total :  194 [[Prototype]] :  Object


so we can now render the products in the return like
import useFetchCustomHook from ".";

export default function UseFetchCustomHookTest() {
  const { data, error, pending } = useFetchCustomHook(
    "https://dummyjson.com/products",
    {}
  );
//   console.log(data, error, pending);
  return (
    <div>
      <h1>Use Fetch Custom Hook</h1>
      {pending ? <h3>Loading...</h3> : null}
      {error ? <h4>{error}</h4> : null }
      {data && data.products && data.products.length
        ? data.products.map((productItem, index) => (
            <p key={index}>{productItem.title}</p>
          ))
        : null}
    </div>
  );
}



now you can see the products titles been rendered in the page and if we want to customise the needs by rendering any part of the data received we can always change the custom hook functionality to serve our needs

