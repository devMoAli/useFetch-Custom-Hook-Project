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
      {error ? <h4>{error}</h4> : null}
      {data && data.products && data.products.length
        ? data.products.map((productItem, index) => (
            <p key={index}>{productItem.title}</p>
          ))
        : null}
    </div>
  );
}
