import Login from "../../PageObject/Login"

describe('Login', () => {
  it('Login Case', () => {

    cy.fixture('loginCred').then((data)=>{
      cy.visit('https://dev.slicetobuy.com/sign-in')

      //Login Case
      let ln=new Login();
      ln.setusername(data.username);
      ln.setpassword(data.password);
      ln.clickSubmit();
      ln.Validation(data.expect);
    })
    
  })
})