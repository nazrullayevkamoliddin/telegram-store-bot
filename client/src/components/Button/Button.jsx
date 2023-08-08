import "./Button.css";

const Button = (props) => {
  const { title, type,onClick,disable } = props;

  return (
    <button
      className={`btn ${
        (type === "add" && "add") ||
        (type === "remove" && "remove") ||
        (type === "checkout" && "checkout")
      } ${disable === true && 'disabled'}`}
      disabled={disable}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
