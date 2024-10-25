const Rating = ({ rating, onRatingChange }) => {
  const handleDecrease = () => {
    onRatingChange(Math.max(1, rating - 1)); // Minimal rating adalah 1
  };

  const handleIncrease = () => {
    onRatingChange(Math.min(10, rating + 1)); // Maksimal rating adalah 10
  };

  return (
    <div className="flex items-center space-x-2">
      <button className="btn btn-red" onClick={handleDecrease}>
        -
      </button>
      <span className="text-white">Rate: {rating} / 10</span>
      <button className="btn btn-red" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};

export default Rating;
