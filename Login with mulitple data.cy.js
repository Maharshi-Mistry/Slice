import { url } from "inspector";
import Login from "../../PageObject/Login"


describe('Login', function() {
  let ln=new Login();
  let Validdata;
  before(()=>{
    cy.fixture('loginCred').then((DATA)=>{
      Validdata=DATA
    })
  })
  
  it('Case1: Login with multiple data valid invalid',  function(){

    cy.fixture('loginmulti').then((data)=>{
      cy.visit('https://dev.slicetobuy.com/sign-in')

      //Login Case
      
      data.forEach((userdata)=>{

        cy.get("input[name='username']").type(userdata.username);
        cy.get("input[name='password']").type(userdata.password);
        ln.clickSubmit();
        cy.wait(2000)

        if(userdata.username == 'test_admin' && userdata.password == 'Test@1234')
        {
          cy.get(".chakra-badge").should('have.text','admin')
          cy.log("success");
          ln.clicklogout();
        }
        else
        {
          ln.invalidValidation()
          cy.log("incorrect auth")
          cy.get("input[name='username']").clear()
          cy.get("input[name='password']").clear()
        }
      })
    })    
  })

  it('Case2: User input Required', function()
  {
    cy.visit('https://dev.slicetobuy.com/sign-in')
    ln.setusername("admin");
    ln.clearuserbox();
    ln.userrequired();
    ln.setpassword('xyz');
    ln.clearpassword();
  })

  it('Case3: verify usernot found toaster should be shown when user mistype the email to reset the password', function(){

    ln.link()
    ln.forgotpass()
    ln.enteremail('Test@gmail.com')
    ln.mailsend()
    ln.notfound('user detail not found') //For user not found case
  })
})