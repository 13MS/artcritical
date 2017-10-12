import React from 'react';
import validator from 'validator';
//COMPONENTS
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default class LogInForm extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            errorMessage: {},
            isValid: {}
        };

        // Function binding
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._validateEmail = this._validateEmail.bind(this);
        this._validatePassword = this._validatePassword.bind(this);
        this._validate = this._validate.bind(this);
        this._areValid = this._areValid.bind(this);
      }
    
    
    //Update values of inputs
    handleChange (event) {
        const target = event.target
        const value = target.value
        const name = target.name
        
        this.setState({[name]: value})
    }
    
    //Validators
    _validateEmail(value) {
        const valid = validator.isEmail(value)
        const errorMessage = this.state.errorMessage
        
        if (valid) {
            errorMessage.email = ''
            this.setState({errorMessage: errorMessage})
        } else {
            errorMessage.email = 'Please enter a valid email address'
            this.setState({errorMessage: errorMessage})
        }
        return valid
      }
    _validatePassword(value) {
        const valid = validator.isLength(value.trim(), 5, 50);
        const errorMessage = this.state.errorMessage
       
        if (valid) {
            errorMessage.password = ''
            this.setState({errorMessage: errorMessage})
        } else {
            errorMessage.password = 'Please enter a password. 5 characters min.'
            this.setState({errorMessage: errorMessage})
        }
        return valid
      }
    _validate(email, password) {
        this.setState({
          isValid: {
            email: this._validateEmail(email),
            password: this._validatePassword(password),
          }
        });
      }
    _areValid(email, password) {
    var result = false;
        
    if (this._validateEmail(email) 
      && this._validatePassword(password)) {
      
      result = true;
    }
    return result;
  }
    
    
    // Add the listing to the database
    handleSubmit() {
        const { loginFunction } = this.props;
        
        let {username, password} = this.state;
        this._validate(username, password);
        
        if (this._areValid(username, password)){
            
            const formData = {
                username: this.state.username,
                password: this.state.password
                         };
        
            loginFunction(formData);   
        }
      }
    
    
    render() {
        
        return ( 
            <form>
                <FormGroup>
                <Label>Email</Label>
                  <Input 
                      name="username" 
                      placeholder="Email" 
                      type="text" 
                      value={this.state.username} 
                      onChange={this.handleChange} 
                      />
                    <div className="alert alert-danger">
                      {this.state.errorMessage.email}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input 
                        name="password" 
                        placeholder="Password" 
                        type="password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        />
                    {this.state.errorMessage.password}
                </FormGroup>

                <Button onClick={this.handleSubmit}>Log In</Button>
                {this.props.loading? 'Loading' : ''}
                
            </form>
        );
    }
}