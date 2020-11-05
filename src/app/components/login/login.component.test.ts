import { Location } from "@angular/common";
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/angular";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: RenderResult<LoginComponent>;

  beforeEach(async () => {
    component = await render(LoginComponent, {
      imports: [FormsModule],
      providers: [Location],
    });
  });

  test("basic form validation", async () => {
    const loginSpy = jest.spyOn(global.console, "log");
    //const submitButton = screen.getByText(/log in$/i).closest("button");
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.change(screen.getByLabelText(/username or email/i), {
      target: { value: "someUser" },
    });
    expect(screen.queryByDisplayValue("someUser")).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "somePassword" },
    });
    expect(screen.queryByDisplayValue("somePassword")).toBeTruthy();
    fireEvent.click(submitButton);
    expect(loginSpy.mock.calls[0]).toEqual([
      { email: "someUser", password: "somePassword" },
    ]);
  });
});
