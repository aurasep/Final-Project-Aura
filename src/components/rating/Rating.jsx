const Rating = ({ rating, onRatingChange }) => {
  const handleDecrease = () => {
    onRatingChange(Math.max(1, rating - 1)); // Minimal rating adalah 1
  };

  const handleIncrease = () => {
    onRatingChange(Math.min(10, rating + 1)); // Maksimal rating adalah 10
  };

  return (
    <div className="flex items-center space-x-2">
      <button className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-700" onClick={handleDecrease}>
        -
      </button>
      <span className="text-black">Rate: {rating} / 10</span>
      <button className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-700" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};

export default Rating;
