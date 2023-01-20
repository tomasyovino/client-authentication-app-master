import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import googleIcon from "../assets/googleIcon.png";

const Form = ({ data }) => {
  const linkToCapitalized = data.linkTo.charAt(0).toUpperCase() + data.linkTo.slice(1);

  return (
    <form className='form' autoComplete="off">
      <div className="logo-container">
        <img  src={logo} alt="logo" className="logo" />
        <span>authenticator</span>
      </div>
      <div className="form-header">
        <h4>{data.formHeader.title}</h4>
        <p>{data.formHeader.text}</p>
      </div>
      <div>
        {
          data.inputs.map((input, index) => (
            <input key={index} placeholder={input.placeholder} name={input.name} type={input.type} />
          ))
        }
        <button>{data.buttonText}</button>
      </div>
      <div>
        <span>or continue with these social profile</span>
        <img src={googleIcon} alt="google" className="google-icon" />
        <span>Already a member? <Link to={`/${data.linkTo}`}>{linkToCapitalized}</Link></span>
      </div>
    </form>
  )
}

export default Form