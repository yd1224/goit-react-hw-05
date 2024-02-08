export const TrendingList = ({ values }) => {
  return (
    <ul>
      {values.map((item) => {
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
};
