import { reducer, screen } from "../../../shared/utils/test-utils";
import SignInFormComponent from "./SignInForm.component";


describe('Sign In Form', () => {
    let signInButton = ''
    beforeEach(() => {
        reducer(<SignInFormComponent/>)
        signInButton = screen.getByRole('button', {name: /sign-in/i})
    })

    test('The login button should be in the document!', () => {
        expect(signInButton).toBeInTheDocument();
    })
})