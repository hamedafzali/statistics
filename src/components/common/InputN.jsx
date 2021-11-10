const Input = ({ name, label, error, placeHolder, ...rest }) => {
  return (
    <div className="app-input-wrapper">
      <input
        {...rest}
        name={name}
        id={name}
        className="app-input "
        placeHolder={placeHolder}
      />
      <label htmlFor={name}>{label}</label>
      {/* {error && <div className="app-alert">{error}</div>} */}
    </div>
  );
};

export default Input;
