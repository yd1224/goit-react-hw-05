export const TrendingList = ({ arr }) => {
  console.log(arr);
  return (
    <ul>
      {arr.map((item) => {
        return (
          <li key={item.id}>
            <span>{item.title}</span>
          </li>
        );
      })}
    </ul>
  );
};
